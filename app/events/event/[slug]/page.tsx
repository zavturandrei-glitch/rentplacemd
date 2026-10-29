import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventCover from "@/components/EventCover";
import EventNotice from "@/components/EventNotice";
import JsonLdScript from "@/components/JsonLdScript";
import { readEventInventory } from "@/lib/eventStore";
import { buildEventMonthJsonLd, eventMonthPath, getEventMonthSeo } from "@/lib/eventCalendar";
import { baseUrl, getApartmentUrl, localizedUrl, normalizeSiteLanguage } from "@/lib/seo";
import type { Language } from "@/locales/translations";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> };
const ui = {
  ru: { source: "Официальная информация и билеты", apartments: "Найти квартиру на эти даты", dates: "Уточнить жильё на даты события", note: "Доступность квартир подтверждается отдельно. Сравните варианты и уточните даты у RentPlaceMD.", options: "Квартиры для вашей поездки", guide: "Городской гид", transfer: "Трансфер", trips: "Экскурсии", fallback: "Описание доступно на русском языке.", rights: "Источник изображения" },
  ro: { source: "Informații oficiale și bilete", apartments: "Găsește un apartament pentru aceste date", dates: "Verifică cazarea pentru datele evenimentului", note: "Disponibilitatea se confirmă separat. Compară opțiunile și verifică datele cu RentPlaceMD.", options: "Apartamente pentru călătorie", guide: "Ghidul orașului", transfer: "Transfer", trips: "Excursii", fallback: "Descrierea este disponibilă în limba rusă.", rights: "Sursa imaginii" },
  en: { source: "Official information and tickets", apartments: "Find an apartment for these dates", dates: "Ask about accommodation for the event dates", note: "Availability is confirmed separately. Compare options and check your dates with RentPlaceMD.", options: "Apartments for your visit", guide: "City guide", transfer: "Transfer", trips: "Tours", fallback: "The description is available in Russian.", rights: "Image source" },
  uk: { source: "Офіційна інформація та квитки", apartments: "Знайти квартиру на ці дати", dates: "Уточнити житло на дати події", note: "Доступність квартир підтверджується окремо. Порівняйте варіанти та уточніть дати в RentPlaceMD.", options: "Квартири для вашої подорожі", guide: "Міський путівник", transfer: "Трансфер", trips: "Екскурсії", fallback: "Опис доступний російською мовою.", rights: "Джерело зображення" },
  cs: { source: "Oficiální informace a vstupenky", apartments: "Najít apartmán na tyto termíny", dates: "Ověřit ubytování na termín akce", note: "Dostupnost se potvrzuje samostatně. Porovnejte nabídky a ověřte termín u RentPlaceMD.", options: "Apartmány pro vaši návštěvu", guide: "Průvodce městem", transfer: "Transfer", trips: "Výlety", fallback: "Popis je k dispozici v ruštině.", rights: "Zdroj obrázku" },
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const [{ slug }, query, inventory] = await Promise.all([params, searchParams, readEventInventory()]);
  const event = inventory.find(event => event.slug === slug);
  if (!event) return {};
  const requested = normalizeSiteLanguage(query.lang);
  const languages = event.translatedLanguages ?? ["ru", "ro", "en", "uk", "cs"];
  const translated = languages.includes(requested);
  const language = translated ? requested : "ru";
  const path = `/events/event/${slug}`;
  const socialImage = baseUrl + (event.image?.path ?? "/guide/events.webp");
  return {
    title: { absolute: `${event.title[language]} — ${event.startDate} | RentPlaceMD` },
    description: event.description[language], robots: { index: translated, follow: true },
    alternates: { canonical: localizedUrl(path, language), languages: { ...Object.fromEntries(languages.map(lang => [lang, localizedUrl(path, lang)])), "x-default": baseUrl + path } },
    openGraph: { type: "article", locale: { ru: "ru_MD", ro: "ro_MD", en: "en_US", uk: "uk_UA", cs: "cs_CZ" }[language], title: event.title[language], description: event.description[language], url: localizedUrl(path, language), images: [{ url: socialImage, alt: event.title[language] }] },
    twitter: { card: "summary_large_image", title: event.title[language], description: event.description[language], images: [socialImage] },
  };
}

export default async function EventPage({ params, searchParams }: Props) {
  const [{ slug }, query, inventory] = await Promise.all([params, searchParams, readEventInventory()]);
  const event = inventory.find(event => event.slug === slug);
  if (!event) notFound();
  const language = normalizeSiteLanguage(query.lang);
  const copy = ui[language];
  const translated = !event.translatedLanguages || event.translatedLanguages.includes(language);
  const contentLanguage: Language = translated ? language : "ru";
  const path = `/events/event/${slug}`;
  const month = event.startDate.slice(0, 7);
  const monthUrl = localizedUrl(eventMonthPath(month), language);
  const schema = buildEventMonthJsonLd(month, language, inventory).filter(node => node["@type"] === "Event" && "url" in node && node.url === localizedUrl(path, language));
  const jsonLd = [{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "RentPlaceMD", item: baseUrl },
    { "@type": "ListItem", position: 2, name: getEventMonthSeo(month, language).calendar, item: localizedUrl("/events", language) },
    { "@type": "ListItem", position: 3, name: getEventMonthSeo(month, language).month, item: monthUrl },
    { "@type": "ListItem", position: 4, name: event.title[contentLanguage], item: localizedUrl(path, contentLanguage) },
  ] }, ...schema];
  const request = `${event.title[contentLanguage]}: ${event.startDate}${event.endDate ? ` — ${event.endDate}` : ""}. ${copy.dates}`;
  return <main className="min-h-screen bg-[#fffaf0]"><Header /><JsonLdScript id="event-jsonld" data={jsonLd} />
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <nav className="mb-6 text-sm"><Link href={localizedUrl("/events", language)} className="underline">{getEventMonthSeo(month, language).calendar}</Link> / <Link href={monthUrl} className="underline">{getEventMonthSeo(month, language).month}</Link></nav>
      <EventCover event={event} language={contentLanguage} />
      <h1 className="text-3xl font-bold sm:text-5xl" lang={contentLanguage}>{event.title[contentLanguage]}</h1>
      <EventNotice event={event} language={language} />
      <p className="my-5 text-lg font-semibold"><time dateTime={event.startDate}>{event.startDate}</time>{event.endDate && <> — <time dateTime={event.endDate}>{event.endDate}</time></>}{event.startTime && ` · ${event.startTime} (Europe/Chisinau)`}</p>
      <p className="font-semibold" lang={contentLanguage}>{event.venue[contentLanguage]}</p>
      <p className="mt-2 text-sm text-slate-500">{({ ru: "Проверено", ro: "Verificat", en: "Verified", uk: "Перевірено", cs: "Ověřeno" })[language]}: {event.verifiedAt}</p>
      {event.address && <p lang={contentLanguage}>{event.address[contentLanguage]}</p>}
      {!translated && <p className="mt-5 text-sm text-slate-600">{copy.fallback}</p>}
      <p lang={contentLanguage} className="my-6 whitespace-pre-line text-lg leading-8">{event.description[contentLanguage]}</p>
      <a className="inline-flex min-h-11 items-center font-semibold underline" href={event.sourceUrl} target="_blank" rel="noreferrer">{copy.source} ↗</a>
      {event.image && <p className="mt-4 text-sm text-slate-500"><a href={event.image.source} rel="noreferrer" target="_blank" className="underline">{copy.rights}</a> · {event.image.rights}</p>}
      {event.status !== "cancelled" && event.status !== "postponed" && <section className="my-8 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">{copy.apartments}</h2><p className="my-4 text-slate-600">{copy.note}</p>
        <div className="flex flex-wrap gap-3"><Link className="inline-flex min-h-12 items-center rounded-full bg-[#d4146f] px-5 font-semibold text-white" href={localizedUrl("/apartments", language)}>{copy.apartments}</Link>
          <a href={`https://wa.me/37369990190?text=${encodeURIComponent(request)}`} rel="noreferrer" target="_blank" className="inline-flex min-h-12 items-center rounded-full border px-5">{copy.dates} · WhatsApp</a></div>
        <h3 className="mt-6 font-semibold">{copy.options}</h3><div className="mt-3 flex flex-wrap gap-4">{[6, 61, 84].map(id => <Link className="underline" key={id} href={localizedUrl(new URL(getApartmentUrl(id)).pathname, language)}>RentPlaceMD · ID {id}</Link>)}</div>
      </section>}
      <nav className="my-8 flex flex-wrap gap-5 font-semibold"><Link href={localizedUrl("/chisinau-guide", language)}>{copy.guide}</Link><Link href={localizedUrl("/transfer", language)}>{copy.transfer}</Link><Link href={localizedUrl("/excursions", language)}>{copy.trips}</Link></nav>
    </article><Footer /></main>;
}
