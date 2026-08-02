import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import {
  createCityVideo,
  deleteCityVideo,
  getCityVideoStorageStatus,
  readCityVideos,
  updateCityVideo,
} from "@/lib/cityVideoStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function unauthorized() {
  return Response.json({ error: "Требуется вход администратора." }, { status: 401 });
}

function errorResponse(error: unknown) {
  return Response.json(
    { error: error instanceof Error ? error.message : "Не удалось сохранить видео." },
    { status: 400 },
  );
}

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  return Response.json({
    videos: await readCityVideos(),
    storage: await getCityVideoStorageStatus(),
  });
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) return unauthorized();
  try {
    return Response.json(await createCityVideo(await request.json()), { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await requireAdmin())) return unauthorized();
  const body = (await request.json().catch(() => null)) as { id?: string; video?: unknown } | null;
  if (!body?.id) return Response.json({ error: "Не указан ID видео." }, { status: 400 });
  try {
    return Response.json(await updateCityVideo(body.id, body.video));
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await requireAdmin())) return unauthorized();
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return Response.json({ error: "Не указан ID видео." }, { status: 400 });
  try {
    await deleteCityVideo(id);
    return Response.json({ deleted: true });
  } catch (error) {
    return errorResponse(error);
  }
}
