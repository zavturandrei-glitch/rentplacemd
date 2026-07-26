import type { Language } from "@/locales/translations";
import { isPastChisinauDate } from "@/lib/chisinauDate";

export type EventInterest = "very-high" | "high" | "medium" | "low";
export type EventCategory =
  | "concert"
  | "festival"
  | "theatre"
  | "sport"
  | "family"
  | "city"
  | "gastronomy"
  | "other";

type LocalizedText = Record<Language, string>;

export type ChisinauEvent = {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  startDate: string;
  endDate?: string;
  startTime?: string;
  venue: LocalizedText;
  address?: LocalizedText;
  city: "Chisinau" | "Moldova-near-Chisinau";
  category: EventCategory;
  interest: EventInterest;
  sourceName: string;
  sourceUrl: string;
  ticketUrl?: string;
  verifiedAt: string;
  status: "scheduled" | "postponed" | "cancelled" | "sold-out";
  featured?: boolean;
};

const verifiedAt = "2026-07-26";

function same(value: string): LocalizedText {
  return { ru: value, ro: value, en: value, uk: value, cs: value };
}

function venue(value: string): LocalizedText {
  return same(value);
}

function concertDescription(title: string, place: string): LocalizedText {
  return {
    ru: `${title} — подтверждённый концерт на площадке ${place}. Перед покупкой билета проверьте актуальные условия на странице организатора.`,
    ro: `${title} este un concert confirmat la ${place}. Înainte de cumpărarea biletului, verificați condițiile actuale pe pagina organizatorului.`,
    en: `${title} is a confirmed concert at ${place}. Check the organiser’s current information before buying a ticket.`,
    uk: `${title} — підтверджений концерт на майданчику ${place}. Перед купівлею квитка перевірте актуальні умови на сторінці організатора.`,
    cs: `${title} je potvrzený koncert v místě ${place}. Před nákupem vstupenky ověřte aktuální podmínky u pořadatele.`,
  };
}

function festivalDescription(title: string, place: string): LocalizedText {
  return {
    ru: `${title} — подтверждённое публичное событие на площадке ${place}. Программа и условия посещения могут обновляться организатором.`,
    ro: `${title} este un eveniment public confirmat la ${place}. Programul și condițiile de acces pot fi actualizate de organizator.`,
    en: `${title} is a confirmed public event at ${place}. The organiser may update the programme and admission details.`,
    uk: `${title} — підтверджена публічна подія на майданчику ${place}. Організатор може оновлювати програму й умови відвідування.`,
    cs: `${title} je potvrzená veřejná akce v místě ${place}. Pořadatel může program a podmínky vstupu aktualizovat.`,
  };
}

function showDescription(title: string, place: string): LocalizedText {
  return {
    ru: `${title} — подтверждённое сценическое событие на площадке ${place}. Возрастные ограничения и правила входа уточняйте у организатора.`,
    ro: `${title} este un spectacol confirmat la ${place}. Verificați la organizator limita de vârstă și regulile de acces.`,
    en: `${title} is a confirmed stage event at ${place}. Check age restrictions and admission rules with the organiser.`,
    uk: `${title} — підтверджена сценічна подія на майданчику ${place}. Вікові обмеження та правила входу уточнюйте в організатора.`,
    cs: `${title} je potvrzená scénická akce v místě ${place}. Věkové omezení a pravidla vstupu ověřte u pořadatele.`,
  };
}

const events: ChisinauEvent[] = [
  {
    id: "amadeus-meets-felix-2026",
    slug: "amadeus-meets-felix-2026",
    title: same("Amadeus meets Felix"),
    description: concertDescription("Amadeus meets Felix", "Sala cu Orgă"),
    startDate: "2026-08-06",
    startTime: "19:00",
    venue: venue("Sala cu Orgă"),
    city: "Chisinau",
    category: "concert",
    interest: "medium",
    sourceName: "iTicket",
    sourceUrl: "https://iticket.md/event/amadeus-meets-felix",
    ticketUrl: "https://iticket.md/event/amadeus-meets-felix",
    verifiedAt,
    status: "scheduled",
  },
  {
    id: "vali-boghean-balkanic-band-2026",
    slug: "vali-boghean-balkanic-band-2026",
    title: same("Vali Boghean & Balkanic Band"),
    description: concertDescription("Vali Boghean & Balkanic Band", "Teatrul Verde"),
    startDate: "2026-08-07",
    startTime: "19:30",
    venue: venue("Teatrul Verde"),
    city: "Chisinau",
    category: "concert",
    interest: "high",
    sourceName: "iTicket",
    sourceUrl: "https://iticket.md/en/event/vali-boghean-balkanic-band",
    ticketUrl: "https://iticket.md/en/event/vali-boghean-balkanic-band",
    verifiedAt,
    status: "scheduled",
  },
  {
    id: "festivalul-lupilor-2026",
    slug: "festivalul-lupilor-2026",
    title: same("Festivalul Lupilor 2026"),
    description: festivalDescription("Festivalul Lupilor 2026", "Orheiul Vechi"),
    startDate: "2026-08-07",
    endDate: "2026-08-09",
    venue: venue("Rezervația Cultural-Naturală „Orheiul Vechi”"),
    city: "Moldova-near-Chisinau",
    category: "festival",
    interest: "very-high",
    sourceName: "LiveTickets",
    sourceUrl: "https://livetickets.md/ro/event/541--festivalul-lupilor-2026",
    ticketUrl: "https://livetickets.md/ro/event/541--festivalul-lupilor-2026",
    verifiedAt,
    status: "scheduled",
    featured: true,
  },
  {
    id: "festivalul-binelui-2026",
    slug: "festivalul-binelui-2026",
    title: same("Festivalul Binelui"),
    description: festivalDescription("Festivalul Binelui", "Teatrul Verde"),
    startDate: "2026-08-15",
    startTime: "19:00",
    venue: venue("Teatrul Verde"),
    city: "Chisinau",
    category: "festival",
    interest: "medium",
    sourceName: "LiveTickets",
    sourceUrl: "https://livetickets.md/ro/event/583--festivalul-binelui",
    ticketUrl: "https://livetickets.md/ro/event/583--festivalul-binelui",
    verifiedAt,
    status: "scheduled",
  },
  {
    id: "mirage-korolova-2026",
    slug: "mirage-korolova-2026",
    title: same("MIRAGE Festival: Korolova"),
    description: festivalDescription("MIRAGE Festival: Korolova", "Arena Chișinău"),
    startDate: "2026-08-15",
    startTime: "20:00",
    venue: venue("Arena Chișinău"),
    city: "Chisinau",
    category: "festival",
    interest: "very-high",
    sourceName: "LiveTickets",
    sourceUrl: "https://livetickets.md/ro/event/534--mirage-festival-korolova",
    ticketUrl: "https://livetickets.md/ro/event/534--mirage-festival-korolova",
    verifiedAt,
    status: "scheduled",
    featured: true,
  },
  {
    id: "sub-luna-lupilor-2026",
    slug: "sub-luna-lupilor-2026",
    title: same("Sub Luna Lupilor"),
    description: concertDescription("Sub Luna Lupilor", "Teatrul Verde"),
    startDate: "2026-08-21",
    startTime: "19:30",
    venue: venue("Teatrul Verde"),
    city: "Chisinau",
    category: "concert",
    interest: "high",
    sourceName: "iTicket",
    sourceUrl: "https://iticket.md/event/sub-luna-lupilor",
    ticketUrl: "https://iticket.md/event/sub-luna-lupilor",
    verifiedAt,
    status: "scheduled",
  },
  {
    id: "summer-fest-2026",
    slug: "summer-fest-2026",
    title: same("SUMMER FEST 2026"),
    description: festivalDescription("SUMMER FEST 2026", "Grădina Botanică"),
    startDate: "2026-08-22",
    endDate: "2026-08-23",
    startTime: "12:00",
    venue: venue("Grădina Botanică"),
    city: "Chisinau",
    category: "festival",
    interest: "very-high",
    sourceName: "Summer Fest",
    sourceUrl: "https://summerfest.md/ru",
    ticketUrl: "https://livetickets.md/ro/event/579--summer-fest-2026",
    verifiedAt,
    status: "scheduled",
    featured: true,
  },
  {
    id: "ready-fest-chisinau-2026",
    slug: "ready-fest-chisinau-2026",
    title: same("READY FEST 2026 CHISINAU"),
    description: festivalDescription("READY FEST 2026 CHISINAU", "Grădina Botanică"),
    startDate: "2026-09-12",
    startTime: "12:00",
    venue: venue("Grădina Botanică"),
    city: "Chisinau",
    category: "festival",
    interest: "high",
    sourceName: "LiveTickets",
    sourceUrl: "https://livetickets.md/ro/event/501--ready-fest-2026-chisinau",
    ticketUrl: "https://livetickets.md/ro/event/501--ready-fest-2026-chisinau",
    verifiedAt,
    status: "scheduled",
  },
  {
    id: "coldplay-by-coolplay-2026",
    slug: "coldplay-by-coolplay-2026",
    title: same("COLDPLAY BY COOLPLAY"),
    description: showDescription("COLDPLAY BY COOLPLAY", "Arena Chișinău"),
    startDate: "2026-09-17",
    startTime: "19:00",
    venue: venue("Arena Chișinău"),
    city: "Chisinau",
    category: "theatre",
    interest: "high",
    sourceName: "LiveTickets",
    sourceUrl: "https://livetickets.md/ro/event/575--coldplay-by-coolplay",
    ticketUrl: "https://livetickets.md/ro/event/575--coldplay-by-coolplay",
    verifiedAt,
    status: "scheduled",
  },
  {
    id: "rock-sympho-show-iv-2026",
    slug: "rock-sympho-show-iv-2026",
    title: same("ROCK SYMPHO SHOW IV – 2026"),
    description: showDescription("ROCK SYMPHO SHOW IV – 2026", "Palatul Național „Nicolae Sulac”"),
    startDate: "2026-09-18",
    startTime: "19:30",
    venue: venue("Palatul Național „Nicolae Sulac”"),
    city: "Chisinau",
    category: "theatre",
    interest: "high",
    sourceName: "LiveTickets",
    sourceUrl: "https://livetickets.md/ro/event/543--rock-sympho-show-iv-2026",
    ticketUrl: "https://livetickets.md/ro/event/543--rock-sympho-show-iv-2026",
    verifiedAt,
    status: "scheduled",
  },
  {
    id: "ludovico-einaudi-magnifique-trio-2026",
    slug: "ludovico-einaudi-magnifique-trio-2026",
    title: same("LUDOVICO EINAUDI by MAGNIFIQUE TRIO"),
    description: showDescription("LUDOVICO EINAUDI by MAGNIFIQUE TRIO", "Sala cu Orgă"),
    startDate: "2026-10-04",
    startTime: "18:30",
    venue: venue("Sala cu Orgă"),
    city: "Chisinau",
    category: "theatre",
    interest: "medium",
    sourceName: "LiveTickets",
    sourceUrl: "https://livetickets.md/ro/event/564--ludovico-einaudi-by-magnifique-trio",
    ticketUrl: "https://livetickets.md/ro/event/564--ludovico-einaudi-by-magnifique-trio",
    verifiedAt,
    status: "scheduled",
  },
  {
    id: "bi-2-sun-tour-2026",
    slug: "bi-2-sun-tour-2026",
    title: same("Би-2 «Путешествие вокруг Солнца»"),
    description: concertDescription("Би-2 «Путешествие вокруг Солнца»", "Arena Chișinău"),
    startDate: "2026-10-14",
    startTime: "20:00",
    venue: venue("Arena Chișinău"),
    city: "Chisinau",
    category: "concert",
    interest: "very-high",
    sourceName: "LiveTickets",
    sourceUrl: "https://livetickets.md/ro/event/522--bi-2-%22calatoria-in-jurul-soarelui%22",
    ticketUrl: "https://livetickets.md/ro/event/522--bi-2-%22calatoria-in-jurul-soarelui%22",
    verifiedAt,
    status: "scheduled",
    featured: true,
  },
  {
    id: "imany-women-deserve-rage-2026",
    slug: "imany-women-deserve-rage-2026",
    title: same("IMANY — WOMEN DESERVE RAGE TOUR"),
    description: concertDescription("IMANY — WOMEN DESERVE RAGE TOUR", "Arena Chișinău"),
    startDate: "2026-10-21",
    startTime: "20:00",
    venue: venue("Arena Chișinău"),
    city: "Chisinau",
    category: "concert",
    interest: "very-high",
    sourceName: "LiveTickets",
    sourceUrl: "https://livetickets.md/ro/event/580--imany-woman-deserve-rage-tour",
    ticketUrl: "https://livetickets.md/ro/event/580--imany-woman-deserve-rage-tour",
    verifiedAt,
    status: "scheduled",
    featured: true,
  },
  {
    id: "iuliana-beregoi-predestinati-2026",
    slug: "iuliana-beregoi-predestinati-2026",
    title: same("Iuliana Beregoi PREDESTINAȚI"),
    description: concertDescription("Iuliana Beregoi PREDESTINAȚI", "Arena Chișinău"),
    startDate: "2026-10-22",
    startTime: "18:30",
    venue: venue("Arena Chișinău"),
    city: "Chisinau",
    category: "concert",
    interest: "high",
    sourceName: "LiveTickets",
    sourceUrl: "https://livetickets.md/ro/event/436--iuliana-beregoi-predestinati",
    ticketUrl: "https://livetickets.md/ro/event/436--iuliana-beregoi-predestinati",
    verifiedAt,
    status: "scheduled",
  },
  {
    id: "loboda-2026",
    slug: "loboda-2026",
    title: same("LOBODA"),
    description: concertDescription("LOBODA", "Arena Chișinău"),
    startDate: "2026-10-24",
    startTime: "20:00",
    venue: venue("Arena Chișinău"),
    city: "Chisinau",
    category: "concert",
    interest: "very-high",
    sourceName: "LiveTickets",
    sourceUrl: "https://livetickets.md/ro/event/573--loboda",
    ticketUrl: "https://livetickets.md/ro/event/573--loboda",
    verifiedAt,
    status: "scheduled",
    featured: true,
  },
  {
    id: "grand-chinese-circus-show-2026",
    slug: "grand-chinese-circus-show-2026",
    title: same("Grand Chinese Circus Show"),
    description: showDescription("Grand Chinese Circus Show", "Arena Chișinău"),
    startDate: "2026-10-31",
    startTime: "19:00",
    venue: venue("Arena Chișinău"),
    city: "Chisinau",
    category: "family",
    interest: "high",
    sourceName: "LiveTickets",
    sourceUrl: "https://livetickets.md/ro/event/620--grand-chinese-circus-show",
    ticketUrl: "https://livetickets.md/ro/event/620--grand-chinese-circus-show",
    verifiedAt,
    status: "scheduled",
  },
  {
    id: "vanya-usovich-2026",
    slug: "vanya-usovich-2026",
    title: same("Ваня Усович | Кишинев 31.10"),
    description: showDescription("Ваня Усович", "Palatul Național „Nicolae Sulac”"),
    startDate: "2026-10-31",
    startTime: "19:00",
    venue: venue("Palatul Național „Nicolae Sulac”"),
    city: "Chisinau",
    category: "theatre",
    interest: "high",
    sourceName: "LiveTickets",
    sourceUrl: "https://livetickets.md/ro/event/530--vanya-usovich-or-kishinev-3110",
    ticketUrl: "https://livetickets.md/ro/event/530--vanya-usovich-or-kishinev-3110",
    verifiedAt,
    status: "scheduled",
  },
  {
    id: "uriah-heep-2026",
    slug: "uriah-heep-2026",
    title: same("Uriah Heep — The Magician’s Farewell Tour"),
    description: concertDescription("Uriah Heep — The Magician’s Farewell Tour", "Palatul Național „Nicolae Sulac”"),
    startDate: "2026-11-02",
    startTime: "20:00",
    venue: venue("Palatul Național „Nicolae Sulac”"),
    city: "Chisinau",
    category: "concert",
    interest: "high",
    sourceName: "LiveTickets",
    sourceUrl: "https://livetickets.md/ro/event/569--uriah-heep-the-magician%27s-farewell-tour",
    ticketUrl: "https://livetickets.md/ro/event/569--uriah-heep-the-magician%27s-farewell-tour",
    verifiedAt,
    status: "scheduled",
  },
  {
    id: "gandul-matei-30-ani-2026",
    slug: "gandul-matei-30-ani-2026",
    title: same("Gândul Mâței — Prieteni de drum — 30 de ani"),
    description: concertDescription("Gândul Mâței — Prieteni de drum — 30 de ani", "Arena Chișinău"),
    startDate: "2026-11-19",
    startTime: "19:00",
    venue: venue("Arena Chișinău"),
    city: "Chisinau",
    category: "concert",
    interest: "high",
    sourceName: "LiveTickets",
    sourceUrl: "https://livetickets.md/ro/event/619--gandul-matei-prieteni-de-drum-30-de-ani",
    ticketUrl: "https://livetickets.md/ro/event/619--gandul-matei-prieteni-de-drum-30-de-ani",
    verifiedAt,
    status: "scheduled",
  },
  {
    id: "k-pop-forever-2026",
    slug: "k-pop-forever-2026",
    title: same("K-POP FOREVER"),
    description: showDescription("K-POP FOREVER", "Arena Chișinău"),
    startDate: "2026-12-03",
    startTime: "19:30",
    venue: venue("Arena Chișinău"),
    city: "Chisinau",
    category: "family",
    interest: "high",
    sourceName: "LiveTickets",
    sourceUrl: "https://livetickets.md/ro/event/437--k-pop-forever",
    ticketUrl: "https://livetickets.md/ro/event/437--k-pop-forever",
    verifiedAt,
    status: "scheduled",
  },
  {
    id: "ion-paladi-colindam-2026",
    slug: "ion-paladi-colindam-2026",
    title: same("ION PALADI „Colindăm cu drag tot neamul”"),
    description: concertDescription("ION PALADI „Colindăm cu drag tot neamul”", "Arena Chișinău"),
    startDate: "2026-12-12",
    startTime: "19:00",
    venue: venue("Arena Chișinău"),
    city: "Chisinau",
    category: "concert",
    interest: "high",
    sourceName: "LiveTickets",
    sourceUrl: "https://livetickets.md/ro/event/572--ion-paladi-colindam-cu-drag-tot-neamul",
    ticketUrl: "https://livetickets.md/ro/event/572--ion-paladi-colindam-cu-drag-tot-neamul",
    verifiedAt,
    status: "scheduled",
  },
  {
    id: "spirit-of-smokie-2026",
    slug: "spirit-of-smokie-2026",
    title: same("Spirit of Smokie"),
    description: concertDescription("Spirit of Smokie", "Teatrul Național de Operă și Balet „Maria Bieșu”"),
    startDate: "2026-12-16",
    startTime: "19:00",
    venue: venue("Teatrul Național de Operă și Balet „Maria Bieșu”"),
    city: "Chisinau",
    category: "concert",
    interest: "high",
    sourceName: "LiveTickets",
    sourceUrl: "https://livetickets.md/ro/event/560--spirit-of-smokie",
    ticketUrl: "https://livetickets.md/ro/event/560--spirit-of-smokie",
    verifiedAt,
    status: "scheduled",
  },
  {
    id: "nervy-chisinau-2026",
    slug: "nervy-chisinau-2026",
    title: same("NERVY"),
    description: concertDescription("NERVY", "Arena Chișinău"),
    startDate: "2026-12-25",
    startTime: "20:00",
    venue: venue("Arena Chișinău"),
    city: "Chisinau",
    category: "concert",
    interest: "high",
    sourceName: "LiveTickets",
    sourceUrl: "https://livetickets.md/ro/event/489--nervy-revin-la-chisinau",
    ticketUrl: "https://livetickets.md/ro/event/489--nervy-revin-la-chisinau",
    verifiedAt,
    status: "scheduled",
  },
];

export const guideEvents: readonly ChisinauEvent[] = [...events].sort((a, b) =>
  a.startDate.localeCompare(b.startDate) || (a.startTime ?? "").localeCompare(b.startTime ?? ""),
);

export function getUpcomingGuideEvents(now = new Date()) {
  return guideEvents.filter((event) =>
    event.status !== "cancelled" && !isPastChisinauDate(event.endDate ?? event.startDate, now),
  );
}

export const eventsUpdatedAt = verifiedAt;
