export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-[#fff0f7] via-white to-[#fff4c7] shadow-md">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d4146f] to-[#ffb800] text-2xl shadow-lg sm:h-16 sm:w-16 sm:text-3xl">
              🏠
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-3xl font-black leading-none sm:text-4xl">
                <span className="text-[#374151]">Rent</span>
                <span className="text-[#d4146f]">Place</span>
                <span className="text-[#ffb800]">MD</span>
              </div>

              <p className="mt-1 text-sm font-bold text-gray-600 sm:text-base">
                Квартиры посуточно в Кишинёве
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-black text-[#d4146f] sm:text-xl">
                <a href="tel:+37369990190">📞 +373 69 990 190</a>
                <span className="hidden text-gray-300 sm:inline">•</span>
                <a href="tel:+37379990190">📞 +373 79 990 190</a>
              </div>

              <p className="mt-1 text-xs font-bold text-gray-600 sm:text-sm">
                WhatsApp • Viber • 24/7
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="fixed bottom-5 left-4 z-50">
        <a
          href="https://wa.me/37369990190"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-3xl text-white shadow-2xl"
          aria-label="Написать в WhatsApp"
        >
          💬
        </a>
      </div>

      <div className="fixed bottom-5 right-4 z-50">
        <a
          href="tel:+37369990190"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d4146f] text-3xl text-white shadow-2xl"
          aria-label="Позвонить"
        >
          📞
        </a>
      </div>
    </>
  );
}