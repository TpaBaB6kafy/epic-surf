const { test, expect } = require('@playwright/test');
async function ready(page, width=1440, locale='ru', edit=false) {
 await page.setViewportSize({width,height:900});
 await page.route(/^https:\/\//,r=>r.fulfill({status:200,contentType:'text/html',body:''}));
 await page.goto((locale==='ru'?'/ru':'/')+(edit?'?edit=1':''));
 await expect(page.locator('[data-home-v2-root]')).toHaveAttribute('data-home-v2-client-ready','true');
 await page.addStyleTag({content:'html {scroll-behavior:auto !important;} nextjs-portal {display:none !important;}'});
 const gallery=page.locator('[data-home-v5-gallery]');
 await gallery.getByRole('button',{name:locale==='ru'?'Праздник Умка':'Umka kids party',exact:true}).click();
 return gallery;
}
for (const [width,locale] of [[1440,'en'],[1440,'ru'],[390,'ru'],[320,'en'],[768,'en']]) test(`gallery ${width} ${locale}: clean layout, all photos, overlay and focus`,async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const gallery=await ready(page,width,locale);
 const viewport=gallery.locator('.epic-gallery-viewport');
 await expect(gallery.getByRole('button',{name:locale==='ru'?'Уроки':'Lessons',exact:true})).toBeVisible();
 await expect(gallery.getByRole('button',{name:'Sunset',exact:true})).toHaveCount(0);
 await expect(gallery.locator('.epic-gallery-controls,.epic-photo-expand')).toHaveCount(0);
 expect(await viewport.evaluate(el=>parseFloat(getComputedStyle(el).columnGap))).toBeGreaterThanOrEqual(32);
 const seen=new Set();
 for(let i=0;i<5;i++){
  await expect(viewport).toHaveAttribute('data-page',String(i));
  const active=gallery.locator('.epic-gallery-page:not([inert]) button');
  await expect(active).toHaveCount(5);
  for(const label of await active.evaluateAll(es=>es.map(e=>e.getAttribute('aria-label'))))seen.add(label);
  if(i<4){await viewport.focus();await page.keyboard.press('ArrowRight');}
 }
 expect(seen.size).toBe(25);
 await viewport.evaluate(el=>el.scrollTo({left:0,behavior:'instant'}));
 await expect(viewport).toHaveAttribute('data-page','0');
 const opener=gallery.locator('.epic-gallery-page:not([inert]) button').first();
 await opener.scrollIntoViewIfNeeded();
 const beforeURL=page.url(), beforeScroll=await page.evaluate(()=>scrollY);
 await opener.click();
 const dialog=page.getByRole('dialog');
 await expect(dialog).toBeVisible();
 expect(page.url()).toBe(beforeURL);
 await expect(dialog).toHaveCSS('background-color','rgba(0, 0, 0, 0)');
 await expect(dialog.locator('.epic-photo-toolbar,.epic-photo-navigation')).toHaveCount(0);
 await expect.poll(()=>dialog.locator('img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
 const stage=await dialog.locator('.epic-photo-stage').boundingBox();
 expect(stage.height).toBeLessThan(901*.81);
 if(width>=700){
  const prev=await dialog.locator('.epic-photo-prev').boundingBox(),next=await dialog.locator('.epic-photo-next').boundingBox();
  expect(prev.x+prev.width).toBeLessThan(stage.x);
  expect(next.x).toBeGreaterThan(stage.x+stage.width);
 }else await expect(dialog.locator('.epic-photo-prev')).toBeHidden();
 const firstSrc=await dialog.locator('img').getAttribute('src');
 await page.keyboard.press('ArrowRight');
 await expect(dialog.locator('img')).not.toHaveAttribute('src',firstSrc);
 await page.keyboard.press('Shift+Tab');
 expect(await dialog.evaluate(el=>el.contains(document.activeElement))).toBe(true);
 await expect.poll(()=>dialog.locator('img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
 await expect(dialog.locator('.epic-photo-full')).toHaveCSS('opacity','1');
 await page.screenshot({path:`qa-output/gallery/polish-overlay-${locale}-${width}.png`});
 await page.keyboard.press('Escape');await expect(dialog).toHaveCount(0);await expect(opener).toBeFocused();
 expect(Math.abs(await page.evaluate(()=>scrollY)-beforeScroll)).toBeLessThan(3);
 await gallery.screenshot({path:`qa-output/gallery/polish-gallery-${locale}-${width}.png`});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 expect(errors).toEqual([]);
});

test('desktop mouse drag and Mac-style horizontal wheel gestures',async({page})=>{
 const gallery=await ready(page);
 const viewport=gallery.locator('.epic-gallery-viewport');
 await viewport.evaluate(el=>el.scrollIntoView({block:'center'}));
 const box=await viewport.boundingBox();
 await page.mouse.move(box.x+box.width*.8,box.y+120);await page.mouse.down();
 await page.mouse.move(box.x+box.width*.25,box.y+120,{steps:15});await page.mouse.up();
 await expect(viewport).toHaveAttribute('data-page','1');await expect(page.getByRole('dialog')).toHaveCount(0);
 await viewport.hover();await page.mouse.wheel(box.width+90,0);
 await expect(viewport).toHaveAttribute('data-page','2');
 const y=await page.evaluate(()=>scrollY);await page.mouse.wheel(0,130);
 await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(y);
 await gallery.locator('.epic-gallery-page:not([inert]) button').first().click();
 const dialog=page.getByRole('dialog'),photo=dialog.locator('img');await expect(dialog).toBeVisible();
 const src=await photo.getAttribute('src');await dialog.locator('.epic-photo-full').hover();
 await page.mouse.wheel(90,3);await expect(photo).not.toHaveAttribute('src',src);
 const after=await photo.getAttribute('src');
 await page.mouse.wheel(25,0);await page.mouse.wheel(15,0);await expect(photo).toHaveAttribute('src',after);
 await page.keyboard.press('Escape');await expect(dialog).toHaveCount(0);
});

test('native mobile swipes and normal opening/closing animation',async({browser})=>{
 const context=await browser.newContext({viewport:{width:390,height:900},isMobile:true,hasTouch:true,reducedMotion:'no-preference'});
 const page=await context.newPage(),gallery=await ready(page,390);
 const viewport=gallery.locator('.epic-gallery-viewport');await viewport.evaluate(el=>el.scrollIntoView({block:'start'}));
 const cdp=await context.newCDPSession(page);
 async function swipe(points){await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[points[0]]});for(const point of points.slice(1))await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[point]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});}
 await swipe([330,280,230,180,130,70].map(x=>({x,y:300})));await expect(viewport).toHaveAttribute('data-page','1');
 const y=await page.evaluate(()=>scrollY);await swipe([550,500,450,400,350].map(y=>({x:200,y})));await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(y);
 await gallery.locator('.epic-gallery-page:not([inert]) button').first().click();
 const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();
 const before=await dialog.locator('img').getAttribute('src');
 await swipe([310,250,190,130,70].map(x=>({x,y:450})));await expect(dialog.locator('img')).not.toHaveAttribute('src',before);
 await dialog.getByRole('button',{name:'Закрыть фото'}).click();await expect(dialog).toHaveCount(0);
 await context.close();
});

test('gallery framing drafts persist, separate mobile/desktop, and export',async({page,context})=>{
 await context.grantPermissions(['clipboard-read','clipboard-write']);
 const gallery=await ready(page,1440,'ru',true),panel=page.getByRole('complementary',{name:'Кадрирование фотографий'});
 await expect(panel).toBeVisible();
 const photo=gallery.locator('.epic-gallery-page:not([inert]) button').first();await photo.click();
 await expect(page.getByRole('dialog')).toHaveCount(0);
 await panel.getByLabel('По горизонтали',{exact:true}).fill('30');await panel.getByLabel('По вертикали',{exact:true}).fill('70');await panel.getByLabel('Масштаб',{exact:true}).fill('1.2');
 await expect(photo.locator('img')).toHaveCSS('object-position','30% 70%');
 await panel.getByRole('button',{name:'Copy config',exact:true}).click();
 const config=JSON.parse(await page.evaluate(()=>navigator.clipboard.readText()));expect(config['/gallery/umka-party/umka-party-11-2400.webp|desktop|large']).toEqual({x:30,y:70,scale:1.2});
 await page.setViewportSize({width:390,height:900});await expect(panel.getByLabel('По горизонтали',{exact:true})).toHaveValue('50');
 await panel.getByLabel('По горизонтали',{exact:true}).fill('80');await expect(photo.locator('img')).toHaveCSS('object-position','80% 50%');
 await page.goto('/ru');await expect(panel).toHaveCount(0);
 await page.locator('[data-home-v5-gallery]').getByRole('button',{name:'Праздник Умка',exact:true}).click();
 await expect(page.locator('.epic-gallery-page:not([inert]) button').first().locator('img')).toHaveCSS('object-position','80% 50%');
 await page.setViewportSize({width:1440,height:900});await expect(page.locator('.epic-gallery-page:not([inert]) button').first().locator('img')).toHaveCSS('object-position','30% 70%');
});


for (const width of [1440,390]) test(`framing ${width}: zoomed portrait and landscape move on both axes without gaps`,async({page})=>{
 const gallery=await ready(page,width,'ru',true),panel=page.getByRole('complementary',{name:'Кадрирование фотографий'});
 const tiles=gallery.locator('.epic-gallery-page:not([inert]) button');
 for(const index of [0,1]){
  const tile=tiles.nth(index),img=tile.locator('img');
  await tile.click();
  await expect.poll(()=>img.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
  for(const scale of ['1.1','1.5','2.5']){
   await panel.getByLabel('Масштаб',{exact:true}).fill(scale);
   await panel.getByLabel('По горизонтали',{exact:true}).fill('0');
   await panel.getByLabel('По вертикали',{exact:true}).fill('0');
   const start=await img.boundingBox(),frame=await tile.boundingBox();
   await panel.getByLabel('По горизонтали',{exact:true}).fill('100');
   const horizontal=await img.boundingBox();
   expect(start.x-horizontal.x).toBeGreaterThan(frame.width*(Number(scale)-1)*.95);
   expect(Math.abs(start.y-horizontal.y)).toBeLessThan(1);
   await panel.getByLabel('По вертикали',{exact:true}).fill('100');
   const end=await img.boundingBox();
   expect(horizontal.y-end.y).toBeGreaterThan(frame.height*(Number(scale)-1)*.95);
   expect(Math.abs(horizontal.x-end.x)).toBeLessThan(1);
   // The rendered image box must cover every edge of the mask at both extremes.
   for(const box of [start,horizontal,end]){
    expect(box.x).toBeLessThanOrEqual(frame.x+.5);
    expect(box.y).toBeLessThanOrEqual(frame.y+.5);
    expect(box.x+box.width).toBeGreaterThanOrEqual(frame.x+frame.width-.5);
    expect(box.y+box.height).toBeGreaterThanOrEqual(frame.y+frame.height-.5);
   }
  }
 }
});


for (const width of [1440,390]) test(`section framing ${width}: events, four steps and all lesson variants`,async({page,context})=>{
 await context.grantPermissions(['clipboard-read','clipboard-write']);
 await ready(page,width,'ru',true);
 const panel=page.getByRole('complementary',{name:'Кадрирование фотографий'});
 await expect(panel).toHaveCount(1);
 async function adjust(frame){
  await frame.evaluate(el=>el.scrollIntoView({block:'center'}));
  await frame.click({position:{x:25,y:25}});
  const image=frame.locator('img'),bounds=await frame.boundingBox();
  await panel.getByLabel('Масштаб',{exact:true}).fill('1.5');
  await panel.getByLabel('По горизонтали',{exact:true}).fill('0');await panel.getByLabel('По вертикали',{exact:true}).fill('0');
  const before=await image.boundingBox();
  await panel.getByLabel('По горизонтали',{exact:true}).fill('100');await panel.getByLabel('По вертикали',{exact:true}).fill('100');
  const after=await image.boundingBox();
  expect(before.x-after.x).toBeGreaterThan(bounds.width*.45);
  expect(before.y-after.y).toBeGreaterThan(bounds.height*.45);
  const unchanged=await frame.boundingBox();expect(unchanged.width).toBeCloseTo(bounds.width,1);expect(unchanged.height).toBeCloseTo(bounds.height,1);
 }
 for(const section of ['[data-home-v5-how]','[data-home-v5-events]']){
  const frames=page.locator(`${section} [data-photo-slot]`);
  await expect(frames).toHaveCount(section.includes('how')?4:3);
  for(let i=0;i<await frames.count();i++)await adjust(frames.nth(i));
 }
 const lessons=page.locator('[data-home-v5-lessons-included]');const seen=new Set();
 for(let i=0;i<5;i++){
  const frame=lessons.locator('[data-photo-slot]');seen.add(await frame.getAttribute('data-photo-slot'));await adjust(frame);
  await lessons.getByRole('button',{name:'Следующий урок',exact:true}).click();
 }
 expect(seen.size).toBe(5);
 await panel.getByRole('button',{name:'Copy config',exact:true}).click();
 const config=JSON.parse(await page.evaluate(()=>navigator.clipboard.readText()));
 expect(Object.keys(config).filter(key=>key.startsWith('section:')&&key.endsWith(width<700?'|mobile':'|desktop'))).toHaveLength(12);
 const key=Object.keys(config).find(key=>key.startsWith('section:how-1|'));
 expect(config[key]).toEqual({x:100,y:100,scale:1.5});
 await page.reload();await expect(panel).toBeVisible();
 const first=page.locator('[data-photo-slot="how-1"]');await expect(first.locator('img')).toHaveCSS('object-position','100% 100%');
 await first.click({position:{x:25,y:25}});await panel.getByRole('button',{name:'Сброс',exact:true}).click();
 await expect(first.locator('img')).toHaveCSS('transform','matrix(1, 0, 0, 1, 0, 0)');
 await page.goto('/');await expect(panel).toHaveCount(0);
 await expect(page.locator('[data-photo-slot="event-umka"] img')).toHaveCSS('object-position','100% 100%');
});
