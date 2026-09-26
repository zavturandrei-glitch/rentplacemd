"use client";

import { useState } from "react";

export default function AdminExcursionsSession({ authenticated = false }: { authenticated?: boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(logout: boolean) {
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/admin/session", logout ? { method: "DELETE" } : { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      setPassword("");
      if (!response.ok) { setError(response.status === 503 ? "Пароль администратора не настроен на сервере." : "Не удалось войти. Проверьте пароль."); return; }
      // Full navigation clears protected RSC content and the client router cache on logout.
      window.location.replace("/admin/excursions");
    } catch { setError("Не удалось связаться с сервером. Попробуйте ещё раз."); }
    finally { setBusy(false); }
  }
  if (authenticated) return <div><button disabled={busy} onClick={() => submit(true)} className="min-h-11 rounded-xl border px-4 font-bold">Выйти</button>{error && <p role="alert">{error}</p>}</div>;
  return <form className="mx-auto mt-12 max-w-md rounded-2xl border bg-white p-6" onSubmit={(event) => { event.preventDefault(); void submit(false); }}>
    <h1 className="text-2xl font-bold">Экскурсии · вход в админку</h1>
    <label className="mt-6 block font-bold">Пароль<input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 block min-h-12 w-full rounded-xl border p-3" /></label>
    <button disabled={busy} className="mt-4 min-h-12 rounded-xl bg-[#15231d] px-5 font-bold text-white">{busy ? "Проверяем…" : "Войти"}</button>
    {error && <p role="alert" className="mt-4 text-red-700">{error}</p>}
  </form>;
}
