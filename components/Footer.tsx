export default function Footer() {
  return (
    <footer className="bg-[#182230] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 pb-28 sm:px-6 lg:px-8 lg:pb-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#ffb800] to-[#d4146f] text-3xl shadow-xl">
                🏠
              </div>

              <div>
                <h2 className="text-4xl font-black leading-none sm:text-5xl">
                  Rent<span className="text-[#d4146f]">Place</span>
                  <span className="text-[#ffb800]">MD</span>™
                </h2>

                <p className="mt-3 text-base font-bold text-slate-300 sm:text-lg">
                  Квартиры посуточно в Кишинёве
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Центр • Новострои • Заселение 24/7. Подберём свободную квартиру
              под ваши даты, количество гостей и бюджет.
            </p>
          </div>

          <div className="lg:justify-self-end">
            <h3 className="mb-5 text-sm font-black uppercase tracking-[0.3em] text-[#ffb800]">
              Контакты
            </h3>

            <div className="space-y-4 text-2xl font-black sm:text-3xl">
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
                className="rounded-2xl bg-[#25D366] px-7 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                WhatsApp
              </a>

              <a
                href="viber://chat?number=%2B37369990190"
                className="rounded-2xl bg-[#7360F2] px-7 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                Viber
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="rounded-2xl bg-white/5 px-5 py-4 text-center text-sm font-bold text-slate-200 shadow-inner sm:flex sm:items-center sm:justify-between sm:text-left">
            <p>© 2026 RentPlaceMD™. Все права защищены.</p>
            <p className="mt-2 text-[#ffb800] sm:mt-0">
              Официальный сайт RentPlaceMD • Заселение 24/7
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}