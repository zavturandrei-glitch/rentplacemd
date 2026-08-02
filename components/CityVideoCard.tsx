"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { cityVideoUi } from "@/lib/cityVideoContent";
import {
  getCityVideoEmbedUrl,
  getCityVideoThumbnail,
  type CityVideo,
} from "@/lib/cityVideoTypes";

const localeByLanguage = {
  ru: "ru-MD",
  ro: "ro-MD",
  en: "en-US",
  uk: "uk-UA",
  cs: "cs-CZ",
} as const;

export default function CityVideoCard({
  video,
  layout = "rail",
}: {
  video: CityVideo;
  layout?: "rail" | "grid";
}) {
  const { language } = useLanguage();
  const [playing, setPlaying] = useState(false);
  const copy = cityVideoUi[language];
  const embedUrl = getCityVideoEmbedUrl(video);
  const thumbnail = getCityVideoThumbnail(video);
  const title = video.title[language];
  const description = video.description[language];
  const date = new Intl.DateTimeFormat(localeByLanguage[language], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Chisinau",
  }).format(new Date(`${video.date}T12:00:00+03:00`));

  return (
    <article className={`${layout === "rail" ? "w-[76vw] max-w-[270px] shrink-0 snap-start" : "w-full"} min-w-0`}>
      <div className="relative aspect-[9/16] overflow-hidden rounded-[22px] bg-[#07111f] text-white shadow-[0_16px_38px_rgba(7,17,31,0.18)] ring-1 ring-black/5">
        {playing && embedUrl ? (
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 h-full w-full border-0 bg-black"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <>
            {thumbnail ? (
              <div
                role="img"
                aria-label={title}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url("${thumbnail.replaceAll('"', "%22")}")` }}
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-[#101e32]">
                <span className="rotate-[-8deg] text-4xl font-black uppercase tracking-[-0.05em] text-white/12">{video.platform}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/20 to-black/20" />
            {embedUrl ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`${copy.actions.play}: ${title}`}
                className="absolute left-1/2 top-[42%] grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#d4146f] text-xl text-white shadow-xl shadow-black/30 transition hover:scale-105"
              >
                <span className="ml-1" aria-hidden="true">▶</span>
              </button>
            ) : (
              <a
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${copy.actions.original}: ${title}`}
                className="absolute left-1/2 top-[42%] grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#d4146f] text-xl text-white shadow-xl shadow-black/30 transition hover:scale-105"
              >
                <span className="ml-1" aria-hidden="true">↗</span>
              </a>
            )}
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#ff83b9]">{video.platform} · {date}</p>
              <h3 className="mt-2 text-xl font-black leading-tight tracking-[-0.025em]">{title}</h3>
              {description ? <p className="mt-2 line-clamp-3 text-sm leading-5 text-white/70">{description}</p> : null}
            </div>
          </>
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3 px-1 text-xs font-black">
        <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="text-[#d4146f]">{copy.actions.original} ↗</a>
        {video.relatedUrl ? (
          video.relatedUrl.startsWith("/") ? (
            <Link href={video.relatedUrl} className="text-[#07111f]">{copy.actions.related} →</Link>
          ) : (
            <a href={video.relatedUrl} target="_blank" rel="noopener noreferrer" className="text-[#07111f]">{copy.actions.related} ↗</a>
          )
        ) : null}
      </div>
    </article>
  );
}
