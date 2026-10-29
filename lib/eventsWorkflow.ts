import { createHash } from "node:crypto";
import type { ChisinauEvent } from "./events";
import type { EventSourceConfiguration } from "./eventSource";

export type EventCandidate = { fingerprint: string; event: ChisinauEvent; receivedAt: string };
export type EventLog = { at: string; level: "info" | "error"; message: string };
export type EventState = {
  overrides: Record<string, ChisinauEvent | null>;
  queue: EventCandidate[];
  rejected: string[];
  logs: EventLog[];
  lastCheckedAt?: string;
  lastScheduledDay?: string;
  source?: EventSourceConfiguration;
};
export const emptyEventState = (): EventState => ({ overrides: {}, queue: [], rejected: [], logs: [] });
export const eventLanguages = ["ru", "ro", "en", "uk", "cs"] as const;
const categories = ["concert", "festival", "theatre", "sport", "business", "family", "city", "gastronomy", "other"];

function date(value: unknown) {
  const text = String(value ?? "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text) || !Number.isFinite(Date.parse(text)) || new Date(text).toISOString().slice(0, 10) !== text) throw new Error("Некорректная дата");
  return text;
}

function url(value: unknown) {
  const parsed = new URL(String(value));
  if (parsed.protocol !== "https:" || parsed.username || parsed.password) throw new Error("Нужна HTTPS-ссылка без пароля");
  return parsed.href;
}

export function validateEvent(input: unknown, now = new Date()): ChisinauEvent {
  if (!input || typeof input !== "object") throw new Error("Нужен объект события");
  const value = input as Record<string, unknown>;
  const slug = String(value.slug ?? "");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 140) throw new Error("Некорректный slug");
  const localized = (field: string) => {
    const raw = value[field] as Record<string, unknown> | undefined;
    if (!raw || typeof raw.ru !== "string" || !raw.ru.trim()) throw new Error(`Заполните ${field} на исходном языке (ru)`);
    return Object.fromEntries(eventLanguages.map(language => {
      const text = typeof raw[language] === "string" && raw[language].trim() ? raw[language].trim() : raw.ru as string;
      if (text.length > 5000) throw new Error("Слишком длинный текст");
      return [language, text];
    })) as ChisinauEvent["title"];
  };
  const startDate = date(value.startDate);
  const endDate = value.endDate ? date(value.endDate) : undefined;
  if (endDate && endDate < startDate) throw new Error("Конец раньше начала");
  if (endDate && Number(new Date(endDate)) - Number(new Date(startDate)) > 366 * 86400000) throw new Error("Событие длиннее года");
  if (value.startTime && !/^([01]\d|2[0-3]):[0-5]\d$/.test(String(value.startTime))) throw new Error("Некорректное время");
  if (!categories.includes(String(value.category))) throw new Error("Неизвестная категория");
  if (!["scheduled", "cancelled", "postponed", "sold-out"].includes(String(value.status))) throw new Error("Неизвестный статус");
  const title = localized("title"), description = localized("description"), venue = localized("venue");
  const rawTitle = value.title as Record<string, unknown>, rawDescription = value.description as Record<string, unknown>;
  const translatedLanguages = eventLanguages.filter(language => Boolean(rawTitle[language] && rawDescription[language]) && (!Array.isArray(value.translatedLanguages) || value.translatedLanguages.includes(language)));
  let image: ChisinauEvent["image"];
  if (value.image) {
    const raw = value.image as Record<string, unknown>;
    if (!/^\/event-images\/[a-f0-9]{64}$/.test(String(raw.path)) || !raw.source || !raw.rights) throw new Error("Изображение должно быть загружено с источником и правами");
    image = { path: String(raw.path), source: url(raw.source), rights: String(raw.rights).slice(0, 1000), alt: title };
  }
  let organizer: ChisinauEvent["organizer"];
  if (value.organizer) {
    const raw = value.organizer as Record<string, unknown>;
    if (!["Organization", "Person"].includes(String(raw.type)) || !raw.name) throw new Error("Некорректный организатор");
    organizer = { type: raw.type as "Organization" | "Person", name: String(raw.name).slice(0, 300), url: url(raw.url) };
  }
  const demandStart = value.demandStart ? date(value.demandStart) : startDate;
  const demandEnd = value.demandEnd ? date(value.demandEnd) : endDate ?? startDate;
  if (demandStart > demandEnd) throw new Error("Некорректный период поездки");
  return {
    id: slug, slug, title, description, venue, startDate, endDate,
    startTime: value.startTime ? String(value.startTime) : undefined,
    previousStartDate: value.previousStartDate ? date(value.previousStartDate) : undefined,
    category: value.category as ChisinauEvent["category"], status: value.status as ChisinauEvent["status"],
    city: value.city === "Moldova-near-Chisinau" ? value.city : "Chisinau",
    interest: ["very-high", "high", "medium", "low"].includes(String(value.interest)) ? value.interest as ChisinauEvent["interest"] : "low",
    demandStart, demandEnd, demandReason: value.demandReason ? localized("demandReason") : description,
    address: value.address ? localized("address") : undefined,
    sourceName: String(value.sourceName || "Источник").slice(0, 300), sourceUrl: url(value.sourceUrl),
    ticketUrl: value.ticketUrl ? url(value.ticketUrl) : undefined,
    verifiedAt: now.toISOString().slice(0, 10), translatedLanguages: [...translatedLanguages], image, organizer,
  };
}

export function mergeEvents(seed: readonly ChisinauEvent[], state: EventState) {
  const result = new Map(seed.map(event => [event.slug, event]));
  for (const [slug, event] of Object.entries(state.overrides)) {
    if (event) result.set(slug, event); else result.delete(slug);
  }
  return [...result.values()].sort((a, b) => a.startDate.localeCompare(b.startDate) || a.slug.localeCompare(b.slug));
}

export function validateEventImport(input: unknown, now = new Date()) {
  if (!Array.isArray(input) || !input.length || input.length > 100) throw new Error("Импорт: от 1 до 100 событий за один запрос");
  return input.map(event => validateEvent(event, now));
}

export function fingerprint(event: ChisinauEvent) {
  // Verification dates are observations, not changes to event content.
  function canonical(value: unknown): unknown {
    if (Array.isArray(value)) return value.map(canonical);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).filter(([, value]) => value !== undefined).sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => [key, canonical(value)]));
    return value;
  }
  return createHash("sha256").update(JSON.stringify(canonical({ ...event, verifiedAt: "" }))).digest("hex");
}

export function queueCandidates(state: EventState, candidates: ChisinauEvent[], published: readonly ChisinauEvent[], now: string) {
  let added = 0;
  const known = new Set([...state.queue.map(item => item.fingerprint), ...state.rejected, ...published.map(fingerprint)]);
  for (const event of candidates) {
    const hash = fingerprint(event);
    if (known.has(hash)) continue;
    if (state.queue.some(item => item.event.slug !== event.slug && sameOccurrence(item.event, event))
      || published.some(item => item.slug !== event.slug && sameOccurrence(item, event))) continue;
    if (state.queue.length >= 1000) throw new Error("Очередь заполнена (1000)");
    state.queue.push({ fingerprint: hash, event, receivedAt: now });
    known.add(hash); added++;
  }
  return added;
}

export function sameOccurrence(a: ChisinauEvent, b: ChisinauEvent) {
  const normalize = (text: string) => text.toLocaleLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
  return a.startDate === b.startDate && normalize(a.title.ru) === normalize(b.title.ru) && normalize(a.venue.ru) === normalize(b.venue.ru);
}

export function addEventLog(state: EventState, level: EventLog["level"], message: string, at = new Date().toISOString()) {
  state.logs = [...state.logs, { at, level, message }].slice(-200);
}
