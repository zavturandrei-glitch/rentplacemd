import { getCityVideoAbsoluteThumbnail, getCityVideoWatchDescription } from "@/lib/cityVideoContent";
import { getCityVideoEmbedUrl, getCityVideoPath } from "@/lib/cityVideoTypes";
import { readPublishedCityVideos } from "@/lib/cityVideoStore";
import { baseUrl } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const videos = await readPublishedCityVideos();
  const entries = videos.flatMap((video) => {
    const thumbnail = getCityVideoAbsoluteThumbnail(video);
    const player = getCityVideoEmbedUrl(video);
    if (!thumbnail || !player) return [];
    const title = video.title.ru.slice(0, 100);
    const description = getCityVideoWatchDescription(video, "ru").slice(0, 2048);
    return [`  <url>
    <loc>${escapeXml(baseUrl + getCityVideoPath(video.slug))}</loc>
    <video:video>
      <video:thumbnail_loc>${escapeXml(thumbnail)}</video:thumbnail_loc>
      <video:title>${escapeXml(title)}</video:title>
      <video:description>${escapeXml(description)}</video:description>
      <video:player_loc>${escapeXml(player)}</video:player_loc>
      <video:publication_date>${escapeXml(video.createdAt)}</video:publication_date>
    </video:video>
  </url>`];
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries}
</urlset>\n`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
