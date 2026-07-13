"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/locales/translations";
import { getChisinauDateKey, isPastChisinauDate } from "@/lib/chisinauDate";

type AvailabilityCalendarProps = {
  apartmentId: string | number;
  bookedDates: string[];
};

const calendarCopy: Record<Language, {
  months: string[];
  weekdays: string[];
  locale: string;
  dates: string;
  title: string;
  description: string;
  refreshing: string;
  previousMonth: string;
  nextMonth: string;
  past: string;
  booked: string;
  free: string;
  today: string;
  selected: string;
  chooseDate: string;
  chosenDate: string;
  chosenRange: string;
  checkoutHint: string;
  occupiedCount: string;
  whatsappButton: string;
  whatsappMessage: string;
  oneDate: string;
  dateRange: string;
}> = {
  ru: {
    months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    locale: "ru-RU", dates: "Даты", title: "Календарь занятости", description: "Проверьте свободные даты и напишите нам для бронирования.", refreshing: "Обновляем календарь...", previousMonth: "Предыдущий месяц", nextMonth: "Следующий месяц", past: "прошедшая дата", booked: "занято", free: "свободно", today: "Сегодня", selected: "Выбрано", chooseDate: "Выберите свободную дату или диапазон дат.", chosenDate: "Выбрана дата: {start}.", chosenRange: "Вы выбрали: {start} - {end}.", checkoutHint: "Можно выбрать дату выезда.", occupiedCount: "Занятых дат в этом месяце: {count}.", whatsappButton: "Уточнить даты в WhatsApp", whatsappMessage: "Здравствуйте! Хочу уточнить свободные даты по квартире ID {id} на RentPlaceMD.", oneDate: " Дата: {start}.", dateRange: " Даты: {start} - {end}.",
  },
  ro: {
    months: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
    weekdays: ["Lu", "Ma", "Mi", "Jo", "Vi", "Sâ", "Du"],
    locale: "ro-RO", dates: "Date", title: "Calendarul disponibilității", description: "Verificați datele libere și scrieți-ne pentru rezervare.", refreshing: "Actualizăm calendarul...", previousMonth: "Luna precedentă", nextMonth: "Luna următoare", past: "dată trecută", booked: "ocupat", free: "liber", today: "Astăzi", selected: "Selectat", chooseDate: "Alegeți o dată liberă sau un interval.", chosenDate: "Data selectată: {start}.", chosenRange: "Ați selectat: {start} - {end}.", checkoutHint: "Puteți alege data plecării.", occupiedCount: "Date ocupate în această lună: {count}.", whatsappButton: "Verifică datele pe WhatsApp", whatsappMessage: "Bună ziua! Doresc să verific datele libere pentru apartamentul ID {id} pe RentPlaceMD.", oneDate: " Data: {start}.", dateRange: " Date: {start} - {end}.",
  },
  en: {
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    locale: "en-GB", dates: "Dates", title: "Availability calendar", description: "Check available dates and message us to book.", refreshing: "Updating calendar...", previousMonth: "Previous month", nextMonth: "Next month", past: "past date", booked: "booked", free: "available", today: "Today", selected: "Selected", chooseDate: "Choose an available date or date range.", chosenDate: "Selected date: {start}.", chosenRange: "You selected: {start} - {end}.", checkoutHint: "You can now choose a check-out date.", occupiedCount: "Booked dates this month: {count}.", whatsappButton: "Check dates on WhatsApp", whatsappMessage: "Hello! I would like to check available dates for apartment ID {id} on RentPlaceMD.", oneDate: " Date: {start}.", dateRange: " Dates: {start} - {end}.",
  },
  uk: {
    months: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
    weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
    locale: "uk-UA", dates: "Дати", title: "Календар зайнятості", description: "Перевірте вільні дати та напишіть нам для бронювання.", refreshing: "Оновлюємо календар...", previousMonth: "Попередній місяць", nextMonth: "Наступний місяць", past: "минула дата", booked: "зайнято", free: "вільно", today: "Сьогодні", selected: "Вибрано", chooseDate: "Оберіть вільну дату або діапазон дат.", chosenDate: "Вибрана дата: {start}.", chosenRange: "Ви вибрали: {start} - {end}.", checkoutHint: "Можна обрати дату виїзду.", occupiedCount: "Зайнятих дат цього місяця: {count}.", whatsappButton: "Уточнити дати у WhatsApp", whatsappMessage: "Добрий день! Хочу уточнити вільні дати для квартири ID {id} на RentPlaceMD.", oneDate: " Дата: {start}.", dateRange: " Дати: {start} - {end}.",
  },
  cs: {
    months: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
    weekdays: ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"],
    locale: "cs-CZ", dates: "Termíny", title: "Kalendář obsazenosti", description: "Zkontrolujte volné termíny a napište nám kvůli rezervaci.", refreshing: "Aktualizujeme kalendář...", previousMonth: "Předchozí měsíc", nextMonth: "Další měsíc", past: "minulý termín", booked: "obsazeno", free: "volno", today: "Dnes", selected: "Vybráno", chooseDate: "Vyberte volný termín nebo rozsah termínů.", chosenDate: "Vybraný termín: {start}.", chosenRange: "Vybrali jste: {start} - {end}.", checkoutHint: "Nyní můžete vybrat datum odjezdu.", occupiedCount: "Obsazených termínů v tomto měsíci: {count}.", whatsappButton: "Ověřit termíny přes WhatsApp", whatsappMessage: "Dobrý den! Chci ověřit volné termíny pro apartmán ID {id} na RentPlaceMD.", oneDate: " Termín: {start}.", dateRange: " Termíny: {start} - {end}.",
  },
};
const todayKey = getChisinauDateKey();

function formatCopy(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function parseDateKey(dateKey: string) {
  const parts = dateKey.split("-").map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return year + "-" + month + "-" + day;
}

function formatShortDate(dateKey: string, locale: string) {
  const date = parseDateKey(dateKey);
  return date.toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function getCalendarDays(monthDate: Date) {
  const firstDay = startOfMonth(monthDate);
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const gridStart = new Date(firstDay);
  gridStart.setDate(firstDay.getDate() - mondayOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(gridStart);
    day.setDate(gridStart.getDate() + index);
    return day;
  });
}

function getDateRange(startKey: string, endKey: string) {
  const start = parseDateKey(startKey);
  const end = parseDateKey(endKey);
  const dates: string[] = [];
  const cursor = new Date(start);

  while (cursor <= end) {
    dates.push(formatDate(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

function getInitialMonth(bookedDates: string[]) {
  const today = new Date();
  const nextBookedDate = bookedDates
    .filter((dateKey) => dateKey >= todayKey)
    .sort()[0];

  return nextBookedDate ? startOfMonth(parseDateKey(nextBookedDate)) : startOfMonth(today);
}

export default function AvailabilityCalendar({
  apartmentId,
  bookedDates,
}: AvailabilityCalendarProps) {
  const { language } = useLanguage();
  const text = calendarCopy[language];
  const [visibleMonth, setVisibleMonth] = useState(() => getInitialMonth(bookedDates));
  const [selectedStart, setSelectedStart] = useState<string | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<string | null>(null);
  const [currentBookedDates, setCurrentBookedDates] = useState(bookedDates);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const bookedDateSet = useMemo(() => new Set(currentBookedDates), [currentBookedDates]);
  const calendarDays = useMemo(
    () => getCalendarDays(visibleMonth),
    [visibleMonth],
  );
  const monthLabel = text.months[visibleMonth.getMonth()] + " " + visibleMonth.getFullYear();
  const headingId = "availability-" + apartmentId;
  const selectedRange = useMemo(() => {
    if (!selectedStart) {
      return [];
    }

    return getDateRange(selectedStart, selectedEnd ?? selectedStart);
  }, [selectedEnd, selectedStart]);
  const selectedDateSet = useMemo(() => new Set(selectedRange), [selectedRange]);
  const visibleBookedCount = calendarDays.filter((day) => {
    const dateKey = formatDate(day);
    return day.getMonth() === visibleMonth.getMonth() && bookedDateSet.has(dateKey);
  }).length;

  useEffect(() => {
    let cancelled = false;

    async function refreshAvailability() {
      setIsRefreshing(true);
      try {
        const response = await fetch(`/api/availability?apartmentId=${apartmentId}`, { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { bookedDates?: string[] };
        if (!cancelled && Array.isArray(data.bookedDates)) {
          setCurrentBookedDates(data.bookedDates);
        }
      } finally {
        if (!cancelled) {
          setIsRefreshing(false);
        }
      }
    }

    void refreshAvailability();

    return () => {
      cancelled = true;
    };
  }, [apartmentId]);

  function handleDayClick(dateKey: string) {
    if (bookedDateSet.has(dateKey) || isPastChisinauDate(dateKey)) {
      return;
    }

    if (!selectedStart || selectedEnd || dateKey < selectedStart) {
      setSelectedStart(dateKey);
      setSelectedEnd(null);
      return;
    }

    const range = getDateRange(selectedStart, dateKey);
    const hasBookedDate = range.some((rangeDate) => bookedDateSet.has(rangeDate));

    if (hasBookedDate) {
      setSelectedStart(dateKey);
      setSelectedEnd(null);
      return;
    }

    setSelectedEnd(dateKey);
  }

  const selectedText = selectedStart
    ? selectedEnd
      ? formatCopy(text.chosenRange, { start: formatShortDate(selectedStart, text.locale), end: formatShortDate(selectedEnd, text.locale) })
      : formatCopy(text.chosenDate, { start: formatShortDate(selectedStart, text.locale) }) + " " + text.checkoutHint
    : text.chooseDate;
  const whatsappDates = selectedStart
    ? selectedEnd
      ? formatCopy(text.dateRange, { start: formatShortDate(selectedStart, text.locale), end: formatShortDate(selectedEnd, text.locale) })
      : formatCopy(text.oneDate, { start: formatShortDate(selectedStart, text.locale) })
    : "";
  const whatsappText = formatCopy(text.whatsappMessage, { id: apartmentId }) + whatsappDates;
  const whatsappHref =
    "https://wa.me/37369990190?text=" + encodeURIComponent(whatsappText);

  return (
    <section
      className="mt-7 rounded-[24px] border border-[#d4146f]/10 bg-[#fffaf0] p-4 shadow-xl shadow-black/5 sm:mt-8 sm:rounded-[26px] sm:p-5"
      aria-labelledby={headingId}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d4146f]">
            {text.dates}
          </p>
          <h3
            id={headingId}
            className="mt-2 text-2xl font-black tracking-tight text-[#07111f] sm:text-3xl"
          >
            {text.title}
          </h3>
          <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-slate-600 sm:text-base">
            {text.description}
            {isRefreshing ? " " + text.refreshing : ""}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-2xl bg-white p-1.5 shadow-inner ring-1 ring-black/5">
          <button
            type="button"
            onClick={() => setVisibleMonth((month) => addMonths(month, -1))}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-xl font-black text-[#07111f] transition hover:bg-[#fffaf0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f]"
            aria-label={text.previousMonth}
          >
            ‹
          </button>
          <p className="min-w-[132px] text-center text-sm font-black text-[#07111f] sm:min-w-[150px] sm:text-base">
            {monthLabel}
          </p>
          <button
            type="button"
            onClick={() => setVisibleMonth((month) => addMonths(month, 1))}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-xl font-black text-[#07111f] transition hover:bg-[#fffaf0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f]"
            aria-label={text.nextMonth}
          >
            ›
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-[20px] bg-white p-3 shadow-inner ring-1 ring-black/5 sm:p-4">
        <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-black uppercase tracking-[0.12em] text-slate-400 sm:gap-2 sm:text-xs">
          {text.weekdays.map((day) => (
            <div key={day} className="py-1">
              {day}
            </div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-1.5 sm:gap-2">
          {calendarDays.map((day) => {
            const dateKey = formatDate(day);
            const isCurrentMonth = day.getMonth() === visibleMonth.getMonth();
            const isBooked = bookedDateSet.has(dateKey);
            const isPast = isPastChisinauDate(dateKey);
            const isToday = dateKey === todayKey;
            const isSelected = selectedDateSet.has(dateKey);
            const label = dateKey + ": " + (isPast ? text.past : isBooked ? text.booked : text.free);

            return (
              <button
                key={dateKey}
                type="button"
                onClick={() => handleDayClick(dateKey)}
                disabled={isBooked || isPast}
                aria-label={label}
                aria-pressed={isSelected}
                className={[
                  "flex aspect-square min-h-9 items-center justify-center rounded-xl text-sm font-black transition sm:min-h-10 sm:text-base",
                  isCurrentMonth ? "opacity-100" : "opacity-45",
                  isPast
                    ? "cursor-not-allowed bg-slate-200 text-slate-500 opacity-55 ring-1 ring-slate-300"
                    : isBooked
                    ? "cursor-not-allowed bg-red-500/16 text-red-700 line-through ring-1 ring-red-500/25"
                    : "bg-emerald-500/14 text-emerald-800 ring-1 ring-emerald-500/18 hover:-translate-y-0.5 hover:bg-emerald-500/22",
                  isSelected
                    ? "bg-[#07111f] text-white shadow-lg shadow-black/15 hover:bg-[#07111f]"
                    : "",
                  isToday
                    ? "ring-2 ring-[#ffd21f] ring-offset-2 ring-offset-white"
                    : "",
                ].join(" ")}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-black text-slate-600 sm:text-sm">
        <LegendItem color="bg-emerald-500/20 ring-1 ring-emerald-500/25" label={text.free} />
        <LegendItem color="bg-red-500/20 ring-1 ring-red-500/25" label={text.booked} />
        <LegendItem color="bg-white ring-2 ring-[#ffd21f]" label={text.today} />
        <LegendItem color="bg-[#07111f]" label={text.selected} />
      </div>

      <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm font-black leading-6 text-[#07111f] shadow-inner ring-1 ring-black/5">
        {selectedText}{" "}
        <span className="text-slate-500">
          {formatCopy(text.occupiedCount, { count: visibleBookedCount })}
        </span>
      </p>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={text.whatsappButton + " ID " + apartmentId}
        className="mt-5 flex min-h-12 items-center justify-center rounded-2xl bg-[#25D366] px-5 py-3 text-center text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:text-base"
      >
        {text.whatsappButton}
      </a>
    </section>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={["h-3.5 w-3.5 rounded-md", color].join(" ")} />
      {label}
    </span>
  );
}
