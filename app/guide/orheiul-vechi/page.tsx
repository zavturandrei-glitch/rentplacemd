import type { Metadata } from "next";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLdScript from "@/components/JsonLdScript";
import MoldovaDestinationPage from "@/components/MoldovaDestinationPage";
import { buildDestinationJsonLd, getDestinationMetadata } from "@/lib/guideSeo";

type PageProps = { searchParams: Promise<{ lang?: string | string[] }> };
const first = (value?: string | string[]) => Array.isArray(value) ? value[0] : value;

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return getDestinationMetadata("orheiul-vechi", first((await searchParams).lang));
}

export default async function OrheiulVechiPage({ searchParams }: PageProps) {
  const language = first((await searchParams).lang);
  return (
    <main className="min-h-screen bg-[#f5f1e8]">
      <JsonLdScript id="destination-orheiul-vechi-jsonld" data={buildDestinationJsonLd("orheiul-vechi", language)} />
      <Header />
      <BackButton />
      <MoldovaDestinationPage slug="orheiul-vechi" />
      <Footer />
    </main>
  );
}
