const { test, expect } = require('@playwright/test');
const fs = require('fs');
const paths = ['/surf-lessons-danang', '/surfing-danang', '/my-khe-beach-surfing', '/partners', '/ru/partners'];
const widths = [320, 360, 390, 480, 599, 600, 768, 899, 900, 1024, 1199, 1200, 1440];
const normalize = text => text.replace(/\s+/g, ' ').trim();
const seoPages = new Function(fs.readFileSync('app/data/seoPages.js', 'utf8').replaceAll('export ', '') + '; return seoPages;')();
const partnersContent = new Function(fs.readFileSync('app/data/partners.js', 'utf8').replaceAll('export ', '') + '; return partnersContent;')();
async function ready(page, path, width = 390) {
  await page.setViewportSize({ width, height: 900 });
  // No real booking, message, map or analytics requests during automated checks.
  await page.route(/^https:\/\//, route => route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>External provider preview</body></html>' }));
  await page.goto(path, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}nextjs-portal{display:none!important}' });
}
for (const path of paths) for (const width of widths) {
  test(`${path} at ${width}: responsive geometry and controls`, async ({ page }) => {
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    await ready(page, path, width);
    await expect(page.locator('.epic-landing')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    const invalid = await page.locator('.epic-landing main h1, .epic-landing main h2, .epic-landing main h3, .epic-landing main p, .epic-landing main li, .landing-button, header a, header button, [data-home-v2-footer-main] a, [data-home-v2-footer-main] p').evaluateAll(es => es.filter(e => {
      if (!e.getClientRects().length || !e.checkVisibility()) return false;
      const r = e.getBoundingClientRect();
      return r.width < 1 || r.left < -1 || r.right > innerWidth + 1 || e.scrollWidth > e.clientWidth + 2 || (e.scrollHeight > e.clientHeight + 2 && getComputedStyle(e).overflowY !== 'visible');
    }).map(e => ({ tag: e.tagName, text: e.textContent.slice(0, 80), width: e.clientWidth, scroll: e.scrollWidth })));
    expect(invalid).toEqual([]);
    const targets = await page.locator('[data-home-v2-header-actions] > *').evaluateAll(es => es.filter(e=>e.getClientRects().length).map(e=>({width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})));
    expect(targets.every(r=>r.width>=43 && r.height>=43)).toBeTruthy();
    if (width < 1200) {
      await page.locator('[data-home-v2-menu-control]').click();
      await expect(page.locator('#home-v2-mobile-navigation')).toBeVisible();
      await expect(page.locator('[data-home-v2-menu-control]')).toHaveAttribute('aria-expanded', 'true');
      await page.locator('[data-home-v2-menu-control]').click();
      await expect(page.locator('#home-v2-mobile-navigation')).toHaveCount(0);
    } else await expect(page.locator('[data-home-v2-primary-navigation]')).toBeVisible();
    await page.locator('[data-home-v2-book-now]').click();
    await expect(page.locator('[data-booking-dialog]')).toBeVisible();
    const dialog = await page.locator('[data-booking-dialog]').boundingBox();
    expect(dialog.x).toBeGreaterThanOrEqual(0); expect(dialog.x + dialog.width).toBeLessThanOrEqual(width + 1);
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-booking-dialog]')).toHaveCount(0);
    const faq = page.locator('.landing-faq-item').first();
    if (await faq.count()) {
      await faq.locator('summary').click(); await expect(faq).toHaveAttribute('open', '');
      await expect(faq.locator('p')).toBeVisible();
      await faq.locator('summary').click(); await expect(faq).not.toHaveAttribute('open', '');
    }
    expect(errors).toEqual([]);
  });
}
for (const path of paths) {
  test(`${path}: original content and conversion targets`, async ({ page }) => {
    await ready(page, path + '?partner=qa_partner&utm_source=qa&utm_campaign=landing_v5', 390);
    const body = normalize(await page.locator('main').textContent());
    const content = path.includes('partners') ? partnersContent[path.startsWith('/ru') ? 'ru' : 'en'] : seoPages[path.slice(1)];
    const strings = [];
    function collect(value, key = '') {
      if (typeof value === 'string' && !['path','heroImage','href','homeHref','languageHref','languageLabel','bookingLabel','bookingService','secondaryAction'].includes(key) && !value.startsWith('/')) strings.push(value);
      else if (Array.isArray(value)) value.forEach(v => collect(v, key));
      else if (value && typeof value === 'object') Object.entries(value).forEach(([k,v]) => collect(v,k));
    }
    const keys = path.includes('partners') ? ['badge','subtitle','primaryCta','secondaryCta','sections'] : ['title','eyebrow','intro','primaryCta','secondaryCta','sections','faq'];
    keys.forEach(k => collect(content[k],k));
    for (const text of strings) expect(body).toContain(normalize(text));
    const attribution = await page.evaluate(() => JSON.parse(localStorage.getItem('epic_surf_attribution')));
    expect(attribution).toMatchObject({ partner:'qa_partner', utm_source:'qa', utm_campaign:'landing_v5' });
    if (!path.includes('partners')) {
      await page.locator('.landing-hero .landing-button').first().click();
      await expect(page.locator('[data-booking-dialog] iframe')).toHaveAttribute('src', /alteg\.io/);
      await page.getByRole('button', {name:'Close booking modal', exact:true}).click();
      await expect(page.locator('[data-booking-dialog]')).toHaveCount(0);
      if (content.secondaryAction === 'rental') {
        await page.locator('.landing-hero .landing-button').nth(1).click();
        await expect(page.locator('[data-rental-dialog]')).toBeVisible();
        await page.keyboard.press('Escape'); await expect(page.locator('[data-rental-dialog]')).toHaveCount(0);
      }
    }
    const messenger = page.locator('main a[href*="wa.me"]').first();
    if (await messenger.count()) {
      await messenger.evaluate(e => e.addEventListener('click', event => event.preventDefault(), {once:true}));
      await messenger.click();
      expect(decodeURIComponent(await messenger.getAttribute('href'))).toContain('qa_partner');
    }
    await page.getByRole('button', { name:'Open messenger options' }).click();
    await expect(page.getByRole('link', {name:'WhatsApp chat',exact:true})).toBeVisible();
    await page.getByRole('button', { name:'Close messenger options' }).click();
    await expect(page.getByRole('link', {name:'WhatsApp chat',exact:true})).toHaveCount(0);
    await page.locator('[data-home-v2-language-switcher]').click();
    const expected = path === '/partners' ? '/ru/partners' : path === '/ru/partners' ? '/partners' : `/ru${path}`;
    await expect(page).toHaveURL(new RegExp(expected.replaceAll('/','\\/')+'\\?partner=qa_partner&utm_source=qa&utm_campaign=landing_v5$'));
  });
}
test('short landscape: Russian booking dialog stays usable', async ({page})=>{
  await ready(page,'/ru/partners',667);await page.setViewportSize({width:667,height:375});
  await page.locator('[data-home-v2-book-now]').click();const r=await page.locator('[data-booking-dialog]').boundingBox();
  expect(r.y).toBeGreaterThanOrEqual(0);expect(r.y+r.height).toBeLessThanOrEqual(376);
  await page.getByRole('button',{name:'Закрыть запись',exact:true}).click();await expect(page.locator('[data-booking-dialog]')).toHaveCount(0);
});
