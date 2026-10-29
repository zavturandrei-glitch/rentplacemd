import assert from 'node:assert/strict';
import test from 'node:test';
import { createEventPreviewGuard, expectedEventPreviewBranch } from '../lib/eventPreviewGuard.mjs';

const env = { VERCEL_ENV:'preview', EVENTS_DATABASE_URL:'postgresql://fixture:fixture@preview.example/db', NEON_DATABASE_URL:'postgresql://fixture:fixture@main.example/db' };
function factory(row, seen) {
  return url => {
    seen.push(url);
    const sql = strings => { assert.match(strings.join(''), /^SELECT /); return 'read-only-query'; };
    sql.transaction = async (queries, options) => {
      assert.deepEqual(queries, ['read-only-query']);
      assert.equal(options.readOnly, true);
      return [[row]];
    };
    return sql;
  };
}
test('Preview guard uses the dedicated override, SELECT only and caches verified clients', async () => {
  const seen = [];
  const verify = createEventPreviewGuard(factory({branch_id:expectedEventPreviewBranch,read_only:'on'},seen));
  assert.equal((await verify(env)).verified, true);
  await verify(env);
  assert.deepEqual(seen, [env.EVENTS_DATABASE_URL]);
  await verify({...env,EVENTS_DATABASE_URL:env.EVENTS_DATABASE_URL.replace('preview.example','other.example')});
  assert.equal(seen.length, 2);
});
test('main, missing branch identity and non-read-only responses are rejected', async () => {
  for (const row of [{branch_id:'br-main',read_only:'on'},{branch_id:null,read_only:'on'},{branch_id:expectedEventPreviewBranch,read_only:'off'}]) {
    await assert.rejects(createEventPreviewGuard(factory(row,[]))(env), /Calendar access blocked/);
  }
});
test('missing connection and driver errors never leak credentials; failed probes can retry', async () => {
  await assert.rejects(createEventPreviewGuard()({VERCEL_ENV:'preview'}), /details hidden/);
  let calls = 0;
  const verify = createEventPreviewGuard(() => { calls++; throw new Error('postgresql://SECRET'); });
  for (let i=0;i<2;i++) await assert.rejects(verify(env), error => !error.message.includes('SECRET'));
  assert.equal(calls, 2);
});
test('Production and local development never probe or modify their connections', async () => {
  const verify = createEventPreviewGuard(() => { throw new Error('Must not connect'); });
  for (const VERCEL_ENV of ['production','development',undefined]) {
    const original = Object.freeze({...env,VERCEL_ENV});
    assert.deepEqual(await verify(original), {required:false});
    assert.equal(original.EVENTS_DATABASE_URL, env.EVENTS_DATABASE_URL);
  }
});
