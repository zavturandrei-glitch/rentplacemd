import { neon } from "@neondatabase/serverless";
import { loadEventEnvironment, resolveEventDatabase } from "./event-db-tools.mjs";

try {
  const expectedBranch = process.argv.find(value => value.startsWith("--expected-branch-id="))?.slice("--expected-branch-id=".length);
  if (expectedBranch && !/^br-[a-z0-9-]+$/.test(expectedBranch)) throw new Error("Invalid branch identifier");
  await loadEventEnvironment();
  const connection = resolveEventDatabase(process.env);
  if (!connection) {
    console.log(JSON.stringify({ connected: false, reason: "Переменные подключения Neon недоступны локально", changedData: false }));
    process.exitCode = 2;
  } else {
    const sql = neon(connection.url);
    const [[row], tables, settings] = await sql.transaction([
      sql`SELECT current_setting('transaction_read_only') AS read_only, to_regclass('public.rentplace_event_state') IS NOT NULL AS state_ready, to_regclass('public.rentplace_event_images') IS NOT NULL AS images_ready, current_setting('neon.branch_id', true) AS branch_id, current_setting('neon.branch_name', true) AS branch_name`,
      sql`SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema NOT IN ('pg_catalog', 'information_schema') AND table_type = 'BASE TABLE' ORDER BY table_schema, table_name`,
      sql`SELECT name FROM pg_settings WHERE name LIKE 'neon.%' AND (name LIKE '%branch%' OR name LIKE '%endpoint%') ORDER BY name`,
    ], { readOnly: true, fetchOptions: { signal: AbortSignal.timeout(15_000) } });
    const schemaReady = row.state_ready && row.images_ready;
    if (schemaReady) {
      const [[state]] = await sql.transaction([sql`SELECT revision, jsonb_typeof(payload->'overrides') = 'object' AND jsonb_typeof(payload->'queue') = 'array' AS valid_state FROM rentplace_event_state WHERE id = 1`], { readOnly: true, fetchOptions: { signal: AbortSignal.timeout(15_000) } });
      if (!state?.valid_state || !Number.isInteger(state.revision)) throw new Error("Schema check failed");
    }
    const names = tables.map(table => `${table.table_schema}.${table.table_name}`);
    const branchIdMatches = expectedBranch ? row.branch_id === expectedBranch : null;
    console.log(JSON.stringify({ connected: true, connectionVariable: connection.variable, readOnly: row.read_only === "on", schemaReady, eventTables: { state: row.state_ready, images: row.images_ready }, branchVerification: expectedBranch ? (branchIdMatches ? "matches-owner-preview-id" : "branch-id-mismatch") : row.branch_name === "preview" ? "server-confirmed-preview" : row.branch_name ? "server-reports-other-branch" : "name-not-exposed-by-sql", previewBranchIdMatches: branchIdMatches, branchName: row.branch_name || null, branchIdAvailable: Boolean(row.branch_id), branchSettingNames: settings.map(setting => setting.name), tables: names, changedData: false }));
    if (expectedBranch && !branchIdMatches) process.exitCode = 4;
    else if (!schemaReady) process.exitCode = 3;
  }
} catch {
  console.error(JSON.stringify({ connected: false, reason: "Ошибка соединения или схемы; секреты скрыты", changedData: false }));
  process.exitCode = 1;
}
