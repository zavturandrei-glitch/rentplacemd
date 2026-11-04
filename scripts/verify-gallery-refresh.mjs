import assert from 'node:assert/strict';
import {writeFile,readFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
const origin=process.env.GALLERY_ORIGIN||'http://127.0.0.1:3018';const checks=[];
for(const lang of ['ru','ro','en','uk','cs']){
 const r=await fetch(origin+'/apartment/albisoara-16-84'+(lang==='ru'?'':'?lang='+lang));const html=await r.text();
 assert.equal(r.status,200);assert.match(html,/refresh-20261104/);assert.match(html,/1200/);assert.equal((html.match(/<h1[\s>]/g)||[]).length,1);
 const schema=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
 assert.ok(JSON.stringify(schema).includes('refresh-20261104/3.webp'));
 checks.push({lang,status:r.status});
}
for(const n of [3,22,5,13,14,15,17,23,16])assert.equal((await fetch(origin+`/apartments/albisoara-16-84/refresh-20261104/${n}.webp`)).status,200);
const source=await readFile('lib/apartments.ts','utf8');const old=execFileSync('git',['show','c1eb2a4:lib/apartments.ts'],{encoding:'utf8'});
const remove84=s=>s.replaceAll('\r\n','\n').replace(/createApartment\(\{\s*id: 84,[\s\S]*?\n  \}\),/,'');assert.equal(remove84(source).trim(),remove84(old).trim());
for(const path of ['/apartments','/sitemap.xml']){const r=await fetch(origin+path);assert.equal(r.status,200);const text=await r.text();assert.ok(text.includes('refresh-20261104'));}
const availability=await (await fetch(origin+'/api/availability?apartmentId=84')).json();
await writeFile('docs/gallery-refresh-http.json',JSON.stringify({origin,checks,newPhotos:9,otherApartmentsUnchanged:true,availability},null,2));console.log('Five languages, new images/schema/sitemap and unchanged other apartment records verified.');

