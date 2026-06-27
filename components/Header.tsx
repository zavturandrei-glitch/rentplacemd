export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#07111f] text-white shadow-2xl">
      <MobileHeader />
      <DesktopHeader />
    </header>
  );
}

function MobileHeader() {
  const languages = [
    { code: "RU", flag: <RussiaFlag /> },
    { code: "RO", flag: <MoldovaFlag /> },
    { code: "EN", flag: <UkFlag /> },
    { code: "UA", flag: <UkraineFlag /> },
    { code: "CZ", flag: <CzechFlag /> },
  ];

  return (
    <div className="lg:hidden">
      <div className="border-b border-white/10 bg-white/5 px-3 py-2">
        <div className="flex items-center justify-center gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className="flex items-center gap-1 text-xs font-black text-white/90"
            >
              <span className="h-4 w-6 overflow-hidden rounded-[3px]">
                {lang.flag}
              </span>
              <span>{lang.code}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <a href="/" className="flex min-w-0 items-center gap-3">
            <LogoIcon size="mobile" />

            <div className="min-w-0">
              <div className="truncate text-[26px] font-black leading-none tracking-tight">
                RentPlace<span className="text-[#d4146f]">MD</span>™
              </div>
              <p className="mt-1 text-[13px] font-semibold text-white/70">
                Квартиры посуточно в Кишинёве
              </p>
            </div>
          </a>

          <a
            href="tel:+37369990190"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#d4146f] text-white shadow-xl"
            aria-label="Позвонить"
          >
            <PhoneIcon />
          </a>
        </div>

        <a
          href="tel:+37369990190"
          className="mt-3 block rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-center text-[15px] font-black text-white"
        >
          +373 69 990 190
        </a>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <a
            href="https://wa.me/37369990190"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-[#25D366] px-3 py-3 text-center text-sm font-black text-white shadow-lg"
          >
            WhatsApp
          </a>

          <a
            href="viber://chat?number=%2B37369990190"
            className="rounded-2xl bg-[#7360F2] px-3 py-3 text-center text-sm font-black text-white shadow-lg"
          >
            Viber
          </a>

          <a
            href="https://t.me/rentplacemd"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-[#229ED9] px-3 py-3 text-center text-sm font-black text-white shadow-lg"
          >
            Telegram
          </a>
        </div>
      </div>
    </div>
  );
}

function DesktopHeader() {
  const languages = [
    { code: "RU", flag: <RussiaFlag /> },
    { code: "RO", flag: <MoldovaFlag /> },
    { code: "EN", flag: <UkFlag /> },
    { code: "UA", flag: <UkraineFlag /> },
    { code: "CZ", flag: <CzechFlag /> },
  ];

  return (
    <div className="hidden lg:block">
      <div className="border-b border-white/10 bg-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-3">
          <div className="flex items-center gap-5">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                className="flex items-center gap-1.5 text-sm font-black text-white/90 transition hover:text-[#ff4fa3]"
              >
                <span className="h-4 w-6 overflow-hidden rounded-[3px]">
                  {lang.flag}
                </span>
                <span>{lang.code}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6 text-sm font-bold text-white/90">
            <span className="text-[#ff4fa3]">●</span>
            <span>Центр Кишинёва</span>
            <span className="text-[#ff4fa3]">●</span>
            <span>Заселение 24/7</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-6">
        <a href="/" className="flex items-center gap-4">
          <LogoIcon size="desktop" />

          <div>
            <div className="text-4xl font-black leading-none tracking-tight">
              RentPlace<span className="text-[#d4146f]">MD</span>™
            </div>
            <p className="mt-2 text-base font-semibold text-white/75">
              Квартиры посуточно в Кишинёве
            </p>
          </div>
        </a>

        <div className="flex items-center gap-6">
          <div className="space-y-1 text-right text-xl font-black">
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

          <div className="flex gap-2">
            <a
              href="https://wa.me/37369990190"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[#25D366] px-5 py-3 text-center text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              WhatsApp
            </a>

            <a
              href="viber://chat?number=%2B37369990190"
              className="rounded-2xl bg-[#7360F2] px-5 py-3 text-center text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Viber
            </a>

            <a
              href="https://t.me/rentplacemd"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[#229ED9] px-5 py-3 text-center text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoIcon({ size }: { size: "mobile" | "desktop" }) {
  const boxClass =
    size === "mobile"
      ? "flex h-14 w-14 shrink-0 items-center justify-center"
      : "flex h-20 w-20 shrink-0 items-center justify-center";

  const svgClass = size === "mobile" ? "h-14 w-14" : "h-20 w-20";

  return (
    <div className={boxClass}>
      <svg viewBox="0 0 96 96" className={svgClass} fill="none">
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

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
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

function RussiaFlag() {
  return (
    <svg viewBox="0 0 3 2" className="h-full w-full">
      <path fill="#fff" d="M0 0h3v2H0z" />
      <path fill="#0039A6" d="M0 .67h3V2H0z" />
      <path fill="#D52B1E" d="M0 1.33h3V2H0z" />
    </svg>
  );
}

function MoldovaFlag() {
  return (
    <svg viewBox="0 0 3 2" className="h-full w-full">
      <path fill="#0046AE" d="M0 0h1v2H0z" />
      <path fill="#FFD200" d="M1 0h1v2H1z" />
      <path fill="#CC092F" d="M2 0h1v2H2z" />
    </svg>
  );
}

function UkFlag() {
  return (
    <svg viewBox="0 0 60 30" className="h-full w-full">
      <path fill="#012169" d="M0 0h60v30H0z" />
      <path stroke="#fff" strokeWidth="6" d="M0 0l60 30M60 0L0 30" />
      <path stroke="#C8102E" strokeWidth="3" d="M0 0l60 30M60 0L0 30" />
      <path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60" />
      <path stroke="#C8102E" strokeWidth="6" d="M30 0v30M0 15h60" />
    </svg>
  );
}

function UkraineFlag() {
  return (
    <svg viewBox="0 0 3 2" className="h-full w-full">
      <path fill="#0057B7" d="M0 0h3v1H0z" />
      <path fill="#FFD700" d="M0 1h3v1H0z" />
    </svg>
  );
}

function CzechFlag() {
  return (
    <svg viewBox="0 0 3 2" className="h-full w-full">
      <path fill="#fff" d="M0 0h3v2H0z" />
      <path fill="#D7141A" d="M0 1h3v1H0z" />
      <path fill="#11457E" d="M0 0l1.5 1L0 2z" />
    </svg>
  );
}