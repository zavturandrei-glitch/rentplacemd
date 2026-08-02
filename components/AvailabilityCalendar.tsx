"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/locales/translations";
import { getChisinauDateKey, isPastChisinauDate } from "@/lib/chisinauDate";

type AvailabilityCalendarProps = {
  apartmentId: string | number;
  apartmentPath: string;
  address: string;
  bookedDates: string[];
  price: number;
};

type CalendarCopy = {
  months: string[];
  weekdays: string[];
  locale: string;
  eyebrow: string;
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
  checkIn: string;
  checkOut: string;
  chooseCheckIn: string;
  chooseCheckOut: string;
  datesSelected: string;
  rangeUnavailable: string;
  oneNight: string;
  nights: string;
  total: string;
  priceFormula: string;
  bookingButton: string;
  bookingButtonDisabled: string;
  whatsappMessage: string;
};

const calendarCopy: Record<Language, CalendarCopy> = {
  ru: {
    months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    locale: "ru-RU",
    eyebrow: "Даты проживания",
    title: "Выберите даты",
    description: "Сначала дата заезда, затем дата выезда.",
    refreshing: "Обновляем занятость…",
    previousMonth: "Предыдущий месяц",
    nextMonth: "Следующий месяц",
    past: "прошедшая дата",
    booked: "занято",
    free: "свободно",
    today: "Сегодня",
    selected: "Выбрано",
    checkIn: "Заезд",
    checkOut: "Выезд",
    chooseCheckIn: "Выберите свободную дату заезда",
    chooseCheckOut: "Теперь выберите дату выезда",
    datesSelected: "Даты выбраны. Можно отправить запрос.",
    rangeUnavailable: "В выбранном диапазоне есть занятая дата. Выберите другой выезд.",
    oneNight: "1 ночь",
    nights: "{count} ночей",
    total: "Итого",
    priceFormula: "{price} MDL × {nights}",
    bookingButton: "Уточнить бронирование",
    bookingButtonDisabled: "Сначала выберите даты",
    whatsappMessage: "Здравствуйте! Хочу уточнить доступность квартиры ID {id}, {address}, с {start} по {end} ({nights}). Итого по указанной цене: {total} MDL. Ссылка: {url}",
  },
  ro: {
    months: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
    weekdays: ["Lu", "Ma", "Mi", "Jo", "Vi", "Sâ", "Du"],
    locale: "ro-RO",
    eyebrow: "Datele sejurului",
    title: "Alegeți datele",
    description: "Mai întâi check-in, apoi check-out.",
    refreshing: "Actualizăm disponibilitatea…",
    previousMonth: "Luna precedentă",
    nextMonth: "Luna următoare",
    past: "dată trecută",
    booked: "ocupat",
    free: "liber",
    today: "Astăzi",
    selected: "Selectat",
    checkIn: "Check-in",
    checkOut: "Check-out",
    chooseCheckIn: "Alegeți o dată liberă pentru check-in",
    chooseCheckOut: "Acum alegeți data de check-out",
    datesSelected: "Datele sunt selectate. Puteți trimite solicitarea.",
    rangeUnavailable: "Intervalul conține o dată ocupată. Alegeți alt check-out.",
    oneNight: "1 noapte",
    nights: "{count} nopți",
    total: "Total",
    priceFormula: "{price} MDL × {nights}",
    bookingButton: "Solicită rezervarea",
    bookingButtonDisabled: "Alegeți mai întâi datele",
    whatsappMessage: "Bună ziua! Doresc să verific disponibilitatea apartamentului ID {id}, {address}, din {start} până în {end} ({nights}). Total la prețul afișat: {total} MDL. Link: {url}",
  },
  en: {
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    locale: "en-GB",
    eyebrow: "Stay dates",
    title: "Choose your dates",
    description: "Select check-in first, then check-out.",
    refreshing: "Updating availability…",
    previousMonth: "Previous month",
    nextMonth: "Next month",
    past: "past date",
    booked: "booked",
    free: "available",
    today: "Today",
    selected: "Selected",
    checkIn: "Check-in",
    checkOut: "Check-out",
    chooseCheckIn: "Choose an available check-in date",
    chooseCheckOut: "Now choose your check-out date",
    datesSelected: "Dates selected. You can send the request.",
    rangeUnavailable: "That range includes a booked date. Choose another check-out.",
    oneNight: "1 night",
    nights: "{count} nights",
    total: "Total",
    priceFormula: "{price} MDL × {nights}",
    bookingButton: "Request booking",
    bookingButtonDisabled: "Choose dates first",
    whatsappMessage: "Hello! I would like to check apartment ID {id}, {address}, from {start} to {end} ({nights}). Total at the displayed rate: {total} MDL. Link: {url}",
  },
  uk: {
    months: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
    weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
    locale: "uk-UA",
    eyebrow: "Дати проживання",
    title: "Оберіть дати",
    description: "Спочатку дата заїзду, потім дата виїзду.",
    refreshing: "Оновлюємо зайнятість…",
    previousMonth: "Попередній місяць",
    nextMonth: "Наступний місяць",
    past: "минула дата",
    booked: "зайнято",
    free: "вільно",
    today: "Сьогодні",
    selected: "Вибрано",
    checkIn: "Заїзд",
    checkOut: "Виїзд",
    chooseCheckIn: "Оберіть вільну дату заїзду",
    chooseCheckOut: "Тепер оберіть дату виїзду",
    datesSelected: "Дати обрано. Можна надіслати запит.",
    rangeUnavailable: "У діапазоні є зайнята дата. Оберіть інший виїзд.",
    oneNight: "1 ніч",
    nights: "{count} ночей",
    total: "Разом",
    priceFormula: "{price} MDL × {nights}",
    bookingButton: "Уточнити бронювання",
    bookingButtonDisabled: "Спочатку оберіть дати",
    whatsappMessage: "Добрий день! Хочу уточнити доступність квартири ID {id}, {address}, з {start} до {end} ({nights}). Разом за вказаною ціною: {total} MDL. Посилання: {url}",
  },
  cs: {
    months: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
    weekdays: ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"],
    locale: "cs-CZ",
    eyebrow: "Termín pobytu",
    title: "Vyberte termín",
    description: "Nejprve příjezd, potom odjezd.",
    refreshing: "Aktualizujeme obsazenost…",
    previousMonth: "Předchozí měsíc",
    nextMonth: "Další měsíc",
    past: "minulý termín",
    booked: "obsazeno",
    free: "volno",
    today: "Dnes",
    selected: "Vybráno",
    checkIn: "Příjezd",
    checkOut: "Odjezd",
    chooseCheckIn: "Vyberte volný den příjezdu",
    chooseCheckOut: "Nyní vyberte den odjezdu",
    datesSelected: "Termín je vybrán. Můžete odeslat poptávku.",
    rangeUnavailable: "Rozsah obsahuje obsazený den. Vyberte jiný odjezd.",
    oneNight: "1 noc",
    nights: "{count} nocí",
    total: "Celkem",
    priceFormula: "{price} MDL × {nights}",
    bookingButton: "Ověřit rezervaci",
    bookingButtonDisabled: "Nejprve vyberte termín",
    whatsappMessage: "Dobrý den! Chci ověřit apartmán ID {id}, {address}, od {start} do {end} ({nights}). Celkem podle uvedené ceny: {total} MDL. Odkaz: {url}",
  },
};

const todayKey = getChisinauDateKey();

function formatCopy(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(values[key] ?? ""),
  );
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
  return `${year}-${month}-${day}`;
}

function formatHumanDate(dateKey: string, locale: string) {
  return parseDateKey(dateKey).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
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

function getNightCount(startKey: string, endKey: string) {
  const milliseconds =
    parseDateKey(endKey).getTime() - parseDateKey(startKey).getTime();
  return Math.round(milliseconds / 86_400_000);
}

export default function AvailabilityCalendar({
  apartmentId,
  apartmentPath,
  address,
  bookedDates,
  price,
}: AvailabilityCalendarProps) {
  const { language } = useLanguage();
  const text = calendarCopy[language];
  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfMonth(parseDateKey(todayKey)),
  );
  const [selectedStart, setSelectedStart] = useState<string | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<string | null>(null);
  const [rangeError, setRangeError] = useState("");
  const [currentBookedDates, setCurrentBookedDates] = useState(bookedDates);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const bookedDateSet = useMemo(
    () => new Set(currentBookedDates),
    [currentBookedDates],
  );
  const calendarDays = useMemo(
    () => getCalendarDays(visibleMonth),
    [visibleMonth],
  );
  const selectedRange = useMemo(
    () =>
      selectedStart
        ? getDateRange(selectedStart, selectedEnd ?? selectedStart)
        : [],
    [selectedEnd, selectedStart],
  );
  const selectedDateSet = useMemo(
    () => new Set(selectedRange),
    [selectedRange],
  );
  const monthLabel = `${text.months[visibleMonth.getMonth()]} ${visibleMonth.getFullYear()}`;
  const headingId = `availability-${apartmentId}`;
  const currentMonth = startOfMonth(parseDateKey(todayKey));
  const canGoPrevious = visibleMonth.getTime() > currentMonth.getTime();
  const nights =
    selectedStart && selectedEnd
      ? getNightCount(selectedStart, selectedEnd)
      : 0;
  const total = nights * price;
  const nightLabel =
    nights === 1
      ? text.oneNight
      : formatCopy(text.nights, { count: nights });

  useEffect(() => {
    let cancelled = false;

    async function refreshAvailability() {
      setIsRefreshing(true);
      try {
        const response = await fetch(
          `/api/availability?apartmentId=${apartmentId}`,
          { cache: "no-store" },
        );
        if (!response.ok) return;
        const data = (await response.json()) as { bookedDates?: string[] };
        if (!cancelled && Array.isArray(data.bookedDates)) {
          setCurrentBookedDates(data.bookedDates);
        }
      } finally {
        if (!cancelled) setIsRefreshing(false);
      }
    }

    void refreshAvailability();
    return () => {
      cancelled = true;
    };
  }, [apartmentId]);

  function handleDayClick(dateKey: string) {
    if (bookedDateSet.has(dateKey) || isPastChisinauDate(dateKey)) return;
    setRangeError("");

    if (!selectedStart || selectedEnd || dateKey < selectedStart) {
      setSelectedStart(dateKey);
      setSelectedEnd(null);
      return;
    }

    if (dateKey === selectedStart) return;

    const range = getDateRange(selectedStart, dateKey);
    if (range.some((rangeDate) => bookedDateSet.has(rangeDate))) {
      setRangeError(text.rangeUnavailable);
      return;
    }

    setSelectedEnd(dateKey);
  }

  const whatsappText =
    selectedStart && selectedEnd
      ? formatCopy(text.whatsappMessage, {
          id: apartmentId,
          address,
          start: formatHumanDate(selectedStart, text.locale),
          end: formatHumanDate(selectedEnd, text.locale),
          nights: nightLabel,
          total,
          url: `https://rentplace.md${apartmentPath}`,
        })
      : "";
  const whatsappHref =
    "https://wa.me/37369990190?text=" + encodeURIComponent(whatsappText);

  return (
    <section
      className="rounded-2xl border border-[#07111f]/10 bg-white p-4 shadow-[0_12px_35px_rgba(7,17,31,0.07)] sm:p-6"
      aria-labelledby={headingId}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#d4146f]">
            {text.eyebrow}
          </p>
          <h2
            id={headingId}
            className="mt-1 text-2xl font-black tracking-tight sm:text-3xl"
          >
            {text.title}
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-600">
            {isRefreshing ? text.refreshing : text.description}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-[#07111f]/10 p-2.5 sm:p-4">
        <div className="flex items-center justify-between gap-2 px-1">
          <button
            type="button"
            onClick={() => setVisibleMonth((month) => addMonths(month, -1))}
            disabled={!canGoPrevious}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-2xl font-black transition hover:bg-[#fffaf0] disabled:cursor-not-allowed disabled:opacity-25"
            aria-label={text.previousMonth}
          >
            ‹
          </button>
          <p className="text-center text-base font-black capitalize">
            {monthLabel}
          </p>
          <button
            type="button"
            onClick={() => setVisibleMonth((month) => addMonths(month, 1))}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-2xl font-black transition hover:bg-[#fffaf0]"
            aria-label={text.nextMonth}
          >
            ›
          </button>
        </div>

        <div className="mt-2 grid grid-cols-7 text-center text-[10px] font-black uppercase tracking-[0.08em] text-slate-400 sm:text-xs">
          {text.weekdays.map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1">
          {calendarDays.map((day) => {
            const dateKey = formatDate(day);
            const isCurrentMonth = day.getMonth() === visibleMonth.getMonth();
            const isBooked = bookedDateSet.has(dateKey);
            const isPast = isPastChisinauDate(dateKey);
            const isToday = dateKey === todayKey;
            const isSelected = selectedDateSet.has(dateKey);
            const isStart = selectedStart === dateKey;
            const isEnd = selectedEnd === dateKey;
            const isRangeMiddle =
              isSelected && !isStart && !isEnd && selectedEnd !== null;
            const label = `${dateKey}: ${
              isPast ? text.past : isBooked ? text.booked : text.free
            }`;

            return (
              <button
                key={dateKey}
                type="button"
                onClick={() => handleDayClick(dateKey)}
                disabled={isBooked || isPast}
                aria-label={label}
                aria-pressed={isSelected}
                className={[
                  "relative flex min-h-11 items-center justify-center text-sm font-black transition focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#d4146f]",
                  isCurrentMonth ? "" : "opacity-35",
                  isPast
                    ? "cursor-not-allowed text-slate-300"
                    : isBooked
                      ? "cursor-not-allowed text-slate-400 line-through decoration-slate-400/70"
                      : "text-[#07111f] hover:bg-[#fff3d1]",
                  isRangeMiddle ? "bg-[#ffe8f2] text-[#8d0f48]" : "",
                  isStart || isEnd
                    ? "rounded-xl bg-[#07111f] text-white shadow-sm hover:bg-[#07111f]"
                    : "",
                  isToday && !isSelected
                    ? "after:absolute after:bottom-1 after:h-1 after:w-1 after:rounded-full after:bg-[#d4146f]"
                    : "",
                ].join(" ")}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold text-slate-500">
        <LegendItem color="border border-[#07111f]/20 bg-white" label={text.free} />
        <LegendItem color="bg-slate-200" label={text.booked} strike />
        <LegendItem color="bg-[#07111f]" label={text.selected} />
        <LegendItem color="border-2 border-[#d4146f] bg-white" label={text.today} />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-[#f7f3ed] px-3 py-3">
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
            {text.checkIn}
          </p>
          <p className="mt-1 text-sm font-black">
            {selectedStart
              ? formatHumanDate(selectedStart, text.locale)
              : "—"}
          </p>
        </div>
        <div className="rounded-xl bg-[#f7f3ed] px-3 py-3">
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
            {text.checkOut}
          </p>
          <p className="mt-1 text-sm font-black">
            {selectedEnd ? formatHumanDate(selectedEnd, text.locale) : "—"}
          </p>
        </div>
      </div>

      <p
        className={[
          "mt-3 text-sm font-bold",
          rangeError ? "text-red-700" : "text-slate-600",
        ].join(" ")}
        role={rangeError ? "alert" : undefined}
      >
        {rangeError ||
          (selectedEnd
            ? text.datesSelected
            : selectedStart
              ? text.chooseCheckOut
              : text.chooseCheckIn)}
      </p>

      {nights > 0 ? (
        <div className="mt-4 flex items-end justify-between gap-4 border-t border-[#07111f]/10 pt-4">
          <div>
            <p className="text-sm font-bold text-slate-500">
              {formatCopy(text.priceFormula, {
                price,
                nights: nightLabel,
              })}
            </p>
            <p className="mt-1 text-sm font-black">{nightLabel}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
              {text.total}
            </p>
            <p className="mt-1 text-2xl font-black text-[#d4146f]">
              {total} MDL
            </p>
          </div>
        </div>
      ) : null}

      {selectedStart && selectedEnd ? (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${text.bookingButton} ID ${apartmentId}`}
          className="mt-5 flex min-h-12 items-center justify-center rounded-xl bg-[#25D366] px-5 py-3 text-center text-sm font-black text-white shadow-sm transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
        >
          {text.bookingButton}
        </a>
      ) : (
        <button
          type="button"
          disabled
          className="mt-5 flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-xl bg-slate-200 px-5 py-3 text-sm font-black text-slate-500"
        >
          {text.bookingButtonDisabled}
        </button>
      )}
    </section>
  );
}

function LegendItem({
  color,
  label,
  strike = false,
}: {
  color: string;
  label: string;
  strike?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={["h-3 w-3 rounded", color].join(" ")} />
      <span className={strike ? "line-through" : ""}>{label}</span>
    </span>
  );
}
