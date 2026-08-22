import "server-only";

import { promises as fs } from "fs";
import path from "path";
import { revalidateTag, unstable_cache } from "next/cache";
import seedVideos from "@/data/cityVideos.json";
import {
  cityVideoPlatforms,
  cityVideoCategories,
  createCityVideoSlug,
  getCityVideoEmbedUrl,
  getStoredCityVideoThumbnailUrl,
  hasPermanentCityVideoThumbnail,
  isSafeOptionalUrl,
  isStoredCityVideoThumbnailUrl,
  isTikTokThumbnailUrl,
  isValidPlatformUrl,
  type CityVideo,
  type CityVideoInput,
  type CityVideoPlatform,
  type CityVideoCategory,
  type LocalizedVideoText,
} from "@/lib/cityVideoTypes";
import type { Language } from "@/locales/translations";
import {
  downloadTikTokThumbnail,
  downloadTikTokThumbnailUrl,
  resolveTikTokEmbedUrl,
  type StoredThumbnail,
} from "@/lib/cityVideoPreview";

type CityVideoRow = {
  id: string;
  slug: string | null;
  event_date: string | Date;
  platform: CityVideoPlatform;
  category: CityVideoCategory | null;
  source_name: string | null;
  video_url: string;
  embed_url: string | null;
  thumbnail_url: string | null;
  thumbnail_status: CityVideo["thumbnailStatus"] | null;
  thumbnail_error: string | null;
  title: LocalizedVideoText | string;
  description: LocalizedVideoText | string;
  related_url: string | null;
  featured: boolean;
  published: boolean;
  display_order: number;
  created_at: string | Date;
  updated_at: string | Date;
};

const languages = ["ru", "ro", "en", "uk", "cs"] as const satisfies readonly Language[];
const filePath = path.join(process.cwd(), "data", "cityVideos.json");
const localThumbnailDirectory = path.join(process.cwd(), "public", "video-thumbnails");
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const thumbnailExtensions = ["jpg", "png", "webp", "avif"] as const;

function getDatabaseUrl() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL || "";
}

async function getNeonSql() {
  const databaseUrl = getDatabaseUrl();
  if (!databaseUrl) return null;
  const { neon } = await import("@neondatabase/serverless");
  return neon(databaseUrl);
}

function normalizeText(value: unknown, field: string) {
  const input = (value ?? {}) as Partial<Record<Language, unknown>>;
  const result = Object.fromEntries(
    languages.map((language) => [language, String(input[language] ?? "").trim()]),
  ) as LocalizedVideoText;

  if (field === "title" && languages.some((language) => !result[language])) {
    throw new Error("Заполните название на всех пяти языках.");
  }

  return result;
}

function normalizeOptionalUrl(value: unknown) {
  const normalized = String(value ?? "").trim() || null;
  if (!isSafeOptionalUrl(normalized)) {
    throw new Error("Указана небезопасная ссылка.");
  }
  return normalized;
}

export function normalizeCityVideoInput(value: unknown): CityVideoInput {
  const input = (value ?? {}) as Partial<CityVideoInput>;
  const platform = String(input.platform ?? "") as CityVideoPlatform;
  const videoUrl = String(input.videoUrl ?? "").trim();
  const date = String(input.date ?? "").trim();
  const category = String(input.category ?? "") as CityVideoCategory;
  const sourceName = String(input.sourceName ?? "").trim();

  if (!cityVideoPlatforms.includes(platform)) {
    throw new Error("Выберите поддерживаемую платформу.");
  }
  if (!datePattern.test(date)) {
    throw new Error("Дата должна быть в формате YYYY-MM-DD.");
  }
  if (!cityVideoCategories.includes(category)) {
    throw new Error("Выберите категорию видео.");
  }
  if (!sourceName || sourceName.length > 100) {
    throw new Error("Укажите источник видео (до 100 символов).");
  }
  if (!isValidPlatformUrl(platform, videoUrl)) {
    throw new Error("Ссылка не соответствует выбранной платформе.");
  }

  const order = Number(input.displayOrder);

  return {
    date,
    platform,
    category,
    sourceName,
    videoUrl,
    thumbnailUrl: normalizeOptionalUrl(input.thumbnailUrl),
    title: normalizeText(input.title, "title"),
    description: normalizeText(input.description, "description"),
    relatedUrl: normalizeOptionalUrl(input.relatedUrl),
    featured: Boolean(input.featured),
    published: Boolean(input.published),
    displayOrder: Number.isFinite(order) ? Math.trunc(order) : 100,
  };
}

function parseJsonText(value: LocalizedVideoText | string) {
  return normalizeText(typeof value === "string" ? JSON.parse(value) : value, "description");
}

function normalizeDate(value: string | Date) {
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value).slice(0, 10);
}

function normalizeTimestamp(value: string | Date) {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function videoFromRow(row: CityVideoRow): CityVideo {
  const thumbnailStatus = row.thumbnail_status
    ?? (row.platform !== "tiktok"
      ? "not_required"
      : row.thumbnail_url && !isTikTokThumbnailUrl(row.thumbnail_url)
        ? isStoredCityVideoThumbnailUrl(row.thumbnail_url) ? "stored" : "manual"
        : "failed");
  return {
    id: row.id,
    slug: row.slug?.trim() || createCityVideoSlug(
      parseJsonText(row.title).ru || parseJsonText(row.title).en,
      row.id,
    ),
    date: normalizeDate(row.event_date),
    platform: row.platform,
    category: cityVideoCategories.includes(row.category as CityVideoCategory) ? row.category as CityVideoCategory : "city",
    sourceName: row.source_name?.trim() || "RentPlaceMD",
    videoUrl: row.video_url,
    embedUrl: row.embed_url ?? getCityVideoEmbedUrl({
      platform: row.platform,
      videoUrl: row.video_url,
      embedUrl: null,
    }),
    thumbnailUrl: row.thumbnail_url,
    thumbnailStatus,
    thumbnailError: row.thumbnail_error,
    title: parseJsonText(row.title),
    description: parseJsonText(row.description),
    relatedUrl: row.related_url,
    featured: row.featured,
    published: row.published,
    displayOrder: row.display_order,
    createdAt: normalizeTimestamp(row.created_at),
    updatedAt: normalizeTimestamp(row.updated_at),
  };
}

function sortVideos(videos: CityVideo[]) {
  return [...videos].sort((left, right) =>
    left.displayOrder - right.displayOrder ||
    right.date.localeCompare(left.date) ||
    right.createdAt.localeCompare(left.createdAt),
  );
}

async function readFromNeon() {
  const sql = await getNeonSql();
  if (!sql) return null;

  const rows = await sql`SELECT id, slug, event_date, platform, category, source_name, video_url, embed_url, thumbnail_url,
    thumbnail_status, thumbnail_error, title, description, related_url, featured, published, display_order,
    created_at, updated_at
    FROM city_videos
    ORDER BY display_order ASC, event_date DESC, created_at DESC`;
  return sortVideos((rows as CityVideoRow[]).map(videoFromRow));
}

function normalizeStoredVideo(video: CityVideo): CityVideo {
  return {
    ...video,
    category: video.category || "city",
    sourceName: video.sourceName || "RentPlaceMD",
    slug: video.slug || createCityVideoSlug(video.title.ru || video.title.en, video.id),
    embedUrl: video.embedUrl ?? getCityVideoEmbedUrl({
      platform: video.platform,
      videoUrl: video.videoUrl,
      embedUrl: null,
    }),
    thumbnailStatus: video.thumbnailStatus
      ?? (video.platform !== "tiktok"
        ? "not_required"
        : video.thumbnailUrl && !isTikTokThumbnailUrl(video.thumbnailUrl)
          ? isStoredCityVideoThumbnailUrl(video.thumbnailUrl) ? "stored" : "manual"
          : "failed"),
    thumbnailError: video.thumbnailError ?? null,
  };
}

async function readLocalFile() {
  try {
    const content = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(content) as CityVideo[];
    return sortVideos(parsed.map(normalizeStoredVideo));
  } catch {
    return sortVideos((seedVideos as CityVideo[]).map(normalizeStoredVideo));
  }
}

async function writeLocalFile(videos: CityVideo[]) {
  await fs.writeFile(filePath, JSON.stringify(sortVideos(videos), null, 2) + "\n", "utf8");
}

export async function getCityVideoStorageStatus() {
  if (getDatabaseUrl()) {
    return { persistent: true, backend: "neon" as const };
  }
  if (process.env.NODE_ENV !== "production") {
    return { persistent: false, backend: "local-file" as const };
  }
  return { persistent: false, backend: "seed-only" as const };
}

export async function readCityVideos() {
  const databaseVideos = await readFromNeon();
  if (databaseVideos) return databaseVideos;
  if (process.env.NODE_ENV !== "production") return readLocalFile();
  return sortVideos((seedVideos as CityVideo[]).map(normalizeStoredVideo));
}

async function readPublishedCityVideosUncached() {
  return (await readCityVideos()).filter((video) =>
    video.published
      && Boolean(video.embedUrl)
      && (video.platform !== "tiktok" || hasPermanentCityVideoThumbnail(video)),
  );
}

const readPublishedCityVideosCached = unstable_cache(
  readPublishedCityVideosUncached,
  ["published-city-videos"],
  { revalidate: 300, tags: ["city-videos"] },
);

export async function readPublishedCityVideos() {
  return readPublishedCityVideosCached();
}

export async function readPublishedCityVideoBySlug(slug: string) {
  return (await readPublishedCityVideos()).find((video) => video.slug === slug) ?? null;
}

function invalidatePublishedVideos() {
  revalidateTag("city-videos", { expire: 0 });
}

type PreparedThumbnail = {
  input: CityVideoInput;
  image: StoredThumbnail | null;
  status: CityVideo["thumbnailStatus"];
  error: string | null;
};

function newThumbnailUrl(id: string) {
  return getStoredCityVideoThumbnailUrl(id, crypto.randomUUID().slice(0, 12));
}

async function resolveVideoEmbedUrl(
  input: CityVideoInput,
  image: StoredThumbnail | null,
  existing?: CityVideo,
) {
  if (existing && input.videoUrl === existing.videoUrl && existing.embedUrl) return existing.embedUrl;
  const derived = getCityVideoEmbedUrl({ platform: input.platform, videoUrl: input.videoUrl, embedUrl: null });
  if (derived) return derived;
  if (input.platform !== "tiktok") return null;
  if (image?.embedUrl) return image.embedUrl;
  try {
    return await resolveTikTokEmbedUrl(input.videoUrl);
  } catch {
    return null;
  }
}

async function prepareThumbnail(
  id: string,
  input: CityVideoInput,
  existing?: CityVideo,
): Promise<PreparedThumbnail> {
  if (input.platform !== "tiktok") {
    return {
      input: {
        ...input,
        thumbnailUrl: isStoredCityVideoThumbnailUrl(input.thumbnailUrl) ? null : input.thumbnailUrl,
      },
      image: null,
      status: "not_required",
      error: null,
    };
  }

  const hasManualThumbnail = Boolean(
    input.thumbnailUrl
      && !isStoredCityVideoThumbnailUrl(input.thumbnailUrl)
      && !isTikTokThumbnailUrl(input.thumbnailUrl),
  );
  if (hasManualThumbnail) {
    return { input, image: null, status: "manual", error: null };
  }

  const hasNewManualTikTokCdnThumbnail = Boolean(
    input.thumbnailUrl
      && isTikTokThumbnailUrl(input.thumbnailUrl)
      && (!existing || input.thumbnailUrl !== existing.thumbnailUrl),
  );
  if (hasNewManualTikTokCdnThumbnail) {
    try {
      const image = await downloadTikTokThumbnailUrl(input.thumbnailUrl!);
      return {
        input: { ...input, thumbnailUrl: newThumbnailUrl(id) },
        image,
        status: "stored",
        error: null,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Thumbnail не получен";
      return {
        input: { ...input, thumbnailUrl: null },
        image: null,
        status: "failed",
        error: message.slice(0, 500),
      };
    }
  }

  const canKeepStoredThumbnail = Boolean(
    existing
      && input.videoUrl === existing.videoUrl
      && input.thumbnailUrl === existing.thumbnailUrl
      && isStoredCityVideoThumbnailUrl(existing.thumbnailUrl),
  );
  if (canKeepStoredThumbnail) {
    return { input, image: null, status: "stored", error: null };
  }

  try {
    const image = await downloadTikTokThumbnail(input.videoUrl);
    return {
      input: { ...input, thumbnailUrl: newThumbnailUrl(id) },
      image,
      status: "stored",
      error: null,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Thumbnail не получен";
    return {
      input: { ...input, thumbnailUrl: null },
      image: null,
      status: "failed",
      error: message.slice(0, 500),
    };
  }
}

async function writeLocalThumbnail(id: string, image: StoredThumbnail) {
  await fs.mkdir(localThumbnailDirectory, { recursive: true });
  await fs.writeFile(path.join(localThumbnailDirectory, `${id}.${image.extension}`), image.bytes);
}

async function removeLocalThumbnail(id: string) {
  if (!/^[a-zA-Z0-9-]+$/.test(id)) return;
  await Promise.all(thumbnailExtensions.map(async (extension) => {
    try {
      await fs.unlink(path.join(localThumbnailDirectory, `${id}.${extension}`));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }));
}

function thumbnailInsertQuery(
  sql: NonNullable<Awaited<ReturnType<typeof getNeonSql>>>,
  id: string,
  image: StoredThumbnail,
) {
  const base64 = Buffer.from(image.bytes).toString("base64");
  return sql`INSERT INTO city_video_thumbnails (video_id, content_type, image_data, size_bytes, updated_at)
    VALUES (${id}, ${image.contentType}, decode(${base64}, 'base64'), ${image.bytes.byteLength}, now())
    ON CONFLICT (video_id) DO UPDATE SET
      content_type = EXCLUDED.content_type,
      image_data = EXCLUDED.image_data,
      size_bytes = EXCLUDED.size_bytes,
      updated_at = now()`;
}

async function runSqlTransaction<T = Record<string, unknown>>(
  sql: NonNullable<Awaited<ReturnType<typeof getNeonSql>>>,
  queries: unknown[],
) {
  return (sql as unknown as {
    transaction: (items: unknown[]) => Promise<T[][]>;
  }).transaction(queries);
}

export async function createCityVideo(value: unknown) {
  const id = crypto.randomUUID();
  const prepared = await prepareThumbnail(id, normalizeCityVideoInput(value));
  const input = prepared.input;
  const embedUrl = await resolveVideoEmbedUrl(input, prepared.image);
  const now = new Date().toISOString();
  const video: CityVideo = {
    ...input,
    id,
    slug: createCityVideoSlug(input.title.ru || input.title.en, id),
    embedUrl,
    thumbnailStatus: prepared.status,
    thumbnailError: prepared.error,
    createdAt: now,
    updatedAt: now,
  };
  const sql = await getNeonSql();

  if (sql) {
    const insertVideo = sql`INSERT INTO city_videos (
      id, slug, event_date, platform, category, source_name, video_url, embed_url, thumbnail_url, thumbnail_status,
      thumbnail_error, title, description, related_url, featured, published, display_order, created_at, updated_at
    ) VALUES (
      ${video.id}, ${video.slug}, ${video.date}::date, ${video.platform}, ${video.category}, ${video.sourceName}, ${video.videoUrl}, ${video.embedUrl},
      ${video.thumbnailUrl}, ${video.thumbnailStatus}, ${video.thumbnailError}, ${JSON.stringify(video.title)}::jsonb, ${JSON.stringify(video.description)}::jsonb,
      ${video.relatedUrl}, ${video.featured}, ${video.published}, ${video.displayOrder}, now(), now()
    )`;
    await runSqlTransaction(sql, prepared.image
      ? [insertVideo, thumbnailInsertQuery(sql, id, prepared.image)]
      : [insertVideo]);
    invalidatePublishedVideos();
    return video;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Постоянное хранилище видео не настроено. Добавьте DATABASE_URL от Neon PostgreSQL.");
  }

  const videos = await readLocalFile();
  if (prepared.image) await writeLocalThumbnail(id, prepared.image);
  await writeLocalFile([...videos, video]);
  invalidatePublishedVideos();
  return video;
}

export async function updateCityVideo(id: string, value: unknown) {
  const videos = await readCityVideos();
  const existing = videos.find((video) => video.id === id);
  if (!existing) throw new Error("Видео не найдено.");
  const prepared = await prepareThumbnail(id, normalizeCityVideoInput(value), existing);
  const input = prepared.input;
  const embedUrl = await resolveVideoEmbedUrl(input, prepared.image, existing);
  const sql = await getNeonSql();

  if (sql) {
    const updateVideo = sql`UPDATE city_videos SET
      event_date = ${input.date}::date,
      platform = ${input.platform},
      category = ${input.category},
      source_name = ${input.sourceName},
      video_url = ${input.videoUrl},
      embed_url = ${embedUrl},
      thumbnail_url = ${input.thumbnailUrl},
      thumbnail_status = ${prepared.status},
      thumbnail_error = ${prepared.error},
      title = ${JSON.stringify(input.title)}::jsonb,
      description = ${JSON.stringify(input.description)}::jsonb,
      related_url = ${input.relatedUrl},
      featured = ${input.featured},
      published = ${input.published},
      display_order = ${input.displayOrder},
      updated_at = now()
      WHERE id = ${id}
      RETURNING id, slug, event_date, platform, category, source_name, video_url, embed_url, thumbnail_url, thumbnail_status,
        thumbnail_error, title, description, related_url, featured, published, display_order, created_at, updated_at`;
    const removeStoredImage = prepared.status !== "stored"
      ? sql`DELETE FROM city_video_thumbnails WHERE video_id = ${id}`
      : null;
    const results = await runSqlTransaction<CityVideoRow>(sql, [
      updateVideo,
      ...(prepared.image ? [thumbnailInsertQuery(sql, id, prepared.image)] : []),
      ...(removeStoredImage ? [removeStoredImage] : []),
    ]);
    const rows = results[0];
    if (!rows[0]) throw new Error("Видео не найдено.");
    invalidatePublishedVideos();
    return videoFromRow(rows[0] as CityVideoRow);
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Постоянное хранилище видео не настроено. Добавьте DATABASE_URL от Neon PostgreSQL.");
  }

  if (prepared.status !== "stored" || prepared.image) await removeLocalThumbnail(id);
  if (prepared.image) await writeLocalThumbnail(id, prepared.image);
  const updated: CityVideo = {
    ...existing,
    ...input,
    embedUrl,
    thumbnailStatus: prepared.status,
    thumbnailError: prepared.error,
    updatedAt: new Date().toISOString(),
  };
  await writeLocalFile(videos.map((video) => video.id === id ? updated : video));
  invalidatePublishedVideos();
  return updated;
}

export async function deleteCityVideo(id: string) {
  const sql = await getNeonSql();
  if (sql) {
    await sql`DELETE FROM city_videos WHERE id = ${id}`;
    invalidatePublishedVideos();
    return;
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error("Постоянное хранилище видео не настроено. Добавьте DATABASE_URL от Neon PostgreSQL.");
  }
  const videos = await readLocalFile();
  await writeLocalFile(videos.filter((video) => video.id !== id));
  await removeLocalThumbnail(id);
  invalidatePublishedVideos();
}

export async function readStoredCityVideoThumbnail(id: string) {
  if (!/^[a-zA-Z0-9-]+$/.test(id)) return null;
  const sql = await getNeonSql();
  if (sql) {
    const rows = await sql`SELECT content_type, encode(image_data, 'base64') AS image_base64
      FROM city_video_thumbnails WHERE video_id = ${id}` as Array<{
        content_type: string;
        image_base64: string;
      }>;
    const row = rows[0];
    return row
      ? { contentType: row.content_type, bytes: Buffer.from(row.image_base64, "base64") }
      : null;
  }

  if (process.env.NODE_ENV === "production") return null;
  for (const extension of thumbnailExtensions) {
    try {
      const bytes = await fs.readFile(path.join(localThumbnailDirectory, `${id}.${extension}`));
      const contentType = extension === "jpg" ? "image/jpeg" : `image/${extension}`;
      return { contentType, bytes };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }
  return null;
}

async function saveFailedThumbnailState(video: CityVideo, message: string) {
  const sql = await getNeonSql();
  if (sql) {
    await runSqlTransaction(sql, [
      sql`UPDATE city_videos SET thumbnail_url = NULL, thumbnail_status = 'failed',
        thumbnail_error = ${message.slice(0, 500)}, updated_at = now() WHERE id = ${video.id}`,
      sql`DELETE FROM city_video_thumbnails WHERE video_id = ${video.id}`,
    ]);
  } else if (process.env.NODE_ENV !== "production") {
    const videos = await readLocalFile();
    await removeLocalThumbnail(video.id);
    await writeLocalFile(videos.map((item) => item.id === video.id ? {
      ...item,
      thumbnailUrl: null,
      thumbnailStatus: "failed" as const,
      thumbnailError: message.slice(0, 500),
      updatedAt: new Date().toISOString(),
    } : item));
  }
  invalidatePublishedVideos();
}

export async function retryCityVideoThumbnail(id: string) {
  const video = (await readCityVideos()).find((item) => item.id === id);
  if (!video) throw new Error("Видео не найдено.");
  if (video.platform !== "tiktok") throw new Error("Повторное получение доступно только для TikTok.");
  if (hasPermanentCityVideoThumbnail(video)) {
    if (video.embedUrl) return video;
    const embedUrl = await resolveTikTokEmbedUrl(video.videoUrl);
    const sql = await getNeonSql();
    if (sql) {
      const rows = await sql`UPDATE city_videos SET embed_url = ${embedUrl}, updated_at = now() WHERE id = ${id}
        RETURNING id, slug, event_date, platform, category, source_name, video_url, embed_url, thumbnail_url,
          thumbnail_status, thumbnail_error, title, description, related_url, featured, published, display_order,
          created_at, updated_at`;
      invalidatePublishedVideos();
      return videoFromRow(rows[0] as CityVideoRow);
    }
    if (process.env.NODE_ENV === "production") {
      throw new Error("Постоянное хранилище видео не настроено. Добавьте DATABASE_URL от Neon PostgreSQL.");
    }
    const videos = await readLocalFile();
    const updated = { ...video, embedUrl, updatedAt: new Date().toISOString() };
    await writeLocalFile(videos.map((item) => item.id === id ? updated : item));
    invalidatePublishedVideos();
    return updated;
  }

  let image: StoredThumbnail;
  try {
    image = await downloadTikTokThumbnail(video.videoUrl);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Thumbnail не получен";
    await saveFailedThumbnailState(video, message);
    throw new Error(message);
  }

  const thumbnailUrl = newThumbnailUrl(id);
  const embedUrl = image.embedUrl ?? video.embedUrl ?? await resolveVideoEmbedUrl({
    date: video.date,
    platform: video.platform,
    category: video.category,
    sourceName: video.sourceName,
    videoUrl: video.videoUrl,
    thumbnailUrl,
    title: video.title,
    description: video.description,
    relatedUrl: video.relatedUrl,
    featured: video.featured,
    published: video.published,
    displayOrder: video.displayOrder,
  }, image, video);
  const sql = await getNeonSql();
  if (sql) {
    const results = await runSqlTransaction<CityVideoRow>(sql, [
      sql`UPDATE city_videos SET thumbnail_url = ${thumbnailUrl}, thumbnail_status = 'stored',
        thumbnail_error = NULL, embed_url = ${embedUrl}, updated_at = now() WHERE id = ${id}
        RETURNING id, slug, event_date, platform, category, source_name, video_url, embed_url, thumbnail_url, thumbnail_status,
          thumbnail_error, title, description, related_url, featured, published, display_order, created_at, updated_at`,
      thumbnailInsertQuery(sql, id, image),
    ]);
    invalidatePublishedVideos();
    return videoFromRow(results[0][0] as CityVideoRow);
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Постоянное хранилище видео не настроено. Добавьте DATABASE_URL от Neon PostgreSQL.");
  }
  const videos = await readLocalFile();
  await removeLocalThumbnail(id);
  await writeLocalThumbnail(id, image);
  const updated: CityVideo = {
    ...video,
    thumbnailUrl,
    embedUrl,
    thumbnailStatus: "stored",
    thumbnailError: null,
    updatedAt: new Date().toISOString(),
  };
  await writeLocalFile(videos.map((item) => item.id === id ? updated : item));
  invalidatePublishedVideos();
  return updated;
}

export async function backfillCityVideoThumbnails() {
  const candidates = (await readCityVideos()).filter((video) =>
    video.platform === "tiktok" && !hasPermanentCityVideoThumbnail(video),
  );
  let restored = 0;
  let failed = 0;
  for (const video of candidates) {
    try {
      await retryCityVideoThumbnail(video.id);
      restored += 1;
    } catch {
      failed += 1;
    }
  }
  return { candidates: candidates.length, restored, failed };
}

export async function backfillCityVideoSeo() {
  const videos = await readCityVideos();
  const sql = await getNeonSql();
  let slugsUpdated = 0;
  let embedsUpdated = 0;
  let failed = 0;

  for (const video of videos) {
    let embedUrl = video.embedUrl;
    if (!embedUrl && video.platform === "tiktok") {
      try {
        embedUrl = await resolveTikTokEmbedUrl(video.videoUrl);
      } catch {
        failed += 1;
      }
    }
    const derivedEmbed = embedUrl ?? getCityVideoEmbedUrl(video);
    if (derivedEmbed && derivedEmbed !== video.embedUrl) embedsUpdated += 1;

    if (sql) {
      await sql`UPDATE city_videos SET slug = ${video.slug}, embed_url = ${derivedEmbed}, updated_at = updated_at
        WHERE id = ${video.id}`;
    } else if (process.env.NODE_ENV !== "production") {
      // Written once after the loop.
    }
    slugsUpdated += 1;
    video.embedUrl = derivedEmbed;
  }

  if (!sql && process.env.NODE_ENV !== "production" && videos.length) {
    await writeLocalFile(videos);
  }
  invalidatePublishedVideos();
  return {
    records: videos.length,
    publishedPages: videos.filter((video) => video.published && Boolean(video.embedUrl)).length,
    slugsUpdated,
    embedsUpdated,
    failed,
  };
}
