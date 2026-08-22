import { readStoredCityVideoThumbnail } from "@/lib/cityVideoStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const thumbnail = await readStoredCityVideoThumbnail(id);
  if (!thumbnail) return new Response(null, { status: 404 });

  return new Response(thumbnail.bytes, {
    headers: {
      "Content-Type": thumbnail.contentType,
      "Content-Length": String(thumbnail.bytes.byteLength),
      "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
