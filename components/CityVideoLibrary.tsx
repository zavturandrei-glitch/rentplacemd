"use client";

import Link from "next/link";
import CityVideoCard from "@/components/CityVideoCard";
import { useLanguage } from "@/context/LanguageContext";
import { cityVideoUi } from "@/lib/cityVideoContent";
import type { CityVideo } from "@/lib/cityVideoTypes";

export default function CityVideoLibrary({ videos }: { videos: CityVideo[] }) {
  const { language } = useLanguage();
  const copy = cityVideoUi[language].page;

  return (
    <>
      <section className="bg-[#07111f] px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff83b9]">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-5xl text-balance text-4xl font-black leading-[1.02] tracking-[-0.045em] sm:text-6xl">{copy.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">{copy.intro}</p>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {videos.length > 0 ? (
            <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-5 sm:gap-y-7 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 xl:grid-cols-4">
              {videos.map((video) => <CityVideoCard key={video.id} video={video} layout="grid" />)}
            </div>
          ) : (
            <p className="rounded-[24px] border border-dashed border-[#07111f]/15 bg-white p-6 text-base leading-7 text-slate-600">{copy.empty}</p>
          )}
        </div>
      </section>

      <section className="bg-[#efeee9] px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-black tracking-[-0.03em] text-[#07111f] sm:text-3xl">{copy.linksTitle}</h2>
          <nav className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label={copy.linksTitle}>
            <InternalLink href={`/events?lang=${language}`} label={copy.events} />
            <InternalLink href={`/chisinau-guide?lang=${language}`} label={copy.guide} />
            <InternalLink href={`/apartments?lang=${language}`} label={copy.apartments} />
            <InternalLink href={`/guide/attractions?lang=${language}`} label={copy.attractions} />
          </nav>
        </div>
      </section>
    </>
  );
}

function InternalLink({ href, label }: { href: string; label: string }) {
  return <Link href={href} className="flex min-h-14 items-center justify-between rounded-2xl bg-white px-4 text-sm font-black text-[#07111f] shadow-sm ring-1 ring-black/5 transition hover:text-[#d4146f]">{label}<span aria-hidden="true">→</span></Link>;
}
