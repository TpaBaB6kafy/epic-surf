const { test, expect } = require('@playwright/test');
const widths = [320, 360, 390, 480, 640, 699, 700, 768, 900, 1024, 1199, 1200, 1440];
const sections = ['how', 'lessons-included', 'rentals', 'conditions', 'reviews', 'faq', 'events', 'gallery'];

async function ready(page, locale, width) {
  await page.setViewportSize({ width, height: 900 });
  await page.route(/^https:\/\//, route => route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>External provider preview</body></html>' }));
  await page.goto(locale === 'ru' ? '/ru' : '/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('[data-home-v2-root]')).toHaveAttribute('data-home-v2-client-ready', 'true', {timeout:30000});
  await page.addStyleTag({content:'html { scroll-behavior: auto !important; } nextjs-portal { display:none !important; }'});
  await page.evaluate(() => document.fonts.ready);
}

for (const locale of ['en', 'ru']) for (const width of widths) {
  test(`${locale} ${width}: one current design, readable layout and working controls`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await ready(page, locale, width);
    for (const name of sections) {
      const section = page.locator(`[data-home-v5-${name}]`);
      await expect(section).toBeVisible();
      expect(await section.count()).toBe(1);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    const overflows = await page.locator('[data-home-v5-how-card] p, .home-v5-li-title, .home-v5-li-price, .home-v5-li-description, .home-v5-li-feature, .home-v5-rental-offer, .home-v5-review, .v5-event-card, .v5-gallery-filter, [data-home-v2-footer-main]').evaluateAll(elements => elements.filter(e => {
      if (!e.getClientRects().length) return false;
      const r = e.getBoundingClientRect();
      return r.left < -1 || r.right > innerWidth + 1 || e.scrollWidth > e.clientWidth + 2 || (e.scrollHeight > e.clientHeight + 2 && (innerWidth < 1200 || getComputedStyle(e).overflowY !== "visible"));
    }).map(e => ({element: e.className, text:e.textContent.slice(0,70), width:e.clientWidth, scroll:e.scrollWidth, height:e.clientHeight, scrollHeight:e.scrollHeight})));
    expect(overflows).toEqual([]);
    if (width < 1200) {
      await expect(page.locator('[data-home-v2-how-mobile-en], [data-home-v2-how-fluid-desktop], [data-home-v2-events-mobile]').filter({visible:true})).toHaveCount(0);
      const targets = await page.locator('[data-home-v2-header-actions] > *, .home-v5-li-control, .v5-gallery-filter, .v5-faq-item > button').evaluateAll(es=>es.filter(e=>e.getClientRects().length).map(e=>({w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height})));
      expect(targets.every(({w,h})=>w >= 43 && h >= 43)).toBeTruthy();
      await page.locator('[data-home-v2-menu-control]').click();
      await expect(page.locator('#home-v2-mobile-navigation')).toBeVisible();
      await page.locator('#home-v2-mobile-navigation a').first().click();
      await expect(page.locator('#home-v2-mobile-navigation')).toHaveCount(0);
    }
    const lessons = page.locator('[data-home-v5-lessons-included]');
    await expect(lessons).toHaveAttribute('data-lesson','group');
    await page.locator('.home-v5-li-next').click();
    await expect(lessons).not.toHaveAttribute('data-lesson','group');
    await page.locator('.home-v5-li-prev').click();
    await expect(lessons).toHaveAttribute('data-lesson','group');
    await page.locator('.home-v5-li-cta').click();
    await expect(page.locator('[data-booking-dialog]')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-booking-dialog]')).toHaveCount(0);
    await page.locator('.home-v5-rent-cta').click();
    await expect(page.locator('[data-rental-dialog]')).toBeVisible();
    const modal = await page.locator('[data-rental-dialog]').boundingBox();
    expect(modal.x).toBeGreaterThanOrEqual(0);
    expect(modal.y).toBeGreaterThanOrEqual(0);
    expect(modal.y + modal.height).toBeLessThanOrEqual(901);
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-rental-dialog]')).toHaveCount(0);
    const faq = page.locator('.v5-faq-item > button').first();
    await faq.click();
    await expect(faq).toHaveAttribute('aria-expanded','true');
    await expect(page.locator('#home-v5-faq-answer-0')).toBeVisible();
    await faq.click();
    await expect(page.locator('#home-v5-faq-answer-0')).toBeHidden();
    await page.locator('.v5-event-photos').click();
    await expect(page.locator('.v5-gallery-filter[aria-pressed=true]')).toContainText('2025');
    await page.locator('.v5-gallery-filter').last().click();
    await expect(page.locator('.v5-gallery-filter').last()).toHaveAttribute('aria-pressed','true');
    expect(errors).toEqual([]);
  });
}

test('lesson state survives resizing and every lesson remains readable in Russian', async ({page})=>{
  await ready(page, 'ru', 390);
  const section=page.locator('[data-home-v5-lessons-included]');
  for (let index=0; index<5; index++) {
    for (const width of [320,768,1199,1440]) {
      const selected=await section.getAttribute('data-lesson');
      await page.setViewportSize({width,height:900});
      await expect(section).toHaveAttribute('data-lesson',selected);
      const invalid=await page.locator('.home-v5-li-title, .home-v5-li-price, .home-v5-li-description').evaluateAll(es=>es.filter(e=>(e.scrollHeight>e.clientHeight+2 && (innerWidth<1200 || getComputedStyle(e).overflowY!=="visible"))||e.scrollWidth>e.clientWidth+2).map(e=>e.textContent));
      expect(invalid).toEqual([]);
    }
    await page.locator('.home-v5-li-next').click();
  }
});

test('short landscape: forms fit and can be dismissed',async({page})=>{
  await ready(page,'ru',667);
  await page.setViewportSize({width:667,height:375});
  await page.locator('[data-home-v2-book-now]').click();
  await expect(page.locator('[data-booking-dialog]')).toBeVisible();
  await page.getByRole('button',{name:'Закрыть запись',exact:true}).click();
  await page.locator('.home-v5-rent-cta').click();
  const box=await page.locator('[data-rental-dialog]').boundingBox();
  expect(box.y+box.height).toBeLessThanOrEqual(376);
  await page.getByRole('button',{name:'Закрыть аренду',exact:true}).click();
  await expect(page.locator('[data-rental-dialog]')).toHaveCount(0);
});
