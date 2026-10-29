import { neon } from "@neondatabase/serverless";
import { loadEventEnvironment, eventMigrationPlan, assertMigrationApproval, resolveEventDatabase } from "./event-db-tools.mjs";

try {
  await loadEventEnvironment();
  const { statements, checksum } = await eventMigrationPlan();
  const connection = resolveEventDatabase(process.env, { migration: true });
  console.log(JSON.stringify({ mode: "plan", statements: statements.length, checksum, connectionVariable: connection?.variable ?? null, configured: Boolean(connection), destructiveOperations: false }));
  if (assertMigrationApproval(process.argv.slice(2), process.env)) {
    if (!connection) throw new Error("Переменные NEON_* недоступны; миграция не выполнялась");
    const sql = neon(connection.url);
    await sql.transaction(statements.map(statement => sql.query(statement)), { fetchOptions: { signal: AbortSignal.timeout(20_000) } });
    console.log("Миграция событий выполнена; существующие записи сохранены.");
  } else console.log("Только план. Для отдельной Preview-базы: npm run db:migrate:events -- --apply --target=preview");
} catch {
  console.error("Миграция не выполнена. Проверьте NEON_*, цель и явное подтверждение применения. Подробности соединения скрыты.");
  process.exitCode = 1;
}
