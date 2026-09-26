import Link from "@/components/LocalizedLink";
import { excursions, excursionLabel, travelUi } from "@/lib/excursions";
import { excursionContact, excursionInquiryUrl } from "@/lib/excursionContact";
import type { Language } from "@/locales/translations";

export default function ExcursionRoutePanel({ path, language }: { path: string; language: Language }) {
  const routes = excursions.filter((route) => route.href === path);
  if (!routes.length && !["/guide/moldova-trips", "/guide/wineries/purcari"].includes(path)) return null;
  if (!routes.length) return <nav className="my-8"><Link href="/excursions#routes" className="inline-flex min-h-11 items-center rounded-xl bg-[#15231d] px-5 py-3 text-sm font-bold text-white">{travelUi.navTitle[language]} · RentPlaceMD →</Link></nav>;
  return <section aria-label={travelUi.navTitle[language]} className="my-8 grid gap-4 text-[#15231d]">
    {routes.map((route) => <div key={route.id} id={`route-${route.number}`} className="scroll-mt-28 rounded-2xl border border-[#15231d]/20 bg-[#e6eadf] p-5 sm:p-6">
      <h2 className="font-serif text-2xl">{excursionLabel(route, language)}</h2>
      <p className="mt-3 text-sm leading-7">{route.description[language]}</p>
      <details className="mt-3 text-sm leading-7"><summary className="cursor-pointer font-bold">{travelUi.before[language]}</summary><p className="mt-2">{route.tip[language]}</p></details>
      {route.requestable ? <Link href={`/excursions?route=${route.id}#request`} className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-[#15231d] px-4 py-2 text-sm font-bold text-white">{travelUi.request[language]} →</Link> : <>
        <p className="mt-3 text-sm leading-6 text-[#526158]">{excursionContact.note[language]}</p>
        <a href={excursionInquiryUrl(route, language)} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center text-sm font-bold underline underline-offset-4">{excursionContact.question[language]} · RentPlaceMD WhatsApp ↗</a>
      </>}
    </div>)}
  </section>;
}
