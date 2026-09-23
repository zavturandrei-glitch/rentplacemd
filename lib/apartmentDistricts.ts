import { activeApartments, type Apartment, type ApartmentId } from "@/lib/apartments";

export const centerApartmentsPath = "/apartments/center";

// These address groups are already identified as central in the RentPlaceMD
// catalogue content and location data. Ambiguous addresses stay unclassified.
const verifiedCenterAddressFragments = [
  "Albișoara 16",
  "Измаил 88",
  "Измаил 31",
  "Grigore Ureche 67",
  "Михай Эминеску, 76",
  "Лев Толстой, 63/1",
] as const;

export function isCenterApartment(apartment: Pick<Apartment, "address">) {
  return verifiedCenterAddressFragments.some((fragment) => apartment.address.includes(fragment));
}

export const centerApartments = activeApartments.filter(isCenterApartment);
const centerApartmentIds = new Set(centerApartments.map((apartment) => String(apartment.id)));

export function isCenterApartmentId(id: ApartmentId) {
  return centerApartmentIds.has(String(id));
}

export const botanicaApartments = activeApartments.filter((apartment) =>
  apartment.address.includes("Cuza Vodă 1/2"),
);
