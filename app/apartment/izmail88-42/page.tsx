export default function ApartmentPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f8] text-gray-900">
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">
          <a href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#d4146f] text-white flex items-center justify-center font-black text-2xl shadow">
              R
            </div>

            <div>
              <p className="text-3xl font-black tracking-tight">
                Rent<span className="text-[#d4146f]">Place</span>
                <span className="text-[#ffd21f]">MD</span>
              </p>
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500 font-semibold">
                Apartments daily
              </p>
            </div>
          </a>

          <div className="flex flex-col items-end font-black text-[#d4146f]">
            <a href="tel:+37369990190" className="text-xl">+373 69 990 190</a>
            <a href="tel:+37379990190" className="text-xl mt-1">+373 79 990 190</a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <a href="/" className="inline-block mb-6 text-[#d4146f] font-black text-lg">
          ← Назад ко всем квартирам
        </a>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-5xl font-black text-gray-900">Измаил 88</h1>
              <span className="bg-[#d4146f] text-white px-4 py-2 rounded-full font-black">
                ID 42
              </span>
            </div>

            <p className="mt-3 text-xl text-gray-600">
              Центр • Новострой • 2 спальни + ливинг • До 6 гостей
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <p className="text-5xl font-black text-[#d4146f]">60 €</p>
            <p className="text-gray-500 mt-2">за сутки</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <img src="/apartments/izmail88-20/spalinea.png" alt="Спальня" className="w-full h-[450px] object-cover rounded-3xl shadow-lg" />
          <img src="/apartments/izmail88-20/living.png" alt="Ливинг" className="w-full h-[450px] object-cover rounded-3xl shadow-lg" />
          <img src="/apartments/izmail88-20/living2.png" alt="Вторая спальня" className="w-full h-[450px] object-cover rounded-3xl shadow-lg" />
          <img src="/apartments/izmail88-20/kuhnea.png" alt="Кухня" className="w-full h-[450px] object-cover rounded-3xl shadow-lg" />
          <img src="/apartments/izmail88-20/vana.png" alt="Ванная" className="w-full h-[550px] object-cover rounded-3xl shadow-lg md:col-span-2" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="md:col-span-2 bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-3xl font-black text-gray-900">
              О квартире
            </h2>

            <p className="mt-5 text-lg text-gray-700 leading-8">
              Просторная квартира на 11 этаже в доме Измаил 88. В квартире две
              отдельные спальни с двуспальными кроватями, ливинг с диваном,
              современный ремонт, чистое бельё и всё необходимое для комфортного
              проживания до 6 гостей.
            </p>

            <h2 className="text-3xl font-black text-gray-900 mt-10">
              Удобства
            </h2>

            <div className="grid grid-cols-2 gap-4 mt-5 text-lg text-gray-800">
              <p>✓ 2 отдельные спальни</p>
              <p>✓ Диван в ливинге</p>
              <p>✓ Wi-Fi</p>
              <p>✓ Smart TV</p>
              <p>✓ Кондиционер</p>
              <p>✓ Стиральная машина</p>
              <p>✓ Чистое бельё</p>
              <p>✓ Заселение 24/7</p>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-10">
              Адрес
            </h2>

            <p className="mt-4 text-lg text-gray-700">
              ул. Измаил 88, Кишинёв • 1 подъезд • 11 этаж
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 h-fit sticky top-28">
            <p className="text-5xl font-black text-[#d4146f]">60 €</p>
            <p className="text-gray-600 mt-2">за сутки</p>

            <a href="tel:+37369990190" className="block text-center mt-6 bg-[#ffd21f] text-gray-900 py-4 rounded-2xl font-black text-lg">
              Позвонить
            </a>

            <a href="viber://chat?number=%2B37369990190" className="block text-center mt-4 bg-purple-600 text-white py-4 rounded-2xl font-black text-lg">
              Написать в Viber
            </a>

            <a href="https://t.me/" target="_blank" className="block text-center mt-4 bg-[#d4146f] text-white py-4 rounded-2xl font-black text-lg">
              Telegram
            </a>

            <div className="mt-6 p-4 bg-gray-100 rounded-2xl text-center">
              <p className="font-bold text-gray-700">
                Если эта квартира занята — предложим другую в этом же доме
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}