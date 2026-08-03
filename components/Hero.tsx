"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { formatApartmentCountText } from "@/lib/apartments";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#07111f]">
      <Image
        src="/main.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        quality={75}
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,17,.48)_0%,rgba(7,17,31,.68)_65%,#07111f_100%)]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-5 sm:px-6 sm:pb-12 sm:pt-12 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="mx-auto max-w-[360px] text-[28px] font-black leading-[1.08] tracking-tight text-white sm:max-w-5xl sm:text-5xl lg:text-6xl">
            {t.hero.title}
          </h1>

          <p className="mx-auto mt-1.5 max-w-[350px] text-[14px] font-bold leading-5 text-white/90 sm:mt-3 sm:max-w-4xl sm:text-2xl sm:leading-8">
            {formatApartmentCountText(t.hero.subtitle)}
          </p>
        </div>
      </div>
    </section>
  );
}
