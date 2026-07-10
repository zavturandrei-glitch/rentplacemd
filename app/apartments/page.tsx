import type { Metadata } from "next";
import Header from "@/components/Header";
import TodayFree from "@/components/TodayFree";
import Footer from "@/components/Footer";
import { routeAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Все квартиры RentPlaceMD",
  description:
    "Каталог квартир RentPlaceMD в Кишинёве с категориями Economy, Standard и Standard+.",
  alternates: routeAlternates("/apartments"),
};

export default function ApartmentsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <TodayFree />
      <Footer />
    </main>
  );
}
