import {readFile,writeFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {randomUUID,randomBytes} from 'node:crypto';
import {createServer} from 'node:net';
import {setTimeout} from 'node:timers/promises';
import assert from 'node:assert/strict';
import {neon} from '@neondatabase/serverless';
import {preparePreviewEnvironment,isolatedPreviewProcess} from './preview-events-env.mjs';
import {verifyEventPreviewBranch} from '../lib/eventPreviewGuard.mjs';
const report={checkedAt:new Date().toISOString(),productionChanged:false};
let stage='setup',server,sql,slug,touched=false;
try {
  const {values}=preparePreviewEnvironment(await readFile('.env.events.preview.local','utf8'));
  await verifyEventPreviewBranch(values);
  sql=neon(values.EVENTS_DATABASE_URL || values.NEON_DATABASE_URL);
  const password=randomBytes(32).toString('hex');
  const env={...isolatedPreviewProcess(values),ADMIN_PASSWORD:password,ADMIN_SESSION_SECRET:randomBytes(32).toString('hex')};
  const listener=createServer();await new Promise(r=>listener.listen(0,'127.0.0.1',r));
  const port=listener.address().port;await new Promise(r=>listener.close(r));
  const origin=`http://127.0.0.1:${port}`;
  server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{env,windowsHide:true,stdio:'ignore'});
  stage='server-start';let ready=false;
  for(let i=0;i<80;i++){try{if((await fetch(origin+'/events')).status===200){ready=true;break;}}catch{}await setTimeout(250);}
  assert.ok(ready);
  stage='admin-login';
  const login=await fetch(origin+'/api/admin/session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})});assert.equal(login.status,200);
  const cookie=login.headers.get('set-cookie').split(';')[0];
  const headers={Cookie:cookie,Origin:origin,'Content-Type':'application/json'};
  const snapshot=async()=>{const r=await fetch(origin+'/api/admin/events',{headers});assert.equal(r.status,200);return r.json();};
  const initial=await snapshot();assert.equal(initial.persistent,true);
  slug='local-admin-test-'+randomUUID();
  const localized=Object.fromEntries(['ru','ro','en','uk','cs'].map(l=>[l,`Preview test ${l}`]));
  let event={slug,title:localized,description:localized,venue:localized,startDate:'2026-11-30',category:'concert',status:'scheduled',sourceUrl:'https://example.com/preview-test'};
  const post=async(body)=>{const r=await fetch(origin+'/api/admin/events',{method:'POST',headers,body:JSON.stringify(body)});assert.equal(r.status,200);};
  stage='create';touched=true;await post({action:'save',event});
  const persisted=(await snapshot()).events.find(e=>e.slug===slug);assert.deepEqual(persisted.title,localized);report.fiveLanguagesPersisted=true;
  stage='update';event={...event,startDate:'2026-12-01'};await post({action:'save',originalSlug:slug,event});
  assert.equal((await snapshot()).events.find(e=>e.slug===slug).startDate,'2026-12-01');report.updatePersisted=true;
  stage='published-pages';
  for(const language of ['ru','ro','en','uk','cs']){const r=await fetch(origin+`/events/event/${slug}`+(language==='ru'?'':`?lang=${language}`));assert.equal(r.status,200);assert.ok((await r.text()).includes(localized[language]));}
  report.fiveLocalizedPages=true;
  stage='cancel';await post({action:'delete',slug});assert.equal((await snapshot()).events.find(e=>e.slug===slug).status,'cancelled');report.cancelPreservesRecord=true;
  stage='health';const health=await (await fetch(origin+'/api/admin/events/health',{headers})).json();assert.equal(health.schemaReady,true);assert.equal(health.previewBranch.verified,true);report.previewHealthVerified=true;
} catch {report.failedAt=stage;process.exitCode=1;}
finally {
  if(touched&&sql&&slug){
    try {
      // Remove only this random fixture and its own log messages; preserve other state.
      await sql.transaction([
        sql`DO $$ BEGIN IF current_setting('neon.branch_id',true) IS DISTINCT FROM 'br-wild-band-b9c3gc4d' THEN RAISE EXCEPTION 'Wrong branch'; END IF; END $$`,
        sql`UPDATE rentplace_event_state SET payload=jsonb_set(payload #- ARRAY['overrides',${slug}],'{logs}',COALESCE((SELECT jsonb_agg(entry) FROM jsonb_array_elements(payload->'logs') entry WHERE strpos(entry->>'message',${slug})=0),'[]'::jsonb)),revision=revision+1 WHERE id=1`,
      ]);
      const [clean]=await sql`SELECT NOT ((payload->'overrides') ? ${slug}) AS clean FROM rentplace_event_state WHERE id=1`;
      assert.equal(clean.clean,true);report.fixtureRemoved=true;
    }catch{report.cleanupFailed=true;process.exitCode=1;}
  }
  server?.kill();
  await writeFile('docs/events-preview-admin-check.json',JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report));
}
