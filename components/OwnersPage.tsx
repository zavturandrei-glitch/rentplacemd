"use client";

import { useLanguage } from "@/context/LanguageContext";
import {
  getOwnersWhatsappHref,
  ownersContent,
  ownersPhoneHref,
  ownersPhoneLabel,
} from "@/lib/ownersContent";

export default function OwnersPage() {
  const { language } = useLanguage();
  const copy = ownersContent[language];
  const whatsappHref = getOwnersWhatsappHref(language);

  return (
    <>
      <section className="bg-[#07111f] px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff4b9d]">{copy.hero.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-black leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            {copy.hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-xl sm:leading-8">{copy.hero.text}</p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#d4146f] px-5 text-sm font-black text-white shadow-lg shadow-[#d4146f]/20 transition hover:-translate-y-0.5 hover:bg-[#e11979]"
          >
            {copy.hero.button}
          </a>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d4146f]">{copy.services.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#07111f] sm:text-4xl">{copy.services.title}</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">{copy.services.intro}</p>
          </div>
          <ol className="mt-8 border-y border-[#07111f]/12 lg:mt-0">
            {copy.services.items.map((item, index) => (
              <li key={item} className="grid grid-cols-[2.2rem_1fr] gap-3 border-b border-[#07111f]/10 py-4 last:border-b-0">
                <span className="text-xs font-black tabular-nums text-[#d4146f]">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-semibold leading-6 text-[#07111f]">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d4146f]">{copy.steps.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#07111f] sm:text-4xl">{copy.steps.title}</h2>
          <ol className="mt-8 grid border-t border-[#07111f]/12 md:grid-cols-3">
            {copy.steps.items.map((step, index) => (
              <li key={step.title} className="border-b border-[#07111f]/12 py-6 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <span className="text-xs font-black text-[#d4146f]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-black text-[#07111f]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#efeee9] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[22px] bg-white px-5 py-7 shadow-[0_12px_34px_rgba(15,23,42,0.07)] ring-1 ring-black/5 sm:rounded-[26px] sm:px-8 sm:py-9">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d4146f]">{copy.fit.eyebrow}</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.035em] text-[#07111f] sm:text-4xl">{copy.fit.title}</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{copy.fit.text}</p>
        </div>
      </section>

      <section className="bg-[#07111f] px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl sm:flex sm:items-end sm:justify-between sm:gap-10">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff4b9d]">{copy.contact.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl">{copy.contact.title}</h2>
            <p className="mt-4 text-base leading-7 text-white/68">{copy.contact.text}</p>
          </div>
          <div className="mt-7 grid gap-3 sm:mt-0 sm:min-w-64">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#25D366] px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:brightness-105"
            >
              {copy.contact.whatsapp}
            </a>
            <a
              href={ownersPhoneHref}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-5 text-sm font-black text-white transition hover:border-white/50"
            >
              {copy.contact.call} · {ownersPhoneLabel}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
