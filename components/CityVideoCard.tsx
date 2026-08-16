"use client";

import Link from "next/link";
import Image, { type ImageLoaderProps } from "next/image";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { cityVideoCategoryLabels, cityVideoUi } from "@/lib/cityVideoContent";
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

const passthroughImageLoader = ({ src }: ImageLoaderProps) => src;

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
  const automaticThumbnail = getCityVideoThumbnail({ ...video, thumbnailUrl: null });
  const [thumbnail, setThumbnail] = useState(() => getCityVideoThumbnail(video));
  const title = video.title[language];
  const description = video.description[language];
  const date = new Intl.DateTimeFormat(localeByLanguage[language], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Chisinau",
  }).format(new Date(`${video.date}T12:00:00+03:00`));

  return (
    <article className={`${layout === "rail" ? "w-[62vw] max-w-[232px] shrink-0 snap-start" : "w-[62vw] max-w-[232px] shrink-0 snap-start sm:w-full sm:max-w-none"} min-w-0`}>
      <div className="overflow-hidden rounded-[20px] bg-[#07111f] text-white shadow-[0_14px_30px_rgba(7,17,31,0.16)] ring-1 ring-black/5">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#101e32]">
          {playing && embedUrl ? (
            <iframe
              src={embedUrl}
              title={title}
              className="absolute inset-0 h-full w-full border-0 bg-black"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
            />
          ) : (
            <>
              {thumbnail ? (
                <Image
                  loader={passthroughImageLoader}
                  unoptimized
                  fill
                  sizes="(max-width: 640px) 62vw, (max-width: 1024px) 50vw, 25vw"
                  src={thumbnail}
                  alt=""
                  onError={() => setThumbnail(thumbnail === automaticThumbnail ? null : automaticThumbnail)}
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(212,20,111,0.28),transparent_46%),linear-gradient(145deg,#172a43,#07111f)]">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-lg text-white/80 ring-1 ring-white/15">▶</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
              {embedUrl ? (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label={`${copy.actions.play}: ${title}`}
                  className="absolute bottom-0 right-4 z-10 grid h-11 w-11 translate-y-1/2 place-items-center rounded-full bg-[#d4146f] text-sm text-white shadow-lg shadow-black/35 ring-4 ring-[#07111f] transition hover:scale-105"
                >
                  <span className="ml-1" aria-hidden="true">▶</span>
                </button>
              ) : (
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${copy.actions.original}: ${title}`}
                  className="absolute bottom-0 right-4 z-10 grid h-11 w-11 translate-y-1/2 place-items-center rounded-full bg-[#d4146f] text-sm text-white shadow-lg shadow-black/35 ring-4 ring-[#07111f] transition hover:scale-105"
                >
                  <span className="ml-1" aria-hidden="true">↗</span>
                </a>
              )}
            </>
          )}
        </div>
        <div className="min-h-[132px] px-4 pb-4 pt-5">
          <p className="pr-10 text-[9px] font-black uppercase leading-4 tracking-[0.12em] text-[#ff83b9]">{cityVideoCategoryLabels[video.category][language]} · {date}</p>
          <h3 className="mt-1.5 line-clamp-2 text-base font-black leading-[1.15] tracking-[-0.02em]">{title}</h3>
          {description ? <p className="mt-1.5 line-clamp-2 text-xs leading-[1.45] text-white/65">{description}</p> : null}
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-3 px-1 text-[11px] font-black">
        <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="text-[#d4146f]">{copy.actions.original} ↗</a>
        {video.relatedUrl ? (
          video.relatedUrl.startsWith("/") ? (
            <Link href={`${video.relatedUrl}${video.relatedUrl.includes("?") ? "&" : "?"}lang=${language}`} className="text-[#07111f]">{copy.actions.related} →</Link>
          ) : (
            <a href={video.relatedUrl} target="_blank" rel="noopener noreferrer" className="text-[#07111f]">{copy.actions.related} ↗</a>
          )
        ) : null}
      </div>
    </article>
  );
}
