export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#fff0f7] via-white to-[#fff4c7] shadow-lg">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#d4146f] to-[#ffb800] text-3xl shadow-xl">
              🏠
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black leading-none">
                <span className="text-[#374151]">Rent</span>
                <span className="text-[#d4146f]">Place</span>
                <span className="text-[#ffb800]">MD</span>
              </div>

              <p className="mt-1 text-sm sm:text-base font-bold text-gray-600">
                Квартиры посуточно в Кишинёве
              </p>
            </div>
          </div>

          <div className="hidden lg:block rounded-3xl border border-white/80 bg-white/80 px-10 py-4 text-center shadow-md">
            <p className="text-xl font-black text-gray-950">
              12 квартир в одном доме
            </p>

            <p className="mt-1 text-lg font-black text-[#d4146f]">
              От 800 лей • Заселение 24/7
            </p>
          </div>

          <div className="flex flex-col gap-2 text-center lg:text-right">
            <a
              href="tel:+37369990190"
              className="text-lg sm:text-2xl font-black text-[#d4146f]"
            >
              📞 +373 69 990 190
            </a>

            <a
              href="tel:+37379990190"
              className="text-lg sm:text-2xl font-black text-[#d4146f]"
            >
              📞 +373 79 990 190
            </a>

            <p className="text-sm font-bold text-gray-600">
              WhatsApp • Viber • 24/7
            </p>
          </div>

        </div>
      </div>
    </header>
  );
}