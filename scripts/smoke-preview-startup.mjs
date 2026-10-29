import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { setTimeout } from 'node:timers/promises';
import { preparePreviewEnvironment, isolatedPreviewProcess } from './preview-events-env.mjs';
let child;
try {
  const {values} = preparePreviewEnvironment(await readFile('.env.events.preview.local','utf8'));
  child = spawn(process.execPath, ['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3002'], {env:isolatedPreviewProcess(values),windowsHide:true,stdio:['ignore','pipe','pipe']});
  // Retain no driver output; detect only the known successful startup marker.
  let verified = false;
  child.stdout.on('data', chunk => { if (String(chunk).includes('Events Preview database branch verified (read-only).')) verified = true; });
  child.stderr.on('data', () => {});
  child.on('error', () => {});
  for (let attempt=0;attempt<60 && !verified && child.exitCode === null;attempt++) await setTimeout(500);
  assert.equal(verified,true);
  const response = await fetch('http://127.0.0.1:3002/events',{signal:AbortSignal.timeout(15000)});
  assert.equal(response.status,200);
  assert.match(await response.text(), /<h1[\s>]/);
  console.log('Preview startup: branch guard passed; local calendar HTTP 200. No deployment or database writes.');
} catch {
  console.error('Local Preview startup check failed. Connection details suppressed.');
  process.exitCode=1;
} finally {
  child?.kill();
}
