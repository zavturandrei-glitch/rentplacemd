"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getApartmentPathById, normalizeApartmentId } from "@/lib/apartments";

type ApartmentIdSearchProps = {
  variant: "hero" | "header";
};

export default function ApartmentIdSearch({ variant }: ApartmentIdSearchProps) {
  const { t } = useLanguage();
  const [apartmentId, setApartmentId] = useState("");

  function openApartmentById() {
    const id = normalizeApartmentId(apartmentId);

    const apartmentLink = getApartmentPathById(id);

    if (apartmentLink) {
      window.location.href = apartmentLink;
      return;
    }

    alert(t.hero.notFound);
  }

  if (variant === "hero") {
    return (
      <div className="mt-4 flex gap-3 sm:mt-5">
        <input
          value={apartmentId}
          onChange={(e) => setApartmentId(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              openApartmentById();
            }
          }}
          placeholder="22"
          className="w-full rounded-2xl border border-white/30 bg-white/25 px-5 py-4 text-lg font-black text-white outline-none placeholder:text-white/70 focus:bg-white/30"
        />

        <button
          type="button"
          onClick={openApartmentById}
          className="rounded-2xl bg-[#d4146f] px-6 py-4 text-lg font-black text-white shadow-lg transition hover:scale-105"
        >
          {t.hero.find}
        </button>
      </div>
    );
  }

  return (
    <div className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.06] p-1 text-white shadow-inner lg:w-[210px] lg:flex-none lg:bg-white/[0.05] lg:px-2 lg:py-1.5 xl:w-[255px]">
      <div className="flex min-w-0 items-center gap-1.5">
        <h2 className="sr-only lg:not-sr-only lg:min-w-[68px] lg:max-w-[86px] lg:shrink lg:text-[9px] lg:font-black lg:uppercase lg:leading-tight lg:tracking-[0.06em] lg:text-white/90 xl:min-w-[82px] xl:max-w-[112px] xl:text-[11px]">
          {t.hero.idTitle}
        </h2>

        <input
          value={apartmentId}
          onChange={(e) => setApartmentId(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              openApartmentById();
            }
          }}
          placeholder="76"
          aria-label={t.hero.idTitle}
          className="h-10 w-[46px] min-w-0 flex-1 rounded-lg border border-white/15 bg-white px-1 text-center text-[15px] font-black leading-none text-[#07111f] outline-none placeholder:text-slate-400 focus:border-[#ffd21f] lg:h-8 lg:text-[14px]"
        />

        <button
          type="button"
          onClick={openApartmentById}
          className="h-10 shrink-0 rounded-lg bg-[#ffd21f] px-2.5 text-[11px] font-black leading-none text-[#07111f] shadow-sm transition active:scale-95 lg:h-8 lg:px-3.5 lg:text-[12px] lg:hover:bg-white"
        >
          {t.hero.find}
        </button>
      </div>
    </div>
  );
}
