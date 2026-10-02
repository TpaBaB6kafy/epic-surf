const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const { getSeoPage } = new Function(fs.readFileSync('app/data/seoPages.js','utf8').replaceAll('export ', '') + '; return {getSeoPage};')();
const { links } = new Function(fs.readFileSync('app/data/links.js','utf8').replaceAll('export ', '') + '; return {links};')();
const slugs=['surf-lessons-danang','surfing-danang','my-khe-beach-surfing','surf-guide'];
const widths=[320,360,390,599,600,768,899,900,1023,1024,1199,1200,1440];
async function ready(page,path,width=390) {
  await page.setViewportSize({width,height:900});
  await page.route(/^https:\/\//,route=>route.fulfill({contentType:route.request().resourceType()==='script'?'application/javascript':'text/html',body:''}));
  await page.goto(path,{waitUntil:'domcontentloaded'});
  await expect(page.locator('main h1')).toBeVisible();
  await page.evaluate(()=>document.fonts.ready);
  await page.addStyleTag({content:'html{scroll-behavior:auto!important}nextjs-portal{display:none!important}'});
}
for(const slug of slugs) for(const width of widths) test(`RU ${slug} ${width}: geometry and Russian booking`,async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await ready(page,`/ru/${slug}`,width);
  await expect(page.locator('html')).toHaveAttribute('lang','ru');
  await expect(page.locator('main h1')).toHaveText(getSeoPage(slug,'ru').title);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
  const invalid=await page.locator('main h1,main h2,main h3,main p,main li,main button,main a,header a,header button').evaluateAll(es=>es.filter(e=>{
    if(!e.checkVisibility())return false;
    const r=e.getBoundingClientRect();return r.left< -1||r.right>innerWidth+1||e.scrollWidth>e.clientWidth+2;
  }).map(e=>({tag:e.tagName,text:e.textContent.slice(0,80),width:e.clientWidth,scroll:e.scrollWidth})));
  expect(invalid).toEqual([]);
  await page.locator('main button').first().click();
  await expect(page.locator('[data-booking-dialog] iframe')).toHaveAttribute('src',links.booking.ru.group);
  await page.getByRole('button',{name:'Закрыть запись',exact:true}).click();
  await expect(page.locator('[data-booking-dialog]')).toHaveCount(0);
  if(width<(slug==='surf-guide'?1024:1200)){
    await page.locator('header button').last().click();
    await expect(page.locator('header').getByRole('link',{name:'Уроки',exact:true}).last()).toBeVisible();
    await page.locator('header button').last().click();
  }
  if(slug!=='surf-guide'){
    await page.locator('.landing-faq-item summary').first().click();
    await expect(page.locator('.landing-faq-item p').first()).toBeVisible();
  }
  expect(errors).toEqual([]);
});
for(const slug of slugs) test(`${slug}: translation completeness, SEO and language pair`,async({page})=>{
  const ru=getSeoPage(slug,'ru'),en=getSeoPage(slug);
  expect(ru.path).toBe(`/ru/${slug}`);expect(ru.sections).toHaveLength(en.sections.length);expect(ru.faq).toHaveLength(en.faq.length);
  en.sections.forEach((s,i)=>{for(const key of ['items','cards'])if(s[key])expect(ru.sections[i][key]).toHaveLength(s[key].length);});
  if(en.hubCards)expect(ru.hubCards).toHaveLength(en.hubCards.length);
  const query='?partner=ru_qa&utm_source=qa&utm_campaign=ru_landings';
  for(const locale of ['en','ru']){
    const path=locale==='ru'?`/ru/${slug}`:`/${slug}`;
    await ready(page,path+query);
    const base='https://www.surfdanang.com';
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href',base+path);
    await expect(page.locator('link[hreflang=ru]')).toHaveAttribute('href',`${base}/ru/${slug}`);
    await expect(page.locator('link[hreflang=en]')).toHaveAttribute('href',`${base}/${slug}`);
    await expect(page.locator('link[hreflang=x-default]')).toHaveAttribute('href',`${base}/${slug}`);
    const jsonld=await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(jsonld.map(JSON.parse).some(v=>v.url===base+path&&v.inLanguage===locale)).toBeTruthy();
    await page.locator('header').getByRole('link',{name:locale==='ru'?'EN':'RU',exact:true}).click();
    await expect(page).toHaveURL((locale==='ru'?`/${slug}`:`/ru/${slug}`)+query);
  }
  await ready(page,`/ru/${slug}`+query);
  const text=(await page.locator('main').textContent()).replace(/\s+/g,' ');
  function verify(value,key=''){
    if(typeof value==='string'&&!['path','href','heroImage','bookingService','bookingLabel','secondaryAction'].includes(key)&&!value.startsWith('/'))expect(text).toContain(value.replace(/\s+/g,' '));
    else if(Array.isArray(value))value.forEach(v=>verify(v,key));
    else if(value&&typeof value==='object')Object.entries(value).forEach(([k,v])=>verify(v,k));
  }
  for(const key of ['title','eyebrow','intro','primaryCta','secondaryCta','hubCards','sections','faq'])verify(ru[key],key);
  const internal=await page.locator('main a[href^="/"]').evaluateAll(es=>es.map(e=>e.getAttribute('href')));
  expect(internal.length).toBeGreaterThan(0);expect(internal.every(h=>h.startsWith('/ru/'))).toBeTruthy();
  if(slug==='surfing-danang'){
    await page.locator('main button').nth(1).click();await expect(page.locator('[data-rental-dialog]')).toBeVisible();await page.keyboard.press('Escape');
  }
  const whatsapp=page.locator('main a[href*="wa.me"]').first();
  await whatsapp.evaluate(e=>e.addEventListener('click',ev=>ev.preventDefault(),{once:true}));await whatsapp.click();
  const href=decodeURIComponent(await whatsapp.getAttribute('href'));expect(href).toContain('ru_qa');expect(href).toContain('Привет');
});
test('RU sitemap and translated partner labels',async({page,request})=>{
  const response=await request.get('/sitemap.xml');expect(response.ok()).toBeTruthy();const xml=await response.text();
  for(const slug of slugs){expect(xml).toContain(`<loc>https://www.surfdanang.com/ru/${slug}</loc>`);expect(xml).toContain(`hreflang="ru" href="https://www.surfdanang.com/ru/${slug}"`);}
  await ready(page,'/ru/partners');await expect(page.locator('.partner-hero-benefits')).toHaveText('Удобная записьБезопасные урокиБонусы партнёрам');
  await expect(page.locator('main')).not.toContainText(/Easy booking|Safe lessons|Partner rewards|Referral Partner|Content Partner|Experience Partner|creators|surf morning/);
  for(const slug of slugs)await expect(page.locator(`footer a[href="/ru/${slug}"]`)).toHaveCount(1);
});
