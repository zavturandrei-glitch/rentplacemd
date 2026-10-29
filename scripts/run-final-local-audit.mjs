import {spawn} from 'node:child_process';
import {createServer} from 'node:net';
import {setTimeout} from 'node:timers/promises';
import {randomBytes} from 'node:crypto';
const listener=createServer();
await new Promise(resolve=>listener.listen(0,'127.0.0.1',resolve));
const port=listener.address().port;
await new Promise(resolve=>listener.close(resolve));
const env={...process.env,VERCEL_ENV:'development',EVENTS_ALLOW_SHARED_DATABASE:'false',LEGACY_USE_NEON_DATABASE:'false',ADMIN_PASSWORD:randomBytes(32).toString('hex'),ADMIN_SESSION_SECRET:randomBytes(32).toString('hex'),CRON_SECRET:randomBytes(32).toString('hex')};
for(const key of ['EVENTS_DATABASE_URL','EVENTS_MIGRATION_DATABASE_URL','DATABASE_URL','POSTGRES_URL','NEON_DATABASE_URL','NEON_DATABASE_URL_UNPOOLED','NEON_POSTGRES_URL','NEON_POSTGRES_URL_NON_POOLING','AVAILABILITY_DATABASE_URL','CITY_VIDEOS_DATABASE_URL','SUPABASE_URL','SUPABASE_SERVICE_ROLE_KEY']) env[key]='';
const origin=`http://127.0.0.1:${port}`;
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{env,windowsHide:true,stdio:'ignore'});
try {
  let ready=false;
  for(let i=0;i<80;i++){try {if((await fetch(origin+'/events')).status===200){ready=true;break;}}catch{} await setTimeout(250);}
  if(!ready) throw new Error('Local server unavailable');
  if(process.argv.includes('--review')) {
    console.log(JSON.stringify({reviewOrigin:origin,processId:server.pid}));
    await new Promise(resolve=>server.on('exit',resolve));
    process.exit(0);
  }
  const child=spawn(process.execPath,['scripts/audit-site-local.mjs'],{env:{...env,AUDIT_ORIGIN:origin},windowsHide:true,stdio:['ignore','pipe','pipe']});
  child.stdout.on('data',chunk=>process.stdout.write(chunk));
  child.stderr.on('data',()=>{});
  const status=await new Promise(resolve=>child.on('exit',resolve));
  process.exitCode=status??1;
  if(status) console.error('Local audit found issues; see safe JSON report.');
} catch {console.error('Local audit failed; server details suppressed.');process.exitCode=1;}
finally {server.kill();}
