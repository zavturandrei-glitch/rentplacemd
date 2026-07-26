import type { Metadata } from "next";
import BackButton from "@/components/BackButton";
import EventsCalendar from "@/components/EventsCalendar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLdScript from "@/components/JsonLdScript";
import { guidePages } from "@/lib/guide";
import { buildGuideJsonLd } from "@/lib/guideSeo";
import { getGuidePageMetadata } from "@/lib/guideSeo";

type PageProps = { searchParams: Promise<{ lang?: string | string[] }> };

function first(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const query = await searchParams;
  const metadata = getGuidePageMetadata("events", first(query.lang));
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: metadata.alternates?.canonical?.toString().replace("/guide/events", "/events"),
      languages: Object.fromEntries(
        Object.entries(metadata.alternates?.languages ?? {}).map(([language, url]) => [
          language,
          String(url).replace("/guide/events", "/events"),
        ]),
      ),
    },
    openGraph: {
      ...metadata.openGraph,
      url: `https://rentplace.md/events${first(query.lang) ? `?lang=${first(query.lang)}` : ""}`,
      images: [{ url: `https://rentplace.md${guidePages.events.image}`, alt: guidePages.events.title.ru }],
    },
  };
}

export default async function EventsPage({ searchParams }: PageProps) {
  const query = await searchParams;
  const language = first(query.lang);
  const jsonLd = buildGuideJsonLd("events", language).map((entry) => {
    const serialized = JSON.stringify(entry).replaceAll("/guide/events", "/events");
    return JSON.parse(serialized) as unknown;
  });

  return (
    <main className="min-h-screen bg-[#fffaf0]">
      <JsonLdScript id="events-jsonld" data={jsonLd} />
      <Header />
      <BackButton />
      <EventsCalendar />
      <Footer />
    </main>
  );
}
