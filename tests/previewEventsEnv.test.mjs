import assert from "node:assert/strict";
import test from "node:test";
import { parseEnv } from "node:util";
import { readFile } from "node:fs/promises";
import { preparePreviewEnvironment, isolatedPreviewProcess, clearedDatabaseKeys } from "../scripts/preview-events-env.mjs";

const pooled = "postgresql://fixture:fixture@ep-preview-pooler.eu.neon.tech/neondb?sslmode=require";
const direct = pooled.replace("-pooler", "");
const raw = `NEON_DATABASE_URL=${JSON.stringify(pooled)}\nNEON_DATABASE_URL_UNPOOLED=${JSON.stringify(direct)}\n`;
test("Preview env keeps only required connections, never unrelated secrets", () => {
  const result = preparePreviewEnvironment(raw + 'CRON_SECRET="test-secret-not-to-copy"\nDATABASE_URL="unrelated-existing-db"\nADMIN_PASSWORD="test-password-not-to-copy"\n');
  assert.equal(parseEnv(result.text).NEON_DATABASE_URL, pooled);
  assert.doesNotMatch(result.text, /test-secret-not-to-copy|unrelated-existing-db|test-password-not-to-copy/);
  assert.doesNotMatch(JSON.stringify(result.metadata), /postgresql|fixture:/);
  assert.equal(result.metadata.branchIsolation, "requires-owner-verification");
});
test("non-pooled migration target must match the runtime endpoint", () => {
  assert.throws(() => preparePreviewEnvironment(raw.replace(direct, direct.replace("ep-preview", "ep-other"))));
  assert.throws(() => preparePreviewEnvironment(raw + `EVENTS_DATABASE_URL=${JSON.stringify(pooled.replace("ep-preview", "ep-production"))}\n`));
});
test("production markers, unrelated variables and malformed URLs fail closed", () => {
  assert.throws(() => preparePreviewEnvironment("NEON_DATABASE_URL=\"[SENSITIVE]\""), /Sensitive/);
  assert.throws(() => preparePreviewEnvironment(raw + "VERCEL_ENV=production\n"));
  assert.throws(() => preparePreviewEnvironment("DATABASE_URL=" + JSON.stringify(pooled)));
  assert.throws(() => preparePreviewEnvironment("NEON_DATABASE_URL=invalid"));
});
test("old process connections cannot override a prepared Preview file", () => {
  const prepared = preparePreviewEnvironment(raw);
  const inherited = Object.fromEntries(clearedDatabaseKeys.map(key => [key, "old-production-value"]));
  const env = isolatedPreviewProcess(prepared.values, inherited);
  assert.equal(env.NEON_DATABASE_URL, pooled);
  assert.equal(env.DATABASE_URL, "");
  assert.equal(env.EVENTS_DATABASE_URL, "");
  assert.equal(env.EVENTS_ALLOW_SHARED_DATABASE, "false");
  assert.equal(inherited.DATABASE_URL, "old-production-value");
});
test("deployment ignore excludes Preview secret files and CLI identity", async () => {
  const text = await readFile(new URL("../.vercelignore", import.meta.url), "utf8");
  assert.match(text, /^\.env\*$/m);
  assert.match(text, /^\.vercel\/$/m);
});
