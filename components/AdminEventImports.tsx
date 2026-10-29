"use client";

import { useState } from "react";
import type { EventSourceConfiguration } from "@/lib/eventSource";

type Props = {
  source?: EventSourceConfiguration;
  persistent: boolean;
  busy: boolean;
  action: (body: object) => Promise<boolean>;
};
const emptySource: EventSourceConfiguration = { name: "", url: "", permissionUrl: "", kind: "json", enabled: false, permissionConfirmed: false };

export default function AdminEventImports({ source, persistent, busy, action }: Props) {
  const [draft, setDraft] = useState<EventSourceConfiguration>(source ?? emptySource);
  const [message, setMessage] = useState("");
  const [fileBusy, setFileBusy] = useState(false);
  const input = "mt-1 w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900";
  return <section className="mb-6 grid gap-6 rounded-xl bg-white p-5 shadow-sm lg:grid-cols-2">
    <div>
      <h2 className="text-xl font-bold">Ручной импорт</h2>
      <p className="my-3 text-sm text-slate-600">Загрузите JSON-массив до 100 событий и 500 KB. Все записи попадут на подтверждение. Даты, отмены и переводы проверяются до сохранения. Изображения из внешних адресов не скачиваются.</p>
      <a className="underline" href="/events-import-example.json" download>Скачать описание формата</a>
      <label className="mt-4 block">JSON-файл<input className={input} type="file" accept="application/json,.json" disabled={!persistent || busy || fileBusy} onChange={async event => {
        const file = event.target.files?.[0]; if (!file) return;
        setMessage(""); setFileBusy(true);
        try {
          if (file.size > 500_000) throw new Error("Максимальный размер файла — 500 KB");
          const events: unknown = JSON.parse(await file.text());
          if (!Array.isArray(events) || !events.length || events.length > 100) throw new Error("Нужен массив от 1 до 100 событий");
          if (await action({ action: "import", events })) setMessage("Импорт обработан. Проверьте очередь; опубликованные страницы не изменились.");
        } catch (error) { setMessage(error instanceof Error ? error.message : "Не удалось прочитать файл"); }
        finally { setFileBusy(false); event.target.value = ""; }
      }} /></label>
      {message && <p className="mt-3 text-sm" role="status">{message}</p>}
    </div>
    <form className="space-y-3" onSubmit={async event => { event.preventDefault(); await action({ action: "source.save", source: draft }); }}>
      <h2 className="text-xl font-bold">Подключение официального источника</h2>
      <p className="text-sm text-slate-600">Документированный разрешённый фид пока не подтверждён. Ссылки на обычные афиши не являются API. По умолчанию источник выключен.</p>
      <p className="text-sm"><a className="underline" href="https://iticket.md" rel="noreferrer" target="_blank">iTicket</a> · <a className="underline" href="https://www.fest.md" rel="noreferrer" target="_blank">Fest.md</a> · <a className="underline" href="https://arenachisinau.md" rel="noreferrer" target="_blank">Arena</a> · <a className="underline" href="https://visit.chisinau.md" rel="noreferrer" target="_blank">Городской календарь</a></p>
      <label className="block">Название поставщика<input className={input} required value={draft.name} onChange={event => setDraft({ ...draft, name: event.target.value })} /></label>
      <label className="block">Формат<select className={input} value={draft.kind} onChange={event => setDraft({ ...draft, kind: event.target.value as EventSourceConfiguration["kind"], enabled: false })}><option value="json">JSON — адаптер готов</option><option value="rss">RSS — требуется адаптер поставщика</option><option value="ics">ICS — требуется адаптер поставщика</option></select></label>
      <label className="block">Публичный адрес фида<input className={input} type="url" required placeholder="https://provider.example/official-feed.json" value={draft.url} onChange={event => setDraft({ ...draft, url: event.target.value })} /></label>
      <p className="text-xs text-slate-600">Не вводите токены и пароли. Для закрытого API используйте серверные переменные окружения.</p>
      <label className="block">Ссылка на разрешение / условия использования<input className={input} type="url" value={draft.permissionUrl} onChange={event => setDraft({ ...draft, permissionUrl: event.target.value })} /></label>
      <label className="flex items-center gap-2"><input type="checkbox" checked={draft.permissionConfirmed} onChange={event => setDraft({ ...draft, permissionConfirmed: event.target.checked, enabled: event.target.checked ? draft.enabled : false })} />Коммерческое повторное использование разрешено</label>
      <label className="flex items-center gap-2"><input type="checkbox" checked={draft.enabled} disabled={draft.kind !== "json" || !draft.permissionConfirmed} onChange={event => setDraft({ ...draft, enabled: event.target.checked })} />Включить ежедневный импорт в очередь</label>
      <button className="min-h-11 rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white disabled:opacity-50" disabled={!persistent || busy}>Сохранить источник</button>
    </form>
  </section>;
}
