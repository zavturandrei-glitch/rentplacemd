type BrandLogoProps = {
  size?: "compact" | "mobile" | "desktop";
  className?: string;
};

export default function BrandLogo({
  size = "mobile",
  className = "",
}: BrandLogoProps) {
  const sizeClasses = {
    compact: {
      root: "gap-1.5",
      mark: "h-8 w-8 rounded-[9px]",
      monogram: "text-[13px]",
      name: "text-[12px] tracking-[0.12em]",
      subtitle: "text-[4.5px] tracking-[0.08em]",
    },
    mobile: {
      root: "gap-2",
      mark: "h-10 w-10 rounded-[11px]",
      monogram: "text-[16px]",
      name: "text-[15px] tracking-[0.12em]",
      subtitle: "text-[5px] tracking-[0.09em]",
    },
    desktop: {
      root: "gap-3",
      mark: "h-14 w-14 rounded-[15px]",
      monogram: "text-[22px]",
      name: "text-[24px] tracking-[0.14em]",
      subtitle: "text-[7px] tracking-[0.12em]",
    },
  }[size];

  return (
    <span className={`inline-flex min-w-0 items-center ${sizeClasses.root} ${className}`}>
      <span
        className={`relative grid shrink-0 place-items-center border border-[#d4af62]/75 bg-[#d4af62]/6 text-[#e4c47d] shadow-[inset_0_0_18px_rgba(212,175,98,.08)] ${sizeClasses.mark}`}
        aria-hidden="true"
      >
        <span className="absolute inset-x-[18%] top-[18%] h-px bg-[#d4af62]/55" />
        <span className="absolute bottom-[16%] left-[20%] top-[18%] w-px bg-[#d4af62]/35" />
        <span className="absolute bottom-[16%] right-[20%] top-[18%] w-px bg-[#d4af62]/35" />
        <span className={`relative font-serif font-semibold leading-none tracking-[-0.08em] ${sizeClasses.monogram}`}>
          RP
        </span>
        <span className="absolute inset-x-[18%] bottom-[15%] h-px bg-[#d4af62]/55" />
      </span>

      <span className="min-w-0 leading-none">
        <span className={`block truncate font-semibold text-[#e8d7aa] ${sizeClasses.name}`}>
          RENTPLACE
        </span>
        <span className={`mt-1 block whitespace-nowrap font-semibold text-white/58 ${sizeClasses.subtitle}`}>
          APARTMENTS | CHIȘINĂU | MOLDOVA
        </span>
      </span>
    </span>
  );
}
