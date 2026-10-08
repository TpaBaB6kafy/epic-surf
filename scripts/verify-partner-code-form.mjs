import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.env.EPIC_QA_URL||'http://localhost:3010';
const root='output/partner-email-flow-2026-10-08';
const checks=[],errors=[];const check=(n,v)=>{assert.ok(v,n);checks.push(n);};
const browser=await chromium.launch({headless:true});
for(const locale of ['ru','en']){
 const ru=locale==='ru';const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 let mode='unavailable',requests=[],release;
 await page.route('**/*',async r=>{
  const u=new URL(r.request().url());
  if(u.hostname!=='localhost')return r.fulfill({contentType:'text/html',body:'<body>QA external stub</body>'});
  if(u.pathname!=='/api/partner-code')return r.continue();
  requests.push(r.request().postDataJSON());
  if(mode==='slow')await new Promise(resolve=>release=resolve);
  const status=mode==='unavailable'?503:mode==='limited'?429:mode==='fail'?502:mode==='reject'?200:200;
  return r.fulfill({status,contentType:'application/json',body:JSON.stringify({ok:mode!=='unavailable'&&mode!=='limited'&&mode!=='fail'&&mode!=='reject'})});
 });
 await page.goto(base+(ru?'/ru':'')+'/partners?partner=email_qa&utm_source=qa&utm_campaign=partner_form',{waitUntil:'networkidle'});
 const opener=page.locator('.partner-actions .ds-action').first();await opener.click();
 const dialog=page.locator('dialog');const input=dialog.locator('input[type=email]');const submit=dialog.locator('button[type=submit]');
 check(locale+': email autofocus',await input.evaluate(n=>n===document.activeElement));
 await submit.click();check(locale+': required error and no request',await input.getAttribute('aria-invalid')==='true'&&requests.length===0);
 await input.fill('broken');await submit.click();check(locale+': invalid error and no request',await input.getAttribute('aria-invalid')==='true'&&requests.length===0);
 await input.fill('qa@example.com');await submit.click();await dialog.getByRole('alert').waitFor();
 check(locale+': unconfigured API shows error, no success',(await dialog.getByRole('alert').textContent()).includes(ru?'Не удалось':'could not')&&await input.isVisible());
 check(locale+': email and attribution included',requests[0].email==='qa@example.com'&&requests[0].language===locale&&requests[0].attribution.partner==='email_qa'&&requests[0].attribution.utm_campaign==='partner_form');
 const fallback=dialog.locator('.partner-form-contact');check(locale+': preferred fallback', (await fallback.getAttribute('href')).startsWith(ru?'https://t.me/danangsurf':'https://wa.me/84383880164'));
 await dialog.screenshot({path:root+`/form-error-${locale}-390.png`});
 await submit.focus();await page.keyboard.press('Tab');check(locale+': tab reaches fallback',await fallback.evaluate(n=>n===document.activeElement));
 await page.keyboard.press('Tab');check(locale+': focus trap skips hidden honeypot',await dialog.locator('.ds-icon-control').evaluate(n=>n===document.activeElement));
 await page.keyboard.press('Shift+Tab');check(locale+': reverse tab wraps',await fallback.evaluate(n=>n===document.activeElement));
 mode='limited';await submit.click();await dialog.getByRole('alert').filter({hasText:ru?'Слишком много':'Too many'}).waitFor();check(locale+': quota error',await dialog.getByRole('alert').isVisible());
 mode='reject';await submit.click();await dialog.getByRole('alert').filter({hasText:ru?'Не удалось':'could not'}).waitFor();check(locale+': HTTP200 without acceptance stays error',await input.isVisible());
 mode='slow';const count=requests.length;await submit.click();await page.waitForFunction(()=>document.querySelector('form[aria-busy=true]'));
 check(locale+': loading disables email and submission',await input.isDisabled()&&await submit.isDisabled());
 await dialog.locator('form').dispatchEvent('submit');check(locale+': concurrent submission guarded',requests.length===count+1);
 release();await dialog.getByRole('status').waitFor();check(locale+': accepted request has success and no input',!await input.count()&&(await dialog.getByRole('status').textContent()).includes(ru?'Заявка отправлена':'Request sent'));
 await dialog.screenshot({path:root+`/form-success-${locale}-390.png`});
 await dialog.getByRole('button',{name:ru?'Готово':'Done',exact:true}).click();await dialog.waitFor({state:'detached'});
 check(locale+': success closes and restores focus',await opener.evaluate(n=>n===document.activeElement));
 await opener.click();check(locale+': reopen resets email',await input.inputValue()==='');
 check(locale+': background scroll locked',await page.evaluate(()=>document.body.style.overflow==='hidden'));
 for(const [width,height] of [[320,844],[390,844],[430,844],[800,900],[1024,900],[1440,900],[2560,900],[667,375]]){
  await page.setViewportSize({width,height});await page.evaluate(()=>document.fonts.ready);
  check(`${locale}: dialog fits ${width}x${height}`,await dialog.evaluate(n=>{const r=n.getBoundingClientRect();return r.left>=-1&&r.right<=innerWidth+1&&r.top>=-1&&r.bottom<=innerHeight+1&&n.scrollWidth<=n.clientWidth+1;}));
  await dialog.screenshot({path:root+`/form-${locale}-${width}x${height}.png`});
 }
 await page.keyboard.press('Escape');await dialog.waitFor({state:'detached'});
 check(locale+': Escape restores scroll',await page.evaluate(()=>document.body.style.overflow!=='hidden'));
 await context.close();
}
await browser.close();check('No JS errors',errors.length===0);
await fs.writeFile(root+'/form-tests.json',JSON.stringify({checks,errors,externalSubmissions:0,delivery:'All submission and delivery states mocked; no actual API submissions.'},null,2));
console.log('Passed',checks.length,'email form checks');
