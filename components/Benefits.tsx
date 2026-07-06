"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Benefits() {
  const { t } = useLanguage();

  return (
    <section id="benefits" className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#d4146f]">
            {t.benefits.label}
          </p>

          <h2 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
            {t.benefits.title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
            {t.benefits.description}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {t.benefits.items.map((item) => (
            <div
              key={item.title}
              className="group rounded-[2rem] border border-[#f2eadc] bg-[#fffefb] p-7 shadow-[0_18px_45px_rgba(15,23,42,0.07)] transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_26px_70px_rgba(15,23,42,0.12)] sm:p-8 lg:p-9"
            >
              <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-[18px] bg-gradient-to-br from-[#fff4b8] via-[#ffd21f] to-[#d49a00] text-[2rem] leading-none shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_14px_34px_rgba(255,184,0,0.28)] ring-1 ring-[#f1c453]/55 transition duration-300 ease-out group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_18px_42px_rgba(255,184,0,0.34)]">
                {item.icon}
              </div>

              <h3 className="mb-4 text-[1.35rem] font-bold leading-tight text-gray-950 sm:text-[1.45rem]">
                {item.title}
              </h3>

              <p className="text-[15px] leading-7 text-gray-600 sm:text-base sm:leading-8">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
