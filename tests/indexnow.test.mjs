import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createPayload, submitUrls, key, keyLocation, endpoint } from "../scripts/submit-indexnow.mjs";

const url = "https://rentplace.md/apartment/albisoara-16-84";
function mockFetch(responses) {
  const calls = [];
  return { calls, fetchImpl: async (...args) => {
    calls.push(args);
    assert.ok(responses.length, "Unexpected request");
    const [body, status] = responses.shift();
    return new Response(body, { status });
  } };
}

test("IndexNow public key file contains only the exact key", async () => {
  assert.equal(await readFile(new URL(`../public/${key}.txt`, import.meta.url), "utf8"), key);
});

test("IndexNow only accepts explicit public URLs on the production origin and deduplicates", () => {
  assert.deepEqual(createPayload([url, url]).urlList, [url]);
  for (const invalid of ["https://example.com/x", "http://rentplace.md/x", "https://rentplace.md:123/x", "https://user@rentplace.md/x", `${url}#x`, "https://rentplace.md/admin/videos", "https://rentplace.md/api/test", "https://rentplace.md/%61dmin/videos"]) {
    assert.throws(() => createPayload([invalid]));
  }
  assert.throws(() => createPayload([]));
  assert.throws(() => createPayload(Array.from({ length: 10001 }, (_, i) => `https://rentplace.md/${i}`)));
});

test("IndexNow dry run performs no network requests", async () => {
  const result = await submitUrls([url], { dryRun: true, fetchImpl: () => assert.fail("Network used") });
  assert.equal(result.dryRun, true);
});

test("IndexNow refuses missing or incorrect production key before POST", async () => {
  for (const response of [["missing", 404], ["wrong key", 200]]) {
    const mock = mockFetch([response]);
    await assert.rejects(submitUrls([url], mock), /Key verification failed/);
    assert.equal(mock.calls.length, 1);
  }
});

test("IndexNow refuses unavailable pages before POST", async () => {
  const mock = mockFetch([[key, 200], ["", 500]]);
  await assert.rejects(submitUrls([url], mock), /Preflight failed/);
  assert.equal(mock.calls.length, 2);
});

test("IndexNow sends exactly the requested payload after preflight, distinguishes 200 and 202", async () => {
  for (const status of [200, 202]) {
    const mock = mockFetch([[key, 200], ["", 200], ["", status]]);
    assert.deepEqual(await submitUrls([url, url], mock), { status, count: 1 });
    assert.equal(mock.calls[0][0], keyLocation);
    assert.equal(mock.calls[2][0], endpoint);
    assert.equal(mock.calls[2][1].method, "POST");
    assert.deepEqual(JSON.parse(mock.calls[2][1].body), createPayload([url]));
    assert.ok(mock.calls.every(([, options]) => options.redirect === "error"));
  }
});

test("IndexNow removal mode accepts 404/410 but rejects a still-live page", async () => {
  for (const status of [404, 410]) {
    const mock = mockFetch([[key, 200], ["", status], ["", 200]]);
    assert.equal((await submitUrls([url], { ...mock, deleted: true })).status, 200);
  }
  await assert.rejects(submitUrls([url], { ...mockFetch([[key, 200], ["", 200]]), deleted: true }), /Preflight failed/);
});

test("IndexNow does not retry errors or report them as success", async () => {
  for (const status of [403, 422, 429, 500]) {
    const mock = mockFetch([[key, 200], ["", 200], ["", status]]);
    await assert.rejects(submitUrls([url], mock), new RegExp(`HTTP ${status}`));
    assert.equal(mock.calls.length, 3);
  }
});
