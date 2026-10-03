const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const root=path.resolve(__dirname),repo=path.resolve(root,'../..'),out=path.join(repo,'public/video/hero');
const ff=process.env.FFMPEG||path.join(repo,'tmp/hero-edit/tools/ffmpeg-9.0.2-essentials_build/bin/ffmpeg.exe');
const rate=60000/1001,fade=30/rate;
const old=[{"id":"ocean","file":"public/hero-surf.mp4","start":1,"end":6.6,"duration":7,"grade":"eq=brightness=0.008:contrast=1.025:saturation=0.92:gamma=1.025","mobile":"crop=608:1080:x='min(iw-ow,iw*(0.72+0.12*t/5.6)-ow/2)':y=0"},{"id":"ride","file":"tmp/hero-source/DJI_0679.MP4","start":4.4,"end":10.8,"duration":8,"grade":"eq=brightness=0.008:contrast=1.015:saturation=0.91:gamma=1.04","mobile":"crop=1216:2160:x='iw*(0.28+0.17*t/6.4)-ow/2':y=0"},{"id":"overhead","file":"tmp/hero-source/DJI_0691.MP4","start":2.2,"end":7.8,"duration":7,"grade":"eq=brightness=0.005:contrast=1.01:saturation=0.88:gamma=1.025","mobile":"crop=1216:2160:x='iw*(0.31+0.08*t/5.6)-ow/2':y=0"}].map(({ end, duration, ...clip }) => clip);
const variants={desktop:{width:1920,height:1080,crf:38,clips:[{...old[0],start:1.5,frames:270},{...old[1],start:4,frames:420},{...old[2],start:1.8,frames:360}]},mobile:{width:900,height:1600,crf:44,clips:[{...old[1],start:3.5,frames:600,mobile:"crop=1216:2160:x='iw*(0.28+0.22*t/10.01)-ow/2':y=0"},{...old[2],start:1.5,frames:408,mobile:"crop=1216:2160:x='iw*(0.28+0.10*t/6.8068)-ow/2':y=0"}]}};
function run(a){execFileSync(ff,['-hide_banner','-loglevel','warning','-y',...a],{stdio:['ignore','ignore','inherit']});}
const manifest={fps:rate,frameRate:'60000/1001',speed:1,fadeFrames:30,losslessIntermediate:'FFV1 / NUT',variants:{}};
for(const [name,v] of Object.entries(variants)){
 const inputs=[];for(const clip of v.clips){const target=path.join(root,`${name}-${clip.id}-lossless.nut`);inputs.push(target);if(!fs.existsSync(target))run(['-ss',String(clip.start),'-i',path.join(repo,clip.file),'-an','-vf',[`trim=end_frame=${clip.frames}`,'settb=1/60000','setpts=N*1001',...(name==='mobile'?[clip.mobile]:[]),`scale=${v.width}:${v.height}:flags=lanczos`,clip.grade,'setsar=1','format=yuv420p'].join(','),'-frames:v',String(clip.frames),'-fps_mode','passthrough','-c:v','ffv1','-level','3','-threads','4',target]);console.log('Lossless clip ready',name,clip.id);}
 const master=path.join(root,`${name}-master.nut`);let graph='[0:v]split=2[first][loop];',label='first',duration=v.clips[0].frames/rate;
 for(let i=1;i<v.clips.length;i++){graph+=`[${label}][${i}:v]xfade=transition=fade:duration=${fade}:offset=${duration-fade}[x${i}];`;label=`x${i}`;duration+=v.clips[i].frames/rate-fade;}
 graph+=`[loop]trim=end_frame=30,setpts=PTS-STARTPTS[head];[${label}][head]xfade=transition=fade:duration=${fade}:offset=${duration-fade},trim=start_frame=30,settb=1/60000,setpts=N*1001,format=yuv420p[v]`;
 const frames=v.clips.reduce((n,c)=>n+c.frames,0)-30*v.clips.length;
 if(!fs.existsSync(master))run([...inputs.flatMap(f=>['-i',f]),'-filter_complex_threads','2','-filter_complex',graph,'-map','[v]','-frames:v',String(frames),'-an','-fps_mode','passthrough','-c:v','ffv1','-level','3','-threads','4',master]);
 console.log('Master ready',name,frames,frames/rate);
 for(const codec of ['h264','av1']){
 const target=path.join(out,`${name}-v2${codec==='av1'?'.av1':''}.mp4`);
 const opts=codec==='av1'?['-c:v','libaom-av1','-cpu-used','6','-crf',String(v.crf),'-b:v','0','-row-mt','1','-tiles','2x2','-threads','6']:['-c:v','libx264','-preset','slow','-crf',name==='desktop'?'20':'20','-maxrate',name==='desktop'?'14000k':'4000k','-bufsize',name==='desktop'?'24000k':'8000k','-threads','6','-profile:v','high','-level:v','4.2'];
 run(['-i',master,'-map','0:v:0','-an',...(name==='mobile'?['-vf','scale=720:1280:flags=lanczos']:[]),...opts,'-r','60000/1001','-fps_mode','cfr','-g','120','-pix_fmt','yuv420p','-movflags','+faststart','-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709',target]);console.log('Encoded',name,codec,fs.statSync(target).size);
 }
 run(['-i',master,...(name==='mobile'?['-vf','scale=720:1280:flags=lanczos']:[]),'-frames:v','1','-c:v','libwebp','-quality','90',path.join(out,`${name}-v2-poster.webp`)]);
 manifest.variants[name]={...v,masterWidth:v.width,masterHeight:v.height,width:name==='mobile'?720:v.width,height:name==='mobile'?1280:v.height,duration:frames/rate,frames,clips:v.clips.map(c=>({...c,end:c.start+c.frames/rate}))};
 fs.writeFileSync(path.join(root,'edit-decision-list.json'),JSON.stringify(manifest,null,2));
}
