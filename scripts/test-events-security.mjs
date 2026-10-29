import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import { createServer } from "node:net";
import assert from "node:assert/strict";

const secret = randomBytes(32).toString("hex"), password = randomBytes(24).toString("hex");
const listener = createServer();
await new Promise(resolve => listener.listen(0, "127.0.0.1", resolve));
const port = listener.address().port;
await new Promise(resolve => listener.close(resolve));
const origin = `http://127.0.0.1:${port}`;
const env = { ...process.env, CRON_SECRET: secret, ADMIN_PASSWORD: password, ADMIN_SESSION_SECRET: randomBytes(32).toString("hex"), EVENTS_ALLOW_SHARED_DATABASE: "false" };
// This child never connects to a real database, even if .env.local later gains credentials.
for (const name of ["EVENTS_DATABASE_URL", "DATABASE_URL", "POSTGRES_URL", "NEON_DATABASE_URL", "NEON_POSTGRES_URL", "NEON_DATABASE_URL_UNPOOLED", "NEON_POSTGRES_URL_NON_POOLING"]) env[name] = "";
const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], { cwd: process.cwd(), env, stdio: "ignore", windowsHide: true });
let checks = 0;
let phase = "server-start", observedStatus;
const expectStatus = async (path, status, init) => { phase = `${init?.method ?? "GET"} ${path}: expected ${status}`; const response = await fetch(origin + path, init); observedStatus = response.status; assert.equal(response.status, status, path); checks++; return response; };
try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    try { await fetch(origin + "/api/admin/session"); ready = true; break; } catch { await new Promise(resolve => setTimeout(resolve, 100)); }
  }
  assert.ok(ready, "Isolated server did not start; build first");
  await expectStatus("/api/cron/events", 401);
  await expectStatus("/api/cron/events", 401, { headers: { Authorization: "Bearer invalid" } });
  // The correct token reaches the database gate and fails safely because this test has no DB.
  await expectStatus("/api/cron/events", 503, { headers: { Authorization: `Bearer ${secret}` } });
  await expectStatus("/api/admin/events", 401);
  await expectStatus("/api/admin/events/health", 401);
  await expectStatus("/api/admin/events", 401, { method: "POST", body: "{}" });
  await expectStatus("/api/admin/events/images", 401, { method: "POST" });
  const login = await expectStatus("/api/admin/session", 200, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
  const cookie = login.headers.get("set-cookie")?.split(";")[0];
  assert.ok(cookie); assert.match(login.headers.get("set-cookie"), /HttpOnly/i);
  const snapshot = await expectStatus("/api/admin/events", 200, { headers: { Cookie: cookie } });
  assert.equal((await snapshot.json()).persistent, false);
  const health = await expectStatus("/api/admin/events/health", 200, { headers: { Cookie: cookie } });
  assert.equal((await health.json()).connected, false);
  await expectStatus("/api/admin/events", 403, { method: "POST", headers: { Cookie: cookie, Origin: "https://untrusted.example", "Content-Type": "application/json" }, body: JSON.stringify({ action: "refresh" }) });
  await expectStatus("/api/admin/events", 400, { method: "POST", headers: { Cookie: cookie, Origin: origin, "Content-Type": "application/json" }, body: JSON.stringify({ action: "import", events: [{ invalid: true }] }) });
  await expectStatus("/api/admin/events/images", 403, { method: "POST", headers: { Cookie: cookie, Origin: "https://untrusted.example" } });
  console.log(`Security checks passed: ${checks}; isolated localhost server, ephemeral test credentials, no production data accessed.`);
} catch {
  console.error(JSON.stringify({ failedAt: phase, observedStatus, credentialsSuppressed: true, checksPassed: checks }));
  process.exitCode = 1;
} finally {
  child.kill();
  await new Promise(resolve => { if (child.exitCode !== null) resolve(); else { child.once("exit", resolve); setTimeout(resolve, 3000).unref(); } });
}
