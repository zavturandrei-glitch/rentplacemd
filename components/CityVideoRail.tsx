"use client";

import Link from "next/link";
import CityVideoCard from "@/components/CityVideoCard";
import { useLanguage } from "@/context/LanguageContext";
import { cityVideosPath, cityVideoUi } from "@/lib/cityVideoContent";
import type { CityVideo } from "@/lib/cityVideoTypes";

export default function CityVideoRail({ videos, placement }: { videos: CityVideo[]; placement: "home" | "events" }) {
  const { language } = useLanguage();
  const copy = cityVideoUi[language][placement];
  if (videos.length === 0) return null;
  const href = `${cityVideosPath}?lang=${language}`;

  return (
    <section className={placement === "home" ? "bg-[#efeee9] px-4 py-10 sm:px-6 sm:py-14 lg:px-8" : "mt-14 rounded-[26px] bg-[#07111f] px-5 py-8 text-white sm:px-8 sm:py-10"}>
      <div className={placement === "home" ? "mx-auto max-w-6xl" : ""}>
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className={`text-xs font-black uppercase tracking-[0.18em] ${placement === "home" ? "text-[#d4146f]" : "text-[#ff83b9]"}`}>{copy.eyebrow}</p>
            <h2 className={`mt-2 text-3xl font-black tracking-[-0.035em] sm:text-4xl ${placement === "home" ? "text-[#07111f]" : "text-white"}`}>{copy.title}</h2>
            <p className={`mt-3 max-w-2xl text-sm leading-6 sm:text-base ${placement === "home" ? "text-slate-600" : "text-white/68"}`}>{copy.intro}</p>
          </div>
          <Link href={href} className="hidden min-h-11 shrink-0 items-center rounded-xl bg-white px-4 text-sm font-black text-[#07111f] shadow-sm ring-1 ring-black/5 sm:inline-flex">{copy.all}</Link>
        </div>
        <div className="-mx-4 mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">
          {videos.map((video) => <CityVideoCard key={video.id} video={video} />)}
          <span className="w-1 shrink-0" aria-hidden="true" />
        </div>
        <Link href={href} className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-white px-4 text-sm font-black text-[#07111f] shadow-sm sm:hidden">{copy.all}</Link>
      </div>
    </section>
  );
}
