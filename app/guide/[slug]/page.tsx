import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import GuideArticle from "@/components/GuideArticle";
import Header from "@/components/Header";
import JsonLdScript from "@/components/JsonLdScript";
import WineriesHub from "@/components/WineriesHub";
import { guideSlugs, isGuideSlug } from "@/lib/guide";
import { buildGuideJsonLd, getGuidePageMetadata } from "@/lib/guideSeo";
import { getLocalizedHref } from "@/lib/localizedHref";
import { normalizeSiteLanguage } from "@/lib/seo";
import { isRegionalGuideSlug, regionalGuideSlugs } from "@/lib/regionalGuides";
import { getRegionalGuideMetadata, buildRegionalGuideJsonLd } from "@/lib/regionalGuideSeo";
import RegionalGuidePage from "@/components/RegionalGuidePage";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

function first(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export function generateStaticParams() {
  return [...guideSlugs, ...regionalGuideSlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  if (isRegionalGuideSlug(slug)) return getRegionalGuideMetadata(slug, first(query.lang));
  if (!isGuideSlug(slug)) return {};
  return getGuidePageMetadata(slug, first(query.lang));
}

export default async function GuidePage({ params, searchParams }: PageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  if (isRegionalGuideSlug(slug)) {
    const language = first(query.lang);
    return <main className="min-h-screen bg-[#f5f1e8]"><JsonLdScript id={`guide-${slug}-jsonld`} data={buildRegionalGuideJsonLd(slug, language)} /><Header /><BackButton /><RegionalGuidePage slug={slug} language={normalizeSiteLanguage(language)} /><Footer /></main>;
  }
  if (!isGuideSlug(slug)) notFound();
  const language = first(query.lang);
  if (slug === "events") {
    permanentRedirect(getLocalizedHref("/events", normalizeSiteLanguage(language)));
  }

  return (
    <main className="min-h-screen bg-[#fffaf0]">
      <JsonLdScript id={`guide-${slug}-jsonld`} data={buildGuideJsonLd(slug, language)} />
      <Header />
      <BackButton />
      {slug === "wineries" ? <WineriesHub /> : <GuideArticle slug={slug} />}
      <Footer />
    </main>
  );
}
