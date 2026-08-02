import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import GuideArticle from "@/components/GuideArticle";
import Header from "@/components/Header";
import JsonLdScript from "@/components/JsonLdScript";
import { guideSlugs, isGuideSlug } from "@/lib/guide";
import { buildGuideJsonLd, getGuidePageMetadata } from "@/lib/guideSeo";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

function first(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  if (!isGuideSlug(slug)) return {};
  return getGuidePageMetadata(slug, first(query.lang));
}

export default async function GuidePage({ params, searchParams }: PageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  if (!isGuideSlug(slug)) notFound();
  const language = first(query.lang);
  if (slug === "events") {
    permanentRedirect(`/events${language ? `?lang=${language}` : ""}`);
  }

  return (
    <main className="min-h-screen bg-[#fffaf0]">
      <JsonLdScript id={`guide-${slug}-jsonld`} data={buildGuideJsonLd(slug, language)} />
      <Header />
      <BackButton />
      <GuideArticle slug={slug} />
      <Footer />
    </main>
  );
}
