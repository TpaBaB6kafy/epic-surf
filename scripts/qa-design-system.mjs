import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

const base = process.env.EPIC_DS_URL || 'http://localhost:3000';
const out = path.resolve(process.env.EPIC_DS_OUTPUT || 'output/design-system-library-2026-10-05');
await fs.mkdir(out,{recursive:true});
const browser = await chromium.launch({headless:true});
const context = await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']});
const page = await context.newPage();
const errors = [], localFailures = [], remoteFailures = [], measurements = [], checks=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('requestfailed',req=>{if(req.failure()?.errorText==='net::ERR_ABORTED')return;(req.url().startsWith(base)?localFailures:remoteFailures).push({url:req.url(),error:req.failure()?.errorText});});
page.on('response',r=>{if(r.status()>=400 && r.url().startsWith(base))localFailures.push({url:r.url(),status:r.status()});});
const check = (name,value=true) => {assert.ok(value,name);checks.push(name);};
const goto = async url => {
  const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:120000});
  assert.equal(response.status(),200,url);
  await page.locator('[data-ds-page]').waitFor();
  await page.locator('[data-catalog-ready="true"]').waitFor({timeout:120000});
  await page.evaluate(()=>document.fonts.ready);
};
try {
  await goto(`${base}/design-system`);
  check('Catalog compiles and returns 200');
  const noScript = await browser.newContext({javaScriptEnabled:false});
  const staticPage = await noScript.newPage();
  await staticPage.goto(base+'/design-system',{waitUntil:'domcontentloaded'});
  check('Demo form cannot submit before JavaScript',await staticPage.locator('.ds-sample-form button[type="submit"]').isDisabled()&&await staticPage.locator('.ds-sample-form input[type="email"]').isDisabled());
  await noScript.close();
  assert.match(await page.locator('meta[name="robots"]').getAttribute('content'),/noindex.*nofollow/);
  check('Catalog has noindex/nofollow');
  check('No production analytics or production schema',await page.evaluate(()=>!document.querySelector('script[src*="googletagmanager"],script[src*="umami"],script[type="application/ld+json"]')));
  const sitemap=await context.request.get(`${base}/sitemap.xml`);
  check('Catalog absent from sitemap',!(await sitemap.text()).includes('/design-system'));
  const book=page.locator('#actions .ds-action-row button.ds-action');
  await book.click();
  const dialog=page.locator('dialog[open]');
  await dialog.waitFor();
  check('Dialog locks document scroll',await page.evaluate(()=>document.body.style.overflow==='hidden'));
  await page.getByRole('button',{name:'Готово',exact:true}).focus();
  await page.keyboard.press('Tab');
  check('Dialog Tab loops to close',await page.getByRole('button',{name:'Закрыть диалог',exact:true}).evaluate(el=>el===document.activeElement));
  await page.keyboard.press('Shift+Tab');
  check('Dialog Shift+Tab loops to last',await page.getByRole('button',{name:'Готово',exact:true}).evaluate(el=>el===document.activeElement));
  await page.keyboard.press('Escape');
  check('Escape closes and returns focus',await book.evaluate(el=>el===document.activeElement)&&await dialog.count()===0);
  check('Scroll lock restored',await page.evaluate(()=>document.body.style.overflow===''));
  await page.locator('#actions').getByRole('button',{name:'Загрузка',exact:true}).click();
  check('Loading cannot activate action',await book.isDisabled()&&await book.getAttribute('aria-busy')==='true');
  await page.locator('#actions').getByRole('button',{name:'Недоступна',exact:true}).click();
  check('Disabled action is unavailable',await book.isDisabled());
  await page.locator('#actions').getByRole('button',{name:'Готова',exact:true}).click();
  const faq=page.locator('#interaction .ds-faq-item > button');
  await faq.nth(0).click();assert.equal(await faq.nth(0).getAttribute('aria-expanded'),'true');
  await faq.nth(1).click();
  check('FAQ single-open and connected answer',await faq.nth(0).getAttribute('aria-expanded')==='false'&&await faq.nth(1).getAttribute('aria-expanded')==='true'&&await page.locator(`#${await faq.nth(1).getAttribute('aria-controls')}`).isVisible());
  const form=page.locator('.ds-sample-form');
  await form.getByRole('button',{name:'Проверить форму',exact:true}).click();
  check('Invalid field announced',await form.getByRole('alert').count()===1&&await form.getByLabel('Email',{exact:false}).getAttribute('aria-invalid')==='true');
  await form.getByLabel('Email',{exact:false}).fill('hello@example.com');
  await form.getByRole('button',{name:'Проверить форму',exact:true}).click();
  await form.getByRole('status').waitFor();
  check('Form resolves local success', (await form.getByRole('status').innerText()).includes('Данные не отправлялись'));
  const lessons=page.locator('#compositions .ds-service-recipe');
  const options=page.locator('#compositions .ds-demo-selector').first().locator('button');
  assert.equal(await options.count(),5);
  for(let i=0;i<5;i++){await options.nth(i).click();assert.equal(await lessons.locator('h3').innerText(),await options.nth(i).innerText());}
  await lessons.getByRole('button',{name:'Следующий урок'}).click();
  check('Five formats and arrow wraparound',await options.first().getAttribute('aria-pressed')==='true');
  const gallery=page.locator('#compositions .ds-gallery-recipe');
  await gallery.getByRole('button',{name:'Комьюнити',exact:true}).click();
  const tile=gallery.locator('.ds-gallery-tile').first();await tile.click();
  await page.keyboard.press('ArrowRight');
  check('Gallery keyboard next', (await dialog.locator('h2').innerText()).includes('2 / 5'));
  await page.keyboard.press('ArrowLeft');
  check('Gallery keyboard previous', (await dialog.locator('h2').innerText()).includes('1 / 5'));
  await gallery.locator('.ds-full-photo').evaluate(el=>{
    const start=new Touch({identifier:1,target:el,clientX:220,clientY:120});
    el.dispatchEvent(new TouchEvent('touchstart',{bubbles:true,touches:[start]}));
    const end=new Touch({identifier:1,target:el,clientX:120,clientY:130});
    el.dispatchEvent(new TouchEvent('touchend',{bubbles:true,touches:[],changedTouches:[end]}));
  });
  check('Gallery horizontal swipe advances',(await dialog.locator('h2').innerText()).includes('2 / 5'));
  await gallery.locator('.ds-full-photo').evaluate(el=>{
    const start=new Touch({identifier:1,target:el,clientX:220,clientY:120});
    el.dispatchEvent(new TouchEvent('touchstart',{bubbles:true,touches:[start]}));
    const end=new Touch({identifier:1,target:el,clientX:210,clientY:220});
    el.dispatchEvent(new TouchEvent('touchend',{bubbles:true,touches:[],changedTouches:[end]}));
  });
  check('Gallery vertical gesture does not change selection',(await dialog.locator('h2').innerText()).includes('2 / 5'));
  await page.keyboard.press('Escape');
  check('Gallery focus returns to selected photo',await tile.evaluate(el=>el===document.activeElement));
  const code=page.locator('#usage .ds-code');await code.locator('summary').click();
  await code.getByRole('button',{name:'Копировать код'}).click();
  check('Copy exports usable example',(await page.evaluate(()=>navigator.clipboard.readText())).includes("@/app/components/design-system"));
  await page.locator('.ds-catalog-languages').getByRole('button',{name:'EN',exact:true}).click();
  check('Language updates content and URL',await page.locator('html').getAttribute('lang')==='en'&&page.url().includes('lang=en')&&(await page.locator('h1').innerText()).includes('One style'));
  await page.locator('#responsive').getByRole('button',{name:'1440 px',exact:true}).click();
  await page.locator('.ds-responsive-frame').scrollIntoViewIfNeeded();
  check('Preview does not capture ordinary page scrolling',await page.locator('.ds-responsive-frame').evaluate(el=>el.inert&&getComputedStyle(el).pointerEvents==='none'));
  await page.locator('#responsive').getByRole('button',{name:'Enable interaction',exact:true}).click();
  check('Preview interaction is explicitly enabled',await page.locator('.ds-responsive-frame').evaluate(el=>!el.inert&&getComputedStyle(el).pointerEvents==='auto'));
  const frame=page.frameLocator('.ds-responsive-frame');await frame.locator('[data-ds-page]').waitFor();
  check('Responsive preview uses real viewport',await frame.locator('body').evaluate(()=>innerWidth)===1440);
  check('Iframe language follows selection',await frame.locator('[data-ds-page]').getAttribute('lang')==='en');
  await page.emulateMedia({reducedMotion:'reduce'});
  check('Reduced motion removes CTA lift',await page.locator('.ds-action[data-preview-state="hover"]').first().evaluate(el=>getComputedStyle(el).translate==='none'));
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.waitForFunction(()=>getComputedStyle(document.querySelector('.ds-action[data-preview-state="hover"]')).translate==='0px -3px');
  check('Ordinary motion shows hover lift',await page.locator('.ds-action[data-preview-state="hover"]').first().evaluate(el=>getComputedStyle(el).translate==='0px -3px'));
  for(const lang of ['ru','en']) for(const width of [320,360,390,699,700,899,900,1024,1199,1200,1440,1920,2560,3200]) {
    await page.setViewportSize({width,height:1000});await goto(`${base}/design-system?lang=${lang}`);
    // Load local lazy images without changing component behavior.
    await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=800){scrollTo(0,y);await new Promise(r=>setTimeout(r,30));}scrollTo(0,0);});
    const sample=await page.evaluate(()=>{
      const frame=document.querySelector('#foundations > .ds-content'),style=getComputedStyle(frame),rect=frame.getBoundingClientRect();
      const badTargets=[...document.querySelectorAll('main button:not([inert] button),main a,header button,header a,summary')].filter(el=>el.getClientRects().length&& !el.closest('[inert]')).map(el=>({el,r:el.getBoundingClientRect()})).filter(({r})=>r.width<43.5||r.height<43.5).map(({el,r})=>({label:el.textContent||el.getAttribute('aria-label'),width:r.width,height:r.height}));
      return {lang:document.documentElement.lang,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,contentWidth:rect.width,contentLeft:rect.left,fontSize:style.fontSize,badTargets,failedLocalImages:[...document.images].filter(i=>i.currentSrc.startsWith(location.origin)&&i.complete&&i.naturalWidth===0).map(i=>i.currentSrc)};
    });
    measurements.push(sample);assert.ok(sample.scrollWidth<=width+1,`${lang}${width}: horizontal overflow`);assert.equal(sample.failedLocalImages.length,0,`${lang}${width}: image failures`);
    assert.equal(sample.badTargets.length,0,`${lang}${width}: small controls ${JSON.stringify(sample.badTargets)}`);
    if(width>=1200)assert.ok(Math.abs(sample.contentWidth-Math.min(.94*width,2160)*.832)<1,`${lang}${width}: frame mismatch`);
    if([390,1024,1440,2560].includes(width)){
      await page.locator('.ds-responsive-frame').scrollIntoViewIfNeeded();
      await page.frameLocator('.ds-responsive-frame').locator('[data-catalog-ready="true"]').waitFor({timeout:60000});
      await page.frameLocator('.ds-responsive-frame').locator('body').evaluate(()=>document.fonts.ready);
      await page.evaluate(()=>scrollTo(0,0));
      await page.screenshot({path:path.join(out,`catalog-${lang}-${width}.png`),fullPage:true});
    }
    if([390,1024,1440,2560].includes(width)){
      await goto(`${base}/design-system?preview=1&lang=${lang}`);
      await page.locator('.ds-process-recipe').screenshot({path:path.join(out,`process-${lang}-${width}.png`)});
      await page.locator('.ds-service-recipe').screenshot({path:path.join(out,`service-${lang}-${width}.png`)});
    }
  }
  check('EN/RU responsive matrix, targets, images and bounded frame');
  check('No browser exceptions',errors.length===0);check('No local asset or route failures',localFailures.length===0);
  console.log(JSON.stringify({checks,measurements,errors,localFailures,remoteFailures},null,2));
} finally {
  await fs.writeFile(path.join(out,'qa.json'),JSON.stringify({checks,measurements,errors,localFailures,remoteFailures},null,2));
  await browser.close();
}
