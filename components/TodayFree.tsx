const apartments = [
  {
    id: "20",
    title: "Измаил 88",
    type: "2+1",
    price: "от 800 лей",
    href: "/apartment/izmail88-20",
  },
  {
    id: "42",
    title: "Измаил 88",
    type: "1+1",
    price: "от 800 лей",
    href: "#",
  },
  {
    id: "13",
    title: "Измаил 88",
    type: "2+1",
    price: "от 800 лей",
    href: "#",
  },
];

export default function TodayFree() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
        <div>
          <p className="text-[#d4146f] font-black uppercase tracking-widest">
            RentPlaceMD
          </p>
          <h2 className="text-4xl md:text-5xl font-black mt-2">
            Свободно сегодня
          </h2>
          <p className="text-gray-600 font-semibold mt-3 text-lg">
            Актуальные квартиры посуточно в Кишинёве. Уточняйте свободные даты по телефону.
          </p>
        </div>

        <a
          href="tel:+37369990190"
          className="bg-[#d4146f] text-white px-7 py-4 rounded-2xl font-black shadow-xl text-center"
        >
          Позвонить и уточнить
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {apartments.map((apartment) => (
          <a
            key={apartment.id}
            href={apartment.href}
            className="group bg-white rounded-[32px] overflow-hidden shadow-xl border border-gray-100 hover:-translate-y-1 transition"
          >
            <div className="h-56 bg-gradient-to-br from-gray-200 to-gray-100 relative">
              <div className="absolute top-5 left-5 bg-[#ffd21f] text-gray-950 font-black px-4 py-2 rounded-full shadow">
                ID {apartment.id}
              </div>

              <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow">
                <p className="font-black text-2xl">{apartment.title}</p>
                <p className="text-gray-600 font-bold mt-1">
                  {apartment.type} • Центр города
                </p>
              </div>
            </div>

            <div className="p-6">
              <p className="text-3xl font-black text-[#d4146f]">
                {apartment.price}
              </p>

              <div className="mt-5 flex items-center justify-between gap-4">
                <span className="text-gray-500 font-bold">
                  Заселение 24/7
                </span>

                <span className="bg-gray-950 text-white px-5 py-3 rounded-2xl font-black group-hover:bg-[#d4146f] transition">
                  Подробнее
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}