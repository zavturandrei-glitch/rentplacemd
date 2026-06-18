export default function ApartmentPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f8] text-gray-900">
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d4146f] text-2xl font-black text-white shadow">
              R
            </div>

            <div>
              <p className="text-3xl font-black tracking-tight">
                Rent<span className="text-[#d4146f]">Place</span>
                <span className="text-[#ffd21f]">MD</span>
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                Apartments daily
              </p>
            </div>
          </a>

          <div className="flex flex-col items-end font-black text-[#d4146f]">
            <a href="tel:+37369990190" className="text-xl">
              +373 69 990 190
            </a>
            <a href="tel:+37379990190" className="mt-1 text-xl">
              +373 79 990 190
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <a
          href="/"
          className="mb-6 inline-block text-lg font-black text-[#d4146f]"
        >
          ← Назад ко всем квартирам
        </a>

        <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-5xl font-black text-gray-900">Измаил 88</h1>
              <span className="rounded-full bg-[#d4146f] px-4 py-2 font-black text-white">
                ID 42
              </span>
            </div>

            <p className="mt-3 text-xl text-gray-600">
              Центр • Новострой • 2 спальни + living • До 5 гостей
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <p className="text-5xl font-black text-[#d4146f]">от 1000 лей</p>
            <p className="mt-2 text-gray-500">за сутки</p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <img
            src="/apartments/izmail88-42/1.png"
            alt="Главное фото квартиры ID 42"
            className="h-[550px] w-full rounded-3xl object-cover shadow-lg md:col-span-2"
          />

          <img
            src="/apartments/izmail88-42/2.png"
            alt="Первая спальня квартиры ID 42"
            className="h-[450px] w-full rounded-3xl object-cover shadow-lg"
          />

          <img
            src="/apartments/izmail88-42/3.png"
            alt="Вторая спальня квартиры ID 42"
            className="h-[450px] w-full rounded-3xl object-cover shadow-lg"
          />

          <img
            src="/apartments/izmail88-42/4.png"
            alt="Ванная комната квартиры ID 42"
            className="h-[650px] w-full rounded-3xl bg-white object-contain shadow-lg md:col-span-2"
          />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-8 shadow-lg md:col-span-2">
            <h2 className="text-3xl font-black text-gray-900">О квартире</h2>

            <p className="mt-5 text-lg leading-8 text-gray-700">
              Просторная квартира 2+1 в центре Кишинёва. Две раздельные спальни
              с двуспальными кроватями, большой living с диваном, полностью
              оборудованная кухня, современная ванная комната, кондиционер,
              Wi-Fi и Smart TV. Отличный вариант для семьи, гостей города или
              командировки.
            </p>

            <h2 className="mt-10 text-3xl font-black text-gray-900">
              Спальные места
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-4 text-lg text-gray-800 md:grid-cols-2">
              <p>✓ 2 раздельные спальни</p>
              <p>✓ 2 двуспальные кровати</p>
              <p>✓ Диван в living</p>
              <p>✓ До 5 гостей</p>
            </div>

            <h2 className="mt-10 text-3xl font-black text-gray-900">
              Удобства
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-4 text-lg text-gray-800">
              <p>✓ Wi-Fi</p>
              <p>✓ Smart TV</p>
              <p>✓ Кондиционер</p>
              <p>✓ Стиральная машина</p>
              <p>✓ Холодильник</p>
              <p>✓ Микроволновка</p>
              <p>✓ Чистое бельё</p>
              <p>✓ Заселение 24/7</p>
            </div>

            <h2 className="mt-10 text-3xl font-black text-gray-900">Адрес</h2>

            <p className="mt-4 text-lg text-gray-700">
              ул. Измаил 88, Кишинёв
            </p>
          </div>

          <div className="h-fit rounded-3xl bg-white p-8 shadow-lg md:sticky md:top-28">
            <p className="text-5xl font-black text-[#d4146f]">от 1000 лей</p>
            <p className="mt-2 text-gray-600">за сутки</p>

            <a
              href="tel:+37369990190"
              className="mt-6 block rounded-2xl bg-[#ffd21f] py-4 text-center text-lg font-black text-gray-900"
            >
              Позвонить
            </a>

            <a
              href="viber://chat?number=%2B37369990190"
              className="mt-4 block rounded-2xl bg-purple-600 py-4 text-center text-lg font-black text-white"
            >
              Написать в Viber
            </a>

            <a
              href="https://t.me/rentplacemd"
              target="_blank"
              className="mt-4 block rounded-2xl bg-[#d4146f] py-4 text-center text-lg font-black text-white"
            >
              Telegram
            </a>

            <div className="mt-6 rounded-2xl bg-gray-100 p-4 text-center">
              <p className="font-bold text-gray-700">
                Быстро проверим свободна ли квартира
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}