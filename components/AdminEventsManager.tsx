"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ChisinauEvent } from "@/lib/events";
import type { EventState } from "@/lib/eventsWorkflow";
import AdminEventImports from "@/components/AdminEventImports";

const languages = { ru: "Русский (исходный)", ro: "Română", en: "English", uk: "Українська", cs: "Čeština" } as const;
type Draft = Partial<ChisinauEvent>;
const blank = (): Draft => ({ slug: "", title: { ru: "", ro: "", en: "", uk: "", cs: "" }, description: { ru: "", ro: "", en: "", uk: "", cs: "" }, venue: { ru: "", ro: "", en: "", uk: "", cs: "" }, startDate: "", category: "concert", status: "scheduled", interest: "low", sourceName: "", sourceUrl: "" });
type Snapshot = { persistent: boolean; storage: { variable: string | null; cronConfigured: boolean }; state: EventState; events: ChisinauEvent[] };

export default function AdminEventsManager() {
  const [session, setSession] = useState("checking");
  const [password, setPassword] = useState("");
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [form, setForm] = useState<Draft>(blank);
  const [originalSlug, setOriginalSlug] = useState<string>();
  const [selectedCandidate, setSelectedCandidate] = useState<string>();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState<keyof typeof languages>("ru");
  const [imageSource, setImageSource] = useState("");
  const [imageRights, setImageRights] = useState("");
  const [filter, setFilter] = useState("");
  async function load() {
    const response = await fetch("/api/admin/events", { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Не удалось загрузить события");
    setSnapshot(data);
  }
  useEffect(() => {
    void fetch("/api/admin/session", { cache: "no-store" }).then(response => response.json()).then(async data => {
      setSession(data.authenticated ? "ready" : "locked");
      if (data.authenticated) await load();
    }).catch(() => setMessage("Не удалось проверить вход или подключение БД"));
  }, []);
  async function action(body: object) {
    setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/admin/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      await load(); setMessage(data.queued !== undefined ? `В очередь добавлено: ${data.queued}. Публикация — после подтверждения.` : "Сохранено / проверка завершена");
      return true;
    } catch (error) { setMessage(error instanceof Error ? error.message : "Ошибка сохранения"); return false; }
    finally { setBusy(false); }
  }
  const inputClass = "mt-1 w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900";
  const buttonClass = "min-h-11 rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white disabled:opacity-50";
  return <main className="min-h-screen bg-slate-50 p-4 text-slate-900 sm:p-8"><div className="mx-auto max-w-6xl">
    <Link href="/admin/videos" className="underline">Видео</Link> · <Link href="/admin/availability" className="underline">Доступность</Link> · <Link href="/events" className="underline">Открыть календарь</Link>
    <h1 className="my-6 text-3xl font-bold">События и обновления</h1>
    {message && <p role="status" className="my-4 rounded-lg bg-amber-100 p-4">{message}</p>}
    {session === "checking" ? <p>Проверяем вход…</p> : session === "locked" ? <form className="max-w-md" onSubmit={async event => {
      event.preventDefault(); setBusy(true);
      try {
        const response = await fetch("/api/admin/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
        if (!response.ok) throw new Error("Не удалось войти");
        setPassword(""); setSession("ready"); await load();
      } catch { setMessage("Не удалось войти или загрузить базу"); } finally { setBusy(false); }
    }}><label>Пароль администратора<input className={inputClass} type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} required /></label><button className={`${buttonClass} mt-4`} disabled={busy}>Войти</button></form> : <>
      <section className="mb-6 rounded-xl bg-white p-5 shadow-sm">
        <button className="mb-3 underline" disabled={busy} onClick={async () => {
          setBusy(true);
          try {
            const response = await fetch("/api/admin/events/health", { cache: "no-store" });
            const health = await response.json();
            setMessage(health.connected ? `Соединение Neon проверено без записи. ${health.schemaReady ? "Таблицы готовы." : "Нужна миграция событий."}` : "Соединение не подтверждено: проверьте доступность NEON_* в этом окружении.");
          } catch { setMessage("Не удалось выполнить проверку соединения"); } finally { setBusy(false); }
        }}>Проверить соединение Neon без изменения данных</button>
        <p>Хранилище: {snapshot?.persistent ? "Neon PostgreSQL" : "не подключено; опубликован исходный календарь"}</p>
        <p className="text-sm">Переменная подключения: {snapshot?.storage.variable ?? "не найдена"}. Защита Cron: {snapshot?.storage.cronConfigured ? "секрет настроен" : "в этом окружении секрет не настроен"}.</p>
        <p>Последняя проверка: {snapshot?.state.lastCheckedAt ?? "ещё не выполнялась"}</p>
        <p className="my-2 text-sm text-slate-600">Импорт: новые события и изменения требуют подтверждения. Без разрешённого фида работает ручной режим.</p>
        <button className={buttonClass} disabled={busy || !snapshot?.persistent} onClick={() => void action({ action: "refresh" })}>Запустить проверку</button>
      </section>
      <AdminEventImports key={JSON.stringify(snapshot?.state.source) ?? "manual"} source={snapshot?.state.source} persistent={Boolean(snapshot?.persistent)} busy={busy} action={action} />
      <div className="grid gap-6 lg:grid-cols-2"><section className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold">{originalSlug ? "Редактирование" : "Новое событие"}</h2>
        <p className="my-3 text-sm">Пустые переводы используют русский текст. Такие языки не добавляются в hreflang страницы события. Источник и права проверяет администратор.</p>
        <form className="space-y-4" onSubmit={async event => {
          event.preventDefault();
          if (await action({ action: "save", event: form, originalSlug, fingerprint: selectedCandidate })) { setForm(blank()); setOriginalSlug(undefined); setSelectedCandidate(undefined); }
        }}>
          <label className="block">Постоянный адрес (slug)<input className={inputClass} value={form.slug ?? ""} readOnly={Boolean(originalSlug)} required pattern="[a-z0-9]+(-[a-z0-9]+)*" onChange={event => setForm({ ...form, slug: event.target.value })} /></label>
          <label className="block">Язык<select className={inputClass} value={language} onChange={event => setLanguage(event.target.value as keyof typeof languages)}>{Object.entries(languages).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
          {([['title', 'Название'], ['description', 'Описание'], ['venue', 'Место']] as const).map(([key, label]) => <label key={key} className="block">{label}<textarea className={inputClass} rows={key === "description" ? 4 : 2} required={language === "ru"} value={form[key]?.[language] ?? ""} onChange={event => setForm({ ...form, [key]: { ...form[key], [language]: event.target.value } })} /></label>)}
          {language !== "ru" && <label className="flex items-center gap-3"><input type="checkbox" checked={form.translatedLanguages?.includes(language) ?? Boolean(form.title?.[language] && form.description?.[language])} onChange={event => {
            const current = form.translatedLanguages ?? Object.keys(languages).filter(key => form.title?.[key as keyof typeof languages] && form.description?.[key as keyof typeof languages]) as (keyof typeof languages)[];
            setForm({ ...form, translatedLanguages: event.target.checked ? [...new Set([...current, language])] : current.filter(key => key !== language) });
          }} />Перевод проверен; разрешить индексацию этого языка</label>}
          <div className="grid gap-3 sm:grid-cols-2"><label>Дата<input type="date" required className={inputClass} value={form.startDate ?? ""} onChange={event => setForm({ ...form, startDate: event.target.value })} /></label><label>Последний день<input type="date" className={inputClass} value={form.endDate ?? ""} onChange={event => setForm({ ...form, endDate: event.target.value || undefined })} /></label></div>
          <label className="block">Время (Europe/Chisinau; пусто, если неизвестно)<input type="time" className={inputClass} value={form.startTime ?? ""} onChange={event => setForm({ ...form, startTime: event.target.value || undefined })} /></label>
          <label className="block">Прежняя дата при переносе<input type="date" className={inputClass} value={form.previousStartDate ?? ""} onChange={event => setForm({ ...form, previousStartDate: event.target.value || undefined })} /></label>
          <label className="block">Категория<select className={inputClass} value={form.category} onChange={event => setForm({ ...form, category: event.target.value as ChisinauEvent["category"] })}>{Object.entries({ concert: "Концерт", festival: "Фестиваль", theatre: "Театр", sport: "Спорт", business: "Конференция", family: "Семейное", city: "Город", gastronomy: "Гастрономия", other: "Другое" }).map(([key, label]) => <option value={key} key={key}>{label}</option>)}</select></label>
          <label className="block">Статус<select className={inputClass} value={form.status} onChange={event => setForm({ ...form, status: event.target.value as ChisinauEvent["status"] })}>{Object.entries({ scheduled: "По расписанию", postponed: "Перенесено, дата неизвестна", cancelled: "Отменено", "sold-out": "Билеты распроданы" }).map(([key, label]) => <option value={key} key={key}>{label}</option>)}</select></label>
          <label className="block">Название источника<input className={inputClass} required value={form.sourceName ?? ""} onChange={event => setForm({ ...form, sourceName: event.target.value })} /></label>
          <label className="block">Подтверждающая ссылка<input className={inputClass} type="url" required value={form.sourceUrl ?? ""} onChange={event => setForm({ ...form, sourceUrl: event.target.value })} /></label>
          <label className="block">Ссылка на билеты<input className={inputClass} type="url" value={form.ticketUrl ?? ""} onChange={event => setForm({ ...form, ticketUrl: event.target.value || undefined })} /></label>
          <details><summary className="cursor-pointer font-semibold">Организатор и адрес (для Event JSON-LD)</summary>
            <label className="mt-3 block">Подтверждённый организатор<input className={inputClass} value={form.organizer?.name ?? ""} onChange={event => setForm({ ...form, organizer: event.target.value ? { type: "Organization", name: event.target.value, url: form.organizer?.url ?? "" } : undefined })} /></label>
            <label className="block">Официальный сайт организатора<input className={inputClass} type="url" value={form.organizer?.url ?? ""} onChange={event => setForm({ ...form, organizer: { type: form.organizer?.type ?? "Organization", name: form.organizer?.name ?? "", url: event.target.value } })} /></label>
            <label className="block">Адрес ({languages[language]})<input className={inputClass} value={form.address?.[language] ?? ""} onChange={event => setForm({ ...form, address: { ru: "", ro: "", en: "", uk: "", cs: "", ...form.address, [language]: event.target.value } })} /></label>
          </details>
          <details><summary className="cursor-pointer font-semibold">Изображение и права</summary><p className="my-2 text-sm">Без загрузки показывается собственная обложка категории. Загружайте только разрешённые изображения.</p>
            <label className="block">Источник изображения<input type="url" className={inputClass} value={imageSource} onChange={event => setImageSource(event.target.value)} /></label>
            <label className="block">Основание использования / лицензия<textarea className={inputClass} value={imageRights} onChange={event => setImageRights(event.target.value)} /></label>
            <label className="block">WebP / AVIF / JPEG / PNG, до 1 MB<input type="file" accept="image/webp,image/avif,image/jpeg,image/png" className={inputClass} disabled={busy || !snapshot?.persistent} onChange={async event => {
              const file = event.target.files?.[0]; if (!file) return;
              const body = new FormData(); body.set("file", file); body.set("source", imageSource); body.set("rights", imageRights); setBusy(true);
              try { const response = await fetch("/api/admin/events/images", { method: "POST", body }); const data = await response.json(); if (!response.ok) throw new Error(data.error); setForm(current => ({ ...current, image: { ...data, alt: current.title } })); setMessage("Изображение загружено. Сохраните событие."); }
              catch (error) { setMessage(error instanceof Error ? error.message : "Ошибка загрузки"); } finally { setBusy(false); }
            }} /></label>
            {form.image && <><p className="mt-2 break-all text-sm">{form.image.path}</p><button type="button" className="mt-2 underline" onClick={() => setForm({ ...form, image: undefined })}>Вернуть обложку категории</button></>}
          </details>
          <div className="flex flex-wrap gap-3"><button className={buttonClass} disabled={busy || !snapshot?.persistent}>Сохранить и опубликовать</button><button type="button" className="underline" onClick={() => { setForm(blank()); setOriginalSlug(undefined); setSelectedCandidate(undefined); }}>Новое событие</button></div>
        </form>
      </section><div className="space-y-6"><section className="rounded-xl bg-white p-5 shadow-sm"><h2 className="text-xl font-bold">Все события ({snapshot?.events.length ?? 0})</h2><input aria-label="Поиск событий" className={inputClass} placeholder="Название или дата" value={filter} onChange={event => setFilter(event.target.value)} /><ul className="mt-4 max-h-[600px] space-y-4 overflow-auto">{snapshot?.events.filter(event => `${event.title.ru} ${event.startDate}`.toLowerCase().includes(filter.toLowerCase())).map(event => <li key={event.slug} className="border-b pb-4"><p className="font-semibold">{event.startDate} · {event.title.ru}</p><p className="text-sm">{event.status} · <a className="underline" href={event.sourceUrl} target="_blank" rel="noreferrer">Источник</a></p><button className="mr-4 mt-2 underline" onClick={() => { setForm(event); setOriginalSlug(event.slug); setSelectedCandidate(undefined); setImageSource(event.image?.source ?? ""); setImageRights(event.image?.rights ?? ""); }}>Редактировать</button><button className="mt-2 text-red-700 underline" disabled={busy || !snapshot.persistent} onClick={() => { if (window.confirm("Отметить событие отменённым? Постоянная страница сохранится.")) void action({ action: "delete", slug: event.slug }); }}>Отменить</button></li>)}</ul></section>
        <section className="rounded-xl bg-white p-5 shadow-sm"><h2 className="text-xl font-bold">На подтверждение ({snapshot?.state.queue.length ?? 0})</h2><ul className="mt-4 space-y-4">{snapshot?.state.queue.map(item => <li key={item.fingerprint} className="border-b pb-4"><p className="font-semibold">{item.event.startDate} · {item.event.title.ru}</p><a className="underline" href={item.event.sourceUrl} target="_blank" rel="noreferrer">Проверить источник</a><p className="my-2 text-sm">{item.event.description.ru}</p><button className="mr-3 underline" disabled={busy} onClick={() => { setForm(item.event); setSelectedCandidate(item.fingerprint); setOriginalSlug(snapshot.events.some(event => event.slug === item.event.slug) ? item.event.slug : undefined); }}>Открыть для проверки</button><button className="mr-3 underline" disabled={busy} onClick={() => void action({ action: "approve", fingerprint: item.fingerprint })}>Подтвердить</button><button className="text-red-700 underline" disabled={busy} onClick={() => void action({ action: "reject", fingerprint: item.fingerprint })}>Отклонить</button></li>)}</ul></section>
        <section className="rounded-xl bg-white p-5 shadow-sm"><h2 className="text-xl font-bold">Журнал</h2><ul className="mt-4 space-y-3 text-sm">{snapshot?.state.logs.slice().reverse().map((log, index) => <li className={log.level === "error" ? "text-red-700" : ""} key={index}>{log.at} · {log.message}</li>)}</ul></section>
      </div></div>
    </>}
  </div></main>;
}
