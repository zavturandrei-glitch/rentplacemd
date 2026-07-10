import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InfoPage from "@/components/InfoPage";
import { routeAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Трансфер из аэропорта Кишинёва",
  description:
    "Трансфер RentPlaceMD из аэропорта Кишинёва до квартиры по предварительной договорённости.",
  alternates: routeAlternates("/transfer"),
};

export default function TransferPage() {
  return (
    <main className="min-h-screen bg-[#fffaf0]">
      <Header />
      <InfoPage kind="transfer" />
      <Footer />
    </main>
  );
}
