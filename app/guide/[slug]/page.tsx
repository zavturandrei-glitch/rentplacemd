import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import GuideArticle from "@/components/GuideArticle";
import Header from "@/components/Header";
import JsonLdScript from "@/components/JsonLdScript";
import MoldovaDestinationPage from "@/components/MoldovaDestinationPage";
import WineriesHub from "@/components/WineriesHub";
import { guideSlugs, isGuideSlug } from "@/lib/guide";
import {
  buildDestinationJsonLd,
  buildGuideJsonLd,
  buildWineriesHubJsonLd,
  getDestinationMetadata,
  getGuidePageMetadata,
  getWineriesHubMetadata,
} from "@/lib/guideSeo";
import { destinationSlugs, isDestinationSlug } from "@/lib/moldovaDestinations";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

function first(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export function generateStaticParams() {
  return [...guideSlugs, ...destinationSlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  if (isDestinationSlug(slug)) {
    return getDestinationMetadata(slug, first(query.lang));
  }
  if (!isGuideSlug(slug)) return {};
  if (slug === "wineries") {
    return getWineriesHubMetadata(first(query.lang));
  }
  return getGuidePageMetadata(slug, first(query.lang));
}

export default async function GuidePage({ params, searchParams }: PageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const language = first(query.lang);

  if (isDestinationSlug(slug)) {
    return (
      <main className="min-h-screen overflow-x-clip bg-[#fffaf0]">
        <JsonLdScript id={`destination-${slug}-jsonld`} data={buildDestinationJsonLd(slug, language)} />
        <Header />
        <BackButton />
        <MoldovaDestinationPage slug={slug} />
        <Footer />
      </main>
    );
  }

  if (!isGuideSlug(slug)) notFound();
  if (slug === "events") {
    permanentRedirect(`/events${language ? `?lang=${language}` : ""}`);
  }

  if (slug === "wineries") {
    return (
      <main className="min-h-screen overflow-x-clip bg-[#fffaf0]">
        <JsonLdScript id="wineries-hub-jsonld" data={buildWineriesHubJsonLd(language)} />
        <Header />
        <BackButton />
        <WineriesHub />
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#fffaf0]">
      <JsonLdScript id={`guide-${slug}-jsonld`} data={buildGuideJsonLd(slug, language)} />
      <Header />
      <BackButton />
      <GuideArticle slug={slug} />
      <Footer />
    </main>
  );
}
