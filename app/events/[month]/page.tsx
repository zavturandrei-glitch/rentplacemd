import { readEventInventory } from "@/lib/eventStore";
import { eventMonths } from "@/lib/eventDates";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventMonthPage from "@/components/EventMonthPage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLdScript from "@/components/JsonLdScript";
import {
  buildEventMonthJsonLd,
  eventMonthKeys,
  eventMonthPath,
  getEventMonthMetadata,
  parseEventMonthSlug,
} from "@/lib/eventCalendar";

type PageProps = {
  params: Promise<{ month: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

function first(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export function generateStaticParams() {
  return eventMonthKeys.map((monthKey) => ({
    month: eventMonthPath(monthKey).split("/").at(-1)!,
  }));
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const [{ month }, query] = await Promise.all([params, searchParams]);
  const inventory = await readEventInventory();
  const monthKey = parseEventMonthSlug(month);
  if (!monthKey || !eventMonths(inventory).includes(monthKey)) return {};
  return getEventMonthMetadata(monthKey, first(query.lang), inventory);
}

export default async function MonthlyEventsPage({ params, searchParams }: PageProps) {
  const [{ month }, query] = await Promise.all([params, searchParams]);
  const inventory = await readEventInventory();
  const monthKey = parseEventMonthSlug(month);
  if (!monthKey || !eventMonths(inventory).includes(monthKey)) notFound();
  const language = first(query.lang);

  return (
    <main className="min-h-screen bg-[#fffaf0]">
      <JsonLdScript id={`events-${month}-jsonld`} data={buildEventMonthJsonLd(monthKey, language, inventory)} />
      <Header />
      <EventMonthPage monthKey={monthKey} inventory={inventory} />
      <Footer />
    </main>
  );
}
