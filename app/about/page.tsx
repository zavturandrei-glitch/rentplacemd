import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import InfoPage from "@/components/InfoPage";
import { baseUrl, routeAlternates, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: "О RentPlaceMD",
  description:
    "RentPlaceMD помогает выбрать квартиру посуточно в Кишинёве: реальные фото, понятные цены, связь через WhatsApp, Viber, Telegram и телефон.",
  alternates: routeAlternates("/about"),
  openGraph: { title: "О RentPlaceMD", description: "RentPlaceMD — проверенные квартиры посуточно в Кишинёве, поддержка гостей и трансфер.", url: baseUrl + "/about", siteName, images: ["/og-image.jpg"], type: "website" },
  twitter: { card: "summary_large_image", title: "О RentPlaceMD", description: "Квартиры посуточно в Кишинёве и поддержка гостей.", images: ["/og-image.jpg"] },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fffaf0]">
      <Script id="about-structured-data" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "AboutPage", name: "О RentPlaceMD", url: baseUrl + "/about", inLanguage: ["ru", "ro", "en", "uk", "cs"], about: { "@type": "Organization", name: siteName, url: baseUrl } }) }} />
      <Header />
      <BackButton />
      <InfoPage kind="about" />
      <Footer />
    </main>
  );
}
