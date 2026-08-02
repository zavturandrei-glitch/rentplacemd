import {
  activeApartments,
  getApartmentPath,
  type ApartmentId,
} from "@/lib/apartments";

type LocationDefinition = {
  key: string;
  primaryApartmentId: ApartmentId;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  matchesAddress: (address: string) => boolean;
};

// Coca 15 and Varlaam 50 were verified against their exact Google Maps place
// results on 2026-08-02. The address remains the source for external map links.
const locationDefinitions: readonly LocationDefinition[] = [
  {
    key: "ismail-88",
    primaryApartmentId: 25,
    name: "Ismail 88",
    address: "Strada Ismail 88, Chișinău, Moldova",
    latitude: 47.017963,
    longitude: 28.849791,
    matchesAddress: (address) => address.includes("Измаил 88"),
  },
  {
    key: "lev-tolstoi-63-1",
    primaryApartmentId: 77,
    name: "Lev Tolstoi 63/1",
    address: "Strada Lev Tolstoi 63/1, Chișinău, Moldova",
    latitude: 47.015703,
    longitude: 28.847644,
    matchesAddress: (address) => address.includes("Лев Толстой, 63/1"),
  },
  {
    key: "mihai-eminescu-76",
    primaryApartmentId: 76,
    name: "Mihai Eminescu 76",
    address: "Strada Mihai Eminescu 76, Chișinău, Moldova",
    latitude: 47.0241,
    longitude: 28.841086,
    matchesAddress: (address) => address.includes("Михай Эминеску, 76"),
  },
  {
    key: "grigore-ureche-67",
    primaryApartmentId: 67,
    name: "Grigore Ureche 67",
    address: "Strada Grigore Ureche 67, Chișinău, Moldova",
    latitude: 47.027842,
    longitude: 28.846179,
    matchesAddress: (address) => address.includes("Grigore Ureche 67"),
  },
  {
    key: "cuza-voda-1-2",
    primaryApartmentId: 6,
    name: "Cuza Vodă 1/2",
    address: "Bulevardul Cuza Vodă 1/2, Chișinău, Moldova",
    latitude: 46.98763,
    longitude: 28.87104,
    matchesAddress: (address) => address.includes("Cuza Vodă 1/2"),
  },
  {
    key: "coca-15",
    primaryApartmentId: 201,
    name: "Eugen Coca 15",
    address: "Strada Eugen Coca 15, Chișinău, Moldova",
    latitude: 47.0271791,
    longitude: 28.8080887,
    matchesAddress: (address) => address.includes("Coca 15"),
  },
  {
    key: "mitropolit-varlaam-50",
    primaryApartmentId: 205,
    name: "Mitropolit Varlaam 50",
    address: "Strada Mitropolit Varlaam 50, Chișinău, Moldova",
    latitude: 47.0178165,
    longitude: 28.8470655,
    matchesAddress: (address) => address.includes("Mitropolit Varlaam 50"),
  },
] as const;

export const rentPlaceLocations = locationDefinitions.map((location) => ({
  ...location,
  apartments: activeApartments
    .filter((apartment) => location.matchesAddress(apartment.address))
    .map((apartment) => ({
      id: apartment.id,
      href: getApartmentPath(apartment),
    })),
}));

export const rentPlaceLocationCount = rentPlaceLocations.length;
