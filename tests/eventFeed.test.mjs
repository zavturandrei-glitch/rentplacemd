import assert from "node:assert/strict";
import test from "node:test";
import { readPermittedEventFeed } from "../lib/eventFeed.ts";

const config = { url: "https://events.example.com/feed", permissionConfirmed: true, allowedHosts: ["events.example.com"] };
test("no source configured means manual mode with zero requests", async () => {
  let calls = 0;
  assert.deepEqual(await readPermittedEventFeed({ allowedHosts: [] }, async () => { calls++; }), []);
  assert.equal(calls, 0);
});
test("permission and HTTPS host allowlist are required before any request", async () => {
  for (const override of [{ permissionConfirmed: false }, { allowedHosts: [] }, { url: "http://events.example.com/feed" }, { url: "https://localhost/feed", allowedHosts: ["localhost"] }, { url: "https://127.0.0.1/feed", allowedHosts: ["127.0.0.1"] }, { url: "https://name:secret@events.example.com/feed" }]) {
    let called = false;
    await assert.rejects(readPermittedEventFeed({ ...config, ...override }, async () => { called = true; }));
    assert.equal(called, false);
  }
});
test("a permitted JSON feed is fetched once with timeout and redirects disabled", async () => {
  let calls = 0;
  const result = await readPermittedEventFeed(config, async (_url, options) => {
    calls++; assert.equal(options.redirect, "error"); assert.equal(options.cache, "no-store"); assert.ok(options.signal);
    return Response.json([{ slug: "test-fixture" }]);
  });
  assert.equal(calls, 1); assert.deepEqual(result, [{ slug: "test-fixture" }]);
});
test("HTML scraping, invalid feeds and HTTP failures are rejected", async () => {
  for (const response of [new Response("<html/>", { headers: { "Content-Type": "text/html" } }), Response.json({ events: [] }), Response.json(Array.from({ length: 501 }, () => ({}))), new Response("", { status: 429 }), new Response("", { status: 500 }), new Response("{", { headers: { "Content-Type": "application/json" } })]) await assert.rejects(readPermittedEventFeed(config, async () => response));
});
test("oversized feeds and network timeout do not produce partial candidates", async () => {
  await assert.rejects(readPermittedEventFeed(config, async () => new Response("x".repeat(2_000_001), { headers: { "Content-Type": "application/json" } })));
  await assert.rejects(readPermittedEventFeed(config, async () => { throw new DOMException("timeout", "TimeoutError"); }));
});
