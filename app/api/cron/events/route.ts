import { validCronAuthorization } from "@/lib/eventCronAuth";
import { refreshEvents } from "@/lib/eventRefresh";
import { isCronLocalHour } from "@/lib/eventDates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || secret.length < 32) return Response.json({ error: "Планировщик не настроен" }, { status: 503 });
  if (!validCronAuthorization(request.headers.get("authorization"), secret)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!isCronLocalHour(new Date(), process.env.EVENTS_CRON_LOCAL_HOUR)) return Response.json({ skipped: true, reason: "Вне настроенного местного часа" });
  try { return Response.json(await refreshEvents(true), { headers: { "Cache-Control": "no-store" } }); }
  catch { return Response.json({ error: "Проверка не завершена; см. журнал" }, { status: 503 }); }
}
