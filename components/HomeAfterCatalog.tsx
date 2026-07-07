import Image from "next/image";

const contactPhone = "+37369990190";
const displayPhone = "+373 69 990 190";
const telegramUrl = "https://t.me/rentplacemd";

function whatsappUrl(message: string) {
  return "https://wa.me/37369990190?text=" + encodeURIComponent(message);
}

const cards = [
  {
    title: "О нас",
    eyebrow: "RentPlaceMD",
    text: "Реальные квартиры в комплексе Измаил 88, проверенные фото и сопровождение гостя до заселения.",
    href: "#about",
    image: "/apartments/izmail88-5/D4S_2602.jpg",
    alt: "Светлая квартира RentPlaceMD в комплексе Измаил 88",
    position: "50% 48%",
  },
  {
    title: "Все квартиры",
    eyebrow: "Каталог",
    text: "Студии и квартиры с актуальными ценами, вместимостью, фото и быстрым переходом к деталям.",
    href: "#apartments",
    image: "/apartments/izmail88-3/D4S_2531.jpg",
    alt: "Интерьер квартиры RentPlaceMD в комплексе Измаил 88",
    position: "50% 52%",
  },
  {
    title: "Правила заселения",
    eyebrow: "Заезд 24/7",
    text: "Время заезда и выезда, документы, оплата и правила проживания в одном понятном разделе.",
    href: "#check-in-rules",
    image: "/guest-essentials/check-in-keys.png",
    alt: "Ключи у современной двери квартиры",
    position: "64% 50%",
  },
  {
    title: "Трансферы",
    eyebrow: "Аэропорт",
    text: "Встреча в аэропорту Кишинёва, помощь с багажом и доставка прямо к квартире.",
    href: "#transfers",
    image: "/guest-essentials/airport-transfer.png",
    alt: "Современный автомобиль возле аэропорта",
    position: "58% 50%",
  },
  {
    title: "Почему выбирают нас",
    eyebrow: "Сервис",
    text: "Центр города, реальные квартиры, быстрый ответ, чистота и поддержка на протяжении проживания.",
    href: "#why-us",
    image: "/common/building.png",
    alt: "Комплекс Измаил 88 в центре Кишинёва",
    position: "50% 58%",
  },
];

const checkInRules = [
  { title: "Заезд", text: "с 14:00" },
  { title: "Выезд", text: "до 12:00" },
  { title: "Оплата", text: "при заселении" },
  { title: "Документы", text: "заселение по документу" },
  { title: "Правила проживания", text: "курение только на балконе или в разрешённых местах" },
  { title: "Поддержка 24/7", text: "связь с RentPlaceMD в течение проживания" },
];

const transferHighlights = [
  "Трансфер из аэропорта Кишинёва до квартиры",
  "Встреча в аэропорту",
  "Помощь с багажом",
  "Доставка по адресу проживания",
  "Возможность предварительного заказа",
  "Удобно при позднем прилёте",
];

const whyUs = [
  {
    title: "Реальные квартиры",
    text: "Показываем настоящие фотографии объектов и заранее уточняем детали проживания.",
  },
  {
    title: "Центр Кишинёва",
    text: "Основная локация RentPlaceMD — Измаил 88, удобный район рядом с центром города.",
  },
  {
    title: "Быстрое заселение",
    text: "Согласуем время, оплату и документы до приезда, чтобы не тратить время на месте.",
  },
  {
    title: "Поддержка 24/7",
    text: "Остаёмся на связи в WhatsApp, Viber, Telegram и по телефону.",
  },
];

const mapUrl =
  "https://www.google.com/maps?q=Izmail%2088%2C%20Chi%C8%99in%C4%83u%2C%20Moldova&output=embed";
const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Izmail%2088%2C%20Chi%C8%99in%C4%83u%2C%20Moldova";

export default function HomeAfterCatalog() {
  const rulesMessage = "Здравствуйте! Хочу уточнить правила заселения RentPlaceMD.";
  const transferMessage = "Здравствуйте! Интересует трансфер из аэропорта Кишинёва к квартире.";

  return (
    <section
      id="guest-essentials"
      className="overflow-hidden bg-[#fffaf0] px-4 py-14 sm:px-6 sm:py-18 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[#d4146f] shadow-sm ring-1 ring-[#f0dfbd]">
              RentPlaceMD
            </p>
            <h2 className="mt-5 text-3xl font-black leading-tight text-[#07111f] sm:text-5xl">
              Всё, что нужно гостю
            </h2>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-8">
              Навигация по ключевым сервисам: квартиры, правила, трансфер, локация и преимущества RentPlaceMD.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {cards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_18px_48px_rgba(15,23,42,0.08)] ring-1 ring-[#f1e6d4] transition duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-[0_28px_76px_rgba(15,23,42,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4146f]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#f4f1ee]">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 1280px) 20vw, (min-width: 768px) 50vw, 100vw"
                    quality={75}
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.055]"
                    style={{ objectPosition: card.position }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07111f]/55 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#d4146f] shadow-sm ring-1 ring-white/70 backdrop-blur">
                    {card.eyebrow}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-xl font-black leading-tight text-[#07111f]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                    {card.text}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <section
            id="about"
            aria-labelledby="about-title"
            className="mt-8 scroll-mt-32 overflow-hidden rounded-[30px] border border-[#f0dfbf] bg-[#fffefb] shadow-[0_20px_60px_rgba(15,23,42,0.09)] lg:scroll-mt-24"
          >
            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="p-5 sm:p-7 lg:p-8">
                <span className="inline-flex rounded-full bg-[#d4146f]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#d4146f]">
                  О нас
                </span>
                <h2
                  id="about-title"
                  className="mt-5 text-2xl font-black leading-tight text-[#07111f] sm:text-4xl"
                >
                  RentPlaceMD — квартиры посуточно в центре Кишинёва
                </h2>
                <p className="mt-4 text-base font-semibold leading-7 text-slate-600 sm:text-lg">
                  Работаем с реальными квартирами в комплексе Измаил 88, заранее показываем актуальные фото и помогаем гостю быстро выбрать подходящий вариант.
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

          <section
            id="check-in-rules"
            aria-labelledby="check-in-rules-title"
            className="mt-8 scroll-mt-32 rounded-[30px] border border-[#f0dfbf] bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-7 lg:scroll-mt-24 lg:p-8"
          >
            <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <span className="inline-flex rounded-full bg-[#ffd21f]/45 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#07111f]">
                  Правила заселения
                </span>
                <h2 id="check-in-rules-title" className="mt-5 text-2xl font-black leading-tight text-[#07111f] sm:text-4xl">
                  Всё понятно до приезда
                </h2>
                <p className="mt-4 text-base font-semibold leading-7 text-slate-600 sm:text-lg">
                  Если нужен ранний заезд или поздний выезд — сообщите заранее. Если квартира свободна, мы постараемся пойти навстречу.
                </p>
                <a
                  href={whatsappUrl(rulesMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[#07111f] px-6 py-4 text-center text-base font-black text-white shadow-lg shadow-slate-900/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[#d4146f] sm:w-auto"
                >
                  Уточнить правила
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {checkInRules.map((rule) => (
                  <article key={rule.title} className="rounded-[22px] border border-[#f1e6d4] bg-[#fffaf0] p-5 shadow-sm shadow-black/5">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d4146f]">
                      {rule.title}
                    </p>
                    <p className="mt-2 text-lg font-black leading-snug text-[#07111f]">
                      {rule.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            id="transfers"
            aria-labelledby="transfers-title"
            className="mt-8 scroll-mt-32 overflow-hidden rounded-[30px] bg-[#07111f] text-white shadow-[0_28px_80px_rgba(7,17,31,0.22)] lg:scroll-mt-24"
          >
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[260px] overflow-hidden lg:min-h-full">
                <Image
                  src="/guest-essentials/airport-transfer.png"
                  alt="Современный автомобиль возле аэропорта"
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  quality={75}
                  className="object-cover"
                  style={{ objectPosition: "58% 50%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07111f]/15 via-transparent to-[#07111f]/55 lg:bg-gradient-to-r" />
                <div className="absolute left-5 top-5 rounded-full bg-white/92 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#d4146f] shadow-sm backdrop-blur">
                  от 19.99 €
                </div>
              </div>

              <div className="p-5 sm:p-7 lg:p-8">
                <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#ffd21f] ring-1 ring-white/10">
                  Трансфер
                </span>
                <h2 id="transfers-title" className="mt-5 text-2xl font-black leading-tight sm:text-4xl">
                  Из аэропорта Кишинёва — прямо к квартире
                </h2>
                <p className="mt-4 text-base font-semibold leading-7 text-white/72 sm:text-lg">
                  Удобно при позднем прилёте, с багажом или если хочется заранее согласовать спокойную дорогу до адреса проживания.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {transferHighlights.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-black leading-5 text-white/88">
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <a href={whatsappUrl(transferMessage)} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-[#25D366] px-5 py-4 text-center text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:brightness-110">
                    WhatsApp
                  </a>
                  <a href={"viber://chat?number=%2B" + contactPhone.slice(1)} className="rounded-2xl bg-[#7360F2] px-5 py-4 text-center text-sm font-black text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:brightness-110">
                    Viber
                  </a>
                  <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-[#229ED9] px-5 py-4 text-center text-sm font-black text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:brightness-110">
                    Telegram
                  </a>
                  <a href={"tel:" + contactPhone} className="rounded-2xl bg-white px-5 py-4 text-center text-sm font-black text-[#07111f] shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-[#ffd21f]">
                    Позвонить {displayPhone}
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section
            id="why-us"
            aria-labelledby="why-us-title"
            className="mt-8 scroll-mt-32 rounded-[30px] border border-[#f0dfbf] bg-[#fffefb] p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-7 lg:scroll-mt-24 lg:p-8"
          >
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full bg-[#d4146f]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#d4146f]">
                Почему выбирают нас
              </span>
              <h2 id="why-us-title" className="mt-5 text-2xl font-black leading-tight text-[#07111f] sm:text-4xl">
                Сервис, который чувствуется до заселения
              </h2>
              <p className="mt-4 text-base font-semibold leading-7 text-slate-600 sm:text-lg">
                RentPlaceMD делает короткую аренду понятной: без лишних шагов, с быстрым ответом и аккуратными квартирами в центре города.
              </p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {whyUs.map((item) => (
                <article key={item.title} className="rounded-[24px] border border-[#f1e6d4] bg-white p-5 shadow-sm shadow-black/5">
                  <h3 className="text-lg font-black text-[#07111f]">{item.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{item.text}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
