"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getApartmentDisplayAddress } from "@/lib/apartmentLocalization";
import type { Language } from "@/locales/translations";
import styles from "@/components/LocationMap.module.css";

const locations = [
  { id: 25, name: "Ismail 88", address: "Strada Ismail 88, Chișinău, Moldova", latitude: 47.017963, longitude: 28.849791 },
  { id: 77, name: "Lev Tolstoi 63/1", address: "Strada Lev Tolstoi 63/1, Chișinău, Moldova", latitude: 47.015703, longitude: 28.847644 },
  { id: 76, name: "Mihai Eminescu 76", address: "Strada Mihai Eminescu 76, Chișinău, Moldova", latitude: 47.0241, longitude: 28.841086 },
  { id: 67, name: "Grigore Ureche 67", address: "Strada Grigore Ureche 67, Chișinău, Moldova", latitude: 47.027842, longitude: 28.846179 },
  { id: 6, name: "Cuza Vodă 1/2", address: "Bulevardul Cuza Vodă 1/2, Chișinău, Moldova", latitude: 46.98763, longitude: 28.87104 },
] as const;

const cityByLanguage: Record<Language, string> = {
  ru: "Кишинёв, Молдова",
  ro: "Chișinău, Moldova",
  en: "Chisinau, Moldova",
  uk: "Кишинів, Молдова",
  cs: "Kišiněv, Moldavsko",
};

const textByLanguage: Record<Language, {
  title: string;
  text: string;
  open: string;
  loading: string;
  mapTitle: string;
}> = {
  ru: {
    title: "RentPlaceMD на карте",
    text: "Пять адресов в Кишинёве — без маршрутов и лишних панелей.",
    open: "Открыть адрес в Google Maps",
    loading: "Загружаем карту",
    mapTitle: "Пять адресов RentPlaceMD на карте Кишинёва",
  },
  ro: {
    title: "RentPlaceMD pe hartă",
    text: "Cinci adrese în Chișinău, fără trasee sau panouri inutile.",
    open: "Deschide adresa în Google Maps",
    loading: "Se încarcă harta",
    mapTitle: "Cinci adrese RentPlaceMD pe harta Chișinăului",
  },
  en: {
    title: "RentPlaceMD on the map",
    text: "Five Chișinău addresses, without routes or distracting panels.",
    open: "Open address in Google Maps",
    loading: "Loading the map",
    mapTitle: "Five RentPlaceMD addresses on the Chișinău map",
  },
  uk: {
    title: "RentPlaceMD на карті",
    text: "П’ять адрес у Кишиневі — без маршрутів і зайвих панелей.",
    open: "Відкрити адресу в Google Maps",
    loading: "Завантажуємо карту",
    mapTitle: "П’ять адрес RentPlaceMD на карті Кишинева",
  },
  cs: {
    title: "RentPlaceMD na mapě",
    text: "Pět adres v Kišiněvě bez tras a zbytečných panelů.",
    open: "Otevřít adresu v Google Maps",
    loading: "Načítá se mapa",
    mapTitle: "Pět adres RentPlaceMD na mapě Kišiněva",
  },
};

export default function LocationMap() {
  const { language } = useLanguage();
  const text = textByLanguage[language];
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  const visibleLocations = useMemo(
    () => locations.map((location) => {
      const displayName = getApartmentDisplayAddress(location.id, location.name, language);
      return {
        ...location,
        displayName,
        displayAddress: displayName + ", " + cityByLanguage[language],
      };
    }),
    [language],
  );

  useEffect(() => {
    const element = mapContainerRef.current;
    if (!element || shouldLoadMap) return;

    if (!("IntersectionObserver" in window)) {
      const fallbackTimer = globalThis.setTimeout(() => setShouldLoadMap(true), 0);
      return () => globalThis.clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoadMap]);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container || !shouldLoadMap) return;

    let disposed = false;
    let mapInstance: import("leaflet").Map | null = null;
    setMapReady(false);

    void (async () => {
      const leaflet = await import("leaflet");
      if (disposed || !mapContainerRef.current) return;

      const map = leaflet.map(mapContainerRef.current, {
        attributionControl: true,
        scrollWheelZoom: false,
        zoomControl: true,
      });
      mapInstance = map;

      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap",
          maxZoom: 19,
        })
        .addTo(map);

      const bounds = leaflet.latLngBounds([]);

      visibleLocations.forEach((location, index) => {
        const icon = leaflet.divIcon({
          className: styles.markerRoot,
          html: `<span class="${styles.markerPin}"><span>${index + 1}</span></span>`,
          iconAnchor: [21, 46],
          iconSize: [42, 48],
          popupAnchor: [0, -42],
        });

        const marker = leaflet
          .marker([location.latitude, location.longitude], {
            icon,
            keyboard: true,
            title: location.displayAddress,
          })
          .addTo(map);

        const popup = document.createElement("div");
        popup.className = styles.popup;
        const address = document.createElement("strong");
        address.textContent = location.displayAddress;
        const link = document.createElement("a");
        link.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = text.open;
        popup.append(address, link);

        marker.bindPopup(popup, { closeButton: false, offset: [0, -2] });
        bounds.extend([location.latitude, location.longitude]);
      });

      map.fitBounds(bounds, {
        maxZoom: 14,
        padding: [34, 34],
      });

      window.setTimeout(() => {
        if (!disposed) {
          map.invalidateSize();
          setMapReady(true);
        }
      }, 0);
    })();

    return () => {
      disposed = true;
      mapInstance?.remove();
    };
  }, [shouldLoadMap, text.open, visibleLocations]);

  return (
    <section
      id="rentplace-map"
      className="scroll-mt-[210px] bg-[#fffaf0] px-4 py-10 sm:px-6 sm:py-14 lg:scroll-mt-8 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[22px] bg-white shadow-[0_14px_44px_rgba(15,23,42,0.08)] ring-1 ring-black/6 sm:rounded-[26px]">
        <header className="px-5 py-6 sm:px-8 sm:py-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d4146f]">RentPlace</p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#07111f] sm:text-4xl">
            {text.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            {text.text}
          </p>
        </header>

        <div className="relative border-t border-black/6 bg-[#e9e5dc]">
          <div
            ref={mapContainerRef}
            className={`${styles.map} h-[360px] sm:h-[460px] lg:h-[520px]`}
            role="region"
            aria-label={text.mapTitle}
            aria-busy={!mapReady}
          />
          {!mapReady ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,#eee9df_0%,#f8f5ee_50%,#e9e3d8_100%)] px-6 text-center">
              <p className="rounded-full bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm">
                {text.loading}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
