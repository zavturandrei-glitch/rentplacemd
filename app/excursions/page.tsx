import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import ExcursionsCatalog from "@/components/ExcursionsCatalog";
import { getTravelMetadata, buildExcursionsJsonLd } from "@/lib/travelSeo";
import JsonLdScript from "@/components/JsonLdScript";

type Props = { searchParams: Promise<{ lang?: string | string[]; route?: string | string[] }> };
export async function generateMetadata({ searchParams }: Props) {
  const { lang } = await searchParams;
  return getTravelMetadata("excursions", Array.isArray(lang) ? lang[0] : lang);
}
export default async function Page({ searchParams }: Props) {
  const { lang, route } = await searchParams;
  return <main className="min-h-screen bg-[#f5f1e8]"><JsonLdScript id="excursions-jsonld" data={buildExcursionsJsonLd(Array.isArray(lang) ? lang[0] : lang)} /><Header /><BackButton /><ExcursionsCatalog key={Array.isArray(route) ? route[0] : route} initialRoute={Array.isArray(route) ? route[0] : route} /><Footer /></main>;
}
