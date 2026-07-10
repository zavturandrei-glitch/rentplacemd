"use client";

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

        <div id="quick-pick" className="relative z-10 mx-auto grid max-w-xl gap-4">
          <div
            onClick={() => !showRequest && setShowRequest(true)}
            className="cursor-pointer rounded-[1.6rem] border border-white/25 bg-[#d4146f]/75 p-5 text-white shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_22px_64px_rgba(212,20,111,0.32)] sm:rounded-[2rem] sm:p-6"
          >
            {!showRequest ? (
              <>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-white/80">
                  {t.hero.quickPickLabel}
                </p>

                <h2 className="text-[24px] font-black leading-tight sm:text-2xl">
                  {t.hero.quickPickTitle}
                </h2>

                <p className="mt-3 text-base font-semibold leading-6 text-white/90 sm:mt-4">
                  {t.hero.quickPickText}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowRequest(true);
                  }}
                  className="mt-4 w-full rounded-2xl bg-white px-6 py-3.5 text-lg font-black text-[#d4146f] shadow-xl transition hover:scale-[1.02] sm:mt-5 sm:py-4"
                >
                  {t.hero.quickPickButton}
                </button>
              </>
            ) : (
              <>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-white/80">
                  {t.hero.requestLabel}
                </p>

                <h2 className="text-2xl font-black">{t.hero.requestTitle}</h2>

                <p className="mt-3 text-base font-semibold leading-6 text-white/90">
                  {t.hero.requestText}
                </p>

                <textarea
                  value={message}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.hero.textareaPlaceholder}
                  className="mt-4 min-h-24 w-full resize-none rounded-2xl border border-white/30 bg-white/20 p-4 text-base font-semibold text-white outline-none placeholder:text-white/70 focus:bg-white/25"
                />

                <div className="mt-4 grid gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-2xl bg-[#25D366] px-6 py-4 text-center text-base font-black text-white shadow-lg transition hover:scale-[1.02]"
                  >
                    {t.hero.sendWhatsApp}
                  </a>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowRequest(false);
                    }}
                    className="rounded-2xl border border-white/30 px-6 py-3 text-base font-black text-white transition hover:bg-white/10"
                  >
                    {t.hero.back}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
