import {writeFile,access} from 'node:fs/promises';
import assert from 'node:assert/strict';
const origin=process.env.AUDIT_ORIGIN;
assert.match(origin??'',/^http:\/\/127\.0\.0\.1:\d+$/);
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&#x27;',"'").replaceAll('&quot;','"');
const sitemapResponse=await fetch(origin+'/sitemap.xml');
assert.equal(sitemapResponse.status,200);
const sitemap=await sitemapResponse.text();
const urls=[...new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>decode(m[1])))];
const report={checkedAt:new Date().toISOString(),environment:'isolated local build; database connections disabled',pages:[],issues:[],brokenLinks:[],missingImages:[],remoteImages:[],limitations:'Local technical checks; no field CWV, Search Console, real mobile rendering or external ticket availability guarantee.'};
const targets=new Set();
const assets=new Set();
const pending=[...urls];
await Promise.all(Array.from({length:4},async()=>{
  while(pending.length){
    const value=pending.shift();
    const url=new URL(value);
    const path=url.pathname+url.search;
    const response=await fetch(origin+path);
    const html=await response.text();
    const title=/<title>([\s\S]*?)<\/title>/.exec(html)?.[1];
    const description=/<meta[^>]*name="description"[^>]*content="([^"]*)"/.exec(html)?.[1];
    const canonical=decode(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/.exec(html)?.[1]??'');
    const h1=(html.match(/<h1[\s>]/g)||[]).length;
    const alternates=[...html.matchAll(/<link[^>]+rel="alternate"[^>]*>/g)].map(m=>({lang:/hrefLang="([^"]+)"/i.exec(m[0])?.[1],url:decode(/href="([^"]+)"/.exec(m[0])?.[1]??'')}));
    const issues=[];
    if(response.status!==200) issues.push('HTTP '+response.status);
    if(!title||!description) issues.push('missing metadata');
    if(h1!==1) issues.push('H1 count '+h1);
    if(canonical!==value) issues.push('canonical mismatch');
    if(/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/.test(html)) issues.push('sitemap page noindex');
    if(!alternates.some(a=>a.url===value)) issues.push('missing self hreflang');
    if(alternates.some(a=>!['ru','ro','en','uk','cs','x-default'].includes(a.lang))) issues.push('invalid hreflang');
    let schemas=0;
    for(const match of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      try {JSON.parse(match[1]);schemas++;} catch {issues.push('invalid JSON-LD');}
    }
    if(!schemas) issues.push('missing JSON-LD');
    for(const match of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
      try {const target=new URL(decode(match[1]),value); if(target.origin==='https://rentplace.md'&&!target.pathname.startsWith('/api/')&&!target.pathname.startsWith('/admin')) targets.add(target.pathname+target.search);} catch {issues.push('invalid href');}
    }
    for(const match of html.matchAll(/<img\s[^>]*>/g)) {
      const tag=match[0];
      if(!/\balt="/.test(tag)) issues.push('missing image alt');
      let src=decode(/\bsrc="([^"]+)"/.exec(tag)?.[1]??'');
      if(src.startsWith('/_next/image')) src=new URL(src,origin).searchParams.get('url')??'';
      if(src) assets.add(src);
    }
    report.pages.push({path,status:response.status,title,description,canonical,h1,alternates:alternates.length,languageAlternates:alternates,jsonLdBlocks:schemas,bytes:Buffer.byteLength(html)});
    if(issues.length) report.issues.push({path,issues});
  }
}));
for(const target of targets){
  if(report.pages.some(p=>p.path===target)) continue;
  const response=await fetch(origin+target);
  if(response.status>=400) report.brokenLinks.push({target,status:response.status});
}
for(const asset of assets){
  if(/^https?:/.test(asset)){report.remoteImages.push(asset);continue;}
  if(!asset.startsWith('/')||asset.startsWith('/api/')||asset.startsWith('/event-images/')) continue;
  try {await access(new URL('../public'+decodeURIComponent(asset.split('?')[0]),import.meta.url));} catch {report.missingImages.push(asset);}
}
report.duplicateTitles=Object.entries(Object.groupBy(report.pages,p=>(new URL(p.path,origin).searchParams.get('lang')??'ru')+'|'+p.title)).filter(([,p])=>p.length>1).map(([title,p])=>({title,paths:p.map(x=>x.path)}));
report.duplicateDescriptions=Object.entries(Object.groupBy(report.pages,p=>(new URL(p.path,origin).searchParams.get('lang')??'ru')+'|'+p.description)).filter(([,p])=>p.length>1).map(([description,p])=>({description,paths:p.map(x=>x.path)}));
for(const page of report.pages) for(const alternate of page.languageAlternates){
  const target=report.pages.find(p=>p.canonical===alternate.url);
  if(!target || !target.languageAlternates.some(a=>a.url===page.canonical)) report.issues.push({path:page.path,issues:['hreflang target missing or not reciprocal']});
}
const robots=await (await fetch(origin+'/robots.txt')).text();
assert.match(robots,/Disallow: \/admin/);
assert.match(robots,/Sitemap: https:\/\/rentplace.md\/sitemap.xml/);
report.summary={pages:report.pages.length,internalLinkTargets:targets.size,images:assets.size,issues:report.issues.length,brokenLinks:report.brokenLinks.length,missingImages:report.missingImages.length,duplicateTitles:report.duplicateTitles.length,duplicateDescriptions:report.duplicateDescriptions.length};
await writeFile('docs/site-final-local-audit.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report.summary));
if(report.issues.length||report.brokenLinks.length||report.missingImages.length||report.duplicateTitles.length) process.exitCode=1;
