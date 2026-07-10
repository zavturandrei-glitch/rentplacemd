import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HomeNavigation from "@/components/HomeNavigation";
import LocationMap from "@/components/LocationMap";
import Footer from "@/components/Footer";
import PreloadResources from "@/app/preload-resources";

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
