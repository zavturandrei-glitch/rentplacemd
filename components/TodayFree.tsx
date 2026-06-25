const apartments = [
  {
    id: 10,
    title: "Измаил 88",
    info: "1+1 • до 4 гостей • Центр",
    price: "800 лей",
    image: "/apartments/izmail88-10/1.png",
    link: "/apartment/izmail88-10",
  },
  {
    id: 11,
    title: "Измаил 88",
    info: "Студия • до 2 гостей • Центр",
    price: "800 лей",
    image: "/apartments/izmail88-11/1.png",
    link: "/apartment/izmail88-11",
  },
  {
    id: 12,
    title: "Измаил 88",
    info: "1+1 • до 3 гостей • Центр",
    price: "800 лей",
    image: "/apartments/izmail88-12/1.png",
    link: "/apartment/izmail88-12",
  },
  {
    id: 13,
    title: "Измаил 88",
    info: "2+1 • 2 спальни • Центр",
    price: "900 лей",
    image: "/apartments/izmail88-13/4.png",
    link: "/apartment/izmail88-13",
  },
  {
    id: 20,
    title: "Измаил 88",
    info: "1+1 • до 4 гостей • Центр",
    price: "800 лей",
    image: "/apartments/izmail88-20/2.png",
    link: "/apartment/izmail88-20",
  },
  {
    id: 21,
    title: "Измаил 88",
    info: "1+1 • до 3 гостей • Центр",
    price: "800 лей",
    image: "/apartments/izmail88-21/2.png",
    link: "/apartment/izmail88-21",
  },
  {
    id: 22,
    title: "Измаил 88",
    info: "Студия • до 2 гостей • Центр",
    price: "800 лей",
    image: "/apartments/izmail88-22/1.png",
    link: "/apartment/izmail88-22",
  },
  {
    id: 23,
    title: "Измаил 88",
    info: "Студия • до 2 гостей • Центр",
    price: "800 лей",
    image: "/apartments/izmail88-23/1.png",
    link: "/apartment/izmail88-23",
  },
  {
    id: 37,
    title: "Измаил 88",
    info: "1+1 • до 4 гостей • Центр",
    price: "800 лей",
    image: "/apartments/izmail88-37/2.png",
    link: "/apartment/izmail88-37",
  },
  {
    id: 38,
    title: "Измаил 88",
    info: "1+1 • до 4 гостей • Центр",
    price: "800 лей",
    image: "/apartments/izmail88-38/2.png",
    link: "/apartment/izmail88-38",
  },
  {
    id: 42,
    title: "Измаил 88",
    info: "2+1 • до 5 гостей • Центр",
    price: "1000 лей",
    image: "/apartments/izmail88-42/2.png",
    link: "/apartment/izmail88-42",
  },
  {
    id: 371,
    title: "Измаил 88",
    info: "Студия • до 2 гостей • Центр",
    price: "800 лей",
    image: "/apartments/izmail88-371/1.png",
    link: "/apartment/izmail88-371",
  },
];

export default function TodayFree() {
  return (
    <section id="today-free" className="bg-[#fffaf0] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-5xl font-black text-[#d4146f]">
              Все квартиры
            </h2>
            <p className="mt-4 max-w-3xl text-xl font-bold text-gray-800">
              Квартиры посуточно в центре Кишинёва. Выберите подходящий вариант
              и уточните доступность на нужные даты.
            </p>
          </div>

          <a
            href="tel:+37369990190"
            className="rounded-3xl bg-[#d4146f] px-10 py-6 text-center text-xl font-black text-white shadow-lg"
          >
            Уточнить свободные даты
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {apartments.map((apartment) => (
            <a
              key={apartment.id}
              href={apartment.link}
              className="overflow-hidden rounded-[2rem] bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative h-[240px]">
                <img
                  src={apartment.image}
                  alt={`Квартира ID ${apartment.id}`}
                  className="h-full w-full object-cover"
                />

                <div className="absolute left-5 top-5 rounded-full bg-[#ffd21f] px-6 py-3 text-lg font-black text-gray-900 shadow">
                  ID {apartment.id}
                </div>
              </div>

              <div className="p-5">
                <div className="rounded-3xl bg-white p-5 shadow-lg">
                  <h3 className="text-2xl font-black text-gray-900">
                    {apartment.title}
                  </h3>
                  <p className="mt-3 text-base font-bold text-gray-600">
                    {apartment.info}
                  </p>
                </div>

                <div className="mt-7 flex flex-col gap-4">
                  <p className="text-4xl font-black leading-none text-[#d4146f]">
                    {apartment.price}
                  </p>

                  <span className="rounded-2xl bg-[#061024] px-6 py-4 text-center text-base font-black text-white">
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
