export default function TodayFree() {
  const apartments = [
    {
      id: "20",
      title: "Измаил 88",
      type: "2+1 • Центр города",
      price: "от 800 лей",
      image: "/apartments/izmail88-20/2.png",
      link: "/apartment/izmail88-20",
    },
    {
      id: "42",
      title: "Измаил 88",
      type: "1+1 • Центр города",
      price: "от 800 лей",
      image: "/apartments/izmail88-20/3.png",
      link: "/apartment/izmail88-42",
    },
    {
      id: "13",
      title: "Измаил 88",
      type: "2+1 • 2 спальни • Центр",
      price: "от 900 лей",
      image: "/apartments/izmail88-13/2.png",
      link: "/apartment/izmail88-13",
    },
  ];

  return (
    <section
      id="today-free"
      className="bg-gradient-to-b from-[#fff7e6] via-white to-[#fff0f6] px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#d4146f]">
              RentPlaceMD
            </p>

            <h2 className="text-4xl font-black tracking-tight text-[#d4146f] sm:text-5xl">
              Свободно сегодня
            </h2>

            <p className="mt-4 max-w-3xl text-lg font-bold leading-7 text-gray-700">
              Актуальные квартиры посуточно в Кишинёве. Уточняйте свободные
              даты по телефону или через мессенджер.
            </p>
          </div>

          <a
            href="tel:+37369990190"
            className="rounded-2xl bg-[#d4146f] px-8 py-5 text-center text-lg font-black text-white shadow-xl transition hover:-translate-y-1 hover:scale-105"
          >
            Уточнить свободные даты
          </a>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {apartments.map((apartment) => (
            <a
              key={apartment.id}
              href={apartment.link}
              className="group block overflow-hidden rounded-[2rem] bg-[#fffdf8] shadow-2xl ring-1 ring-black/5 transition hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(212,20,111,0.18)]"
            >
              <div className="relative h-64 overflow-hidden bg-[#f1f5f9]">
                <img
                  src={apartment.image}
                  alt={apartment.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute left-5 top-5 rounded-full bg-[#ffd21f] px-5 py-3 text-lg font-black text-black shadow-lg">
                  ID {apartment.id}
                </div>
              </div>

              <div className="p-6">
                <div className="rounded-3xl bg-white p-5 shadow-md">
                  <h3 className="text-2xl font-black text-gray-950">
                    {apartment.title}
                  </h3>

                  <p className="mt-2 text-base font-bold text-gray-600">
                    {apartment.type}
                  </p>
                </div>

                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-4xl font-black text-[#d4146f]">
                      {apartment.price}
                    </p>

                    <p className="mt-4 text-base font-bold text-gray-600">
                      Заселение 24/7
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#020617] px-6 py-4 text-base font-black text-white shadow-lg transition group-hover:scale-105">
                    Подробнее
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}