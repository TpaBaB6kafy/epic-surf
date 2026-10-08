import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';

const base = process.env.EPIC_QA_URL || 'http://localhost:3000';
const root = process.env.EPIC_QA_OUTPUT || 'output/partners-vi-2026-10-08';
await fs.mkdir(root + '/after', { recursive: true });
const checks = [], rows = [], errors = [];
const check = (name, value) => { assert.ok(value, name); checks.push(name); };
const browser = await chromium.launch({ headless: true });
const routeFor = locale => locale === 'en' ? '/partners' : '/' + locale + '/partners';
const setup = async width => {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', route => new URL(route.request().url()).origin === new URL(base).origin
    ? route.continue()
    : route.fulfill({ contentType: 'text/html', body: '<body>External service stubbed for local QA.</body>' }));
  return { context, page };
};
try {
  const { context, page } = await setup(1440);
  for (const locale of ['en', 'ru', 'vi']) {
    const path = routeFor(locale);
    const response = await context.request.get(base + path);
    const html = await response.text();
    check(locale + ': independent URL returns server-rendered content', response.status() === 200 && html.includes(locale === 'vi' ? 'Giới thiệu' : locale === 'ru' ? 'партнёром' : 'Partner with'));
    await page.goto(base + path, { waitUntil: 'networkidle' });
    check(locale + ': HTML language', await page.locator('html').getAttribute('lang') === locale);
    check(locale + ': self canonical', (await page.locator('link[rel=canonical]').getAttribute('href')).endsWith(path));
    for (const target of ['en', 'ru', 'vi']) {
      check(locale + ': hreflang ' + target, (await page.locator('link[hreflang=' + target + ']').getAttribute('href')).endsWith(routeFor(target)));
    }
    check(locale + ': x-default English', (await page.locator('link[hreflang=x-default]').getAttribute('href')).endsWith('/partners'));
    check(locale + ': indexable', !(await page.locator('meta[name=robots]').getAttribute('content')).includes('noindex'));
    const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.map(node => JSON.parse(node.textContent)));
    check(locale + ': page schema matches language and URL', schemas.some(schema => schema['@type'] === 'WebPage' && schema.inLanguage === locale && schema.url.endsWith(path)));
    if (locale === 'vi') {
      check('VI: localized search title and description', (await page.title()).includes('Đối tác tại Đà Nẵng') && (await page.locator('meta[name=description]').getAttribute('content')).includes('lướt sóng'));
      check('VI: social locale', await page.locator('meta[property="og:locale"]').getAttribute('content') === 'vi_VN');
      check('VI: no English homepage schema', schemas.length === 1);
    }
  }
  const sitemap = await (await context.request.get(base + '/sitemap.xml')).text();
  check('VI: included in sitemap', sitemap.includes('<loc>https://www.surfdanang.com/vi/partners</loc>'));
  check('Sitemap: Vietnamese alternates for all three partners', (sitemap.match(/hreflang="vi"/g) || []).length === 3);
  check('Sitemap: no invented Vietnamese homepage', !sitemap.includes('<loc>https://www.surfdanang.com/vi</loc>'));

  await page.goto(base + '/vi/partners?partner=qa_vi_hotel&utm_source=qa&utm_campaign=vi_launch', { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: 'nextjs-portal { display: none !important; }' });
  await page.evaluate(() => document.addEventListener('click', event => { if (event.target.closest('a[target="_blank"]')) event.preventDefault(); }));
  const mainActions = page.locator('main .ds-action');
  await mainActions.nth(1).click();
  const contact = new URL(await mainActions.nth(1).getAttribute('href'));
  check('VI: primary messenger is Zalo', contact.hostname === 'zalo.me');
  check('VI: message and partner code use Vietnamese', contact.searchParams.get('text').includes('Xin chào') && contact.searchParams.get('text').includes('Mã đối tác: qa_vi_hotel'));
  await mainActions.nth(2).click();
  check('VI: final partnership CTA is Zalo', (await mainActions.nth(2).getAttribute('href')).startsWith('https://zalo.me/'));

  for (const selector of ['header .site-language-control', '.ds-lesson-footer-socials .site-language-control']) {
    for (const target of ['en', 'ru', 'vi']) {
      await page.locator(selector).getByRole('button').click();
      check('Round language controls ' + selector + ' / ' + target, await page.locator(selector).locator('.site-language-options > a').evaluateAll(nodes => nodes.length === 3 && nodes.every(node => { const r=node.getBoundingClientRect(); return r.width === 44 && r.height === 44 && getComputedStyle(node).borderRadius === '50%'; })));
      await page.keyboard.press('Escape');
      check('Language Escape restores focus ' + selector + ' / ' + target, await page.locator(selector).getByRole('button').evaluate(node => document.activeElement === node && node.getAttribute('aria-expanded') === 'false'));
      await page.locator(selector).getByRole('button').click();
      await page.locator(selector).getByRole('link', { name: target === 'en' ? 'English' : target === 'ru' ? 'Русский' : 'Tiếng Việt', exact: true }).click();
      await page.waitForURL(url => url.pathname === routeFor(target));
      await page.waitForLoadState('networkidle');
      check('Language route ' + selector + ' -> ' + target, new URL(page.url()).searchParams.get('partner') === 'qa_vi_hotel' && new URL(page.url()).searchParams.get('utm_campaign') === 'vi_launch');
    }
  }
  const dialog = page.locator('dialog[open]');
  await page.locator('main .ds-action').first().click();
  check('VI: dialog focuses email', await dialog.locator('input[type=email]').evaluate(node => document.activeElement === node));
  await dialog.getByRole('button', { name: 'Gửi yêu cầu', exact: true }).click();
  check('VI: email validation is localized', await dialog.getByText('Vui lòng kiểm tra địa chỉ email, ví dụ: name@example.com.').isVisible());
  await dialog.locator('input[type=email]').fill('vi-partner@example.com');
  let captured;
  let responseStatus = 429;
  await page.route('**/api/partner-code', async route => {
    captured = route.request().postDataJSON();
    await route.fulfill({ status: responseStatus, contentType: 'application/json', body: JSON.stringify({ ok: responseStatus === 200 }) });
  });
  await dialog.getByRole('button', { name: 'Gửi yêu cầu', exact: true }).click();
  await dialog.getByText('Quý đối tác đã gửi yêu cầu nhiều lần. Vui lòng thử lại sau ít phút.').waitFor();
  check('VI: request includes language and stored source', captured.language === 'vi' && captured.attribution.partner === 'qa_vi_hotel' && captured.attribution.landing_page === '/vi/partners');
  responseStatus = 502;
  await dialog.getByRole('button', { name: 'Gửi yêu cầu', exact: true }).click();
  await dialog.getByText('Chưa gửi được yêu cầu.', { exact: false }).waitFor();
  check('VI: failed delivery offers Zalo', (await dialog.getByRole('link', { name: 'Trao đổi qua Zalo' }).getAttribute('href')).startsWith('https://zalo.me/'));
  await page.keyboard.press('Escape');
  await dialog.waitFor({ state: 'detached' });
  check('VI: dialog restores focus', await page.locator('main .ds-action').first().evaluate(node => document.activeElement === node));
  await page.locator('main .ds-action').first().click();
  await dialog.locator('input[type=email]').fill('vi-partner@example.com');
  responseStatus = 200;
  await dialog.getByRole('button', { name: 'Gửi yêu cầu', exact: true }).click();
  await dialog.getByText('Đã gửi yêu cầu.', { exact: false }).waitFor();
  check('VI: success only after accepted request', await dialog.getByRole('button', { name: 'Hoàn tất' }).isVisible());
  await dialog.screenshot({ path: root + '/vi-dialog-success.png' });
  await dialog.getByRole('button', { name: 'Hoàn tất' }).click();
  for (let i = 0; i < 3; i++) {
    await page.getByRole('tab').nth(i).click();
    check('VI: format ' + i + ' active', await page.getByRole('tab').nth(i).getAttribute('aria-selected') === 'true');
    await page.locator('.partner-slider').screenshot({ path: root + '/vi-format-' + i + '.png' });
  }
  await page.getByRole('tab').last().focus();
  await page.keyboard.press('ArrowRight');
  check('VI: slider keyboard wraps', await page.getByRole('tab').first().getAttribute('aria-selected') === 'true');
  await page.keyboard.press('ArrowLeft');
  check('VI: slider keyboard wraps back', await page.getByRole('tab').last().getAttribute('aria-selected') === 'true');
  const details = page.locator('.ds-site-footer-wide > details');
  await details.locator('summary').click();
  check('VI: full footer translated', await page.getByRole('button', { name: 'Mở bản đồ tương tác' }).isVisible() && await page.locator('[data-footer-contact=partners]').innerText() === 'Dành cho đối tác');
  await page.getByRole('button', { name: 'Mở bản đồ tương tác' }).click();
  check('VI: map activation preserved', !(await page.locator('[data-home-v2-footer-map-iframe]').evaluate(node => node.inert)));
  await page.locator('[data-home-v2-book-now]').click();
  check('VI: booking UI localized and existing English destination', await page.getByRole('button', { name: 'Đóng biểu mẫu đặt lịch' }).isVisible() && (await page.locator('[data-booking-dialog] iframe').getAttribute('src')).includes('n1435324.alteg.io'));
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Mở các kênh liên hệ' }).click();
  check('VI: Zalo first in floating contacts', await page.locator('[data-home-v2-messenger-fab] a').first().getAttribute('aria-label') === 'Liên hệ qua Zalo');
  await page.getByRole('button', { name: 'Đóng các kênh liên hệ' }).click();
  await context.close();

  for (const locale of ['en', 'ru', 'vi']) {
    const widths = locale === 'vi' ? [320,360,390,700,1024,1200,1440,1920,2560,3200] : [390,1024,1440,1920,2560];
    for (const width of widths) {
      const { context, page } = await setup(width);
      await page.goto(base + routeFor(locale), { waitUntil: 'networkidle' });
      await page.addStyleTag({ content: 'nextjs-portal { display: none !important; }' });
      await page.evaluate(() => document.fonts.ready);
      for (const section of await page.locator('main > section').all()) await section.scrollIntoViewIfNeeded();
      for (const img of await page.locator('main img').all()) await img.evaluate(node => node.decode());
      await page.evaluate(() => window.scrollTo({left:0,top:0,behavior:"instant"}));
      const measurements = await page.evaluate(() => {
        const rect = node => { const b = node.getBoundingClientRect(); return { x:b.x, y:b.y, width:b.width, height:b.height }; };
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          sections: document.querySelectorAll('main > section').length,
          h1: document.querySelector('main h1').textContent,
          frames: [...document.querySelectorAll('main .ds-content')].map(rect),
          images: [...document.querySelectorAll('main img')].map(node => ({ loaded: node.complete && node.naturalWidth > 0 })),
          header: [...document.querySelectorAll('[data-home-v2-header-actions] > *')].filter(node=>node.getBoundingClientRect().width>0).map(rect),
        };
      });
      check(locale + '/' + width + ': no horizontal overflow', !measurements.overflow);
      check(locale + '/' + width + ': six sections and loaded imagery', measurements.sections === 6 && measurements.images.every(img => img.loaded));
      check(locale + '/' + width + ': header controls remain inside viewport', measurements.header.every(item => item.x >= 0 && item.x + item.width <= width + 1 && item.height >= 44));
      if (width >= 1200) {
        const contentWidth = Math.min(width * .94, 2160) * .832;
        check(locale + '/' + width + ': approved content edges', measurements.frames.every(frame => Math.abs(frame.width-contentWidth) < 1 && Math.abs(frame.x-(width-contentWidth)/2) < 1));
      }
      await page.screenshot({ path: root + '/after/' + locale + '-' + width + '.png', fullPage: true });
      if (locale === 'vi' && width === 390) {
        await page.locator('main .ds-action').first().click();
        await page.locator('dialog[open]').screenshot({path:root+'/vi-dialog-mobile.png'});
        check('VI mobile: dialog fits screen', await page.locator('dialog[open]').evaluate(node => {const r=node.getBoundingClientRect();return r.left>=0 && r.right<=innerWidth && r.bottom<=innerHeight;}));
      }
      if (locale === 'vi' && width === 1440) {
        const client = await context.newCDPSession(page);
        await client.send('DOM.enable'); await client.send('CSS.enable');
        const { root: dom } = await client.send('DOM.getDocument');
        const fonts = {};
        for (const selector of ['.partner-title','.partner-hero-description']) {
          const { nodeId } = await client.send('DOM.querySelector', { nodeId: dom.nodeId, selector });
          fonts[selector] = (await client.send('CSS.getPlatformFontsForNode', { nodeId })).fonts;
        }
        await fs.writeFile(root + '/fonts.json', JSON.stringify(fonts,null,2));
      }
      rows.push({locale,width,...measurements});
      await context.close();
    }
  }
  check('No runtime errors across all languages', errors.length === 0);
  await fs.writeFile(root + '/qa.json', JSON.stringify({checks,rows,errors,limitations:['External scripts and widgets stubbed; form delivery mocked. No messages sent to real partners or the bot.','Translation authored and reviewed by the coding agent; no independent human native-speaker review.']},null,2));
  console.log('Passed ' + checks.length + ' checks; ' + rows.length + ' responsive captures. No real message delivery.');
} finally { await browser.close(); }
