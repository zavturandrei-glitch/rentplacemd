import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TodayFree from "@/components/TodayFree";
import HomeAfterCatalog from "@/components/HomeAfterCatalog";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <TodayFree />
      <HomeAfterCatalog />
      <Footer />
    </main>
  );
}
