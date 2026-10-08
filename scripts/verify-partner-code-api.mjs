import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const source=await fs.readFile('app/server/partner-code-handler.js','utf8');
const {createPartnerCodeHandler}=await import('data:text/javascript,'+encodeURIComponent(source));
const checks=[];
const check=(name,value)=>{assert.ok(value,name);checks.push(name);};
const env={PARTNER_TELEGRAM_BOT_TOKEN:'local-test-token',PARTNER_TELEGRAM_CHAT_ID:'local-test-chat'};
const body={email:'qa@example.com',language:'ru',attribution:{partner:'qa_partner',utm_source:'qa\nsource',unknown:'ignore'}};
const request=(data=body,headers={},raw)=>new Request('http://localhost:3010/api/partner-code',{method:'POST',headers:{'Content-Type':'application/json',Origin:'http://localhost:3010','x-forwarded-for':'192.0.2.1',...headers},body:raw??JSON.stringify(data)});
let calls=[];
const fetchImpl=async(url,options)=>{calls.push({url,options});return Response.json({ok:true});};
let h=createPartnerCodeHandler({env:{},fetchImpl});
check('Unconfigured delivery is 503 and sends nothing',(await h(request())).status===503&&calls.length===0);
h=createPartnerCodeHandler({env,fetchImpl});
for(const [name,req,status] of [
 ['Cross-origin rejection',request(body,{Origin:'https://example.com'}),403],
 ['JSON content type',request(body,{'Content-Type':'text/plain'}),415],
 ['Declared size bound',request(body,{'Content-Length':'5000'}),413],
 ['Actual size bound',request(body,{},'x'.repeat(5000)),413],
 ['Malformed JSON',request(body,{},'{'),400],
 ['Array rejected',request([]),400],
 ['Invalid email',request({...body,email:'a@'}),400],
 ['Newline in email rejected',request({...body,email:'a@b.com\nInjected'}),400],
 ['Unsupported locale',request({...body,language:'vi'}),400],
])check(name,(await h(req)).status===status);
check('Honeypot returns without delivery',(await h(request({...body,website:'spam'}))).status===200&&calls.length===0);
check('Valid request accepted only after delivery',(await h(request())).status===200&&calls.length===1);
const sent=JSON.parse(calls[0].options.body);
check('Email language and attribution sent as plain text',sent.text.includes('Email: qa@example.com')&&sent.text.includes('Язык: ru')&&sent.text.includes('partner: qa_partner')&&sent.text.includes('utm_source: qa source')&&!sent.text.includes('unknown')&&!sent.parse_mode);
check('Transport uses bounded timeout',calls[0].options.signal instanceof AbortSignal);
check('Duplicate email is not delivered twice',(await h(request({...body,email:'QA@example.com'}))).status===200&&calls.length===1);
for(const [name,response] of [['HTTP failure',()=>Response.json({ok:true},{status:500})],['Telegram failure',()=>Response.json({ok:false})],['Network failure',()=>{throw new Error('test failure');}]]){
 let n=0;const fail=createPartnerCodeHandler({env,fetchImpl:async()=>{n++;return response();}});
 check(name+' returns error',(await fail(request())).status===502);
 check(name+' retry attempts delivery',(await fail(request())).status===502&&n===2);
}
let time=0,quotaCalls=0;
h=createPartnerCodeHandler({env,now:()=>time,fetchImpl:async()=>{quotaCalls++;return Response.json({ok:false});}});
for(let i=0;i<3;i++)check('Quota attempt '+i,(await h(request({...body,email:`qa${i}@example.com`}))).status===502);
let res=await h(request({...body,email:'four@example.com'}));
check('Fourth attempt rate limited with retry header',res.status===429&&res.headers.get('Retry-After')==='600'&&quotaCalls===3);
time=600001;check('Quota resets after ten minutes',(await h(request())).status===502&&quotaCalls===4);
let finish,concurrentCalls=0;const gate=new Promise(r=>finish=r);
h=createPartnerCodeHandler({env,fetchImpl:async()=>{concurrentCalls++;await gate;return Response.json({ok:true});}});
const first=h(request());const second=h(request());await new Promise(r=>setTimeout(r,10));finish();
check('Concurrent duplicate shares one delivery',(await first).status===200&&(await second).status===200&&concurrentCalls===1);
check('Responses never cache',res.headers.get('Cache-Control')==='no-store');
await fs.mkdir('output/partner-email-flow-2026-10-08',{recursive:true});
await fs.writeFile('output/partner-email-flow-2026-10-08/api-tests.json',JSON.stringify({checks,realNetworkRequests:0},null,2));
console.log('Passed',checks.length,'API checks; all delivery calls mocked.');
