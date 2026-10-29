import "server-only";
import { neon } from "@neondatabase/serverless";
import { cache } from "react";
import { resolveEventDatabase } from "@/lib/eventDatabase.mjs";
import { verifyEventPreviewBranch } from "@/lib/eventPreviewGuard.mjs";
import { guideEvents } from "@/lib/events";
import { emptyEventState, mergeEvents, type EventState } from "@/lib/eventsWorkflow";

export async function eventSql() {
  await verifyEventPreviewBranch(process.env);
  const connection = resolveEventDatabase(process.env);
  if (!connection) throw new Error("Настройте NEON_DATABASE_URL / NEON_POSTGRES_URL и выполните миграцию событий");
  return neon(connection.url);
}
export function eventStorageConfigured() {
  return Boolean(resolveEventDatabase(process.env));
}
export async function readEventState() {
  const sql = await eventSql();
  const [row] = await sql`SELECT payload, revision FROM rentplace_event_state WHERE id = 1`;
  if (!row) throw new Error("Выполните миграцию событий");
  const record = row as { payload: EventState; revision: number };
  return { state: record.payload, revision: Number(record.revision) };
}
export async function mutateEventState<T>(mutate: (state: EventState) => T): Promise<T> {
  const sql = await eventSql();
  for (let attempt = 0; attempt < 5; attempt++) {
    const { state, revision } = await readEventState();
    const result = mutate(state);
    const rows = await sql`UPDATE rentplace_event_state SET payload = ${JSON.stringify(state)}::jsonb, revision = revision + 1 WHERE id = 1 AND revision = ${revision} RETURNING revision`;
    if (rows.length) return result;
  }
  throw new Error("Конфликт изменений. Повторите запрос");
}
export const readEventInventory = cache(async () => {
  if (!eventStorageConfigured()) return [...guideEvents];
  // Fail visibly on an unavailable configured database; never silently lose published edits.
  return mergeEvents(guideEvents, (await readEventState()).state);
});
export async function readEventAdminSnapshot() {
  const connection = resolveEventDatabase(process.env);
  const storage = { variable: connection?.variable ?? null, cronConfigured: Boolean(process.env.CRON_SECRET && process.env.CRON_SECRET.length >= 32) };
  if (!connection) return { persistent: false, storage, state: emptyEventState(), events: [...guideEvents] };
  const { state } = await readEventState();
  return { persistent: true, storage, state, events: mergeEvents(guideEvents, state) };
}

export async function readEventDatabaseHealth() {
  const connection = resolveEventDatabase(process.env);
  if (!connection) return { configured: false, connected: false, schemaReady: false, changedData: false };
  const sql = await eventSql();
  const [[row]] = await sql.transaction([
    sql`SELECT current_setting('transaction_read_only') AS read_only, to_regclass('public.rentplace_event_state') IS NOT NULL AS state_ready, to_regclass('public.rentplace_event_images') IS NOT NULL AS images_ready`,
  ], { readOnly: true, fetchOptions: { signal: AbortSignal.timeout(15_000) } });
  const result = row as { read_only: string; state_ready: boolean; images_ready: boolean };
  let schemaReady = result.state_ready && result.images_ready;
  if (schemaReady) {
    const [[state]] = await sql.transaction([
      sql`SELECT revision, jsonb_typeof(payload->'overrides') = 'object' AND jsonb_typeof(payload->'queue') = 'array' AS valid_state FROM rentplace_event_state WHERE id = 1`,
    ], { readOnly: true, fetchOptions: { signal: AbortSignal.timeout(15_000) } });
    schemaReady = Boolean(state?.valid_state && Number.isInteger(state.revision));
  }
  return { configured: true, connected: true, schemaReady, readOnly: result.read_only === "on", connectionVariable: connection.variable, previewBranch: await verifyEventPreviewBranch(process.env), changedData: false };
}
