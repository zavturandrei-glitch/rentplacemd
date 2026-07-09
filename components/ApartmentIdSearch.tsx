"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getApartmentPathById } from "@/lib/apartments";

type ApartmentIdSearchProps = {
  variant: "hero" | "header";
};

function cleanApartmentId(value: string) {
  return value
    .toLowerCase()
    .replace("id", "")
    .replace("â„–", "")
    .replace("#", "")
    .replaceAll(" ", "")
    .trim();
}

export default function ApartmentIdSearch({ variant }: ApartmentIdSearchProps) {
  const { t } = useLanguage();
  const [apartmentId, setApartmentId] = useState("");

  function openApartmentById() {
    const id = cleanApartmentId(apartmentId);

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
    <div className="w-full min-w-0 rounded-lg border border-white/10 bg-white/[0.06] px-2 py-1.5 text-white shadow-inner lg:w-[210px] lg:bg-white/[0.05] xl:w-[255px]">
      <div className="flex min-w-0 items-center gap-1.5">
        <h2 className="min-w-[74px] max-w-[96px] shrink text-[10px] font-black uppercase leading-tight tracking-[0.06em] text-white/90 lg:min-w-[68px] lg:max-w-[86px] lg:text-[9px] xl:min-w-[82px] xl:max-w-[112px] xl:text-[11px]">
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
          inputMode="numeric"
          placeholder="22"
          aria-label={t.hero.idTitle}
          className="h-9 min-w-0 flex-1 rounded-md border border-white/15 bg-white px-2 text-center text-[16px] font-black leading-none text-[#07111f] outline-none placeholder:text-slate-400 focus:border-[#ffd21f] lg:h-8 lg:text-[14px]"
        />

        <button
          type="button"
          onClick={openApartmentById}
          className="h-9 shrink-0 rounded-md bg-[#ffd21f] px-3 text-[12px] font-black leading-none text-[#07111f] shadow-sm transition active:scale-95 lg:h-8 lg:px-3.5 lg:hover:bg-white"
        >
          {t.hero.find}
        </button>
      </div>
    </div>
  );
}
