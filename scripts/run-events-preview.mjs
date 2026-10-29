import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { preparePreviewEnvironment, isolatedPreviewProcess } from "./preview-events-env.mjs";

const commands = {
  check: ["scripts/check-events-db.mjs"],
  plan: ["scripts/migrate-events.mjs"],
  build: ["node_modules/next/dist/bin/next", "build"],
  serve: ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", "3001"],
};
try {
  const args = commands[process.argv[2]] ? [...commands[process.argv[2]]] : null;
  const expectedBranch = process.argv[3];
  if (!args || (process.argv.length !== 3 && !(process.argv.length === 4 && process.argv[2] === "check" && /^--expected-branch-id=br-[a-z0-9-]+$/.test(expectedBranch)))) throw new Error("Только check, plan, build или serve; применение миграций здесь отсутствует");
  if (expectedBranch) args.push(expectedBranch);
  const prepared = preparePreviewEnvironment(await readFile(".env.events.preview.local", "utf8"));
  if (process.argv[2] === "serve") console.log("Локальный календарь: http://127.0.0.1:3001/events (до остановки команды).");
  const result = spawnSync(process.execPath, args, { env: isolatedPreviewProcess(prepared.values), windowsHide: true, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  if (result.error) throw new Error("Preview-процесс не завершён; частичный вывод скрыт");
  // Redact all fetched values before exposing CLI/build output, including failures.
  const secrets = Object.values(prepared.values).filter(value => value.startsWith("postgres"));
  let output = String(result.stdout ?? "") + String(result.stderr ?? "");
  for (const secret of secrets) {
    const url = new URL(secret);
    for (const value of [secret, url.password, decodeURIComponent(url.password)].filter(Boolean)) output = output.split(value).join("[redacted]");
  }
  process.stdout.write(output);
  process.exitCode = result.status ?? 1;
} catch {
  console.error("Preview-проверка не запущена: нет корректного локального Preview-файла или режима. Секреты скрыты.");
  process.exitCode = 2;
}
