import { parseEnv } from "node:util";
import { resolveEventDatabase } from "../lib/eventDatabase.mjs";

export const previewConnectionKeys = ["EVENTS_DATABASE_URL", "EVENTS_MIGRATION_DATABASE_URL", "NEON_DATABASE_URL", "NEON_POSTGRES_URL", "NEON_DATABASE_URL_UNPOOLED", "NEON_POSTGRES_URL_NON_POOLING"];
export const clearedDatabaseKeys = [...previewConnectionKeys, "DATABASE_URL", "POSTGRES_URL", "AVAILABILITY_DATABASE_URL", "CITY_VIDEOS_DATABASE_URL"];

function targetIdentity(url) {
  const parsed = new URL(url);
  return `${parsed.hostname.replace(/-pooler(?=\.)/, "")}|${parsed.pathname}|${parsed.username}`;
}

/** Returns secret text to a file writer; never print this object. */
export function preparePreviewEnvironment(raw) {
  const parsed = parseEnv(raw);
  if (parsed.VERCEL_ENV && parsed.VERCEL_ENV !== "preview") throw new Error("Окружение не Preview");
  const values = Object.fromEntries(previewConnectionKeys.map(key => [key, parsed[key] || ""]));
  if (previewConnectionKeys.some(key => values[key] === "[SENSITIVE]")) throw new Error("Preview-подключения скрыты Vercel как Sensitive; CLI не передаёт их значения");
  values.EVENTS_ALLOW_SHARED_DATABASE = "false";
  values.LEGACY_USE_NEON_DATABASE = "false";
  values.VERCEL_ENV = "preview";
  const runtime = resolveEventDatabase(values);
  const migration = resolveEventDatabase(values, { migration: true });
  if (!runtime || !migration) throw new Error("Подключение событий не найдено в Preview-переменных");
  if (targetIdentity(runtime.url) !== targetIdentity(migration.url)) throw new Error("Runtime и миграция направлены в разные базы");
  const neonOnly = resolveEventDatabase(Object.fromEntries(Object.entries(values).filter(([key]) => key.startsWith("NEON_"))));
  if (neonOnly && targetIdentity(neonOnly.url) !== targetIdentity(runtime.url)) throw new Error("Явное переопределение не совпадает с Preview-подключением Neon");
  const text = "# Preview only; ignored by Git and deployment upload. Do not print.\n" + Object.entries(values).map(([key, value]) => `${key}=${JSON.stringify(value)}`).join("\n") + "\n";
  return { text, values, metadata: { environment: "preview", variables: previewConnectionKeys.filter(key => values[key]), runtimeVariable: runtime.variable, migrationVariable: migration.variable, branchIsolation: "requires-owner-verification" } };
}

export function isolatedPreviewProcess(values, inherited = process.env) {
  const env = { ...inherited };
  for (const key of clearedDatabaseKeys) env[key] = "";
  return { ...env, ...values, VERCEL_ENV: "preview", EVENTS_ALLOW_SHARED_DATABASE: "false", LEGACY_USE_NEON_DATABASE: "false" };
}
