import {readFile} from 'node:fs/promises';
import {parseEnv} from 'node:util';
import {spawnSync} from 'node:child_process';
import {neon} from '@neondatabase/serverless';
import assert from 'node:assert/strict';

const projectId='prj_1n4XSnLrr6VJr0YAzJRhtTCq63Jv';
const branch='br-wild-band-b9c3gc4d';
let stage='arguments';
const report={localUpdated:false,vercelPreviewUpdated:false,productionModified:false,deployed:false};
// The only commands permitted here are fixed read requests and a Preview-only update.
function cli(command,input) {
  const result=spawnSync(process.env.ComSpec || 'cmd.exe',['/d','/s','/c',`npx --yes vercel@65.7.0 ${command}`],{input,encoding:'utf8',windowsHide:true,maxBuffer:2*1024*1024,timeout:60000});
  if (result.error || result.status!==0) throw new Error('CLI failed');
  return result.stdout;
}
async function probe(connection) {
  const url=new URL(connection);
  // Avoid reusing an authenticated PgBouncer session when testing revoked credentials.
  url.hostname=url.hostname.replace(/-pooler(?=\.)/,'');
  const sql=neon(url.toString());
  const [[row]]=await sql.transaction([sql`SELECT current_setting('neon.branch_id',true) AS branch, current_setting('transaction_read_only') AS mode`],{readOnly:true,fetchOptions:{signal:AbortSignal.timeout(15000)}});
  assert.equal(row.branch,branch);
  assert.equal(row.mode,'on');
}
function inspectProject() {
  const project=JSON.parse(cli(`api /v9/projects/${projectId} --method GET --raw`));
  assert.equal(project.id,projectId);
  assert.equal(project.name,'rentplacemd');
  assert.ok(['all_except_custom_domains','all','preview','standard_protection'].includes(project.ssoProtection?.deploymentType));
  const records=project.env.filter(e=>e.key==='EVENTS_DATABASE_URL');
  assert.equal(records.length,1,'Unexpected variable scope/overrides');
  assert.deepEqual(records[0].target,['preview']);
  assert.ok(!records[0].gitBranch);
  assert.ok(['sensitive','secret'].includes(records[0].type));
  return records[0].id;
}
try {
  const prepare=process.argv[2]==='--prepare';
  assert.ok(prepare ? process.argv.length===3 : process.argv[2]==='--apply-from-file' && process.argv.length===4);
  stage='private-local-file';
  const original=await readFile('.env.events.preview.local','utf8');
  const old=parseEnv(original).NEON_DATABASE_URL;
  const oldUrl=new URL(old);
  assert.ok(oldUrl.hostname.endsWith('.neon.tech'));
  stage='vercel-project-protection-and-scope';
  const variableId=inspectProject();
  if (prepare) {
    stage='current-preview-identity';
    await probe(old);
    console.log(JSON.stringify({prepared:true,projectVerified:true,protectionVerified:true,previewOnlySecretVerified:true,branchVerified:true,ownerPasswordResetRequired:true,noChanges:true}));
  } else {
    stage='new-neon-file';
    const bytes=await readFile(process.argv[3]);
    assert.ok(bytes.length<65536);
    const source=bytes.toString(bytes[0]===255&&bytes[1]===254?'utf16le':'utf8');
    const env=parseEnv(source);
    const values=[...new Set(Object.values(env).filter(v=>/^postgres(?:ql)?:\/\//.test(v)))];
    let next;
    if (values.length===1) next=values[0];
    else if (values.length===0 && /^postgres(?:ql)?:\/\//.test(source.trim())) next=source.trim();
    else if (values.length===0) {
      const user=env.PGUSER || env.NEON_PGUSER;
      const password=env.PGPASSWORD || env.NEON_PGPASSWORD;
      assert.equal(user,decodeURIComponent(oldUrl.username));
      assert.ok(password);
      const url=new URL(old); url.password=password; next=url.toString();
    } else throw new Error('Ambiguous URLs');
    const newUrl=new URL(next);
    assert.ok(['postgres:','postgresql:'].includes(newUrl.protocol));
    assert.equal(newUrl.hostname.replace('-pooler.','.'),oldUrl.hostname.replace('-pooler.','.'));
    assert.equal(newUrl.username,oldUrl.username);
    assert.equal(newUrl.pathname,oldUrl.pathname);
    assert.notEqual(decodeURIComponent(newUrl.password),decodeURIComponent(oldUrl.password));
    newUrl.searchParams.set('sslmode','require');
    next=newUrl.toString();
    stage='new-password-preview-identity';
    await probe(next);
    report.newPasswordWorks=true;
    stage='old-password-revocation';
    let revoked=false;
    try {await probe(old);} catch(error) {
      // Neon's HTTPS proxy can omit SQLSTATE on an explicit authentication failure.
      revoked=['28P01','28000'].includes(error?.code) || /password authentication failed/i.test(String(error?.message));
    }
    assert.ok(revoked,'Old password accepted or revocation unverifiable');
    report.oldPasswordRejected=true;
    stage='repeat-remote-scope-check';
    assert.equal(inspectProject(),variableId);
    // CLI help confirms that updates affect ALL targets on the record. The exact
    // single-target Preview metadata above is therefore a mandatory precondition.
    stage='update-vercel-preview';
    cli(`env update EVENTS_DATABASE_URL --environment preview --project ${projectId} --sensitive --yes`,next+'\n');
    report.vercelPreviewUpdated=true;
    stage='update-local';
    assert.equal(await readFile('.env.events.preview.local','utf8'),original);
    const repair=spawnSync(process.execPath,['scripts/repair-events-preview-env.mjs'],{input:next,encoding:'utf8',windowsHide:true,maxBuffer:16384});
    assert.equal(repair.status,0);
    assert.equal(parseEnv(await readFile('.env.events.preview.local','utf8')).NEON_DATABASE_URL,next);
    report.localUpdated=true;
    stage='post-update-verification';
    assert.equal(inspectProject(),variableId);
    await probe(next);
    report.branchVerified=true;
    report.remoteUpdateAcknowledged=true;
    report.remoteRuntimeVerificationPending=true;
    console.log(JSON.stringify(report));
  }
} catch {
  console.error(JSON.stringify({...report,stopped:true,stage,detailsSuppressed:true}));
  process.exitCode=1;
}
