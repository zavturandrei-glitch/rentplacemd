import {readFile,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {neon} from '@neondatabase/serverless';
import assert from 'node:assert/strict';
import {eventMigrationPlan} from './event-db-tools.mjs';
const project='late-waterfall-84721735',branch='br-lively-recipe-b9a5h4gk';
const vercel='prj_1n4XSnLrr6VJr0YAzJRhtTCq63Jv';
const report={checkedAt:new Date().toISOString(),branchId:branch,migrated:false,productionSecretConfigured:false,existingTablesChanged:false,databaseUrlChanged:false};
let stage='approval-and-backup';
function cli(command,input){const r=spawnSync(process.env.ComSpec||'cmd.exe',['/d','/s','/c','npx --yes vercel@65.7.0 '+command],{input,encoding:'utf8',windowsHide:true,maxBuffer:2*1024*1024,timeout:60000});if(r.error||r.status!==0)throw new Error('CLI failed; details suppressed');return r.stdout;}
try{
 assert.deepEqual(process.argv.slice(2),['--apply-owner-approved-main']);
 const backup=JSON.parse(await readFile('docs/events-production-recovery-point.json','utf8'));
 assert.equal(backup.ready,true);assert.equal(backup.snapshot.source_branch_id,branch);
 report.snapshotId=backup.snapshot.id;
 const plan=await eventMigrationPlan();
 assert.equal(plan.checksum,'3fe963a38656f58b2d93d0efb11e412ca561522d0bef1752dc2c12d30b657c74');
 assert.doesNotMatch(plan.statements.join('\n'),/\b(DROP|TRUNCATE|ALTER|UPDATE|DELETE)\b/i);
 const credentials=JSON.parse(await readFile('.env.neon-cli-auth/credentials.rentplacemd-preview-rotation.json','utf8'));
 async function api(path){const r=await fetch('https://console.neon.tech/api/v2'+path,{headers:{Authorization:'Bearer '+credentials.access_token},signal:AbortSignal.timeout(15000)});assert.ok(r.ok);return r.json();}
 stage='scope-preflight';
 const meta=await api(`/projects/${project}/branches/${branch}`);assert.equal(meta.branch.name,'main');assert.equal(meta.branch.id,branch);
 const connection=await api(`/projects/${project}/connection_uri?branch_id=${branch}&database_name=neondb&role_name=neondb_owner&pooled=true`);
 const sql=neon(connection.uri);
 const before=JSON.parse(cli(`api /v9/projects/${vercel} --method GET --raw`));assert.equal(before.name,'rentplacemd');
 assert.equal(before.env.filter(e=>e.key==='EVENTS_DATABASE_URL'&&e.target.includes('production')).length,0);
 const protectedMetadata=before.env.filter(e=>e.key!=='EVENTS_DATABASE_URL').map(e=>({id:e.id,key:e.key,target:e.target,type:e.type}));
 stage='branch-and-object-check';
 const [[identity],tables]=await sql.transaction([sql`SELECT current_setting('neon.branch_id',true) AS branch`,sql`SELECT n.nspname,c.relname FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname NOT IN ('pg_catalog','information_schema') AND n.nspname NOT LIKE 'pg_toast%' AND c.relkind IN ('r','p') ORDER BY 1,2`],{readOnly:true});assert.equal(identity.branch,branch);
 report.preExistingTableCount=tables.length;
 const guard=`DO $$ BEGIN
 IF current_setting('neon.branch_id',true) IS DISTINCT FROM '${branch}' THEN RAISE EXCEPTION 'Branch mismatch'; END IF;
 IF EXISTS (SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname='public' AND c.relname IN ('rentplace_event_state','rentplace_event_images')) OR EXISTS (SELECT 1 FROM pg_type t JOIN pg_namespace n ON n.oid=t.typnamespace WHERE n.nspname='public' AND t.typname IN ('rentplace_event_state','rentplace_event_images')) THEN RAISE EXCEPTION 'Conflicting objects'; END IF;
 END $$`;
 stage='atomic-migration';
 await sql.transaction([
  sql.query(guard),...plan.statements.map(s=>sql.query(s)),
  sql.query(`DO $$ BEGIN IF (SELECT count(*) FROM information_schema.columns WHERE table_schema='public' AND table_name IN ('rentplace_event_state','rentplace_event_images'))<>11 OR (SELECT count(*) FROM public.rentplace_event_state WHERE id=1 AND revision=0 AND payload='{"overrides":{},"queue":[],"rejected":[],"logs":[]}'::jsonb)<>1 THEN RAISE EXCEPTION 'Unexpected migration result'; END IF; END $$`),
 ],{fetchOptions:{signal:AbortSignal.timeout(20000)}});
 report.migrated=true;
 stage='post-migration-read-only';
 const [[state],columns,afterTables]=await sql.transaction([
  sql`SELECT id,revision,jsonb_typeof(payload->'overrides') AS overrides_type,jsonb_array_length(payload->'queue') AS queue_count FROM rentplace_event_state`,
  sql`SELECT table_name,column_name,data_type,is_nullable FROM information_schema.columns WHERE table_schema='public' AND table_name IN ('rentplace_event_state','rentplace_event_images') ORDER BY table_name,ordinal_position`,
  sql`SELECT n.nspname,c.relname FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname NOT IN ('pg_catalog','information_schema') AND n.nspname NOT LIKE 'pg_toast%' AND c.relkind IN ('r','p') ORDER BY 1,2`,
 ],{readOnly:true});
 assert.equal(state.id,1);assert.equal(state.revision,0);assert.equal(state.overrides_type,'object');assert.equal(state.queue_count,0);assert.equal(columns.length,11);
 assert.deepEqual(afterTables.filter(t=>!['rentplace_event_state','rentplace_event_images'].includes(t.relname)),tables);
 report.schemaVerified=true;report.serviceRecordVerified=true;
 stage='add-production-only-secret';
 cli(`env add EVENTS_DATABASE_URL --environment production --project ${vercel} --sensitive --yes`,connection.uri+'\n');
 report.productionSecretConfigured=true;
 stage='verify-production-scope';
 const after=JSON.parse(cli(`api /v9/projects/${vercel} --method GET --raw`));
 const records=after.env.filter(e=>e.key==='EVENTS_DATABASE_URL'&&e.target.includes('production'));assert.equal(records.length,1);assert.deepEqual(records[0].target,['production']);assert.ok(!records[0].gitBranch);assert.equal(records[0].type,'sensitive');
 assert.deepEqual(after.env.filter(e=>e.key!=='EVENTS_DATABASE_URL').map(e=>({id:e.id,key:e.key,target:e.target,type:e.type})),protectedMetadata);
 const [[last]]=await neon(connection.uri).transaction([sql`SELECT current_setting('neon.branch_id',true) AS branch,to_regclass('public.rentplace_event_state') IS NOT NULL AS state_ready,to_regclass('public.rentplace_event_images') IS NOT NULL AS images_ready`],{readOnly:true});
 assert.equal(last.branch,branch);assert.ok(last.state_ready&&last.images_ready);
 report.connectionVerified=true;report.productionOnlySecretVerified=true;
}catch{report.stoppedAt=stage;report.transactionRollbackOnSqlError=true;process.exitCode=1;}
await writeFile('docs/events-production-migration-result.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report));
