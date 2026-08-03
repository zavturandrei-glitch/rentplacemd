"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getApartmentDisplayAddress } from "@/lib/apartmentLocalization";
import { rentPlaceLocationCount, rentPlaceLocations } from "@/lib/locations";
import type { Language } from "@/locales/translations";
import styles from "@/components/LocationMap.module.css";

const cityByLanguage: Record<Language, string> = {
  ru: "Кишинёв, Молдова",
  ro: "Chișinău, Moldova",
  en: "Chisinau, Moldova",
  uk: "Кишинів, Молдова",
  cs: "Kišiněv, Moldavsko",
};

const textByLanguage: Record<Language, {
  title: string;
  open: string;
  apartments: string;
  loading: string;
  mapTitle: (count: number) => string;
}> = {
  ru: {
    title: "RentPlaceMD на карте",
    open: "Открыть адрес в Google Maps",
    apartments: "Квартиры по этому адресу",
    loading: "Загружаем карту",
    mapTitle: (count) => `${count} адресов RentPlaceMD на карте Кишинёва`,
  },
  ro: {
    title: "RentPlaceMD pe hartă",
    open: "Deschide adresa în Google Maps",
    apartments: "Apartamente la această adresă",
    loading: "Se încarcă harta",
    mapTitle: (count) => `${count} adrese RentPlaceMD pe harta Chișinăului`,
  },
  en: {
    title: "RentPlaceMD on the map",
    open: "Open address in Google Maps",
    apartments: "Apartments at this address",
    loading: "Loading the map",
    mapTitle: (count) => `${count} RentPlaceMD addresses on the Chișinău map`,
  },
  uk: {
    title: "RentPlaceMD на карті",
    open: "Відкрити адресу в Google Maps",
    apartments: "Квартири за цією адресою",
    loading: "Завантажуємо карту",
    mapTitle: (count) => `${count} адрес RentPlaceMD на карті Кишинева`,
  },
  cs: {
    title: "RentPlaceMD na mapě",
    open: "Otevřít adresu v Google Maps",
    apartments: "Apartmány na této adrese",
    loading: "Načítá se mapa",
    mapTitle: (count) => `${count} adres RentPlaceMD na mapě Kišiněva`,
  },
};

export default function LocationMap() {
  const { language } = useLanguage();
  const text = textByLanguage[language];
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  const visibleLocations = useMemo(
    () => rentPlaceLocations.map((location) => {
      const displayName = getApartmentDisplayAddress(
        location.primaryApartmentId,
        location.name,
        language,
      );
      const [city, country] = cityByLanguage[language].split(", ");
      const includesCity = displayName.toLocaleLowerCase(language)
        .includes(city.toLocaleLowerCase(language));
      return {
        ...location,
        displayName,
        displayAddress: includesCity
          ? `${displayName}, ${country}`
          : `${displayName}, ${city}, ${country}`,
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
      const points = visibleLocations.map((location) =>
        leaflet.latLng(location.latitude, location.longitude),
      );

      leaflet.polyline(points, {
        color: "#38bdf8",
        weight: 3,
        opacity: 0.72,
        lineCap: "round",
        lineJoin: "round",
        dashArray: "8 9",
        interactive: false,
      }).addTo(map);

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
        const apartments = document.createElement("span");
        apartments.className = styles.popupApartments;
        apartments.textContent = text.apartments + ": ";
        location.apartments.forEach((apartment, apartmentIndex) => {
          const apartmentLink = document.createElement("a");
          apartmentLink.href = apartment.href;
          apartmentLink.textContent = `ID ${apartment.id}`;
          apartments.append(apartmentLink);
          if (apartmentIndex < location.apartments.length - 1) {
            apartments.append(document.createTextNode(" · "));
          }
        });
        const link = document.createElement("a");
        link.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = text.open;
        popup.append(address);
        if (location.apartments.length > 0) popup.append(apartments);
        popup.append(link);

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
  }, [shouldLoadMap, text.apartments, text.open, visibleLocations]);

  return (
    <section
      id="rentplace-map"
      className="scroll-mt-[180px] bg-[#07111f] px-4 py-8 sm:px-6 sm:py-12 lg:scroll-mt-8 lg:px-8"
    >
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[22px] border border-white/10 bg-[#111e31] shadow-[0_16px_44px_rgba(0,0,0,.25)] sm:rounded-[26px]">
        <header className="px-5 py-5 sm:px-8 sm:py-7">
          <h2 className="text-xl font-black leading-tight tracking-[-0.03em] text-white sm:text-3xl">
            {text.title}
          </h2>
        </header>

        <div className="relative border-t border-white/10 bg-[#e9e5dc]">
          <div
            ref={mapContainerRef}
            className={`${styles.map} h-[330px] sm:h-[430px] lg:h-[500px]`}
            role="region"
            aria-label={text.mapTitle(rentPlaceLocationCount)}
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
