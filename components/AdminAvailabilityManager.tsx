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

function getRoomLabel(label?: string) {
  if (!label) {
    return "Квартира";
  }

  return label.replace(" квартира", "").replace(" спальни", " сп.");
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

  const bookedCountByApartment = useMemo(() => {
    const counts = new Map<string, number>();
    for (const record of records) {
      counts.set(record.apartmentId, record.bookedDates.length);
    }
    return counts;
  }, [records]);
  const pendingCountByApartment = useMemo(() => {
    const counts = new Map<string, number>();
    for (const key of Object.keys(pendingChanges)) {
      const { apartmentId } = splitChangeKey(key);
      counts.set(apartmentId, (counts.get(apartmentId) ?? 0) + 1);
    }
    return counts;
  }, [pendingChanges]);
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
  const visibleBookedCount = calendarDays.filter((day) => day.getMonth() === visibleMonth.getMonth() && effectiveBookedDateSet.has(formatDate(day))).length;
  const selectedDateBooked = effectiveBookedDateSet.has(selectedDate);
  const selectedDatePending = Boolean(pendingChanges[changeKey(selectedApartmentId, selectedDate)]);
  const selectedStatusLabel = selectedDateBooked ? "Занято" : "Свободно";
  const selectedStatusTone = selectedDateBooked ? "bg-[#fff1f5] text-[#d4144f] ring-[#d4144f]/15" : "bg-emerald-50 text-emerald-700 ring-emerald-500/15";

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
    setMessage(nextStatus === "booked" ? "Занято" : "Свободно");
  }

  function selectApartment(apartmentId: number) {
    setSelectedApartmentId(String(apartmentId));
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
    setMessage("Сохраняю...");

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
        <div className="mx-auto mt-20 max-w-sm rounded-[28px] bg-white p-5 text-center shadow-2xl shadow-black/10 ring-1 ring-black/5">
          <p className="text-sm font-black text-[#07111f]">Проверяю доступ...</p>
        </div>
      </AdminShell>
    );
  }

  if (sessionState === "locked") {
    return (
      <AdminShell>
        <form onSubmit={login} className="mx-auto mt-8 max-w-md rounded-[28px] bg-white p-5 shadow-2xl shadow-black/10 ring-1 ring-black/5 sm:mt-16 sm:p-8">
          <p className="text-xs font-black uppercase text-[#d4146f]">RentPlaceMD Admin</p>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-[#07111f] sm:text-3xl">Календарь занятости</h1>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">Войдите, чтобы управлять свободными и занятыми датами.</p>
          <label className="mt-5 block text-sm font-black text-[#07111f]" htmlFor="admin-password">Пароль</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 h-14 w-full rounded-2xl border border-[#d4146f]/15 bg-[#fffaf0] px-4 text-base font-bold text-[#07111f] outline-none transition focus:border-[#d4146f] focus:ring-4 focus:ring-[#d4146f]/10"
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
      <header className="sticky top-0 z-20 -mx-3 border-b border-[#f0dce6] bg-[#fffaf0]/94 px-3 pb-3 pt-3 backdrop-blur-xl sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:pb-0 sm:pt-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-black uppercase tracking-[0.08em] text-[#d4146f]">RentPlaceMD</p>
            <h1 className="mt-0.5 text-[22px] font-black leading-tight tracking-tight text-[#07111f] sm:text-4xl">Календарь занятости</h1>
            <p className="mt-1 max-w-xl text-xs font-bold leading-4 text-slate-600 sm:text-sm">Дата → статус → сохранить.</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={loadAvailability} className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-sm font-black text-[#07111f] shadow-lg shadow-black/5 ring-1 ring-black/5 transition hover:-translate-y-0.5" aria-label="Обновить">↻</button>
            <button type="button" onClick={logout} className="grid h-10 w-10 place-items-center rounded-2xl bg-[#07111f] text-sm font-black text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5" aria-label="Выйти">×</button>
          </div>
        </div>
      </header>

      <div className="mt-3 grid gap-3 xl:grid-cols-[430px_minmax(0,1fr)] xl:gap-5">
        <aside className="xl:sticky xl:top-6 xl:h-fit">
          <div className="mb-2 flex items-center justify-between gap-3 px-0.5">
            <p className="text-xs font-black uppercase text-[#07111f]">Квартиры</p>
            <Link href="/" className="rounded-full bg-white px-3 py-1.5 text-[11px] font-black text-[#d4146f] shadow-sm ring-1 ring-[#d4146f]/10">Сайт</Link>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-2">
            {apartments.map((apartment) => {
              const active = String(apartment.id) === selectedApartmentId;
              const bookedCount = bookedCountByApartment.get(String(apartment.id)) ?? 0;
              const apartmentPendingCount = pendingCountByApartment.get(String(apartment.id)) ?? 0;

              return (
                <button
                  key={apartment.id}
                  type="button"
                  onClick={() => selectApartment(apartment.id)}
                  className={[
                    "group overflow-hidden rounded-[20px] bg-white text-left shadow-lg shadow-black/5 ring-1 ring-black/5 transition sm:rounded-[22px]",
                    active ? "ring-2 ring-[#d4146f] shadow-pink-700/20" : "hover:-translate-y-0.5 hover:ring-[#d4146f]/30",
                  ].join(" ")}
                >
                  <span className="relative block aspect-[1.18] overflow-hidden bg-[#f4f1ee]">
                    <ResponsiveImage src={apartment.image} alt={"Квартира ID " + apartment.id} className="h-full w-full" sizes="(min-width: 1280px) 215px, (min-width: 640px) 33vw, 50vw" loading="lazy" withWatermark />
                    <span className="absolute left-2 top-2 rounded-full bg-[#ffd21f] px-2.5 py-1 text-[12px] font-black leading-none text-[#07111f] shadow-lg sm:text-sm">ID {apartment.id}</span>
                    {active ? <span className="absolute inset-0 rounded-[20px] ring-4 ring-inset ring-[#d4146f]" /> : null}
                  </span>
                  <span className="block p-2.5 sm:p-3">
                    <span className="block truncate text-sm font-black leading-5 text-[#07111f] sm:text-base">Измаил 88</span>
                    <span className="mt-0.5 block truncate text-[11px] font-bold text-slate-500 sm:text-xs">{getRoomLabel(apartment.label)} · до {apartment.guests}</span>
                    <span className="mt-2 grid grid-cols-2 gap-1.5">
                      <span className="rounded-xl bg-[#fff0f7] px-2 py-1.5 text-center text-[11px] font-black text-[#d4146f]">{apartment.price} лей</span>
                      <span className="rounded-xl bg-red-50 px-2 py-1.5 text-center text-[11px] font-black text-red-700">{bookedCount} дн.</span>
                    </span>
                    {apartmentPendingCount ? <span className="mt-1.5 block rounded-xl bg-[#07111f] px-2 py-1 text-center text-[10px] font-black text-white">+{apartmentPendingCount} изм.</span> : null}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="overflow-hidden rounded-[26px] bg-white shadow-2xl shadow-black/8 ring-1 ring-black/5">
          <div className="bg-[#07111f] px-3 py-3 text-white sm:px-5 sm:py-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-black uppercase text-white/55">ID {selectedApartment?.id} · {getRoomLabel(selectedApartment?.label)}</p>
                <h2 className="mt-0.5 truncate text-xl font-black sm:text-3xl">Измаил 88</h2>
              </div>
              <div className="rounded-2xl bg-white/10 px-3 py-2 text-right shadow-inner ring-1 ring-white/10">
                <p className="text-[10px] font-black uppercase text-white/50">Занято</p>
                <p className="text-lg font-black leading-none text-white">{visibleBookedCount}</p>
              </div>
            </div>
          </div>

          <div className="p-3 sm:p-5">
            <div className="flex items-center justify-between gap-2 rounded-[22px] bg-[#fffaf0] p-1.5 shadow-inner ring-1 ring-black/5">
              <button type="button" onClick={() => setVisibleMonth((month) => addMonths(month, -1))} className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-2xl font-black text-[#07111f] shadow-sm transition hover:-translate-y-0.5" aria-label="Предыдущий месяц">‹</button>
              <p className="text-center text-base font-black text-[#07111f] sm:text-xl">{monthLabel}</p>
              <button type="button" onClick={() => setVisibleMonth((month) => addMonths(month, 1))} className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-2xl font-black text-[#07111f] shadow-sm transition hover:-translate-y-0.5" aria-label="Следующий месяц">›</button>
            </div>

            <div className="mt-3 rounded-[22px] bg-[#fffaf0] p-2 shadow-inner ring-1 ring-black/5 sm:p-3">
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black uppercase text-slate-500 sm:gap-1.5 sm:text-xs">
                {weekdays.map((day) => <div key={day} className="py-1">{day}</div>)}
              </div>
              <div className="mt-1.5 grid grid-cols-7 gap-1 sm:gap-1.5">
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
                        "relative grid aspect-square min-h-0 place-items-center rounded-[10px] text-[13px] font-black transition sm:rounded-xl sm:text-base",
                        currentMonth ? "opacity-100" : "opacity-30",
                        booked ? "bg-[#d4144f] text-white shadow-sm shadow-red-500/20" : "bg-emerald-500 text-white shadow-sm shadow-emerald-500/15",
                        selected ? "ring-[3px] ring-[#ffd21f] ring-offset-2 ring-offset-[#fffaf0]" : "",
                        today ? "after:absolute after:bottom-1 after:h-1 after:w-4 after:rounded-full after:bg-[#07111f]" : "",
                        pending ? "before:absolute before:right-1 before:top-1 before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#ffd21f] before:shadow" : "",
                        isSaving ? "opacity-70" : "active:scale-95 hover:brightness-110",
                      ].join(" ")}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-[1fr_auto] items-stretch gap-2">
              <div className={["rounded-[22px] px-4 py-3 shadow-inner ring-1", selectedStatusTone].join(" ")} aria-live="polite">
                <p className="text-[11px] font-black uppercase opacity-65">{selectedDate}</p>
                <p className="text-2xl font-black leading-tight sm:text-3xl">{message === "Сохранено" ? "Сохранено" : message === "Сохраняю..." ? "Сохраняю..." : selectedStatusLabel}</p>
                {selectedDatePending ? <p className="mt-1 text-xs font-black opacity-75">Есть изменение</p> : null}
              </div>
              <div className="grid min-w-[88px] place-items-center rounded-[22px] bg-[#07111f] px-3 text-center text-white shadow-lg shadow-black/10">
                <p className="text-[10px] font-black uppercase text-white/55">Изм.</p>
                <p className="text-2xl font-black leading-none">{pendingCount}</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-black text-[#07111f] sm:text-xs">
              <Legend color="bg-emerald-500" label="Свободно" />
              <Legend color="bg-[#d4144f]" label="Занято" />
              <Legend color="bg-[#ffd21f]" label="Выбрано" />
              <Legend color="bg-[#07111f]" label="Сегодня" />
            </div>

            {isLoading || (message && !["Свободно", "Занято", "Сохранено", "Сохраняю..."].includes(message)) ? (
              <p className="mt-3 rounded-2xl bg-[#fffaf0] px-4 py-3 text-xs font-black leading-5 text-[#07111f] shadow-inner ring-1 ring-black/5" aria-live="polite">
                {isLoading ? "Загружаю календарь..." : message}
              </p>
            ) : null}

            <SaveButton pendingCount={pendingCount} isSaving={isSaving} onClick={saveChanges} mobile={false} />
          </div>
        </section>
      </div>

      <SaveButton pendingCount={pendingCount} isSaving={isSaving} onClick={saveChanges} mobile />
    </AdminShell>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-[#fffaf0] px-3 pb-24 pt-0 text-[#07111f] sm:px-6 sm:pb-8 sm:pt-6 lg:px-10"><div className="mx-auto max-w-[1400px]">{children}</div></main>;
}

function SaveButton({ pendingCount, isSaving, onClick, mobile }: { pendingCount: number; isSaving: boolean; onClick: () => void; mobile: boolean }) {
  const disabled = pendingCount === 0 || isSaving;

  return (
    <div className={mobile ? "fixed inset-x-0 bottom-0 z-30 border-t border-[#f0dce6] bg-white/95 p-3 shadow-2xl shadow-black/20 backdrop-blur sm:hidden" : "mt-5 hidden sm:block"}>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={[
          "relative h-[60px] min-h-[60px] w-full overflow-hidden rounded-[22px] px-5 text-base font-black text-white shadow-xl transition",
          disabled ? "bg-[#d4146f]/35 text-white/75 shadow-none" : "bg-[#d4146f] shadow-pink-700/25 hover:-translate-y-0.5 hover:brightness-110",
        ].join(" ")}
      >
        <span className="absolute inset-x-0 top-0 h-px bg-white/35" />
        {isSaving ? "Сохраняю..." : pendingCount ? "Сохранить" : "Сохранить"}
      </button>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 shadow-sm ring-1 ring-black/5"><span className={["h-2.5 w-2.5 rounded-full", color].join(" ")} />{label}</span>;
}
