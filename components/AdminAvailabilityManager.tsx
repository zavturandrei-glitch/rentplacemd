"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ResponsiveImage from "@/components/ResponsiveImage";

type ApartmentOption = {
  id: number;
  label: string;
  price: number;
  guests: number;
  image: string;
};

type AvailabilityRecord = {
  apartmentId: string;
  bookedDates: string[];
};

type AvailabilityStatus = "booked" | "free";
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

function changeKey(apartmentId: string, date: string) {
  return apartmentId + "|" + date;
}

function splitChangeKey(key: string) {
  const [apartmentId, date] = key.split("|");
  return { apartmentId, date };
}

export default function AdminAvailabilityManager({ apartments }: { apartments: ApartmentOption[] }) {
  const [sessionState, setSessionState] = useState<SessionState>("checking");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [selectedApartmentId, setSelectedApartmentId] = useState(String(apartments[0]?.id ?? ""));
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(new Date()));
  const [records, setRecords] = useState<AvailabilityRecord[]>([]);
  const [pendingChanges, setPendingChanges] = useState<Record<string, AvailabilityStatus>>({});
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectedApartment = apartments.find((apartment) => String(apartment.id) === selectedApartmentId);
  const selectedRecord = records.find((record) => record.apartmentId === selectedApartmentId) ?? {
    apartmentId: selectedApartmentId,
    bookedDates: [],
  };
  const originalBookedDateSet = useMemo(() => new Set(selectedRecord.bookedDates), [selectedRecord.bookedDates]);
  const effectiveBookedDateSet = useMemo(() => {
    const dates = new Set(selectedRecord.bookedDates);

    Object.entries(pendingChanges).forEach(([key, status]) => {
      const { apartmentId, date } = splitChangeKey(key);
      if (apartmentId !== selectedApartmentId) {
        return;
      }

      if (status === "booked") {
        dates.add(date);
      } else {
        dates.delete(date);
      }
    });

    return dates;
  }, [pendingChanges, selectedApartmentId, selectedRecord.bookedDates]);
  const calendarDays = useMemo(() => getCalendarDays(visibleMonth), [visibleMonth]);
  const monthLabel = monthNames[visibleMonth.getMonth()] + " " + visibleMonth.getFullYear();
  const pendingCount = Object.keys(pendingChanges).length;
  const selectedApartmentPendingCount = Object.keys(pendingChanges).filter((key) => key.startsWith(selectedApartmentId + "|")).length;
  const visibleBookedCount = calendarDays.filter((day) => day.getMonth() === visibleMonth.getMonth() && effectiveBookedDateSet.has(formatDate(day))).length;

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
    setPendingChanges({});
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
    setPendingChanges({});
    setIsLoading(false);
  }

  function toggleDate(date: string) {
    if (isSaving) {
      return;
    }

    const currentlyBooked = effectiveBookedDateSet.has(date);
    const originallyBooked = originalBookedDateSet.has(date);
    const nextStatus: AvailabilityStatus = currentlyBooked ? "free" : "booked";
    const key = changeKey(selectedApartmentId, date);

    setSelectedDate(date);
    setPendingChanges((current) => {
      const next = { ...current };
      if ((nextStatus === "booked") === originallyBooked) {
        delete next[key];
      } else {
        next[key] = nextStatus;
      }
      return next;
    });
    setMessage("Есть несохраненные изменения. Нажмите Сохранить.");
  }

  function updateRecord(updatedRecord: AvailabilityRecord) {
    setRecords((current) => {
      const exists = current.some((record) => record.apartmentId === updatedRecord.apartmentId);
      if (!exists) {
        return [...current, updatedRecord];
      }

      return current.map((record) => (record.apartmentId === updatedRecord.apartmentId ? updatedRecord : record));
    });
  }

  async function saveChanges() {
    const changes = Object.entries(pendingChanges);
    if (!changes.length || isSaving) {
      return;
    }

    setIsSaving(true);
    setMessage("Сохраняю изменения...");

    try {
      for (const [key, status] of changes) {
        const { apartmentId, date } = splitChangeKey(key);
        const response = await fetch("/api/admin/availability", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ apartmentId, date, status }),
        });

        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as { error?: string } | null;
          throw new Error(data?.error ?? "Не удалось сохранить изменения.");
        }

        const updatedRecord = (await response.json()) as AvailabilityRecord;
        updateRecord(updatedRecord);
      }

      setPendingChanges({});
      setMessage("Сохранено");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Не удалось сохранить изменения.");
    } finally {
      setIsSaving(false);
    }
  }

  if (sessionState === "checking") {
    return (
      <AdminShell>
        <p className="rounded-2xl bg-white p-5 text-sm font-black text-[#07111f] shadow-xl">Проверяю доступ...</p>
      </AdminShell>
    );
  }

  if (sessionState === "locked") {
    return (
      <AdminShell>
        <form onSubmit={login} className="mx-auto max-w-md rounded-[24px] bg-white p-5 shadow-2xl shadow-black/10 sm:p-8">
          <p className="text-sm font-black uppercase text-[#d4146f]">Закрытый доступ</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-[#07111f]">Календарь занятости RentPlaceMD</h1>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">Войдите с админ-паролем, чтобы вручную отмечать даты как занятые или свободные.</p>
          <label className="mt-6 block text-sm font-black text-[#07111f]" htmlFor="admin-password">Пароль администратора</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 h-14 w-full rounded-2xl border border-slate-200 bg-[#fffaf0] px-4 text-base font-bold text-[#07111f] outline-none transition focus:border-[#d4146f] focus:ring-4 focus:ring-[#d4146f]/10"
            autoComplete="current-password"
          />
          {authError ? <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-black leading-5 text-red-700">{authError}</p> : null}
          <button type="submit" className="mt-5 h-14 w-full rounded-2xl bg-[#d4146f] px-5 text-base font-black text-white shadow-lg shadow-pink-700/20 transition hover:-translate-y-0.5 hover:brightness-110">Войти</button>
        </form>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase text-[#d4146f]">Админ-календарь</p>
          <h1 className="mt-2 text-[28px] font-black leading-tight tracking-tight text-[#07111f] sm:text-5xl">Календарь занятости RentPlaceMD</h1>
          <p className="mt-3 max-w-2xl rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-700 shadow-sm sm:text-base">Нажмите на дату, чтобы изменить статус. После изменений нажмите Сохранить.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={loadAvailability} className="min-h-12 rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#07111f] shadow-lg shadow-black/5 transition hover:-translate-y-0.5">Обновить</button>
          <button type="button" onClick={logout} className="min-h-12 rounded-2xl bg-[#07111f] px-5 py-3 text-sm font-black text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5">Выйти</button>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="rounded-[24px] bg-white p-4 shadow-2xl shadow-black/10 sm:p-5 lg:sticky lg:top-6 lg:h-fit">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-black uppercase text-slate-500">Выберите квартиру</p>
            <Link href="/" className="rounded-xl border border-[#d4146f]/15 px-3 py-2 text-xs font-black text-[#d4146f] transition hover:bg-[#fffaf0]">На сайт</Link>
          </div>

          <label className="mt-4 block text-xs font-black uppercase text-slate-500 sm:hidden" htmlFor="apartment-select">Квартира</label>
          <select
            id="apartment-select"
            value={selectedApartmentId}
            onChange={(event) => setSelectedApartmentId(event.target.value)}
            className="mt-2 h-14 w-full rounded-2xl border border-slate-200 bg-[#fffaf0] px-4 text-base font-black text-[#07111f] outline-none focus:border-[#d4146f] focus:ring-4 focus:ring-[#d4146f]/10 sm:hidden"
          >
            {apartments.map((apartment) => (
              <option key={apartment.id} value={apartment.id}>ID {apartment.id} - {apartment.label}, до {apartment.guests} гостей</option>
            ))}
          </select>

          <div className="mt-4 flex snap-x gap-3 overflow-x-auto pb-2 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible lg:grid-cols-1">
            {apartments.map((apartment) => {
              const active = String(apartment.id) === selectedApartmentId;
              const bookedCount = records.find((record) => record.apartmentId === String(apartment.id))?.bookedDates.length ?? 0;
              const apartmentPendingCount = Object.keys(pendingChanges).filter((key) => key.startsWith(String(apartment.id) + "|")).length;

              return (
                <button
                  key={apartment.id}
                  type="button"
                  onClick={() => setSelectedApartmentId(String(apartment.id))}
                  className={[
                    "min-w-[210px] snap-start overflow-hidden rounded-2xl border text-left transition sm:min-w-0",
                    active ? "border-[#d4146f] bg-white shadow-lg shadow-pink-700/15 ring-2 ring-[#d4146f]" : "border-slate-200 bg-white shadow-sm hover:border-[#d4146f]/40",
                  ].join(" ")}
                >
                  <span className="relative block h-24 overflow-hidden bg-slate-100">
                    <ResponsiveImage src={apartment.image} alt={"Квартира ID " + apartment.id} className="h-full w-full" sizes="210px" loading="lazy" withWatermark />
                    <span className="absolute left-2 top-2 rounded-full bg-[#ffd21f] px-3 py-1 text-xs font-black text-[#07111f]">ID {apartment.id}</span>
                  </span>
                  <span className="block p-3">
                    <span className="block text-base font-black text-[#07111f]">{apartment.label}</span>
                    <span className="mt-1 block text-xs font-bold text-slate-500">до {apartment.guests} гостей • {apartment.price} лей</span>
                    <span className="mt-2 flex flex-wrap gap-2 text-[11px] font-black">
                      <span className="rounded-full bg-red-50 px-2 py-1 text-red-700">занято {bookedCount}</span>
                      {apartmentPendingCount ? <span className="rounded-full bg-[#fff0f7] px-2 py-1 text-[#d4146f]">изменений {apartmentPendingCount}</span> : null}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="rounded-[24px] bg-white p-3 shadow-2xl shadow-black/10 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase text-[#d4146f]">ID {selectedApartment?.id}</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-[#07111f] sm:text-4xl">{selectedApartment?.label}</h2>
              <p className="mt-2 text-sm font-bold text-slate-500">Занятых дат в месяце: {visibleBookedCount}</p>
              {selectedApartmentPendingCount ? <p className="mt-1 text-sm font-black text-[#d4146f]">Несохраненных изменений: {selectedApartmentPendingCount}</p> : null}
            </div>
            <div className="flex shrink-0 items-center justify-between gap-2 rounded-2xl bg-[#fffaf0] p-1.5 shadow-inner ring-1 ring-black/5 sm:justify-start">
              <button type="button" onClick={() => setVisibleMonth((month) => addMonths(month, -1))} className="flex h-12 w-12 items-center justify-center rounded-xl text-3xl font-black text-[#07111f] transition hover:bg-white" aria-label="Предыдущий месяц">‹</button>
              <p className="min-w-[150px] text-center text-base font-black text-[#07111f] sm:min-w-[170px] sm:text-lg">{monthLabel}</p>
              <button type="button" onClick={() => setVisibleMonth((month) => addMonths(month, 1))} className="flex h-12 w-12 items-center justify-center rounded-xl text-3xl font-black text-[#07111f] transition hover:bg-white" aria-label="Следующий месяц">›</button>
            </div>
          </div>

          <div className="mt-5 rounded-[22px] bg-[#fffaf0] p-2 shadow-inner ring-1 ring-black/5 sm:p-4">
            <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-black uppercase text-slate-500 sm:gap-2 sm:text-sm">
              {weekdays.map((day) => <div key={day} className="py-1.5">{day}</div>)}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-1.5 sm:gap-2">
              {calendarDays.map((day) => {
                const date = formatDate(day);
                const currentMonth = day.getMonth() === visibleMonth.getMonth();
                const booked = effectiveBookedDateSet.has(date);
                const pending = Boolean(pendingChanges[changeKey(selectedApartmentId, date)]);
                const selected = date === selectedDate;
                const today = date === todayKey;

                return (
                  <button
                    key={date}
                    type="button"
                    onClick={() => toggleDate(date)}
                    disabled={isSaving}
                    aria-pressed={booked}
                    aria-label={date + (booked ? " занято" : " свободно")}
                    className={[
                      "relative flex aspect-square min-h-12 items-center justify-center rounded-xl text-base font-black transition sm:min-h-14 sm:text-lg",
                      currentMonth ? "opacity-100" : "opacity-45",
                      booked ? "bg-[#d4144f] text-white shadow-lg shadow-red-500/20" : "bg-emerald-500 text-white shadow-lg shadow-emerald-500/15",
                      selected ? "ring-4 ring-[#07111f] ring-offset-2 ring-offset-white" : "",
                      today && !selected ? "ring-2 ring-[#ffd21f] ring-offset-2 ring-offset-white" : "",
                      pending ? "after:absolute after:right-1 after:top-1 after:h-2.5 after:w-2.5 after:rounded-full after:bg-[#ffd21f]" : "",
                      isSaving ? "opacity-70" : "hover:-translate-y-0.5 hover:brightness-110",
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
            <Legend color="bg-[#d4144f]" label="Занято" />
            <Legend color="bg-white ring-4 ring-[#07111f]" label="Выбранная дата" />
            <Legend color="bg-[#ffd21f]" label="Несохранено" />
          </div>

          <p className="mt-4 rounded-2xl bg-[#fffaf0] px-4 py-3 text-sm font-black leading-6 text-[#07111f] shadow-inner ring-1 ring-black/5" aria-live="polite">{isLoading ? "Загружаю календарь..." : message || "Нажмите на дату, затем сохраните изменения."}</p>
          <p className="mt-3 text-xs font-bold leading-5 text-slate-500">Календарь сохраняет изменения через текущий API. База данных и формат данных не менялись.</p>

          <SaveButton pendingCount={pendingCount} isSaving={isSaving} onClick={saveChanges} mobile={false} />
        </section>
      </div>

      <SaveButton pendingCount={pendingCount} isSaving={isSaving} onClick={saveChanges} mobile />
    </AdminShell>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-[#fffaf0] px-3 pb-28 pt-5 text-[#07111f] sm:px-6 sm:pb-6 lg:px-10"><div className="mx-auto max-w-[1400px]">{children}</div></main>;
}

function SaveButton({ pendingCount, isSaving, onClick, mobile }: { pendingCount: number; isSaving: boolean; onClick: () => void; mobile: boolean }) {
  const disabled = pendingCount === 0 || isSaving;

  return (
    <div className={mobile ? "fixed inset-x-0 bottom-0 z-30 border-t border-black/10 bg-white/95 p-3 shadow-2xl shadow-black/20 backdrop-blur sm:hidden" : "mt-5 hidden sm:block"}>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={[
          "h-16 w-full rounded-2xl px-5 text-lg font-black text-white shadow-lg transition",
          disabled ? "bg-slate-300 text-slate-600 shadow-none" : "bg-[#d4146f] shadow-pink-700/25 hover:-translate-y-0.5 hover:brightness-110",
        ].join(" ")}
      >
        {isSaving ? "Сохраняю..." : pendingCount ? "Сохранить" : "Сохранить"}
      </button>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return <span className="inline-flex items-center gap-2"><span className={["h-3.5 w-3.5 rounded-md", color].join(" ")} />{label}</span>;
}
