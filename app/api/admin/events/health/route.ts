import { requireAdmin } from "@/lib/adminAuth";
import { readEventDatabaseHealth } from "@/lib/eventStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET() {
  if (!(await requireAdmin())) return Response.json({ error: "Требуется вход" }, { status: 401 });
  try { return Response.json(await readEventDatabaseHealth(), { headers: { "Cache-Control": "no-store" } }); }
  catch { return Response.json({ connected: false, error: "Не удалось проверить соединение. Значения секретов скрыты", changedData: false }, { status: 503 }); }
}
