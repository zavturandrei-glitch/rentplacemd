import { readFile, open } from 'node:fs/promises';
import { parseEnv } from 'node:util';
import assert from 'node:assert/strict';
import { neon } from '@neondatabase/serverless';

const path = '.env.events.preview.local';
let stage = 'source-format';
try {
  let input = '';
  if (process.argv[2] === '--source-file' && process.argv.length === 4) {
    const source = await readFile(process.argv[3], 'utf8');
    assert.ok(source.length < 65536);
    const parsed = parseEnv(source);
    const candidates = [...new Set(Object.values(parsed).filter(value => /^postgres(?:ql)?:\/\//.test(value)))];
    if (!candidates.length && /^postgres(?:ql)?:\/\//.test(source.trim())) candidates.push(source.trim());
    assert.equal(candidates.length, 1, 'Ambiguous source');
    input = candidates[0];
  } else {
    assert.equal(process.argv.length, 2);
    for await (const chunk of process.stdin) {
      input += chunk;
      if (input.length > 16384) throw new Error('Too long');
    }
  }
  const connection = input.trim();
  assert.ok(!/[\r\n]/.test(connection));
  const url = new URL(connection);
  assert.ok(['postgres:', 'postgresql:'].includes(url.protocol));
  assert.ok(url.hostname.endsWith('.neon.tech') && url.username && url.password && url.pathname.length > 1);
  assert.equal(url.searchParams.get('sslmode'), 'require');
  assert.ok(!url.hash);
  stage = 'file-format';
  const original = await readFile(path, 'utf8');
  // Remove only the explicitly reported accidental prefix, preserving all other lines.
  const cleaned = original.replace(/^(\uFEFF?)([ \t]*)sslmode=require&channel_binding=require(?=NEON_DATABASE_URL=)/m, '$1$2')
    .replace(/^[ \t]*sslmode=require&channel_binding=require[ \t]*(?:\r?\n|$)/gm, '');
  const matches = [...cleaned.matchAll(/^[ \t]*NEON_DATABASE_URL[ \t]*=[^\r\n]*/gm)];
  assert.equal(matches.length, 1);
  const before = parseEnv(cleaned);
  const replacement = `NEON_DATABASE_URL=${JSON.stringify(connection)}`;
  const next = cleaned.replace(/^[ \t]*NEON_DATABASE_URL[ \t]*=[^\r\n]*/m, () => replacement);
  const after = parseEnv(next);
  assert.equal(after.NEON_DATABASE_URL, connection);
  delete before.NEON_DATABASE_URL;
  const remaining = { ...after };
  delete remaining.NEON_DATABASE_URL;
  assert.deepEqual(remaining, before);
  stage = 'preview-read-only-check';
  const sql = neon(connection);
  const [[row]] = await sql.transaction([
    sql`SELECT current_setting('neon.branch_id', true) AS branch_id, current_setting('transaction_read_only') AS read_only, to_regclass('public.rentplace_event_state') IS NOT NULL AS state_ready, to_regclass('public.rentplace_event_images') IS NOT NULL AS images_ready`,
  ], {readOnly:true,fetchOptions:{signal:AbortSignal.timeout(15000)}});
  stage = 'branch-id';
  assert.equal(row.branch_id, 'br-wild-band-b9c3gc4d');
  assert.equal(row.read_only, 'on');
  stage = 'save';
  // Update the existing private file in place, retaining its Windows ACL. No secret backup.
  assert.equal(await readFile(path,'utf8'), original, 'File changed during verification');
  const handle = await open(path, 'r+');
  try {
    await handle.writeFile(next, 'utf8');
    await handle.truncate(Buffer.byteLength(next, 'utf8'));
    await handle.sync();
  } finally { await handle.close(); }
  stage = 'verify-saved-file';
  assert.equal(await readFile(path,'utf8'), next);
  console.log(JSON.stringify({saved:true,branchVerified:true,branchId:row.branch_id,readOnly:true,schemaReady:row.state_ready && row.images_ready,otherVariablesUnchanged:true,accidentalPrefixRemoved:cleaned!==original,secretsPrinted:false}));
} catch (error) {
  const reason = error?.code === '28P01' ? 'password-invalid' : error?.code === '28000' ? 'authentication-rejected' : stage;
  console.error(JSON.stringify({success:false,reason,detailsSuppressed:true}));
  process.exitCode=1;
}
