"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
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
  thumbnailLimit?: number;
  synchronizedNavigation?: boolean;
  labels: {
    gallery: string;
    allPhotos: string;
    back: string;
    previous: string;
    next: string;
    close: string;
  };
};

const lightboxArrowClass = "flex h-12 w-16 items-center justify-center rounded-xl border border-white/35 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white";

export default function ApartmentGallery({
  photos,
  heroPosition = "center 45%",
  labels,
  thumbnailLimit,
  synchronizedNavigation = false,
}: ApartmentGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loadedSrc, setLoadedSrc] = useState('');
  const galleryPointerStartRef = useRef<number | null>(null);
  const lightboxPointerStartRef = useRef<number | null>(null);
  const suppressGalleryClickRef = useRef(false);
  const gestureRef = useRef<{ id: number; y: number } | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lightboxRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const activePhoto = photos[activeIndex] ?? photos[0];
  const activeLightboxIndex = lightboxIndex ?? 0;
  const activeLightboxPhoto = photos[activeLightboxIndex] ?? photos[0];
  const thumbnailStart = synchronizedNavigation && thumbnailLimit
    ? Math.floor(activeIndex / thumbnailLimit) * thumbnailLimit : 0;
  const thumbnailPhotos = thumbnailLimit
    ? photos.slice(thumbnailStart, thumbnailStart + thumbnailLimit) : photos;

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
    setLightboxIndex(index);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus({preventScroll:true}));
  }, []);

  const closeLightbox = useCallback(() => {
    if (synchronizedNavigation && lightboxIndex !== null) setActiveIndex(lightboxIndex);
    setLightboxIndex(null);
    window.requestAnimationFrame(() => {
      previousFocusRef.current?.focus({preventScroll:true});
      previousFocusRef.current = null;
    });
  }, [synchronizedNavigation, lightboxIndex]);

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
    if (synchronizedNavigation) {
      suppressGalleryClickRef.current = false;
      galleryPointerStartRef.current = null;
      gestureRef.current = null;
      if (!event.isPrimary || event.button !== 0) return;
      const button = (event.target as HTMLElement).closest("button");
      if (button && !button.classList.contains("cursor-zoom-in")) return;
      gestureRef.current = { id: event.pointerId, y: event.clientY };
    }
    galleryPointerStartRef.current = event.clientX;
    suppressGalleryClickRef.current = false;
    // Keep click events on the image and navigation buttons. Capturing on
    // the parent redirects those clicks away from their button handlers.
  }

  function handleGalleryPointerUp(event: PointerEvent<HTMLDivElement>) {
    const startX = galleryPointerStartRef.current;
    galleryPointerStartRef.current = null;
    if (startX === null) return;
    const distance = event.clientX - startX;
    if (synchronizedNavigation) {
      const gesture = gestureRef.current;
      gestureRef.current = null;
      if (!gesture || gesture.id !== event.pointerId || Math.abs(distance) <= Math.abs(event.clientY - gesture.y)) return;
    }
    if (Math.abs(distance) < 44) return;
    suppressGalleryClickRef.current = true;
    if (distance > 0) showPrevious();
    else showNext();
  }

  function handleLightboxPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    gestureRef.current = { id: event.pointerId, y: event.clientY };
    lightboxPointerStartRef.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleLightboxPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (gestureRef.current?.id !== event.pointerId) return;
    const startX = lightboxPointerStartRef.current;
    lightboxPointerStartRef.current = null;
    if (startX === null) return;
    const distance = event.clientX - startX;
    const gesture = gestureRef.current;
    gestureRef.current = null;
    if (!gesture || gesture.id !== event.pointerId || Math.abs(distance) <= Math.abs(event.clientY - gesture.y) * 1.25) return;
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

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    closeLightbox,
    lightboxIndex,
    showNextLightbox,
    showPreviousLightbox,
  ]);

  const isOpen=lightboxIndex!==null;
  useEffect(()=>{
    if(!isOpen)return;
    const y=window.scrollY;
    const old={position:document.body.style.position,top:document.body.style.top,width:document.body.style.width,overflow:document.body.style.overflow};
    Object.assign(document.body.style,{position:'fixed',top:`-${y}px`,width:'100%',overflow:'hidden'});
    return ()=>{Object.assign(document.body.style,old);window.scrollTo({top:y,behavior:'instant'});};
  },[isOpen]);

  if (!activePhoto) return null;

  return (
    <>
      <section aria-label={labels.gallery}>
        <div
          className="group relative touch-pan-y overflow-hidden rounded-2xl bg-[#07111f] shadow-[0_14px_40px_rgba(7,17,31,0.15)]"
          onPointerDown={handleGalleryPointerDown}
          onPointerUp={handleGalleryPointerUp}
          onDragStart={(event) => event.preventDefault()}
          onClickCapture={synchronizedNavigation ? (event) => {
            if (suppressGalleryClickRef.current) {
              suppressGalleryClickRef.current = false;
              event.preventDefault();
              event.stopPropagation();
            }
          } : undefined}
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
              className="pointer-events-auto min-h-11 rounded-xl bg-white px-3.5 text-xs font-black text-[#07111f] shadow-lg"
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
          <div className="mt-2.5 flex snap-x gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-4 sm:overflow-visible">
            {thumbnailPhotos.map((photo, offset) => {
              const index = thumbnailStart + offset;
              return (
              <button
                key={photo.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={photo.alt}
                aria-current={activeIndex === index ? "true" : undefined}
                className={[
                  "w-[72px] shrink-0 snap-start overflow-hidden rounded-xl border-2 bg-white p-0.5 transition sm:w-auto",
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
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 25vw, 72px"
                  loading="lazy"
                />
              </button>
              );
            })}
          </div>
        ) : null}
      </section>

      {lightboxIndex !== null && activeLightboxPhoto ? createPortal(
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-[1000] isolate flex h-[100dvh] flex-col overflow-hidden bg-[#080a0d] text-white overscroll-none"
          role="dialog"
          aria-modal="true"
          aria-label={labels.gallery}
        >
          <header
            className="z-40 grid shrink-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 bg-[#080a0d] pb-2"
            style={{
              paddingTop: "calc(env(safe-area-inset-top, 0px) + 8px)",
              paddingLeft: "calc(env(safe-area-inset-left, 0px) + 8px)",
              paddingRight: "calc(env(safe-area-inset-right, 0px) + 8px)",
            }}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="inline-flex min-h-12 min-w-12 items-center justify-center gap-1.5 justify-self-start rounded-xl border border-white/40 px-2.5 text-sm font-bold hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 12H4m7-7-7 7 7 7"/></svg>
              {labels.back}
            </button>
            <span className="whitespace-nowrap text-sm font-bold tabular-nums" aria-live="polite">
              {activeLightboxIndex + 1} / {photos.length}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label={labels.close}
              onClick={closeLightbox}
              className="inline-flex size-12 items-center justify-center justify-self-end rounded-xl bg-white text-[#080a0d] hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg>
            </button>
          </header>
          <div
            className="flex min-h-0 flex-1 touch-pan-y select-none items-center justify-center"
            style={{
              paddingLeft: "calc(env(safe-area-inset-left, 0px) + 8px)",
              paddingRight: "calc(env(safe-area-inset-right, 0px) + 8px)",
            }}
            onPointerDown={handleLightboxPointerDown}
            onPointerUp={handleLightboxPointerUp}
            onDragStart={(event) => event.preventDefault()}
            onPointerCancel={(event) => {
              if (gestureRef.current?.id === event.pointerId) {
                lightboxPointerStartRef.current = null;
                gestureRef.current = null;
              }
            }}
          >
            <div className="relative h-full w-full max-w-6xl" aria-busy={loadedSrc!==activeLightboxPhoto.src}>
              {loadedSrc!==activeLightboxPhoto.src && <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-2 border-white/20 border-t-white"/>}
              <Image
                key={activeLightboxPhoto.src}
                src={activeLightboxPhoto.src}
                alt={activeLightboxPhoto.alt}
                fill
                sizes="(min-width: 1152px) 1152px, 100vw"
                loading="eager"
                quality={activeLightboxPhoto.src.startsWith("/apartments/albisoara-16-84/") ? 82 : undefined}
                className="object-contain"
                draggable={false}
                onLoad={()=>setLoadedSrc(activeLightboxPhoto.src)}
              />
              {photos.length > 1 && [...new Set([
                (activeLightboxIndex - 1 + photos.length) % photos.length,
                (activeLightboxIndex + 1) % photos.length,
              ])].map((index) => (
                <Image
                  key={photos[index].src}
                  src={photos[index].src}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(min-width: 1152px) 1152px, 100vw"
                  loading="eager"
                  fetchPriority="low"
                  quality={photos[index].src.startsWith("/apartments/albisoara-16-84/") ? 82 : undefined}
                  className="pointer-events-none opacity-0"
                  draggable={false}
                />
              ))}
            </div>
          </div>

          <footer
            className="flex shrink-0 justify-center gap-5 px-2 pt-2"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 8px)" }}
          >
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPreviousLightbox}
                  className={lightboxArrowClass}
                  aria-label={labels.previous}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg>
                </button>
                <button
                  type="button"
                  onClick={showNextLightbox}
                  className={lightboxArrowClass}
                  aria-label={labels.next}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>
                </button>
              </>
            )}
          </footer>
        </div>,document.body
      ) : null}
    </>
  );
}

