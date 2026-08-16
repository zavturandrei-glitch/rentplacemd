import { fetchTikTokThumbnail } from "@/lib/cityVideoPreview";
import { isValidPlatformUrl } from "@/lib/cityVideoTypes";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const videoUrl = new URL(request.url).searchParams.get("url")?.trim() ?? "";
  if (!isValidPlatformUrl("tiktok", videoUrl)) {
    return new Response(null, { status: 400 });
  }

  const thumbnailUrl = await fetchTikTokThumbnail(videoUrl);
  if (!thumbnailUrl) return new Response(null, { status: 404 });

  return new Response(null, {
    status: 307,
    headers: {
      Location: thumbnailUrl,
      "Cache-Control": "public, max-age=3600, s-maxage=604800, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
