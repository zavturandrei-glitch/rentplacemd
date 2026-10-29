import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import { preparePreviewEnvironment } from "./preview-events-env.mjs";
import { eventMigrationPlan } from "./event-db-tools.mjs";
import { validateEvent } from "../lib/eventsWorkflow.ts";

// Deliberately restricted to the branch and exact migration approved by the owner.
const branch = "br-wild-band-b9c3gc4d";
const checksum = "3fe963a38656f58b2d93d0efb11e412ca561522d0bef1752dc2c12d30b657c74";
const report = { checkedAt: new Date().toISOString(), branch, migrated: false, testEventRemoved: false };
try {
  const mode = process.argv[2];
  assert.equal(process.argv.length, 3);
  assert.ok(["--apply-approved-preview", "--verify-existing"].includes(mode));
  const { values } = preparePreviewEnvironment(await readFile(".env.events.preview.local", "utf8"));
  // Use the same URL for preflight, migration and subsequent independent clients.
  const connect = () => neon(values.NEON_DATABASE_URL);
  const sql = connect();
  const plan = await eventMigrationPlan();
  assert.equal(plan.checksum, checksum);
  const guard = `DO $$ BEGIN
    IF current_setting('neon.branch_id', true) IS DISTINCT FROM '${branch}' THEN
      RAISE EXCEPTION 'Preview branch mismatch';
    END IF;
  END $$`;
  const [[identity], before] = await sql.transaction([
    sql`SELECT current_setting('neon.branch_id', true) AS branch`,
    sql`SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema NOT IN ('pg_catalog','information_schema') AND table_type = 'BASE TABLE' ORDER BY 1,2`,
  ], { readOnly: true });
  assert.equal(identity.branch, branch);
  assert.deepEqual(before, mode === '--apply-approved-preview' ? [] : [
    {table_schema:'public',table_name:'rentplace_event_images'},
    {table_schema:'public',table_name:'rentplace_event_state'},
  ], "Unexpected schema: stopped");
  report.branchVerified = true;
  // Both checks execute again inside the atomic migration transaction before any DDL.
  if (mode === '--apply-approved-preview') await sql.transaction([
    sql.query(guard),
    sql.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema NOT IN ('pg_catalog','information_schema') AND table_type = 'BASE TABLE') THEN RAISE EXCEPTION 'Unexpected schema'; END IF; END $$`),
    ...plan.statements.map(statement => sql.query(statement)),
  ]);
  report.migrated = mode === '--apply-approved-preview';
  report.migrationAlreadyPresent = mode === '--verify-existing';
  const columns = await sql`SELECT table_name, column_name, data_type, is_nullable FROM information_schema.columns WHERE table_schema='public' ORDER BY table_name, ordinal_position`;
  const expected = {
    rentplace_event_images: [['id','text','NO'],['bytes','bytea','NO'],['mime','text','NO'],['source','text','NO'],['rights','text','NO'],['created_at','timestamp with time zone','NO']],
    rentplace_event_state: [['id','integer','NO'],['revision','integer','NO'],['payload','jsonb','NO'],['locked_until','timestamp with time zone','YES'],['lock_token','text','YES']],
  };
  assert.deepEqual(Object.fromEntries(Object.keys(expected).map(name => [name, columns.filter(c => c.table_name === name).map(c => [c.column_name,c.data_type,c.is_nullable])])), expected);
  assert.equal(columns.length, 11);
  const constraints = await sql`SELECT conrelid::regclass::text AS table_name, contype, pg_get_constraintdef(oid) AS definition FROM pg_constraint WHERE conrelid IN ('public.rentplace_event_state'::regclass,'public.rentplace_event_images'::regclass) ORDER BY 1,2`;
  assert.equal(constraints.filter(c => c.contype === 'p').length, 2);
  assert.equal(constraints.filter(c => c.contype === 'c').length, 2);
  report.structureVerified = true;
  const [initial] = await sql`SELECT payload, revision FROM rentplace_event_state WHERE id=1`;
  assert.deepEqual(initial.payload, { overrides: {}, queue: [], rejected: [], logs: [] });
  const slug = `preview-test-${randomUUID()}`;
  const localized = {ru:'Тест',ro:'Test',en:'Test',uk:'Тест',cs:'Test'};
  const fixture = JSON.parse(JSON.stringify(validateEvent({ slug, title:localized, description:localized, venue:localized, category:'concert', sourceUrl:'https://example.com/preview-test', startDate:'2026-11-01', status:'scheduled' })));
  let inserted = false;
  try {
    const [, rows] = await sql.transaction([sql.query(guard), sql`UPDATE rentplace_event_state SET payload=jsonb_set(payload, ARRAY['overrides',${slug}], ${JSON.stringify(fixture)}::jsonb), revision=revision+1 WHERE id=1 AND revision=${initial.revision} RETURNING revision`]);
    assert.equal(rows.length, 1);
    inserted = true;
    const [persisted] = await connect()`SELECT payload->'overrides'->${slug} AS event FROM rentplace_event_state WHERE id=1`;
    assert.deepEqual(persisted.event, fixture);
    report.writeReadAcrossClients = true;
    const updated = { ...fixture, startDate:'2026-11-02' };
    await connect().transaction([sql.query(guard), sql`UPDATE rentplace_event_state SET payload=jsonb_set(payload, ARRAY['overrides',${slug}], ${JSON.stringify(updated)}::jsonb), revision=revision+1 WHERE id=1`]);
    const [readUpdated] = await connect()`SELECT payload->'overrides'->${slug} AS event FROM rentplace_event_state WHERE id=1`;
    assert.deepEqual(readUpdated.event, updated);
    report.updatePersistedAcrossClients = true;
  } finally {
    if (inserted) await sql.transaction([sql.query(guard), sql`UPDATE rentplace_event_state SET payload=payload #- ARRAY['overrides',${slug}], revision=revision+1 WHERE id=1`]);
    const [clean] = await connect()`SELECT payload FROM rentplace_event_state WHERE id=1`;
    assert.deepEqual(clean.payload, initial.payload);
    report.testEventRemoved = true;
  }
  const after = await sql`SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema NOT IN ('pg_catalog','information_schema') AND table_type='BASE TABLE' ORDER BY 1,2`;
  assert.deepEqual(after, Object.keys(expected).map(table_name => ({table_schema:'public',table_name})));
  const [images] = await sql`SELECT count(*)::int AS count FROM rentplace_event_images`;
  assert.equal(images.count, 0);
  report.onlyExpectedTables = true;
  report.existingDataChanged = false;
  report.databaseUrlModified = false;
  report.deployed = false;
} catch {
  report.failed = true;
  console.error('Preview verification stopped. Connection details suppressed; inspect safe report before retrying.');
  process.exitCode = 1;
} finally {
  await writeFile('docs/events-preview-migration-check.json', JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report));
}
