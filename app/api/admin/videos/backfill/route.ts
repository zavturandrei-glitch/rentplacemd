import { requireAdmin } from "@/lib/adminAuth";
import { backfillCityVideoSeo, backfillCityVideoThumbnails } from "@/lib/cityVideoStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Требуется вход администратора." }, { status: 401 });
  }
  return Response.json({
    seo: await backfillCityVideoSeo(),
    thumbnails: await backfillCityVideoThumbnails(),
  });
}
