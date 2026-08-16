import { fetchTikTokThumbnail } from "@/lib/cityVideoPreview";
import { isTikTokThumbnailUrl, isValidPlatformUrl } from "@/lib/cityVideoTypes";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const videoUrl = searchParams.get("url")?.trim() ?? "";
  if (!isValidPlatformUrl("tiktok", videoUrl)) {
    return new Response(null, { status: 400 });
  }

  const storedThumbnail = searchParams.get("thumbnail")?.trim() ?? "";
  const storedUrl = isTikTokThumbnailUrl(storedThumbnail) ? new URL(storedThumbnail) : null;
  const expiresAt = Number(storedUrl?.searchParams.get("x-expires") ?? "0");
  const storedThumbnailIsFresh = storedUrl && (!expiresAt || expiresAt > Date.now() / 1000 + 300);
  const thumbnailUrl = storedThumbnailIsFresh ? storedUrl.toString() : await fetchTikTokThumbnail(videoUrl);
  if (!thumbnailUrl || !isTikTokThumbnailUrl(thumbnailUrl)) {
    return new Response(null, { status: 404 });
  }

  try {
    const image = await fetch(thumbnailUrl, { signal: AbortSignal.timeout(7_000) });
    const contentType = image.headers.get("content-type") ?? "";
    if (!image.ok || !contentType.startsWith("image/")) {
      return new Response(null, { status: 404 });
    }

    const bytes = await image.arrayBuffer();
    if (bytes.byteLength > 5_000_000) return new Response(null, { status: 413 });

    return new Response(bytes, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(bytes.byteLength),
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response(null, { status: 404 });
  }
}
