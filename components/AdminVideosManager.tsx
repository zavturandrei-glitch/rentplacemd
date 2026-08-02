"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  cityVideoPlatforms,
  type CityVideo,
  type CityVideoInput,
  type LocalizedVideoText,
} from "@/lib/cityVideoTypes";
import type { Language } from "@/locales/translations";

type SessionState = "checking" | "locked" | "ready";
type StorageState = { persistent: boolean; backend: "neon" | "local-file" | "seed-only" };
const languages = ["ru", "ro", "en", "uk", "cs"] as const satisfies readonly Language[];
const languageNames: Record<Language, string> = {
  ru: "Русский",
  ro: "Română",
  en: "English",
  uk: "Українська",
  cs: "Čeština",
};

function emptyText(): LocalizedVideoText {
  return { ru: "", ro: "", en: "", uk: "", cs: "" };
}

function emptyForm(): CityVideoInput {
  return {
    date: new Date().toISOString().slice(0, 10),
    platform: "youtube",
    videoUrl: "",
    thumbnailUrl: null,
    title: emptyText(),
    description: emptyText(),
    relatedUrl: null,
    featured: false,
    published: false,
    displayOrder: 100,
  };
}

export default function AdminVideosManager() {
  const [sessionState, setSessionState] = useState<SessionState>("checking");
  const [password, setPassword] = useState("");
  const [videos, setVideos] = useState<CityVideo[]>([]);
  const [storage, setStorage] = useState<StorageState | null>(null);
  const [form, setForm] = useState<CityVideoInput>(() => emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const response = await fetch("/api/admin/session", { cache: "no-store" });
      const data = (await response.json()) as { authenticated: boolean; configured: boolean };
      if (!data.configured) setMessage("ADMIN_PASSWORD не задан.");
      setSessionState(data.authenticated ? "ready" : "locked");
      if (data.authenticated) await loadVideos();
    }
    void checkSession();
  }, []);

  async function loadVideos() {
    const response = await fetch("/api/admin/videos", { cache: "no-store" });
    if (!response.ok) {
      setMessage("Не удалось загрузить видео.");
      return;
    }
    const data = (await response.json()) as { videos: CityVideo[]; storage: StorageState };
    setVideos(data.videos);
    setStorage(data.storage);
  }

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const response = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setMessage(data?.error ?? "Не удалось войти.");
      return;
    }
    setPassword("");
    setSessionState("ready");
    await loadVideos();
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    setSessionState("locked");
    setVideos([]);
  }

  function setLocalized(field: "title" | "description", language: Language, value: string) {
    setForm((current) => ({
      ...current,
      [field]: { ...current[field], [language]: value },
    }));
  }

  function startEdit(video: CityVideo) {
    setEditingId(video.id);
    setForm({
      date: video.date,
      platform: video.platform,
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl,
      title: { ...video.title },
      description: { ...video.description },
      relatedUrl: video.relatedUrl,
      featured: video.featured,
      published: video.published,
      displayOrder: video.displayOrder,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm());
  }

  async function saveVideo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setMessage("Сохраняю...");
    const response = await fetch("/api/admin/videos", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { id: editingId, video: form } : form),
    });
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    if (!response.ok) {
      setMessage(data?.error ?? "Не удалось сохранить видео.");
      setBusy(false);
      return;
    }
    resetForm();
    await loadVideos();
    setMessage("Сохранено.");
    setBusy(false);
  }

  async function removeVideo(id: string) {
    if (!window.confirm("Удалить это видео?")) return;
    const response = await fetch(`/api/admin/videos?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setMessage(data?.error ?? "Не удалось удалить видео.");
      return;
    }
    await loadVideos();
    if (editingId === id) resetForm();
  }

  if (sessionState === "checking") {
    return <AdminShell><p className="mx-auto mt-20 max-w-sm rounded-3xl bg-white p-5 text-center font-black shadow-xl">Проверяю доступ...</p></AdminShell>;
  }

  if (sessionState === "locked") {
    return (
      <AdminShell>
        <form onSubmit={login} className="mx-auto mt-12 max-w-md rounded-[28px] bg-white p-6 shadow-2xl ring-1 ring-black/5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d4146f]">RentPlaceMD Admin</p>
          <h1 className="mt-2 text-3xl font-black">Видео</h1>
          <label className="mt-6 grid gap-2 text-sm font-black">
            Пароль
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-14 rounded-2xl border border-black/10 bg-[#fffaf0] px-4" />
          </label>
          {message ? <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700">{message}</p> : null}
          <button className="mt-5 h-14 w-full rounded-2xl bg-[#d4146f] font-black text-white">Войти</button>
        </form>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 py-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d4146f]">RentPlaceMD Admin</p>
          <h1 className="mt-1 text-3xl font-black">Видео</h1>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/availability" className="inline-flex min-h-11 items-center rounded-xl border border-black/10 bg-white px-4 text-sm font-black">Календарь</Link>
          <button type="button" onClick={logout} className="h-11 rounded-xl bg-[#07111f] px-4 text-sm font-black text-white">Выйти</button>
        </div>
      </header>

      <div className={`mt-5 rounded-2xl p-4 text-sm font-bold ${storage?.persistent ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-900"}`}>
        {storage?.persistent
          ? "Постоянное хранилище подключено: Neon PostgreSQL. Изменения переживают deployment."
          : storage?.backend === "local-file"
            ? "Локальный режим: изменения сохраняются в data/cityVideos.json. На Vercel нужен DATABASE_URL от Neon."
            : "Только seed-режим: production-запись отключена до подключения DATABASE_URL от Neon."}
      </div>

      <form onSubmit={saveVideo} className="mt-6 rounded-[26px] bg-white p-5 shadow-xl ring-1 ring-black/5 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black">{editingId ? "Редактировать ролик" : "Добавить ролик"}</h2>
          {editingId ? <button type="button" onClick={resetForm} className="text-sm font-black text-[#d4146f]">Отменить</button> : null}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Field label="Платформа">
            <select value={form.platform} onChange={(event) => setForm({ ...form, platform: event.target.value as CityVideoInput["platform"] })} className={inputClass}>
              {cityVideoPlatforms.map((platform) => <option key={platform} value={platform}>{platform}</option>)}
            </select>
          </Field>
          <Field label="Дата события">
            <input type="date" required value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} className={inputClass} />
          </Field>
          <Field label="Ссылка на видео">
            <input type="url" required value={form.videoUrl} onChange={(event) => setForm({ ...form, videoUrl: event.target.value })} placeholder="https://..." className={inputClass} />
          </Field>
          <Field label="Обложка — необязательно">
            <input value={form.thumbnailUrl ?? ""} onChange={(event) => setForm({ ...form, thumbnailUrl: event.target.value || null })} placeholder="/image.webp или https://..." className={inputClass} />
          </Field>
          <Field label="Связанная страница — необязательно">
            <input value={form.relatedUrl ?? ""} onChange={(event) => setForm({ ...form, relatedUrl: event.target.value || null })} placeholder="/events/..." className={inputClass} />
          </Field>
          <Field label="Порядок показа">
            <input type="number" value={form.displayOrder} onChange={(event) => setForm({ ...form, displayOrder: Number(event.target.value) })} className={inputClass} />
          </Field>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {languages.map((language) => (
            <section key={language} className="rounded-2xl bg-[#fffaf0] p-4 ring-1 ring-black/5">
              <h3 className="font-black">{languageNames[language]}</h3>
              <label className="mt-3 grid gap-2 text-sm font-bold">
                Название
                <input required value={form.title[language]} onChange={(event) => setLocalized("title", language, event.target.value)} className={inputClass} />
              </label>
              <label className="mt-3 grid gap-2 text-sm font-bold">
                Короткое описание
                <textarea rows={3} value={form.description[language]} onChange={(event) => setLocalized("description", language, event.target.value)} className={`${inputClass} h-auto py-3`} />
              </label>
            </section>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-5">
          <Check label="Показывать на главной" checked={form.featured} onChange={(featured) => setForm({ ...form, featured })} />
          <Check label="Опубликовано" checked={form.published} onChange={(published) => setForm({ ...form, published })} />
        </div>

        {message ? <p className="mt-5 rounded-2xl bg-[#fffaf0] p-3 text-sm font-bold">{message}</p> : null}
        <button disabled={busy} className="mt-6 min-h-13 rounded-2xl bg-[#d4146f] px-6 text-sm font-black text-white disabled:opacity-50">
          {busy ? "Сохраняю..." : editingId ? "Сохранить изменения" : "Добавить видео"}
        </button>
      </form>

      <section className="mt-8 pb-12">
        <h2 className="text-2xl font-black">Добавленные ролики</h2>
        {videos.length === 0 ? <p className="mt-4 rounded-2xl bg-white p-5 text-slate-600 ring-1 ring-black/5">Пока нет ни одного ролика.</p> : (
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {videos.map((video) => (
              <article key={video.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase text-[#d4146f]">{video.platform} · {video.date}</p>
                    <h3 className="mt-2 text-lg font-black">{video.title.ru}</h3>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-black ${video.published ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>{video.published ? "Опубликовано" : "Черновик"}</span>
                </div>
                <p className="mt-3 break-all text-xs text-slate-500">{video.videoUrl}</p>
                <div className="mt-5 flex gap-2">
                  <button type="button" onClick={() => startEdit(video)} className="min-h-10 rounded-xl bg-[#07111f] px-4 text-xs font-black text-white">Изменить</button>
                  <button type="button" onClick={() => removeVideo(video.id)} className="min-h-10 rounded-xl border border-red-200 px-4 text-xs font-black text-red-700">Удалить</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </AdminShell>
  );
}

const inputClass = "h-12 w-full rounded-xl border border-black/10 bg-white px-3 text-sm font-semibold outline-none focus:border-[#d4146f] focus:ring-2 focus:ring-[#d4146f]/10";

function AdminShell({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-[#fffaf0] px-4 text-[#07111f] sm:px-6 lg:px-8"><div className="mx-auto max-w-6xl">{children}</div></main>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-black">{label}{children}</label>;
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className="flex items-center gap-3 text-sm font-black"><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 accent-[#d4146f]" />{label}</label>;
}
