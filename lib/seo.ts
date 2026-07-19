import type { Metadata } from "next";
import type { Language } from "@/locales/translations";
import {
  formatLocalizedImageAlt,
  getApartmentDisplayAddress,
  getApartmentSeoLocalization,
} from "@/lib/apartmentLocalization";
import {
  apartmentCategoryOrder,
  apartmentClassLabels,
  apartmentDetailsById,
  activeApartments,
  getApartmentById,
  getApartmentCategoryPath,
  type ApartmentId,
  type ApartmentClass,
  getApartmentPath as getApartmentDataPath,
} from "@/lib/apartments";

export const baseUrl = "https://rentplace.md";
export const siteName = "RentPlaceMD";
export const defaultLocale = "ru_MD";
export const supportedLanguages = ["ru", "ro", "en", "uk", "cs"] as const satisfies readonly Language[];
const openGraphLocale: Record<Language, string> = {
  ru: "ru_MD",
  ro: "ro_MD",
  en: "en_US",
  uk: "uk_UA",
  cs: "cs_CZ",
};
export const address = {
  streetAddress: "Ismail 88",
  addressLocality: "Chisinau",
  addressRegion: "Chisinau",
  postalCode: "MD-2001",
  addressCountry: "MD",
};

export const phoneNumbers = ["+37369990190", "+37379990190"];
export const sameAs = ["https://t.me/rentplacemd", "https://wa.me/37369990190"];

export const siteTitle = "RentPlaceMD - квартиры посуточно в центре Кишинёва";
export const siteDescription =
  "Квартиры посуточно в центре Кишинёва, комплекс Измаил 88. Реальные фото, заселение 24/7, WhatsApp/Viber, прямой контакт без посредников.";

export const seoKeywords = [
  "квартиры посуточно Кишинев",
  "квартиры посуточно Кишинёв",
  "апартаменты Кишинев центр",
  "апартаменты Кишинёв центр",
  "аренда квартиры посуточно Кишинев",
  "RentPlaceMD",
  "Измаил 88",
  "daily apartments Chisinau",
  "short term rental Chisinau",
];

export const kindTitle = {
  studio: "студия",
  oneBedroom: "квартира 1+1",
  twoBedroom: "квартира с 2 спальнями",
  twoBedroomPlus: "квартира 2+1",
} as const;

export const iconMetadata: Metadata["icons"] = {
  icon: [
    { url: "/favicon.ico", sizes: "any" },
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    { url: "/icon.png", sizes: "512x512", type: "image/png" },
  ],
  shortcut: ["/favicon.ico"],
  apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
};

export function getApartmentSlug(id: ApartmentId) {
  return getApartmentById(id)?.slug ?? "izmail88-" + id;
}

export function getApartmentUrl(id: ApartmentId) {
  return baseUrl + "/apartment/" + getApartmentSlug(id);
}

export function apartmentPath(id: ApartmentId) {
  const apartment = getApartmentById(id);
  return apartment ? getApartmentDataPath(apartment) : "/apartment/" + getApartmentSlug(id);
}

export function normalizeSiteLanguage(language?: string): Language {
  return supportedLanguages.includes(language as Language) ? language as Language : "ru";
}

function localizedUrl(path: string, language: Language) {
  return baseUrl + path + (path.includes("?") ? "&" : "?") + "lang=" + language;
}

export function routeAlternates(path = "", language?: string) {
  const normalizedLanguage = language ? normalizeSiteLanguage(language) : null;
  const url = normalizedLanguage ? localizedUrl(path, normalizedLanguage) : baseUrl + path;
  return {
    canonical: url,
    languages: {
      ru: localizedUrl(path, "ru"),
      ro: localizedUrl(path, "ro"),
      en: localizedUrl(path, "en"),
      uk: localizedUrl(path, "uk"),
      cs: localizedUrl(path, "cs"),
      "x-default": baseUrl + path,
    },
  };
}

export function apartmentAlternates(id: ApartmentId, language?: string) {
  return routeAlternates(apartmentPath(id), language);
}

export const apartmentCategorySeo: Record<
  ApartmentClass,
  { title: string; description: string; intro: string }
> = {
  economy: {
    title: "Economy квартиры RentPlaceMD в Кишинёве",
    description:
      "Практичные квартиры Economy RentPlaceMD в центре Кишинёва. Реальные фото, ID, цены и быстрый контакт для проверки свободных дат.",
    intro:
      "Практичные квартиры по доступной цене для гостей, которым важны центр города, понятная стоимость и быстрый контакт.",
  },
  standard: {
    title: "Standard квартиры RentPlaceMD в Кишинёве",
    description:
      "Квартиры Standard RentPlaceMD в Кишинёве для посуточного проживания, отдыха и командировок. Фото, цены и прямой контакт.",
    intro:
      "Комфортные квартиры для повседневного проживания, короткого отдыха и рабочих поездок в центральной части Кишинёва.",
  },
  standardPlus: {
    title: "Standard+ квартиры RentPlaceMD в Кишинёве",
    description:
      "Квартиры Standard+ RentPlaceMD в Кишинёве: более свежие и улучшенные варианты повышенного комфорта с реальными фото.",
    intro:
      "Более свежие или улучшенные варианты для гостей, которые хотят повышенный комфорт и аккуратный визуальный уровень.",
  },
  premium: {
    title: "Premium квартиры RentPlaceMD в Кишинёве",
    description:
      "Квартиры Premium RentPlaceMD в Кишинёве с отдельной спальней и гостиной, реальными фото и прямым бронированием.",
    intro:
      "Премиальные квартиры с отдельной спальней и гостиной для комфортного проживания в центре Кишинёва.",
  },
};

const categorySeoLanguage: Record<Language, {
  allApartments: string;
  categories: string;
  title: (category: string) => string;
  description: (category: string) => string;
}> = {
  ru: { allApartments: "Все квартиры", categories: "Категории квартир RentPlaceMD", title: (category) => category + " квартиры RentPlaceMD в Кишинёве", description: (category) => "Квартиры " + category + " RentPlaceMD в Кишинёве: реальные фотографии, актуальные цены и прямое бронирование." },
  ro: { allApartments: "Toate apartamentele", categories: "Categoriile apartamentelor RentPlaceMD", title: (category) => "Apartamente " + category + " RentPlaceMD în Chișinău", description: (category) => "Apartamente " + category + " RentPlaceMD în Chișinău, cu fotografii reale, prețuri actuale și rezervare directă." },
  en: { allApartments: "All apartments", categories: "RentPlaceMD apartment categories", title: (category) => category + " RentPlaceMD apartments in Chisinau", description: (category) => category + " RentPlaceMD apartments in Chisinau with real photos, current prices and direct booking." },
  uk: { allApartments: "Усі квартири", categories: "Категорії квартир RentPlaceMD", title: (category) => "Квартири " + category + " RentPlaceMD у Кишиневі", description: (category) => "Квартири " + category + " RentPlaceMD у Кишиневі: реальні фотографії, актуальні ціни та пряме бронювання." },
  cs: { allApartments: "Všechny apartmány", categories: "Kategorie apartmánů RentPlaceMD", title: (category) => "Apartmány " + category + " RentPlaceMD v Kišiněvě", description: (category) => "Apartmány " + category + " RentPlaceMD v Kišiněvě s reálnými fotografiemi, aktuálními cenami a přímou rezervací." },
};

const apartmentsPageSeo: Record<Language, { title: string; description: string }> = {
  ru: { title: "Выбор класса квартиры RentPlaceMD", description: "Выберите квартиру RentPlaceMD в Кишинёве: Economy, Standard, Standard+ или Premium. Реальные фотографии, минимальные цены и доступные варианты." },
  ro: { title: "Alege clasa apartamentului RentPlaceMD", description: "Alege un apartament RentPlaceMD în Chișinău: Economy, Standard, Standard+ sau Premium. Fotografii reale, prețuri minime și opțiuni disponibile." },
  en: { title: "Choose a RentPlaceMD apartment class", description: "Choose a RentPlaceMD apartment in Chisinau: Economy, Standard, Standard+ or Premium. Real photos, minimum prices and available options." },
  uk: { title: "Оберіть клас квартири RentPlaceMD", description: "Оберіть квартиру RentPlaceMD у Кишиневі: Economy, Standard, Standard+ або Premium. Реальні фотографії, мінімальні ціни та доступні варіанти." },
  cs: { title: "Vyberte třídu apartmánu RentPlaceMD", description: "Vyberte si apartmán RentPlaceMD v Kišiněvě: Economy, Standard, Standard+ nebo Premium. Reálné fotografie, minimální ceny a dostupné možnosti." },
};

export function getApartmentsPageMetadata(languageInput?: string): Metadata {
  const language = normalizeSiteLanguage(languageInput);
  const seo = apartmentsPageSeo[language];
  const path = "/apartments";
  const url = languageInput ? localizedUrl(path, language) : baseUrl + path;

  return {
    title: seo.title,
    description: seo.description,
    alternates: routeAlternates(path, languageInput),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: seo.title }],
      locale: openGraphLocale[language],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/og-image.jpg"],
    },
  };
}

function getLocalizedCategorySeo(category: ApartmentClass, language: Language) {
  const label = apartmentClassLabels[category];
  const text = categorySeoLanguage[language];
  return {
    title: text.title(label),
    description: text.description(label),
    intro: apartmentCategorySeo[category].intro,
  };
}

export function getApartmentCategoryMetadata(category: ApartmentClass, languageInput?: string): Metadata {
  const language = normalizeSiteLanguage(languageInput);
  const seo = getLocalizedCategorySeo(category, language);
  const path = getApartmentCategoryPath(category);
  const url = languageInput ? localizedUrl(path, language) : baseUrl + path;

  return {
    title: seo.title,
    description: seo.description,
    alternates: routeAlternates(path, languageInput),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
      locale: openGraphLocale[language],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/og-image.jpg"],
    },
  };
}

export function getApartmentCategoryMenuJsonLd(languageInput?: string) {
  const language = normalizeSiteLanguage(languageInput);
  const text = categorySeoLanguage[language];
  const apartmentsUrl = languageInput ? localizedUrl("/apartments", language) : baseUrl + "/apartments";
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: siteName,
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: text.allApartments,
          item: apartmentsUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: text.categories,
      itemListElement: apartmentCategoryOrder.map((category, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: getLocalizedCategorySeo(category, language).title,
        url: languageInput ? localizedUrl(getApartmentCategoryPath(category), language) : baseUrl + getApartmentCategoryPath(category),
      })),
    },
  ];
}

export function getApartmentCategoryJsonLd(category: ApartmentClass, languageInput?: string) {
  const language = normalizeSiteLanguage(languageInput);
  const seo = getLocalizedCategorySeo(category, language);
  const text = categorySeoLanguage[language];
  const path = getApartmentCategoryPath(category);
  const categoryUrl = languageInput ? localizedUrl(path, language) : baseUrl + path;
  const apartmentsUrl = languageInput ? localizedUrl("/apartments", language) : baseUrl + "/apartments";
  const categoryApartments = activeApartments.filter((apartment) => apartment.class === category);

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: siteName,
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: text.allApartments,
          item: apartmentsUrl,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: seo.title,
          item: categoryUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: seo.title,
      description: seo.description,
      url: categoryUrl,
      itemListElement: categoryApartments.map((apartment, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: languageInput ? localizedUrl(apartmentPath(apartment.id), language) : getApartmentUrl(apartment.id),
        name: "RentPlaceMD ID " + apartment.id,
      })),
    },
  ];
}

export function buildApartmentTitle(
  id: ApartmentId,
  language: Language = "ru",
) {
  const apartment = apartmentDetailsById[String(id)];
  const localized = getApartmentSeoLocalization(id, language);
  if (localized) return localized.title;
  return "ID " + id + " - " + kindTitle[apartment.kind] + ", " + apartment.title + " посуточно";
}

export function buildApartmentDescription(
  id: ApartmentId,
  language: Language = "ru",
) {
  const apartment = apartmentDetailsById[String(id)];
  const localized = getApartmentSeoLocalization(id, language);
  if (localized) return localized.description;
  return "Квартира ID " + id + ": " + kindTitle[apartment.kind] + " по адресу " + apartment.address + ". " + apartment.price + " лей/сутки, до " + apartment.guests + " гостей, реальные фото, Wi-Fi, чистое бельё, заселение 24/7.";
}

export function apartmentImageAlt(
  id: ApartmentId,
  index = 1,
  language: Language = "ru",
) {
  const apartment = apartmentDetailsById[String(id)];
  const localized = getApartmentSeoLocalization(id, language);
  if (localized) return formatLocalizedImageAlt(localized.imageAlt, index);
  return "RentPlaceMD " + kindTitle[apartment.kind] + " ID " + id + ", " + apartment.title + ", фото " + index;
}

export function buildApartmentKeywords(id: ApartmentId) {
  const apartment = apartmentDetailsById[String(id)];
  return [
    "квартира " + id + " посуточно Кишинев",
    "квартира " + id + " посуточно Кишинёв",
    apartment.title,
    "RentPlaceMD",
    kindTitle[apartment.kind],
    "апартаменты Кишинев центр",
    "квартира " + apartment.title,
    "посуточно без посредников",
  ];
}

function apartmentSeoImages(id: ApartmentId) {
  const apartment = apartmentDetailsById[String(id)];
  return [...apartment.images, apartment.facadePhoto ?? "/common/building.png"];
}

function imageObjects(images: string[], getAlt: (index: number) => string) {
  return images.map((image, index) => ({
    "@type": "ImageObject",
    url: baseUrl + image,
    contentUrl: baseUrl + image,
    caption: getAlt(index + 1),
    representativeOfPage: index === 0,
  }));
}

function offerForApartment(apartment: { id: ApartmentId; price: number }) {
  return {
    "@type": "Offer",
    url: getApartmentUrl(apartment.id),
    price: apartment.price,
    priceCurrency: "MDL",
    availability: "https://schema.org/InStock",
    priceSpecification: {
      "@type": "PriceSpecification",
      price: apartment.price,
      priceCurrency: "MDL",
      unitText: "DAY",
    },
  };
}

export function getApartmentMetadata(id: ApartmentId, languageInput?: string): Metadata {
  const language = normalizeSiteLanguage(languageInput);
  const apartment = apartmentDetailsById[String(id)];
  const title =
    language === "ru" && id === 3
      ? "Студия Standard Plus в центре Кишинёва — ID 3 | RentPlaceMD"
      : language === "ru" && id === 5
        ? "Студия Standard+ — ID 5 | RentPlaceMD"
      : buildApartmentTitle(id, language);
  const description =
    language === "ru" && id === 3
      ? "Современная студия категории Standard Plus. Центр Кишинёва. Новострой. Wi-Fi. Кондиционер. Кухня. Заселение 24/7. Цена от 900 MDL."
      : language === "ru" && id === 5
        ? "Современная студия категории Standard+ в центре Кишинёва. Новострой. Wi-Fi. Кондиционер. Заселение 24/7. Цена от 900 MDL."
      : buildApartmentDescription(id, language);
  const path = apartmentPath(id);
  const url = languageInput ? localizedUrl(path, language) : getApartmentUrl(id);

  return {
    title: id === 3 || id === 5 ? { absolute: title } : title,
    description,
    keywords: buildApartmentKeywords(id),
    alternates: apartmentAlternates(id, languageInput),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: apartmentSeoImages(id).map((image, index) => ({
        url: image,
        width: 1200,
        height: 800,
        alt: apartmentImageAlt(id, index + 1, language),
      })),
      locale: openGraphLocale[language],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [apartment.images[0]],
    },
  };
}

export const homeFaq = [
  {
    question: "Как проверить свободные даты?",
    answer:
      "Напишите даты, ID квартиры и количество гостей в WhatsApp, Viber или позвоните. Мы быстро проверим доступность.",
  },
  {
    question: "Фотографии квартир реальные?",
    answer:
      "Да, на сайте используются фотографии конкретных квартир RentPlaceMD в комплексе Измаил 88.",
  },
  {
    question: "Можно заселиться ночью?",
    answer: "Да, заселение согласовывается индивидуально. Связь доступна 24/7.",
  },
  {
    question: "Где находятся квартиры?",
    answer: "Основная локация - комплекс Измаил 88 в центральной части Кишинёва.",
  },
];

export const apartmentFaq = [
  {
    question: "Во сколько заселение?",
    answer: "Стандартное заселение с 14:00. Ранний заезд можно согласовать заранее, если квартира свободна.",
  },
  {
    question: "Есть ли Wi-Fi и кухня?",
    answer: "Да, в квартире есть Wi-Fi, TV, кондиционер и кухня или мини-кухня для повседневного проживания.",
  },
  {
    question: "Можно ли поздний заезд?",
    answer: "Да, поздний заезд возможен по предварительной договорённости. Связь с RentPlaceMD доступна 24/7.",
  },
  {
    question: "Можно ли заказать трансфер?",
    answer: "Да, можно заранее уточнить трансфер из аэропорта Кишинёва прямо к адресу проживания.",
  },
];

const apartmentFaqByLanguage: Record<
  Language,
  Array<{ question: string; answer: string }>
> = {
  ru: apartmentFaq,
  ro: [
    { question: "La ce oră este cazarea?", answer: "Cazarea standard începe la ora 14:00. Sosirea mai devreme poate fi stabilită în avans dacă apartamentul este liber." },
    { question: "Există Wi-Fi și bucătărie?", answer: "Da, apartamentul are Wi-Fi, TV, aer condiționat și bucătărie pentru un sejur confortabil." },
    { question: "Este posibilă cazarea târzie?", answer: "Da, cazarea târzie este posibilă cu acord prealabil. Asistența RentPlaceMD este disponibilă 24/7." },
    { question: "Se poate comanda transfer?", answer: "Da, transferul de la aeroportul Chișinău la adresa apartamentului poate fi stabilit în avans." },
  ],
  en: [
    { question: "What time is check-in?", answer: "Standard check-in starts at 14:00. Early arrival can be arranged in advance when the apartment is available." },
    { question: "Are Wi-Fi and a kitchen available?", answer: "Yes, the apartment has Wi-Fi, TV, air conditioning and a kitchen for a comfortable stay." },
    { question: "Is late check-in possible?", answer: "Yes, late check-in is available by prior arrangement. RentPlaceMD support is available 24/7." },
    { question: "Can I book an airport transfer?", answer: "Yes, a transfer from Chisinau Airport to the apartment address can be arranged in advance." },
  ],
  uk: [
    { question: "О котрій годині заселення?", answer: "Стандартне заселення починається о 14:00. Ранній заїзд можна погодити заздалегідь, якщо квартира вільна." },
    { question: "Чи є Wi-Fi та кухня?", answer: "Так, у квартирі є Wi-Fi, TV, кондиціонер і кухня для комфортного проживання." },
    { question: "Чи можливе пізнє заселення?", answer: "Так, пізнє заселення можливе за попередньою домовленістю. Підтримка RentPlaceMD доступна 24/7." },
    { question: "Чи можна замовити трансфер?", answer: "Так, трансфер з аеропорту Кишинева до адреси квартири можна погодити заздалегідь." },
  ],
  cs: [
    { question: "V kolik hodin je check-in?", answer: "Standardní check-in začíná ve 14:00. Dřívější příjezd lze domluvit předem, pokud je apartmán volný." },
    { question: "Je k dispozici Wi-Fi a kuchyně?", answer: "Ano, apartmán má Wi-Fi, TV, klimatizaci a kuchyň pro pohodlný pobyt." },
    { question: "Je možný pozdní příjezd?", answer: "Ano, pozdní příjezd je možný po předchozí domluvě. Podpora RentPlaceMD je dostupná 24/7." },
    { question: "Lze objednat transfer?", answer: "Ano, transfer z letiště Kišiněv na adresu apartmánu lze domluvit předem." },
  ],
};

const allApartmentsLabel: Record<Language, string> = {
  ru: "Все квартиры",
  ro: "Toate apartamentele",
  en: "All apartments",
  uk: "Усі квартири",
  cs: "Všechny apartmány",
};

export function buildSiteJsonLd() {
  const apartmentOffers = activeApartments.map((apartment) => ({
    ...offerForApartment(apartment),
    itemOffered: {
      "@type": "Apartment",
      name: "RentPlaceMD ID " + apartment.id + " - " + kindTitle[apartment.kind],
      image: imageObjects([...apartment.photos, ...(apartment.facadePhoto ? [apartment.facadePhoto] : [])], (index) =>
        "RentPlaceMD " + kindTitle[apartment.kind] + " ID " + apartment.id + ", " + apartment.title + ", photo " + index,
      ),
      ...(apartment.guests !== null ? {
        occupancy: {
          "@type": "QuantitativeValue",
          maxValue: apartment.guests,
        },
      } : {}),
      address: {
        "@type": "PostalAddress",
        ...address,
        streetAddress: apartment.address.split(",")[0],
      },
    },
  }));

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": baseUrl + "/#organization",
      name: siteName,
      url: baseUrl,
      logo: baseUrl + "/icon.png",
      image: imageObjects(["/og-image.jpg"], () => "RentPlaceMD apartments in Chisinau"),
      sameAs,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: phoneNumbers[0],
          contactType: "reservations",
          availableLanguage: ["ru", "ro", "en", "uk", "cs"],
          areaServed: "MD",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": baseUrl + "/#website",
      name: siteName,
      url: baseUrl,
      inLanguage: ["ru-MD", "ro-MD", "en", "uk", "cs"],
      publisher: {
        "@id": baseUrl + "/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: baseUrl + "/apartment/izmail88-{search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "LodgingBusiness"],
      "@id": baseUrl + "/#localbusiness",
      name: siteName,
      url: baseUrl,
      image: imageObjects(["/og-image.jpg", "/main.jpg"], (index) =>
        index === 1 ? "RentPlaceMD apartments in Chisinau" : "Ismail 88 apartment building in Chisinau",
      ),
      logo: baseUrl + "/icon.png",
      telephone: phoneNumbers,
      priceRange: "800-1000 MDL",
      address: {
        "@type": "PostalAddress",
        ...address,
      },
      areaServed: {
        "@type": "City",
        name: "Chisinau",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: phoneNumbers[0],
          contactType: "reservations",
          availableLanguage: ["ru", "ro", "en", "uk", "cs"],
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Квартиры посуточно RentPlaceMD",
        itemListElement: apartmentOffers,
      },
      sameAs,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: siteName,
          item: baseUrl,
        },
      ],
    },
  ];
}

export function getApartmentJsonLd(
  id: ApartmentId,
  language: Language = "ru",
  useLocalizedUrl = false,
) {
  const apartment = apartmentDetailsById[String(id)];
  const url = useLocalizedUrl ? localizedUrl(apartmentPath(id), language) : getApartmentUrl(id);
  const localized = getApartmentSeoLocalization(id, language);
  const displayAddress = getApartmentDisplayAddress(id, apartment.title, language);
  const name = localized?.schemaName ?? "RentPlaceMD ID " + id + " - " + kindTitle[apartment.kind];
  const categoryPath = getApartmentCategoryPath(apartment.class);
  const categoryName = apartment.class === "premium" ? "Premium" : apartment.class === "standardPlus" ? "Standard+" : apartment.class === "standard" ? "Standard" : "Economy";

  return [
    {
      "@context": "https://schema.org",
      "@type": ["Apartment", "LodgingBusiness"],
      inLanguage: language,
      "@id": url + "#apartment",
      name,
      url,
      image: imageObjects(apartmentSeoImages(id), (index) => apartmentImageAlt(id, index, language)),
      address: {
        "@type": "PostalAddress",
        ...address,
        streetAddress: displayAddress,
      },
      description: buildApartmentDescription(id, language),
      telephone: phoneNumbers[0],
      priceRange: apartment.price + " MDL",
      numberOfRooms: apartment.kind === "studio" ? 1 : apartment.kind === "oneBedroom" ? 2 : 3,
      ...(apartment.guests !== null ? {
        occupancy: {
          "@type": "QuantitativeValue",
          maxValue: apartment.guests,
        },
      } : {}),
      amenityFeature: [
        "Wi-Fi",
        "Air conditioning",
        "Kitchen",
        "Clean linen",
        "24/7 check-in",
        "Towels",
        "Payment at check-in",
      ].map((amenityName) => ({
        "@type": "LocationFeatureSpecification",
        name: amenityName,
        value: true,
      })),
      offers: offerForApartment({ id, price: apartment.price }),
      provider: {
        "@id": baseUrl + "/#localbusiness",
        "@type": ["LocalBusiness", "LodgingBusiness"],
        name: siteName,
        telephone: phoneNumbers[0],
        url: baseUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: siteName,
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: allApartmentsLabel[language],
          item: useLocalizedUrl ? localizedUrl("/apartments", language) : baseUrl + "/apartments",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: categoryName,
          item: useLocalizedUrl ? localizedUrl(categoryPath, language) : baseUrl + categoryPath,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: displayAddress + " · ID " + id,
          item: url,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: language,
      mainEntity: apartmentFaqByLanguage[language].map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];
}
