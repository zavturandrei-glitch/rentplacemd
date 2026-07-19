import type { Metadata } from "next";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import InfoPage from "@/components/InfoPage";
import JsonLdScript from "@/components/JsonLdScript";
import { baseUrl, mainSocialImage, routeAlternates, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Гид по Кишинёву: где остановиться и как выбрать квартиру посуточно",
  description:
    "Полезный гид RentPlaceMD для гостей Кишинёва: районы, центр города, квартира или гостиница, заселение, трансфер и выбор жилья посуточно.",
  alternates: routeAlternates("/chisinau-guide"),
  keywords: ["гид по Кишинёву", "что посмотреть в Кишинёве", "где поесть в Кишинёве", "трансфер из аэропорта Кишинёва"],
  openGraph: { title: "Гид по Кишинёву | RentPlaceMD", description: "Достопримечательности, еда, транспорт, аптеки, маршруты и советы гостям Кишинёва.", url: baseUrl + "/chisinau-guide", siteName, images: [mainSocialImage], type: "article" },
  twitter: { card: "summary_large_image", title: "Гид по Кишинёву", description: "Практические советы и маршруты для гостей города.", images: [mainSocialImage] },
};

export default function ChisinauGuidePage() {
  return (
    <main className="min-h-screen bg-[#fffaf0]">
      <JsonLdScript id="guide-jsonld" data={[{ "@context": "https://schema.org", "@type": "Article", headline: "Гид по Кишинёву", url: baseUrl + "/chisinau-guide", inLanguage: ["ru", "ro", "en", "uk", "cs"], publisher: { "@type": "Organization", name: siteName, url: baseUrl } }, { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: siteName, item: baseUrl }, { "@type": "ListItem", position: 2, name: "Гид по Кишинёву", item: baseUrl + "/chisinau-guide" }] }]} />
      <Header />
      <BackButton />
      <InfoPage kind="guide" />
      <Footer />
    </main>
  );
}
