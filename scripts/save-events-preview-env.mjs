import { readFile, writeFile } from "node:fs/promises";
import { preparePreviewEnvironment } from "./preview-events-env.mjs";
import { parseEnv } from "node:util";

let availableVariables = [];
let stage = "read";
let connectionFormats = [];

try {
  const input = process.argv[2];
  if (!/^\.env\.events\.preview\.pending\.[a-f0-9]+$/.test(input ?? "")) throw new Error("Некорректный временный файл");
  const raw = await readFile(input, "utf8");
  const parsed = parseEnv(raw);
  availableVariables = Object.keys(parsed).filter(key => /NEON|DATABASE|POSTGRES|^EVENTS_/.test(key) && /^[A-Z0-9_]+$/.test(key));
  connectionFormats = availableVariables.filter(key => /DATABASE_URL|POSTGRES_URL$|NON_POOLING/.test(key)).map(key => ({ variable: key, present: Boolean(parsed[key]), postgresFormat: /^postgres(?:ql)?:\/\//.test(parsed[key]), sensitivePlaceholder: parsed[key] === "[SENSITIVE]" }));
  stage = "validate";
  const prepared = preparePreviewEnvironment(raw);
  // The PowerShell wrapper pre-creates this file with an owner-only ACL.
  stage = "save";
  await writeFile(".env.events.preview.local", prepared.text, { flag: "r+" });
  console.log(JSON.stringify(prepared.metadata));
} catch (error) {
  const allowed = ["Preview-подключения скрыты Vercel как Sensitive; CLI не передаёт их значения", "Подключение событий не найдено в Preview-переменных", "Runtime и миграция направлены в разные базы", "Явное переопределение не совпадает с Preview-подключением Neon", "Окружение не Preview"];
  const reason = allowed.includes(error?.message) ? error.message : "Ошибка формата подключения или файла; значения скрыты";
  console.error(JSON.stringify({ prepared: false, stage, availableVariables, connectionFormats, reason, code: ["EACCES", "EPERM", "ENOENT", "EINVAL"].includes(error?.code) ? error.code : undefined }));
  process.exitCode = 1;
}
