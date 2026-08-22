"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { cityVideoCategoryLabels, cityVideoUi } from "@/lib/cityVideoContent";
import {
  getCityVideoThumbnail,
  getCityVideoPath,
  type CityVideo,
} from "@/lib/cityVideoTypes";

const monthNames = {
  ru: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
  ro: ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  uk: ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"],
  cs: ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"],
} as const;

function formatDate(value: string, language: keyof typeof monthNames) {
  const [year, month, day] = value.split("-").map(Number);
  const monthName = monthNames[language][month - 1];
  if (language === "en") return `${monthName} ${day}, ${year}`;
  if (language === "cs") return `${day}. ${monthName} ${year}`;
  if (language === "ru") return `${day} ${monthName} ${year} г.`;
  if (language === "uk") return `${day} ${monthName} ${year} р.`;
  return `${day} ${monthName} ${year}`;
}

export default function CityVideoCard({
  video,
  layout = "rail",
}: {
  video: CityVideo;
  layout?: "rail" | "grid";
}) {
  const { language } = useLanguage();
  const copy = cityVideoUi[language];
  const [thumbnail, setThumbnail] = useState(() => getCityVideoThumbnail(video));
  const title = video.title[language];
  const description = video.description[language];
  const date = formatDate(video.date, language);
  return (
    <article className={`${layout === "rail" ? "w-[62vw] max-w-[232px] shrink-0 snap-start" : "w-[62vw] max-w-[232px] shrink-0 snap-start sm:w-full sm:max-w-none"} min-w-0`}>
      <Link
        href={`${getCityVideoPath(video.slug)}${language === "ru" ? "" : `?lang=${language}`}`}
        aria-label={`${copy.actions.play}: ${title}`}
        className="group block overflow-hidden rounded-[20px] bg-[#07111f] text-white shadow-[0_14px_30px_rgba(7,17,31,0.16)] ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(7,17,31,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#d4146f] active:scale-[0.99]"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#101e32]">
          {thumbnail ? (
            <Image
              unoptimized
              fill
              sizes="(max-width: 374px) 62vw, (max-width: 639px) 232px, (max-width: 1023px) 48vw, (max-width: 1279px) 31vw, 273px"
              src={thumbnail}
              alt=""
              loading="lazy"
              draggable={false}
              onError={() => setThumbnail(null)}
              className="object-cover transition duration-500 group-hover:scale-[1.025]"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(212,20,111,0.28),transparent_46%),linear-gradient(145deg,#172a43,#07111f)]">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-lg text-white/80 ring-1 ring-white/15">↗</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
          <span className="absolute bottom-3 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-[#d4146f] text-sm text-white shadow-lg shadow-black/35 ring-4 ring-[#07111f] transition group-hover:scale-105" aria-hidden="true">↗</span>
        </div>
        <div className="min-h-[124px] px-4 pb-3.5 pt-5">
          <p className="pr-10 text-[9px] font-black uppercase leading-4 tracking-[0.12em] text-[#ff83b9]">{cityVideoCategoryLabels[video.category][language]} · {date}</p>
          <h3 className="mt-1.5 line-clamp-2 text-base font-black leading-[1.15] tracking-[-0.02em]">{title}</h3>
          {description ? <p className="mt-1.5 line-clamp-2 text-xs leading-[1.45] text-white/65">{description}</p> : null}
        </div>
      </Link>
    </article>
  );
}
