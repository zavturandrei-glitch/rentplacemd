import "server-only";

import { promises as fs } from "fs";
import path from "path";
import seedVideos from "@/data/cityVideos.json";
import {
  cityVideoPlatforms,
  cityVideoCategories,
  isSafeOptionalUrl,
  isValidPlatformUrl,
  type CityVideo,
  type CityVideoInput,
  type CityVideoPlatform,
  type CityVideoCategory,
  type LocalizedVideoText,
} from "@/lib/cityVideoTypes";
import type { Language } from "@/locales/translations";
import { withAutomaticCityVideoThumbnail } from "@/lib/cityVideoPreview";

type CityVideoRow = {
  id: string;
  event_date: string | Date;
  platform: CityVideoPlatform;
  category: CityVideoCategory | null;
  source_name: string | null;
  video_url: string;
  thumbnail_url: string | null;
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
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function getDatabaseUrl() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL || "";
}

async function getNeonSql() {
  const databaseUrl = getDatabaseUrl();
  if (!databaseUrl) return null;
  const { neon } = await import("@neondatabase/serverless");
  return neon(databaseUrl);
}

async function ensureVideoTable() {
  const sql = await getNeonSql();
  if (!sql) return null;

  await sql`CREATE TABLE IF NOT EXISTS city_videos (
    id text PRIMARY KEY,
    event_date date NOT NULL,
    platform text NOT NULL,
    video_url text NOT NULL,
    thumbnail_url text,
    title jsonb NOT NULL,
    description jsonb NOT NULL,
    related_url text,
    featured boolean NOT NULL DEFAULT false,
    published boolean NOT NULL DEFAULT false,
    display_order integer NOT NULL DEFAULT 100,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
  )`;
  await sql`ALTER TABLE city_videos ADD COLUMN IF NOT EXISTS category text`;
  await sql`ALTER TABLE city_videos ADD COLUMN IF NOT EXISTS source_name text`;

  return sql;
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
  return {
    id: row.id,
    date: normalizeDate(row.event_date),
    platform: row.platform,
    category: cityVideoCategories.includes(row.category as CityVideoCategory) ? row.category as CityVideoCategory : "city",
    sourceName: row.source_name?.trim() || "RentPlaceMD",
    videoUrl: row.video_url,
    thumbnailUrl: row.thumbnail_url,
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
  const sql = await ensureVideoTable();
  if (!sql) return null;
  const rows = await sql`SELECT id, event_date, platform, category, source_name, video_url, thumbnail_url, title, description,
    related_url, featured, published, display_order, created_at, updated_at
    FROM city_videos
    ORDER BY display_order ASC, event_date DESC, created_at DESC`;
  return sortVideos((rows as CityVideoRow[]).map(videoFromRow));
}

async function readLocalFile() {
  try {
    const content = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(content) as CityVideo[];
    return sortVideos(parsed.map((video) => ({
      ...video,
      category: video.category || "city",
      sourceName: video.sourceName || "RentPlaceMD",
    })));
  } catch {
    return sortVideos(seedVideos as CityVideo[]);
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
  return sortVideos(seedVideos as CityVideo[]);
}

export async function readPublishedCityVideos() {
  return (await readCityVideos()).filter((video) => video.published);
}

export async function createCityVideo(value: unknown) {
  const input = await withAutomaticCityVideoThumbnail(normalizeCityVideoInput(value));
  const now = new Date().toISOString();
  const video: CityVideo = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  const sql = await ensureVideoTable();

  if (sql) {
    await sql`INSERT INTO city_videos (
      id, event_date, platform, category, source_name, video_url, thumbnail_url, title, description,
      related_url, featured, published, display_order, created_at, updated_at
    ) VALUES (
      ${video.id}, ${video.date}::date, ${video.platform}, ${video.category}, ${video.sourceName}, ${video.videoUrl}, ${video.thumbnailUrl},
      ${JSON.stringify(video.title)}::jsonb, ${JSON.stringify(video.description)}::jsonb,
      ${video.relatedUrl}, ${video.featured}, ${video.published}, ${video.displayOrder}, now(), now()
    )`;
    return video;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Постоянное хранилище видео не настроено. Добавьте DATABASE_URL от Neon PostgreSQL.");
  }

  const videos = await readLocalFile();
  await writeLocalFile([...videos, video]);
  return video;
}

export async function updateCityVideo(id: string, value: unknown) {
  const input = await withAutomaticCityVideoThumbnail(normalizeCityVideoInput(value));
  const sql = await ensureVideoTable();

  if (sql) {
    const rows = await sql`UPDATE city_videos SET
      event_date = ${input.date}::date,
      platform = ${input.platform},
      category = ${input.category},
      source_name = ${input.sourceName},
      video_url = ${input.videoUrl},
      thumbnail_url = ${input.thumbnailUrl},
      title = ${JSON.stringify(input.title)}::jsonb,
      description = ${JSON.stringify(input.description)}::jsonb,
      related_url = ${input.relatedUrl},
      featured = ${input.featured},
      published = ${input.published},
      display_order = ${input.displayOrder},
      updated_at = now()
      WHERE id = ${id}
      RETURNING id, event_date, platform, category, source_name, video_url, thumbnail_url, title, description,
        related_url, featured, published, display_order, created_at, updated_at`;
    if (!rows[0]) throw new Error("Видео не найдено.");
    return videoFromRow(rows[0] as CityVideoRow);
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Постоянное хранилище видео не настроено. Добавьте DATABASE_URL от Neon PostgreSQL.");
  }

  const videos = await readLocalFile();
  const existing = videos.find((video) => video.id === id);
  if (!existing) throw new Error("Видео не найдено.");
  const updated = { ...existing, ...input, updatedAt: new Date().toISOString() };
  await writeLocalFile(videos.map((video) => video.id === id ? updated : video));
  return updated;
}

export async function deleteCityVideo(id: string) {
  const sql = await ensureVideoTable();
  if (sql) {
    await sql`DELETE FROM city_videos WHERE id = ${id}`;
    return;
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error("Постоянное хранилище видео не настроено. Добавьте DATABASE_URL от Neon PostgreSQL.");
  }
  const videos = await readLocalFile();
  await writeLocalFile(videos.filter((video) => video.id !== id));
}
