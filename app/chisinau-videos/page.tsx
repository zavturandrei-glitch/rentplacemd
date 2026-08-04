import type { Metadata } from "next";
import CityVideoLibrary from "@/components/CityVideoLibrary";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLdScript from "@/components/JsonLdScript";
import {
  buildCityVideoPageJsonLd,
  getCityVideoMetadata,
} from "@/lib/cityVideoContent";
import { readPublishedCityVideos } from "@/lib/cityVideoStore";

export const dynamic = "force-dynamic";
type PageProps = { searchParams: Promise<{ lang?: string | string[] }> };
const first = (value?: string | string[]) => Array.isArray(value) ? value[0] : value;

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return getCityVideoMetadata(first((await searchParams).lang));
}

export default async function ChisinauVideosPage({ searchParams }: PageProps) {
  const language = first((await searchParams).lang);
  const videos = await readPublishedCityVideos();

  return (
    <main className="mobile-dark-page min-h-screen bg-[#fffaf0]">
      <JsonLdScript id="city-videos-jsonld" data={buildCityVideoPageJsonLd(language)} />
      <Header showBack preserveDesktopBack />
      <CityVideoLibrary videos={videos} />
      <Footer />
    </main>
  );
}
