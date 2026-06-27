export default function Footer() {
  return (
    <footer className="bg-[#182230] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 pb-28 sm:px-6 lg:px-8 lg:pb-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr_1fr] lg:items-start">
          <div className="order-2 lg:order-1">
            <h3 className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#ffb800]">
              Быстрые ссылки
            </h3>

            <div className="grid gap-4 text-base font-bold text-slate-300">
              <a href="#today-free" className="transition hover:text-white">
                Все квартиры
              </a>
              <a href="#benefits" className="transition hover:text-white">
                Почему RentPlaceMD
              </a>
              <a href="tel:+37369990190" className="transition hover:text-white">
                Позвонить
              </a>
              <a
                href="https://wa.me/37369990190"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                Написать в WhatsApp
              </a>
            </div>
          </div>

          <div className="order-1 text-left lg:order-2 lg:text-center">
            <div className="flex items-center gap-3 lg:justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffb800] to-[#d4146f] text-2xl shadow-lg">
                🏠
              </div>

              <div>
                <h2 className="text-3xl font-black leading-none sm:text-4xl">
                  Rent<span className="text-[#d4146f]">Place</span>
                  <span className="text-[#ffb800]">MD</span>™
                </h2>
                <p className="mt-2 text-sm font-semibold text-slate-300 sm:text-base">
                  Квартиры посуточно в Кишинёве
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-base leading-7 text-slate-300 lg:mx-auto">
              Центр • Новострои • Заселение 24/7. Подберём свободную квартиру
              под ваши даты, количество гостей и бюджет.
            </p>
          </div>

          <div className="order-3">
            <h3 className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#ffb800]">
              Контакты
            </h3>

            <div className="space-y-4 text-2xl font-black">
              <a
                href="tel:+37369990190"
                className="block text-[#ff4fa3] transition hover:text-[#ffb800]"
              >
                📞 +373 69 990 190
              </a>

              <a
                href="tel:+37379990190"
                className="block text-[#ff4fa3] transition hover:text-[#ffb800]"
              >
                📞 +373 79 990 190
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/37369990190"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-[#25D366] px-6 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                WhatsApp
              </a>

              <a
                href="viber://chat?number=%2B37369990190"
                className="rounded-2xl bg-[#7360F2] px-6 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                Viber
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm font-semibold text-slate-400 lg:flex lg:items-center lg:justify-between">
          <p>© 2026 RentPlaceMD™. Все права защищены.</p>
          <p className="mt-2 lg:mt-0">
            Работаем ежедневно • Заселение 24/7
          </p>
        </div>
      </div>
    </footer>
  );
}