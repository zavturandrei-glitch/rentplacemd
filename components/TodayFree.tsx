const apartments = [
  {
    id: 20,
    title: "Измаил 88",
    info: "2+1 • Центр города",
    price: "от 800 лей",
    image: "/apartments/izmail88-20/4.png",
    link: "/apartment/izmail88-20",
  },
  {
    id: 13,
    title: "Измаил 88",
    info: "2+1 • 2 спальни • Центр",
    price: "от 900 лей",
    image: "/apartments/izmail88-13/4.png",
    link: "/apartment/izmail88-13",
  },
  {
    id: 42,
    title: "Измаил 88",
    info: "2+1 • 2 спальни • Центр",
    price: "от 1000 лей",
    image: "/apartments/izmail88-42/1.png",
    link: "/apartment/izmail88-42",
  },
];

export default function TodayFree() {
  return (
    <section className="bg-[#fffaf0] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-5xl font-black text-[#d4146f]">
              Свободно сегодня
            </h2>
            <p className="mt-4 max-w-3xl text-xl font-bold text-gray-800">
              Актуальные квартиры посуточно в Кишинёве. Уточняйте свободные
              даты по телефону или через мессенджер.
            </p>
          </div>

          <a
            href="tel:+37369990190"
            className="rounded-3xl bg-[#d4146f] px-10 py-6 text-center text-xl font-black text-white shadow-lg"
          >
            Уточнить свободные даты
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {apartments.map((apartment) => (
            <a
              key={apartment.id}
              href={apartment.link}
              className="overflow-hidden rounded-[2rem] bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative h-[260px]">
                <img
                  src={apartment.image}
                  alt={`Квартира ID ${apartment.id}`}
                  className="h-full w-full object-cover"
                />

                <div className="absolute left-6 top-6 rounded-full bg-[#ffd21f] px-7 py-4 text-xl font-black text-gray-900 shadow">
                  ID {apartment.id}
                </div>
              </div>

              <div className="p-6">
                <div className="rounded-3xl bg-white p-6 shadow-lg">
                  <h3 className="text-3xl font-black text-gray-900">
                    {apartment.title}
                  </h3>
                  <p className="mt-3 text-lg font-bold text-gray-600">
                    {apartment.info}
                  </p>
                </div>

                <div className="mt-8 flex items-end justify-between gap-4">
                  <p className="text-5xl font-black leading-none text-[#d4146f]">
                    {apartment.price}
                  </p>

                  <span className="rounded-2xl bg-[#061024] px-7 py-4 text-lg font-black text-white">
                    Подробнее
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}