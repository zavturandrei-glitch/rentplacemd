import type { Metadata } from "next";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import InfoPage from "@/components/InfoPage";
import { baseUrl, routeAlternates, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Правила заселения RentPlaceMD",
  description:
    "Основные правила заселения в квартиры RentPlaceMD: время заезда и выезда, документы, оплата и связь перед приездом.",
  alternates: routeAlternates("/check-in-rules"),
  openGraph: {
    title: "Правила заселения RentPlaceMD",
    description: "Время заезда и выезда, документы, оплата и связь перед приездом.",
    url: baseUrl + "/check-in-rules",
    siteName,
    images: ["/og-image.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Правила заселения RentPlaceMD",
    description: "Основные правила проживания и заселения в квартиры RentPlaceMD.",
    images: ["/og-image.jpg"],
  },
};

export default function CheckInRulesPage() {
  return (
    <main className="min-h-screen bg-[#fffaf0]">
      <Header />
      <BackButton />
      <InfoPage kind="rules" />
      <Footer />
    </main>
  );
}
