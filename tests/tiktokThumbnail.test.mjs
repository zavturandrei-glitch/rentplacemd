import assert from "node:assert/strict";
import test from "node:test";
import {
  downloadTikTokThumbnail,
  downloadTikTokThumbnailUrl,
  resolveTikTokEmbedUrl,
  TikTokThumbnailError,
} from "../lib/tiktokThumbnail.ts";
import {
  createCityVideoSlug,
  getCityVideoEmbedUrl,
  getCityVideoThumbnail,
} from "../lib/cityVideoTypes.ts";
import {
  backfillTikTokThumbnailRecord,
  needsTikTokThumbnailBackfill,
} from "../lib/cityVideoThumbnailBackfill.ts";

const videoUrl = "https://www.tiktok.com/@rentplace/video/1234567890";
const imageUrl = "https://p16-sign.tiktokcdn.com/example.jpeg?x-expires=1";
const noDelay = async () => {};

function jpegResponse(bytes = new Uint8Array([255, 216, 255, 217])) {
  return new Response(bytes, { headers: { "Content-Type": "image/jpeg" } });
}

test("downloads and returns a permanent-storage payload for a valid TikTok", async () => {
  const calls = [];
  const result = await downloadTikTokThumbnail(videoUrl, {
    sleep: noDelay,
    fetchImpl: async (url) => {
      calls.push(String(url));
      return calls.length === 1
        ? Response.json({ thumbnail_url: imageUrl, embed_product_id: "1234567890" })
        : jpegResponse();
    },
  });
  assert.equal(result.contentType, "image/jpeg");
  assert.equal(result.extension, "jpg");
  assert.equal(result.bytes.byteLength, 4);
  assert.equal(result.embedUrl, "https://www.tiktok.com/player/v1/1234567890");
  assert.equal(calls.length, 2);
});

test("a second TikTok is fetched independently", async () => {
  let calls = 0;
  const result = await downloadTikTokThumbnail(`${videoUrl}1`, {
    sleep: noDelay,
    fetchImpl: async () => (++calls % 2 ? Response.json({ thumbnail_url: imageUrl }) : jpegResponse()),
  });
  assert.equal(result.bytes.byteLength, 4);
  assert.equal(calls, 2);
});

test("keeps manual thumbnails, stored TikTok URLs and YouTube previews unchanged", () => {
  assert.equal(getCityVideoThumbnail({
    platform: "tiktok",
    videoUrl,
    thumbnailUrl: "https://images.example.com/manual.jpg",
  }), "https://images.example.com/manual.jpg");
  assert.equal(getCityVideoThumbnail({
    platform: "tiktok",
    videoUrl,
    thumbnailUrl: "/api/video-thumbnails/video-1",
  }), "/api/video-thumbnails/video-1");
  assert.equal(getCityVideoThumbnail({
    platform: "tiktok",
    videoUrl,
    thumbnailUrl: imageUrl,
  }), null);
  assert.equal(getCityVideoThumbnail({
    platform: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: null,
  }), "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg");
});

test("downloads a manually supplied TikTok CDN thumbnail without calling oEmbed", async () => {
  const calls = [];
  const result = await downloadTikTokThumbnailUrl(imageUrl, {
    sleep: noDelay,
    fetchImpl: async (url) => {
      calls.push(String(url));
      return jpegResponse();
    },
  });
  assert.deepEqual(calls, [imageUrl]);
  assert.equal(result.contentType, "image/jpeg");
});

test("resolves a TikTok player URL from official oEmbed", async () => {
  const embedUrl = await resolveTikTokEmbedUrl(videoUrl, {
    sleep: noDelay,
    fetchImpl: async () => Response.json({ embed_product_id: "1234567890" }),
  });
  assert.equal(embedUrl, "https://www.tiktok.com/player/v1/1234567890");
});

test("creates stable unique slugs and correct YouTube/TikTok player URLs", () => {
  const firstSlug = createCityVideoSlug("Кишинёв Summer Fest 2026", "abc-123");
  assert.equal(firstSlug, "kishinev-summer-fest-2026-abc123");
  assert.equal(createCityVideoSlug("Кишинёв Summer Fest 2026", "abc-123"), firstSlug);
  assert.notEqual(firstSlug, createCityVideoSlug("Кишинёв Summer Fest 2026", "def-456"));
  assert.equal(getCityVideoEmbedUrl({
    platform: "youtube",
    videoUrl: "https://youtu.be/dQw4w9WgXcQ",
    embedUrl: null,
  }), "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ");
  assert.equal(getCityVideoEmbedUrl({
    platform: "tiktok",
    videoUrl: "https://www.tiktok.com/@rentplace/video/1234567890",
    embedUrl: null,
  }), "https://www.tiktok.com/player/v1/1234567890");
});

test("retries the complete oEmbed/download flow up to three times", async () => {
  let calls = 0;
  const result = await downloadTikTokThumbnail(videoUrl, {
    sleep: noDelay,
    fetchImpl: async () => {
      calls += 1;
      if (calls === 1) return new Response(null, { status: 503 });
      if (calls === 2) return Response.json({});
      if (calls === 3) return Response.json({ thumbnail_url: imageUrl });
      return jpegResponse();
    },
  });
  assert.equal(result.bytes.byteLength, 4);
  assert.equal(calls, 4);
});

test("rejects non-images, CDN 403/404, oversized files and timeout after retries", async (t) => {
  const cases = [
    ["non-image", () => new Response("html", { headers: { "Content-Type": "text/html" } })],
    ["403", () => new Response(null, { status: 403 })],
    ["404", () => new Response(null, { status: 404 })],
    ["oversized", () => new Response(new Uint8Array(11), { headers: { "Content-Type": "image/jpeg" } })],
    ["timeout", () => { throw new DOMException("timed out", "TimeoutError"); }],
  ];
  for (const [name, imageFactory] of cases) {
    await t.test(name, async () => {
      let calls = 0;
      await assert.rejects(
        downloadTikTokThumbnail(videoUrl, {
          maxBytes: name === "oversized" ? 10 : 5_000_000,
          sleep: noDelay,
          fetchImpl: async () => {
            calls += 1;
            return calls % 2 ? Response.json({ thumbnail_url: imageUrl }) : imageFactory();
          },
        }),
        TikTokThumbnailError,
      );
      assert.equal(calls, 6);
    });
  }
});

const storedImage = {
  bytes: new Uint8Array([255, 216, 255, 217]),
  contentType: "image/jpeg",
  extension: "jpg",
};

function backfillHarness(thumbnailUrl, download) {
  const state = {
    id: "video-backfill-1",
    videoUrl,
    thumbnailUrl,
    thumbnailStatus: "failed",
    thumbnailError: "previous error",
  };
  let storedImages = 0;
  const dependencies = {
    download,
    createPermanentUrl: (id) => `/api/video-thumbnails/${id}/version-1`,
    storeSuccess: async ({ image, permanentUrl }) => {
      assert.equal(image.contentType, "image/jpeg");
      storedImages += 1;
      state.thumbnailUrl = permanentUrl;
      state.thumbnailStatus = "stored";
      state.thumbnailError = null;
    },
    storeFailure: async ({ message }) => {
      state.thumbnailStatus = "failed";
      state.thumbnailError = message;
    },
  };
  return { state, dependencies, storedImages: () => storedImages };
}

test("successful backfill replaces an old TikTok CDN URL only after storage succeeds", async () => {
  const oldUrl = imageUrl;
  const harness = backfillHarness(oldUrl, async () => storedImage);
  const result = await backfillTikTokThumbnailRecord(harness.state, harness.dependencies);
  assert.equal(result.status, "restored");
  assert.equal(harness.storedImages(), 1);
  assert.equal(harness.state.thumbnailUrl, "/api/video-thumbnails/video-backfill-1/version-1");
  assert.equal(harness.state.thumbnailStatus, "stored");
  assert.equal(harness.state.thumbnailError, null);
});

test("backfill preserves an old TikTok URL after oEmbed, download and timeout errors", async (t) => {
  for (const [name, error] of [
    ["oEmbed", new TikTokThumbnailError("TikTok oEmbed: HTTP 503")],
    ["download", new TikTokThumbnailError("TikTok CDN: HTTP 403")],
    ["timeout", new TikTokThumbnailError("Thumbnail не получен после 3 попыток: timeout")],
  ]) {
    await t.test(name, async () => {
      const oldUrl = `${imageUrl}&case=${name}`;
      const harness = backfillHarness(oldUrl, async () => { throw error; });
      const result = await backfillTikTokThumbnailRecord(harness.state, harness.dependencies);
      assert.equal(result.status, "failed");
      assert.equal(harness.state.thumbnailUrl, oldUrl);
      assert.equal(harness.state.thumbnailStatus, "failed");
      assert.match(harness.state.thumbnailError, new RegExp(name === "download" ? "CDN" : name, "i"));
      assert.equal(harness.storedImages(), 0);
    });
  }
});

test("a retry after failure safely replaces the preserved old URL", async () => {
  const oldUrl = imageUrl;
  let attempts = 0;
  const harness = backfillHarness(oldUrl, async () => {
    attempts += 1;
    if (attempts === 1) throw new TikTokThumbnailError("TikTok oEmbed: HTTP 503");
    return storedImage;
  });
  const failed = await backfillTikTokThumbnailRecord(harness.state, harness.dependencies);
  assert.equal(failed.status, "failed");
  assert.equal(harness.state.thumbnailUrl, oldUrl);
  const restored = await backfillTikTokThumbnailRecord(harness.state, harness.dependencies);
  assert.equal(restored.status, "restored");
  assert.equal(harness.state.thumbnailUrl, "/api/video-thumbnails/video-backfill-1/version-1");
  assert.equal(harness.state.thumbnailStatus, "stored");
});

test("an already migrated permanent thumbnail is skipped idempotently", async () => {
  const permanentUrl = "/api/video-thumbnails/video-backfill-1/version-1";
  let downloads = 0;
  const harness = backfillHarness(permanentUrl, async () => {
    downloads += 1;
    return storedImage;
  });
  const result = await backfillTikTokThumbnailRecord(harness.state, harness.dependencies);
  assert.equal(result.status, "skipped");
  assert.equal(downloads, 0);
  assert.equal(harness.storedImages(), 0);
  assert.equal(harness.state.thumbnailUrl, permanentUrl);
  assert.equal(needsTikTokThumbnailBackfill(permanentUrl), false);
});

test("a record without an old thumbnail remains null after failure", async () => {
  const harness = backfillHarness(null, async () => {
    throw new TikTokThumbnailError("TikTok oEmbed: HTTP 404");
  });
  const result = await backfillTikTokThumbnailRecord(harness.state, harness.dependencies);
  assert.equal(result.status, "failed");
  assert.equal(harness.state.thumbnailUrl, null);
  assert.equal(harness.state.thumbnailStatus, "failed");
  assert.match(harness.state.thumbnailError, /oEmbed/);
});

test("a storage transaction error also preserves the old thumbnail URL", async () => {
  const oldUrl = imageUrl;
  const harness = backfillHarness(oldUrl, async () => storedImage);
  harness.dependencies.storeSuccess = async () => {
    throw new Error("database transaction failed");
  };
  const result = await backfillTikTokThumbnailRecord(harness.state, harness.dependencies);
  assert.equal(result.status, "failed");
  assert.equal(harness.state.thumbnailUrl, oldUrl);
  assert.equal(harness.state.thumbnailStatus, "failed");
  assert.match(harness.state.thumbnailError, /transaction failed/);
});
