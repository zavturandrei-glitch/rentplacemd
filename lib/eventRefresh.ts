import "server-only";
import { readPermittedEventFeed } from "@/lib/eventFeed";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { guideEvents } from "@/lib/events";
import { eventSql, mutateEventState, readEventState } from "@/lib/eventStore";
import { resolveEventFeed } from "@/lib/eventSource";
import { addEventLog, mergeEvents, queueCandidates, validateEvent } from "@/lib/eventsWorkflow";
import { chisinauDate } from "@/lib/eventDates";

export function invalidateEvents() {
  revalidatePath("/events", "layout");
  revalidatePath("/sitemap.xml");
}


export async function refreshEvents(scheduled = false) {
  const sql = await eventSql();
  const token = randomUUID();
  const locked = await sql`UPDATE rentplace_event_state SET locked_until = now() + interval '2 minutes', lock_token = ${token} WHERE id = 1 AND (locked_until IS NULL OR locked_until < now()) RETURNING id`;
  if (!locked.length) return { skipped: true, reason: "Обновление уже выполняется" };
  try {
    const today = chisinauDate();
    if (scheduled) {
      const [row] = await sql`SELECT payload->>'lastScheduledDay' AS day FROM rentplace_event_state WHERE id = 1`;
      if ((row as { day?: string } | undefined)?.day === today) return { skipped: true, reason: "Сегодня уже проверено" };
    }
    const feed = resolveEventFeed((await readEventState()).state.source, process.env);
    const candidates = (await readPermittedEventFeed(feed)).map(item => validateEvent(item));
    const imageRows = await sql`SELECT id FROM rentplace_event_images`;
    const imageIds = new Set(imageRows.map(row => (row as { id: string }).id));
    const now = new Date().toISOString();
    const result = await mutateEventState(state => {
      const published = mergeEvents(guideEvents, state);
      const queued = queueCandidates(state, candidates, published, now);
      const archived = published.filter(event => (event.endDate ?? event.startDate) < today).length;
      const missingImages = published.filter(event => event.image && !imageIds.has(event.image.path.split("/").at(-1)!));
      if (missingImages.length) addEventLog(state, "error", `Не найдены изображения: ${missingImages.map(event => event.slug).join(", ")}. Карточки используют обложки категорий.`, now);
      state.lastCheckedAt = now;
      if (scheduled) state.lastScheduledDay = today;
      addEventLog(state, "info", `Проверка: ${queued} в очередь; ${archived} в архиве. ${feed.url ? "JSON-фид проверен; публикация после подтверждения." : "Ручной режим: внешний источник не подключён."}`, now);
      return { queued, archived, missingImages: missingImages.length, mode: feed.url ? "review-queue" : "manual-only", checkedAt: now };
    });
    invalidateEvents();
    return result;
  } catch {
    // Never persist fetch exceptions containing feed credentials or database URLs.
    await mutateEventState(state => addEventLog(state, "error", "Обновление не завершено. Проверьте соединение, формат и разрешение источника; данные сохранены."));
    throw new Error("Обновление не завершено. См. журнал админки");
  } finally {
    await sql`UPDATE rentplace_event_state SET locked_until = NULL, lock_token = NULL WHERE id = 1 AND lock_token = ${token}`;
  }
}
