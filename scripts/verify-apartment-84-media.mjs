// Optional browser check: set PLAYWRIGHT_MODULE to an installed playwright entry point.
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const origin = process.argv[2] ?? 'http://localhost:3000';
await mkdir('.local-media/albisoara-16-84', { recursive: true });
(async()=>{
const browser=await chromium.launch({...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {channel:'chrome'}),headless:true});
try {
for(const mobile of [false,true]){
 const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:1000},isMobile:mobile,hasTouch:mobile});
 const page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 let videoRequests=0;page.on('request',r=>{if(r.url().includes('.mp4'))videoRequests++});
 await page.goto(origin+'/apartment/albisoara-16-84');
 const gallery=page.getByRole('region',{name:'Галерея квартиры',exact:true});
 const hero=gallery.locator('button.cursor-zoom-in');
 const check=async(scope,index)=>{
  await scope.getByText(`${index+1} / 18`,{exact:true}).waitFor();
  const img=scope===gallery?hero.locator('img'):scope.locator('img');
  await img.evaluate(i=>i.decode());
  assert.ok(await img.evaluate(i=>i.naturalWidth>0));
  const expected=[8,1,2,3,4,5,6,7,9,10,11,12,13,14,15,16,17,18][index];
  assert.ok(decodeURIComponent(await img.getAttribute('src')).includes(`/${expected}.webp`));
 };
 await check(gallery,0);
 assert.equal(videoRequests,0,'No initial video download');
 assert.equal(await page.locator('video').evaluate(v=>v.readyState),0);
 if(!mobile){
  for(let i=1;i<=18;i++){await gallery.getByRole('button',{name:'Следующее фото',exact:true}).click();await check(gallery,i%18)}
  await gallery.getByRole('button',{name:'Предыдущее фото',exact:true}).click();await check(gallery,17);
  // The final thumbnail window maps to the actual photo indices.
  await gallery.locator('button[aria-current]').click();await check(gallery,17);
  await gallery.locator('div.mt-2\\.5 button').first().click();await check(gallery,16);
 }
 const cdp=mobile?await context.newCDPSession(page):null;
 const swipe=async(locator,dx,dy=0)=>{
  await locator.scrollIntoViewIfNeeded();const box=await locator.boundingBox();
  const x=box.x+box.width*.5,y=Math.max(120,Math.min(600,box.y+box.height*.5));
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
  for(let n=1;n<=6;n++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+dx*n/6,y:y+dy*n/6}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 };
 if(mobile){
  for(let i=1;i<=18;i++){await swipe(hero,-120);await check(gallery,i%18)}
  await gallery.locator('div.mt-2\\.5 button').nth(2).tap();await check(gallery,2);
  await gallery.locator('div.mt-2\\.5 button').first().tap();await check(gallery,0);
  await swipe(hero,-120);await check(gallery,1);assert.equal(await page.getByRole('dialog').count(),0);
  await swipe(hero,120);await check(gallery,0);
  await swipe(hero,120);await check(gallery,17);
  await swipe(hero,-120);await check(gallery,0);
  await swipe(hero,50,150);await check(gallery,0);
 }
 await hero.click();const dialog=page.getByRole('dialog',{name:'Галерея квартиры',exact:true});await dialog.waitFor();
 const start=mobile?0:16;await check(dialog,start);
 for(let i=1;i<=18;i++){await dialog.getByRole('button',{name:'Следующее фото',exact:true}).click();await check(dialog,(start+i)%18)}
 await dialog.getByRole('button',{name:'Предыдущее фото',exact:true}).click();await check(dialog,(start+17)%18);
 if(mobile){await swipe(dialog.locator('div.touch-pan-y'),-120);await check(dialog,0);await swipe(dialog.locator('div.touch-pan-y'),120);await check(dialog,17)}
 await page.keyboard.press('Escape');await dialog.waitFor({state:'detached'});await check(gallery,mobile?17:15);
 await hero.click();await dialog.waitFor();await dialog.locator('button').first().click();await dialog.waitFor({state:'detached'});
 const video=page.locator('video');await video.scrollIntoViewIfNeeded();
 await page.screenshot({path:`.local-media/albisoara-16-84/${mobile?'mobile':'desktop'}-poster.png`});
 const meta=await video.evaluate(async v=>{await v.play();v.pause();return{duration:v.duration,w:v.videoWidth,h:v.videoHeight,volume:v.volume,muted:v.muted,controls:v.controls,playsInline:v.playsInline}});
 assert.ok(Math.abs(meta.duration-257.32)<.1);assert.equal(meta.w,576);assert.equal(meta.h,1024);assert.ok(meta.controls&&meta.playsInline);assert.equal(meta.muted,false);
 for(const time of [0,128,256]){
  await video.evaluate(async(v,time)=>{v.currentTime=time;await new Promise(resolve=>v.addEventListener('seeked',resolve,{once:true}));await v.play()},time);
  await page.waitForFunction(t=>document.querySelector('video').currentTime>t+.15,time);
  await video.evaluate(v=>v.pause());assert.equal(await video.evaluate(v=>v.paused),true);
 }
 await video.evaluate(async v=>{v.currentTime=256.8;await v.play()});
 await page.waitForFunction(()=>document.querySelector('video').ended);
 await video.evaluate(v=>{v.volume=.5;v.muted=true});assert.equal(await video.evaluate(v=>v.volume),.5);
 await video.evaluate(v=>v.requestFullscreen());assert.equal(await page.evaluate(()=>document.fullscreenElement?.tagName),'VIDEO');await page.evaluate(()=>document.exitFullscreen());
 assert.deepEqual(errors,[]);console.log(mobile?'MOBILE':'DESKTOP','PASS gallery cycle, thumbnails, lightbox, close sync, video start/middle/end, play/pause/seek/volume/fullscreen',meta);
 await context.close();
}
for(const lang of ['ru','ro','en','uk','cs']){
 const response=await fetch(origin+'/apartment/albisoara-16-84?lang='+lang);const html=await response.text();
 assert.ok(html.includes('poster="/apartments/albisoara-16-84/8.webp"'));
 assert.ok(html.includes('property="og:image" content="https://rentplace.md/apartments/albisoara-16-84/8.webp"'));
 assert.ok(html.includes({ru:'Видео квартиры',ro:'Video al apartamentului',en:'Apartment video',uk:'Відео квартири',cs:'Video apartmánu'}[lang]));
}
const r=await fetch(origin+'/apartments/albisoara-16-84/video/apartment-tour.mp4',{headers:{Range:'bytes=26000000-26001023'}});assert.equal(r.status,206);assert.equal((await r.arrayBuffer()).byteLength,1024);
console.log('Five languages, OG bedroom, near-end HTTP Range PASS');
}finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
