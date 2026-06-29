import type { Metadata } from "next";
import { apartmentDetailsById } from "@/data/apartments";

const baseUrl = "https://rentplace.md";

export const kindTitle = {
  studio: "студия",
  oneBedroom: "квартира 1+1",
  twoBedroom: "квартира с 2 спальнями",
  twoBedroomPlus: "квартира 2+1",
} as const;

export function getApartmentSlug(id: number) {
  return `izmail88-${id}`;
}

export function getApartmentUrl(id: number) {
  return baseUrl + "/apartment/" + getApartmentSlug(id);
}

export function getApartmentMetadata(id: keyof typeof apartmentDetailsById): Metadata {
  const apartment = apartmentDetailsById[id];
  const title = `ID ${id} - ${kindTitle[apartment.kind]}, Измаил 88 посуточно`;
  const description = `Квартира ID ${id}: ${kindTitle[apartment.kind]} в комплексе Измаил 88, центр Кишинёва. ${apartment.price} лей/сутки, до ${apartment.guests} гостей, чистое бельё, полотенца, Wi-Fi, заселение 24/7, WhatsApp/Viber.`;
  const url = getApartmentUrl(id);

  return {
    title,
    description,
    keywords: [
      `квартира ${id} посуточно Кишинев`,
      "Измаил 88",
      "RentPlaceMD",
      kindTitle[apartment.kind],
      "апартаменты Кишинев центр",
      "квартира Измаил 88",
      "посуточно без посредников",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "RentPlaceMD",
      images: [
        {
          url: apartment.images[0],
          width: 1200,
          height: 800,
          alt: `RentPlaceMD apartment ID ${id} at Ismail 88`,
        },
      ],
      locale: "ru_RU",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [apartment.images[0]],
    },
  };
}

export function getApartmentJsonLd(id: keyof typeof apartmentDetailsById) {
  const apartment = apartmentDetailsById[id];
  const url = getApartmentUrl(id);
  const name = `RentPlaceMD ID ${id} - ${kindTitle[apartment.kind]}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": ["Apartment", "LodgingBusiness"],
      name,
      url,
      image: apartment.images.map((image) => baseUrl + image),
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ismail 88",
        addressLocality: "Chisinau",
        addressCountry: "MD",
      },
      description: `Квартира ID ${id} в RentPlaceMD: ${kindTitle[apartment.kind]}, до ${apartment.guests} гостей, ${apartment.price} MDL за сутки, центр Кишинёва, Измаил 88.`,
      telephone: "+37369990190",
      priceRange: `${apartment.price} MDL`,
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
      ].map((name) => ({
        "@type": "LocationFeatureSpecification",
        name,
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
        "@type": ["LocalBusiness", "LodgingBusiness"],
        name: "RentPlaceMD",
        telephone: "+37369990190",
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
          name: "RentPlaceMD",
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
