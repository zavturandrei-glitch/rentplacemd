"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type ApartmentOption = {
  id: number;
  label: string;
  price: number;
  guests: number;
};

type AvailabilityRecord = {
  apartmentId: string;
  bookedDates: string[];
};

type SessionState = "checking" | "locked" | "ready";

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
const todayKey = formatDate(new Date());

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

  return year + "-" + month + "-" + day;
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

export default function AdminAvailabilityManager({ apartments }: { apartments: ApartmentOption[] }) {
  const [sessionState, setSessionState] = useState<SessionState>("checking");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [selectedApartmentId, setSelectedApartmentId] = useState(String(apartments[0]?.id ?? ""));
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(new Date()));
  const [records, setRecords] = useState<AvailabilityRecord[]>([]);
  const [message, setMessage] = useState("");
  const [savingDate, setSavingDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectedApartment = apartments.find((apartment) => String(apartment.id) === selectedApartmentId);
  const selectedRecord = records.find((record) => record.apartmentId === selectedApartmentId) ?? {
    apartmentId: selectedApartmentId,
    bookedDates: [],
  };
  const bookedDateSet = useMemo(() => new Set(selectedRecord.bookedDates), [selectedRecord.bookedDates]);
  const calendarDays = useMemo(() => getCalendarDays(visibleMonth), [visibleMonth]);
  const monthLabel = monthNames[visibleMonth.getMonth()] + " " + visibleMonth.getFullYear();
  const visibleBookedCount = calendarDays.filter((day) => day.getMonth() === visibleMonth.getMonth() && bookedDateSet.has(formatDate(day))).length;

  useEffect(() => {
    async function checkSession() {
      const response = await fetch("/api/admin/session", { cache: "no-store" });
      const data = (await response.json()) as { authenticated: boolean; configured: boolean };

      if (!data.configured) {
        setAuthError("ADMIN_PASSWORD не задан. Добавьте пароль в переменные окружения проекта.");
      }

      setSessionState(data.authenticated ? "ready" : "locked");
      if (data.authenticated) {
        await loadAvailability();
      }
    }

    void checkSession();
  }, []);

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError("");

    const response = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setAuthError(data?.error ?? "Не удалось войти.");
      return;
    }

    setPassword("");
    setSessionState("ready");
    await loadAvailability();
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    setSessionState("locked");
    setRecords([]);
  }

  async function loadAvailability() {
    setIsLoading(true);
    setMessage("");

    const response = await fetch("/api/admin/availability", { cache: "no-store" });
    if (!response.ok) {
      setMessage("Не удалось загрузить занятость. Проверьте вход администратора.");
      setIsLoading(false);
      return;
    }

    const data = (await response.json()) as { records: AvailabilityRecord[] };
    setRecords(data.records);
    setIsLoading(false);
  }

  async function toggleDate(date: string) {
    if (savingDate) {
      return;
    }

    const nextStatus = bookedDateSet.has(date) ? "free" : "booked";
    setSavingDate(date);
    setMessage(nextStatus === "booked" ? "Ставлю дату как занятую..." : "Возвращаю дату в свободные...");

    const response = await fetch("/api/admin/availability", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apartmentId: selectedApartmentId, date, status: nextStatus }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setMessage(data?.error ?? "Не удалось сохранить дату.");
      setSavingDate(null);
      return;
    }

    const updatedRecord = (await response.json()) as AvailabilityRecord;
    setRecords((current) => {
      const exists = current.some((record) => record.apartmentId === updatedRecord.apartmentId);
      if (!exists) {
        return [...current, updatedRecord];
      }

      return current.map((record) => (record.apartmentId === updatedRecord.apartmentId ? updatedRecord : record));
    });
    setMessage(nextStatus === "booked" ? "Дата отмечена как занятая." : "Дата снова свободна.");
    setSavingDate(null);
  }

  if (sessionState === "checking") {
    return <AdminShell><p className="rounded-2xl bg-white p-5 text-sm font-black text-[#07111f] shadow-xl">Проверяю доступ...</p></AdminShell>;
  }

  if (sessionState === "locked") {
    return (
      <AdminShell>
        <form onSubmit={login} className="mx-auto max-w-md rounded-[24px] bg-white p-5 shadow-2xl shadow-black/10 sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#d4146f]">Закрытый доступ</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-[#07111f]">Календарь занятости</h1>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">Войдите с админ-паролем, чтобы вручную отмечать даты как занятые или свободные.</p>
          <label className="mt-6 block text-sm font-black text-[#07111f]" htmlFor="admin-password">Пароль администратора</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-[#fffaf0] px-4 text-base font-bold text-[#07111f] outline-none transition focus:border-[#d4146f] focus:ring-4 focus:ring-[#d4146f]/10"
            autoComplete="current-password"
          />
          {authError ? <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-black leading-5 text-red-700">{authError}</p> : null}
          <button type="submit" className="mt-5 h-12 w-full rounded-2xl bg-[#d4146f] px-5 text-base font-black text-white shadow-lg shadow-pink-700/20 transition hover:-translate-y-0.5 hover:brightness-110">Войти</button>
        </form>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#d4146f]">Админ-календарь</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[#07111f] sm:text-5xl">Управление занятостью</h1>
          <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-600 sm:text-base">Выберите квартиру и нажимайте на даты. Красный цвет означает занято, зелёный — свободно. Изменения сохраняются сразу.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={loadAvailability} className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#07111f] shadow-lg shadow-black/5 transition hover:-translate-y-0.5">Обновить</button>
          <button type="button" onClick={logout} className="rounded-2xl bg-[#07111f] px-5 py-3 text-sm font-black text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5">Выйти</button>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-[24px] bg-white p-4 shadow-2xl shadow-black/10 sm:p-5 lg:sticky lg:top-6 lg:h-fit">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Квартиры</p>
          <div className="mt-4 grid gap-2">
            {apartments.map((apartment) => {
              const active = String(apartment.id) === selectedApartmentId;
              const bookedCount = records.find((record) => record.apartmentId === String(apartment.id))?.bookedDates.length ?? 0;

              return (
                <button
                  key={apartment.id}
                  type="button"
                  onClick={() => setSelectedApartmentId(String(apartment.id))}
                  className={[
                    "rounded-2xl px-4 py-3 text-left transition",
                    active ? "bg-[#07111f] text-white shadow-lg shadow-black/15" : "bg-[#fffaf0] text-[#07111f] hover:bg-[#f4f1ee]",
                  ].join(" ")}
                >
                  <span className="block text-base font-black">ID {apartment.id}</span>
                  <span className={active ? "mt-1 block text-xs font-bold text-white/70" : "mt-1 block text-xs font-bold text-slate-500"}>{apartment.guests} гостей • {apartment.price} лей • занято {bookedCount}</span>
                </button>
              );
            })}
          </div>
          <Link href="/" className="mt-5 block rounded-2xl border border-[#d4146f]/15 px-4 py-3 text-center text-sm font-black text-[#d4146f] transition hover:bg-[#fffaf0]">На сайт</Link>
        </aside>

        <section className="rounded-[24px] bg-white p-4 shadow-2xl shadow-black/10 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#d4146f]">ID {selectedApartment?.id}</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[#07111f] sm:text-4xl">{selectedApartment?.label}</h2>
              <p className="mt-2 text-sm font-bold text-slate-500">Занятых дат в месяце: {visibleBookedCount}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-2xl bg-[#fffaf0] p-1.5 shadow-inner ring-1 ring-black/5">
              <button type="button" onClick={() => setVisibleMonth((month) => addMonths(month, -1))} className="flex h-10 w-10 items-center justify-center rounded-xl text-xl font-black text-[#07111f] transition hover:bg-white" aria-label="Предыдущий месяц">‹</button>
              <p className="min-w-[132px] text-center text-sm font-black text-[#07111f] sm:min-w-[150px] sm:text-base">{monthLabel}</p>
              <button type="button" onClick={() => setVisibleMonth((month) => addMonths(month, 1))} className="flex h-10 w-10 items-center justify-center rounded-xl text-xl font-black text-[#07111f] transition hover:bg-white" aria-label="Следующий месяц">›</button>
            </div>
          </div>

          <div className="mt-5 rounded-[22px] bg-[#fffaf0] p-2 shadow-inner ring-1 ring-black/5 sm:p-4">
            <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-black uppercase tracking-[0.12em] text-slate-400 sm:gap-2 sm:text-xs">
              {weekdays.map((day) => <div key={day} className="py-1">{day}</div>)}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-1.5 sm:gap-2">
              {calendarDays.map((day) => {
                const date = formatDate(day);
                const currentMonth = day.getMonth() === visibleMonth.getMonth();
                const booked = bookedDateSet.has(date);
                const saving = savingDate === date;
                const today = date === todayKey;

                return (
                  <button
                    key={date}
                    type="button"
                    onClick={() => toggleDate(date)}
                    disabled={Boolean(savingDate)}
                    aria-label={date + (booked ? " занято" : " свободно")}
                    className={[
                      "relative flex aspect-square min-h-10 items-center justify-center rounded-xl text-sm font-black transition sm:min-h-12 sm:text-base",
                      currentMonth ? "opacity-100" : "opacity-40",
                      booked ? "bg-red-500 text-white shadow-lg shadow-red-500/20" : "bg-emerald-500 text-white shadow-lg shadow-emerald-500/15",
                      saving ? "scale-95 opacity-70" : "hover:-translate-y-0.5 hover:brightness-110",
                      today ? "ring-2 ring-[#ffd21f] ring-offset-2 ring-offset-white" : "",
                    ].join(" ")}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-black text-slate-600 sm:text-sm">
            <Legend color="bg-emerald-500" label="Свободно" />
            <Legend color="bg-red-500" label="Занято" />
            <Legend color="bg-white ring-2 ring-[#ffd21f]" label="Сегодня" />
          </div>

          <p className="mt-4 rounded-2xl bg-[#fffaf0] px-4 py-3 text-sm font-black leading-6 text-[#07111f] shadow-inner ring-1 ring-black/5">{isLoading ? "Загружаю календарь..." : message || "Клик по дате сразу меняет статус."}</p>
          <p className="mt-3 text-xs font-bold leading-5 text-slate-500">Чтобы календарь работал на сайте, добавьте в Vercel DATABASE_URL от Neon PostgreSQL. Альтернатива: SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY. Локально календарь сохраняет изменения в JSON-файл.</p>
        </section>
      </div>
    </AdminShell>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-[#fffaf0] px-4 py-6 text-[#07111f] sm:px-6 lg:px-10"><div className="mx-auto max-w-[1400px]">{children}</div></main>;
}

function Legend({ color, label }: { color: string; label: string }) {
  return <span className="inline-flex items-center gap-2"><span className={["h-3.5 w-3.5 rounded-md", color].join(" ")} />{label}</span>;
}
