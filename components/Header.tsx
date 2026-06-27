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
          <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2 sm:justify-between sm:px-6 lg:px-8">
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
          <div className="relative grid items-center gap-5 lg:grid-cols-[1.2fr_0.9fr_1fr]">
            <a href="/" className="flex items-center gap-4 pr-14 sm:pr-0">
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
                  +373 69 990 190
                </a>
                <a
                  href="tel:+37379990190"
                  className="block transition hover:text-[#ff4fa3]"
                >
                  +373 79 990 190
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
              className="absolute right-0 top-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d4146f] text-white shadow-xl transition hover:scale-105 lg:hidden"
              aria-label="Позвонить"
            >
              <PhoneIcon />
            </a>
          </div>

          <div className="mt-5 rounded-3xl border border-[#d4146f]/40 bg-[#9b124c]/80 px-4 py-5 shadow-xl backdrop-blur">
            <div className="grid grid-cols-4 gap-3 text-center text-white">
              <div>
                <MapIcon />
                <p className="mt-2 text-xs font-bold sm:text-sm">
                  Центр
                  <br />
                  Кишинёва
                </p>
              </div>

              <div>
                <ShieldIcon />
                <p className="mt-2 text-xs font-bold sm:text-sm">
                  Надёжно
                  <br />и безопасно
                </p>
              </div>

              <div>
                <ClockIcon />
                <p className="mt-2 text-xs font-bold sm:text-sm">
                  24/7
                  <br />
                  Заселение
                </p>
              </div>

              <div>
                <HomeIcon />
                <p className="mt-2 text-xs font-bold sm:text-sm">
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

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path
        d="M7.2 4.5L9.1 8.8C9.4 9.4 9.2 10.1 8.7 10.5L7.4 11.5C8.5 13.8 10.3 15.6 12.6 16.7L13.6 15.4C14 14.9 14.7 14.7 15.3 15L19.6 16.9C20.3 17.2 20.7 17.9 20.5 18.6L20.1 20.2C19.9 21 19.2 21.5 18.4 21.5C9.6 21.5 2.5 14.4 2.5 5.6C2.5 4.8 3 4.1 3.8 3.9L5.4 3.5C6.1 3.3 6.9 3.8 7.2 4.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto h-8 w-8" fill="none">
      <path
        d="M12 21S5 14.7 5 9.5A7 7 0 0 1 19 9.5C19 14.7 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 12A2.5 2.5 0 1 0 12 7A2.5 2.5 0 0 0 12 12Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto h-8 w-8" fill="none">
      <path
        d="M12 3L19 6V11C19 15.5 16.1 19.7 12 21C7.9 19.7 5 15.5 5 11V6L12 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8.8 12L11 14.2L15.6 9.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto h-8 w-8" fill="none">
      <path
        d="M12 21A9 9 0 1 0 12 3A9 9 0 0 0 12 21Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 7V12L15 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto h-8 w-8" fill="none">
      <path
        d="M3 11L12 4L21 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 10.5V20H19V10.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 20V14H15V20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}