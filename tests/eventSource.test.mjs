import test from "node:test";
import assert from "node:assert/strict";
import { validateEventSource, resolveEventFeed } from "../lib/eventSource.ts";

const source = { name: "Test-only provider", url: "https://provider.example/events.json", permissionUrl: "https://provider.example/terms", kind: "json", enabled: true, permissionConfirmed: true };
test("an official JSON source needs an explicit commercial permission", () => {
  assert.deepEqual(validateEventSource(source), source);
  for (const changes of [{ permissionConfirmed: false }, { permissionUrl: "" }, { kind: "rss" }, { kind: "ics" }]) assert.throws(() => validateEventSource({ ...source, ...changes }));
});
test("source drafts do not enable unimplemented RSS/ICS adapters", () => {
  for (const kind of ["rss", "ics"]) assert.equal(validateEventSource({ ...source, enabled: false, permissionConfirmed: false, kind }).enabled, false);
});
test("source configuration does not accept secrets or local addresses", () => {
  for (const url of ["https://provider.example/feed?token=secret", "https://user:password@provider.example/feed", "http://provider.example/feed", "https://localhost/feed", "https://127.0.0.1/feed"]) assert.throws(() => validateEventSource({ ...source, url }));
});
test("a disabled source overrides environment imports and makes zero fetches", () => {
  assert.equal(resolveEventFeed({ ...source, enabled: false }, { EVENTS_FEED_URL: "https://other.example/feed" }).url, undefined);
  assert.deepEqual(resolveEventFeed(source, {}), { url: source.url, permissionConfirmed: true, allowedHosts: ["provider.example"] });
});
