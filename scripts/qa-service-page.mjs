import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
const mode = process.argv[2] || 'before';
const root = path.resolve('output/service-pilot-2026-10-05');
await fs.mkdir(root, {recursive:true});
await fs.writeFile(path.join(root,'.gitignore'), '*\n');
const browser = await chromium.launch({headless:true});
const results=[];
const widths=[320,360,390,1024,1200,1440,1920,2560,3200];
for(const locale of ['en','ru']) {
  const route=(locale==='ru'?'/ru':'')+'/surf-lessons-danang';
  const page=await browser.newPage({reducedMotion:'reduce'});
  for(const width of widths) {
    await page.setViewportSize({width,height:900});
    await page.goto('http://localhost:3000'+route,{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    await page.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';scrollTo({top:0,behavior:'instant'});});
    const snapshot=await page.evaluate(()=>({
      width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth+1,
      title:document.title,lang:document.documentElement.lang,
      canonical:document.querySelector('link[rel=canonical]')?.href,
      alternates:[...document.querySelectorAll('link[rel=alternate]')].map(n=>[n.hreflang,n.href]),
      schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(n=>JSON.parse(n.textContent)),
      headings:[...document.querySelectorAll('main h1,main h2,main h3')].map(n=>n.textContent),
      text:document.querySelector('main')?.textContent,
      links:[...document.querySelectorAll('main a')].map(n=>({text:n.textContent,href:n.getAttribute('href')})),
      frame:[...document.querySelectorAll('main .ds-content')].map(n=>{const r=n.getBoundingClientRect();return {x:r.x,width:r.width}})
    }));
    if([390,1440].includes(width)) {
      for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=800) await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);
      await page.waitForTimeout(250);
      await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
      await page.screenshot({path:path.join(root,`${mode}-${locale}-${width}.jpg`),fullPage:true,type:'jpeg',quality:75});
    }
    results.push({locale,width,...snapshot});
  }
  await page.close();
}
// Control pages: key geometry, typography, metadata and visible content outside the pilot.
for(const route of ['/','/ru','/surf-guide','/ru/surf-guide','/surfboard-rental-danang','/ru/surfboard-rental-danang','/surfing-danang','/ru/surfing-danang','/design-system?lang=ru']) {
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 await page.goto('http://localhost:3000'+route,{waitUntil:'networkidle'}); await page.evaluate(()=>document.fonts.ready);
 const control=await page.evaluate(()=>({title:document.title,items:[...document.querySelectorAll('h1,h2,[data-home-v2-header-frame],[data-home-v2-footer-main]')].slice(0,20).map(n=>{const r=n.getBoundingClientRect(),s=getComputedStyle(n);return {text:n.textContent,x:r.x,y:r.y,width:r.width,height:r.height,font:s.font,color:s.color}})}));
 results.push({route,control}); await page.close();
}
await fs.writeFile(path.join(root,`${mode}.json`),JSON.stringify(results,null,2));
await browser.close();
console.log(`${mode}: ${results.length} snapshots, 4 screenshots`);
