import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const origin=process.env.APARTMENT_AUDIT_ORIGIN||'http://127.0.0.1:3016';
const path='/apartment/cornului-13-2';const results=[];
for(const lang of ['ru','ro','en','uk','cs']){
 const r=await fetch(origin+path+(lang==='ru'?'':'?lang='+lang));const html=await r.text();
 assert.equal(r.status,200);assert.equal((html.match(/<h1[\s>]/g)||[]).length,1);
 assert.match(html,/1200/);assert.match(html,/132/);assert.match(html,/80/);
 assert.ok(html.includes('rel="canonical"'));assert.ok(html.includes('hrefLang="cs"')||html.includes('hreflang="cs"'));
 assert.ok(!html.includes('<video'));
 for(const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g))JSON.parse(m[1]);
 results.push({lang,status:r.status});
}
for(const p of ['/apartments','/apartments/premium','/sitemap.xml']){
 const r=await fetch(origin+p);assert.equal(r.status,200);assert.ok((await r.text()).includes('cornului-13-2'));
}
for(const n of [5,4,14,15,16,11,7,9,13])assert.equal((await fetch(origin+`/apartments/cornului-13-2/${n}.webp`)).status,200);
const r=await fetch(origin+'/api/availability?apartmentId=132');assert.equal(r.status,200);const availability=await r.json();assert.equal(availability.apartmentId,'132');
await writeFile('docs/apartment-132-http-check.json',JSON.stringify({origin,results,photos:9,availability},null,2));console.log('Apartment 132: five languages, SEO, catalogue, premium, sitemap, 9 photos and availability passed.');
