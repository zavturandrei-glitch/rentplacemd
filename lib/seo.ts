import type { Metadata } from "next";
import { apartmentDetailsById } from "@/data/apartments";

export const baseUrl = "https://rentplace.md";
export const siteName = "RentPlaceMD";
export const defaultLocale = "ru_MD";
export const address = {
  streetAddress: "Ismail 88",
  addressLocality: "Chisinau",
  addressRegion: "Chisinau",
  postalCode: "MD-2001",
  addressCountry: "MD",
};

export const phoneNumbers = ["+37369990190", "+37379990190"];
export const sameAs = ["https://t.me/rentplacemd", "https://wa.me/37369990190"];
export const languageAlternates = {
  "ru-MD": baseUrl,
  "ro-MD": baseUrl,
  en: baseUrl,
  uk: baseUrl,
  cs: baseUrl,
  "x-default": baseUrl,
};

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

export function getApartmentSlug(id: number) {
  return "izmail88-" + id;
}

export function getApartmentUrl(id: number) {
  return baseUrl + "/apartment/" + getApartmentSlug(id);
}

export function apartmentPath(id: number) {
  return "/apartment/" + getApartmentSlug(id);
}

export function routeAlternates(path = "") {
  const url = baseUrl + path;
  return {
    canonical: url,
    languages: Object.fromEntries(Object.keys(languageAlternates).map((language) => [language, url])),
  };
}

export function apartmentAlternates(id: keyof typeof apartmentDetailsById) {
  return routeAlternates(apartmentPath(id));
}

export function buildApartmentTitle(id: keyof typeof apartmentDetailsById) {
  const apartment = apartmentDetailsById[id];
  return "ID " + id + " - " + kindTitle[apartment.kind] + ", Измаил 88 посуточно";
}

export function buildApartmentDescription(id: keyof typeof apartmentDetailsById) {
  const apartment = apartmentDetailsById[id];
  return "Квартира ID " + id + ": " + kindTitle[apartment.kind] + " в комплексе Измаил 88, центр Кишинёва. " + apartment.price + " лей/сутки, до " + apartment.guests + " гостей, реальные фото, Wi-Fi, чистое бельё, заселение 24/7.";
}

export function apartmentImageAlt(id: keyof typeof apartmentDetailsById, index = 1) {
  const apartment = apartmentDetailsById[id];
  return "RentPlaceMD " + kindTitle[apartment.kind] + " ID " + id + ", Измаил 88, фото " + index;
}

export function buildApartmentKeywords(id: keyof typeof apartmentDetailsById) {
  const apartment = apartmentDetailsById[id];
  return [
    "квартира " + id + " посуточно Кишинев",
    "квартира " + id + " посуточно Кишинёв",
    "Измаил 88",
    "RentPlaceMD",
    kindTitle[apartment.kind],
    "апартаменты Кишинев центр",
    "квартира Измаил 88",
    "посуточно без посредников",
  ];
}

export function getApartmentMetadata(id: keyof typeof apartmentDetailsById): Metadata {
  const apartment = apartmentDetailsById[id];
  const title = buildApartmentTitle(id);
  const description = buildApartmentDescription(id);
  const url = getApartmentUrl(id);

  return {
    title,
    description,
    keywords: buildApartmentKeywords(id),
    alternates: apartmentAlternates(id),
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
      images: apartment.images.map((image, index) => ({
        url: image,
        width: 1200,
        height: 800,
        alt: apartmentImageAlt(id, index + 1),
      })),
      locale: defaultLocale,
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

export function buildSiteJsonLd() {
  const apartmentOffers = Object.values(apartmentDetailsById).map((apartment) => ({
    "@type": "Offer",
    url: getApartmentUrl(apartment.id),
    price: apartment.price,
    priceCurrency: "MDL",
    availability: "https://schema.org/InStock",
    itemOffered: {
      "@type": "Apartment",
      name: "RentPlaceMD ID " + apartment.id + " - " + kindTitle[apartment.kind],
      image: apartment.images.map((image) => baseUrl + image),
      occupancy: {
        "@type": "QuantitativeValue",
        maxValue: apartment.guests,
      },
      address: {
        "@type": "PostalAddress",
        ...address,
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
      image: baseUrl + "/og-image.jpg",
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
        target: baseUrl + "/?id={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "LodgingBusiness"],
      "@id": baseUrl + "/#localbusiness",
      name: siteName,
      url: baseUrl,
      image: [baseUrl + "/og-image.jpg", baseUrl + "/main.jpg"],
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
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: homeFaq.map((item) => ({
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

export function getApartmentJsonLd(id: keyof typeof apartmentDetailsById) {
  const apartment = apartmentDetailsById[id];
  const url = getApartmentUrl(id);
  const name = "RentPlaceMD ID " + id + " - " + kindTitle[apartment.kind];

  return [
    {
      "@context": "https://schema.org",
      "@type": ["Apartment", "LodgingBusiness"],
      "@id": url + "#apartment",
      name,
      url,
      image: apartment.images.map((image) => baseUrl + image),
      address: {
        "@type": "PostalAddress",
        ...address,
      },
      description: buildApartmentDescription(id),
      telephone: phoneNumbers[0],
      priceRange: apartment.price + " MDL",
      numberOfRooms: apartment.kind === "studio" ? 1 : apartment.kind === "oneBedroom" ? 2 : 3,
      occupancy: {
        "@type": "QuantitativeValue",
        maxValue: apartment.guests,
      },
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
      offers: {
        "@type": "Offer",
        price: apartment.price,
        priceCurrency: "MDL",
        availability: "https://schema.org/InStock",
        url,
      },
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
          name,
          item: url,
        },
      ],
    },
  ];
}
