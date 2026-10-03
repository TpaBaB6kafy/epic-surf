import assert from 'node:assert/strict';
import {selectHeroVideo} from '../../app/components/home-v2/heroVideoSource.mjs';
const caps = (v) => ({decodingInfo:async()=>v});
for (const variant of ['desktop','mobile']) {
 assert.equal((await selectHeroVideo(variant,{})).codec,'h264');
 assert.equal((await selectHeroVideo(variant,caps({supported:true,smooth:true,powerEfficient:true}))).codec,'av1');
 for(const flag of ['supported','smooth','powerEfficient'])assert.equal((await selectHeroVideo(variant,caps({supported:true,smooth:true,powerEfficient:true,[flag]:false}))).codec,'h264');
 assert.equal((await selectHeroVideo(variant,{decodingInfo:async()=>{throw new Error('Unavailable')}})).codec,'h264');
 assert.equal((await selectHeroVideo(variant,{decodingInfo:()=>new Promise(()=>{})})).codec,'h264');
}
console.log('PASS: capability gating, unsupported/inefficient decoding, API errors, timeout fallback, both viewports');
