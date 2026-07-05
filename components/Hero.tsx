"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getApartmentPathById } from "@/lib/apartments";

export default function Hero() {
  const { t } = useLanguage();
  const [showRequest, setShowRequest] = useState(false);
  const [message, setMessage] = useState("");
  const [apartmentId, setApartmentId] = useState("");

  const whatsappText = message.trim() || t.hero.whatsappDefault;

  const whatsappLink = `https://wa.me/37369990190?text=${encodeURIComponent(
    whatsappText
  )}`;

  function scrollToApartments() {
    const section = document.getElementById("today-free");

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.location.href = "/#today-free";
  }

  function cleanApartmentId(value: string) {
    return value
      .toLowerCase()
      .replace("id", "")
      .replace("№", "")
      .replace("#", "")
      .replaceAll(" ", "")
      .trim();
  }

  function openApartmentById() {
    const id = cleanApartmentId(apartmentId);

    const apartmentLink = getApartmentPathById(id);

    if (apartmentLink) {
      window.location.href = apartmentLink;
      return;
    }

    alert(t.hero.notFound);
  }

  return (
    <section className="relative overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/main.jpg')" }}
      />

      <div className="absolute inset-0 bg-black/50 sm:bg-black/45" />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-7 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
        <div className="mx-auto mb-5 max-w-5xl text-center sm:mb-8">
          <h1 className="mx-auto max-w-[360px] text-[30px] font-black leading-[1.12] tracking-tight text-white sm:max-w-5xl sm:text-5xl lg:text-6xl">
            {t.hero.title}
          </h1>

          <p className="mx-auto mt-3 max-w-[340px] text-[17px] font-bold leading-6 text-white/90 sm:mt-4 sm:max-w-4xl sm:text-2xl sm:leading-8">
            {t.hero.subtitle}
          </p>
        </div>

        <div className="relative z-10 mx-auto grid max-w-6xl gap-4 sm:gap-5 lg:grid-cols-3">
          <div
            onClick={() => !showRequest && setShowRequest(true)}
            className="cursor-pointer rounded-[1.6rem] border border-white/25 bg-[#d4146f]/75 p-5 text-white shadow-2xl backdrop-blur-xl transition hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_25px_80px_rgba(212,20,111,0.35)] sm:rounded-[2rem] sm:p-6"
          >
            {!showRequest ? (
              <>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 text-2xl shadow-lg sm:h-12 sm:w-12">
                  🔑
                </div>

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
                  className="mt-4 w-full rounded-2xl bg-white px-6 py-3.5 text-lg font-black text-[#d4146f] shadow-xl transition hover:scale-105 sm:mt-5 sm:py-4"
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
                    className="rounded-2xl bg-[#25D366] px-6 py-4 text-center text-base font-black text-white shadow-lg transition hover:scale-105"
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

          <button
            type="button"
            onClick={scrollToApartments}
            className="cursor-pointer rounded-[1.75rem] border border-white/25 bg-[#ffd21f]/80 p-5 text-left text-black shadow-2xl backdrop-blur-xl transition hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_25px_80px_rgba(255,210,31,0.35)] sm:rounded-[2rem] sm:p-6"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/35 text-2xl shadow-lg sm:h-12 sm:w-12">
              🏠
            </div>

            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-[#d4146f]">
              {t.hero.catalogLabel}
            </p>

            <h2 className="text-[24px] font-black leading-tight sm:text-2xl">
              {t.hero.catalogTitle}
            </h2>

            <p className="mt-3 text-base font-semibold leading-6 text-black/75 sm:mt-4">
              {t.hero.catalogText}
            </p>

            <div className="mt-4 rounded-2xl bg-black px-6 py-3.5 text-center text-lg font-black text-white shadow-xl transition hover:scale-105 sm:mt-5 sm:py-4">
              {t.hero.openCatalog}
            </div>
          </button>

          <div className="cursor-pointer rounded-[1.75rem] border border-white/25 bg-white/25 p-5 text-white shadow-2xl backdrop-blur-xl transition hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_25px_80px_rgba(255,255,255,0.25)] sm:rounded-[2rem] sm:p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/25 text-2xl shadow-lg sm:h-12 sm:w-12">
              🆔
            </div>

            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-[#ffd21f]">
              {t.hero.idLabel}
            </p>

            <h2 className="text-[24px] font-black leading-tight sm:text-2xl">
              {t.hero.idTitle}
            </h2>

            <p className="mt-3 text-base font-semibold leading-6 text-white/90 sm:mt-4">
              {t.hero.idText}
            </p>

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

            <p className="mt-4 text-sm font-bold text-white/75">
              {t.hero.availableIds}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
