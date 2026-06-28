"use client";

import { useMemo, useState } from "react";

type AvailabilityCalendarProps = {
  apartmentId: string | number;
  bookedDates: string[];
};

const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
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

export default function AvailabilityCalendar({
  apartmentId,
  bookedDates,
}: AvailabilityCalendarProps) {
  const today = useMemo(() => new Date(), []);
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(today));
  const bookedDateSet = useMemo(() => new Set(bookedDates), [bookedDates]);
  const calendarDays = useMemo(
    () => getCalendarDays(visibleMonth),
    [visibleMonth],
  );
  const monthLabel = `${monthNames[visibleMonth.getMonth()]} ${visibleMonth.getFullYear()}`;
  const whatsappText = `Здравствуйте! Хочу уточнить свободные даты по квартире ID ${apartmentId} на RentPlaceMD.`;
  const whatsappHref =
    "https://wa.me/37369990190?text=" + encodeURIComponent(whatsappText);

  return (
    <section
      className="mt-7 rounded-[24px] border border-[#d4146f]/10 bg-[#fffaf0] p-4 shadow-xl shadow-black/5 sm:mt-8 sm:rounded-[26px] sm:p-5"
      aria-labelledby={`availability-${apartmentId}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d4146f]">
            Даты
          </p>
          <h3
            id={`availability-${apartmentId}`}
            className="mt-2 text-2xl font-black tracking-tight text-[#07111f] sm:text-3xl"
          >
            Календарь занятости
          </h3>
          <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-slate-600 sm:text-base">
            Проверьте свободные даты и напишите нам для бронирования.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-2xl bg-white p-1.5 shadow-inner ring-1 ring-black/5">
          <button
            type="button"
            onClick={() => setVisibleMonth((month) => addMonths(month, -1))}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-xl font-black text-[#07111f] transition hover:bg-[#fffaf0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f]"
            aria-label="Предыдущий месяц"
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
            aria-label="Следующий месяц"
          >
            ›
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-[20px] bg-white p-3 shadow-inner ring-1 ring-black/5 sm:p-4">
        <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-black uppercase tracking-[0.12em] text-slate-400 sm:gap-2 sm:text-xs">
          {weekdays.map((day) => (
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
            const isToday = dateKey === formatDate(today);
            const label = `${dateKey}: ${isBooked ? "занято" : "свободно"}`;

            return (
              <div
                key={dateKey}
                aria-label={label}
                className={[
                  "flex aspect-square min-h-9 items-center justify-center rounded-xl text-sm font-black transition sm:min-h-10 sm:text-base",
                  isCurrentMonth ? "text-[#07111f]" : "text-slate-300",
                  isBooked
                    ? "bg-[#d4146f]/12 text-[#9b124c] ring-1 ring-[#d4146f]/18"
                    : "bg-[#f6f1e8] text-[#07111f]/78",
                  isToday
                    ? "ring-2 ring-[#ffd21f] ring-offset-2 ring-offset-white"
                    : "",
                ].join(" ")}
              >
                {day.getDate()}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-black text-slate-600 sm:text-sm">
        <LegendItem color="bg-[#f6f1e8] ring-1 ring-black/5" label="Свободно" />
        <LegendItem color="bg-[#d4146f]/14 ring-1 ring-[#d4146f]/20" label="Занято" />
        <LegendItem color="bg-white ring-2 ring-[#ffd21f]" label="Сегодня" />
      </div>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Уточнить даты в WhatsApp для квартиры ID ${apartmentId}`}
        className="mt-5 flex min-h-12 items-center justify-center rounded-2xl bg-[#25D366] px-5 py-3 text-center text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:text-base"
      >
        Уточнить даты в WhatsApp
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
