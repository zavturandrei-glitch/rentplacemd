import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GuideHub from "@/components/GuideHub";
import JsonLdScript from "@/components/JsonLdScript";
import { buildGuideHubJsonLd, getGuideHubMetadata } from "@/lib/guideSeo";

type PageProps = { searchParams: Promise<{ lang?: string | string[] }> };

function first(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const query = await searchParams;
  return getGuideHubMetadata(first(query.lang));
}

export default async function ChisinauGuidePage({ searchParams }: PageProps) {
  const query = await searchParams;
  const language = first(query.lang);

  return (
    <main className="mobile-dark-page min-h-screen bg-[#fffaf0]">
      <JsonLdScript id="guide-jsonld" data={buildGuideHubJsonLd(language)} />
      <Header showBack preserveDesktopBack />
      <GuideHub />
      <Footer />
    </main>
  );
}
