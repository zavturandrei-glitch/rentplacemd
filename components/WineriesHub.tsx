"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { destinationUi, destinations, winerySlugs } from "@/lib/moldovaDestinations";

const copy = {
  title: {
    ru: "Винодельни Молдовы: четыре поездки из Кишинёва",
    ro: "Vinăriile Moldovei: patru excursii din Chișinău",
    en: "Moldova wineries: four trips from Chisinau",
    uk: "Виноробні Молдови: чотири подорожі з Кишинева",
    cs: "Moldavská vinařství: čtyři výlety z Kišiněva",
  },
  intro: {
    ru: "Подземные города, исторические поместья и виноградники юго-востока. Выберите маршрут по времени, атмосфере и расстоянию — актуальные программы всегда проверяйте у винодельни.",
    ro: "Orașe subterane, domenii istorice și podgorii din sud-est. Alege traseul după timp, atmosferă și distanță, iar programele actuale verifică-le la vinărie.",
    en: "Underground towns, historic estates and south-eastern vineyards. Choose by time, atmosphere and distance, then confirm current programmes with the winery.",
    uk: "Підземні міста, історичні маєтки й виноградники південного сходу. Оберіть маршрут за часом, атмосферою та відстанню, а актуальні програми перевірте у виноробні.",
    cs: "Podzemní města, historická panství a vinice jihovýchodu. Vybírejte podle času, atmosféry a vzdálenosti a aktuální program ověřte u vinařství.",
  },
};

export default function WineriesHub() {
  const { language } = useLanguage();
  const featured = destinations.cricova;
  const others = winerySlugs.slice(1);
  const href = (path: string) => `${path}?lang=${language}`;

  return (
    <section className="bg-[#f5f1e8] px-4 pb-20 pt-8 text-[#15231d] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link href={href("/chisinau-guide")} className="text-sm font-bold text-[#8b3e2f]">← {destinationUi.guide[language]}</Link>
        <header className="mt-10 max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b3e2f]">{destinations.cricova.eyebrow[language]}</p>
          <h1 className="mt-4 text-balance font-serif text-5xl leading-[1.02] tracking-[-0.04em] sm:text-7xl">{copy.title[language]}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#415047]">{copy.intro[language]}</p>
        </header>

        <Link href={href(featured.path)} className="group mt-12 grid overflow-hidden bg-[#15231d] text-white lg:grid-cols-[1.25fr_0.75fr]">
          <div className="relative min-h-[360px] lg:min-h-[560px]">
            <Image src={featured.image} alt={featured.title[language]} fill preload sizes="(min-width:1024px) 65vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.02]" />
          </div>
          <div className="flex flex-col justify-end p-7 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f3d5a5]">{featured.location[language]}</p>
            <h2 className="mt-3 font-serif text-4xl">{featured.title[language]}</h2>
            <p className="mt-4 leading-7 text-white/70">{featured.description[language]}</p>
            <span className="mt-7 text-sm font-bold text-[#f3d5a5]">{destinationUi.official[language]} →</span>
          </div>
        </Link>

        <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-3">
          {others.map((slug) => {
            const item = destinations[slug];
            return (
              <Link key={slug} href={href(item.path)} className="group border-t border-[#15231d]/20 pt-5">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={item.image} alt={item.title[language]} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-[#8b3e2f]">{item.tripLength[language]}</p>
                <h2 className="mt-2 font-serif text-3xl leading-tight">{item.title[language]}</h2>
                <p className="mt-3 leading-7 text-[#526158]">{item.description[language]}</p>
              </Link>
            );
          })}
        </div>

        <aside className="mt-14 border-l-4 border-[#8b3e2f] bg-white/70 p-6 text-base leading-7">
          {destinationUi.currentInfo[language]}
        </aside>
      </div>
    </section>
  );
}
