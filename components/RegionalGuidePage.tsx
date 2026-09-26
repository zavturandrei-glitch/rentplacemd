import ExcursionRoutePanel from "@/components/ExcursionRoutePanel";
import Link from "@/components/LocalizedLink";
import type { Language } from "@/locales/translations";
import { regionalGuides, regionalUi, type RegionalGuideSlug } from "@/lib/regionalGuides";
import { travelUi } from "@/lib/excursions";

export default function RegionalGuidePage({ slug, language }: { slug: RegionalGuideSlug; language: Language }) {
  const guide = regionalGuides[slug];
  const related = regionalGuides[guide.related as RegionalGuideSlug];
  return <article className="bg-[#f5f1e8] px-4 pb-20 pt-8 text-[#15231d] sm:px-6">
    <div className="mx-auto max-w-5xl">
      <nav aria-label={travelUi.hub[language]} className="flex flex-wrap gap-3 text-sm font-semibold underline underline-offset-4"><Link href="/chisinau-guide">{travelUi.hub[language]}</Link><span aria-hidden="true">/</span><Link href="/excursions">{travelUi.navTitle[language]}</Link></nav>
      <header className="mt-8 border-b border-[#15231d]/20 pb-8">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#8b3e2f]">RentPlaceMD · {regionalUi.plan[language]}</p>
        <h1 className="mt-4 text-balance font-serif text-4xl leading-tight sm:text-6xl">{guide.title[language]}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#526158]">{guide.intro[language]}</p>
      </header>
      <ExcursionRoutePanel path={`/guide/${slug}`} language={language} />
      <ol className="my-8 grid grid-cols-2 gap-3 rounded-2xl bg-[#15231d] p-5 text-white sm:grid-cols-4" aria-label={regionalUi.plan[language]}>
        {guide.stops.map((stop, i) => <li key={`${stop}-${i}`} className="border-l border-[#d9b76e]/50 pl-3"><span className="block text-xs text-[#d9b76e]">0{i + 1}</span><span className="mt-1 block font-serif text-xl">{stop}</span></li>)}
      </ol>
      <div className="max-w-3xl">
        {guide.sections.map((section, i) => <section key={i} className="mt-9"><h2 className="font-serif text-2xl sm:text-3xl">{section.title[language]}</h2><p className="mt-4 text-base leading-8 text-[#33443c]">{section.body[language]}</p></section>)}
      </div>
      <aside className="mt-10 rounded-2xl border border-[#15231d]/20 bg-white/60 p-6 text-sm leading-7"><p>{regionalUi.note[language]}</p></aside>
      <section className="mt-10 grid gap-6 rounded-2xl bg-[#15231d] p-6 text-white sm:grid-cols-[1fr_auto] sm:items-center"><div><h2 className="font-serif text-3xl">{travelUi.stayTitle[language]}</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-white/80">{travelUi.stayText[language]}</p></div><Link href="/apartments" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#FFD21F] px-5 py-3 font-bold text-[#15231d]">{travelUi.apartments[language]} →</Link></section>
      <nav className="mt-8 flex flex-wrap gap-5 text-sm font-bold underline underline-offset-4"><Link href={`/guide/${guide.related}`}>{regionalUi.related[language]}: {related.title[language]}</Link><Link href="/guide/orheiul-vechi">{travelUi.history[language]}</Link><Link href="/events">{travelUi.events[language]}</Link><Link href="/excursions">{travelUi.navTitle[language]}</Link></nav>
    </div>
  </article>;
}
