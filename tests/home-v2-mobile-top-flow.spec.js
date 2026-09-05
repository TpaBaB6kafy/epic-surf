const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { isolateProviders, ready } = require('./home-v2-helpers');
const out = path.resolve('tmp/home-v2-mobile-top-pass1');
const widths = [320,360,375,390,412,430,480,639,640,768,1440];
test.setTimeout(90000);
test.beforeEach(async ({page}) => {
  await isolateProviders(page);
});
async function settle(page) {
  await page.evaluate(()=>document.fonts.ready);
  await page.locator('[data-home-v2-hero] img, [data-home-v2-how] img').evaluateAll(async imgs=>Promise.all(imgs.filter(i=>i.getBoundingClientRect().width>0).map(i=>{i.loading="eager";return Promise.race([i.decode().catch(()=>{}),new Promise(resolve=>setTimeout(resolve,5000))]);})));
  await page.addStyleTag({content:'nextjs-portal { visibility: hidden !important; }'});
}
async function freeze(page) {
  await page.evaluate(async()=>{
    await Promise.all([...document.querySelectorAll('video')].map(v=>new Promise(resolve=>{
      v.pause(); if(v.readyState < 1){resolve();return;}
      if(Math.abs(v.currentTime-1)<.001){resolve();return;}
      v.addEventListener('seeked',resolve,{once:true}); v.currentTime=1;
      setTimeout(resolve,1500);
    })));
  });
}
async function compareBaseline(page, route, width) {
  const name=route.replaceAll('/','_');
  const after=path.join(out,`after-${name}-${width}.png`);
  await freeze(page); await page.screenshot({path:after});
  const height=1800;
  const beforeData=await sharp(path.join(out,`before-${name}-${width}.png`)).extract({left:0,top:0,width,height}).removeAlpha().raw().toBuffer();
  const afterData=await sharp(after).extract({left:0,top:0,width,height}).removeAlpha().raw().toBuffer();
  let changed=0;for(let i=0;i<beforeData.length;i+=3)if(Math.max(...[0,1,2].map(c=>Math.abs(beforeData[i+c]-afterData[i+c])))>24)changed++;
  const ratio=changed/(width*height);
  console.log(`baseline ${route} ${width}: ${(ratio*100).toFixed(4)}% changed pixels`);
  expect(ratio).toBeLessThan(.005);
}
for(const route of ['/home-v2','/ru/home-v2']) for(const width of widths) {
  test(`${route} mobile top flow ${width}`,async({page})=>{
    await page.setViewportSize({width,height:width>=640?2000:844});
    await ready(page,route); await settle(page);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth===document.documentElement.clientWidth)).toBe(true);
    const header=page.locator('[data-home-v2-header]');
    if(width>=640){
      await expect(page.locator('[data-home-v2-mobile-top-hero]')).toHaveCount(0);
      await expect(page.locator('[data-home-v2-mobile-top-how]')).toBeHidden();
      await expect(header.locator('video')).toHaveCount(0);
      await compareBaseline(page,route,width);return;
    }
    await expect(page.locator('[data-home-v2-mobile-top-hero]')).toBeVisible();
    await expect(page.locator('[data-home-v2-hero] video')).toHaveCount(0);
    await expect(page.locator('video')).toHaveCount(1);
    const video=header.locator('video');
    await expect.poll(()=>video.evaluate(v=>v.paused)).toBe(false);
    expect(await video.evaluate(v=>v.error)).toBeNull();
    const time=await video.evaluate(v=>v.currentTime);
    await expect.poll(()=>video.evaluate(v=>v.currentTime)).toBeGreaterThan(time+.2);
    expect(await video.evaluate(v=>v.autoplay&&v.muted&&v.loop&&v.playsInline&&v.preload==='auto')).toBe(true);
    const geometry=await page.evaluate(()=>{
      const rect=s=>document.querySelector(s).getBoundingClientRect().toJSON();
      return {header:rect('[data-home-v2-header]'),hero:rect('[data-home-v2-hero]'),how:rect('[data-home-v2-how]')};
    });
    expect(geometry.header.height).toBe(86);
    expect(geometry.hero.y).toBeCloseTo(86,1);
    expect(geometry.hero.height).toBeCloseTo(463*width/390,1);
    expect(geometry.how.y).toBeCloseTo(geometry.hero.bottom,1);
    expect(geometry.how.height).toBeCloseTo(1090*width/390,1);
    await expect(page.locator('[data-home-v2-heading-stripe]')).toHaveCount(2);
    const cards=page.locator('[data-home-v2-how-mobile-card]');await expect(cards).toHaveCount(4);
    for(let i=0;i<4;i++){
      const card=cards.nth(i);
      await expect(card.locator('[data-home-v2-paper-surface]')).toHaveAttribute('src',new RegExp(`paper-0${i+1}@2x.png$`));
      expect(await card.locator('[data-home-v2-paper-surface]').evaluate(img=>img.naturalWidth===700&&img.naturalHeight===300)).toBe(true);
      const svg=fs.readFileSync(path.resolve(`public/design/home-v2/mobile-top/title-0${i+1}.svg`),'utf8');
      expect(svg).toContain('<pattern');expect(svg).not.toContain('base64,"');
      const shadows=await card.locator('[data-home-v2-how-mobile-photo]').evaluate(e=>({filter:getComputedStyle(e).filter,overflow:getComputedStyle(e).overflow}));
      expect(shadows.overflow).toBe('visible');
      const offsets=[...shadows.filter.matchAll(/drop-shadow\(rgba?\([^)]+\) (-?[\d.]+)px/g)].map(m=>Number(m[1]));
      expect(offsets).toHaveLength(5);
      for(let j=0;j<5;j++) expect(offsets[j]).toBeCloseTo([6,26,58,103,161][j]*width/390*(i%2?-1:1),1);
      expect(await card.evaluate(e=>{
        const inside=(text,panel)=>{
          const range=document.createRange();range.selectNodeContents(text);
          const b=panel.getBoundingClientRect();return [...range.getClientRects()].every(r=>r.left>=b.left-1&&r.right<=b.right+1&&r.top>=b.top-1&&r.bottom<=b.bottom+1);
        };
        return inside(e.querySelector('h3'),e.querySelector('[data-home-v2-title-pattern]'))&&inside(e.querySelector('p'),e.querySelector('[data-home-v2-paper-surface]'));
      })).toBe(true);
    }
    await page.evaluate(()=>{window.__topVideo=document.querySelector('[data-home-v2-header-video]');});
    for(const y of [200,1200,100000]){
      await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),y);
      await expect.poll(()=>header.evaluate(e=>e.getBoundingClientRect().top)).toBe(0);
      expect(await video.evaluate(v=>v===window.__topVideo&&!v.paused)).toBe(true);
    }
    await page.getByRole('button',{name:'Open navigation'}).click();
    const menu=page.locator('#home-v2-mobile-navigation'); await expect(menu).toBeVisible();
    expect(await menu.evaluate(e=>Number(getComputedStyle(e).zIndex))).toBeGreaterThan(100);
    await page.getByRole('button',{name:'Close navigation'}).click();await expect(menu).toBeHidden();
    await header.locator('[data-home-v2-book-now]').click();
    await expect(page.locator('iframe[title="Booking"]')).toBeVisible();
    await page.getByRole('button',{name:'Close booking modal'}).click();
    await expect(page.locator('iframe[title="Booking"]')).toHaveCount(0);
    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
    await page.setViewportSize({width,height:Math.ceil(86+1553*width/390)});
    await freeze(page);
    await page.screenshot({path:path.join(out,`${route.includes('/ru/')?'ru':'en'}-${width}.png`)});
    if(width===390){
      for(const [selector,name] of [['[data-home-v2-header]','header'],['[data-home-v2-hero]','hero'],['[data-home-v2-how]','how']])await page.locator(selector).screenshot({path:path.join(out,`${route.includes('/ru/')?'ru':'en'}-390-${name}.png`)});
      await header.locator('[data-home-v2-language-switcher]').click();
      await expect(page).toHaveURL(new RegExp(route.includes('/ru/')?'/home-v2$':'/ru/home-v2$'));
      await expect(page.locator('[data-home-v2-header]')).toHaveAttribute('data-home-v2-header-locale',route.includes('/ru/')?'en':'ru');
    }
  });
}
for(const route of ['/','/ru'])test(`production ${route} stays unchanged`,async({page})=>{
  await page.setViewportSize({width:390,height:2000});await page.goto(`http://localhost:3000${route}`,{waitUntil:'domcontentloaded'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(800);await compareBaseline(page,route,390);
});
for (const route of ['/home-v2','/ru/home-v2']) test(`reference 390px at 2x ${route}`, async ({ browser }) => {
  const page=await browser.newPage({viewport:{width:390,height:1639},deviceScaleFactor:2});
  await isolateProviders(page); await ready(page,route); await settle(page); await freeze(page);
  const lang=route.includes('/ru/')?'ru':'en';
  await page.screenshot({path:path.join(out,`${lang}-390@2x.png`)});
  for(const [selector,name] of [['[data-home-v2-header]','header'],['[data-home-v2-hero]','hero'],['[data-home-v2-how]','how']]) {
    await page.locator(selector).screenshot({path:path.join(out,`${lang}-390-${name}@2x.png`)});
  }
  await page.close();
});
