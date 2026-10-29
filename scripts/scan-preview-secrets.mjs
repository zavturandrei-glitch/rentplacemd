import { readFile, stat, writeFile, readdir } from 'node:fs/promises';
import { execFileSync, spawn } from 'node:child_process';
import { parseEnv } from 'node:util';
const git = args => {
  try {
    return execFileSync('git',args,{encoding:'utf8',maxBuffer:128*1024*1024,stdio:['ignore','pipe','pipe']});
  } catch {
    // Node's raw child-process exception embeds captured output: never print it.
    console.error('Secret scan incomplete: Git inspection failed or exceeded its limit. Captured output suppressed.');
    process.exit(1);
  }
};
const known = [];
for (const name of await readdir('.')) if (name.startsWith('.env')) {
  try {
    const env = parseEnv(await readFile(name,'utf8'));
    for (const [key,value] of Object.entries(env)) {
      if (/SECRET|PASSWORD|TOKEN|KEY/.test(key) && value.length >= 16) known.push(value);
      if (/^postgres(?:ql)?:/.test(value)) {
        known.push(value);
        const url = new URL(value);
        if (url.password.length >= 12) known.push(url.password, decodeURIComponent(url.password));
      }
    }
  } catch { /* Never output private file contents or parsing errors. */ }
}
const suspect = text => known.some(value => text.includes(value)) || [...text.matchAll(/postgres(?:ql)?:\/\/[^\s"'<>]+:[^\s"'<>]+@[^\s"'<>]+\.neon\.tech\//gi)].some(match => {
  try {
    const url=new URL(match[0]);
    // Exact, public dummy credentials used by the existing safety tests.
    return !(url.username==='fixture' && url.password==='fixture');
  } catch {return true;}
}) || /-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----/.test(text);
const files = [...new Set(git(['ls-files','--cached','--others','--exclude-standard','-z']).split('\0').filter(Boolean))];
const findings = [];
for (const file of files) {
  try {
    if ((await stat(file)).size > 10*1024*1024) continue;
    if (suspect(await readFile(file,'utf8'))) findings.push(file);
  } catch { /* Deleted files have no deployable contents. */ }
}
// Stream large histories instead of retaining patches in a child-process error.
let historyFinding = false;
await new Promise((resolve,reject) => {
  const child = spawn('git',['log','--all','--format=','-p','--no-ext-diff'],{stdio:['ignore','pipe','pipe'],windowsHide:true});
  let tail='';
  const overlap=Math.max(4096,...known.map(value=>value.length));
  child.stdout.setEncoding('utf8');
  child.stdout.on('data',chunk=>{const text=tail+chunk; if(suspect(text)) historyFinding=true; tail=text.slice(-overlap);});
  child.stderr.on('data',()=>{});
  child.on('error',()=>reject(new Error('History scan unavailable; details suppressed')));
  child.on('close',code=>code===0?resolve():reject(new Error('History scan incomplete; details suppressed')));
}).catch(()=>{console.error('Secret scan incomplete. Captured history suppressed.');process.exit(1);});
const logFiles = (await readdir('.')).filter(name => /\.log$/.test(name));
const logFindings = [];
for (const name of logFiles) if (suspect(await readFile(name,'utf8'))) logFindings.push(name);
const report = {checkedAt:new Date().toISOString(),scannedWorkingFiles:files.length,workingTreeFindings:findings,gitHistoryFinding:historyFinding,scannedRootLogs:logFiles.length,rootLogFindings:logFindings,limitations:'Known local secrets, Neon DSN and private-key signatures. Does not prove absence of every unknown secret or remote log content; screenshot disclosure requires owner-confirmed password rotation.'};
await writeFile('docs/events-preview-secret-scan.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report));
if (findings.length || historyFinding || logFindings.length) process.exitCode=1;
