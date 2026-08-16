import "server-only";

import { unstable_cache } from "next/cache";
import type { CityVideoInput } from "@/lib/cityVideoTypes";

type TikTokOEmbed = { thumbnail_url?: unknown };

function asPublicImageUrl(value: unknown) {
  try {
    const url = new URL(String(value ?? ""));
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

async function requestTikTokThumbnail(videoUrl: string) {
  try {
    const response = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`,
      { signal: AbortSignal.timeout(5_000) },
    );
    if (!response.ok) return null;
    const data = (await response.json()) as TikTokOEmbed;
    return asPublicImageUrl(data.thumbnail_url);
  } catch {
    return null;
  }
}

export const fetchTikTokThumbnail = unstable_cache(
  requestTikTokThumbnail,
  ["tiktok-oembed-thumbnail"],
  { revalidate: 60 * 60, tags: ["tiktok-oembed-thumbnails"] },
);

export async function withAutomaticCityVideoThumbnail(input: CityVideoInput): Promise<CityVideoInput> {
  if (input.thumbnailUrl || input.platform !== "tiktok") return input;
  const thumbnailUrl = await fetchTikTokThumbnail(input.videoUrl);
  return thumbnailUrl ? { ...input, thumbnailUrl } : input;
}
