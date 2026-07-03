"use client";

import { useEffect, useState } from "react";
import ResponsiveImage from "@/components/ResponsiveImage";
import {
  activeApartments,
  getApartmentPath,
  type ApartmentClass,
} from "@/lib/apartments";

type Lang = "RU" | "RO" | "EN" | "CS" | "UK";
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
    categories: Partial<Record<
      CategoryKey,
      {
        title: string;
        description: string;
        badge: string;
        discount?: string;
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
    categories: {
      standard: {
        title: "⭐ Стандарт",
        description:
          "Более комфортные квартиры с современным интерьером. Отличный выбор для отдыха, командировок и проживания в центре Кишинёва.",
        badge: "⭐ Стандарт",
      },
      economy: {
        title: "💰 Эконом",
        description:
          "Практичные квартиры по более доступной цене. Хороший вариант для гостей, которым важно удобное расположение и разумная стоимость проживания.",
        badge: "💰 Эконом -10%",
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
    categories: {
      standard: {
        title: "⭐ Standard",
        description:
          "Apartamente mai confortabile, cu interior modern. O alegere foarte bună pentru odihnă, călătorii de serviciu și cazare în centrul Chișinăului.",
        badge: "⭐ Standard",
      },
      economy: {
        title: "💰 Economy",
        description:
          "Apartamente practice, la un preț mai accesibil. O variantă bună pentru oaspeții care apreciază amplasarea comodă și costul rezonabil al șederii.",
        badge: "💰 Economy -10%",
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
    categories: {
      standard: {
        title: "⭐ Standard",
        description:
          "More comfortable apartments with modern interiors. A great choice for leisure, business trips, and stays in central Chisinau.",
        badge: "⭐ Standard",
      },
      economy: {
        title: "💰 Economy",
        description:
          "Practical apartments at a more accessible price. A good option for guests who value a convenient location and a reasonable stay cost.",
        badge: "💰 Economy -10%",
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
    categories: {
      standard: {
        title: "⭐ Standard",
        description:
          "Komfortnější apartmány s moderním interiérem. Skvělá volba pro odpočinek, pracovní cesty i pobyt v centru Kišiněva.",
        badge: "⭐ Standard",
      },
      economy: {
        title: "💰 Economy",
        description:
          "Praktické apartmány za dostupnější cenu. Dobrá varianta pro hosty, kteří ocení pohodlnou polohu a rozumnou cenu pobytu.",
        badge: "💰 Economy -10%",
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
    categories: {
      standard: {
        title: "⭐ Стандарт",
        description:
          "Більш комфортні квартири із сучасним інтер'єром. Чудовий вибір для відпочинку, відряджень і проживання в центрі Кишинева.",
        badge: "⭐ Стандарт",
      },
      economy: {
        title: "💰 Економ",
        description:
          "Практичні квартири за доступнішою ціною. Хороший варіант для гостей, яким важливі зручне розташування і розумна вартість проживання.",
        badge: "💰 Економ -10%",
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

const categoryOrder = ["standard", "premium", "economy"] as const satisfies readonly CategoryKey[];
const ECONOMY_DISCOUNT_PERCENT = 10;

function getDiscountedPrice(price: number) {
  return Math.round(price * (100 - ECONOMY_DISCOUNT_PERCENT) / 100);
}

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

        <div className="space-y-12 sm:space-y-14">
          {categoryOrder.map((category, categoryIndex) => {
            const fallbackCategoryText: {
              title: string;
              description: string;
              badge: string;
              discount?: string;
            } = {
              title: category === "premium" ? "Премиум" : category,
              description: "",
              badge: category === "premium" ? "Премиум" : category,
            };
            const categoryText = text.categories[category] ?? fallbackCategoryText;
            const categoryApartments = activeApartments.filter(
              (apartment) => apartment.class === category,
            );

            if (categoryApartments.length === 0) {
              return null;
            }

            return (
              <section key={category} aria-labelledby={category + "-apartments-title"}>
                <div className="mb-5 flex flex-col gap-4 sm:mb-6 md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <h3
                        id={category + "-apartments-title"}
                        className="text-3xl font-black leading-tight text-[#061024] sm:text-4xl"
                      >
                        {categoryText.title}
                      </h3>
                      {categoryText.discount ? (
                        <span className="inline-flex w-fit items-center rounded-2xl bg-[#d4146f] px-5 py-2.5 text-xl font-black leading-none text-white shadow-lg shadow-pink-700/20 sm:text-2xl">
                          {categoryText.discount}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-3 max-w-3xl text-base font-bold leading-7 text-gray-700 sm:text-lg">
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
                          alt={text.altPrefix + " " + apartment.id}
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
                              {info.addressTitle}
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
