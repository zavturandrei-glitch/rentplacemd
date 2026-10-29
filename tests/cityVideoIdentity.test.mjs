import test from "node:test";
import assert from "node:assert/strict";
import { getCityVideoIdentity } from "../lib/cityVideoIdentity.ts";

const localized = text => Object.fromEntries(["ru", "ro", "en", "uk", "cs"].map(language => [language, text]));
const video = (id, url, title = "Ready Fest Chisinau 2026") => ({ id, slug: `ready-fest-${id}`, title: localized(title), videoUrl: url, embedUrl: url, platform: "tiktok", createdAt: "2026-09-13T12:00:00Z" });
test("distinct clips of the same event get useful unique localized titles", () => {
  const videos = [video("a", "https://www.tiktok.com/player/v1/111"), video("b", "https://www.tiktok.com/player/v1/222"), video("c", "https://www.tiktok.com/player/v1/333")];
  for (const language of ["ru", "ro", "en", "uk", "cs"]) {
    const identities = videos.map(item => getCityVideoIdentity(item, language, videos));
    assert.equal(new Set(identities.map(item => item.title)).size, 3);
    assert.equal(new Set(identities.map(item => item.descriptionPrefix)).size, 3);
    assert.ok(identities.every(item => !item.duplicate));
  }
});
test("numbering survives source sorting and URL identity is retained", () => {
  const a = video("a", "https://www.tiktok.com/player/v1/111"), b = video("b", "https://www.tiktok.com/player/v1/222");
  assert.equal(getCityVideoIdentity(a, "en", [b, a]).title, getCityVideoIdentity(a, "en", [a, b]).title);
  assert.equal(getCityVideoIdentity(b, "en", [b, a]).canonical.slug, b.slug);
});
test("the same clip with tracking parameters has one canonical without deleting URLs", () => {
  const a = video("a", "https://www.tiktok.com/player/v1/111"), b = video("b", "https://www.tiktok.com/player/v1/111?utm_source=copy");
  assert.equal(getCityVideoIdentity(b, "ru", [a, b]).duplicate, true);
  assert.equal(getCityVideoIdentity(b, "ru", [a, b]).canonical.slug, a.slug);
  assert.equal(b.slug, "ready-fest-b");
});
test("a single clip retains its established title", () => {
  const item = video("a", "https://www.tiktok.com/player/v1/111");
  assert.equal(getCityVideoIdentity(item, "ru", [item]).title, item.title.ru);
});
test("different YouTube watch IDs do not collapse into one canonical", () => {
  const a = { ...video("a", "https://www.youtube.com/watch?v=aaa"), platform: "youtube" };
  const b = { ...video("b", "https://www.youtube.com/watch?v=bbb"), platform: "youtube" };
  assert.equal(getCityVideoIdentity(b, "en", [a, b]).duplicate, false);
});
