const { chromium, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const base = process.env.EPIC_RENTAL_URL || 'http://localhost:3000';
const out = path.resolve(process.env.EPIC_RENTAL_QA_DIR || 'output/rental-refinement-2026-10-15/qa');
const report = { viewports: [], behavior: [], failures: [] };
fs.mkdirSync(out, { recursive: true });
const mark = (name, details = {}) => report.behavior.push({ name, passed: true, ...details });

async function fixtures(page) {
  await page.route('https://danangsurfcam.com/**', route => route.fulfill({contentType:'text/html',body:'<body style="margin:0;background:#222;color:#ddd;font:16px Arial;display:grid;place-items:center;height:100vh">Live Cam — external widget fixed for QA</body>'}));
  await page.route('https://www.google.com/maps/embed**', route => route.fulfill({contentType:'text/html',body:'<body style="background:#333;color:#ddd;font:16px Arial">Google Maps — external widget fixed for QA</body>'}));
}
async function load(page, locale, query='') {
  await page.goto(base+(locale==='ru'?'/ru':'')+'/surfboard-rental-danang'+query,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.fonts.status==='loaded'&&document.querySelector('.rv-board-layout'));
}
async function swipe(page, selector, dx, dy=0) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  const r=await page.locator(selector).boundingBox();
  const x=r.x+r.width*(dx<0?.8:.2),y=r.y+r.height*.5;
  const session=await page.context().newCDPSession(page);
  await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
  for(let i=1;i<=10;i++)await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+dx*i/10,y:y+dy*i/10}]});
  await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await session.detach();
}

(async()=>{
  const {rentalBoards}=await import(pathToFileURL(path.resolve('app/data/rentalBoards.js')).href);
  const browser=await chromium.launch();
  try {
    for(const locale of ['ru','en']) for(const width of [320,360,390,1024,1200,1440,1920,2560,3200]) {
      const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
      const errors=[];page.on('pageerror',error=>errors.push(error.message));
      await fixtures(page);await load(page,locale);
      const initialY=await page.evaluate(()=>scrollY);expect(initialY).toBe(0);
      await page.evaluate(()=>document.querySelectorAll('main img').forEach(n=>n.loading='eager'));
      await page.waitForFunction(()=>[...document.querySelectorAll('main img')].every(n=>n.complete&&n.naturalWidth>0));
      const measurements=await page.evaluate(()=>{
        const frame=document.querySelector('.rv-catalog .ds-content').getBoundingClientRect();
        return {width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,contentWidth:frame.width,contentLeft:frame.left,heroWidth:document.querySelector('.rv-hero').getBoundingClientRect().width,faqCount:document.querySelectorAll('.rv-faq .ds-faq-item').length,relatedCount:document.querySelectorAll('.rv-related-list>a').length,footerOpen:document.querySelector('.ds-lesson-footer-details').open,boardArrows:[...document.querySelectorAll('.rv-board-arrow')].filter(n=>n.getClientRects().length).length,canonical:document.querySelector('link[rel="canonical"]')?.href,alternates:[...document.querySelectorAll('link[rel="alternate"]')].map(n=>({lang:n.hreflang,href:n.href})),schemaCount:document.querySelectorAll('script[type="application/ld+json"]').length,h1Count:document.querySelectorAll('h1').length,sections:[...document.querySelectorAll('[data-section]')].map(n=>n.dataset.section)};
      });
      expect(measurements.overflow).toBe(false);expect(measurements.heroWidth).toBe(width);
      expect(measurements.footerOpen).toBe(false);expect(measurements.relatedCount).toBe(4);expect(measurements.h1Count).toBe(1);expect(measurements.schemaCount).toBeGreaterThan(0);
      expect(measurements.faqCount).toBe(locale==='ru'?7:8);expect(measurements.sections).toEqual(expect.arrayContaining(['rental-design-hero','rental-board-showroom','rental-board-specs','rental-board-strip','rental-process','rental-comparison','rental-pickup','rental-faq','rental-related','rental-final-cta']));
      expect(measurements.canonical).toContain((locale==='ru'?'/ru':'')+'/surfboard-rental-danang');expect(measurements.alternates.map(x=>x.lang)).toEqual(expect.arrayContaining(['en','ru','x-default']));
      if(width>=1200)expect(Math.abs(measurements.contentWidth-Math.min(width*.94,2160)*.832)).toBeLessThan(1);
      if(width<1200)expect(measurements.boardArrows).toBe(0);
      expect(errors).toEqual([]);
      const file=`${locale}-${width}-full.${[390,1440].includes(width)?'png':'jpg'}`;
      await page.screenshot({path:path.join(out,file),fullPage:true,...(!file.endsWith('.png')?{quality:78}:{})});
      if([390,1440].includes(width)){await page.screenshot({path:path.join(out,`${locale}-${width}-top.png`)});await page.locator('#rental-catalog').screenshot({path:path.join(out,`${locale}-${width}-catalog.png`)});}
      report.viewports.push({locale,...measurements,errors});await page.close();console.log(`Viewport ${locale} ${width}: passed`);
    }

    for(const locale of ['ru','en']) for(const mobile of [false,true]) {
      const context=await browser.newContext({viewport:{width:mobile?390:1440,height:900},hasTouch:mobile,isMobile:mobile,reducedMotion:'reduce'});
      const page=await context.newPage();await fixtures(page);await load(page,locale,'?partner=EPIC-RENTAL-QA&utm_source=rental-local-qa');
      await page.evaluate(()=>document.addEventListener('click',e=>{if(e.target.closest('a[target="_blank"]'))e.preventDefault();},true));
      const cases=`${locale}-${mobile?'mobile':'desktop'}`;
      if(mobile){
        await swipe(page,'.rv-photo-front',-180);await expect(page.locator('.rv-board-layout')).toHaveAttribute('data-active-board',rentalBoards[1].id);await expect(page.locator('dialog.rv-lightbox')).not.toBeVisible();
        await swipe(page,'.rv-photo-front',180);await expect(page.locator('.rv-board-layout')).toHaveAttribute('data-active-board',rentalBoards[0].id);
        const y=await page.evaluate(()=>scrollY);await swipe(page,'.rv-photo-front',0,-150);await expect(page.locator('.rv-board-layout')).toHaveAttribute('data-active-board',rentalBoards[0].id);expect(Math.abs((await page.evaluate(()=>scrollY))-y)).toBeGreaterThan(20);
        await expect(page.locator('.rv-board-arrow:visible')).toHaveCount(0);mark(cases+' horizontal swipe selects / vertical swipe scrolls');
      }else{
        await page.locator('.rv-board-next').click();await expect(page.locator('.rv-board-layout')).toHaveAttribute('data-active-board',rentalBoards[1].id);await page.locator('.rv-board-prev').click();await expect(page.locator('.rv-board-layout')).toHaveAttribute('data-active-board',rentalBoards[0].id);mark(cases+' desktop board arrows');
        for(const board of rentalBoards){await page.locator(`[data-board-id="${board.id}"]`).click();await expect(page.locator('.rv-board-layout')).toHaveAttribute('data-active-board',board.id);await page.waitForFunction(()=>[...document.querySelectorAll('.rv-gallery img')].every(n=>n.complete&&n.naturalWidth>0));}
        mark(cases+' all board photographs load',{boardCount:rentalBoards.length});
      }
      await expect(page.locator('.rv-filters')).toHaveCount(0);await expect(page.locator('.rv-zoom')).toHaveCount(0);await expect(page.locator('.rv-eyebrow')).toHaveCount(0);await expect(page.locator('.rv-board-thumb')).toHaveCount(rentalBoards.length);mark(cases+' removed filters, eyebrow and magnifiers / all boards remain');
      await page.locator(`[data-board-id="${rentalBoards[1].id}"]`).click();
      await page.locator('.rv-photo-back').click();await expect(page.locator('dialog.rv-lightbox')).toBeVisible();await page.keyboard.press('ArrowRight');await expect(page.locator('.rv-lightbox-views button').nth(2)).toHaveAttribute('aria-pressed','true');await page.keyboard.press('Escape');await expect(page.locator('dialog.rv-lightbox')).not.toBeVisible();expect(await page.evaluate(()=>document.activeElement.classList.contains('rv-photo-back'))).toBe(true);mark(cases+' lightbox keyboard / Escape / focus return');
      await page.locator(mobile?'.rv-mobile-booking>.ds-action':'.rv-board-copy>.ds-action').click();const modal=page.locator('[data-rental-dialog]');await expect(modal).toBeVisible();await expect(modal).toContainText('Softboard Pink');
      for(const name of ['WhatsApp','Telegram','Zalo']){const link=modal.getByRole('link',{name});await link.click();const href=await link.getAttribute('href');expect(decodeURIComponent(href)).toContain('Softboard Pink');expect(decodeURIComponent(href)).toContain('EPIC-RENTAL-QA');}
      await page.keyboard.press('Escape');await expect(modal).not.toBeVisible();expect(await page.evaluate(()=>document.body.style.overflow)).not.toBe('hidden');mark(cases+' selected-board rental dialog / all messenger URLs / partner code');
      const faq=page.locator('.rv-faq .ds-faq-item').first();await faq.getByRole('button').click();await expect(faq.locator('[role="region"]')).toBeVisible();await faq.getByRole('button').click();await expect(faq.locator('[role="region"]')).not.toBeVisible();mark(cases+' FAQ toggles');
      await expect(page.locator('.rv-comparison')).toBeVisible();await expect(page.locator('.rv-comparison .ds-action')).toHaveAttribute('href',locale==='ru'?'/ru#lessons':'/surf-lessons-danang');await expect(page.locator('.rv-comparison-map')).toBeVisible();await expect(page.locator('.rv-map-link')).toHaveAttribute('href',/google.com\/maps/);await expect(page.locator('.rv-map-canvas')).toHaveAttribute('data-latitude','16.0464674');await expect(page.locator('.rv-map-canvas')).toHaveAttribute('data-longitude','108.2504812');await expect(page.locator('.rv-school-marker')).toHaveAttribute('href',/16\.0464674.*108\.2504812/);mark(cases+' responsive comparison map / school marker / lesson link');
      await expect(page.locator('.rv-livecam iframe')).toHaveCount(0);await page.locator('.rv-livecam-start').click();await expect(page.locator('.rv-livecam iframe')).toHaveCount(1);await expect(page.locator('.rv-livecam')).toHaveAttribute('data-live-cam-state','loaded');mark(cases+' camera starts on request / combined pickup block');
      const footer=page.locator('.ds-lesson-footer-details');await expect(footer).not.toHaveAttribute('open','');await footer.locator('summary').click();await expect(footer).toHaveAttribute('open','');const map=footer.locator('[data-map-activate]');await expect(map).toBeVisible();await map.click();await expect(footer.locator('iframe')).toHaveCount(1);await footer.locator('summary').click();await expect(footer).not.toHaveAttribute('open','');mark(cases+' hidden footer / manual map activation');
      for(const name of ['WhatsApp','Telegram','Zalo']){const channel=page.locator('.rv-final-actions a').filter({hasText:name});await channel.click();expect(decodeURIComponent(await channel.getAttribute('href'))).toContain('EPIC-RENTAL-QA');}
      expect(await page.locator('.rv-final-actions a[href^="tel:"]').count()).toBe(1);mark(cases+' final contact channels and phone');
      if(mobile){await page.locator('[data-home-v2-menu-control]').click();await expect(page.locator('#home-v2-mobile-navigation')).toBeVisible();await page.locator('[data-home-v2-menu-control]').click();await expect(page.locator('#home-v2-mobile-navigation')).not.toBeVisible();mark(cases+' mobile menu');}
      await page.locator('[data-home-v2-language-switcher]').click();await page.waitForURL(new RegExp((locale==='ru'?'(?<!/ru)/surfboard-rental-danang':'/ru/surfboard-rental-danang')+'\\?'));expect(new URL(page.url()).searchParams.get('partner')).toBe('EPIC-RENTAL-QA');mark(cases+' language switch preserves query');
      await context.close();
    }
    report.result='passed';console.log(`Behavior checks: ${report.behavior.length} passed`);
  } catch(error){report.result='blocked';report.failures.push(error.stack);throw error;}
  finally{fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
