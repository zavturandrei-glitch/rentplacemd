import type { Metadata } from "next";
import type { Language } from "@/locales/translations";
import { getApartmentClassLabel } from "@/lib/apartmentCategoryLocalization";
import {
  formatLocalizedImageAlt,
  getApartmentDisplayAddress,
  getApartmentLocalizedLanguages,
  getApartmentSeoLocalization,
  getApartmentSeoLanguage,
} from "@/lib/apartmentLocalization";
import {
  apartmentCategoryOrder,
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
export const alternateOpenGraphLocales = ["ro_MD", "en_US", "uk_UA", "cs_CZ"];
export const mainSocialImagePath = "/og/rentplace-gold-main-1200x630-v3.jpg";
export const mainSocialImageUrl = baseUrl + mainSocialImagePath;
export const mainSocialImageAlt = "RentPlace.md — квартиры посуточно в Кишинёве";
export const mainSocialImage = {
  url: mainSocialImageUrl,
  secureUrl: mainSocialImageUrl,
  type: "image/jpeg",
  width: 1200,
  height: 630,
  alt: mainSocialImageAlt,
};
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

export const phoneNumbers = ["+37369990190", "+37369560967"];
export const sameAs = ["https://t.me/rentplacemd", "https://wa.me/37369990190"];

export const siteTitle = "RentPlace.md — квартиры посуточно в Кишинёве";
export const siteDescription =
  "Квартиры посуточно в Кишинёве без посредников. Актуальные варианты, удобное бронирование и поддержка RentPlace.";

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
    { url: "/brand/rentplace-favicon-gold-v3.ico", sizes: "any", type: "image/x-icon" },
    { url: "/brand/rentplace-favicon-gold-v3-16.png", sizes: "16x16", type: "image/png" },
    { url: "/brand/rentplace-favicon-gold-v3-32.png", sizes: "32x32", type: "image/png" },
    { url: "/brand/rentplace-favicon-gold-v3-48.png", sizes: "48x48", type: "image/png" },
    { url: "/brand/rentplace-icon-gold-v3-512.png", sizes: "512x512", type: "image/png" },
  ],
  shortcut: ["/brand/rentplace-favicon-gold-v3.ico"],
  apple: [{ url: "/brand/rentplace-apple-touch-gold-v3.png", sizes: "180x180", type: "image/png" }],
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

export function apartmentAlternates(id: ApartmentId, languageInput?: string) {
  const path = apartmentPath(id);
  const language = getApartmentSeoLanguage(id, languageInput);
  const availableLanguages = getApartmentLocalizedLanguages(id);
  const canonical =
    languageInput && language !== "ru"
      ? localizedUrl(path, language)
      : getApartmentUrl(id);

  return {
    canonical,
    languages: {
      ru: getApartmentUrl(id),
      ...Object.fromEntries(
        availableLanguages
          .filter((availableLanguage) => availableLanguage !== "ru")
          .map((availableLanguage) => [
            availableLanguage,
            localizedUrl(path, availableLanguage),
          ]),
      ),
      "x-default": getApartmentUrl(id),
    },
  };
}

export const apartmentCategorySeo: Record<
  ApartmentClass,
  { title: string; description: string; intro: string }
> = {
  economy: {
    title: "Квартиры Эконом RentPlaceMD в Кишинёве",
    description:
      "Практичные квартиры Эконом RentPlaceMD в центре Кишинёва. Реальные фото, ID, цены и быстрый контакт для проверки свободных дат.",
    intro:
      "Практичные квартиры по доступной цене для гостей, которым важны центр города, понятная стоимость и быстрый контакт.",
  },
  standard: {
    title: "Квартиры Стандарт RentPlaceMD в Кишинёве",
    description:
      "Квартиры Стандарт RentPlaceMD в Кишинёве для посуточного проживания, отдыха и командировок. Фото, цены и прямой контакт.",
    intro:
      "Комфортные квартиры для повседневного проживания, короткого отдыха и рабочих поездок в центральной части Кишинёва.",
  },
  standardPlus: {
    title: "Квартиры Комфорт RentPlaceMD в Кишинёве",
    description:
      "Квартиры Комфорт RentPlaceMD в Кишинёве: более свежие и улучшенные варианты повышенного комфорта с реальными фото.",
    intro:
      "Более свежие или улучшенные варианты для гостей, которые хотят повышенный комфорт и аккуратный визуальный уровень.",
  },
  premium: {
    title: "Квартиры Премиум RentPlaceMD в Кишинёве",
    description:
      "Квартиры Премиум RentPlaceMD в Кишинёве с отдельной спальней и гостиной, реальными фото и прямым бронированием.",
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
  ru: { title: "Все квартиры RentPlaceMD в Кишинёве", description: "Каталог квартир RentPlaceMD посуточно в Кишинёве: Эконом, Стандарт, Комфорт и Премиум. Реальные фотографии, актуальные цены, адреса и вместимость." },
  ro: { title: "Toate apartamentele RentPlaceMD din Chișinău", description: "Catalogul apartamentelor RentPlaceMD în regim hotelier în Chișinău: Economic, Standard, Confort și Premium. Fotografii reale, prețuri actuale, adrese și capacitate." },
  en: { title: "All RentPlaceMD apartments in Chisinau", description: "Browse RentPlaceMD short-stay apartments in Chisinau across Economy, Standard, Comfort and Premium, with real photos, current prices, addresses and guest capacity." },
  uk: { title: "Усі квартири RentPlaceMD у Кишиневі", description: "Каталог квартир RentPlaceMD подобово в Кишиневі: Економ, Стандарт, Комфорт і Преміум. Реальні фотографії, актуальні ціни, адреси та місткість." },
  cs: { title: "Všechny apartmány RentPlaceMD v Kišiněvě", description: "Katalog apartmánů RentPlaceMD pro krátkodobý pobyt v Kišiněvě: Ekonomická, Standardní, Komfortní a Prémiová. Skutečné fotografie, aktuální ceny, adresy a kapacita." },
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
      images: [{ url: mainSocialImageUrl, secureUrl: mainSocialImageUrl, type: "image/jpeg", width: 1200, height: 630, alt: seo.title }],
      locale: openGraphLocale[language],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [{ url: mainSocialImageUrl, secureUrl: mainSocialImageUrl, type: "image/jpeg", width: 1200, height: 630, alt: seo.title }],
    },
  };
}

function getLocalizedCategorySeo(category: ApartmentClass, language: Language) {
  const label = getApartmentClassLabel(category, language);
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
          url: mainSocialImageUrl,
          secureUrl: mainSocialImageUrl,
          type: "image/jpeg",
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
      images: [{ url: mainSocialImageUrl, secureUrl: mainSocialImageUrl, type: "image/jpeg", width: 1200, height: 630, alt: seo.title }],
    },
  };
}

export function getApartmentCategoryMenuJsonLd(languageInput?: string) {
  const language = normalizeSiteLanguage(languageInput);
  const text = categorySeoLanguage[language];
  const seo = apartmentsPageSeo[language];
  const apartmentsUrl = languageInput ? localizedUrl("/apartments", language) : baseUrl + "/apartments";
  const apartmentListId = apartmentsUrl + "#apartments";
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
      "@type": "CollectionPage",
      "@id": apartmentsUrl + "#collection",
      url: apartmentsUrl,
      name: seo.title,
      description: seo.description,
      inLanguage: language,
      mainEntity: { "@id": apartmentListId },
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
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": apartmentListId,
      name: text.allApartments,
      numberOfItems: activeApartments.length,
      itemListElement: activeApartments.map((apartment, index) => {
        const path = getApartmentDataPath(apartment);
        return {
          "@type": "ListItem",
          position: index + 1,
          name: `ID ${apartment.id} · ${getApartmentDisplayAddress(apartment.id, apartment.title, language)}`,
          url: languageInput ? localizedUrl(path, language) : baseUrl + path,
        };
      }),
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
        url: String(apartmentAlternates(apartment.id, languageInput).canonical),
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
  const apartmentRecord = getApartmentById(id);
  if (apartmentRecord) {
    return apartmentRecord.shortDescription + " Адрес: " + apartmentRecord.address + ". Цена: " + apartment.price + ".";
  }
  return "Квартира ID " + id + " по адресу " + apartment.address + ". Цена: " + apartment.price + ".";
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
  if (String(id) === "6") {
    return [
      "квартира посуточно Ботаника",
      "снять квартиру на Ботанике",
      "квартира Cuza Vodă Кишинёв",
      "квартира посуточно Кишинёв до 4 человек",
      "квартира в новострое Кишинёв",
      "квартира с одной спальней Кишинёв",
      "RentPlaceMD",
    ];
  }
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
  return [
    ...apartment.images,
    ...(apartment.facadePhoto ? [apartment.facadePhoto] : []),
  ];
}

function apartmentSocialImage(id: ApartmentId) {
  const apartment = apartmentDetailsById[String(id)];
  const apartmentRecord = getApartmentById(id);
  const path = Number(id) === 6
    ? "/apartments/cuza-voda-1-2-6/social.jpg"
    : Number(id) === 67
    ? "/apartments/GrigoreUreche67/3.jpeg"
    : apartmentRecord?.cardPhoto ?? apartment.images[0];
  const url = baseUrl + path;

  return {
    url,
    secureUrl: url,
    type: path.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg",
    ...(Number(id) === 6 ? { width: 1200, height: 630 } : {}),
  };
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
  const language = getApartmentSeoLanguage(id, languageInput);
  const title =
    language === "ru" && id === 3
      ? "Студия Комфорт в центре Кишинёва — ID 3 | RentPlaceMD"
      : language === "ru" && id === 5
        ? "Студия Комфорт — ID 5 | RentPlaceMD"
      : buildApartmentTitle(id, language);
  const description =
    language === "ru" && id === 3
      ? "Современная студия категории Комфорт. Центр Кишинёва. Новострой. Wi-Fi. Кондиционер. Кухня. Заселение 24/7. Цена от 900 MDL."
      : language === "ru" && id === 5
        ? "Современная студия категории Комфорт в центре Кишинёва. Новострой. Wi-Fi. Кондиционер. Заселение 24/7. Цена от 900 MDL."
      : buildApartmentDescription(id, language);
  const alternates = apartmentAlternates(id, languageInput);
  const url = String(alternates.canonical);
  const socialImage = apartmentSocialImage(id);
  const socialImageAlt = apartmentImageAlt(id, 1, language);

  return {
    title: id === 3 || id === 5 ? { absolute: title } : title,
    description,
    keywords: buildApartmentKeywords(id),
    alternates,
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
      images: [{ ...socialImage, alt: socialImageAlt }],
      locale: openGraphLocale[language],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ ...socialImage, alt: socialImageAlt }],
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

const allApartmentsLabel: Record<Language, string> = {
  ru: "Все квартиры",
  ro: "Toate apartamentele",
  en: "All apartments",
  uk: "Усі квартири",
  cs: "Všechny apartmány",
};

export function buildSiteJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": baseUrl + "/#organization",
      name: siteName,
      url: baseUrl,
      logo: baseUrl + "/brand/rentplace-icon-gold-v3-512.png",
      image: imageObjects([mainSocialImagePath], () => "RentPlaceMD apartments in Chisinau"),
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
    },
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "LodgingBusiness"],
      "@id": baseUrl + "/#localbusiness",
      name: siteName,
      url: baseUrl,
      image: imageObjects([mainSocialImagePath, "/main.jpg"], (index) =>
        index === 1 ? "RentPlaceMD apartments in Chisinau" : "Ismail 88 apartment building in Chisinau",
      ),
      logo: baseUrl + "/brand/rentplace-icon-gold-v3-512.png",
      telephone: phoneNumbers,
      priceRange: "800-1400 MDL",
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
      sameAs,
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
  const categoryName = getApartmentClassLabel(apartment.class, language);
  const isCuzaVoda = String(id) === "6";

  return [
    {
      "@context": "https://schema.org",
      "@type": ["Apartment", "LodgingBusiness"],
      inLanguage: language,
      "@id": url + "#apartment",
      name,
      url,
      image: imageObjects(apartmentSeoImages(id), (index) =>
        apartment.facadePhoto &&
        index === apartment.images.length + 1 &&
        localized?.facadeAlt
          ? localized.facadeAlt
          : apartmentImageAlt(id, index, language),
      ),
      address: {
        "@type": "PostalAddress",
        ...address,
        streetAddress: displayAddress,
      },
      ...(isCuzaVoda ? {
        geo: {
          "@type": "GeoCoordinates",
          latitude: 46.98763,
          longitude: 28.87104,
        },
      } : {}),
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
      amenityFeature: (localized
        ? localized.features
        : ["Wi-Fi", "Air conditioning", "Kitchen", "Clean linen", "24/7 check-in", "Towels", "Payment at check-in"]
      ).map((amenityName) => ({
        "@type": "LocationFeatureSpecification",
        name: amenityName,
        value: true,
      })),
      offers: offerForApartment({ id, price: apartment.price }),
      provider: {
        "@id": baseUrl + "/#localbusiness",
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
  ];
}
