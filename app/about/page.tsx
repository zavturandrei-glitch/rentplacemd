import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InfoPage from "@/components/InfoPage";
import { routeAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "О RentPlaceMD",
  description:
    "RentPlaceMD помогает выбрать квартиру посуточно в Кишинёве: реальные фото, понятные цены, связь через WhatsApp, Viber, Telegram и телефон.",
  alternates: routeAlternates("/about"),
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fffaf0]">
      <Header />
      <InfoPage kind="about" />
      <Footer />
    </main>
  );
}
