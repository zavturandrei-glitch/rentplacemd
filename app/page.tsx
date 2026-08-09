import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HomeLatestApartments from "@/components/HomeLatestApartments";
import HomeNavigation from "@/components/HomeNavigation";
import LocationMap from "@/components/LocationMap";
import CityVideoRail from "@/components/CityVideoRail";
import Footer from "@/components/Footer";
import { getHomeMetadata } from "@/lib/infoSeo";
import { readPublishedCityVideos } from "@/lib/cityVideoStore";

type PageProps = { searchParams: Promise<{ lang?: string | string[] }> };
const first = (value?: string | string[]) => Array.isArray(value) ? value[0] : value;

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return getHomeMetadata(first((await searchParams).lang));
}

export default async function Home() {
  const publishedVideos = await readPublishedCityVideos();
  const featuredVideos = publishedVideos.filter((video) => video.featured);
  const homeVideos = [
    ...featuredVideos,
    ...publishedVideos.filter((video) => !video.featured),
  ].slice(0, 3);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#07111f]">
      <Header />
      <Hero />
      <HomeNavigation />
      <HomeLatestApartments />
      <CityVideoRail videos={homeVideos} placement="home" />
      <LocationMap />
      <Footer compactHome />
    </main>
  );
}
