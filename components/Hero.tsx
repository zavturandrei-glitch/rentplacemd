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

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-9 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="mx-auto max-w-[360px] text-[30px] font-black leading-[1.12] tracking-tight text-white sm:max-w-5xl sm:text-5xl lg:text-6xl">
            {t.hero.title}
          </h1>

          <p className="mx-auto mt-3 max-w-[340px] text-[17px] font-bold leading-6 text-white/90 sm:mt-4 sm:max-w-4xl sm:text-2xl sm:leading-8">
            {formatApartmentCountText(t.hero.subtitle)}
          </p>
        </div>
      </div>
    </section>
  );
}
