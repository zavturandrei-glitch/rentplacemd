import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import ApartmentCategoryMenu from "@/components/ApartmentCategoryMenu";
import Footer from "@/components/Footer";
import {
  getApartmentCategoryMenuJsonLd,
  routeAlternates,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Выбор класса квартиры RentPlaceMD",
  description:
    "Выберите класс квартиры RentPlaceMD в Кишинёве: Economy, Standard или Standard+. После выбора откроется список подходящих вариантов.",
  alternates: routeAlternates("/apartments"),
  openGraph: {
    title: "Выбор класса квартиры RentPlaceMD",
    description:
      "Меню категорий RentPlaceMD: Economy, Standard и Standard+ квартиры посуточно в Кишинёве.",
    url: "https://rentplace.md/apartments",
    siteName: "RentPlaceMD",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "RentPlaceMD apartments" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Выбор класса квартиры RentPlaceMD",
    description: "Выберите Economy, Standard или Standard+ квартиру RentPlaceMD.",
    images: ["/og-image.jpg"],
  },
};

export default function ApartmentsPage() {
  const jsonLd = getApartmentCategoryMenuJsonLd();

  return (
    <main className="min-h-screen bg-[#efeee9]">
      <Script
        id="apartment-categories-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <ApartmentCategoryMenu />
      <Footer />
    </main>
  );
}
