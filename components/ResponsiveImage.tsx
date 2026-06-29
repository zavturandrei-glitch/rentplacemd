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
          priority={priority}
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
      {children}
    </div>
  );
}
