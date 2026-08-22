import { requireAdmin } from "@/lib/adminAuth";
import { retryCityVideoThumbnail } from "@/lib/cityVideoStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Требуется вход администратора." }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as { id?: string } | null;
  if (!body?.id) return Response.json({ error: "Не указан ID видео." }, { status: 400 });
  try {
    return Response.json(await retryCityVideoThumbnail(body.id));
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Thumbnail не получен." },
      { status: 400 },
    );
  }
}
