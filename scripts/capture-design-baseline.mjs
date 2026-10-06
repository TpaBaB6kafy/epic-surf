import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

// Read-only measurements of the current homepage; application files are untouched.
const baseUrl = process.env.EPIC_BASELINE_URL || 'http://localhost:3000';
const out = path.resolve(process.env.EPIC_BASELINE_OUTPUT || 'output/design-system-baseline-2026-10-05');
const mainWidths = [390, 1024, 1200, 1440, 1920, 2560, 3200];
const probeWidths = [320, 360, 699, 700, 899, 900, 1199];
const selectors = {
 header:'[data-home-v2-header-frame]', headerBook:'[data-home-v2-book-now]', hero:'[data-home-v5-hero-brand]',
 how:'[data-home-v5-how]', howHeading:'[data-home-v5-how-heading]', howCard:'[data-home-v5-how-card]', howPhoto:'[data-home-v5-how] [data-home-v5-photo]', howTitle:'[data-home-v5-card-title]', howCopy:'[data-home-v5-card-copy]',
 lessons:'[data-home-v5-lessons-included]', lessonHeading:'.home-v5-li-heading', lessonTitle:'.home-v5-li-title', lessonDescription:'.home-v5-li-description', lessonPhoto:'.home-v5-li-photo', lessonCta:'.home-v5-li-cta', lessonCtaLabel:'.home-v5-li-cta span', lessonArrow:'.home-v5-li-control', included:'.home-v5-li-included', includedCopy:'.home-v5-li-feature',
 rentals:'[data-home-v5-rentals]', rentalOffer:'.home-v5-rental-offer', rentalCta:'.home-v5-rent-cta', rentalSecondary:'.home-v5-choose-board-cta',
 conditions:'[data-home-v5-conditions]', map:'.home-v5-forecast-map', camera:'.home-v5-livecam',
 reviews:'[data-home-v5-reviews]', reviewHeading:'[data-home-v5-reviews] > h2', reviewCard:'.home-v5-review', reviewCopy:'.home-v5-review blockquote', reviewAvatar:'.home-v5-review-avatar', reviewLink:'.home-v5-review-author-details a', reviewRating:'.home-v5-review-rating',
 faq:'[data-home-v5-faq]', faqQuestion:'.v5-faq-item > button', faqControl:'.v5-faq-control', events:'[data-home-v5-events]', eventCard:'.v5-event-card', eventCopy:'.v5-event-featured p', eventCta:'.v5-event-cta',
 gallery:'[data-home-v5-gallery]', galleryFilter:'.v5-gallery-filter', galleryTile:'.epic-gallery-tile', footer:'[data-home-v2-footer-main]',
};
await fs.mkdir(out,{recursive:true});
const report = {capturedAt:new Date().toISOString(),commit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),trackedChanges:execFileSync('git',['status','--short','--untracked-files=no'],{encoding:'utf8'}).trim(),baseUrl,viewportHeight:1000,deviceScaleFactor:1,reducedMotion:'reduce',capturePolicy:'External iframe documents replaced with labeled placeholders; analytics and weather requests aborted. Images retain actual URLs; video paused. Local geometry and fonts unchanged. Style baseline only, not a booking or external-widget test.',selectors,samples:[]};
const browser=await chromium.launch();
try {
 for(const lang of ['en','ru']) for(const width of [...mainWidths,...probeWidths]) {
  const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});
  page.setDefaultTimeout(15000);
  const errors=[]; page.on('pageerror',e=>errors.push(String(e)));
  await page.route('**/*',async route=>{
   const request=route.request(),url=new URL(request.url());
   if(url.origin===new URL(baseUrl).origin||['data:','blob:'].includes(url.protocol))return route.continue();
   if(request.resourceType()==='document')return route.fulfill({contentType:'text/html',body:`<html><body style="margin:0;display:grid;place-items:center;height:100vh;background:#2e2e2e;color:#f6f6f6;font:14px Arial">External widget: ${url.hostname}</body></html>`});
   if(/googletagmanager|google-analytics|umami|open-meteo/.test(url.hostname))return route.abort();
   return route.continue();
  });
  const response=await page.goto(`${baseUrl}${lang==='ru'?'/ru':'/'}`,{waitUntil:'domcontentloaded',timeout:60000});
  await page.locator('[data-home-v2-client-ready="true"]').waitFor({timeout:60000});
  await page.evaluate(()=>document.fonts.ready);
  await page.addStyleTag({content:'html{scroll-behavior:auto!important}nextjs-portal{display:none!important}'});
  await page.locator('img').evaluateAll(ns=>ns.forEach(n=>n.loading='eager'));
  for(const key of ['how','lessons','conditions','reviews','events','gallery','footer']) {
   const n=page.locator(selectors[key]).first(); if(await n.isVisible())await n.scrollIntoViewIfNeeded();
  }
  await page.evaluate(async()=>{
   document.querySelectorAll('video').forEach(v=>v.pause());
   await Promise.race([Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))),new Promise(r=>setTimeout(r,8000))]);
   scrollTo(0,0);
  });
  await page.mouse.move(width-1,0);
  const sample=await page.evaluate(({selectors,lang,width})=>{
   const round=n=>Math.round(n*100)/100;
   const measure=n=>{
    const r=n.getBoundingClientRect(),s=getComputedStyle(n);
    return {text:n.innerText?.trim().slice(0,100),rect:{x:round(r.x),y:round(r.y+scrollY),width:round(r.width),height:round(r.height)},font:{family:s.fontFamily,size:s.fontSize,weight:s.fontWeight,lineHeight:s.lineHeight,letterSpacing:s.letterSpacing},color:s.color,background:s.backgroundColor,backgroundImage:s.backgroundImage,radius:s.borderRadius,border:s.border,shadow:s.boxShadow,filter:s.filter,padding:s.padding,margin:s.margin,gap:s.gap,grid:s.gridTemplateColumns,position:s.position,overflow:s.overflow,objectFit:s.objectFit,objectPosition:s.objectPosition};
   };
   const root=getComputedStyle(document.querySelector('[data-home-v2-root]'));
   const tokens=Object.fromEntries(['--home-v5-stage-width','--home-v5-stage-unit','--home-v5-content-width','--v5-gutter','--v5-radius','--v5-heading','--v5-body','--epic-raised-shadow','--epic-card-shadow'].map(k=>[k,root.getPropertyValue(k).trim()]));
   return {lang,width,clientWidth:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,overflow:document.documentElement.scrollWidth>innerWidth,tokens,elements:Object.fromEntries(Object.entries(selectors).map(([k,sel])=>[k,[...document.querySelectorAll(sel)].filter(n=>n.getClientRects().length&&getComputedStyle(n).visibility!=='hidden').slice(0,5).map(measure)])),failedImages:[...document.images].filter(n=>n.getClientRects().length&&getComputedStyle(n).visibility!=='hidden'&&(!n.complete||!n.naturalWidth)).map(n=>n.currentSrc||n.src)};
  },{selectors,lang,width});
  const cdp=await page.context().newCDPSession(page);await cdp.send('DOM.enable');await cdp.send('CSS.enable');
  const {root}=await cdp.send('DOM.getDocument');sample.renderedFonts={};
  for(const key of ['howHeading','howTitle','howCopy','lessonHeading','lessonDescription','lessonCtaLabel','reviewCopy','faqQuestion','eventCopy']) {
   const {nodeId}=await cdp.send('DOM.querySelector',{nodeId:root.nodeId,selector:selectors[key]});
   if(nodeId)sample.renderedFonts[key]=(await cdp.send('CSS.getPlatformFontsForNode',{nodeId})).fonts;
  }
  await cdp.detach();sample.httpStatus=response.status();sample.pageErrors=errors;
  if(mainWidths.includes(width)) {
   sample.screenshot=`${lang}-${width}-full.png`;
   await page.screenshot({path:path.join(out,sample.screenshot),fullPage:true,animations:'disabled',timeout:60000});
   if([390,1440,2560].includes(width))for(const key of ['how','lessons','reviews','events'])await page.locator(selectors[key]).first().screenshot({path:path.join(out,`${lang}-${width}-${key}.png`),animations:'disabled',timeout:30000});
  }
  report.samples.push(sample);await fs.writeFile(path.join(out,'baseline.json'),JSON.stringify(report,null,2)+'\n');
  console.log(`${lang} ${width}: status ${sample.httpStatus}; overflow ${sample.overflow}; missing images ${sample.failedImages.length}; errors ${errors.length}`);
  await page.close();
 }
}finally{await browser.close()}
console.log(`Baseline saved to ${out}`);
