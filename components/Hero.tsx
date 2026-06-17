export default function Hero() {
  return (
    <section className="relative min-h-[760px] pt-32 overflow-hidden">
      <img
        src="/main.jpg"
        alt="Квартиры посуточно в Кишинёве RentPlaceMD"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/55"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/65 to-black/25"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="max-w-5xl text-white">
          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight drop-shadow-2xl">
            Квартиры посуточно
            <br />
            в Кишинёве
          </h1>

          <p className="mt-7 text-2xl md:text-3xl font-black text-white drop-shadow max-w-4xl">
            От 800 лей • Центр города • Заселение 24/7
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-4 shadow-xl">
              <p className="text-sm text-white/70 font-bold">В одном доме</p>
              <p className="text-xl font-black">12 квартир рядом</p>
            </div>

            <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-4 shadow-xl">
              <p className="text-sm text-white/70 font-bold">Цена</p>
              <p className="text-xl font-black">от 800 лей</p>
            </div>

            <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-4 shadow-xl">
              <p className="text-sm text-white/70 font-bold">Связь</p>
              <p className="text-xl font-black">24/7</p>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="tel:+37369990190"
              className="bg-[#ffd21f] text-gray-950 px-9 py-5 rounded-2xl font-black text-lg shadow-2xl hover:scale-105 transition"
            >
              Позвонить сейчас
            </a>

            <a
              href="viber://chat?number=%2B37369990190"
              className="bg-[#d4146f] text-white px-9 py-5 rounded-2xl font-black text-lg shadow-2xl hover:scale-105 transition"
            >
              Написать в Viber
            </a>
          </div>
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-5 grid md:grid-cols-4 gap-4 border border-white/50">
            <input
              type="date"
              className="border border-gray-200 rounded-2xl px-4 py-4 text-gray-700 font-bold outline-none"
            />

            <input
              type="date"
              className="border border-gray-200 rounded-2xl px-4 py-4 text-gray-700 font-bold outline-none"
            />

            <input
              type="number"
              placeholder="Гости"
              className="border border-gray-200 rounded-2xl px-4 py-4 text-gray-700 font-bold outline-none"
            />

            <button className="bg-[#d4146f] text-white px-8 py-4 rounded-2xl font-black shadow-lg">
              Найти
            </button>
          </div>

          <div className="bg-[#ffd21f] rounded-3xl shadow-2xl p-5 border border-white/50">
            <p className="font-black text-gray-950 text-xl">
              Поиск по ID квартиры
            </p>

            <div className="mt-4 flex gap-3">
              <input
                type="text"
                placeholder="Например: 20"
                className="w-full rounded-2xl px-4 py-4 border border-black/10 font-bold outline-none"
              />

              <a
                href="/apartment/izmail88-20"
                className="bg-[#d4146f] text-white px-5 py-4 rounded-2xl font-black"
              >
                OK
              </a>
            </div>

            <p className="mt-3 text-sm font-bold text-gray-700">
              Введите ID из объявления и откройте квартиру.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}