import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolveEventDatabase } from "../lib/eventDatabase.mjs";

export async function loadEventEnvironment() {
  for (const name of [".env.local", ".env"]) {
    try {
      const text = await readFile(new URL(`../${name}`, import.meta.url), "utf8");
      for (const line of text.split(/\r?\n/)) {
        const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
        if (match && process.env[match[1]] === undefined) process.env[match[1]] = match[2].trim().replace(/^(['"])(.*)\1$/, "$2");
      }
    } catch { /* Platform environment is sufficient. */ }
  }
}

export async function eventMigrationPlan() {
  const source = await readFile(new URL("../migrations/20261029_events.sql", import.meta.url), "utf8");
  const statements = source.replace(/^\s*--.*$/gm, "").split(/;\s*(?:\r?\n|$)/).map(text => text.trim()).filter(Boolean);
  if (statements.length !== 3 || statements.some(text => !/^CREATE TABLE IF NOT EXISTS rentplace_event_(state|images)\s*\(/.test(text) && !/^INSERT INTO rentplace_event_state \(id\) VALUES \(1\) ON CONFLICT DO NOTHING$/.test(text))) throw new Error("Неожиданный план миграции; требуется ручная проверка");
  return { statements, checksum: createHash("sha256").update(source).digest("hex") };
}

export function assertMigrationApproval(args, env) {
  if (!args.includes("--apply")) return false;
  const target = args.find(value => value.startsWith("--target="))?.split("=")[1];
  if (!["local", "preview", "production"].includes(target)) throw new Error("Укажите --target=local или --target=preview; Production требует подтверждения");
  if (env.VERCEL_ENV === "production" && target !== "production") throw new Error("Окружение Production не соответствует выбранной цели");
  if (target === "production" && !args.includes("--confirm-production=rentplacemd-db")) throw new Error("Production-миграция не подтверждена");
  return true;
}
export { resolveEventDatabase };
