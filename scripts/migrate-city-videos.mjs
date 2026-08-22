import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function loadLocalEnvironment() {
  try {
    const content = await readFile(path.join(root, ".env.local"), "utf8");
    for (const line of content.split(/\r?\n/)) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
    }
  } catch {
    // Environment variables may already be supplied by the deployment platform.
  }
}

export async function migrateCityVideos() {
  await loadLocalEnvironment();
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL не настроен; миграция БД не выполнена.");
  const migration = await readFile(path.join(root, "migrations", "001_city_videos.sql"), "utf8");
  const sql = neon(databaseUrl);
  for (const statement of migration.split(/;\s*(?:\r?\n|$)/).map((item) => item.trim()).filter(Boolean)) {
    await sql.query(statement);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await migrateCityVideos();
  console.log("Миграция city_videos выполнена.");
}
