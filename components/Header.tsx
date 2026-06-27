export default function Header() {
  const languages = [
    { code: "RU", flag: "🇷🇺" },
    { code: "RO", flag: "🇲🇩" },
    { code: "EN", flag: "🇬🇧" },
    { code: "UA", flag: "🇺🇦" },
    { code: "CZ", flag: "🇨🇿" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-gray-50">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className="flex min-w-10 flex-col items-center rounded-xl px-2 py-1 text-xs font-black text-gray-600 transition hover:bg-white hover:text-[#d4146f] hover:shadow-sm"
                  type="button"
                >
                  <span>{lang.code}</span>
                  <span className="text-base leading-none">{lang.flag}</span>
                </button>
              ))}
            </div>

            <p className="hidden text-sm font-bold text-gray-600 sm:block">
              Центр Кишинёва • Заселение 24/7
            </p>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
              <svg
                viewBox="0 0 48 48"
                className="h-8 w-8"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M10 39V17L24 8L38 17V39"
                  stroke="#111827"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 39V22H32V39"
                  stroke="#111827"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 39V30H27V39"
                  stroke="#d4146f"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 24H21M27 24H30"
                  stroke="#ffb800"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="min-w-0">
              <div className="text-2xl font-black leading-none tracking-tight text-gray-950 sm:text-3xl">
                RentPlaceMD™
              </div>
              <p className="mt-1 text-xs font-bold text-gray-600 sm:text-sm">
                Квартиры посуточно в Кишинёве
              </p>
            </div>
          </a>

          <div className="hidden rounded-2xl border border-gray-200 bg-gray-50 px-6 py-3 text-center lg:block">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-gray-500">
              RentPlaceMD
            </p>
            <p className="mt-1 text-lg font-black text-gray-950">
              12 квартир • от 800 лей
            </p>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="text-right">
              <a
                href="tel:+37369990190"
                className="block text-lg font-black leading-tight text-gray-950 transition hover:text-[#d4146f]"
              >
                +373 69 990 190
              </a>

              <a
                href="tel:+37379990190"
                className="mt-1 block text-lg font-black leading-tight text-gray-950 transition hover:text-[#d4146f]"
              >
                +373 79 990 190
              </a>
            </div>

            <a
              href="https://wa.me/37369990190"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[#25D366] px-5 py-3 text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      <a
        href="https://wa.me/37369990190"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 left-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl font-black text-white shadow-2xl lg:hidden"
        aria-label="Написать в WhatsApp"
      >
        W
      </a>

      <a
        href="tel:+37369990190"
        className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#d4146f] text-2xl font-black text-white shadow-2xl lg:hidden"
        aria-label="Позвонить"
      >
        ☎
      </a>
    </>
  );
}