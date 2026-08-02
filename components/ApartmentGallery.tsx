"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import ResponsiveImage from "@/components/ResponsiveImage";

export type ApartmentGalleryPhoto = {
  src: string;
  alt: string;
};

type ApartmentGalleryProps = {
  photos: ApartmentGalleryPhoto[];
  heroPosition?: string;
  labels: {
    gallery: string;
    allPhotos: string;
    previous: string;
    next: string;
    close: string;
  };
};

export default function ApartmentGallery({
  photos,
  heroPosition = "center 45%",
  labels,
}: ApartmentGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isLightboxVisible, setIsLightboxVisible] = useState(false);
  const galleryPointerStartRef = useRef<number | null>(null);
  const lightboxPointerStartRef = useRef<number | null>(null);
  const suppressGalleryClickRef = useRef(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lightboxRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const activePhoto = photos[activeIndex] ?? photos[0];
  const activeLightboxIndex = lightboxIndex ?? 0;
  const activeLightboxPhoto = photos[activeLightboxIndex] ?? photos[0];
  const thumbnailPhotos = photos.slice(0, 4);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % photos.length);
  }, [photos.length]);

  const openLightbox = useCallback((index: number) => {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setActiveIndex(index);
    setLightboxIndex(index);
    window.requestAnimationFrame(() => {
      setIsLightboxVisible(true);
      closeButtonRef.current?.focus();
    });
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxVisible(false);
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = window.setTimeout(() => {
      setLightboxIndex(null);
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    }, 180);
  }, []);

  const showPreviousLightbox = useCallback(() => {
    setLightboxIndex((current) =>
      current === null
        ? current
        : (current - 1 + photos.length) % photos.length,
    );
  }, [photos.length]);

  const showNextLightbox = useCallback(() => {
    setLightboxIndex((current) =>
      current === null ? current : (current + 1) % photos.length,
    );
  }, [photos.length]);

  function handleGalleryPointerDown(event: PointerEvent<HTMLDivElement>) {
    galleryPointerStartRef.current = event.clientX;
    suppressGalleryClickRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleGalleryPointerUp(event: PointerEvent<HTMLDivElement>) {
    const startX = galleryPointerStartRef.current;
    galleryPointerStartRef.current = null;
    if (startX === null) return;
    const distance = event.clientX - startX;
    if (Math.abs(distance) < 44) return;
    suppressGalleryClickRef.current = true;
    if (distance > 0) showPrevious();
    else showNext();
  }

  function handleLightboxPointerDown(event: PointerEvent<HTMLDivElement>) {
    lightboxPointerStartRef.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleLightboxPointerUp(event: PointerEvent<HTMLDivElement>) {
    const startX = lightboxPointerStartRef.current;
    lightboxPointerStartRef.current = null;
    if (startX === null) return;
    const distance = event.clientX - startX;
    if (Math.abs(distance) < 44) return;
    if (distance > 0) showPreviousLightbox();
    else showNextLightbox();
  }

  useEffect(() => {
    if (lightboxIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPreviousLightbox();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showNextLightbox();
      } else if (event.key === "Tab") {
        const focusable = lightboxRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    closeLightbox,
    lightboxIndex,
    showNextLightbox,
    showPreviousLightbox,
  ]);

  useEffect(() => {
    if (lightboxIndex === null || photos.length < 2) return;
    const indexes = [
      (lightboxIndex - 1 + photos.length) % photos.length,
      (lightboxIndex + 1) % photos.length,
    ];
    const preloaders = [...new Set(indexes)].map((index) => {
      const preloader = new window.Image();
      preloader.decoding = "async";
      preloader.src = photos[index].src;
      return preloader;
    });
    return () => {
      preloaders.forEach((preloader) => {
        preloader.src = "";
      });
    };
  }, [lightboxIndex, photos]);

  useEffect(
    () => () => {
      if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    },
    [],
  );

  const lightboxDots = useMemo(() => {
    if (photos.length <= 7) return photos.map((_, index) => index);
    return Array.from(
      { length: 7 },
      (_, offset) =>
        (activeLightboxIndex - 3 + offset + photos.length) % photos.length,
    );
  }, [activeLightboxIndex, photos]);

  if (!activePhoto) return null;

  return (
    <>
      <section aria-label={labels.gallery}>
        <div
          className="group relative touch-pan-y overflow-hidden rounded-2xl bg-[#07111f] shadow-[0_14px_40px_rgba(7,17,31,0.15)]"
          onPointerDown={handleGalleryPointerDown}
          onPointerUp={handleGalleryPointerUp}
          onPointerCancel={() => {
            galleryPointerStartRef.current = null;
          }}
        >
          <button
            type="button"
            onClick={() => {
              if (suppressGalleryClickRef.current) {
                suppressGalleryClickRef.current = false;
                return;
              }
              openLightbox(activeIndex);
            }}
            className="block w-full cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#ffd21f]"
            aria-label={activePhoto.alt}
          >
            <ResponsiveImage
              key={activePhoto.src}
              src={activePhoto.src}
              alt={activePhoto.alt}
              className="aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[16/8]"
              imgClassName="object-cover"
              sizes="(min-width: 1024px) 1180px, 100vw"
              objectPosition={activeIndex === 0 ? heroPosition : "center"}
              priority={activeIndex === 0}
              loading={activeIndex === 0 ? undefined : "lazy"}
              withWatermark
            />
          </button>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/65 via-black/15 to-transparent p-3 pt-12 sm:p-4">
            <span className="rounded-full bg-black/65 px-3 py-1.5 text-xs font-black text-white backdrop-blur">
              {activeIndex + 1} / {photos.length}
            </span>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                openLightbox(activeIndex);
              }}
              className="pointer-events-auto min-h-10 rounded-xl bg-white px-3.5 text-xs font-black text-[#07111f] shadow-lg"
            >
              {labels.allPhotos}
            </button>
          </div>

          {photos.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrevious();
                }}
                className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-2xl text-white backdrop-blur transition hover:bg-black/75 focus-visible:flex group-hover:flex sm:flex"
                aria-label={labels.previous}
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-2xl text-white backdrop-blur transition hover:bg-black/75 focus-visible:flex group-hover:flex sm:flex"
                aria-label={labels.next}
              >
                ›
              </button>
            </>
          ) : null}
        </div>

        {thumbnailPhotos.length > 1 ? (
          <div className="mt-2.5 hidden grid-cols-4 gap-2 sm:grid">
            {thumbnailPhotos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => openLightbox(index)}
                aria-label={photo.alt}
                aria-current={activeIndex === index ? "true" : undefined}
                className={[
                  "cursor-zoom-in overflow-hidden rounded-xl border-2 bg-white p-0.5 transition",
                  activeIndex === index
                    ? "border-[#d4146f]"
                    : "border-transparent opacity-80 hover:opacity-100",
                ].join(" ")}
              >
                <ResponsiveImage
                  src={photo.src}
                  alt=""
                  className="aspect-[4/3] rounded-[9px]"
                  imgClassName="object-cover"
                  sizes="(min-width: 1024px) 280px, 25vw"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        ) : null}
      </section>

      {lightboxIndex !== null && activeLightboxPhoto ? (
        <div
          ref={lightboxRef}
          className={[
            "fixed inset-0 z-[100] flex flex-col bg-black/95 text-white transition-opacity duration-200",
            isLightboxVisible ? "opacity-100" : "opacity-0",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
          aria-label={labels.gallery}
          onClick={closeLightbox}
        >
          <div
            className="pointer-events-none absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-sm font-black"
            aria-live="polite"
          >
            {activeLightboxIndex + 1} / {photos.length}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeLightbox}
            className="absolute right-3 top-3 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-black/70 text-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            aria-label={labels.close}
          >
            ×
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPreviousLightbox();
            }}
            className="absolute left-2 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-4xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:left-5"
            aria-label={labels.previous}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNextLightbox();
            }}
            className="absolute right-2 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-4xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:right-5"
            aria-label={labels.next}
          >
            ›
          </button>

          <div
            className="flex min-h-0 flex-1 touch-pan-y items-center justify-center px-2 pb-16 pt-16 sm:px-20"
            onClick={(event) => event.stopPropagation()}
            onPointerDown={handleLightboxPointerDown}
            onPointerUp={handleLightboxPointerUp}
            onPointerCancel={() => {
              lightboxPointerStartRef.current = null;
            }}
          >
            <div className="relative h-full max-h-[calc(100dvh-8rem)] w-full max-w-6xl">
              <Image
                key={activeLightboxPhoto.src}
                src={activeLightboxPhoto.src}
                alt={activeLightboxPhoto.alt}
                fill
                sizes="100vw"
                loading="eager"
                className="object-contain"
              />
            </div>
          </div>

          <div
            className="absolute inset-x-0 bottom-0 z-20 flex justify-center bg-gradient-to-t from-black via-black/80 to-transparent px-3 pb-4 pt-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              {lightboxDots.map((index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className={[
                    "h-3 rounded-full transition-[width,background-color] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
                    index === activeLightboxIndex
                      ? "w-8 bg-[#ffd21f]"
                      : "w-3 bg-white/55 hover:bg-white",
                  ].join(" ")}
                  aria-label={photos[index].alt}
                  aria-current={
                    index === activeLightboxIndex ? "true" : undefined
                  }
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
