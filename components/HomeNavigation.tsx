"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/locales/translations";

type CardKey = "about" | "rules" | "transfer" | "guide";

const sharedCards: Array<{
  key: CardKey;
  href: string;
  image: string;
  position: string;
  tone: string;
}> = [
  {
    key: "about",
    href: "/about",
    image: "/service-pages/about-apartment.webp",
    position: "50% 50%",
    tone: "bg-white text-[#07111f]",
  },
  {
    key: "rules",
    href: "/check-in-rules",
    image: "/service-pages/check-in-ready.webp",
    position: "50% 50%",
    tone: "bg-white text-[#07111f]",
  },
  {
    key: "transfer",
    href: "/transfer",
    image: "/service-pages/transfer-city.webp",
    position: "50% 50%",
    tone: "bg-white text-[#07111f]",
  },
  {
    key: "guide",
    href: "/chisinau-guide",
    image: "/main.jpg",
    position: "50% 50%",
    tone: "bg-[#ffd21f] text-[#07111f]",
  },
];

const textByLanguage: Record<
  Language,
  {
    label: string;
    title: string;
    cards: Record<CardKey, { title: string; text: string; alt: string }>;
  }
> = {
  ru: {
    label: "Навигация",
    title: "Выберите нужный раздел",
    cards: {
      about: {
        title: "О нас",
        text: "Как устроен сервис и чем мы помогаем гостям.",
        alt: "Светлая спальня в квартире RentPlaceMD",
      },
      rules: {
        title: "Правила заселения",
        text: "Что согласовать до приезда и при выезде.",
        alt: "Подготовленная к приезду гостей спальня",
      },
      transfer: {
        title: "Трансфер",
        text: "Встреча в аэропорту и поездка до квартиры.",
        alt: "Графитовый Peugeot 3008 в городской поездке",
      },
      guide: {
        title: "Гид по Кишинёву",
        text: "Где остановиться и что учесть.",
        alt: "Центр Кишинёва",
      },
    },
  },
  ro: {
    label: "Navigare",
    title: "Alege secțiunea dorită",
    cards: {
      about: {
        title: "Despre noi",
        text: "Cum funcționează serviciul și cum ajutăm oaspeții.",
        alt: "Dormitor luminos într-un apartament RentPlaceMD",
      },
      rules: {
        title: "Reguli de cazare",
        text: "Ce coordonați înainte de sosire și la plecare.",
        alt: "Dormitor pregătit pentru sosirea oaspeților",
      },
      transfer: {
        title: "Transfer",
        text: "Drumul de la aeroport la apartament.",
        alt: "Peugeot 3008 grafit într-o călătorie urbană",
      },
      guide: {
        title: "Ghid Chișinău",
        text: "Unde să stai și ce să verifici.",
        alt: "Centrul Chișinăului",
      },
    },
  },
  en: {
    label: "Navigation",
    title: "Choose a section",
    cards: {
      about: {
        title: "About us",
        text: "How the service works and supports each stay.",
        alt: "Bright bedroom in a RentPlaceMD apartment",
      },
      rules: {
        title: "Check-in rules",
        text: "What to agree before arrival and departure.",
        alt: "Guest-ready apartment bedroom",
      },
      transfer: {
        title: "Transfer",
        text: "From the airport to the apartment.",
        alt: "Graphite Peugeot 3008 travelling through the city",
      },
      guide: {
        title: "Chisinau guide",
        text: "Where to stay and what to check.",
        alt: "Central Chisinau",
      },
    },
  },
  uk: {
    label: "Навігація",
    title: "Оберіть потрібний розділ",
    cards: {
      about: {
        title: "Про нас",
        text: "Як працює сервіс і чим ми допомагаємо гостям.",
        alt: "Світла спальня у квартирі RentPlaceMD",
      },
      rules: {
        title: "Правила заселення",
        text: "Що погодити до приїзду та під час виїзду.",
        alt: "Підготовлена до приїзду гостей спальня",
      },
      transfer: {
        title: "Трансфер",
        text: "Дорога з аеропорту до квартири.",
        alt: "Графітовий Peugeot 3008 під час міської поїздки",
      },
      guide: {
        title: "Гід по Кишиневу",
        text: "Де зупинитися і що перевірити.",
        alt: "Центр Кишинева",
      },
    },
  },
  cs: {
    label: "Navigace",
    title: "Vyberte sekci",
    cards: {
      about: {
        title: "O nás",
        text: "Jak služba funguje a pomáhá hostům.",
        alt: "Světlá ložnice v apartmánu RentPlaceMD",
      },
      rules: {
        title: "Pravidla ubytování",
        text: "Co domluvit před příjezdem a při odjezdu.",
        alt: "Ložnice připravená na příjezd hostů",
      },
      transfer: {
        title: "Transfer",
        text: "Z letiště k apartmánu.",
        alt: "Grafitový Peugeot 3008 během jízdy městem",
      },
      guide: {
        title: "Průvodce Kišiněvem",
        text: "Kde bydlet a co ověřit.",
        alt: "Centrum Kišiněva",
      },
    },
  },
};

export default function HomeNavigation() {
  const { language } = useLanguage();
  const text = textByLanguage[language];

  return (
    <section className="bg-[#efeee9] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 sm:mb-7">
          <p className="text-sm font-semibold text-[#d4146f]">{text.label}</p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.02em] text-[#07111f] sm:text-3xl">
            {text.title}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {sharedCards.map((card) => {
            const cardText = text.cards[card.key];

            return (
              <Link
                key={card.key}
                href={card.href}
                className="group grid h-[210px] min-w-0 grid-rows-[104px_1fr] overflow-hidden rounded-[18px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] ring-1 ring-black/8 transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(15,23,42,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f] active:scale-[0.99] sm:h-[236px] sm:grid-rows-[128px_1fr] sm:rounded-[22px]"
                aria-label={cardText.title}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={card.image}
                    alt={cardText.alt}
                    fill
                    sizes="(min-width: 1024px) 280px, 50vw"
                    quality={75}
                    className="object-cover transition duration-300 ease-out group-hover:scale-[1.04]"
                    style={{ objectPosition: card.position }}
                  />
                </div>
                <div className={`${card.tone} flex min-h-0 flex-col justify-center p-3 sm:p-5`}>
                  <h3 className="text-[15px] font-semibold leading-[1.2] sm:text-xl">
                    {cardText.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[12px] leading-4 text-slate-600 sm:text-sm sm:leading-5">
                    {cardText.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
