const { test, expect } = require('@playwright/test');
const { baseUrl, isolateProviders, ready, expectNoOverflow } = require('./home-v2-helpers');

test.beforeEach(async ({ page }) => {
  await isolateProviders(page);
});

test('retired preview routes return 404 without redirects, including queries', async ({ request }) => {
  for (const route of ['/home-v2', '/ru/home-v2']) {
    for (const query of ['', '?partner=hotel_abc&utm_source=qa']) {
      const response = await request.get(`${baseUrl}${route}${query}`, { maxRedirects: 0 });
      expect(response.status()).toBe(404);
      expect(response.headers().location).toBeUndefined();
    }
  }
});

for (const language of ['en', 'ru']) {
  const route = language === 'en' ? '/' : '/ru';
  const alternate = language === 'en' ? '/ru' : '/';
  for (const width of [390, 1440]) {
    test(`${language} ${width}: production SEO, all lesson CTAs, attribution and assets`, async ({ page }, testInfo) => {
      const errors = [];
      const missing = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('response', response => { if (response.url().startsWith(baseUrl) && response.status() >= 400) missing.push(`${response.status()} ${response.url()}`); });
      await page.setViewportSize({ width, height: 1000 });
      await ready(page, `${route}?partner=hotel_abc&utm_source=qa&utm_medium=referral&utm_campaign=promotion`);
      await page.evaluate(() => document.fonts.ready);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(new URL(canonical).href).toBe(`https://www.surfdanang.com${route}`);
      for (const [locale, suffix] of [['en', '/'], ['ru', '/ru'], ['x-default', '/']]) {
        expect(new URL(await page.locator(`link[rel="alternate"][hreflang="${locale}"]`).getAttribute('href')).href).toBe(`https://www.surfdanang.com${suffix}`);
      }
      expect(await page.locator('meta[name="robots"]').getAttribute('content')).not.toMatch(/noindex|nofollow/);
      const structured = await page.locator('script[type="application/ld+json"]').allTextContents();
      expect(structured.length).toBeGreaterThan(0);
      for (const json of structured) expect(() => JSON.parse(json)).not.toThrow();
      await expect(page.locator('html')).toHaveAttribute('lang', language);
      await expectNoOverflow(page);
      await expect(page.locator('iframe[data-live-cam-iframe]')).toHaveCount(0);
      await page.screenshot({ path: testInfo.outputPath(`${language}-${width}-top.png`) });

      const lessons = page.locator('[data-home-v2-lessons-block]');
      await lessons.scrollIntoViewIfNeeded();
      const ids = ['group', 'split', 'private', 'surf_skate', 'lineup_pro'];
      for (const id of ids) {
        const tab = lessons.locator(`[data-lesson-selector-item="${id}"]:visible`);
        await tab.click();
        await expect(tab).toHaveAttribute('aria-pressed', 'true');
        const cta = lessons.locator('[data-home-v2-booking-cta]:visible');
        if (id === 'lineup_pro') await expect(lessons.locator('[data-home-v2-lesson-price]:visible')).toContainText('1.200.000');
        if (['group', 'split', 'private'].includes(id)) {
          await cta.click();
          const frame = page.locator('iframe[title="Booking"]');
          await expect(frame).toBeVisible();
          const src = await frame.getAttribute('src');
          expect(src).toMatch(/^https:\/\/n\d+\.alteg\.io\//);
          const fallback = page.getByRole('link', { name: 'Open booking in new tab' }).first();
          await expect(fallback).toBeVisible();
          await expect(fallback).toHaveAttribute('href', src);
          await page.getByLabel('Close booking modal').click();
        } else {
          await cta.evaluate(element => { element.addEventListener('click', event => event.preventDefault(), { once: true }); element.click(); });
          // Match main: lesson messenger text omits the code; lead events retain attribution.
          expect(decodeURIComponent(await cta.getAttribute('href'))).not.toContain('hotel_abc');
        }
      }

      const conditions = page.locator('[data-home-v2-live-cam]');
      await conditions.scrollIntoViewIfNeeded();
      await expect(conditions.locator('iframe[data-live-cam-iframe]')).toHaveAttribute('src', /duration=30(?:&|$)/);
      const rentalLink = page.locator('[data-home-v2-rental-catalog-cta]:visible');
      await expect(rentalLink).toHaveAttribute('href', language === 'ru' ? '/ru/surfboard-rental-danang' : '/surfboard-rental-danang');
      await page.locator('[data-home-v2-rental-cta]:visible').click();
      const rental = page.locator('[data-home-v2-rental-modal]');
      for (const name of ['WhatsApp', 'Telegram', 'Zalo']) {
        const messenger = rental.getByRole('link', { name: new RegExp(name) });
        await expect(messenger).toBeVisible();
      }
      await rental.locator('button').first().click();
      await page.getByRole('button', { name: 'Open messenger options' }).click();
      for (const name of ['WhatsApp chat', 'Telegram chat', 'Zalo chat']) {
        const link = page.getByRole('link', { name, exact: true });
        await expect(link).toBeVisible();
        await link.evaluate(element => { element.addEventListener('click', event => event.preventDefault(), { once: true }); element.click(); });
        expect(await link.getAttribute('href')).toMatch(/^https:\/\//);
      }
      await page.getByRole('button', { name: 'Close messenger options' }).click();
      await page.locator('[data-home-v2-footer]').scrollIntoViewIfNeeded();
      if (language === 'ru') {
        for (const slug of ['surf-lessons-danang', 'surfing-danang', 'my-khe-beach-surfing', 'surf-guide']) {
          await expect(page.locator(`[data-footer-quick-link][href="/${slug}"]`)).toHaveCount(1);
        }
      }
      const retiredLinks = await page.locator('a[href]').evaluateAll(nodes => nodes.map(node => new URL(node.href).pathname).filter(value => /^\/(ru\/)?home-v2(?:\/|$)/.test(value)));
      expect(retiredLinks).toEqual([]);
      await expectNoOverflow(page);
      await page.screenshot({ path: testInfo.outputPath(`${language}-${width}-full.png`), fullPage: true });
      const events = await page.evaluate(() => window.dataLayer || []);
      expect(events.some(event => event.event === 'booking_cta_click' && event.partner === 'hotel_abc' && event.utm_source === 'qa')).toBe(true);
      expect(events.some(event => event.event === 'whatsapp_click' && event.partner === 'hotel_abc' && event.lesson_id === 'lineup_pro')).toBe(true);
      expect(events.filter(event => event.event === 'page_view').every(event => !event.partner)).toBe(true);
      await page.locator('[data-home-v2-language-switcher]').click();
      await expect(page).toHaveURL(`${baseUrl}${alternate}?partner=hotel_abc&utm_source=qa&utm_medium=referral&utm_campaign=promotion`);
      expect(await page.evaluate(() => JSON.parse(localStorage.getItem('epic_surf_attribution')).partner)).toBe('hotel_abc');
      expect(errors).toEqual([]);
      expect(missing).toEqual([]);
    });
  }
}

test('sitemap, robots, Yandex and linked production pages remain available', async ({ page, request }) => {
  const sitemap = await request.get(`${baseUrl}/sitemap.xml`);
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).not.toContain('/home-v2');
  expect((await request.get(`${baseUrl}/robots.txt`)).status()).toBe(200);
  expect((await request.get(`${baseUrl}/yandex_484e32831173a936.html`)).status()).toBe(200);
  for (const route of ['/partners', '/ru/partners', '/surfboard-rental-danang', '/ru/surfboard-rental-danang', '/surf-lessons-danang', '/surfing-danang', '/my-khe-beach-surfing', '/surf-guide']) {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });
      expect(response.status()).toBe(200);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator(`a[href="${route.startsWith('/ru') ? '/ru' : '/'}"]`).first()).toBeVisible();
      await expect(page.locator('footer')).toBeAttached();
      await expectNoOverflow(page);
      await expect(page.locator('a[href*="/home-v2"]')).toHaveCount(0);
    }
  }
});
