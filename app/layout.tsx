import type { Metadata } from "next";
import Script from "next/script";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const baseUrl = "https://rentplace.md";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "RentPlaceMD - квартиры посуточно в центре Кишинёва",
    template: "%s | RentPlaceMD",
  },
  description:
    "Премиальные квартиры посуточно в центре Кишинёва, комплекс Измаил 88. Заселение 24/7, WhatsApp/Viber, без посредников.",
  keywords: [
    "квартиры посуточно Кишинев",
    "апартаменты Кишинев центр",
    "аренда квартиры посуточно",
    "RentPlaceMD",
    "Измаил 88",
    "daily apartments Chisinau",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
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
    title: "RentPlaceMD - квартиры посуточно в центре Кишинёва",
    description:
      "Чистые квартиры посуточно в комплексе Измаил 88. Центр города, заселение 24/7, без посредников.",
    url: baseUrl,
    siteName: "RentPlaceMD",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RentPlaceMD apartments in Chisinau",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RentPlaceMD - квартиры посуточно в центре Кишинёва",
    description:
      "Премиальные квартиры посуточно в Кишинёве. Центр, Измаил 88, заселение 24/7.",
    images: ["/og-image.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "RentPlaceMD",
  url: baseUrl,
  image: baseUrl + "/og-image.jpg",
  telephone: ["+37369990190", "+37379990190"],
  priceRange: "800-1000 MDL",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ismail 88",
    addressLocality: "Chisinau",
    addressCountry: "MD",
  },
  areaServed: {
    "@type": "City",
    name: "Chisinau",
  },
  openingHours: "Mo-Su 00:00-23:59",
  sameAs: ["https://t.me/rentplacemd", "https://wa.me/37369990190"],
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Apartment",
      name: "Daily apartments at Ismail 88",
      address: "Ismail 88, Chisinau",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className="h-full antialiased"
    >
      <body className="flex min-h-full flex-col">
        <LanguageProvider>{children}</LanguageProvider>

        <Script
          id="rentplacemd-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-404L3B7Q2R"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-404L3B7Q2R');
          `}
        </Script>
      </body>
    </html>
  );
}
