import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('output/service-pilot-2026-10-05');
const before=JSON.parse(await fs.readFile(path.join(root,'before.json'),'utf8'));
const after=JSON.parse(await fs.readFile(path.join(root,'after.json'),'utf8'));
const sourceModule=async file=>import('data:text/javascript,'+encodeURIComponent(await fs.readFile(file,'utf8')));
const {links}=await sourceModule('app/data/links.js');
const {getSeoPage}=await sourceModule('app/data/seoPages.js');
const results=[],errors=[],assetFailures=[];
const check=(name,value)=>{assert.ok(value,name);results.push(name);};
const normalize=s=>s.replace(/\s+/g,' ').trim();
for(const a of after.filter(i=>i.locale)) {
 const b=before.find(i=>i.locale===a.locale&&i.width===a.width);
 check(`${a.locale}/${a.width}: no overflow`,!a.overflow);
 for(const key of ['title','lang','canonical','alternates','schema']) assert.deepEqual(a[key],b[key],`${a.locale}/${a.width}: ${key}`);
 check(`${a.locale}/${a.width}: metadata and schema preserved`,true);
 if(a.width>=1200)check(`${a.locale}/${a.width}: bounded common edges`,a.frame.every(f=>Math.abs(f.width-Math.min(a.width*.94,2160)*.832)<.1));
 const page=getSeoPage('surf-lessons-danang',a.locale);
 for(const section of page.sections) {
  if(section.body)assert.ok(normalize(a.text).includes(normalize(section.body)),section.title+' body');
  for(const text of section.items||[])assert.ok(normalize(a.text).includes(normalize(text)),text);
  for(const card of section.cards||[])assert.ok(normalize(a.text).includes(normalize(card.text.replace(/\s*(?:Current site price|Текущая цена на сайте):.*$/,''))),card.title);
 }
 for(const faq of page.faq)assert.ok(normalize(a.text).includes(normalize(faq.answer)),faq.question);
 check(`${a.locale}/${a.width}: original content preserved`,true);
}
for(const a of after.filter(i=>i.control&&i.route!='/design-system?lang=ru')) {
 const b=before.find(i=>i.route===a.route);assert.equal(a.control.title,b.control.title);
 for(let i=0;i<b.control.items.length;i++) {
  const x=b.control.items[i],y=a.control.items[i];assert.equal(x.text,y.text,a.route+' content');assert.equal(x.color,y.color,a.route+' color');
  for(const key of ['x','y','width','height'])assert.ok(Math.abs(x[key]-y[key])<=.03,a.route+' '+key);
 }
 check(`${a.route}: control content, geometry, color preserved`,true);
}
const browser=await chromium.launch();
for(const locale of ['en','ru']) {
 const ru=locale==='ru',route=(ru?'/ru':'')+'/surf-lessons-danang';
 const context=await browser.newContext({viewport:{width:390,height:844}});
 // Controlled external services: validate destinations without making bookings or sending messages.
 await context.route('**/*',route=>new URL(route.request().url()).hostname==='localhost'?route.continue():route.fulfill({status:200,contentType:'text/html',body:'<p>External service stub for local QA</p>'}));
 const p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));
 p.on('response',r=>{if(new URL(r.url()).hostname==='localhost'&&r.status()>=400)assetFailures.push([r.status(),r.url()]);});
 await p.goto('http://localhost:3000'+route+'?partner=pilot_test&utm_source=design_review',{waitUntil:'networkidle'});
 await p.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';scrollTo({top:0,behavior:'instant'});});
 await p.locator('[data-home-v2-menu-control]').click();await p.locator('#home-v2-mobile-navigation').waitFor();
 await p.locator('#home-v2-mobile-navigation').getByRole('link').first().click({trial:true});
 await p.locator('[data-home-v2-menu-control]').click();
 check(`${locale}: mobile menu opens and closes`,await p.locator('[data-home-v2-menu-control]').getAttribute('aria-expanded')==='false');
 const primary=p.locator('#lesson-intro .ds-action-primary');await primary.click();
 await p.locator('[data-booking-dialog]').waitFor();
 assert.equal(await p.locator('[data-booking-dialog] iframe').getAttribute('src'),links.booking[locale].group);
 check(`${locale}: primary booking URL`,true);
 check(`${locale}: modal locks scroll`,await p.evaluate(()=>document.body.style.overflow==='hidden'));
 await p.keyboard.press('Escape');await p.locator('[data-booking-dialog]').waitFor({state:'detached'});
 check(`${locale}: Escape restores focus`,await primary.evaluate(n=>document.activeElement===n));
 check(`${locale}: closing restores scrolling`,await p.evaluate(()=>document.body.style.overflow!=='hidden'));
 const formatIds=['group','private','split'];
 for(let i=0;i<formatIds.length;i++) {
  const filter=p.locator('#lesson-formats .ds-filter').nth(i);await filter.click();
  check(`${locale}/${formatIds[i]}: selected state`,await filter.getAttribute('aria-pressed')==='true');
  const panel=p.locator('#lesson-formats [role=region]:visible');
  await p.waitForFunction(id=>{const img=document.getElementById(id).querySelector('img');return img.complete&&img.naturalWidth>0;},await panel.getAttribute('id'));
  check(`${locale}/${formatIds[i]}: photo loads`,true);
  const action=panel.locator('.ds-action');await action.click();await p.locator('[data-booking-dialog]').waitFor();
  assert.equal(await p.locator('[data-booking-dialog] iframe').getAttribute('src'),links.booking[locale][formatIds[i]]);
  check(`${locale}/${formatIds[i]}: correct booking destination`,true);
  await p.keyboard.press('Escape');await p.locator('[data-booking-dialog]').waitFor({state:'detached'});
 }
 await p.locator('#lesson-formats [role=region]:visible').getByRole('button',{name:ru?'Следующий урок':'Next lesson'}).click();
 check(`${locale}: next format wraps`,await p.locator('#lesson-formats .ds-filter').first().getAttribute('aria-pressed')==='true');
 const faq=p.locator('#lesson-faq .ds-faq-item button');await faq.nth(0).focus();await p.keyboard.press('Enter');
 check(`${locale}: keyboard FAQ opens`,await faq.nth(0).getAttribute('aria-expanded')==='true');await faq.nth(1).click();
 check(`${locale}: FAQ closes previous answer`,await faq.nth(0).getAttribute('aria-expanded')==='false');
 // Cancel navigation only; handlers still build real messenger destinations.
 await p.evaluate(()=>document.addEventListener('click',e=>{if(e.target.closest('a[target="_blank"]'))e.preventDefault();}));
 const whatsapp=p.locator('#lesson-contact a').filter({hasText:'WhatsApp'});await whatsapp.click();
 check(`${locale}: WhatsApp retains partner code`,decodeURIComponent(await whatsapp.getAttribute('href')).includes('pilot_test'));
 for(const name of ['Telegram','Zalo']){const link=p.locator('#lesson-contact a').filter({hasText:name});await link.click();check(`${locale}: ${name} destination`,(await link.getAttribute('href')).startsWith(name==='Telegram'?links.telegram:links.zalo));}
 check(`${locale}: attribution stored`,await p.evaluate(()=>JSON.parse(localStorage.getItem('epic_surf_attribution')).partner==='pilot_test'));
 const map=p.locator('[data-home-v2-footer-map-iframe]');await map.scrollIntoViewIfNeeded();
 check(`${locale}: map inert before activation`,await map.getAttribute('inert')!==null&&await map.getAttribute('tabindex')==='-1');
 await p.locator('[data-map-activate]').click();check(`${locale}: map enabled explicitly`,await map.getAttribute('inert')===null);
 const small=await p.locator('main button,main a,header button,header a,[data-footer-contact],[data-footer-social],[data-home-v2-footer-quick-links] a').evaluateAll(nodes=>nodes.filter(n=>{const r=n.getBoundingClientRect(),s=getComputedStyle(n);return r.width&&r.height&&s.visibility!=='hidden'&&(r.width<43.9||r.height<43.9);}).map(n=>n.outerHTML.slice(0,150)));
 if(small.length)console.log(small);
 check(`${locale}: visible targets at least 44px`,small.length===0);
 check(`${locale}: one h1 and scoped library root`,await p.locator('main h1').count()===1&&await p.locator('[data-ds-page]').count()===1&&await p.locator('.epic-landing,[data-home-v2-root]').count()===0);
 // Actual language navigation preserves query and returns the peer route.
 await p.locator('[data-home-v2-language-switcher]').click();await p.waitForURL(url=>url.pathname===(ru?'':'/ru')+'/surf-lessons-danang');
 check(`${locale}: language switch retains attribution query`,new URL(p.url()).searchParams.get('partner')==='pilot_test');
 await context.close();
}
const reduce=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
await reduce.goto('http://localhost:3000/ru/surf-lessons-danang',{waitUntil:'networkidle'});
check('reduced motion: controls do not transition',await reduce.locator('#lesson-intro .ds-action-primary').evaluate(n=>getComputedStyle(n).transitionDuration==='0s'));
await browser.close();check('no browser exceptions',errors.length===0);check('no failed local assets',assetFailures.length===0);
await fs.writeFile(path.join(root,'validation.json'),JSON.stringify({checks:results,errors,assetFailures,externalServices:'Stubbed in interaction checks; no booking submitted or messenger sent.'},null,2));
console.log(`${results.length} checks passed; no browser exceptions or failed local assets.`);
