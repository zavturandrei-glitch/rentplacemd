"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ownersPath } from "@/lib/ownersContent";
import type { Language } from "@/locales/translations";

type CardKey = "quick" | "catalog" | "about" | "owners" | "guide" | "events" | "rules" | "transfer";
type CardCopy = { title: string; text: string; alt: string };

const copyByLanguage: Record<
  Language,
  { title: string; close: string; cards: Record<CardKey, CardCopy> }
> = {
  ru: {
    title: "Всё нужное — в одном месте",
    close: "Закрыть",
    cards: {
      quick: { title: "Подобрать квартиру в один клик", text: "Напишите даты и число гостей", alt: "Современная спальня в квартире RentPlace" },
      catalog: { title: "Все квартиры", text: "Открыть полный каталог", alt: "Современная кухня в квартире RentPlace" },
      about: { title: "О нас", text: "Кто мы, что такое RentPlace и как мы работаем", alt: "Светлая спальня в квартире RentPlace" },
      owners: { title: "Передать квартиру в управление", text: "Для владельцев квартир · управление и сотрудничество", alt: "Премиальный интерьер квартиры RentPlace" },
      guide: { title: "Гид по Кишинёву", text: "Места и идеи для поездки", alt: "Дневной вид центра Кишинёва и Арки Победы" },
      events: { title: "Календарь событий", text: "Концерты, фестивали и главные события города", alt: "Концертная сцена с ярким светом и публикой" },
      rules: { title: "Правила заселения", text: "Всё важное до приезда, при заселении и выезде", alt: "Ключи во входной двери современной квартиры" },
      transfer: { title: "Трансфер", text: "Комфортный трансфер из аэропорта до квартиры", alt: "Peugeot 3008 для трансфера RentPlace" },
    },
  },
  ro: {
    title: "Tot ce ai nevoie, într-un singur loc",
    close: "Închide",
    cards: {
      quick: { title: "Găsește apartamentul dintr-un click", text: "Trimite datele și numărul de oaspeți", alt: "Dormitor modern într-un apartament RentPlace" },
      catalog: { title: "Toate apartamentele", text: "Deschide catalogul complet", alt: "Bucătărie modernă într-un apartament RentPlace" },
      about: { title: "Despre noi", text: "Cine suntem, ce este RentPlace și cum lucrăm", alt: "Dormitor luminos într-un apartament RentPlace" },
      owners: { title: "Încredințează apartamentul spre administrare", text: "Administrare și colaborare pentru proprietari", alt: "Interior premium într-un apartament RentPlace" },
      guide: { title: "Ghidul Chișinăului", text: "Locuri și idei pentru călătorie", alt: "Vedere de zi a centrului Chișinăului și Arcului de Triumf" },
      events: { title: "Calendar de evenimente", text: "Concerte, festivaluri și evenimentele importante ale orașului", alt: "Scenă de concert cu lumini vii și public" },
      rules: { title: "Reguli de cazare", text: "Tot ce contează înainte de sosire, la cazare și plecare", alt: "Chei în ușa de intrare a unui apartament modern" },
      transfer: { title: "Transfer", text: "Transfer confortabil de la aeroport la apartament", alt: "Peugeot 3008 pentru transferul RentPlace" },
    },
  },
  en: {
    title: "Everything you need, in one place",
    close: "Close",
    cards: {
      quick: { title: "Find an apartment in one click", text: "Send your dates and guest count", alt: "Modern bedroom in a RentPlace apartment" },
      catalog: { title: "All apartments", text: "Open the full catalogue", alt: "Modern kitchen in a RentPlace apartment" },
      about: { title: "About us", text: "Who we are, what RentPlace is and how we work", alt: "Bright bedroom in a RentPlace apartment" },
      owners: { title: "Put your apartment under management", text: "Management and partnership for apartment owners", alt: "Premium RentPlace apartment interior" },
      guide: { title: "Chișinău guide", text: "Places and ideas for your trip", alt: "Daytime view of central Chișinău and the Triumphal Arch" },
      events: { title: "Events calendar", text: "Concerts, festivals and the city's main events", alt: "Concert stage with vibrant lights and an audience" },
      rules: { title: "Check-in rules", text: "What matters before arrival, at check-in and departure", alt: "Keys in the entrance door of a modern apartment" },
      transfer: { title: "Transfer", text: "Comfortable airport-to-apartment transfer", alt: "Peugeot 3008 used for RentPlace transfers" },
    },
  },
  uk: {
    title: "Усе потрібне — в одному місці",
    close: "Закрити",
    cards: {
      quick: { title: "Підібрати квартиру в один клік", text: "Надішліть дати та кількість гостей", alt: "Сучасна спальня у квартирі RentPlace" },
      catalog: { title: "Усі квартири", text: "Відкрити повний каталог", alt: "Сучасна кухня у квартирі RentPlace" },
      about: { title: "Про нас", text: "Хто ми, що таке RentPlace і як ми працюємо", alt: "Світла спальня у квартирі RentPlace" },
      owners: { title: "Передати квартиру в управління", text: "Управління та співпраця для власників", alt: "Преміальний інтер’єр квартири RentPlace" },
      guide: { title: "Гід по Кишиневу", text: "Місця та ідеї для подорожі", alt: "Денний вид центру Кишинева та Тріумфальної арки" },
      events: { title: "Календар подій", text: "Концерти, фестивалі та головні події міста", alt: "Концертна сцена з яскравим світлом і публікою" },
      rules: { title: "Правила заселення", text: "Усе важливе до приїзду, під час заселення та виїзду", alt: "Ключі у вхідних дверях сучасної квартири" },
      transfer: { title: "Трансфер", text: "Комфортний трансфер з аеропорту до квартири", alt: "Peugeot 3008 для трансферу RentPlace" },
    },
  },
  cs: {
    title: "Vše potřebné na jednom místě",
    close: "Zavřít",
    cards: {
      quick: { title: "Vybrat apartmán jedním kliknutím", text: "Pošlete termín a počet hostů", alt: "Moderní ložnice v apartmánu RentPlace" },
      catalog: { title: "Všechny apartmány", text: "Otevřít celý katalog", alt: "Moderní kuchyně v apartmánu RentPlace" },
      about: { title: "O nás", text: "Kdo jsme, co je RentPlace a jak pracujeme", alt: "Světlá ložnice v apartmánu RentPlace" },
      owners: { title: "Svěřit apartmán do správy", text: "Správa a spolupráce pro majitele apartmánů", alt: "Prémiový interiér apartmánu RentPlace" },
      guide: { title: "Průvodce Kišiněvem", text: "Místa a tipy na cestu", alt: "Denní pohled na centrum Kišiněva a Vítězný oblouk" },
      events: { title: "Kalendář akcí", text: "Koncerty, festivaly a hlavní akce ve městě", alt: "Koncertní pódium s pestrými světly a publikem" },
      rules: { title: "Pravidla ubytování", text: "Vše důležité před příjezdem, při ubytování a odjezdu", alt: "Klíče ve vstupních dveřích moderního apartmánu" },
      transfer: { title: "Transfer", text: "Pohodlný transfer z letiště k apartmánu", alt: "Peugeot 3008 pro transfer RentPlace" },
    },
  },
};

const cardDefinitions: Array<{
  key: CardKey;
  href?: string;
  image: string;
  position?: string;
  tone: string;
  textTone: string;
}> = [
  { key: "quick", image: "/apartments/coca-15-204/1.jpg", position: "center 57%", tone: "border-[#F3549C]/55 bg-[#D4146F]", textTone: "text-white" },
  { key: "catalog", href: "/apartments", image: "/apartments/mihai-eminescu-76-me-76/1.jpg", tone: "border-[#FFE46C]/70 bg-[#FFD21F]", textTone: "text-[#07111F]" },
  { key: "about", href: "/about", image: "/service-pages/about-apartment.webp", tone: "border-[#64E590]/55 bg-[#25D366]", textTone: "text-[#062514]" },
  { key: "owners", href: ownersPath, image: "/apartments/coca-15-203/1.jpg", tone: "border-[#A99BFF]/55 bg-[#7360F2]", textTone: "text-white" },
  { key: "guide", href: "/chisinau-guide", image: "/guide/events.webp", position: "center 60%", tone: "border-[#4FC4CF]/45 bg-[#137C8B]", textTone: "text-white" },
  { key: "events", href: "/events", image: "/service-pages/events-concert.webp", position: "center 55%", tone: "border-[#7198D1]/50 bg-[#315C9C]", textTone: "text-white" },
  { key: "rules", href: "/check-in-rules", image: "/service-pages/check-in-keys.webp", position: "center 48%", tone: "border-[#D47E69]/45 bg-[#A24F3D]", textTone: "text-white" },
  { key: "transfer", href: "/transfer", image: "/service-pages/transfer-city.webp", tone: "border-[#B49A55]/50 bg-[#846E35]", textTone: "text-white" },
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
        <h2 className="mb-3 text-xl font-black tracking-[-0.025em] text-white sm:mb-5 sm:text-3xl">
          {copy.title}
        </h2>
        <nav className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" aria-label={copy.title}>
          {cardDefinitions.map((card) => {
            const cardCopy = copy.cards[card.key];
            const content = (
              <>
                <span className="relative block h-[88px] shrink-0 overflow-hidden sm:h-[94px]">
                  <Image
                    src={card.image}
                    alt={cardCopy.alt}
                    fill
                    sizes="(min-width: 1024px) 276px, (min-width: 640px) 47vw, 46vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.035]"
                    style={{ objectPosition: card.position ?? "center" }}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/5" />
                </span>
                <span className="flex min-h-0 flex-1 flex-col px-3 py-2.5 sm:px-4 sm:py-3">
                  <strong className="text-[13px] font-black leading-[1.06] tracking-[-0.02em] min-[390px]:text-[14px] sm:text-[16px]">
                    {cardCopy.title}
                  </strong>
                  <span className="mt-1 line-clamp-4 text-[9.5px] font-semibold leading-[1.2] opacity-80 min-[390px]:text-[10px] sm:text-[11px]">
                    {cardCopy.text}
                  </span>
                </span>
              </>
            );
            const classes = `group flex h-[198px] min-w-0 flex-col overflow-hidden rounded-[20px] border shadow-[0_12px_32px_rgba(0,0,0,.2)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[.985] sm:h-[214px] ${card.tone} ${card.textTone}`;

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
        <div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-[#020611]/75 p-3 backdrop-blur-sm sm:items-center"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowRequest(false);
          }}
        >
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
