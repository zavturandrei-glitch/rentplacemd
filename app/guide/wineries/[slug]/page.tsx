import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLdScript from "@/components/JsonLdScript";
import MoldovaDestinationPage from "@/components/MoldovaDestinationPage";
import { isWinerySlug, winerySlugs } from "@/lib/moldovaDestinations";
import { buildDestinationJsonLd, getDestinationMetadata } from "@/lib/guideSeo";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};
const first = (value?: string | string[]) => Array.isArray(value) ? value[0] : value;

export function generateStaticParams() {
  return winerySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  return isWinerySlug(slug) ? getDestinationMetadata(slug, first(query.lang)) : {};
}

export default async function WineryPage({ params, searchParams }: PageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  if (!isWinerySlug(slug)) notFound();
  const language = first(query.lang);

  return (
    <main className="min-h-screen bg-[#f5f1e8]">
      <JsonLdScript id={`destination-${slug}-jsonld`} data={buildDestinationJsonLd(slug, language)} />
      <Header />
      <BackButton />
      <MoldovaDestinationPage slug={slug} />
      <Footer />
    </main>
  );
}
