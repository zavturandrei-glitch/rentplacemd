import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HomeNavigation from "@/components/HomeNavigation";
import LocationMap from "@/components/LocationMap";
import Footer from "@/components/Footer";
import PreloadResources from "@/app/preload-resources";
import { getHomeMetadata } from "@/lib/infoSeo";

type PageProps = { searchParams: Promise<{ lang?: string | string[] }> };
const first = (value?: string | string[]) => Array.isArray(value) ? value[0] : value;

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return getHomeMetadata(first((await searchParams).lang));
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <PreloadResources />
      <Header />
      <Hero />
      <HomeNavigation />
      <LocationMap />
      <Footer />
    </main>
  );
}
