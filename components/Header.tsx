export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-[#fff0f7] via-white to-[#fff4c7] shadow-lg">
        {/* Desktop */}
        <div className="hidden mx-auto max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:flex lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#d4146f] to-[#ffb800] text-3xl shadow-xl">
              🏠
            </div>

            <div>
              <div className="text-4xl font-black tracking-tight leading-none">
                <span className="text-[#374151]">Rent</span>
                <span className="text-[#d4146f]">Place</span>
                <span className="text-[#ffb800]">MD</span>
              </div>

              <p className="mt-2 text-base font-bold text-gray-600">
                Квартиры посуточно в Кишинёве
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/80 bg-white/80 px-10 py-4 text-center shadow-md">
            <p className="text-xl font-black text-gray-950">
              12 квартир в одном доме
            </p>
            <p className="mt-1 text-lg font-black text-[#d4146f]">
              От 800 лей • Заселение 24/7
            </p>
          </div>

          <div className="text-right">
            <a
              href="tel:+37369990190"
              className="block text-2xl font-black leading-tight text-[#d4146f]"
            >
              📞 +373 69 990 190
            </a>

            <a
              href="tel:+37379990190"
              className="mt-1 block text-2xl font-black leading-tight text-[#d4146f]"
            >
              📞 +373 79 990 190
            </a>

            <p className="mt-2 text-sm font-bold text-gray-600">
              WhatsApp • Viber • 24/7
            </p>
          </div>
        </div>

        {/* Mobile */}
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 lg:hidden">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d4146f] to-[#ffb800] text-2xl shadow-lg">
            🏠
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-3xl font-black leading-none">
              <span className="text-[#374151]">Rent</span>
              <span className="text-[#d4146f]">Place</span>
              <span className="text-[#ffb800]">MD</span>
            </div>

            <p className="mt-1 text-sm font-bold text-gray-600">
              Квартиры посуточно в Кишинёве
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-black text-[#d4146f]">
              <a href="tel:+37369990190">📞 +373 69 990 190</a>
              <a href="tel:+37379990190">📞 +373 79 990 190</a>
            </div>

            <p className="mt-1 text-xs font-bold text-gray-600">
              WhatsApp • Viber • 24/7
            </p>
          </div>
        </div>
      </header>

      {/* Floating mobile buttons */}
      <a
        href="https://wa.me/37369990190"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 left-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-3xl text-white shadow-2xl lg:hidden"
        aria-label="Написать в WhatsApp"
      >
        💬
      </a>

      <a
        href="tel:+37369990190"
        className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#d4146f] text-3xl text-white shadow-2xl lg:hidden"
        aria-label="Позвонить"
      >
        📞
      </a>
    </>
  );
}