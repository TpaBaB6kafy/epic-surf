import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('output/lesson-selected-mockup');
const after=JSON.parse(await fs.readFile(path.join(root,'after.json'),'utf8'));
const before=JSON.parse(await fs.readFile(path.join(root,'before.json'),'utf8'));
const load=async file=>import('data:text/javascript,'+encodeURIComponent(await fs.readFile(file,'utf8')));
const {links}=await load('app/data/links.js');
const checks=[],errors=[],failures=[];
function check(name,value){assert.ok(value,name);checks.push(name);}
for(const snapshot of after){
 check(`${snapshot.locale}/${snapshot.width}: no overflow`,!snapshot.overflow);
 check(`${snapshot.locale}/${snapshot.width}: loaded photos`,snapshot.images.every(i=>i.loaded));
 const original=before.find(i=>i.locale===snapshot.locale);
 for(const key of ['title','canonical','alternates','schema'])assert.deepEqual(snapshot[key],original[key],key);
 check(`${snapshot.locale}/${snapshot.width}: metadata retained`,true);
 if(snapshot.width>=1200)check(`${snapshot.locale}/${snapshot.width}: approved common content width`,snapshot.frames.every(f=>Math.abs(f.width-Math.min(snapshot.width*.94,2160)*.832)<.2));
}
const browser=await chromium.launch({headless:true});
for(const locale of ['ru','en']){
 const ru=locale==='ru';
 const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 const page=await context.newPage();
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.url().startsWith('http://localhost:3000')&&r.status()>=400)failures.push(r.url());});
 await page.route('**/*',route=>{const url=new URL(route.request().url());return url.hostname==='localhost'?route.continue():route.fulfill({contentType:'text/html',body:'<html><body>QA external service; no submission.</body></html>'});});
 await page.goto('http://localhost:3000'+(ru?'/ru':'')+'/surf-lessons-danang?partner=lesson_test&utm_source=qa',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 check(`${locale}: one H1`,await page.locator('main h1').count()===1);
 check(`${locale}: original homepage header component`,await page.locator('header').first().getAttribute('data-home-v2-header')==='true');
 check(`${locale}: hero background real EPIC photo`,(await page.locator('.ds-lesson-hero-photo').getAttribute('src')).includes('practice-photo.webp'));
 const primary=page.locator('#lesson-intro .ds-action-primary');await primary.click();await page.locator('[data-booking-dialog]').waitFor();
 check(`${locale}: hero booking destination`,await page.locator('[data-booking-dialog] iframe').getAttribute('src')===links.booking[locale].group);
 check(`${locale}: modal scroll lock`,await page.evaluate(()=>document.body.style.overflow==='hidden'));
 await page.keyboard.press('Escape');await page.locator('[data-booking-dialog]').waitFor({state:'detached'});
 check(`${locale}: closing restores focus`,await primary.evaluate(n=>document.activeElement===n));
 const formats=['group','private','split'];
 for(let i=0;i<3;i++){
  const choice=page.locator('#lesson-formats .ds-lesson-choice').nth(i);await choice.click();
  check(`${locale}/${formats[i]}: selection state`,await choice.getAttribute('aria-pressed')==='true');
  const region=page.locator('#lesson-formats [role=region]:visible');
  const photo=region.locator('img');await photo.scrollIntoViewIfNeeded();
  await page.waitForFunction(src=>[...document.images].some(img=>img.getAttribute('src')===src&&img.complete&&img.naturalWidth>0),await photo.getAttribute('src'));
  await region.locator('.ds-action-primary').click();await page.locator('[data-booking-dialog]').waitFor();
  check(`${locale}/${formats[i]}: booking matches choice`,await page.locator('[data-booking-dialog] iframe').getAttribute('src')===links.booking[locale][formats[i]]);
  await page.keyboard.press('Escape');await page.locator('[data-booking-dialog]').waitFor({state:'detached'});
 }
 await page.locator('#lesson-formats [role=region]:visible').getByRole('button',{name:ru?'Следующий урок':'Next lesson'}).click();
 check(`${locale}: next arrow wraps`,await page.locator('.ds-lesson-choice').first().getAttribute('aria-pressed')==='true');
 await page.locator('#lesson-formats [role=region]:visible').getByRole('button',{name:ru?'Предыдущий урок':'Previous lesson'}).click();
 check(`${locale}: previous arrow wraps`,await page.locator('.ds-lesson-choice').last().getAttribute('aria-pressed')==='true');
 const faq=page.locator('#lesson-faq > .ds-faq-list button');await faq.first().focus();await page.keyboard.press('Enter');
 check(`${locale}: keyboard FAQ opens`,await faq.first().getAttribute('aria-expanded')==='true');await faq.nth(1).click();
 check(`${locale}: FAQ closes previous`,await faq.first().getAttribute('aria-expanded')==='false');
 await page.locator('.ds-lesson-more > summary').click();
 check(`${locale}: additional details and links available`,await page.locator('#lesson-related').isVisible()&&await page.locator('#lesson-related a').count()===4);
 await page.evaluate(()=>document.addEventListener('click',event=>{if(event.target.closest('a[target="_blank"]'))event.preventDefault();}));
 const whatsapp=page.locator('#lesson-contact a').filter({hasText:'WhatsApp'});await whatsapp.click();
 check(`${locale}: WhatsApp retains attribution`,decodeURIComponent(await whatsapp.getAttribute('href')).includes('lesson_test'));
 for(const label of ['Telegram','Zalo']){const a=page.locator('#lesson-contact a').filter({hasText:label});await a.click();check(`${locale}: ${label} link`,(await a.getAttribute('href')).startsWith(links[label.toLowerCase()]));}
 const footerWhatsapp=page.locator('.ds-lesson-footer-socials a[aria-label="WhatsApp"]');await footerWhatsapp.click();
 check(`${locale}: footer WhatsApp retains attribution`,decodeURIComponent(await footerWhatsapp.getAttribute('href')).includes('lesson_test'));
 await page.locator('.ds-lesson-footer-details > summary').click();
 const map=page.locator('[data-home-v2-footer-map-iframe]');
 check(`${locale}: map initially inert`,await map.getAttribute('inert')!==null);
 await page.locator('[data-map-activate]').click();check(`${locale}: map activates explicitly`,await map.getAttribute('inert')===null);
 await page.setViewportSize({width:390,height:844});
 await page.locator('[data-home-v2-menu-control]').click();
 check(`${locale}: mobile menu available`,await page.locator('#home-v2-mobile-navigation').isVisible());
 await page.locator('[data-home-v2-menu-control]').click();
 const tiny=await page.locator('main a,main button,header button,header a,.ds-lesson-footer-row a,.ds-lesson-footer-details > summary').evaluateAll(nodes=>nodes.filter(n=>{const r=n.getBoundingClientRect();return r.width>0&&r.height>0&&(r.width<43.9||r.height<43.9)}).map(n=>n.outerHTML.slice(0,120)));
 if(tiny.length)console.log(JSON.stringify({locale,tiny}));
 check(`${locale}: mobile interactive targets44px`,tiny.length===0);
 await page.locator('[data-home-v2-language-switcher]').click();await page.waitForURL(url=>url.pathname===(ru?'':'/ru')+'/surf-lessons-danang');
 check(`${locale}: peer language route`,new URL(page.url()).searchParams.get('partner')==='lesson_test');
 await context.close();
}
// Homepage stays visually and structurally unchanged outside the two lesson routes.
const controls=JSON.parse(await fs.readFile('output/service-pilot-2026-10-05/after.json','utf8'));
for(const route of ['/','/ru']){
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 await page.goto('http://localhost:3000'+route,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 const current=await page.evaluate(()=>[...document.querySelectorAll('h1,h2,[data-home-v2-header-frame],[data-home-v2-footer-main]')].slice(0,20).map(n=>{const r=n.getBoundingClientRect(),s=getComputedStyle(n);return {text:n.textContent,x:r.x,y:r.y,width:r.width,height:r.height,color:s.color,fontSize:s.fontSize}}));
 const original=controls.find(i=>i.route===route).control.items;
 check(`${route}: same headings and header/footer geometry`,current.every((n,i)=>n.text===original[i].text&&['x','y','width','height'].every(k=>Math.abs(n[k]-original[i][k])<1)&&n.color===original[i].color));
 await page.close();
}
await browser.close();check('no browser exceptions',errors.length===0);check('no failed local assets',failures.length===0);
await fs.writeFile(path.join(root,'validation.json'),JSON.stringify({checks,errors,failures,externalServices:'Stubbed for interaction tests; no booking submitted or message sent.'},null,2));
console.log(`${checks.length} checks passed.`);
