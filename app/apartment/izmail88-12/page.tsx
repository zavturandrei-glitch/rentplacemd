export default function ApartmentPage() {
  const images = [
    "/apartments/izmail88-12/1.png",
    "/apartments/izmail88-12/2.png",
    "/apartments/izmail88-12/3.png",
    "/apartments/izmail88-12/4.png",
  ];

  const facadePhoto = "/common/building.png";

  const galleryImages = [images[1], images[2], images[3], images[0]];

  return (
    <main className="min-h-screen bg-[#f4f1ee] text-[#111827]">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#d4146f] text-xl font-black text-white shadow-lg">
              R
            </div>

            <div className="min-w-0">
              <p className="text-xl font-black leading-none sm:text-3xl">
                Rent<span className="text-[#d4146f]">Place</span>
                <span className="text-[#ffb800]">MD</span>
              </p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.24em] text-gray-500 sm:text-xs">
                Apartments Daily
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="rounded-2xl bg-[#f4f1ee] px-5 py-3 text-right font-black text-[#d4146f]">
              <a href="tel:+37369990190" className="block text-sm">
                +373 69 990 190
              </a>
              <a href="tel:+37379990190" className="mt-1 block text-sm">
                +373 79 990 190
              </a>
            </div>

            <a
              href="https://wa.me/37369990190?text=Здравствуйте! Интересует квартира Измаил 88, ID 12"
              target="_blank"
              className="rounded-2xl bg-[#25D366] px-5 py-4 text-sm font-black text-white"
            >
              WhatsApp
            </a>

            <a
              href="viber://chat?number=%2B37369990190"
              className="rounded-2xl bg-purple-700 px-5 py-4 text-sm font-black text-white"
            >
              Viber
            </a>
          </div>

          <a
            href="tel:+37369990190"
            className="rounded-2xl bg-[#d4146f] px-4 py-3 text-sm font-black text-white lg:hidden"
          >
            Звонок
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-14 lg:pt-8">
        <a
          href="/"
          className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-[#d4146f] shadow-sm"
        >
          ← Назад ко всем квартирам
        </a>

        <div className="overflow-hidden rounded-[34px] bg-[#111827] shadow-2xl">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col justify-center p-6 text-white sm:p-9 lg:p-10">
              <div className="mb-5 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-black">
                  ID 12
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-black">
                  1+1 квартира
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-black">
                  До 3 гостей
                </span>
              </div>

              <h1 className="text-5xl font-black leading-tight sm:text-7xl">
                Измаил 88
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">
                Уютная квартира в центре Кишинёва. Подходит для размещения до 3
                гостей. Есть спальная зона, кухня и всё необходимое для
                комфортного проживания.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl bg-white p-5 text-[#111827]">
                  <p className="text-4xl font-black text-[#d4146f]">800</p>
                  <p className="font-bold text-gray-500">лей / сутки</p>
                </div>

                <a
                  href="https://wa.me/37369990190?text=Здравствуйте! Интересует квартира Измаил 88, ID 12"
                  target="_blank"
                  className="flex items-center justify-center rounded-3xl bg-[#25D366] p-5 text-center text-lg font-black text-white"
                >
                  Проверить свободна
                </a>

                <a
                  href="tel:+37369990190"
                  className="flex items-center justify-center rounded-3xl bg-[#ffb800] p-5 text-center text-lg font-black text-[#111827]"
                >
                  Позвонить
                </a>
              </div>
            </div>

            <div className="relative h-[360px] overflow-hidden sm:h-[520px] lg:h-[590px]">
              <img
                src={images[0]}
                alt="Квартира Измаил 88 ID 12"
                className="h-full w-full object-cover object-[center_45%]"
              />
              <div className="absolute bottom-5 left-5 rounded-3xl bg-white/90 px-5 py-4 shadow-xl backdrop-blur">
                <p className="text-sm font-bold text-gray-500">1+1 квартира</p>
                <p className="text-xl font-black text-[#111827]">
                  До 3 гостей
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-8">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#d4146f]">
            Фото
          </p>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            Галерея квартиры
          </h2>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[32px] bg-white p-2 shadow-lg">
              <img
                src={images[0]}
                alt="Главное фото ID 12"
                className="h-[340px] w-full rounded-[26px] object-cover object-[center_45%] sm:h-[560px] lg:h-[760px]"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {galleryImages.map((image, index) => (
                <div
                  key={image}
                  className="overflow-hidden rounded-[32px] bg-white p-2 shadow-lg"
                >
                  <img
                    src={image}
                    alt={`Фото квартиры ID 12 ${index + 1}`}
                    loading="lazy"
                    className="h-[240px] w-full rounded-[26px] object-cover object-center sm:h-[260px] lg:h-[250px]"
                  />
                </div>
              ))}

              <div className="overflow-hidden rounded-[32px] bg-white p-2 shadow-lg sm:col-span-2">
                <img
                  src={facadePhoto}
                  alt="Фасад дома Измаил 88"
                  loading="lazy"
                  className="h-[260px] w-full rounded-[26px] object-cover object-center lg:h-[224px]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[36px] bg-white p-6 shadow-lg sm:p-9 lg:col-span-2">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#d4146f]">
              О квартире
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Удобный вариант до 3 гостей
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-700">
              Уютная квартира в центре Кишинёва, комплекс Измаил 88. В квартире
              есть спальная зона, кухня, чистое бельё, Wi-Fi, TV, кондиционер и
              всё необходимое для комфортного проживания.
            </p>

            <p className="mt-5 text-lg leading-8 text-gray-700">
              Хорошо подходит для пары, небольшой семьи или гостей в
              командировке. Удобная локация в центре города, рядом магазины,
              транспорт и всё необходимое.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "1+1 планировка",
                "До 3 гостей",
                "Спальная зона",
                "Дополнительное место",
                "Wi-Fi",
                "TV",
                "Кондиционер",
                "Кухня",
                "Чистое бельё",
                "Душ",
                "Парковка рядом",
                "Заселение 24/7",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-[#f4f1ee] px-5 py-4 font-black text-gray-800"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[36px] bg-[#d4146f] p-6 text-white shadow-xl sm:p-8 lg:sticky lg:top-28 lg:h-fit">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-white/70">
              Бронирование
            </p>

            <p className="mt-4 text-6xl font-black">800</p>
            <p className="text-lg font-bold text-white/80">лей за сутки</p>

            <div className="mt-6 space-y-3">
              <a
                href="https://wa.me/37369990190?text=Здравствуйте! Интересует квартира Измаил 88, ID 12"
                target="_blank"
                className="block rounded-2xl bg-white py-4 text-center text-lg font-black text-[#d4146f]"
              >
                WhatsApp
              </a>

              <a
                href="tel:+37369990190"
                className="block rounded-2xl bg-[#ffb800] py-4 text-center text-lg font-black text-[#111827]"
              >
                Позвонить
              </a>

              <a
                href="viber://chat?number=%2B37369990190"
                className="block rounded-2xl bg-purple-700 py-4 text-center text-lg font-black text-white"
              >
                Viber
              </a>
            </div>

            <p className="mt-6 rounded-2xl bg-white/10 p-4 text-center font-bold text-white/85">
              Напишите даты и количество гостей — быстро проверим свободна ли
              квартира.
            </p>
          </aside>
        </section>
      </section>

      <footer className="bg-[#111827] px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-3xl font-black">
              Rent<span className="text-[#d4146f]">Place</span>
              <span className="text-[#ffb800]">MD</span>
            </p>
            <p className="mt-2 text-white/60">
              Квартиры посуточно в Кишинёве • Центр • Заселение 24/7
            </p>
          </div>

          <div className="text-lg font-black">
            <a href="tel:+37369990190" className="block">
              +373 69 990 190
            </a>
            <a href="tel:+37379990190" className="mt-1 block">
              +373 79 990 190
            </a>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-4 left-4 right-4 z-50 grid grid-cols-2 gap-3 lg:hidden">
        <a
          href="https://wa.me/37369990190?text=Здравствуйте! Интересует квартира Измаил 88, ID 12"
          target="_blank"
          className="rounded-2xl bg-[#25D366] py-4 text-center text-base font-black text-white shadow-2xl"
        >
          WhatsApp
        </a>

        <a
          href="tel:+37369990190"
          className="rounded-2xl bg-[#d4146f] py-4 text-center text-base font-black text-white shadow-2xl"
        >
          Позвонить
        </a>
      </div>
    </main>
  );
}