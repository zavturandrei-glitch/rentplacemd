"use client";

import { useEffect, useState } from "react";
import ResponsiveImage from "@/components/ResponsiveImage";
import { getApartmentDisplayAddress } from "@/lib/apartmentLocalization";
import {
  activeApartments,
  apartmentCategoryOrder,
  getApartmentPath,
  type ApartmentClass,
} from "@/lib/apartments";
import type { Language } from "@/locales/translations";

type Lang = "RU" | "RO" | "EN" | "CS" | "UK";

const languageCode: Record<Lang, Language> = {
  RU: "ru",
  RO: "ro",
  EN: "en",
  CS: "cs",
  UK: "uk",
};
type CategoryKey = ApartmentClass;

const LANG_STORAGE_KEY = "rentplacemd-language";

const sectionText: Record<
  Lang,
  {
    title: string;
    description: string;
    callButton: string;
    details: string;
    altPrefix: string;
    countLabel: string;
    categories: Partial<Record<
      CategoryKey,
      {
        title: string;
        description: string;
        badge: string;
        discount?: string;
        highlightBadge?: string;
      }
    >>;
  }
> = {
  RU: {
    title: "Все квартиры",
    description:
      "Квартиры посуточно в центре Кишинёва. Выберите подходящий вариант и уточните доступность на нужные даты.",
    callButton: "Уточнить свободные даты",
    details: "Подробнее",
    altPrefix: "Квартира ID",
    countLabel: "вариантов",
    categories: {
      standard: {
        title: "Стандарт",
        description:
          "Более комфортные квартиры с современным интерьером. Отличный выбор для отдыха, командировок и проживания в центре Кишинёва.",
        badge: "Стандарт",
      },
      standardPlus: {
        title: "Standard+",
        description:
          "Новые квартиры RentPlaceMD с современным ремонтом, светлым интерьером и повышенным уровнем комфорта.",
        badge: "Standard+",
        highlightBadge: "Новые квартиры",
      },
      economy: {
        title: "Эконом",
        description:
          "Практичные квартиры по более доступной цене. Хороший вариант для гостей, которым важно удобное расположение и разумная стоимость проживания.",
        badge: "Эконом -10%",
        discount: "Скидка 10%",
      },
    },
  },
  RO: {
    title: "Toate apartamentele",
    description:
      "Apartamente în regim hotelier în centrul Chișinăului. Alegeți varianta potrivită și verificați disponibilitatea pentru datele dorite.",
    callButton: "Verifică datele libere",
    details: "Detalii",
    altPrefix: "Apartament ID",
    countLabel: "opțiuni",
    categories: {
      standard: {
        title: "Standard",
        description:
          "Apartamente mai confortabile, cu interior modern. O alegere foarte bună pentru odihnă, călătorii de serviciu și cazare în centrul Chișinăului.",
        badge: "Standard",
      },
      standardPlus: {
        title: "Standard+",
        description:
          "Apartamente noi RentPlaceMD, cu renovare modernă, interior luminos și un nivel mai ridicat de confort.",
        badge: "Standard+",
        highlightBadge: "Apartamente noi",
      },
      economy: {
        title: "Economy",
        description:
          "Apartamente practice, la un preț mai accesibil. O variantă bună pentru oaspeții care apreciază amplasarea comodă și costul rezonabil al șederii.",
        badge: "Economy -10%",
        discount: "10% discount",
      },
    },
  },
  EN: {
    title: "All apartments",
    description:
      "Daily rent apartments in the center of Chișinău. Choose the best option and check availability for your dates.",
    callButton: "Check available dates",
    details: "Details",
    altPrefix: "Apartment ID",
    countLabel: "options",
    categories: {
      standard: {
        title: "Standard",
        description:
          "More comfortable apartments with modern interiors. A great choice for leisure, business trips, and stays in central Chisinau.",
        badge: "Standard",
      },
      standardPlus: {
        title: "Standard+",
        description:
          "New RentPlaceMD apartments with modern finishes, bright interiors, and an upgraded level of comfort.",
        badge: "Standard+",
        highlightBadge: "New apartments",
      },
      economy: {
        title: "Economy",
        description:
          "Practical apartments at a more accessible price. A good option for guests who value a convenient location and a reasonable stay cost.",
        badge: "Economy -10%",
        discount: "10% discount",
      },
    },
  },
  CS: {
    title: "Všechny apartmány",
    description:
      "Apartmány k pronájmu na den v centru Kišiněva. Vyberte si vhodnou možnost a ověřte dostupnost na požadované termíny.",
    callButton: "Ověřit volné termíny",
    details: "Detail",
    altPrefix: "Apartmán ID",
    countLabel: "možností",
    categories: {
      standard: {
        title: "Standard",
        description:
          "Komfortnější apartmány s moderním interiérem. Skvělá volba pro odpočinek, pracovní cesty i pobyt v centru Kišiněva.",
        badge: "Standard",
      },
      standardPlus: {
        title: "Standard+",
        description:
          "Nové apartmány RentPlaceMD s moderní rekonstrukcí, světlým interiérem a vyšší úrovní komfortu.",
        badge: "Standard+",
        highlightBadge: "Nové apartmány",
      },
      economy: {
        title: "Economy",
        description:
          "Praktické apartmány za dostupnější cenu. Dobrá varianta pro hosty, kteří ocení pohodlnou polohu a rozumnou cenu pobytu.",
        badge: "Economy -10%",
        discount: "10% discount",
      },
    },
  },
  UK: {
    title: "Усі квартири",
    description:
      "Квартири подобово в центрі Кишинева. Оберіть відповідний варіант і уточніть доступність на потрібні дати.",
    callButton: "Уточнити вільні дати",
    details: "Детальніше",
    altPrefix: "Квартира ID",
    countLabel: "варіантів",
    categories: {
      standard: {
        title: "Стандарт",
        description:
          "Більш комфортні квартири із сучасним інтер'єром. Чудовий вибір для відпочинку, відряджень і проживання в центрі Кишинева.",
        badge: "Стандарт",
      },
      standardPlus: {
        title: "Standard+",
        description:
          "Нові квартири RentPlaceMD із сучасним ремонтом, світлим інтер'єром і підвищеним рівнем комфорту.",
        badge: "Standard+",
        highlightBadge: "Нові квартири",
      },
      economy: {
        title: "Економ",
        description:
          "Практичні квартири за доступнішою ціною. Хороший варіант для гостей, яким важливі зручне розташування і розумна вартість проживання.",
        badge: "Економ -10%",
        discount: "Знижка 10%",
      },
    },
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

const ECONOMY_DISCOUNT_PERCENT = 10;

function getDiscountedPrice(price: number) {
  return Math.round(price * (100 - ECONOMY_DISCOUNT_PERCENT) / 100);
}

function getSavedLanguage(): Lang {
  return "RU";
}

function useRentPlaceLanguage() {
  const [language, setLanguage] = useState<Lang>(() => getSavedLanguage());

  useEffect(() => {
    const restoreSavedLanguage = window.setTimeout(() => {
      const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
      const normalizedSaved = saved?.toUpperCase() as Lang | undefined;

      if (normalizedSaved && normalizedSaved in sectionText) {
        setLanguage(normalizedSaved);
      }
    }, 0);

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
    return () => {
      window.clearTimeout(restoreSavedLanguage);
      window.removeEventListener(
        "rentplacemd-language-change",
        handleLanguageChange,
      );
    };
  }, []);

  return language;
}

export default function TodayFree({ selectedClass }: { selectedClass?: ApartmentClass }) {
  const language = useRentPlaceLanguage();
  const text = sectionText[language];
  const info = apartmentInfo[language];
  const visibleCategories = selectedClass ? [selectedClass] : apartmentCategoryOrder;
  const selectedCategoryText = selectedClass ? text.categories[selectedClass] : null;
  const selectedCount = selectedClass
    ? activeApartments.filter((apartment) => apartment.class === selectedClass).length
    : activeApartments.length;

  return (
    <section
      id="today-free"
      className="scroll-mt-32 bg-[#fffaf0] px-4 py-12 sm:px-6 sm:py-16 lg:scroll-mt-[260px]"
    >
      <span id="apartments" className="block scroll-mt-32 lg:scroll-mt-[260px]" aria-hidden="true" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            {selectedClass ? (
              <h1 className="text-4xl font-black leading-tight text-[#d4146f] sm:text-5xl">
                {selectedCategoryText?.title ?? text.title}
              </h1>
            ) : (
              <h2 className="text-4xl font-black leading-tight text-[#d4146f] sm:text-5xl">
                {text.title}
              </h2>
            )}
            <p className="mt-4 max-w-3xl text-lg font-bold leading-7 text-gray-800 sm:text-xl">
              {selectedCategoryText?.description ?? text.description}
            </p>
            {selectedClass ? (
              <p className="mt-3 w-fit rounded-full bg-white px-4 py-2 text-sm font-black text-[#07111f] shadow-sm ring-1 ring-black/5">
                {selectedCount} {text.countLabel}
              </p>
            ) : null}
          </div>

          <a
            href="tel:+37369990190"
            className="rounded-2xl bg-[#d4146f] px-7 py-4 text-center text-base font-black text-white shadow-lg sm:rounded-3xl sm:px-10 sm:py-6 sm:text-xl"
          >
            {text.callButton}
          </a>
        </div>

        <div className="space-y-12 sm:space-y-14">
          {visibleCategories.map((category, categoryIndex) => {
            const fallbackCategoryText: {
              title: string;
              description: string;
              badge: string;
              discount?: string;
              highlightBadge?: string;
            } = {
              title: category === "standardPlus" ? "Standard+" : category,
              description: "",
              badge: category === "standardPlus" ? "Standard+" : category,
            };
            const categoryText = text.categories[category] ?? fallbackCategoryText;
            const isStandardPlus = category === "standardPlus";
            const categoryApartments = activeApartments.filter(
              (apartment) => apartment.class === category,
            );

            if (categoryApartments.length === 0) {
              return null;
            }

            return (
              <section
                key={category}
                aria-labelledby={category + "-apartments-title"}
                className={
                  isStandardPlus
                    ? "rounded-[30px] border border-[#f2dfb8] bg-gradient-to-br from-[#fffefb] via-[#fff8e8] to-[#fff2cf] px-3 py-8 shadow-[0_24px_70px_rgba(120,83,18,0.12)] ring-1 ring-white/80 sm:px-5 sm:py-10 lg:px-7 lg:py-12"
                    : undefined
                }
              >
                <div className={isStandardPlus ? "mb-7 flex flex-col gap-4 sm:mb-8 md:flex-row md:items-end md:justify-between" : "mb-5 flex flex-col gap-4 sm:mb-6 md:flex-row md:items-end md:justify-between"}>
                  <div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <h3
                        id={category + "-apartments-title"}
                        className={isStandardPlus ? "text-4xl font-black leading-tight text-[#061024] sm:text-5xl" : "text-3xl font-black leading-tight text-[#061024] sm:text-4xl"}
                      >
                        {categoryText.title}
                      </h3>
                      {isStandardPlus && categoryText.highlightBadge ? (
                        <span className="inline-flex w-fit items-center rounded-full bg-[#061024] px-5 py-2.5 text-sm font-black leading-none text-[#ffd65a] shadow-lg shadow-black/10 ring-1 ring-white/15 sm:text-base">
                          {categoryText.highlightBadge}
                        </span>
                      ) : null}
                      {categoryText.discount ? (
                        <span className="inline-flex w-fit items-center rounded-2xl bg-[#d4146f] px-5 py-2.5 text-xl font-black leading-none text-white shadow-lg shadow-pink-700/20 sm:text-2xl">
                          {categoryText.discount}
                        </span>
                      ) : null}
                    </div>
                    <p className={isStandardPlus ? "mt-4 max-w-4xl text-base font-bold leading-8 text-gray-700 sm:text-xl" : "mt-3 max-w-3xl text-base font-bold leading-7 text-gray-700 sm:text-lg"}>
                      {categoryText.description}
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {categoryApartments.map((apartment, apartmentIndex) => {
                    const roomText =
                      apartment.rooms === "studio" ? info.studio : apartment.rooms;
                    const guestText =
                      apartment.rooms === "2+1" && apartment.guests === 4
                        ? info.bedrooms2
                        : info[
                            ("guests" + apartment.guests) as keyof (typeof apartmentInfo)[Lang]
                          ];
                    const cardInfo = [roomText, guestText, info.center].join(" • ");
                    const cardAddress = getApartmentDisplayAddress(
                      apartment.id,
                      info.addressTitle,
                      languageCode[language],
                    );
                    const isEconomy = apartment.class === "economy";
                    const displayedPrice = isEconomy ? getDiscountedPrice(apartment.price) : apartment.price;

                    return (
                      <a
                        key={apartment.id}
                        href={getApartmentPath(apartment)}
                        className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-white shadow-lg shadow-black/8 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-2xl sm:rounded-[28px]"
                      >
                        <ResponsiveImage
                          src={apartment.cardPhoto ?? apartment.photos[0]}
                          alt={text.altPrefix + " " + apartment.id + " · " + cardAddress}
                          className="aspect-[4/3]"
                          imgClassName="transition duration-500 group-hover:scale-[1.03]"
                          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                          objectPosition={apartment.cardImagePosition ?? "center"}
                          priority={categoryIndex === 0 && apartmentIndex < 4}
                          withWatermark
                        >
                          <div className="absolute left-4 top-4 z-10 rounded-full bg-[#ffd21f] px-4 py-2 text-sm font-black text-gray-900 shadow sm:left-5 sm:top-5 sm:px-5 sm:py-2.5 sm:text-base">
                            ID {apartment.id}
                          </div>
                          <div className="absolute right-4 top-4 z-10 rounded-full bg-white/92 px-3 py-2 text-xs font-black text-[#061024] shadow-lg ring-1 ring-black/10 backdrop-blur sm:right-5 sm:top-5 sm:px-4 sm:py-2.5 sm:text-sm">
                            {categoryText.badge}
                          </div>
                        </ResponsiveImage>

                        <div className="flex flex-1 flex-col p-4 sm:p-5">
                          <div className="min-h-[116px] rounded-2xl bg-[#fffaf0] p-4 shadow-inner ring-1 ring-black/5 sm:min-h-[128px] sm:p-5">
                            <h3 className="text-xl font-black text-gray-900 sm:text-2xl">
                              {cardAddress}
                            </h3>
                            <p className="mt-2 text-sm font-bold leading-6 text-gray-600 sm:text-base">
                              {cardInfo}
                            </p>
                          </div>

                          <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                            <div>
                              {isEconomy ? (
                                <p className="mb-1 text-sm font-black leading-none text-gray-500 line-through sm:text-base">
                                  {apartment.price} {info.lei}
                                </p>
                              ) : null}
                              <p className="text-3xl font-black leading-none text-[#d4146f] sm:text-4xl">
                                {displayedPrice} {info.lei}
                              </p>
                            </div>

                            <span className="shrink-0 rounded-2xl bg-[#061024] px-5 py-3 text-center text-sm font-black text-white sm:px-6 sm:py-4 sm:text-base">
                              {text.details}
                            </span>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
