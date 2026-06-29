"use client";

import { useEffect, useState } from "react";
import ResponsiveImage from "@/components/ResponsiveImage";

type Lang = "RU" | "RO" | "EN" | "CS" | "UK";

const LANG_STORAGE_KEY = "rentplacemd-language";

const sectionText: Record<
  Lang,
  {
    title: string;
    description: string;
    callButton: string;
    details: string;
    altPrefix: string;
  }
> = {
  RU: {
    title: "Все квартиры",
    description:
      "Квартиры посуточно в центре Кишинёва. Выберите подходящий вариант и уточните доступность на нужные даты.",
    callButton: "Уточнить свободные даты",
    details: "Подробнее",
    altPrefix: "Квартира ID",
  },
  RO: {
    title: "Toate apartamentele",
    description:
      "Apartamente în regim hotelier în centrul Chișinăului. Alegeți varianta potrivită și verificați disponibilitatea pentru datele dorite.",
    callButton: "Verifică datele libere",
    details: "Detalii",
    altPrefix: "Apartament ID",
  },
  EN: {
    title: "All apartments",
    description:
      "Daily rent apartments in the center of Chișinău. Choose the best option and check availability for your dates.",
    callButton: "Check available dates",
    details: "Details",
    altPrefix: "Apartment ID",
  },
  CS: {
    title: "Všechny apartmány",
    description:
      "Apartmány k pronájmu na den v centru Kišiněva. Vyberte si vhodnou možnost a ověřte dostupnost na požadované termíny.",
    callButton: "Ověřit volné termíny",
    details: "Detail",
    altPrefix: "Apartmán ID",
  },
  UK: {
    title: "Усі квартири",
    description:
      "Квартири подобово в центрі Кишинева. Оберіть відповідний варіант і уточніть доступність на потрібні дати.",
    callButton: "Уточнити вільні дати",
    details: "Детальніше",
    altPrefix: "Квартира ID",
  },
};

const apartmentInfo: Record<
  Lang,
  {
    studio: string;
    center: string;
    guests2: string;
    guests3: string;
    guests4: string;
    guests5: string;
    bedrooms2: string;
    lei: string;
    addressTitle: string;
  }
> = {
  RU: {
    studio: "Студия",
    center: "Центр",
    guests2: "до 2 гостей",
    guests3: "до 3 гостей",
    guests4: "до 4 гостей",
    guests5: "до 5 гостей",
    bedrooms2: "2 спальни",
    lei: "лей",
    addressTitle: "Измаил 88",
  },
  RO: {
    studio: "Studio",
    center: "Centru",
    guests2: "până la 2 oaspeți",
    guests3: "până la 3 oaspeți",
    guests4: "până la 4 oaspeți",
    guests5: "până la 5 oaspeți",
    bedrooms2: "2 dormitoare",
    lei: "lei",
    addressTitle: "Ismail 88",
  },
  EN: {
    studio: "Studio",
    center: "Center",
    guests2: "up to 2 guests",
    guests3: "up to 3 guests",
    guests4: "up to 4 guests",
    guests5: "up to 5 guests",
    bedrooms2: "2 bedrooms",
    lei: "MDL",
    addressTitle: "Ismail 88",
  },
  CS: {
    studio: "Studio",
    center: "Centrum",
    guests2: "až 2 hosté",
    guests3: "až 3 hosté",
    guests4: "až 4 hosté",
    guests5: "až 5 hostů",
    bedrooms2: "2 ložnice",
    lei: "lei",
    addressTitle: "Ismail 88",
  },
  UK: {
    studio: "Студія",
    center: "Центр",
    guests2: "до 2 гостей",
    guests3: "до 3 гостей",
    guests4: "до 4 гостей",
    guests5: "до 5 гостей",
    bedrooms2: "2 спальні",
    lei: "лей",
    addressTitle: "Ізмаїл 88",
  },
};

const apartments = [
  {
    id: 10,
    title: "Измаил 88",
    rooms: "1+1",
    guestsKey: "guests4",
    price: 800,
    image: "/apartments/izmail88-10/1.png",
    imagePosition: "42% center",
    link: "/apartment/izmail88-10",
  },
  {
    id: 11,
    title: "Измаил 88",
    rooms: "studio",
    guestsKey: "guests2",
    price: 800,
    image: "/apartments/izmail88-11/1.png",
    link: "/apartment/izmail88-11",
  },
  {
    id: 12,
    title: "Измаил 88",
    rooms: "1+1",
    guestsKey: "guests3",
    price: 800,
    image: "/apartments/izmail88-12/1.png",
    link: "/apartment/izmail88-12",
  },
  {
    id: 13,
    title: "Измаил 88",
    rooms: "2+1",
    guestsKey: "bedrooms2",
    price: 900,
    image: "/apartments/izmail88-13/4.png",
    link: "/apartment/izmail88-13",
  },
  {
    id: 20,
    title: "Измаил 88",
    rooms: "1+1",
    guestsKey: "guests4",
    price: 800,
    image: "/apartments/izmail88-20/2.png",
    link: "/apartment/izmail88-20",
  },
  {
    id: 21,
    title: "Измаил 88",
    rooms: "1+1",
    guestsKey: "guests3",
    price: 800,
    image: "/apartments/izmail88-21/2.png",
    link: "/apartment/izmail88-21",
  },
  {
    id: 22,
    title: "Измаил 88",
    rooms: "studio",
    guestsKey: "guests2",
    price: 800,
    image: "/apartments/izmail88-22/1.png",
    link: "/apartment/izmail88-22",
  },
  {
    id: 23,
    title: "Измаил 88",
    rooms: "studio",
    guestsKey: "guests2",
    price: 800,
    image: "/apartments/izmail88-23/1.png",
    link: "/apartment/izmail88-23",
  },
  {
    id: 37,
    title: "Измаил 88",
    rooms: "1+1",
    guestsKey: "guests4",
    price: 800,
    image: "/apartments/izmail88-37/2.png",
    link: "/apartment/izmail88-37",
  },
  {
    id: 38,
    title: "Измаил 88",
    rooms: "1+1",
    guestsKey: "guests4",
    price: 800,
    image: "/apartments/izmail88-38/2.png",
    link: "/apartment/izmail88-38",
  },
  {
    id: 42,
    title: "Измаил 88",
    rooms: "2+1",
    guestsKey: "guests5",
    price: 1000,
    image: "/apartments/izmail88-42/2.png",
    link: "/apartment/izmail88-42",
  },
  {
    id: 371,
    title: "Измаил 88",
    rooms: "studio",
    guestsKey: "guests2",
    price: 800,
    image: "/apartments/izmail88-371/1.png",
    link: "/apartment/izmail88-371",
  },
] as const;

function getSavedLanguage(): Lang {
  if (typeof window === "undefined") return "RU";
  const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
  const normalizedSaved = saved?.toUpperCase() as Lang | undefined;

  return normalizedSaved && normalizedSaved in sectionText ? normalizedSaved : "RU";
}

function useRentPlaceLanguage() {
  const [language, setLanguage] = useState<Lang>(() => getSavedLanguage());

  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const nextLanguage = customEvent.detail?.toUpperCase() as Lang | undefined;

      if (nextLanguage && nextLanguage in sectionText) {
        setLanguage(nextLanguage);
      }
    };

    window.addEventListener(
      "rentplacemd-language-change",
      handleLanguageChange,
    );
    return () =>
      window.removeEventListener(
        "rentplacemd-language-change",
        handleLanguageChange,
      );
  }, []);

  return language;
}

export default function TodayFree() {
  const language = useRentPlaceLanguage();
  const text = sectionText[language];
  const info = apartmentInfo[language];

  return (
    <section
      id="today-free"
      className="scroll-mt-32 bg-[#fffaf0] px-4 py-12 sm:px-6 sm:py-16 lg:scroll-mt-[260px]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-4xl font-black leading-tight text-[#d4146f] sm:text-5xl">{text.title}</h2>
            <p className="mt-4 max-w-3xl text-lg font-bold leading-7 text-gray-800 sm:text-xl">
              {text.description}
            </p>
          </div>

          <a
            href="tel:+37369990190"
            className="rounded-2xl bg-[#d4146f] px-7 py-4 text-center text-base font-black text-white shadow-lg sm:rounded-3xl sm:px-10 sm:py-6 sm:text-xl"
          >
            {text.callButton}
          </a>
        </div>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
          {apartments.map((apartment) => {
            const roomText =
              apartment.rooms === "studio" ? info.studio : apartment.rooms;
            const guestText = info[apartment.guestsKey];
            const cardInfo = `${roomText} • ${guestText} • ${info.center}`;

            return (
              <a
                key={apartment.id}
                href={apartment.link}
                className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-white shadow-lg shadow-black/8 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-2xl sm:rounded-[28px]"
              >
                                <ResponsiveImage
                  src={apartment.image}
                  alt={`${text.altPrefix} ${apartment.id}`}
                  className="aspect-[4/3]"
                  imgClassName="transition duration-500 group-hover:scale-[1.03]"
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                  objectPosition={"imagePosition" in apartment ? apartment.imagePosition : "center"}
                  priority={apartment.id <= 13}
                  withWatermark
                >
                  <div className="absolute left-4 top-4 z-10 rounded-full bg-[#ffd21f] px-4 py-2 text-sm font-black text-gray-900 shadow sm:left-5 sm:top-5 sm:px-5 sm:py-2.5 sm:text-base">
                    ID {apartment.id}
                  </div>
                </ResponsiveImage>

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <div className="min-h-[116px] rounded-2xl bg-[#fffaf0] p-4 shadow-inner ring-1 ring-black/5 sm:min-h-[128px] sm:p-5">
                    <h3 className="text-xl font-black text-gray-900 sm:text-2xl">
                      {info.addressTitle}
                    </h3>
                    <p className="mt-2 text-sm font-bold leading-6 text-gray-600 sm:text-base">
                      {cardInfo}
                    </p>
                  </div>

                  <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                    <p className="text-3xl font-black leading-none text-[#d4146f] sm:text-4xl">
                      {apartment.price} {info.lei}
                    </p>

                    <span className="shrink-0 rounded-2xl bg-[#061024] px-5 py-3 text-center text-sm font-black text-white sm:px-6 sm:py-4 sm:text-base">
                      {text.details}
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
