"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getApartmentPathById, normalizeApartmentId } from "@/lib/apartments";

type ApartmentIdSearchProps = {
  variant: "hero" | "header";
  compactMobile?: boolean;
};

export default function ApartmentIdSearch({
  variant,
  compactMobile = false,
}: ApartmentIdSearchProps) {
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
    <div
      className={[
        compactMobile
          ? "min-w-0 flex-1 text-white"
          : "ml-2 flex-none -translate-y-0.5 text-white",
        "lg:ml-0 lg:w-[210px] lg:flex-none lg:translate-y-0 lg:rounded-xl lg:border lg:border-white/10 lg:bg-white/[0.05] lg:px-2 lg:py-1.5 lg:shadow-inner xl:w-[255px]",
      ].join(" ")}
    >
      <div className="flex min-w-0 items-center gap-1">
        <h2
          className={[
            "shrink-0 whitespace-nowrap font-black uppercase leading-none text-white/90",
            compactMobile
              ? "text-[6.5px] tracking-normal min-[390px]:text-[7px]"
              : "text-[7px] tracking-[0.015em] min-[390px]:text-[7.5px]",
            "lg:min-w-[68px] lg:max-w-[86px] lg:whitespace-normal lg:text-[9px] lg:leading-tight lg:tracking-[0.06em] xl:min-w-[82px] xl:max-w-[112px] xl:text-[11px]",
          ].join(" ")}
        >
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
          className={[
            "h-9 rounded-lg border border-white/15 bg-white px-0.5 text-center font-black leading-none text-[#07111f] outline-none placeholder:text-slate-400 focus:border-[#ffd21f]",
            compactMobile
              ? "min-w-0 flex-1 text-[12px]"
              : "w-14 text-[13px] min-[390px]:w-16 min-[390px]:text-[14px] min-[430px]:w-[68px]",
            "lg:h-8 lg:min-w-0 lg:flex-1 lg:text-[14px]",
          ].join(" ")}
        />

        <button
          type="button"
          onClick={openApartmentById}
          className={[
            "h-9 shrink-0 rounded-lg bg-[#ffd21f] font-black leading-none text-[#07111f] shadow-sm transition active:scale-95",
            compactMobile
              ? "px-1.5 text-[8px] min-[390px]:px-2 min-[390px]:text-[9px]"
              : "px-2 text-[9px] min-[390px]:px-2.5 min-[390px]:text-[10px]",
            "lg:h-8 lg:px-3.5 lg:text-[12px] lg:hover:bg-white",
          ].join(" ")}
        >
          {t.hero.find}
        </button>
      </div>
    </div>
  );
}
