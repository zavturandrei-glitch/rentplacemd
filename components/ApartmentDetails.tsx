"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import ApartmentGallery from "@/components/ApartmentGallery";
import ApartmentCategoryNav from "@/components/ApartmentCategoryNav";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ResponsiveImage from "@/components/ResponsiveImage";
import { useLanguage } from "@/context/LanguageContext";
import { getApartmentBookedDates } from "@/lib/availability";
import {
  formatLocalizedImageAlt,
  getApartmentDisplayAddress,
  getApartmentLocalization,
} from "@/lib/apartmentLocalization";
import {
  activeApartments,
  getApartmentCatalogPrice,
  getApartmentCategoryPath,
  getApartmentPath,
  type ApartmentClass,
} from "@/lib/apartments";
import { localizeAmenity } from "@/lib/amenityLocalization";
import type { Language } from "@/locales/translations";

export type ApartmentKind =
  | "studio"
  | "oneBedroom"
  | "twoBedroom"
  | "twoBedroomPlus";
export type ApartmentGuests = 2 | 3 | 4 | 5;

export type ApartmentDetailsData = {
  id: string | number;
  title: string;
  address: string;
  price: number;
  images: string[];
  kind: ApartmentKind;
  class: ApartmentClass;
  guests: ApartmentGuests | null;
  heroPosition?: string;
  facadePhoto?: string | null;
  displayKind?: string;
  displayOverlay?: string;
  intro?: string;
  aboutTitle?: string;
  descriptionParagraphs?: string[];
  features?: string[];
  galleryLayout?: "standard" | "extended";
};

export type ApartmentLocalizedSeoPayload = Record<
  Language,
  { title: string; description: string; jsonLd: unknown }
>;

type PageCopy = {
  back: string;
  map: string;
  priceSuffix: string;
  selectDates: string;
  actionHint: string;
  keyDetails: string;
  allAmenities: string;
  about: string;
  fallbackAboutTitle: string;
  fallbackIntro: string;
  fallbackDescription: string;
  moreDescription: string;
  suitableFor: string;
  location: string;
  locationHint: string;
  stayConditions: string;
  allRules: string;
  checkIn: string;
  checkOut: string;
  checkInTime: string;
  checkOutTime: string;
  rulesIntro: string;
  rules: string[];
  faq: string;
  related: string;
  relatedDescription: string;
  relatedPrice: string;
  call: string;
  gallery: string;
  allPhotos: string;
  previousPhoto: string;
  nextPhoto: string;
  closeGallery: string;
  facadeAlt: string;
  mainPhotoAlt: string;
  galleryPhotoAlt: string;
  kinds: Record<ApartmentKind, string>;
  guests: Record<ApartmentGuests, string>;
};

const pageCopy: Record<Language, PageCopy> = {
  ru: {
    back: "Назад ко всем квартирам",
    map: "Открыть в Google Maps",
    priceSuffix: "MDL / сутки",
    selectDates: "Выбрать даты",
    actionHint: "Проверьте даты и отправьте запрос без предоплаты на сайте.",
    keyDetails: "Главное об объекте",
    allAmenities: "Все удобства",
    about: "О квартире",
    fallbackAboutTitle: "{kind} · {address}",
    fallbackIntro: "{kind} по адресу {address} для посуточного проживания.",
    fallbackDescription: "На странице показаны фотографии и подтверждённое оснащение конкретного объекта ID {id}. Свободные даты можно проверить в календаре.",
    moreDescription: "Показать полное описание",
    suitableFor: "Кому подойдёт",
    location: "Расположение",
    locationHint: "Адрес откроется в Google Maps без подмены координат.",
    stayConditions: "Условия проживания",
    allRules: "Все правила",
    checkIn: "Заезд",
    checkOut: "Выезд",
    checkInTime: "с 14:00",
    checkOutTime: "до 12:00",
    rulesIntro: "Ранний заезд и поздний выезд согласовываются заранее, если квартира свободна.",
    rules: ["Заселение по документу", "Курение только на балконе или в разрешённых местах", "Чистое постельное бельё и полотенца", "Связь 24/7", "Оплата при заселении"],
    faq: "Вопросы гостей",
    related: "Похожие варианты",
    relatedDescription: "Три варианта с близкой категорией, вместимостью или ценой.",
    relatedPrice: "лей / сутки",
    call: "Позвонить",
    gallery: "Галерея квартиры",
    allPhotos: "Все фото",
    previousPhoto: "Предыдущее фото",
    nextPhoto: "Следующее фото",
    closeGallery: "Закрыть галерею",
    facadeAlt: "Фасад здания по адресу {address}",
    mainPhotoAlt: "Главное фото квартиры ID {id} · {address}",
    galleryPhotoAlt: "Фото квартиры ID {id}, изображение {index} · {address}",
    kinds: { studio: "Студия", oneBedroom: "Квартира 1+1", twoBedroom: "2 спальни", twoBedroomPlus: "Квартира 2+1" },
    guests: { 2: "до 2 гостей", 3: "до 3 гостей", 4: "до 4 гостей", 5: "до 5 гостей" },
  },
  ro: {
    back: "Înapoi la apartamente",
    map: "Deschide în Google Maps",
    priceSuffix: "MDL / zi",
    selectDates: "Alege datele",
    actionHint: "Verificați datele și trimiteți o solicitare fără plată pe site.",
    keyDetails: "Detalii esențiale",
    allAmenities: "Toate facilitățile",
    about: "Despre apartament",
    fallbackAboutTitle: "{kind} · {address}",
    fallbackIntro: "{kind} la adresa {address}, disponibil pentru cazare pe termen scurt.",
    fallbackDescription: "Pagina prezintă fotografiile și dotările confirmate ale obiectului ID {id}. Datele libere pot fi verificate în calendar.",
    moreDescription: "Arată descrierea completă",
    suitableFor: "Pentru cine este potrivit",
    location: "Amplasare",
    locationHint: "Adresa se deschide în Google Maps fără coordonate inventate.",
    stayConditions: "Condiții de cazare",
    allRules: "Toate regulile",
    checkIn: "Check-in",
    checkOut: "Check-out",
    checkInTime: "de la 14:00",
    checkOutTime: "până la 12:00",
    rulesIntro: "Check-in mai devreme și check-out mai târziu se coordonează dacă apartamentul este liber.",
    rules: ["Cazare pe baza unui document", "Fumatul doar pe balcon sau în locuri permise", "Lenjerie și prosoape curate", "Contact 24/7", "Plata la cazare"],
    faq: "Întrebări frecvente",
    related: "Opțiuni similare",
    relatedDescription: "Trei opțiuni cu o categorie, capacitate sau preț apropiat.",
    relatedPrice: "lei / zi",
    call: "Sună",
    gallery: "Galeria apartamentului",
    allPhotos: "Toate fotografiile",
    previousPhoto: "Fotografia precedentă",
    nextPhoto: "Fotografia următoare",
    closeGallery: "Închide galeria",
    facadeAlt: "Fațada clădirii de pe {address}",
    mainPhotoAlt: "Fotografia principală a apartamentului ID {id} · {address}",
    galleryPhotoAlt: "Apartamentul ID {id}, fotografia {index} · {address}",
    kinds: { studio: "Studio", oneBedroom: "Apartament 1+1", twoBedroom: "2 dormitoare", twoBedroomPlus: "Apartament 2+1" },
    guests: { 2: "până la 2 oaspeți", 3: "până la 3 oaspeți", 4: "până la 4 oaspeți", 5: "până la 5 oaspeți" },
  },
  en: {
    back: "Back to apartments",
    map: "Open in Google Maps",
    priceSuffix: "MDL / night",
    selectDates: "Choose dates",
    actionHint: "Check your dates and send a request without paying on the site.",
    keyDetails: "At a glance",
    allAmenities: "All amenities",
    about: "About the apartment",
    fallbackAboutTitle: "{kind} · {address}",
    fallbackIntro: "{kind} at {address}, available for short stays.",
    fallbackDescription: "This page shows photos and confirmed amenities for property ID {id}. Available dates can be checked in the calendar.",
    moreDescription: "Show full description",
    suitableFor: "Who it suits",
    location: "Location",
    locationHint: "The verified address opens in Google Maps without guessed coordinates.",
    stayConditions: "Stay conditions",
    allRules: "All house rules",
    checkIn: "Check-in",
    checkOut: "Check-out",
    checkInTime: "from 14:00",
    checkOutTime: "by 12:00",
    rulesIntro: "Early check-in and late check-out can be arranged when the apartment is free.",
    rules: ["Identity document required at check-in", "Smoking only on the balcony or in permitted areas", "Clean bed linen and towels", "24/7 contact", "Payment at check-in"],
    faq: "Guest questions",
    related: "Similar options",
    relatedDescription: "Three options with a similar category, capacity or price.",
    relatedPrice: "MDL / night",
    call: "Call",
    gallery: "Apartment gallery",
    allPhotos: "All photos",
    previousPhoto: "Previous photo",
    nextPhoto: "Next photo",
    closeGallery: "Close gallery",
    facadeAlt: "Building facade at {address}",
    mainPhotoAlt: "Main photo of apartment ID {id} · {address}",
    galleryPhotoAlt: "Apartment ID {id}, photo {index} · {address}",
    kinds: { studio: "Studio", oneBedroom: "1+1 apartment", twoBedroom: "2 bedrooms", twoBedroomPlus: "2+1 apartment" },
    guests: { 2: "up to 2 guests", 3: "up to 3 guests", 4: "up to 4 guests", 5: "up to 5 guests" },
  },
  uk: {
    back: "Назад до квартир",
    map: "Відкрити в Google Maps",
    priceSuffix: "MDL / доба",
    selectDates: "Обрати дати",
    actionHint: "Перевірте дати та надішліть запит без оплати на сайті.",
    keyDetails: "Головне про об’єкт",
    allAmenities: "Усі зручності",
    about: "Про квартиру",
    fallbackAboutTitle: "{kind} · {address}",
    fallbackIntro: "{kind} за адресою {address} для подобового проживання.",
    fallbackDescription: "На сторінці показані фотографії та підтверджене оснащення об’єкта ID {id}. Вільні дати можна перевірити в календарі.",
    moreDescription: "Показати повний опис",
    suitableFor: "Кому підійде",
    location: "Розташування",
    locationHint: "Адреса відкриється в Google Maps без вигаданих координат.",
    stayConditions: "Умови проживання",
    allRules: "Усі правила",
    checkIn: "Заїзд",
    checkOut: "Виїзд",
    checkInTime: "з 14:00",
    checkOutTime: "до 12:00",
    rulesIntro: "Ранній заїзд і пізній виїзд узгоджуються, якщо квартира вільна.",
    rules: ["Заселення за документом", "Куріння лише на балконі або у дозволених місцях", "Чиста постільна білизна та рушники", "Зв’язок 24/7", "Оплата при заселенні"],
    faq: "Питання гостей",
    related: "Схожі варіанти",
    relatedDescription: "Три варіанти зі схожою категорією, місткістю або ціною.",
    relatedPrice: "лей / доба",
    call: "Подзвонити",
    gallery: "Галерея квартири",
    allPhotos: "Усі фото",
    previousPhoto: "Попереднє фото",
    nextPhoto: "Наступне фото",
    closeGallery: "Закрити галерею",
    facadeAlt: "Фасад будівлі за адресою {address}",
    mainPhotoAlt: "Головне фото квартири ID {id} · {address}",
    galleryPhotoAlt: "Квартира ID {id}, фото {index} · {address}",
    kinds: { studio: "Студія", oneBedroom: "Квартира 1+1", twoBedroom: "2 спальні", twoBedroomPlus: "Квартира 2+1" },
    guests: { 2: "до 2 гостей", 3: "до 3 гостей", 4: "до 4 гостей", 5: "до 5 гостей" },
  },
  cs: {
    back: "Zpět na apartmány",
    map: "Otevřít v Google Maps",
    priceSuffix: "MDL / noc",
    selectDates: "Vybrat termín",
    actionHint: "Ověřte termín a odešlete poptávku bez platby na webu.",
    keyDetails: "Hlavní informace",
    allAmenities: "Veškeré vybavení",
    about: "O apartmánu",
    fallbackAboutTitle: "{kind} · {address}",
    fallbackIntro: "{kind} na adrese {address} pro krátkodobé pobyty.",
    fallbackDescription: "Stránka zobrazuje fotografie a potvrzené vybavení objektu ID {id}. Volné termíny lze ověřit v kalendáři.",
    moreDescription: "Zobrazit celý popis",
    suitableFor: "Pro koho se hodí",
    location: "Poloha",
    locationHint: "Ověřená adresa se otevře v Google Maps bez odhadovaných souřadnic.",
    stayConditions: "Podmínky pobytu",
    allRules: "Všechna pravidla",
    checkIn: "Příjezd",
    checkOut: "Odjezd",
    checkInTime: "od 14:00",
    checkOutTime: "do 12:00",
    rulesIntro: "Dřívější příjezd a pozdější odjezd lze domluvit, pokud je apartmán volný.",
    rules: ["Ubytování po předložení dokladu", "Kouření jen na balkoně nebo povolených místech", "Čisté povlečení a ručníky", "Kontakt 24/7", "Platba při příjezdu"],
    faq: "Otázky hostů",
    related: "Podobné možnosti",
    relatedDescription: "Tři možnosti s podobnou kategorií, kapacitou nebo cenou.",
    relatedPrice: "MDL / noc",
    call: "Zavolat",
    gallery: "Galerie apartmánu",
    allPhotos: "Všechny fotografie",
    previousPhoto: "Předchozí fotografie",
    nextPhoto: "Další fotografie",
    closeGallery: "Zavřít galerii",
    facadeAlt: "Fasáda budovy na adrese {address}",
    mainPhotoAlt: "Hlavní foto apartmánu ID {id} · {address}",
    galleryPhotoAlt: "Apartmán ID {id}, fotografie {index} · {address}",
    kinds: { studio: "Studio", oneBedroom: "Apartmán 1+1", twoBedroom: "2 ložnice", twoBedroomPlus: "Apartmán 2+1" },
    guests: { 2: "až 2 hosté", 3: "až 3 hosté", 4: "až 4 hosté", 5: "až 5 hostů" },
  },
};

function format(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(values[key] ?? ""),
  );
}

function getRelatedApartments(apartment: ApartmentDetailsData) {
  return activeApartments
    .filter((candidate) => candidate.id !== apartment.id)
    .map((candidate) => {
      const priceDifference = Math.abs(
        getApartmentCatalogPrice(candidate) -
          getApartmentCatalogPrice(apartment),
      );
      const score =
        (candidate.class === apartment.class ? 10 : 0) +
        (apartment.guests !== null && candidate.guests === apartment.guests
          ? 7
          : 0) +
        (candidate.kind === apartment.kind ? 5 : 0) +
        (priceDifference === 0
          ? 5
          : priceDifference <= 100
            ? 3
            : priceDifference <= 200
              ? 1
              : 0);
      return { apartment: candidate, score, priceDifference };
    })
    .sort(
      (left, right) =>
        right.score - left.score ||
        left.priceDifference - right.priceDifference,
    )
    .slice(0, 3)
    .map(({ apartment: candidate }) => candidate);
}

export default function ApartmentDetails({
  apartment,
  localizedSeo,
}: {
  apartment: ApartmentDetailsData;
  localizedSeo?: ApartmentLocalizedSeoPayload;
}) {
  const { language } = useLanguage();
  const text = pageCopy[language];
  const localizedApartment = getApartmentLocalization(apartment.id, language);
  const locationTitle = getApartmentDisplayAddress(
    apartment.id,
    apartment.title,
    language,
  );
  const displayedPrice = getApartmentCatalogPrice(apartment);
  const compactLocationTitle = locationTitle.replace(/,\s*/g, " ");
  const categoryLabel =
    apartment.class === "premium"
      ? "Premium"
      : apartment.class === "standardPlus"
        ? language === "ru" ? "Комфорт" : "Comfort"
        : apartment.class === "standard"
          ? "Standard"
          : "Economy";
  const rawKindLabel =
    localizedApartment?.typeLabel ??
    apartment.displayKind ??
    text.kinds[apartment.kind];
  const kindLabel =
    rawKindLabel.replace(categoryLabel, "").trim() ||
    text.kinds[apartment.kind];
  const mainPhotoAlt = localizedApartment
    ? formatLocalizedImageAlt(localizedApartment.imageAlt, 1)
    : format(text.mainPhotoAlt, {
        id: apartment.id,
        address: locationTitle,
      });
  const galleryPhotos = [
    ...apartment.images.map((src, index) => ({
      src,
      alt:
        index === 0
          ? mainPhotoAlt
          : localizedApartment
            ? formatLocalizedImageAlt(localizedApartment.imageAlt, index + 1)
            : format(text.galleryPhotoAlt, {
                id: apartment.id,
                index: index + 1,
                address: locationTitle,
              }),
    })),
    ...(apartment.facadePhoto
      ? [
          {
            src: apartment.facadePhoto,
            alt:
              localizedApartment?.facadeAlt ??
              format(text.facadeAlt, { address: locationTitle }),
          },
        ]
      : []),
  ];
  const allAmenities = Array.from(
    new Set(
      (
        localizedApartment?.features ??
        apartment.features ??
        []
      )
        .filter((item) => item && item !== categoryLabel)
        .map((item) => localizeAmenity(item, language)),
    ),
  );
  const primaryDetails = Array.from(
    new Set([
      kindLabel,
      ...(apartment.guests !== null ? [text.guests[apartment.guests]] : []),
      ...allAmenities,
    ]),
  ).slice(0, 7);
  const nearbyItems = localizedApartment?.nearbyItems?.slice(0, 4) ?? [];
  const relatedApartments = useMemo(
    () => getRelatedApartments(apartment),
    [apartment],
  );
  const bookedDates = getApartmentBookedDates(apartment.id);
  const apartmentPath =
    activeApartments.find((item) => item.id === apartment.id)?.slug
      ? getApartmentPath(
          activeApartments.find((item) => item.id === apartment.id)!,
        )
      : "/apartments";
  const categoryPath = getApartmentCategoryPath(apartment.class);
  const whatsappText = format(
    language === "ru"
      ? "Здравствуйте! Интересует квартира ID {id}, {address}. Ссылка: {url}"
      : language === "ro"
        ? "Bună ziua! Mă interesează apartamentul ID {id}, {address}. Link: {url}"
        : language === "en"
          ? "Hello! I am interested in apartment ID {id}, {address}. Link: {url}"
          : language === "uk"
            ? "Добрий день! Цікавить квартира ID {id}, {address}. Посилання: {url}"
            : "Dobrý den! Mám zájem o apartmán ID {id}, {address}. Odkaz: {url}",
    {
      id: apartment.id,
      address: locationTitle,
      url: `https://rentplace.md${apartmentPath}`,
    },
  );
  const whatsappLink =
    "https://wa.me/37369990190?text=" + encodeURIComponent(whatsappText);

  useEffect(() => {
    const seo = localizedSeo?.[language];
    if (!seo) return;

    const localizedTitle = `${seo.title} | RentPlaceMD`;
    document.title = localizedTitle;
    const observer = new MutationObserver(() => {
      if (document.title !== localizedTitle) document.title = localizedTitle;
    });
    observer.observe(document.head, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    const updateMeta = (selector: string, content: string) => {
      document
        .querySelector<HTMLMetaElement>(selector)
        ?.setAttribute("content", content);
    };
    updateMeta('meta[name="description"]', seo.description);
    updateMeta('meta[property="og:title"]', seo.title);
    updateMeta('meta[property="og:description"]', seo.description);
    updateMeta('meta[name="twitter:title"]', seo.title);
    updateMeta('meta[name="twitter:description"]', seo.description);
    const jsonLdScript = document.getElementById(
      `apartment-${apartment.id}-jsonld`,
    );
    if (jsonLdScript) jsonLdScript.textContent = JSON.stringify(seo.jsonLd);

    return () => observer.disconnect();
  }, [apartment.id, language, localizedSeo]);

  return (
    <main className="min-h-screen bg-[#111b2a] text-[#07111f]">
      <Header apartmentId={apartment.id} />
      <ApartmentCategoryNav currentClass={apartment.class} />

      <div className="mx-auto mt-3 max-w-[1180px] rounded-t-[24px] bg-[#f7f4ee] px-3 pb-28 pt-3 sm:px-6 sm:pt-5 lg:px-8 lg:pb-16">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 hidden items-center gap-2 text-sm font-bold text-slate-500 md:flex"
        >
          <Link href="/apartments" className="hover:text-[#d4146f]">
            {text.back}
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={categoryPath} className="hover:text-[#d4146f]">
            {categoryLabel}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="truncate text-[#07111f]">
            {locationTitle} · ID {apartment.id}
          </span>
        </nav>

        <article className="rounded-2xl border border-[#07111f]/10 bg-white px-3 py-3 sm:px-6 sm:py-5">
          <div className="flex min-w-0 items-center gap-2 sm:gap-4">
            <strong className="shrink-0 text-sm font-black text-[#07111f] sm:text-lg">ID {apartment.id}</strong>
            <h1 className="min-w-0 flex-1 truncate text-sm font-black leading-tight tracking-tight sm:text-3xl">
              {compactLocationTitle}
            </h1>
            <p className="shrink-0 text-base font-black leading-none text-[#d4146f] sm:text-3xl">
              {displayedPrice} <span className="text-xs sm:text-sm">MDL</span>
            </p>
          </div>
        </article>

        <div className="mt-3">
          <ApartmentGallery
            photos={galleryPhotos}
            heroPosition={apartment.heroPosition}
            labels={{
              gallery: text.gallery,
              allPhotos: text.allPhotos,
              previous: text.previousPhoto,
              next: text.nextPhoto,
              close: text.closeGallery,
            }}
          />
        </div>

        <section className="mt-3 rounded-2xl bg-[#07111f] p-4 text-white shadow-[0_12px_35px_rgba(7,17,31,0.12)] sm:flex sm:items-center sm:justify-between sm:gap-5 sm:p-5">
          <p className="text-xs font-medium leading-5 text-white/65">{text.actionHint}</p>
          <a
            href="#availability"
            className="mt-3 flex min-h-12 items-center justify-center rounded-xl bg-[#ffd21f] px-5 text-sm font-black text-[#07111f] transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:mt-0 sm:min-w-48"
          >
            {text.selectDates}
          </a>
        </section>

        {primaryDetails.length > 0 ? (
          <section className="border-b border-[#07111f]/10 py-5 sm:py-7">
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              {text.keyDetails}
            </h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3 lg:grid-cols-4">
              {primaryDetails.map((item) => (
                <li
                  key={item}
                  className="min-h-9 border-b border-[#07111f]/8 py-2 text-sm font-bold"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div id="availability" className="scroll-mt-20 py-6 sm:py-8">
          <AvailabilityCalendar
            apartmentId={apartment.id}
            apartmentPath={apartmentPath}
            address={locationTitle}
            bookedDates={bookedDates}
            price={displayedPrice}
          />
        </div>

        <section className="border-t border-[#07111f]/10 py-5 sm:py-7">
          <div className="grid gap-3 rounded-2xl bg-[#07111f] p-4 text-white sm:p-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#ffd21f]">
                {text.location}
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight">
                {locationTitle}
              </h2>
              {nearbyItems.length > 0 ? (
                <ul className="mt-3 grid gap-1 text-sm font-medium leading-5 text-white/75 sm:grid-cols-2">
                  {nearbyItems.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[#ffd21f]" aria-hidden="true">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-white/65">
                  {text.locationHint}
                </p>
              )}
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(apartment.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center rounded-xl bg-white px-5 text-sm font-black text-[#07111f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd21f]"
            >
              {text.map}
            </a>
          </div>
        </section>

        <section className="border-t border-[#07111f]/10 py-7 sm:py-9">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#d4146f]">
                {text.stayConditions}
              </p>
              <h2 className="sr-only">{text.stayConditions}</h2>
              <div className="mt-3 flex gap-6">
                <p className="text-sm">
                  <span className="block font-bold text-slate-500">{text.checkIn}</span>
                  <span className="mt-1 block text-lg font-black">{text.checkInTime}</span>
                </p>
                <p className="text-sm">
                  <span className="block font-bold text-slate-500">{text.checkOut}</span>
                  <span className="mt-1 block text-lg font-black">{text.checkOutTime}</span>
                </p>
              </div>
            </div>
          </div>
          <details className="group mt-4 rounded-2xl border border-[#07111f]/10 bg-white">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 text-sm font-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f] sm:px-5">
              {text.allRules}
              <span className="text-2xl font-light transition group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <div className="border-t border-[#07111f]/10 px-4 py-5 sm:px-5">
              <p className="text-sm font-medium leading-6 text-slate-600">
                {text.rulesIntro}
              </p>
              <ul className="mt-4 grid gap-3 text-sm font-bold sm:grid-cols-2">
                {text.rules.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-[#d4146f]" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </section>

        {relatedApartments.length > 0 ? (
          <section className="border-t border-[#07111f]/10 py-7 sm:py-9" aria-labelledby="related-apartments-title">
            <h2 id="related-apartments-title" className="text-2xl font-black tracking-tight">
              {text.related}
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-600">
              {text.relatedDescription}
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {relatedApartments.map((relatedApartment) => {
                const relatedAddress = getApartmentDisplayAddress(
                  relatedApartment.id,
                  relatedApartment.title,
                  language,
                );
                return (
                  <Link
                    key={relatedApartment.id}
                    href={getApartmentPath(relatedApartment)}
                    className="group grid grid-cols-[112px_1fr] overflow-hidden rounded-2xl border border-[#07111f]/10 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f] md:block"
                  >
                    <ResponsiveImage
                      src={relatedApartment.cardPhoto ?? relatedApartment.photos[0]}
                      alt={`${relatedAddress} · ID ${relatedApartment.id}`}
                      className="h-full min-h-28 md:h-40"
                      imgClassName="object-cover transition group-hover:scale-[1.02]"
                      sizes="(min-width: 768px) 33vw, 112px"
                      loading="lazy"
                    />
                    <div className="min-w-0 p-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[11px] font-black text-[#d4146f]">
                          ID {relatedApartment.id}
                        </p>
                        <p className="text-xs font-black">
                          {getApartmentCatalogPrice(relatedApartment)} {text.relatedPrice}
                        </p>
                      </div>
                      <p className="mt-2 truncate text-sm font-black">{relatedAddress}</p>
                      <p className="mt-1 text-xs font-bold text-slate-500">
                        {text.kinds[relatedApartment.kind]}
                        {relatedApartment.guests !== null
                          ? ` · ${text.guests[relatedApartment.guests]}`
                          : ""}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}
      </div>

      <Footer />
      <div
        className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#07111f]/96 px-3 pt-1.5 shadow-[0_-8px_24px_rgba(7,17,31,0.2)] backdrop-blur lg:hidden"
        style={{
          paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))",
        }}
      >
        <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center justify-center rounded-xl bg-[#25D366] px-2 text-center text-xs font-black text-white"
          >
            WhatsApp
          </a>
          <a
            href="viber://chat?number=%2B37369990190"
            className="flex min-h-11 items-center justify-center rounded-xl bg-[#7360F2] px-2 text-center text-xs font-black text-white"
          >
            Viber
          </a>
          <a
            href="tel:+37369990190"
            className="flex min-h-11 items-center justify-center rounded-xl bg-[#d4146f] px-2 text-center text-xs font-black text-white"
          >
            {text.call}
          </a>
        </div>
      </div>
    </main>
  );
}
