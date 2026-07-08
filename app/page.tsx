import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TodayFree from "@/components/TodayFree";
import HomeAfterCatalog from "@/components/HomeAfterCatalog";
import Footer from "@/components/Footer";
import PreloadResources from "@/app/preload-resources";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <PreloadResources />
      <Header />
      <Hero />
      <TodayFree />
      <HomeAfterCatalog />
      <Footer />
    </main>
  );
}
