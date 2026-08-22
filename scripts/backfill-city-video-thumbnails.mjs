import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";
import { downloadTikTokThumbnail } from "../lib/tiktokThumbnail.ts";
import { resolveTikTokEmbedUrl } from "../lib/tiktokThumbnail.ts";
import { createCityVideoSlug, getCityVideoEmbedUrl } from "../lib/cityVideoTypes.ts";
import {
  backfillTikTokThumbnailRecord,
  needsTikTokThumbnailBackfill,
} from "../lib/cityVideoThumbnailBackfill.ts";
import { migrateCityVideos } from "./migrate-city-videos.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const storedUrl = (id) => `/api/video-thumbnails/${encodeURIComponent(id)}/${crypto.randomUUID().slice(0, 12)}`;

try {
  const localEnvironment = await readFile(path.join(root, ".env.local"), "utf8");
  for (const line of localEnvironment.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
} catch {
  // Deployment environments provide variables directly.
}

async function backfillDatabase(databaseUrl) {
  await migrateCityVideos();
  const sql = neon(databaseUrl);
  const allVideos = await sql`SELECT id, slug, platform, video_url, embed_url, thumbnail_url, title, published FROM city_videos`;
  let seoFailed = 0;
  for (const video of allVideos) {
    const title = typeof video.title === "string" ? JSON.parse(video.title) : video.title;
    const slug = video.slug || createCityVideoSlug(title.ru || title.en || "video", video.id);
    let embedUrl = video.embed_url || getCityVideoEmbedUrl({
      platform: video.platform,
      videoUrl: video.video_url,
      embedUrl: null,
    });
    if (!embedUrl && video.platform === "tiktok") {
      try {
        embedUrl = await resolveTikTokEmbedUrl(video.video_url);
      } catch {
        seoFailed += 1;
      }
    }
    if (video.slug !== slug || video.embed_url !== embedUrl) {
      await sql`UPDATE city_videos SET slug = ${slug}, embed_url = ${embedUrl}, updated_at = updated_at WHERE id = ${video.id}`;
    }
    video.slug = slug;
    video.embed_url = embedUrl;
  }
  const videos = allVideos.filter((video) => video.platform === "tiktok");
  const candidates = videos.filter((video) => needsTikTokThumbnailBackfill(video.thumbnail_url));
  let restored = 0;
  let failed = 0;
  for (const video of candidates) {
    const result = await backfillTikTokThumbnailRecord({
      id: video.id,
      videoUrl: video.video_url,
      thumbnailUrl: video.thumbnail_url,
    }, {
      download: downloadTikTokThumbnail,
      createPermanentUrl: storedUrl,
      storeSuccess: async ({ image, permanentUrl }) => {
        const base64 = Buffer.from(image.bytes).toString("base64");
        await sql.transaction([
          sql`INSERT INTO city_video_thumbnails (video_id, content_type, image_data, size_bytes, updated_at)
            VALUES (${video.id}, ${image.contentType}, decode(${base64}, 'base64'), ${image.bytes.byteLength}, now())
            ON CONFLICT (video_id) DO UPDATE SET content_type = EXCLUDED.content_type, image_data = EXCLUDED.image_data,
              size_bytes = EXCLUDED.size_bytes, updated_at = now()`,
          sql`UPDATE city_videos SET thumbnail_url = ${permanentUrl}, thumbnail_status = 'stored',
            thumbnail_error = NULL, updated_at = now() WHERE id = ${video.id}`,
        ]);
      },
      storeFailure: async ({ message }) => {
        await sql`UPDATE city_videos SET thumbnail_status = 'failed', thumbnail_error = ${message},
          updated_at = now() WHERE id = ${video.id}`;
      },
    });
    if (result.status === "restored") restored += 1;
    if (result.status === "failed") failed += 1;
  }
  return {
    backend: "neon",
    records: allVideos.length,
    publishedPages: allVideos.filter((video) => video.published && video.embed_url).length,
    seoFailed,
    candidates: candidates.length,
    restored,
    failed,
  };
}

async function backfillLocalFile() {
  const dataPath = path.join(root, "data", "cityVideos.json");
  const videos = JSON.parse(await readFile(dataPath, "utf8"));
  let seoFailed = 0;
  for (const video of videos) {
    video.slug ||= createCityVideoSlug(video.title.ru || video.title.en || "video", video.id);
    video.embedUrl ||= getCityVideoEmbedUrl(video);
    if (!video.embedUrl && video.platform === "tiktok") {
      try {
        video.embedUrl = await resolveTikTokEmbedUrl(video.videoUrl);
      } catch {
        seoFailed += 1;
      }
    }
  }
  const candidates = videos.filter((video) => video.platform === "tiktok" && needsTikTokThumbnailBackfill(video.thumbnailUrl));
  const directory = path.join(root, "public", "video-thumbnails");
  let restored = 0;
  let failed = 0;
  for (const video of candidates) {
    const result = await backfillTikTokThumbnailRecord(video, {
      download: downloadTikTokThumbnail,
      createPermanentUrl: storedUrl,
      storeSuccess: async ({ image, permanentUrl }) => {
        await mkdir(directory, { recursive: true });
        await writeFile(path.join(directory, `${video.id}.${image.extension}`), image.bytes);
        video.thumbnailUrl = permanentUrl;
        video.thumbnailStatus = "stored";
        video.thumbnailError = null;
      },
      storeFailure: async ({ message }) => {
        video.thumbnailStatus = "failed";
        video.thumbnailError = message;
      },
    });
    if (result.status === "restored") restored += 1;
    if (result.status === "failed") failed += 1;
  }
  if (videos.length) await writeFile(dataPath, `${JSON.stringify(videos, null, 2)}\n`, "utf8");
  return {
    backend: "local-file",
    records: videos.length,
    publishedPages: videos.filter((video) => video.published && video.embedUrl).length,
    seoFailed,
    candidates: candidates.length,
    restored,
    failed,
  };
}

const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL;
const result = databaseUrl ? await backfillDatabase(databaseUrl) : await backfillLocalFile();
console.log(JSON.stringify(result));
