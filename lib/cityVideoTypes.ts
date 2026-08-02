import type { Language } from "@/locales/translations";

export const cityVideoPlatforms = ["youtube", "tiktok", "instagram"] as const;
export type CityVideoPlatform = (typeof cityVideoPlatforms)[number];
export const cityVideoCategories = ["city", "events", "places", "food", "culture"] as const;
export type CityVideoCategory = (typeof cityVideoCategories)[number];
export type LocalizedVideoText = Record<Language, string>;

export type CityVideo = {
  id: string;
  date: string;
  platform: CityVideoPlatform;
  category: CityVideoCategory;
  sourceName: string;
  videoUrl: string;
  thumbnailUrl: string | null;
  title: LocalizedVideoText;
  description: LocalizedVideoText;
  relatedUrl: string | null;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type CityVideoInput = Omit<CityVideo, "id" | "createdAt" | "updatedAt">;

function parseUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url : null;
  } catch {
    return null;
  }
}

export function getYouTubeVideoId(value: string) {
  const url = parseUrl(value);
  if (!url) return null;

  if (url.hostname === "youtu.be") {
    return url.pathname.split("/").filter(Boolean)[0] ?? null;
  }

  if (url.hostname.endsWith("youtube.com")) {
    if (url.pathname === "/watch") return url.searchParams.get("v");
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts[0] === "shorts" || parts[0] === "embed") return parts[1] ?? null;
  }

  return null;
}

export function getTikTokVideoId(value: string) {
  const url = parseUrl(value);
  if (!url || !url.hostname.endsWith("tiktok.com")) return null;
  return url.pathname.match(/\/video\/(\d+)/)?.[1] ?? null;
}

export function getCityVideoEmbedUrl(video: Pick<CityVideo, "platform" | "videoUrl">) {
  if (video.platform === "youtube") {
    const id = getYouTubeVideoId(video.videoUrl);
    return id
      ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&playsinline=1`
      : null;
  }

  if (video.platform === "tiktok") {
    const id = getTikTokVideoId(video.videoUrl);
    return id
      ? `https://www.tiktok.com/player/v1/${encodeURIComponent(id)}?autoplay=1`
      : null;
  }

  return null;
}

export function getCityVideoThumbnail(video: Pick<CityVideo, "platform" | "videoUrl" | "thumbnailUrl">) {
  if (video.thumbnailUrl) return video.thumbnailUrl;
  if (video.platform !== "youtube") return null;
  const id = getYouTubeVideoId(video.videoUrl);
  return id ? `https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg` : null;
}

export function isValidPlatformUrl(platform: CityVideoPlatform, value: string) {
  const url = parseUrl(value);
  if (!url) return false;

  if (platform === "youtube") {
    return Boolean(getYouTubeVideoId(value));
  }

  if (platform === "tiktok") {
    return url.hostname.endsWith("tiktok.com");
  }

  return url.hostname === "instagram.com" || url.hostname.endsWith(".instagram.com");
}

export function isSafeOptionalUrl(value: string | null) {
  if (!value) return true;
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  return Boolean(parseUrl(value));
}
