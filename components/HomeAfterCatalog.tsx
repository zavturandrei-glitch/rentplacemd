import Image from "next/image";

const cards = [
  {
    title: "О нас",
    eyebrow: "RentPlaceMD",
    text: "Реальные квартиры в комплексе Измаил 88, проверенные фотографии и сопровождение гостя от первого сообщения до заселения.",
    href: "#home-location-title",
    image: "/common/building.png",
    alt: "Комплекс Измаил 88 в центре Кишинёва",
    position: "50% 58%",
  },
  {
    title: "Все квартиры",
    eyebrow: "Каталог",
    text: "Подберите студию или квартиру нужного формата: актуальные цены, вместимость, фото и быстрый переход к деталям.",
    href: "#today-free",
    image: "/apartments/izmail88-7/D4S_2562.jpg",
    alt: "Интерьер квартиры RentPlaceMD в комплексе Измаил 88",
    position: "50% 48%",
  },
  {
    title: "Правила заселения",
    eyebrow: "Заезд 24/7",
    text: "Заранее согласуем время, формат оплаты и детали проживания, чтобы приезд прошёл спокойно и без лишних ожиданий.",
    href: "https://wa.me/37369990190?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D1%82%D1%8C%20%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0%20%D0%B7%D0%B0%D1%81%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F%20RentPlaceMD.",
    image: "/guest-essentials/check-in-keys.png",
    alt: "Ключи у современной двери квартиры",
    position: "64% 50%",
    external: true,
  },
  {
    title: "Трансферы",
    eyebrow: "Аэропорт",
    text: "Организуем комфортную встречу в аэропорту и поездку к квартире, если нужен аккуратный старт после перелёта.",
    href: "https://wa.me/37369990190?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%B5%D1%81%D1%83%D0%B5%D1%82%20%D1%82%D1%80%D0%B0%D0%BD%D1%81%D1%84%D0%B5%D1%80%20%D0%B8%D0%B7%20%D0%B0%D1%8D%D1%80%D0%BE%D0%BF%D0%BE%D1%80%D1%82%D0%B0%20%D0%BA%20%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B5.",
    image: "/guest-essentials/airport-transfer.png",
    alt: "Современный автомобиль возле аэропорта",
    position: "58% 50%",
    external: true,
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
        <div className="relative">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[#d4146f] shadow-sm ring-1 ring-[#f0dfbd]">
              RentPlaceMD
            </p>
            <h2 className="mt-5 text-3xl font-black leading-tight text-[#07111f] sm:text-5xl">
              Всё, что нужно гостю
            </h2>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-8">
              Четыре ключевых сервиса RentPlaceMD: проверенные квартиры, понятные условия, спокойное заселение и помощь с дорогой.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener noreferrer" : undefined}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_18px_48px_rgba(15,23,42,0.08)] ring-1 ring-[#f1e6d4] transition duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-[0_28px_76px_rgba(15,23,42,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4146f]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#f4f1ee]">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                    quality={75}
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.055]"
                    style={{ objectPosition: card.position }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07111f]/55 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#d4146f] shadow-sm ring-1 ring-white/70 backdrop-blur">
                    {card.eyebrow}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-xl font-black leading-tight text-[#07111f] sm:text-2xl">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-600 sm:text-[15px] sm:leading-7">
                    {card.text}
                  </p>
                </div>
              </a>
            ))}
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
    </section>
  );
}
