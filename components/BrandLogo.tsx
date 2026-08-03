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
      mark: "h-8 w-9",
      monogram: "text-[22px]",
      name: "text-[12px] tracking-[0.12em]",
      subtitle: "text-[4.5px] tracking-[0.08em]",
    },
    mobile: {
      root: "gap-1.5",
      mark: "h-9 w-10",
      monogram: "text-[25px]",
      name: "text-[14px] tracking-[0.12em]",
      subtitle: "text-[4.5px] tracking-[0.08em]",
    },
    desktop: {
      root: "gap-3",
      mark: "h-14 w-[62px]",
      monogram: "text-[39px]",
      name: "text-[24px] tracking-[0.14em]",
      subtitle: "text-[7px] tracking-[0.12em]",
    },
  }[size];

  return (
    <span className={`inline-flex min-w-0 items-center ${sizeClasses.root} ${className}`}>
      <span
        className={`relative block shrink-0 text-[#e4c47d] ${sizeClasses.mark}`}
        aria-hidden="true"
      >
        <span className="absolute left-[4%] top-[39%] h-px w-[54%] origin-left -rotate-[34deg] bg-[#d4af62]/90" />
        <span className="absolute right-[4%] top-[8%] h-px w-[42%] origin-right rotate-[39deg] bg-[#d4af62]/90" />
        <span className="absolute bottom-[5%] right-[8%] h-[65%] w-[42%] border-b border-r border-[#d4af62]/65" />
        <span className="absolute bottom-[5%] right-[23%] h-[46%] w-px bg-[#d4af62]/38" />
        <span className={`absolute bottom-0 left-[10%] font-serif font-semibold leading-none tracking-[-0.12em] text-[#e8d7aa] ${sizeClasses.monogram}`}>
          R
        </span>
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
