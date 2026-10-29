import test from "node:test";
import assert from "node:assert/strict";
import { resolveEventDatabase } from "../lib/eventDatabase.mjs";
import { existingDatabaseUrl } from "../lib/existingDatabase.mjs";
import { eventMigrationPlan, assertMigrationApproval } from "../scripts/event-db-tools.mjs";

const dedicated = "postgresql://fixture:fixture@events.example.com/neondb?sslmode=require";
const shared = "postgresql://fixture:fixture@existing.example.com/other";
test("prefixed Neon takes priority without modifying the shared database", () => {
  const env = Object.freeze({ DATABASE_URL: shared, NEON_DATABASE_URL: dedicated });
  assert.deepEqual(resolveEventDatabase(env), { variable: "NEON_DATABASE_URL", url: dedicated });
  assert.equal(env.DATABASE_URL, shared);
});
test("new prefixed Neon never redirects booking or video storage", () => {
  for (const scope of ["availability", "videos"]) {
    assert.equal(existingDatabaseUrl({ NEON_DATABASE_URL: dedicated }, scope), "");
    assert.equal(existingDatabaseUrl({ NEON_DATABASE_URL: dedicated, DATABASE_URL: shared }, scope), shared);
    assert.equal(existingDatabaseUrl({ NEON_DATABASE_URL: dedicated, LEGACY_USE_NEON_DATABASE: "true" }, scope), dedicated);
  }
  assert.equal(existingDatabaseUrl({ CITY_VIDEOS_DATABASE_URL: dedicated, DATABASE_URL: shared }, "videos"), dedicated);
  assert.equal(existingDatabaseUrl({ AVAILABILITY_DATABASE_URL: dedicated, DATABASE_URL: shared }, "availability"), dedicated);
});
test("dedicated override and Neon connection variants are supported", () => {
  assert.equal(resolveEventDatabase({ EVENTS_DATABASE_URL: dedicated, NEON_DATABASE_URL: shared }).url, dedicated);
  for (const name of ["NEON_DATABASE_URL", "NEON_POSTGRES_URL", "NEON_DATABASE_URL_UNPOOLED", "NEON_POSTGRES_URL_NON_POOLING"]) assert.equal(resolveEventDatabase({ [name]: dedicated }).variable, name);
});
test("an unrelated shared DATABASE_URL is never implicitly selected", () => {
  assert.equal(resolveEventDatabase({ DATABASE_URL: shared }), null);
  assert.equal(resolveEventDatabase({ DATABASE_URL: shared, EVENTS_ALLOW_SHARED_DATABASE: "true" }).url, shared);
});
test("migration can prefer the non-pooled Neon connection", () => {
  assert.equal(resolveEventDatabase({ NEON_DATABASE_URL: shared, NEON_DATABASE_URL_UNPOOLED: dedicated }, { migration: true }).url, dedicated);
});
test("malformed connections fail closed without leaking a secret", () => {
  const secret = "DO-NOT-PRINT-SECRET";
  for (const value of [secret, `https://user:${secret}@example.com/db`]) assert.throws(() => resolveEventDatabase({ NEON_DATABASE_URL: value, DATABASE_URL: shared }), error => !error.message.includes(secret));
});
test("migration is a non-destructive three-statement plan", async () => {
  const plan = await eventMigrationPlan();
  assert.equal(plan.statements.length, 3);
  assert.match(plan.checksum, /^[a-f0-9]{64}$/);
  assert.doesNotMatch(plan.statements.join("\n"), /\b(DROP|DELETE|TRUNCATE|ALTER|UPDATE)\b/i);
  assert.match(plan.statements.join("\n"), /ON CONFLICT DO NOTHING/);
});
test("migration has no implicit apply and production requires confirmation", () => {
  assert.equal(assertMigrationApproval([], {}), false);
  assert.throws(() => assertMigrationApproval(["--apply"], {}));
  assert.throws(() => assertMigrationApproval(["--apply", "--target=production"], {}));
  assert.throws(() => assertMigrationApproval(["--apply", "--target=preview"], { VERCEL_ENV: "production" }));
  assert.equal(assertMigrationApproval(["--apply", "--target=preview"], {}), true);
});
