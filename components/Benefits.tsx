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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.benefits.items.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-gray-100 bg-[#fffaf0] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ffb800] text-2xl shadow-md">
                {item.icon}
              </div>

              <h3 className="mb-3 text-xl font-black text-gray-950">
                {item.title}
              </h3>

              <p className="text-sm leading-6 text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}