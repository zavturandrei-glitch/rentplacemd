export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white text-slate-950 shadow-xl lg:bg-gradient-to-b lg:from-[#07111f] lg:to-[#0b1628] lg:text-white lg:shadow-2xl">
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
    <div className="lg:hidden bg-[#07111f] text-white shadow-2xl">
      <div className="border-b border-white/10 bg-[#050b14] px-3 py-1.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                title={lang.code}
                className="flex items-center gap-1 text-[10px] font-black text-white/85 transition active:scale-95"
                aria-label={lang.code}
              >
                <span className="h-3 w-[18px] overflow-hidden rounded-[3px] shadow-sm ring-1 ring-white/10">
                  {lang.flag}
                </span>
                <span>{lang.code}</span>
              </button>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.95)]" />
            Онлайн
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-[#07111f] to-[#0b1628] px-3 py-2.5">
        <div className="flex items-start justify-between gap-2">
          <a href="/" className="flex min-w-0 items-center gap-2.5">
            <LogoIcon size="mobile" />

            <div className="min-w-0">
              <div className="truncate text-[21px] font-black leading-none tracking-tight text-white">
                RentPlace<span className="text-[#d4146f]">MD</span>
                <sup className="ml-0.5 align-super text-[8px] font-bold text-white/80">
                  ™
                </sup>
              </div>
              <p className="mt-1 whitespace-nowrap text-[9px] font-semibold leading-none text-white/65">
                Квартиры посуточно в Кишинёве
              </p>
            </div>
          </a>

          <div className="shrink-0 pt-0 text-right">
            <div className="space-y-0.5 text-[14px] font-black leading-[1.02] text-white">
              <a href="tel:+37379990190" className="block">
                +373 79 990 190
              </a>
              <a href="tel:+37369990190" className="block">
                +373 69 990 190
              </a>
            </div>

            <div className="mt-1.5 flex items-center justify-end gap-1.5">
              <a
                href="https://wa.me/37369990190"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-5 w-5 items-center justify-center rounded-lg bg-[#25D366] text-white shadow-lg shadow-emerald-500/25 ring-1 ring-white/10 transition active:scale-95"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>

              <a
                href="viber://chat?number=%2B37369990190"
                className="flex h-5 w-5 items-center justify-center rounded-lg bg-[#7360F2] text-white shadow-lg shadow-violet-500/25 ring-1 ring-white/10 transition active:scale-95"
                aria-label="Viber"
              >
                <ViberIcon />
              </a>

              <a
                href="https://t.me/rentplacemd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-5 w-5 items-center justify-center rounded-lg bg-[#229ED9] text-white shadow-lg shadow-sky-500/25 ring-1 ring-white/10 transition active:scale-95"
                aria-label="Telegram"
              >
                <TelegramIcon />
              </a>
            </div>
          </div>
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
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-8 px-10 py-3">
        <a
          href="/"
          className="group flex w-[420px] shrink-0 items-center gap-3.5 transition duration-200 hover:scale-[1.015]"
        >
          <LogoIcon size="desktop" />

          <div>
            <div className="text-[31px] font-black leading-none tracking-tight">
              RentPlace<span className="text-[#d4146f]">MD</span>
              <sup className="ml-0.5 align-super text-[9px] font-bold text-white/80">
                ™
              </sup>
            </div>
            <p className="mt-1.5 text-[12px] font-semibold text-white/65">
              Квартиры посуточно в Кишинёве
            </p>
          </div>
        </a>

        <div className="flex flex-1 items-center justify-center">
          <div className="flex items-center justify-center gap-3.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 shadow-inner">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                title={lang.code}
                className="flex h-8 w-11 items-center justify-center rounded-full transition hover:scale-110 hover:bg-white/10"
                aria-label={lang.code}
              >
                <span className="h-[18px] w-7 overflow-hidden rounded-[4px] shadow-sm ring-1 ring-white/10">
                  {lang.flag}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex w-[590px] shrink-0 items-center justify-end gap-6">
          <a
            href="#today-free"
            className="rounded-xl bg-white px-6 py-3 text-[14px] font-black text-[#07111f] shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-[#ffd21f]"
          >
            Свободные квартиры
          </a>

          <div className="flex min-w-[270px] flex-col items-end text-right">
            <div className="mb-1 flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.95)]" />
              Онлайн 24/7
            </div>

            <div className="space-y-0 text-[23px] font-black leading-[1.02]">
              <a
                href="tel:+37379990190"
                className="block transition hover:text-[#ff4fa3]"
              >
                +373 79 990 190
              </a>
              <a
                href="tel:+37369990190"
                className="block transition hover:text-[#ff4fa3]"
              >
                +373 69 990 190
              </a>
            </div>

            <div className="mt-1.5 flex items-center justify-end gap-2">
              <a
                href="https://wa.me/37369990190"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-lg shadow-emerald-500/20 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>

              <a
                href="viber://chat?number=%2B37369990190"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7360F2] text-white shadow-lg shadow-violet-500/20 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110"
                aria-label="Viber"
              >
                <ViberIcon />
              </a>

              <a
                href="https://t.me/rentplacemd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#229ED9] text-white shadow-lg shadow-sky-500/20 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110"
                aria-label="Telegram"
              >
                <TelegramIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#9b124c] shadow-xl">
        <div className="mx-auto grid max-w-[1600px] grid-cols-4 px-10 py-2 text-white">
          <div className="flex items-center justify-center gap-2.5">
            <MapIcon />
            <p className="text-[14px] font-black leading-tight">
              Центр
              <br />
              города
            </p>
          </div>

          <div className="flex items-center justify-center gap-2.5">
            <ClockIcon />
            <p className="text-[14px] font-black leading-tight">
              Заселение
              <br />
              24/7
            </p>
          </div>

          <div className="flex items-center justify-center gap-2.5">
            <HomeIcon />
            <p className="text-[14px] font-black leading-tight">
              Более 12
              <br />
              квартир
            </p>
          </div>

          <div className="flex items-center justify-center gap-2.5">
            <ShieldIcon />
            <p className="text-[14px] font-black leading-tight">
              Без
              <br />
              посредников
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoIcon({ size }: { size: "mobile" | "desktop" }) {
  const boxClass =
    size === "mobile"
      ? "flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-2xl bg-white shadow-lg shadow-black/30"
      : "flex h-[64px] w-[64px] shrink-0 items-center justify-center";

  const svgClass = size === "mobile" ? "h-10 w-10" : "h-[64px] w-[64px]";

  const mainColor = size === "mobile" ? "#07111f" : "white";

  return (
    <div className={boxClass}>
      <svg viewBox="0 0 96 96" className={svgClass} fill="none">
        <path
          d="M12 76C28 70 68 70 84 76"
          stroke={mainColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M18 70V38L36 28V70"
          stroke={mainColor}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M36 70V18L56 8V70"
          stroke={mainColor}
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
          stroke={mainColor}
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

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-[57%] w-[57%]" fill="currentColor">
      <path d="M16.04 3C9.02 3 3.32 8.7 3.32 15.72c0 2.25.59 4.44 1.71 6.37L3.2 28.86l6.94-1.82a12.64 12.64 0 0 0 5.9 1.46h.01c7.02 0 12.72-5.7 12.72-12.72C28.77 8.7 23.06 3 16.04 3Zm0 23.34h-.01c-1.86 0-3.69-.5-5.29-1.45l-.38-.22-4.12 1.08 1.1-4.01-.25-.41a10.52 10.52 0 0 1-1.61-5.61c0-5.83 4.74-10.57 10.57-10.57 2.82 0 5.47 1.1 7.47 3.1a10.48 10.48 0 0 1 3.1 7.47c-.01 5.83-4.75 10.62-10.58 10.62Zm5.8-7.93c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.31-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.76-2.19-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.39-.03-.55-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.39-.29.32-1.1 1.08-1.1 2.62 0 1.54 1.13 3.04 1.29 3.25.16.21 2.22 3.39 5.38 4.75.75.32 1.34.51 1.8.65.76.24 1.45.21 1.99.13.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

function ViberIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-[57%] w-[57%]" fill="currentColor">
      <path d="M24.68 6.3C22.61 4.39 19.56 3.4 16 3.4c-3.55 0-6.61.99-8.68 2.9C5.08 8.37 4 11.54 4 15.72c0 3.4.73 6.13 2.22 8.17.84 1.16 1.94 2.07 3.27 2.72v2.62c0 .42.25.79.63.95.12.05.25.08.38.08.27 0 .53-.11.73-.31l2.55-2.56c.72.06 1.46.09 2.22.09 3.55 0 6.61-.99 8.68-2.9C26.92 22.5 28 19.34 28 15.16c0-4.17-1.08-6.79-3.32-8.86ZM16 25.35c-.83 0-1.63-.04-2.39-.12-.31-.03-.61.08-.83.3l-1.24 1.25v-1.44c0-.42-.26-.79-.65-.94-3.2-1.24-4.76-4.09-4.76-8.68 0-7 3.14-10.18 9.87-10.18 6.73 0 9.87 3.18 9.87 9.62 0 7-3.14 10.19-9.87 10.19Z" />
      <path d="M20.92 17.69c-.38-.2-2.25-1.12-2.6-1.25-.35-.13-.6-.2-.85.2-.25.39-.98 1.25-1.2 1.5-.22.26-.44.29-.82.1-.38-.2-1.61-.6-3.06-1.9-1.13-1.02-1.9-2.28-2.12-2.66-.22-.39-.02-.6.17-.79.17-.17.38-.45.57-.67.19-.22.25-.39.38-.65.13-.26.06-.49-.03-.68-.09-.2-.85-2.07-1.17-2.83-.31-.74-.63-.64-.85-.65h-.73c-.25 0-.66.1-1.01.49-.35.39-1.33 1.32-1.33 3.22 0 1.9 1.36 3.73 1.55 3.99.19.26 2.68 4.14 6.49 5.8.91.39 1.62.62 2.17.8.91.29 1.74.25 2.39.15.73-.11 2.25-.93 2.57-1.82.32-.89.32-1.66.22-1.82-.09-.16-.35-.26-.73-.45ZM17.5 8.18c-.42-.04-.79.27-.83.69-.04.42.27.79.69.83 2.38.23 3.78 1.65 4 4.05.04.39.37.69.76.69h.07c.42-.04.73-.41.69-.83-.29-3.14-2.28-5.13-5.38-5.43Z" />
      <path d="M17.15 11.05c-.42-.06-.81.24-.87.66-.06.42.24.81.66.87 1.06.15 1.61.72 1.74 1.8.05.39.38.67.76.67h.09c.42-.05.72-.43.67-.85-.23-1.8-1.34-2.9-3.05-3.15Z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-[57%] w-[57%]" fill="currentColor">
      <path d="M27.36 5.72c.36-.15.76-.09 1.06.16.3.25.43.64.34 1.02l-4.82 21.34c-.1.45-.48.78-.94.82-.46.04-.89-.21-1.08-.63l-4.49-9.86-5.14 5.06c-.29.29-.73.38-1.12.23-.39-.16-.64-.53-.64-.95v-6.36L4.15 14.2c-.41-.15-.69-.53-.7-.97-.01-.44.25-.83.65-1L27.36 5.72Zm-4.41 18.77 3.51-15.55-18.9 5.28 5.01 1.86 10.79-6.73-8.14 8.09 7.73 7.05Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[52%] w-[52%]" fill="none">
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
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
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
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
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
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
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
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
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
