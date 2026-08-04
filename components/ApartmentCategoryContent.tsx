"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import ApartmentCard from "@/components/ApartmentCard";
import { useLanguage } from "@/context/LanguageContext";
import {
  activeApartments,
  apartmentCategoryOrder,
  apartmentClassLabels,
  getApartmentCatalogPrice,
  type ApartmentClass,
  type ApartmentRooms,
} from "@/lib/apartments";
import type { Language } from "@/locales/translations";

type ContentText = {
  allTitle: string;
  categoryTitle: (category: string) => string;
  intro: string;
  fitTitle: string;
  fit: Record<ApartmentClass, string>;
  price: string;
  layouts: string;
  capacity: string;
  knownCapacity: (count: number, total: number) => string;
  compareTitle: string;
  compareText: string;
  optionsTitle: string;
  perDay: string;
  details: string;
  showAll: string;
  faqTitle: string;
  priceQuestion: string;
  priceAnswer: (minimum: number, maximum: number) => string;
  chooseQuestion: string;
  chooseAnswer: string;
  roomLabels: Record<ApartmentRooms, string>;
};

const contentByLanguage: Record<Language, ContentText> = {
  ru: {
    allTitle: "Квартиры посуточно в Кишинёве: как выбрать",
    categoryTitle: (category) => "Квартиры " + category + " посуточно в Кишинёве",
    intro: "Сравнивайте только опубликованные варианты: цену каталога, планировку, указанную вместимость и реальные фотографии каждой квартиры.",
    fitTitle: "Кому подходит эта категория",
    fit: {
      economy: "Тем, для кого приоритет — минимальная текущая цена в каталоге.",
      standard: "Тем, кто сравнивает практичные студии и квартиры 1+1.",
      standardPlus: "Тем, кому нужен самый широкий выбор планировок и вместимости.",
      premium: "Тем, кто выбирает квартиры 1+1 по адресам за пределами Измаил, 88.",
    },
    price: "Цена",
    layouts: "Планировки",
    capacity: "Вместимость",
    knownCapacity: (count, total) => "указана у " + count + " из " + total + " вариантов",
    compareTitle: "Основные различия",
    compareText: "Классы отличаются текущей ценой и составом доступных планировок. Перейдите в соседнюю категорию, чтобы сравнить опубликованные варианты.",
    optionsTitle: "Подходящие варианты",
    perDay: "MDL / сутки",
    details: "Смотреть квартиру",
    showAll: "Показать все квартиры",
    faqTitle: "Частые вопросы",
    priceQuestion: "Сколько стоит квартира в этой подборке?",
    priceAnswer: (minimum, maximum) => minimum === maximum
      ? "Текущая цена опубликованных вариантов — " + minimum + " MDL в сутки."
      : "Текущий диапазон цен — от " + minimum + " до " + maximum + " MDL в сутки.",
    chooseQuestion: "Как выбрать подходящий вариант?",
    chooseAnswer: "Сопоставьте планировку, указанную вместимость, цену и фотографии. Свободные даты лучше подтвердить перед бронированием.",
    roomLabels: { studio: "студия", "1+1": "1+1", "2+1": "2+1" },
  },
  ro: {
    allTitle: "Apartamente în regim hotelier în Chișinău: cum alegi",
    categoryTitle: (category) => "Apartamente " + category + " în regim hotelier în Chișinău",
    intro: "Compară opțiunile publicate după prețul din catalog, compartimentare, capacitatea indicată și fotografiile reale.",
    fitTitle: "Cui i se potrivește categoria",
    fit: {
      economy: "Celor pentru care prioritatea este cel mai mic preț actual din catalog.",
      standard: "Celor care compară garsoniere practice și apartamente 1+1.",
      standardPlus: "Celor care doresc cea mai variată alegere de compartimentări și capacități.",
      premium: "Celor care aleg apartamente 1+1 la alte adrese decât Ismail 88.",
    },
    price: "Preț",
    layouts: "Compartimentări",
    capacity: "Capacitate",
    knownCapacity: (count, total) => "indicată pentru " + count + " din " + total + " opțiuni",
    compareTitle: "Diferențe principale",
    compareText: "Clasele diferă prin prețul actual și compartimentările disponibile. Deschide o categorie vecină pentru comparație.",
    optionsTitle: "Opțiuni potrivite",
    perDay: "MDL / noapte",
    details: "Vezi apartamentul",
    showAll: "Arată toate apartamentele",
    faqTitle: "Întrebări frecvente",
    priceQuestion: "Cât costă un apartament din această selecție?",
    priceAnswer: (minimum, maximum) => minimum === maximum
      ? "Prețul actual al opțiunilor publicate este " + minimum + " MDL pe noapte."
      : "Intervalul actual este între " + minimum + " și " + maximum + " MDL pe noapte.",
    chooseQuestion: "Cum aleg opțiunea potrivită?",
    chooseAnswer: "Compară compartimentarea, capacitatea indicată, prețul și fotografiile. Confirmă datele libere înainte de rezervare.",
    roomLabels: { studio: "studio", "1+1": "1+1", "2+1": "2+1" },
  },
  en: {
    allTitle: "Daily apartments in Chisinau: how to choose",
    categoryTitle: (category) => category + " daily apartments in Chisinau",
    intro: "Compare published options by current catalogue price, layout, stated capacity and the real photos on each apartment page.",
    fitTitle: "Who this category suits",
    fit: {
      economy: "Guests whose priority is the lowest current catalogue price.",
      standard: "Guests comparing practical studios and 1+1 apartments.",
      standardPlus: "Guests who want the broadest choice of layouts and stated capacities.",
      premium: "Guests choosing 1+1 apartments at addresses other than Ismail 88.",
    },
    price: "Price",
    layouts: "Layouts",
    capacity: "Capacity",
    knownCapacity: (count, total) => "stated for " + count + " of " + total + " options",
    compareTitle: "Main differences",
    compareText: "Classes differ by current price and available layouts. Open another category to compare the published options.",
    optionsTitle: "Relevant options",
    perDay: "MDL / night",
    details: "View apartment",
    showAll: "Show all apartments",
    faqTitle: "Frequently asked questions",
    priceQuestion: "How much does an apartment in this selection cost?",
    priceAnswer: (minimum, maximum) => minimum === maximum
      ? "The current price of the published options is " + minimum + " MDL per night."
      : "The current range is " + minimum + "–" + maximum + " MDL per night.",
    chooseQuestion: "How should I choose an apartment?",
    chooseAnswer: "Compare the layout, stated capacity, price and photos. Confirm available dates before booking.",
    roomLabels: { studio: "studio", "1+1": "1+1", "2+1": "2+1" },
  },
  uk: {
    allTitle: "Квартири подобово в Кишиневі: як обрати",
    categoryTitle: (category) => "Квартири " + category + " подобово в Кишиневі",
    intro: "Порівнюйте опубліковані варіанти за ціною каталогу, плануванням, зазначеною місткістю та реальними фотографіями.",
    fitTitle: "Кому підходить категорія",
    fit: {
      economy: "Гостям, для яких пріоритет — найнижча поточна ціна в каталозі.",
      standard: "Гостям, які порівнюють практичні студії та квартири 1+1.",
      standardPlus: "Гостям, яким потрібен найширший вибір планувань і місткості.",
      premium: "Гостям, які обирають квартири 1+1 за адресами поза Ізмаїл, 88.",
    },
    price: "Ціна",
    layouts: "Планування",
    capacity: "Місткість",
    knownCapacity: (count, total) => "зазначена для " + count + " із " + total + " варіантів",
    compareTitle: "Основні відмінності",
    compareText: "Класи відрізняються поточною ціною та доступними плануваннями. Відкрийте іншу категорію для порівняння.",
    optionsTitle: "Відповідні варіанти",
    perDay: "MDL / доба",
    details: "Переглянути квартиру",
    showAll: "Показати всі квартири",
    faqTitle: "Часті запитання",
    priceQuestion: "Скільки коштує квартира в цій добірці?",
    priceAnswer: (minimum, maximum) => minimum === maximum
      ? "Поточна ціна опублікованих варіантів — " + minimum + " MDL за добу."
      : "Поточний діапазон — від " + minimum + " до " + maximum + " MDL за добу.",
    chooseQuestion: "Як обрати відповідний варіант?",
    chooseAnswer: "Порівняйте планування, зазначену місткість, ціну та фотографії. Підтвердьте вільні дати перед бронюванням.",
    roomLabels: { studio: "студія", "1+1": "1+1", "2+1": "2+1" },
  },
  cs: {
    allTitle: "Apartmány v Kišiněvě na denní pronájem: jak vybrat",
    categoryTitle: (category) => "Apartmány " + category + " v Kišiněvě na denní pronájem",
    intro: "Porovnejte zveřejněné nabídky podle aktuální ceny, dispozice, uvedené kapacity a skutečných fotografií.",
    fitTitle: "Pro koho je kategorie vhodná",
    fit: {
      economy: "Pro hosty, jejichž prioritou je nejnižší aktuální cena v katalogu.",
      standard: "Pro hosty porovnávající praktická studia a apartmány 1+1.",
      standardPlus: "Pro hosty, kteří chtějí nejširší výběr dispozic a kapacit.",
      premium: "Pro hosty vybírající apartmány 1+1 na jiných adresách než Ismail 88.",
    },
    price: "Cena",
    layouts: "Dispozice",
    capacity: "Kapacita",
    knownCapacity: (count, total) => "uvedena u " + count + " z " + total + " nabídek",
    compareTitle: "Hlavní rozdíly",
    compareText: "Třídy se liší aktuální cenou a dostupnými dispozicemi. Otevřete jinou kategorii a nabídky porovnejte.",
    optionsTitle: "Vhodné možnosti",
    perDay: "MDL / noc",
    details: "Zobrazit apartmán",
    showAll: "Zobrazit všechny apartmány",
    faqTitle: "Časté otázky",
    priceQuestion: "Kolik stojí apartmán v tomto výběru?",
    priceAnswer: (minimum, maximum) => minimum === maximum
      ? "Aktuální cena zveřejněných nabídek je " + minimum + " MDL za noc."
      : "Aktuální rozmezí je " + minimum + "–" + maximum + " MDL za noc.",
    chooseQuestion: "Jak vybrat vhodnou možnost?",
    chooseAnswer: "Porovnejte dispozici, uvedenou kapacitu, cenu a fotografie. Před rezervací potvrďte dostupné termíny.",
    roomLabels: { studio: "studio", "1+1": "1+1", "2+1": "2+1" },
  },
};

const categoryThemes: Record<
  ApartmentClass | "all",
  {
    accent: string;
    background: string;
    glow: string;
    ink: string;
    line: string;
    panel: string;
    code: string;
  }
> = {
  all: {
    accent: "#d4146f",
    background: "#f5f2ec",
    glow: "rgba(212,20,111,0.12)",
    ink: "#07111f",
    line: "rgba(7,17,31,0.14)",
    panel: "#07111f",
    code: "00",
  },
  economy: {
    accent: "#087f6d",
    background: "#f0f3ea",
    glow: "rgba(8,127,109,0.15)",
    ink: "#0b2823",
    line: "rgba(11,40,35,0.15)",
    panel: "#0b2823",
    code: "01",
  },
  standard: {
    accent: "#2667b8",
    background: "#edf2f6",
    glow: "rgba(38,103,184,0.14)",
    ink: "#10243c",
    line: "rgba(16,36,60,0.15)",
    panel: "#10243c",
    code: "02",
  },
  standardPlus: {
    accent: "#c21868",
    background: "#f6eff3",
    glow: "rgba(194,24,104,0.14)",
    ink: "#321326",
    line: "rgba(50,19,38,0.15)",
    panel: "#321326",
    code: "03",
  },
  premium: {
    accent: "#a86f18",
    background: "#f0ede6",
    glow: "rgba(168,111,24,0.16)",
    ink: "#171c25",
    line: "rgba(23,28,37,0.15)",
    panel: "#171c25",
    code: "04",
  },
};

export default function ApartmentCategoryContent({
  category,
}: {
  category?: ApartmentClass;
}) {
  const { language } = useLanguage();
  const text = contentByLanguage[language];
  const apartments = category
    ? activeApartments.filter((apartment) => apartment.class === category)
    : activeApartments;
  const prices = apartments.map(getApartmentCatalogPrice);
  const minimum = Math.min(...prices);
  const maximum = Math.max(...prices);
  const layouts = [...new Set(apartments.map((apartment) => apartment.rooms))];
  const knownCapacity = apartments.filter((apartment) => apartment.guests !== null);
  const guestValues = knownCapacity.map((apartment) => apartment.guests as number);
  const capacityRange = guestValues.length > 0
    ? Math.min(...guestValues) === Math.max(...guestValues)
      ? String(Math.min(...guestValues))
      : Math.min(...guestValues) + "–" + Math.max(...guestValues)
    : null;
  const highlighted = category
    ? apartments.slice(0, 4)
    : apartmentCategoryOrder
        .map((item) => activeApartments.find((apartment) => apartment.class === item))
        .filter((apartment) => apartment !== undefined);
  const theme = categoryThemes[category ?? "all"];
  const themeStyle = {
    "--category-accent": theme.accent,
    "--category-background": theme.background,
    "--category-glow": theme.glow,
    "--category-ink": theme.ink,
    "--category-line": theme.line,
    "--category-panel": theme.panel,
  } as CSSProperties;

  return (
    <section
      data-category-content={category ?? "all"}
      style={themeStyle}
      className="relative overflow-hidden bg-[var(--category-background)] px-5 py-10 text-[var(--category-ink)] sm:px-8 sm:py-20 lg:px-10 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_right,var(--category-glow),transparent_58%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl min-w-0">
        <header className="grid gap-8 border-t border-[var(--category-line)] pt-7 lg:grid-cols-[minmax(0,1.35fr)_minmax(17rem,0.65fr)] lg:items-end lg:gap-16">
          <div className="min-w-0">
            <div className="flex items-center gap-3 text-[0.68rem] font-black uppercase tracking-[0.24em] text-[var(--category-accent)]">
              <span className="h-2 w-2 rounded-full bg-[var(--category-accent)]" aria-hidden="true" />
              RentPlace · {category ? apartmentClassLabels[category] : "Chisinau"}
            </div>
            <h2 className="mt-6 max-w-[17ch] text-balance text-[2.35rem] font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[4.25rem]">
              {category ? text.categoryTitle(apartmentClassLabels[category]) : text.allTitle}
            </h2>
          </div>
          <p className="max-w-[34rem] text-pretty text-[1.03rem] font-medium leading-7 text-[color:color-mix(in_srgb,var(--category-ink)_68%,transparent)] sm:text-lg sm:leading-8">
            {text.intro}
          </p>
        </header>

        <dl className="mt-12 border-y border-[var(--category-line)] sm:mt-16 sm:grid sm:grid-cols-3">
          <div className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 py-5 sm:block sm:border-r sm:border-[var(--category-line)] sm:py-7 sm:pr-8">
            <dt className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-[var(--category-accent)]">
              {text.price}
            </dt>
            <dd className="text-right text-2xl font-black tracking-[-0.035em] tabular-nums sm:mt-3 sm:text-left sm:text-3xl">
              {minimum === maximum ? minimum : minimum + "–" + maximum}
              <span className="ml-1.5 text-xs font-bold tracking-normal opacity-55">MDL</span>
            </dd>
          </div>
          <div className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-t border-[var(--category-line)] py-5 sm:block sm:border-l-0 sm:border-r sm:border-t-0 sm:px-8 sm:py-7">
            <dt className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-[var(--category-accent)]">
              {text.layouts}
            </dt>
            <dd className="break-words text-right text-xl font-black tracking-[-0.025em] sm:mt-3 sm:text-left sm:text-2xl">
              {layouts.map((layout) => text.roomLabels[layout]).join(" · ")}
            </dd>
          </div>
          <div className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-t border-[var(--category-line)] py-5 sm:block sm:border-t-0 sm:py-7 sm:pl-8">
            <dt className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-[var(--category-accent)]">
              {text.capacity}
            </dt>
            <dd className="text-right sm:mt-3 sm:text-left">
              {capacityRange ? (
                <span className="block text-2xl font-black tracking-[-0.035em] tabular-nums sm:text-3xl">
                  {capacityRange}
                </span>
              ) : null}
              <span className="mt-1 block text-xs font-semibold leading-5 opacity-55">
                {text.knownCapacity(knownCapacity.length, apartments.length)}
              </span>
            </dd>
          </div>
        </dl>

        <section className="relative mt-10 overflow-hidden rounded-[1.75rem] bg-[var(--category-panel)] px-6 py-7 text-white shadow-[0_28px_80px_rgba(7,17,31,0.16)] sm:mt-20 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div
            className="pointer-events-none absolute -right-8 -top-20 hidden text-[13rem] font-black leading-none tracking-[-0.08em] text-white/[0.045] sm:right-4 sm:block sm:text-[18rem]"
            aria-hidden="true"
          >
            {theme.code}
          </div>
          <div className="relative grid gap-8 lg:grid-cols-[0.52fr_1.48fr] lg:gap-14">
            <div>
              <p className="text-[0.68rem] font-black uppercase tracking-[0.22em] text-[var(--category-accent)]">
                RentPlace
              </p>
              <h3 className="mt-4 max-w-[13ch] text-2xl font-black leading-tight tracking-[-0.035em] sm:text-3xl">
                {text.fitTitle}
              </h3>
            </div>
            {category ? (
              <p className="max-w-2xl text-pretty text-xl font-semibold leading-8 text-white/80 sm:text-2xl sm:leading-9">
                {text.fit[category]}
              </p>
            ) : (
              <div className="divide-y divide-white/15 border-y border-white/15">
                {apartmentCategoryOrder.map((item, index) => (
                  <p
                    key={item}
                    className="grid min-w-0 grid-cols-[2rem_6.5rem_1fr] gap-2 py-4 text-sm leading-6 text-white/68 sm:grid-cols-[2.5rem_8rem_1fr] sm:gap-4 sm:text-base"
                  >
                    <span className="font-black text-[var(--category-accent)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <strong className="text-white">{apartmentClassLabels[item]}</strong>
                    <span>{text.fit[item]}</span>
                  </p>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="mt-12 min-w-0 sm:mt-20 lg:mt-28">
          <div className="max-w-2xl">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.22em] text-[var(--category-accent)]">
              RentPlace
            </p>
            <h3 className="mt-4 text-2xl font-black leading-tight tracking-[-0.035em] sm:text-3xl">
              {text.optionsTitle}
            </h3>
            <p className="mt-4 text-sm font-medium leading-7 opacity-65 sm:text-base">
              {text.compareText}
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {highlighted.map((apartment) => (
              <ApartmentCard key={apartment.id} apartment={apartment} />
            ))}
          </div>

          {category && apartments.length > 4 ? (
            <Link
              href="#apartments"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--category-ink)] px-5 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--category-accent)]"
            >
              {text.showAll}
            </Link>
          ) : null}
        </section>

        <section className="mt-12 border-t border-[var(--category-line)] pt-8 sm:mt-20 sm:pt-10 lg:mt-28 lg:grid lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:pt-14">
          <div>
            <p className="text-[0.68rem] font-black uppercase tracking-[0.22em] text-[var(--category-accent)]">
              03 · FAQ
            </p>
            <h3 className="mt-4 max-w-[12ch] text-2xl font-black leading-tight tracking-[-0.035em] sm:text-3xl">
              {text.faqTitle}
            </h3>
          </div>
          <div className="mt-8 border-b border-[var(--category-line)] lg:mt-0">
            <details className="group border-t border-[var(--category-line)]">
              <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-black leading-6 marker:content-none [&::-webkit-details-marker]:hidden sm:text-lg">
                <span>{text.priceQuestion}</span>
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--category-line)] text-lg font-medium transition duration-300 group-open:rotate-45 group-open:border-[var(--category-accent)] group-open:text-[var(--category-accent)]"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-7 pr-12 text-sm font-medium leading-7 opacity-65 sm:text-base">
                {text.priceAnswer(minimum, maximum)}
              </p>
            </details>
            <details className="group border-t border-[var(--category-line)]">
              <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-black leading-6 marker:content-none [&::-webkit-details-marker]:hidden sm:text-lg">
                <span>{text.chooseQuestion}</span>
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--category-line)] text-lg font-medium transition duration-300 group-open:rotate-45 group-open:border-[var(--category-accent)] group-open:text-[var(--category-accent)]"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-7 pr-12 text-sm font-medium leading-7 opacity-65 sm:text-base">
                {text.chooseAnswer}
              </p>
            </details>
          </div>
        </section>
      </div>
    </section>
  );
}
