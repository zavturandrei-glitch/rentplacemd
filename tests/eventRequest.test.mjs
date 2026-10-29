import test from "node:test";
import assert from "node:assert/strict";
import { isEventAdminSameOrigin } from "../lib/eventRequest.ts";

test("same-origin comparison supports Next internal localhost rewriting", () => {
  const request = new Request("http://localhost:3000/api/admin/events", { headers: { Host: "127.0.0.1:3000", Origin: "http://127.0.0.1:3000" } });
  assert.equal(isEventAdminSameOrigin(request, false), true);
});
test("trusted Vercel HTTPS forwarding supports the production domain", () => {
  const request = new Request("http://internal.example/api/admin/events", { headers: { Host: "rentplace.md", Origin: "https://rentplace.md", "X-Forwarded-Proto": "https" } });
  assert.equal(isEventAdminSameOrigin(request, true), true);
  assert.equal(isEventAdminSameOrigin(request, false), false);
});
test("cross-site, absent, wrong-scheme and malformed origins remain forbidden", () => {
  for (const origin of ["https://evil.example", "http://rentplace.md", "null", "https://rentplace.md.evil.example", "https://rentplace.md/path"]) {
    const request = new Request("https://rentplace.md/api/admin/events", { headers: { Origin: origin } });
    assert.equal(isEventAdminSameOrigin(request, false), false);
  }
  assert.equal(isEventAdminSameOrigin(new Request("https://rentplace.md/api/admin/events"), false), false);
});
