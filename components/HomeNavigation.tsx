"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/locales/translations";

type CardKey = "about" | "apartments" | "pick" | "rules" | "transfer" | "guide";

const sharedCards: Array<{
  key: CardKey;
  href: string;
  image: string;
  position: string;
  tone: string;
}> = [
  { key: "about", href: "/about", image: "/common/building.png", position: "50% 58%", tone: "bg-[#fff2cf] text-[#07111f]" },
  { key: "apartments", href: "/apartments", image: "/apartments/izmail88-3/D4S_2531.jpg", position: "50% 52%", tone: "bg-[#f7efe3] text-[#07111f]" },
  { key: "pick", href: "/#quick-pick", image: "/apartments/izmail88-5/D4S_2602.jpg", position: "50% 52%", tone: "bg-[#d4146f] text-white" },
  { key: "rules", href: "/check-in-rules", image: "/guest-essentials/check-in-keys.png", position: "64% 50%", tone: "bg-[#07111f] text-white" },
  { key: "transfer", href: "/transfer", image: "/guest-essentials/airport-transfer.png", position: "58% 50%", tone: "bg-[#fffaf0] text-[#07111f]" },
  { key: "guide", href: "/chisinau-guide", image: "/main.jpg", position: "50% 50%", tone: "bg-[#ffd21f] text-[#07111f]" },
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
      about: { title: "О нас", text: "Кто мы и как помогаем гостям.", alt: "Фасад жилого комплекса Измаил 88" },
      apartments: { title: "Все квартиры", text: "Каталог с категориями и ценами.", alt: "Интерьер квартиры RentPlaceMD" },
      pick: { title: "Подобрать квартиру в один клик", text: "Напишите даты и количество гостей.", alt: "Уютная квартира RentPlaceMD" },
      rules: { title: "Правила заселения", text: "Заезд, выезд, документы и оплата.", alt: "Дверь и ключи квартиры" },
      transfer: { title: "Трансфер", text: "Дорога из аэропорта к квартире.", alt: "Автомобиль для трансфера" },
      guide: { title: "Гид по Кишинёву", text: "Где остановиться и что учесть.", alt: "Центр Кишинёва" },
    },
  },
  ro: {
    label: "Navigare",
    title: "Alege sectiunea dorita",
    cards: {
      about: { title: "Despre noi", text: "Cine suntem si cum ajutam oaspetii.", alt: "Fatada complexului Ismail 88" },
      apartments: { title: "Toate apartamentele", text: "Catalog cu categorii si preturi.", alt: "Interior de apartament RentPlaceMD" },
      pick: { title: "Alege apartamentul dintr-un click", text: "Scrie datele si numarul de oaspeti.", alt: "Apartament confortabil RentPlaceMD" },
      rules: { title: "Reguli de cazare", text: "Sosire, plecare, documente si plata.", alt: "Usa si chei de apartament" },
      transfer: { title: "Transfer", text: "Drumul de la aeroport la apartament.", alt: "Masina pentru transfer" },
      guide: { title: "Ghid Chisinau", text: "Unde sa stai si ce sa verifici.", alt: "Centrul Chisinaului" },
    },
  },
  en: {
    label: "Navigation",
    title: "Choose a section",
    cards: {
      about: { title: "About us", text: "Who we are and how we help guests.", alt: "Ismail 88 residential building facade" },
      apartments: { title: "All apartments", text: "Catalog with classes and prices.", alt: "RentPlaceMD apartment interior" },
      pick: { title: "Find an apartment in one click", text: "Send dates and number of guests.", alt: "Comfortable RentPlaceMD apartment" },
      rules: { title: "Check-in rules", text: "Arrival, departure, documents and payment.", alt: "Apartment door and keys" },
      transfer: { title: "Transfer", text: "From the airport to the apartment.", alt: "Transfer vehicle" },
      guide: { title: "Chisinau guide", text: "Where to stay and what to check.", alt: "Central Chisinau" },
    },
  },
  uk: {
    label: "Навігація",
    title: "Оберіть потрібний розділ",
    cards: {
      about: { title: "Про нас", text: "Хто ми і як допомагаємо гостям.", alt: "Фасад комплексу Ізмаїл 88" },
      apartments: { title: "Усі квартири", text: "Каталог з категоріями та цінами.", alt: "Інтер'єр квартири RentPlaceMD" },
      pick: { title: "Підібрати квартиру в один клік", text: "Напишіть дати та кількість гостей.", alt: "Затишна квартира RentPlaceMD" },
      rules: { title: "Правила заселення", text: "Заїзд, виїзд, документи та оплата.", alt: "Двері та ключі квартири" },
      transfer: { title: "Трансфер", text: "Дорога з аеропорту до квартири.", alt: "Автомобіль для трансферу" },
      guide: { title: "Гід по Кишиневу", text: "Де зупинитися і що перевірити.", alt: "Центр Кишинева" },
    },
  },
  cs: {
    label: "Navigace",
    title: "Vyberte sekci",
    cards: {
      about: { title: "O nas", text: "Kdo jsme a jak pomahame hostum.", alt: "Fasada komplexu Ismail 88" },
      apartments: { title: "Vsechny apartmany", text: "Katalog s kategoriemi a cenami.", alt: "Interier apartmanu RentPlaceMD" },
      pick: { title: "Vybrat apartman jednim kliknutim", text: "Poslete termin a pocet hostu.", alt: "Pohodlny apartman RentPlaceMD" },
      rules: { title: "Pravidla ubytovani", text: "Prijezd, odjezd, doklady a platba.", alt: "Dvere a klice apartmanu" },
      transfer: { title: "Transfer", text: "Z letiste k apartmanu.", alt: "Vozidlo pro transfer" },
      guide: { title: "Pruvodce Kisinevem", text: "Kde bydlet a co overit.", alt: "Centrum Kisineva" },
    },
  },
};

export default function HomeNavigation() {
  const { language } = useLanguage();
  const text = textByLanguage[language];

  return (
    <section id="apartments" className="bg-[#fffaf0] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 sm:mb-7">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d4146f]">
            {text.label}
          </p>
          <h2 className="mt-2 text-2xl font-black leading-tight text-[#07111f] sm:text-4xl">
            {text.title}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {sharedCards.map((card) => {
            const cardText = text.cards[card.key];

            return (
              <Link
                key={card.key}
                href={card.href}
                className="group grid h-[207px] grid-rows-[82px_1fr] overflow-hidden rounded-[20px] bg-white shadow-[0_12px_34px_rgba(15,23,42,0.08)] ring-1 ring-black/5 transition duration-200 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_22px_54px_rgba(15,23,42,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f] active:scale-[0.985] sm:h-[198px] sm:grid-rows-[96px_1fr] sm:rounded-[24px]"
                aria-label={cardText.title}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={card.image}
                    alt={cardText.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    quality={75}
                    className="object-cover transition duration-300 ease-out group-hover:scale-[1.04]"
                    style={{ objectPosition: card.position }}
                  />
                </div>
                <div className={`${card.tone} flex min-h-0 flex-col justify-center p-3 sm:p-5`}>
                  <h3 className="text-[15px] font-black leading-[1.12] sm:text-2xl">
                    {cardText.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[12px] font-semibold leading-4 opacity-80 sm:text-sm sm:leading-5">
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
