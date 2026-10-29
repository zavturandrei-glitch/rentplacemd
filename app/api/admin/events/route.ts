import { requireAdmin } from "@/lib/adminAuth";
import { readEventAdminSnapshot, mutateEventState, eventSql } from "@/lib/eventStore";
import { guideEvents } from "@/lib/events";
import { addEventLog, mergeEvents, sameOccurrence, validateEvent, queueCandidates, validateEventImport } from "@/lib/eventsWorkflow";
import { validateEventSource } from "@/lib/eventSource";
import { isEventAdminSameOrigin } from "@/lib/eventRequest";
import { invalidateEvents, refreshEvents } from "@/lib/eventRefresh";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await requireAdmin())) return Response.json({ error: "Требуется вход" }, { status: 401 });
  try { return Response.json(await readEventAdminSnapshot(), { headers: { "Cache-Control": "no-store" } }); }
  catch { return Response.json({ error: "База недоступна или миграция не выполнена" }, { status: 503 }); }
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) return Response.json({ error: "Требуется вход" }, { status: 401 });
  if (!isEventAdminSameOrigin(request)) return Response.json({ error: "Недопустимый источник запроса" }, { status: 403 });
  if (Number(request.headers.get("content-length") || 0) > 1_000_000) return Response.json({ error: "Слишком большой запрос" }, { status: 413 });
  try {
    if (!request.body) throw new Error("Пустой запрос");
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 1_000_000) { await reader.cancel(); return Response.json({ error: "Слишком большой запрос" }, { status: 413 }); }
      chunks.push(value);
    }
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (body.action === "refresh") return Response.json(await refreshEvents());
    if (body.action === "source.save") {
      const source = validateEventSource(body.source);
      await mutateEventState(state => { state.source = source; addEventLog(state, "info", source.enabled ? "Разрешённый источник подключён; публикация через подтверждение" : "Источник сохранён выключенным; ручной режим"); });
      return Response.json({ ok: true });
    }
    if (body.action === "import") {
      // Validate the complete batch before the first database mutation.
      const events = validateEventImport(body.events);
      const queued = await mutateEventState(state => {
        const count = queueCandidates(state, events, mergeEvents(guideEvents, state), new Date().toISOString());
        addEventLog(state, "info", `Ручной импорт: ${count} в очередь; ничего не опубликовано автоматически`);
        return count;
      });
      return Response.json({ ok: true, queued });
    }
    if (body.action === "save" || body.action === "approve") {
      const draft = body.action === "approve" ? (await readEventAdminSnapshot()).state.queue.find(item => item.fingerprint === body.fingerprint)?.event : body.event;
      if (draft?.image?.path) {
        const id = String(draft.image.path).split("/").at(-1);
        const sql = await eventSql();
        const images = await sql`SELECT id FROM rentplace_event_images WHERE id = ${id}`;
        if (!images.length) throw new Error("Загрузите изображение перед публикацией");
      }
    }
    await mutateEventState(state => {
      const inventory = mergeEvents(guideEvents, state);
      if (body.action === "save" || body.action === "approve") {
        const candidate = state.queue.find(item => item.fingerprint === body.fingerprint);
        if (body.action === "approve" && !candidate) throw new Error("Запись очереди не найдена");
        const event = validateEvent(body.action === "approve" ? candidate!.event : body.event);
        const duplicate = inventory.find(item => item.slug !== event.slug && sameOccurrence(item, event));
        if (duplicate) throw new Error(`Дубликат: ${duplicate.slug}`);
        // Slugs are immutable when editing; existing permanent URLs must keep working.
        if (body.originalSlug && body.originalSlug !== event.slug) throw new Error("Нельзя менять slug опубликованного события");
        if (body.action === "save" && !body.originalSlug && inventory.some(item => item.slug === event.slug)) throw new Error("Slug уже существует: откройте событие для редактирования");
        state.overrides[event.slug] = event;
        state.queue = state.queue.filter(item => item.fingerprint !== body.fingerprint);
        addEventLog(state, "info", `Опубликовано/обновлено: ${event.slug}`);
      } else if (body.action === "delete") {
        // Keep an indexed record with a cancellation notice; do not destroy SEO URLs.
        const event = inventory.find(item => item.slug === body.slug);
        if (!event) throw new Error("Событие не найдено");
        state.overrides[event.slug] = { ...event, status: "cancelled", verifiedAt: new Date().toISOString().slice(0, 10) };
        addEventLog(state, "info", `Отменено (URL сохранён): ${event.slug}`);
      } else if (body.action === "reject") {
        if (!state.queue.some(item => item.fingerprint === body.fingerprint)) throw new Error("Запись очереди не найдена");
        state.rejected = [...state.rejected, body.fingerprint].slice(-2000);
        state.queue = state.queue.filter(item => item.fingerprint !== body.fingerprint);
        addEventLog(state, "info", "Кандидат отклонён администратором");
      } else throw new Error("Неизвестное действие");
    });
    invalidateEvents();
    return Response.json({ ok: true });
  } catch (error) {
    // Validation errors contain no connection strings. Database errors are masked.
    const safe = error instanceof SyntaxError ? "Некорректный JSON" : error instanceof Error && !/postgres|neon|connection|fetch|password|sql/i.test(error.message) ? error.message : "База недоступна или миграция не выполнена";
    return Response.json({ error: safe }, { status: 400 });
  }
}
