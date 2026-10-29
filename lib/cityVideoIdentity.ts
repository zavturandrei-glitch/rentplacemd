import type { CityVideo } from "./cityVideoTypes";
import type { Language } from "@/locales/translations";

function contentKey(video: CityVideo) {
  try {
    const url = new URL(video.embedUrl || video.videoUrl);
    return `${video.platform}|${url.origin}${url.pathname.replace(/\/$/, "")}${url.searchParams.has("v") ? `?v=${url.searchParams.get("v")}` : ""}`;
  } catch { return `${video.platform}|${video.videoUrl}`; }
}

export function getCityVideoIdentity(video: CityVideo, language: Language, inventory: readonly CityVideo[] = []) {
  const all = [...new Map([...inventory, video].map(item => [item.id, item])).values()]
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id));
  const canonical = all.find(item => contentKey(item) === contentKey(video)) ?? video;
  const group = all.filter(item => item.title[language].trim().toLocaleLowerCase() === canonical.title[language].trim().toLocaleLowerCase());
  const clips = [...new Map(group.map(item => [contentKey(item), all.find(candidate => contentKey(candidate) === contentKey(item)) ?? item])).values()];
  const position = clips.findIndex(item => item.id === canonical.id) + 1;
  const label = ({ ru: "Видео", ro: "Videoclip", en: "Video", uk: "Відео", cs: "Video" })[language];
  const suffix = clips.length > 1 ? `${label} ${position}` : "";
  return {
    canonical,
    duplicate: canonical.id !== video.id,
    title: `${canonical.title[language]}${suffix ? ` · ${suffix}` : ""}`,
    descriptionPrefix: suffix ? `${suffix}. ` : "",
  };
}
