import type { Metadata } from "next";
import EventsCalendar from "@/components/EventsCalendar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLdScript from "@/components/JsonLdScript";
import CityVideoRail from "@/components/CityVideoRail";
import { guidePages } from "@/lib/guide";
import { buildGuideJsonLd } from "@/lib/guideSeo";
import { getGuidePageMetadata } from "@/lib/guideSeo";
import { readPublishedCityVideos } from "@/lib/cityVideoStore";
import { getChisinauDateKey } from "@/lib/chisinauDate";

type PageProps = { searchParams: Promise<{ lang?: string | string[] }> };

function first(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const query = await searchParams;
  const metadata = getGuidePageMetadata("events", first(query.lang));
  return {
    ...metadata,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
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
  const pastEventVideos = (await readPublishedCityVideos())
    .filter((video) => video.date < getChisinauDateKey());

  return (
    <main className="min-h-screen bg-[#fffaf0]">
      <JsonLdScript id="events-jsonld" data={jsonLd} />
      <Header />
      <EventsCalendar />
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <CityVideoRail videos={pastEventVideos} placement="events" />
      </div>
      <Footer />
    </main>
  );
}
