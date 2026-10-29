import {spawnSync} from 'node:child_process';
import {writeFile,readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {parseEnv} from 'node:util';
const project='prj_1n4XSnLrr6VJr0YAzJRhtTCq63Jv';
const privateEnv=parseEnv(await readFile('.env.events.preview.local','utf8'));
const connection=new URL(privateEnv.NEON_DATABASE_URL);
const redact=text=>{
 for(const value of [privateEnv.NEON_DATABASE_URL,connection.password,decodeURIComponent(connection.password)].filter(Boolean))text=text.split(value).join('[redacted]');
 return text.replace(/postgres(?:ql)?:\/\/\S+|Bearer\s+\S+|npg_[A-Za-z0-9_]+/gi,'[redacted]');
};
const run=command=>{
 const r=spawnSync(process.env.ComSpec||'cmd.exe',['/d','/s','/c','npx --yes vercel@65.7.0 '+command],{encoding:'utf8',windowsHide:true,maxBuffer:4*1024*1024,timeout:180000});
 if(r.error||r.status!==0){const error=new Error('Vercel command failed');error.safeReason=redact(String(r.stderr??'')).split(/\r?\n/).filter(line=>/error|invalid|unknown|cannot/i.test(line)).slice(-3).join(' ').slice(0,600);throw error;}return r.stdout;
};
const report={checkedAt:new Date().toISOString(),projectId:project,productionModified:false};
let stage='rotation-evidence';
try{
 const rotation=JSON.parse(await readFile('docs/events-preview-rotation-result.json','utf8'));
 assert.ok(rotation.passwordReset&&rotation.oldPasswordRejected&&rotation.newPasswordWorks&&rotation.vercelPreviewUpdated);
 stage='project-protection';
 const p=JSON.parse(run(`api /v9/projects/${project} --method GET --raw`));
 assert.equal(p.name,'rentplacemd');
 assert.equal(p.ssoProtection?.deploymentType,'all_except_custom_domains');
 const records=p.env.filter(e=>e.key==='EVENTS_DATABASE_URL');assert.equal(records.length,1);assert.deepEqual(records[0].target,['preview']);assert.ok(!records[0].gitBranch);
 report.productionDeploymentBefore=p.targets?.production?.id??null;
 report.protection='vercel-authentication';
 stage='create-preview';
 const result=JSON.parse(run(`deploy --environment=preview --project=${project} --yes --json --no-wait`));
 const d=result.deployment??result;
 report.responseFields=Object.keys(result);
 report.deploymentId=d.id??d.deploymentId;
 report.url=d.url??d.deploymentUrl;
 if(report.url&&!report.url.startsWith('https://'))report.url='https://'+report.url;
 report.readyState=d.readyState??d.state??null;
 report.created=true;
}catch(error){report.failedAt=stage;if(error.safeReason)report.safeReason=error.safeReason;process.exitCode=1;}
await writeFile('docs/events-preview-deployment.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report));
