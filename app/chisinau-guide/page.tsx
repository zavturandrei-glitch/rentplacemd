import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InfoPage from "@/components/InfoPage";
import { routeAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Гид по Кишинёву: где остановиться и как выбрать квартиру посуточно",
  description:
    "Полезный гид RentPlaceMD для гостей Кишинёва: районы, центр города, квартира или гостиница, заселение, трансфер и выбор жилья посуточно.",
  alternates: routeAlternates("/chisinau-guide"),
};

export default function ChisinauGuidePage() {
  return (
    <main className="min-h-screen bg-[#fffaf0]">
      <Header />
      <InfoPage kind="guide" />
      <Footer />
    </main>
  );
}
