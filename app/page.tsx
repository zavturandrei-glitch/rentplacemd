import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HomeCategoryLinks from "@/components/HomeCategoryLinks";
import HomeNavigation from "@/components/HomeNavigation";
import LocationMap from "@/components/LocationMap";
import Footer from "@/components/Footer";
import { getHomeMetadata } from "@/lib/infoSeo";

type PageProps = { searchParams: Promise<{ lang?: string | string[] }> };
const first = (value?: string | string[]) => Array.isArray(value) ? value[0] : value;

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return getHomeMetadata(first((await searchParams).lang));
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <HomeCategoryLinks />
      <HomeNavigation />
      <LocationMap />
      <Footer />
    </main>
  );
}
