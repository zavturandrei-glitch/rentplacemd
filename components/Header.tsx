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
      <header className="sticky top-0 z-50 bg-[#07111f] text-white shadow-2xl">
        <div className="border-b border-white/10 bg-white/5">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 sm:gap-5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  className="flex items-center gap-1 text-xs font-black text-white/90 transition hover:text-[#ff4fa3]"
                >
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span>{lang.code}</span>
                </button>
              ))}
            </div>

            <div className="hidden items-center gap-6 text-sm font-bold text-white/90 sm:flex">
              <span className="text-[#ff4fa3]">●</span>
              <span>Центр Кишинёва</span>
              <span className="text-[#ff4fa3]">●</span>
              <span>Заселение 24/7</span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-5 lg:grid-cols-[1.2fr_0.9fr_1fr]">
            <a href="/" className="flex items-center gap-4">
              <LogoIcon />

              <div>
                <div className="text-3xl font-black leading-none tracking-tight sm:text-4xl">
                  RentPlace<span className="text-[#d4146f]">MD</span>™
                </div>
                <p className="mt-2 text-sm font-semibold text-white/75 sm:text-base">
                  Квартиры посуточно в Кишинёве
                </p>
              </div>
            </a>

            <div className="rounded-3xl border border-white/15 bg-white/5 px-5 py-4 shadow-inner">
              <div className="flex items-center justify-center gap-4">
                <SmallBuildingIcon />
                <div>
                  <p className="text-lg font-black leading-tight">
                    12 квартир
                  </p>
                  <p className="text-sm font-bold text-white/75">
                    в одном комплексе
                  </p>
                  <p className="mt-1 text-lg font-black text-[#ff4fa3]">
                    от 800 лей
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden items-center justify-end gap-5 lg:flex">
              <div className="space-y-2 text-right text-2xl font-black">
                <a
                  href="tel:+37369990190"
                  className="block transition hover:text-[#ff4fa3]"
                >
                  ☎ +373 69 990 190
                </a>
                <a
                  href="tel:+37379990190"
                  className="block transition hover:text-[#ff4fa3]"
                >
                  ☎ +373 79 990 190
                </a>
              </div>

              <div className="grid gap-2">
                <a
                  href="https://wa.me/37369990190"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-[#25D366] px-7 py-3 text-center text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  WhatsApp
                </a>

                <a
                  href="viber://chat?number=%2B37369990190"
                  className="rounded-2xl bg-[#7360F2] px-7 py-3 text-center text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Viber
                </a>

                <a
                  href="https://t.me/rentplacemd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-[#229ED9] px-7 py-3 text-center text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Telegram
                </a>
              </div>
            </div>

            <a
              href="tel:+37369990190"
              className="absolute right-4 top-[72px] flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d4146f] text-2xl shadow-xl lg:hidden"
              aria-label="Позвонить"
            >
              ☎
            </a>
          </div>

          <div className="mt-5 rounded-3xl border border-[#d4146f]/40 bg-[#9b124c]/80 px-4 py-5 shadow-xl backdrop-blur">
            <div className="grid grid-cols-4 gap-3 text-center text-white">
              <div>
                <div className="text-3xl">⌖</div>
                <p className="mt-1 text-xs font-bold sm:text-sm">
                  Центр
                  <br />
                  Кишинёва
                </p>
              </div>

              <div>
                <div className="text-3xl">盾</div>
                <p className="mt-1 text-xs font-bold sm:text-sm">
                  Надежно
                  <br />и безопасно
                </p>
              </div>

              <div>
                <div className="text-3xl">24/7</div>
                <p className="mt-1 text-xs font-bold sm:text-sm">
                  24/7
                  <br />
                  Заселение
                </p>
              </div>

              <div>
                <div className="text-3xl">钥</div>
                <p className="mt-1 text-xs font-bold sm:text-sm">
                  Комфорт
                  <br />
                  как дома
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 lg:hidden">
            <a
              href="https://wa.me/37369990190"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[#25D366] px-3 py-4 text-center text-base font-black text-white shadow-lg"
            >
              WhatsApp
            </a>

            <a
              href="viber://chat?number=%2B37369990190"
              className="rounded-2xl bg-[#7360F2] px-3 py-4 text-center text-base font-black text-white shadow-lg"
            >
              Viber
            </a>

            <a
              href="https://t.me/rentplacemd"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[#229ED9] px-3 py-4 text-center text-base font-black text-white shadow-lg"
            >
              Telegram
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

function LogoIcon() {
  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center">
      <svg viewBox="0 0 96 96" className="h-20 w-20" fill="none">
        <path
          d="M12 76C28 70 68 70 84 76"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M18 70V38L36 28V70"
          stroke="white"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M36 70V18L56 8V70"
          stroke="white"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M56 70V32L76 42V70"
          stroke="#d4146f"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M27 70V48"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M66 70V52"
          stroke="#d4146f"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function SmallBuildingIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none">
      <path
        d="M10 54C20 50 44 50 54 54"
        stroke="#d4146f"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M14 52V28L27 21V52"
        stroke="#d4146f"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M27 52V12L40 6V52"
        stroke="#d4146f"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M40 52V28L52 35V52"
        stroke="#d4146f"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}