import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InfoPage from "@/components/InfoPage";
import JsonLdScript from "@/components/JsonLdScript";
import LocationMap from "@/components/LocationMap";
import { buildInfoJsonLd, getInfoMetadata } from "@/lib/infoSeo";

type PageProps = { searchParams: Promise<{ lang?: string | string[] }> };
const first = (value?: string | string[]) => Array.isArray(value) ? value[0] : value;

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return getInfoMetadata("about", first((await searchParams).lang));
}

export default async function AboutPage({ searchParams }: PageProps) {
  const language = first((await searchParams).lang);
  return (
    <main className="mobile-dark-page min-h-screen bg-[#fffaf0]">
      <JsonLdScript id="about-jsonld" data={buildInfoJsonLd("about", language)} />
      <Header showBack preserveDesktopBack />
      <InfoPage kind="about" />
      <LocationMap />
      <Footer />
    </main>
  );
}
