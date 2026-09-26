import type { Metadata } from "next";
import Link from "next/link";
import AdminExcursionsSession from "@/components/AdminExcursionsSession";
import { getAdminExcursionReferences } from "@/lib/adminExcursions";
import { excursions, excursionLabel, travelUi as ui } from "@/lib/excursions";
import { buildExcursionWhatsAppUrl } from "@/lib/excursionRequest";
import { excursionInquiry } from "@/lib/excursionContact";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Экскурсии · админка", robots: { index: false, follow: false }, alternates: { canonical: null, languages: {} } };

export default async function AdminExcursionsPage() {
  const references = await getAdminExcursionReferences();
  if (!references) return <main className="min-h-screen bg-slate-100 p-4 text-[#15231d]"><AdminExcursionsSession /></main>;
  return <main className="min-h-screen bg-[#f5f1e8] p-4 text-[#15231d] sm:p-8"><div className="mx-auto max-w-6xl">
    <header className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-3xl font-bold">Экскурсии</h1><p className="mt-2">Закрытый справочник · {excursions.length} маршрутов · 4 запроса организации</p></div><AdminExcursionsSession authenticated /></header>
    <nav className="my-6 flex flex-wrap gap-5 font-bold underline"><Link href="/admin/availability">Календарь</Link><Link href="/admin/videos">Видео</Link><Link href="/excursions">Публичный каталог</Link></nav>
    <nav aria-label="Номера маршрутов" className="mb-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{excursions.map(route => <a key={route.id} href={`#route-${route.number}`} className="rounded-xl border bg-white p-3 font-bold">{excursionLabel(route, "ru")}</a>)}</nav>
    <p className="mb-6 text-sm leading-6">Ссылки — рабочие источники, а не подтверждение сотрудничества. Цены, даты, доступность, язык и условия каждого исполнителя необходимо уточнить. Запрос гостя не равен подтверждённой брони; программа и цена согласуются отдельно.</p>
    <div className="space-y-6">{excursions.map(route => {
      const request = route.requestable ? new URL(buildExcursionWhatsAppUrl({ routeTitle: excursionLabel(route, "ru"), date: "", guests: "", tourLanguage: "", labels: { request: ui.request.ru, route: ui.route.ru, date: ui.date.ru, guests: ui.guests.ru, language: ui.language.ru, unspecified: ui.unspecified.ru } })).searchParams.get("text") : excursionInquiry(route, "ru");
      return <section key={route.id} id={`route-${route.number}`} className="scroll-mt-6 rounded-2xl border bg-white p-5 sm:p-7">
        <h2 className="text-2xl font-bold">{excursionLabel(route, "ru")}</h2>
        <p className="mt-2 text-sm">{route.requestable ? "Принимаем запрос организации; подтверждение отдельно." : "Информационный маршрут; исполнитель и возможность организации — уточнить."}</p>
        <Link href={`${route.href}?lang=ru#route-${route.number}`} className="mt-3 inline-flex min-h-11 items-center font-bold underline">Открыть тот же маршрут на сайте →</Link>
        <ul className="mt-4 space-y-4">{references[route.id].map(ref => <li key={ref.url} className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase text-slate-500">{ref.kind}</p><a href={ref.url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-11 items-center font-bold underline">{ref.name} ↗</a><p className="break-all text-xs text-slate-500">{ref.url}</p><p className="mt-2 text-sm leading-6">{ref.note}</p></li>)}</ul>
        <details className="mt-5"><summary className="cursor-pointer py-2 font-bold">Текст запроса гостя · RU</summary><p className="mt-3 whitespace-pre-line rounded-xl bg-[#e6eadf] p-4 text-sm leading-7">{request}</p><p className="mt-3 text-sm">На сайте номер сохраняется на всех пяти языках; название и поля сообщения переводятся.</p></details>
      </section>;
    })}</div>
  </div></main>;
}
