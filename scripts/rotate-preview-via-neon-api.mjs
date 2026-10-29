import {readFile,writeFile,unlink} from 'node:fs/promises';
import {parseEnv} from 'node:util';
import {spawnSync} from 'node:child_process';
import {setTimeout} from 'node:timers/promises';
import {neon} from '@neondatabase/serverless';
import assert from 'node:assert/strict';
const project='late-waterfall-84721735',branch='br-wild-band-b9c3gc4d';
const pending='.env.events.rotation.pending.local';
let stage='preflight';
const report={checkedAt:new Date().toISOString(),passwordReset:false,productionModified:false,deployed:false};
try {
  const credentials=JSON.parse(await readFile('.env.neon-cli-auth/credentials.rentplacemd-preview-rotation.json','utf8'));
  async function api(path,method='GET'){
    const response=await fetch('https://console.neon.tech/api/v2'+path,{method,headers:{Authorization:'Bearer '+credentials.access_token,Accept:'application/json'},signal:AbortSignal.timeout(30000)});
    if(!response.ok)throw new Error('Neon API request failed');
    return response.json();
  }
  const metadata=await api(`/projects/${project}/branches/${branch}`);
  assert.equal(metadata.branch.id,branch);assert.equal(metadata.branch.name,'preview');assert.equal(metadata.branch.default,false);
  const preflight=spawnSync(process.execPath,['scripts/rotate-events-preview-from-file.mjs','--prepare'],{encoding:'utf8',windowsHide:true,maxBuffer:16384});
  assert.equal(preflight.status,0);
  const old=parseEnv(await readFile('.env.events.preview.local','utf8')).NEON_DATABASE_URL;
  const url=new URL(old);
  const role=decodeURIComponent(url.username);
  const roles=await api(`/projects/${project}/branches/${branch}/roles`);
  assert.ok(roles.roles.some(r=>r.name===role && r.branch_id===branch));
  assert.equal(await readFile(pending,'utf8'),'');
  stage='reset-exact-preview-role';
  // A single POST. On an unknown outcome, never repeat automatically.
  const result=await api(`/projects/${project}/branches/${branch}/roles/${encodeURIComponent(role)}/reset_password`,'POST');
  assert.equal(result.role.branch_id,branch);assert.equal(result.role.name,role);assert.ok(result.role.password);
  report.passwordReset=true;
  url.password=result.role.password;
  stage='persist-private-recovery';
  await writeFile(pending,'NEON_DATABASE_URL='+JSON.stringify(url.toString())+'\n',{flag:'r+'});
  stage='wait-new-connection';
  let ready=false;
  for(let attempt=0;attempt<15;attempt++){
    try{
      const direct=new URL(url);direct.hostname=direct.hostname.replace(/-pooler(?=\.)/,'');
      const sql=neon(direct.toString());
      const [[row]]=await sql.transaction([sql`SELECT current_setting('neon.branch_id',true) AS branch`],{readOnly:true,fetchOptions:{signal:AbortSignal.timeout(5000)}});
      assert.equal(row.branch,branch);ready=true;break;
    }catch{await setTimeout(1000);}
  }
  assert.ok(ready);
  stage='revoke-proof-and-update-configurations';
  const applied=spawnSync(process.execPath,['scripts/rotate-events-preview-from-file.mjs','--apply-from-file',pending],{encoding:'utf8',windowsHide:true,maxBuffer:16384,timeout:120000});
  if(applied.status!==0){
    try {const safe=JSON.parse(applied.stderr);report.configurationStage=safe.stage;report.localUpdated=Boolean(safe.localUpdated);report.vercelPreviewUpdated=Boolean(safe.vercelPreviewUpdated);}catch{}
    throw new Error('Configuration verification stopped');
  }
  const verified=JSON.parse(applied.stdout);
  assert.equal(verified.oldPasswordRejected,true);assert.equal(verified.newPasswordWorks,true);
  assert.equal(verified.localUpdated,true);assert.equal(verified.vercelPreviewUpdated,true);
  Object.assign(report,{oldPasswordRejected:true,newPasswordWorks:true,localUpdated:true,vercelPreviewUpdated:true,branchVerified:true});
  await unlink(pending);
  report.privateRecoveryFileRemoved=true;
}catch {report.stoppedAt=stage;process.exitCode=1;}
await writeFile('docs/events-preview-rotation-result.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report));
