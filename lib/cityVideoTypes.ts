import type { Language } from "@/locales/translations";

export const cityVideoPlatforms = ["youtube", "tiktok", "instagram"] as const;
export type CityVideoPlatform = (typeof cityVideoPlatforms)[number];
export const cityVideoCategories = ["city", "events", "places", "food", "culture"] as const;
export type CityVideoCategory = (typeof cityVideoCategories)[number];
export type LocalizedVideoText = Record<Language, string>;
export type CityVideoThumbnailStatus = "not_required" | "manual" | "stored" | "failed";

export type CityVideo = {
  id: string;
  slug: string;
  date: string;
  platform: CityVideoPlatform;
  category: CityVideoCategory;
  sourceName: string;
  videoUrl: string;
  embedUrl: string | null;
  thumbnailUrl: string | null;
  thumbnailStatus: CityVideoThumbnailStatus;
  thumbnailError: string | null;
  title: LocalizedVideoText;
  description: LocalizedVideoText;
  relatedUrl: string | null;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type CityVideoInput = Omit<
  CityVideo,
  "id" | "createdAt" | "updatedAt" | "thumbnailStatus" | "thumbnailError"
  | "slug" | "embedUrl"
>;

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

export function getCityVideoEmbedUrl(
  video: Pick<CityVideo, "platform" | "videoUrl" | "embedUrl">,
) {
  if (video.embedUrl) return video.embedUrl;
  if (video.platform === "youtube") {
    const id = getYouTubeVideoId(video.videoUrl);
    return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` : null;
  }
  if (video.platform === "tiktok") {
    const id = getTikTokVideoId(video.videoUrl);
    return id ? `https://www.tiktok.com/player/v1/${encodeURIComponent(id)}` : null;
  }
  const url = parseUrl(video.videoUrl);
  if (video.platform === "instagram" && url) {
    const match = url.pathname.match(/^\/(?:p|reel)\/([^/]+)/);
    return match ? `https://www.instagram.com/p/${encodeURIComponent(match[1])}/embed` : null;
  }
  return null;
}

const cyrillicToLatin: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
  и: "i", й: "i", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c", ч: "ch", ш: "sh", щ: "sch",
  ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya", і: "i", ї: "yi", є: "e", ґ: "g",
};

export function createCityVideoSlug(title: string, id: string) {
  const transliterated = title.toLocaleLowerCase("ru").split("")
    .map((character) => cyrillicToLatin[character] ?? character)
    .join("")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64)
    .replace(/-+$/g, "");
  const suffix = id.replace(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase() || "video";
  return `${transliterated || "video"}-${suffix}`;
}

export function getCityVideoPath(slug: string) {
  return `/chisinau-videos/${encodeURIComponent(slug)}`;
}

export function isTikTokThumbnailUrl(value: string) {
  const url = parseUrl(value);
  if (!url) return false;
  if (url.hostname.includes("tiktokcdn")) return true;
  return [
    "tiktokcdn.com",
    "tiktokcdn-us.com",
    "muscdn.com",
    "byteoversea.com",
    "ibytedtos.com",
  ].some((hostname) => url.hostname === hostname || url.hostname.endsWith(`.${hostname}`));
}

export function getStoredCityVideoThumbnailUrl(id: string, version?: string) {
  const base = `/api/video-thumbnails/${encodeURIComponent(id)}`;
  return version ? `${base}/${encodeURIComponent(version)}` : base;
}

export function isStoredCityVideoThumbnailUrl(value: string | null | undefined) {
  return Boolean(value?.startsWith("/api/video-thumbnails/"));
}

export function hasPermanentCityVideoThumbnail(
  video: Pick<CityVideo, "platform" | "thumbnailUrl">,
) {
  if (!video.thumbnailUrl) return false;
  return video.platform !== "tiktok" || !isTikTokThumbnailUrl(video.thumbnailUrl);
}

export function getCityVideoThumbnail(video: Pick<CityVideo, "platform" | "videoUrl" | "thumbnailUrl">) {
  if (video.platform === "tiktok") {
    return video.thumbnailUrl && !isTikTokThumbnailUrl(video.thumbnailUrl)
      ? video.thumbnailUrl
      : null;
  }
  if (video.thumbnailUrl) return video.thumbnailUrl;
  if (video.platform === "youtube") {
    const id = getYouTubeVideoId(video.videoUrl);
    return id ? `https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg` : null;
  }
  return null;
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
