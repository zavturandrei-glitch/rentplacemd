"use client";

import ApartmentCard from "@/components/ApartmentCard";
import { useLanguage } from "@/context/LanguageContext";
import {
  activeApartments,
  apartmentCategoryOrder,
  getApartmentCategoryMinimumPrice,
  getApartmentsByClass,
  type ApartmentClass,
} from "@/lib/apartments";
type Lang = "RU" | "RO" | "EN" | "CS" | "UK";

type CategoryKey = ApartmentClass;

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
      premium: {
        title: "Premium",
        description: "Квартиры Premium с современным интерьером и реальными фотографиями.",
        badge: "Premium",
      },
      standard: {
        title: "Standard",
        description:
          "Более комфортные квартиры с современным интерьером. Отличный выбор для отдыха, командировок и проживания в центре Кишинёва.",
        badge: "Standard",
      },
      standardPlus: {
        title: "Комфорт",
        description:
          "Новые квартиры RentPlaceMD с современным ремонтом, светлым интерьером и повышенным уровнем комфорта.",
        badge: "Комфорт",
        highlightBadge: "Новые квартиры",
      },
      economy: {
        title: "Economy",
        description:
          "Практичные квартиры по более доступной цене. Хороший вариант для гостей, которым важно удобное расположение и разумная стоимость проживания.",
        badge: "Economy · −100 MDL",
        discount: "Скидка 100 MDL",
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
      premium: {
        title: "Premium",
        description: "Apartamente Premium cu interior modern și fotografii reale.",
        badge: "Premium",
      },
      standard: {
        title: "Standard",
        description:
          "Apartamente mai confortabile, cu interior modern. O alegere foarte bună pentru odihnă, călătorii de serviciu și cazare în centrul Chișinăului.",
        badge: "Standard",
      },
      standardPlus: {
        title: "Comfort",
        description:
          "Apartamente noi RentPlaceMD, cu renovare modernă, interior luminos și un nivel mai ridicat de confort.",
        badge: "Comfort",
        highlightBadge: "Apartamente noi",
      },
      economy: {
        title: "Economy",
        description:
          "Apartamente practice, la un preț mai accesibil. O variantă bună pentru oaspeții care apreciază amplasarea comodă și costul rezonabil al șederii.",
        badge: "Economy · −100 MDL",
        discount: "Reducere 100 MDL",
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
      premium: {
        title: "Premium",
        description: "Premium apartments with modern interiors and real photographs.",
        badge: "Premium",
      },
      standard: {
        title: "Standard",
        description:
          "More comfortable apartments with modern interiors. A great choice for leisure, business trips, and stays in central Chisinau.",
        badge: "Standard",
      },
      standardPlus: {
        title: "Comfort",
        description:
          "New RentPlaceMD apartments with modern finishes, bright interiors, and an upgraded level of comfort.",
        badge: "Comfort",
        highlightBadge: "New apartments",
      },
      economy: {
        title: "Economy",
        description:
          "Practical apartments at a more accessible price. A good option for guests who value a convenient location and a reasonable stay cost.",
        badge: "Economy · −100 MDL",
        discount: "100 MDL discount",
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
      premium: {
        title: "Premium",
        description: "Apartmány Premium s moderním interiérem a skutečnými fotografiemi.",
        badge: "Premium",
      },
      standard: {
        title: "Standard",
        description:
          "Komfortnější apartmány s moderním interiérem. Skvělá volba pro odpočinek, pracovní cesty i pobyt v centru Kišiněva.",
        badge: "Standard",
      },
      standardPlus: {
        title: "Comfort",
        description:
          "Nové apartmány RentPlaceMD s moderní rekonstrukcí, světlým interiérem a vyšší úrovní komfortu.",
        badge: "Comfort",
        highlightBadge: "Nové apartmány",
      },
      economy: {
        title: "Economy",
        description:
          "Praktické apartmány za dostupnější cenu. Dobrá varianta pro hosty, kteří ocení pohodlnou polohu a rozumnou cenu pobytu.",
        badge: "Economy · −100 MDL",
        discount: "Sleva 100 MDL",
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
      premium: {
        title: "Premium",
        description: "Квартири Premium із сучасним інтер’єром і реальними фотографіями.",
        badge: "Premium",
      },
      standard: {
        title: "Standard",
        description:
          "Більш комфортні квартири із сучасним інтер'єром. Чудовий вибір для відпочинку, відряджень і проживання в центрі Кишинева.",
        badge: "Standard",
      },
      standardPlus: {
        title: "Comfort",
        description:
          "Нові квартири RentPlaceMD із сучасним ремонтом, світлим інтер'єром і підвищеним рівнем комфорту.",
        badge: "Comfort",
        highlightBadge: "Нові квартири",
      },
      economy: {
        title: "Economy",
        description:
          "Практичні квартири за доступнішою ціною. Хороший варіант для гостей, яким важливі зручне розташування і розумна вартість проживання.",
        badge: "Economy · −100 MDL",
        discount: "Знижка 100 MDL",
      },
    },
  },
};

export default function TodayFree({ selectedClass }: { selectedClass?: ApartmentClass }) {
  const { language: currentLanguage } = useLanguage();
  const language = currentLanguage.toUpperCase() as Lang;
  const text = sectionText[language];
  const visibleCategories = selectedClass ? [selectedClass] : apartmentCategoryOrder;
  const selectedCategoryText = selectedClass ? text.categories[selectedClass] : null;
  const selectedCount = selectedClass
    ? getApartmentsByClass(selectedClass).length
    : activeApartments.length;
  const selectedMinimumPrice = selectedClass
    ? getApartmentCategoryMinimumPrice(selectedClass)
    : null;

  return (
    <section
      id="today-free"
      className="scroll-mt-32 bg-[#111b2a] px-4 pb-12 pt-5 sm:px-6 sm:pb-16 sm:pt-8 lg:scroll-mt-[260px]"
    >
      <span id="apartments" className="block scroll-mt-32 lg:scroll-mt-[260px]" aria-hidden="true" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            {selectedClass ? (
              <h1 className="text-3xl font-black leading-tight text-white sm:text-5xl">
                {selectedCategoryText?.title ?? text.title}
              </h1>
            ) : (
              <h2 className="text-4xl font-black leading-tight text-[#d4146f] sm:text-5xl">
                {text.title}
              </h2>
            )}
            <p className="mt-2 max-w-3xl text-sm font-bold leading-6 text-white/70 sm:text-lg">
              {selectedClass
                ? selectedCount + " " + text.countLabel + " · " + selectedMinimumPrice + " MDL"
                : text.description}
            </p>
          </div>

          <a
            href="tel:+37369990190"
            className="w-fit rounded-xl bg-[#d4146f] px-4 py-3 text-center text-sm font-black text-white shadow-lg sm:px-5"
          >
            {text.callButton}
          </a>
        </div>

        <div className="space-y-9 sm:space-y-12">
          {visibleCategories.map((category, categoryIndex) => {
            const fallbackCategoryText: {
              title: string;
              description: string;
              badge: string;
              discount?: string;
              highlightBadge?: string;
            } = {
              title: category === "standardPlus" ? "Comfort" : category,
              description: "",
              badge: category === "standardPlus" ? "Comfort" : category,
            };
            const categoryText = text.categories[category] ?? fallbackCategoryText;
            const categoryApartments = getApartmentsByClass(category);

            if (categoryApartments.length === 0) {
              return null;
            }

            return (
              <section
                key={category}
                aria-labelledby={selectedClass ? undefined : category + "-apartments-title"}
                aria-label={selectedClass ? categoryText.title : undefined}
              >
                {!selectedClass ? <div className="mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        id={category + "-apartments-title"}
                        className="text-2xl font-black leading-tight text-white sm:text-3xl"
                      >
                        {categoryText.title}
                      </h3>
                      {categoryText.discount ? (
                        <span className="inline-flex w-fit items-center rounded-full bg-[#d4146f] px-3 py-1.5 text-xs font-black leading-none text-white">
                          {categoryText.discount}
                        </span>
                      ) : null}
                    </div>
                    {!selectedClass ? <p className="mt-1 max-w-3xl text-sm font-bold leading-6 text-white/65">
                      {categoryText.description}
                    </p> : null}
                  </div>
                </div> : null}

                <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
                  {categoryApartments.map((apartment, apartmentIndex) => (
                    <ApartmentCard
                      key={apartment.id}
                      apartment={apartment}
                      priority={categoryIndex === 0 && apartmentIndex < 4}
                    />
                  ))}
                </div>
                {selectedClass ? (
                  <p className="mt-8 max-w-4xl rounded-2xl bg-white p-5 text-sm font-semibold leading-6 text-slate-600 shadow-sm ring-1 ring-black/5">
                    {categoryText.description}
                  </p>
                ) : null}
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
