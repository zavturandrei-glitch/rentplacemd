"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const [showRequest, setShowRequest] = useState(false);
  const [message, setMessage] = useState("");

  const whatsappText = message.trim() || t.hero.whatsappDefault;
  const whatsappLink = `https://wa.me/37369990190?text=${encodeURIComponent(
    whatsappText,
  )}`;

  return (
    <section className="relative overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/main.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/50 sm:bg-black/45" />

      <div className="relative mx-auto max-w-7xl px-4 pb-7 pt-7 sm:px-6 sm:pb-12 sm:pt-12 lg:px-8">
        <div className="mx-auto mb-5 max-w-5xl text-center sm:mb-8">
          <h1 className="mx-auto max-w-[360px] text-[30px] font-black leading-[1.12] tracking-tight text-white sm:max-w-5xl sm:text-5xl lg:text-6xl">
            {t.hero.title}
          </h1>

          <p className="mx-auto mt-3 max-w-[340px] text-[17px] font-bold leading-6 text-white/90 sm:mt-4 sm:max-w-4xl sm:text-2xl sm:leading-8">
            {t.hero.subtitle}
          </p>
        </div>

        <div
          id="quick-pick"
          className="relative z-10 mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:gap-4"
        >
          <article className="flex h-[188px] min-w-0 flex-col rounded-[1.35rem] border border-white/25 bg-[#d4146f]/82 p-3.5 text-white shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_22px_64px_rgba(212,20,111,0.32)] sm:h-[220px] sm:rounded-[1.75rem] sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/80 sm:text-xs sm:tracking-[0.25em]">
              {t.hero.quickPickLabel}
            </p>

            <h2 className="mt-2 text-[18px] font-black leading-[1.08] sm:mt-3 sm:text-2xl">
              {t.hero.quickPickTitle}
            </h2>

            <p className="mt-2 line-clamp-2 text-[12px] font-semibold leading-4 text-white/90 sm:mt-3 sm:text-base sm:leading-6">
              {t.hero.quickPickText}
            </p>

            <button
              type="button"
              onClick={() => setShowRequest(true)}
              className="mt-auto w-full rounded-2xl bg-white px-3 py-3 text-[14px] font-black leading-none text-[#d4146f] shadow-xl transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-6 sm:py-4 sm:text-lg"
            >
              {t.hero.quickPickButton}
            </button>
          </article>

          <article className="flex h-[188px] min-w-0 flex-col rounded-[1.35rem] border border-white/40 bg-[#ffd21f]/92 p-3.5 text-[#07111f] shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_22px_64px_rgba(255,210,31,0.28)] sm:h-[220px] sm:rounded-[1.75rem] sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#07111f]/70 sm:text-xs sm:tracking-[0.25em]">
              {t.hero.catalogLabel}
            </p>

            <h2 className="mt-2 text-[18px] font-black leading-[1.08] sm:mt-3 sm:text-2xl">
              {t.hero.catalogTitle}
            </h2>

            <p className="mt-2 line-clamp-2 text-[12px] font-semibold leading-4 text-[#07111f]/78 sm:mt-3 sm:text-base sm:leading-6">
              {t.hero.catalogText}
            </p>

            <Link
              href="/apartments#apartments"
              className="mt-auto w-full rounded-2xl bg-[#07111f] px-3 py-3 text-center text-[14px] font-black leading-none text-white shadow-xl transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07111f] sm:px-6 sm:py-4 sm:text-lg"
            >
              {t.hero.openCatalog}
            </Link>
          </article>

          {showRequest && (
            <div className="col-span-2 rounded-[1.35rem] border border-white/25 bg-[#d4146f]/82 p-4 text-white shadow-2xl backdrop-blur-xl sm:rounded-[1.75rem] sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-white/80">
                {t.hero.requestLabel}
              </p>

              <h2 className="mt-3 text-2xl font-black">{t.hero.requestTitle}</h2>

              <p className="mt-3 text-base font-semibold leading-6 text-white/90">
                {t.hero.requestText}
              </p>

              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={t.hero.textareaPlaceholder}
                className="mt-4 min-h-24 w-full resize-none rounded-2xl border border-white/30 bg-white/20 p-4 text-base font-semibold text-white outline-none placeholder:text-white/70 focus:bg-white/25"
              />

              <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-[#25D366] px-6 py-4 text-center text-base font-black text-white shadow-lg transition hover:scale-[1.02]"
                >
                  {t.hero.sendWhatsApp}
                </a>

                <button
                  type="button"
                  onClick={() => setShowRequest(false)}
                  className="rounded-2xl border border-white/30 px-6 py-3 text-base font-black text-white transition hover:bg-white/10"
                >
                  {t.hero.back}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
