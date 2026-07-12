import type { Metadata } from "next";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import InfoPage from "@/components/InfoPage";
import { routeAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Правила заселения RentPlaceMD",
  description:
    "Основные правила заселения в квартиры RentPlaceMD: время заезда и выезда, документы, оплата и связь перед приездом.",
  alternates: routeAlternates("/check-in-rules"),
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
