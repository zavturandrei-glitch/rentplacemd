"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ownersPath } from "@/lib/ownersContent";
import type { Language } from "@/locales/translations";

type CardKey = "quick" | "catalog" | "about" | "owners" | "guide" | "events" | "rules" | "transfer";

const copyByLanguage: Record<
  Language,
  {
    title: string;
    close: string;
    cards: Record<CardKey, { title: string; text: string; icon: string }>;
  }
> = {
  ru: {
    title: "Всё нужное — в одном месте",
    close: "Закрыть",
    cards: {
      quick: { title: "Подобрать квартиру в один клик", text: "Напишите даты и число гостей", icon: "↗" },
      catalog: { title: "Все квартиры", text: "Открыть полный каталог", icon: "⌂" },
      about: { title: "О нас", text: "Как работает RentPlaceMD", icon: "i" },
      owners: { title: "Передать квартиру в управление", text: "Для владельцев квартир", icon: "◇" },
      guide: { title: "Гид по Кишинёву", text: "Места и идеи для поездки", icon: "◎" },
      events: { title: "Календарь событий", text: "Концерты и фестивали", icon: "◫" },
      rules: { title: "Правила заселения", text: "До приезда и при выезде", icon: "✓" },
      transfer: { title: "Трансфер", text: "Из аэропорта до квартиры", icon: "→" },
    },
  },
  ro: {
    title: "Tot ce ai nevoie, într-un singur loc",
    close: "Închide",
    cards: {
      quick: { title: "Găsește apartamentul dintr-un click", text: "Trimite datele și numărul de oaspeți", icon: "↗" },
      catalog: { title: "Toate apartamentele", text: "Deschide catalogul complet", icon: "⌂" },
      about: { title: "Despre noi", text: "Cum funcționează RentPlaceMD", icon: "i" },
      owners: { title: "Încredințează apartamentul spre administrare", text: "Pentru proprietari", icon: "◇" },
      guide: { title: "Ghidul Chișinăului", text: "Locuri și idei de călătorie", icon: "◎" },
      events: { title: "Calendar de evenimente", text: "Concerte și festivaluri", icon: "◫" },
      rules: { title: "Reguli de cazare", text: "Înainte de sosire și plecare", icon: "✓" },
      transfer: { title: "Transfer", text: "De la aeroport la apartament", icon: "→" },
    },
  },
  en: {
    title: "Everything you need, in one place",
    close: "Close",
    cards: {
      quick: { title: "Find an apartment in one click", text: "Send your dates and guest count", icon: "↗" },
      catalog: { title: "All apartments", text: "Open the full catalogue", icon: "⌂" },
      about: { title: "About us", text: "How RentPlaceMD works", icon: "i" },
      owners: { title: "Put your apartment under management", text: "For apartment owners", icon: "◇" },
      guide: { title: "Chișinău guide", text: "Places and trip ideas", icon: "◎" },
      events: { title: "Events calendar", text: "Concerts and festivals", icon: "◫" },
      rules: { title: "Check-in rules", text: "Before arrival and departure", icon: "✓" },
      transfer: { title: "Transfer", text: "Airport to apartment", icon: "→" },
    },
  },
  uk: {
    title: "Усе потрібне — в одному місці",
    close: "Закрити",
    cards: {
      quick: { title: "Підібрати квартиру в один клік", text: "Надішліть дати та кількість гостей", icon: "↗" },
      catalog: { title: "Усі квартири", text: "Відкрити повний каталог", icon: "⌂" },
      about: { title: "Про нас", text: "Як працює RentPlaceMD", icon: "i" },
      owners: { title: "Передати квартиру в управління", text: "Для власників квартир", icon: "◇" },
      guide: { title: "Гід по Кишиневу", text: "Місця та ідеї для подорожі", icon: "◎" },
      events: { title: "Календар подій", text: "Концерти та фестивалі", icon: "◫" },
      rules: { title: "Правила заселення", text: "До приїзду та під час виїзду", icon: "✓" },
      transfer: { title: "Трансфер", text: "З аеропорту до квартири", icon: "→" },
    },
  },
  cs: {
    title: "Vše potřebné na jednom místě",
    close: "Zavřít",
    cards: {
      quick: { title: "Vybrat apartmán jedním kliknutím", text: "Pošlete termín a počet hostů", icon: "↗" },
      catalog: { title: "Všechny apartmány", text: "Otevřít celý katalog", icon: "⌂" },
      about: { title: "O nás", text: "Jak funguje RentPlaceMD", icon: "i" },
      owners: { title: "Svěřit apartmán do správy", text: "Pro majitele apartmánů", icon: "◇" },
      guide: { title: "Průvodce Kišiněvem", text: "Místa a tipy na cestu", icon: "◎" },
      events: { title: "Kalendář akcí", text: "Koncerty a festivaly", icon: "◫" },
      rules: { title: "Pravidla ubytování", text: "Před příjezdem a odjezdem", icon: "✓" },
      transfer: { title: "Transfer", text: "Z letiště k apartmánu", icon: "→" },
    },
  },
};

const cardDefinitions: Array<{
  key: CardKey;
  href?: string;
  tone: string;
  textTone: string;
}> = [
  { key: "quick", tone: "border-[#ff4fa3]/50 bg-[#d4146f]", textTone: "text-white" },
  { key: "catalog", href: "/apartments", tone: "border-[#ffe670]/60 bg-[#ffd21f]", textTone: "text-[#07111f]" },
  { key: "about", href: "/about", tone: "border-[#57e68b]/50 bg-[#25a95b]", textTone: "text-white" },
  { key: "owners", href: ownersPath, tone: "border-[#9d8cff]/55 bg-[#6554d9]", textTone: "text-white" },
  { key: "guide", href: "/chisinau-guide", tone: "border-[#61cfff]/50 bg-[#167eb2]", textTone: "text-white" },
  { key: "events", href: "/events", tone: "border-[#75d7ff]/45 bg-[#126b9a]", textTone: "text-white" },
  { key: "rules", href: "/check-in-rules", tone: "border-white/18 bg-[#111e31]", textTone: "text-white" },
  { key: "transfer", href: "/transfer", tone: "border-white/18 bg-[#111e31]", textTone: "text-white" },
];

export default function HomeNavigation() {
  const { language, t } = useLanguage();
  const copy = copyByLanguage[language];
  const [showRequest, setShowRequest] = useState(false);
  const [message, setMessage] = useState("");
  const whatsappLink = `https://wa.me/37369990190?text=${encodeURIComponent(
    message.trim() || t.hero.whatsappDefault,
  )}`;

  return (
    <section id="quick-pick" className="bg-[#07111f] px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-xl font-black tracking-[-0.025em] text-white sm:mb-6 sm:text-3xl">
          {copy.title}
        </h2>
        <nav className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" aria-label={copy.title}>
          {cardDefinitions.map((card) => {
            const cardCopy = copy.cards[card.key];
            const content = (
              <>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-current/15 bg-black/10 text-xl font-black" aria-hidden="true">
                  {cardCopy.icon}
                </span>
                <strong className="mt-auto text-[15px] font-black leading-[1.08] tracking-[-0.02em] sm:text-lg">
                  {cardCopy.title}
                </strong>
                <span className="mt-1.5 line-clamp-2 text-[11px] font-semibold leading-4 opacity-75 sm:text-xs">
                  {cardCopy.text}
                </span>
              </>
            );
            const classes = `flex h-[148px] min-w-0 flex-col rounded-[20px] border p-3.5 shadow-[0_12px_32px_rgba(0,0,0,.18)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[.985] sm:h-[170px] sm:p-5 ${card.tone} ${card.textTone}`;

            return card.key === "quick" ? (
              <button key={card.key} type="button" onClick={() => setShowRequest(true)} className={`${classes} text-left`}>
                {content}
              </button>
            ) : (
              <Link key={card.key} href={card.href!} className={classes}>
                {content}
              </Link>
            );
          })}
        </nav>
      </div>

      {showRequest ? (
        <div className="fixed inset-0 z-[90] flex items-end justify-center bg-[#020611]/75 p-3 backdrop-blur-sm sm:items-center" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setShowRequest(false);
        }}>
          <section role="dialog" aria-modal="true" aria-labelledby="quick-request-title" className="w-full max-w-xl rounded-[24px] border border-white/15 bg-[#101c2f] p-5 text-white shadow-2xl sm:p-7">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff83b9]">{t.hero.requestLabel}</p>
            <h2 id="quick-request-title" className="mt-2 text-2xl font-black">{t.hero.requestTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-white/70">{t.hero.requestText}</p>
            <textarea
              autoFocus
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={t.hero.textareaPlaceholder}
              className="mt-4 min-h-24 w-full resize-none rounded-2xl border border-white/15 bg-white/8 p-4 text-base font-semibold text-white outline-none placeholder:text-white/45 focus:border-[#ff4fa3]"
            />
            <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center rounded-xl bg-[#25D366] px-4 text-center text-sm font-black text-white">
                {t.hero.sendWhatsApp}
              </a>
              <button type="button" onClick={() => setShowRequest(false)} className="min-h-12 rounded-xl border border-white/15 px-4 text-sm font-black">
                {copy.close}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </section>
  );
}
