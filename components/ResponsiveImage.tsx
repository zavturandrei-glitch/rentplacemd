"use client";

import Image from "next/image";
import { type ReactNode, useState } from "react";

type ResponsiveImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
  objectPosition?: string;
  withWatermark?: boolean;
  children?: ReactNode;
};

const shimmerSvg = '<svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#f3eee5"/><stop offset="0.5" stop-color="#fffaf0"/><stop offset="1" stop-color="#eadfce"/></linearGradient></defs><rect width="1200" height="800" fill="url(#g)"/><rect x="70" y="70" width="1060" height="660" rx="34" fill="#ffffff" opacity="0.2"/></svg>';
const blurDataURL = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(shimmerSvg);

export default function ResponsiveImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  sizes,
  priority = false,
  loading,
  objectPosition = "center",
  withWatermark = false,
  children,
}: ResponsiveImageProps) {
  const [failed, setFailed] = useState(false);
  const frameClassName = [
    "relative overflow-hidden bg-[#f4f1ee]",
    withWatermark ? "rpm-watermark-frame" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={frameClassName}>
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={priority}
          fetchPriority={priority ? "high" : undefined}
          loading={priority ? "eager" : loading}
          placeholder="blur"
          blurDataURL={blurDataURL}
          quality={82}
          className={["object-cover rpm-photo", imgClassName].filter(Boolean).join(" ")}
          style={{ objectPosition }}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#f4f1ee] via-[#fffaf0] to-[#e9ddcc] px-6 text-center text-sm font-black uppercase tracking-[0.18em] text-[#07111f]/55">
          RentPlaceMD
        </div>
      )}
      {withWatermark ? <RentPlaceWatermark /> : null}
      {children}
    </div>
  );
}

function RentPlaceWatermark() {
  return (
    <div className="rpm-watermark" aria-hidden="true">
      <svg className="rpm-watermark-icon" viewBox="0 0 54 54" focusable="false">
        <path d="M6 48H48" />
        <path d="M12 48V25L22 19V48" />
        <path d="M22 48V12L32 6V48" />
        <path d="M32 48V20L42 26V48" />
        <path d="M17 30H19M17 36H19M17 42H19" />
        <path d="M27 17H29M27 23H29M27 29H29M27 35H29M27 41H29" />
        <path d="M37 31H39M37 37H39M37 43H39" />
        <path d="M22 19L32 13" />
        <path d="M12 25L22 31L32 25L42 31" />
      </svg>
      <span className="rpm-watermark-copy">
        <span className="rpm-watermark-brand">
          <span>RentPlace</span>
          <span className="rpm-watermark-md">MD</span>
          <span className="rpm-watermark-tm">™</span>
        </span>
        <span className="rpm-watermark-subtitle">APARTMENTS IN CHIȘINĂU</span>
      </span>
    </div>
  );
}
