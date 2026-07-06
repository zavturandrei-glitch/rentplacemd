const cards = [
  {
    icon: "🏠",
    title: "О нас",
    text: "Настоящие квартиры, реальные фотографии и быстрое заселение в центре Кишинёва.",
  },
  {
    icon: "🔑",
    title: "Все квартиры",
    text: "Посмотрите весь каталог свободных квартир RentPlaceMD.",
    href: "#today-free",
  },
  {
    icon: "📋",
    title: "Правила заселения",
    text: "Заезд, выезд, оплата, документы и простые правила проживания.",
  },
  {
    icon: "🚘",
    title: "Трансферы",
    text: "Трансфер из аэропорта к квартире от 19.99 €.",
  },
  {
    icon: "✨",
    title: "Почему выбирают нас",
    text: "Центр города, быстрый ответ, чистые квартиры и поддержка 24/7.",
    featured: true,
  },
];

const mapUrl =
  "https://www.google.com/maps?q=Izmail%2088%2C%20Chi%C8%99in%C4%83u%2C%20Moldova&output=embed";
const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Izmail%2088%2C%20Chi%C8%99in%C4%83u%2C%20Moldova";

export default function HomeAfterCatalog() {
  return (
    <section
      id="guest-essentials"
      className="overflow-hidden bg-[#fffaf0] px-4 py-14 sm:px-6 sm:py-18 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[32px] border border-[#f3dfbd] bg-[linear-gradient(135deg,#fffefb_0%,#fff6df_48%,#fff0c7_100%)] p-5 shadow-[0_28px_90px_rgba(79,47,0,0.12)] sm:p-8 lg:p-10">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#ffd21f]/35 blur-3xl" />
          <div className="absolute -left-10 bottom-20 h-44 w-44 rounded-full bg-[#d4146f]/10 blur-3xl" />

          <div className="relative">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[#d4146f] shadow-sm ring-1 ring-[#f0dfbd]">
                RentPlaceMD
              </p>
              <h2 className="mt-5 text-3xl font-black leading-tight text-[#07111f] sm:text-5xl">
                Всё, что нужно гостю
              </h2>
              <p className="mt-4 text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-8">
                Быстрая навигация по RentPlaceMD: квартиры, правила, трансфер и локация.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
              {cards.map((card) => {
                const content = (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#ffd21f,#ffb800)] text-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_14px_28px_rgba(255,184,0,0.22)] ring-1 ring-white/70">
                        {card.icon}
                      </span>
                      {card.href ? (
                        <span className="rounded-full bg-[#07111f] px-3 py-1 text-xs font-black text-white shadow-sm">
                          Перейти
                        </span>
                      ) : null}
                    </div>
                    <h3 className={card.featured ? "mt-5 text-xl font-black leading-tight text-white" : "mt-5 text-xl font-black leading-tight text-[#07111f]"}>
                      {card.title}
                    </h3>
                    <p className={card.featured ? "mt-3 text-sm font-semibold leading-6 text-white/72 sm:text-base sm:leading-7" : "mt-3 text-sm font-semibold leading-6 text-slate-600 sm:text-base sm:leading-7"}>
                      {card.text}
                    </p>
                  </>
                );
                const className = card.featured
                  ? "group rounded-[26px] border border-[#f2dfb8] bg-[#07111f] p-5 text-white shadow-[0_22px_55px_rgba(7,17,31,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(7,17,31,0.24)] md:col-span-2 xl:col-span-2 xl:col-start-3"
                  : "group rounded-[26px] border border-white/80 bg-white/85 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.08)] ring-1 ring-[#f1e6d4] transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_22px_60px_rgba(15,23,42,0.12)] xl:col-span-3";

                if (card.href) {
                  return (
                    <a key={card.title} href={card.href} className={className}>
                      {content}
                    </a>
                  );
                }

                return (
                  <article key={card.title} className={className}>
                    {content}
                  </article>
                );
              })}
            </div>

            <section
              aria-labelledby="home-location-title"
              className="mt-6 overflow-hidden rounded-[30px] border border-[#f0dfbf] bg-[#fffefb] shadow-[0_20px_60px_rgba(15,23,42,0.09)]"
            >
              <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-5 sm:p-7 lg:p-8">
                  <span className="inline-flex rounded-full bg-[#d4146f]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#d4146f]">
                    Локация
                  </span>
                  <h2
                    id="home-location-title"
                    className="mt-5 text-2xl font-black leading-tight text-[#07111f] sm:text-4xl"
                  >
                    Мы находимся в центре Кишинёва
                  </h2>
                  <p className="mt-4 text-base font-semibold leading-7 text-slate-600 sm:text-lg">
                    Основная локация RentPlaceMD — Измаил 88, удобный район рядом с центром
                    города.
                  </p>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[#d4146f] px-6 py-4 text-center text-base font-black text-white shadow-lg shadow-pink-700/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#bd0f60] sm:w-auto"
                  >
                    Построить маршрут
                  </a>
                </div>

                <div className="min-h-[320px] border-t border-[#f0dfbf] bg-[#f7efe3] lg:border-l lg:border-t-0">
                  <iframe
                    title="RentPlaceMD на карте: Измаил 88, Chișinău, Moldova"
                    src={mapUrl}
                    className="h-[320px] w-full sm:h-[380px] lg:h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
