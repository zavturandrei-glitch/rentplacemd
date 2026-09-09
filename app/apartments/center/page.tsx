import type { Metadata } from "next";
import CenterApartmentsLanding from "@/components/CenterApartmentsLanding";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLdScript from "@/components/JsonLdScript";
import { getCenterApartmentsJsonLd, getCenterApartmentsMetadata } from "@/lib/seo";

type CenterApartmentsPageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

function first(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({ searchParams }: CenterApartmentsPageProps): Promise<Metadata> {
  return getCenterApartmentsMetadata(first((await searchParams).lang));
}

export default async function CenterApartmentsPage({ searchParams }: CenterApartmentsPageProps) {
  const language = first((await searchParams).lang);

  return (
    <main className="min-h-screen bg-[#111b2a]">
      <JsonLdScript id="center-apartments-jsonld" data={getCenterApartmentsJsonLd(language)} />
      <Header />
      <CenterApartmentsLanding />
      <Footer />
    </main>
  );
}
