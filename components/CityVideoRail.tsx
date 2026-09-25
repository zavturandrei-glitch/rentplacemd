"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "@/components/LocalizedLink";
import CityVideoCard from "@/components/CityVideoCard";
import { useLanguage } from "@/context/LanguageContext";
import { cityVideosPath, cityVideoUi } from "@/lib/cityVideoContent";
import type { CityVideo } from "@/lib/cityVideoTypes";

const navigationLabels = {
  ru: { previous: "Предыдущие видео", next: "Следующие видео" },
  ro: { previous: "Videoclipurile anterioare", next: "Videoclipurile următoare" },
  en: { previous: "Previous videos", next: "Next videos" },
  uk: { previous: "Попередні відео", next: "Наступні відео" },
  cs: { previous: "Předchozí videa", next: "Další videa" },
};

export default function CityVideoRail({ videos, placement }: { videos: CityVideo[]; placement: "home" | "events" }) {
  const { language } = useLanguage();
  const copy = cityVideoUi[language][placement];
  const railId = useId();
  const railRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ previous: false, next: false });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const update = () => setCanScroll({
      previous: rail.scrollLeft > 1,
      next: rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 1,
    });
    const observer = new ResizeObserver(update);
    observer.observe(rail);
    rail.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      rail.removeEventListener("scroll", update);
    };
  }, [videos.length]);

  function scrollCard(direction: number) {
    const rail = railRef.current;
    const card = rail?.firstElementChild;
    if (!rail || !card) return;
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(rail).columnGap);
    rail.scrollBy({
      left: direction * step,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }

  if (videos.length === 0) return null;
  const href = cityVideosPath;

  return (
    <section className={placement === "home" ? "bg-[#0a1525] px-4 py-8 text-white sm:px-6 sm:py-12 lg:px-8" : "mt-14 rounded-[26px] bg-[#07111f] px-5 py-8 text-white sm:px-8 sm:py-10"}>
      <div className={placement === "home" ? "mx-auto max-w-6xl" : ""}>
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className={`text-xs font-black uppercase tracking-[0.18em] ${placement === "home" ? "text-[#d4146f]" : "text-[#ff83b9]"}`}>{copy.eyebrow}</p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-white sm:text-4xl">{copy.title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/68 sm:text-base">{copy.intro}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {placement === "home" && <div className="hidden items-center gap-2 lg:flex">
              {(["previous", "next"] as const).map((direction) => (
                <button
                  key={direction}
                  type="button"
                  aria-label={navigationLabels[language][direction]}
                  aria-controls={railId}
                  disabled={!canScroll[direction]}
                  onClick={() => scrollCard(direction === "previous" ? -1 : 1)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/6 text-xl text-white transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f] disabled:cursor-default disabled:opacity-30 disabled:hover:bg-white/6"
                >
                  <span aria-hidden="true">{direction === "previous" ? "←" : "→"}</span>
                </button>
              ))}
            </div>}
            <Link href={href} className="hidden min-h-11 shrink-0 items-center rounded-xl bg-white px-4 text-sm font-black text-[#07111f] shadow-sm ring-1 ring-black/5 sm:inline-flex">{copy.all}</Link>
          </div>
        </div>
        <div ref={railRef} id={railId} className={`-mx-4 mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-4 px-4 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:scroll-px-0 sm:px-0 ${placement === "home" ? "lg:max-w-[976px] lg:[&>article]:w-[calc((100%-3rem)/4)] lg:[&>span]:hidden" : ""}`}>
          {videos.map((video) => <CityVideoCard key={video.id} video={video} />)}
          <span className="w-1 shrink-0" aria-hidden="true" />
        </div>
        <Link href={href} className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-white px-4 text-sm font-black text-[#07111f] shadow-sm sm:hidden">{copy.all}</Link>
      </div>
    </section>
  );
}
