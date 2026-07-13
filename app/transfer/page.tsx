import type { Metadata } from "next";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import InfoPage from "@/components/InfoPage";
import { baseUrl, routeAlternates, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Трансфер из аэропорта Кишинёва",
  description:
    "Трансфер RentPlaceMD из аэропорта Кишинёва до квартиры по предварительной договорённости.",
  alternates: routeAlternates("/transfer"),
  openGraph: {
    title: "Трансфер из аэропорта Кишинёва | RentPlaceMD",
    description: "Трансфер из аэропорта Кишинёва до квартиры RentPlaceMD по предварительной договорённости.",
    url: baseUrl + "/transfer",
    siteName,
    images: ["/og-image.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Трансфер из аэропорта Кишинёва | RentPlaceMD",
    description: "Трансфер из аэропорта до квартиры RentPlaceMD.",
    images: ["/og-image.jpg"],
  },
};

export default function TransferPage() {
  return (
    <main className="min-h-screen bg-[#fffaf0]">
      <Header />
      <BackButton />
      <InfoPage kind="transfer" />
      <Footer />
    </main>
  );
}
