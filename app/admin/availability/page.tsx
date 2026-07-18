import type { Metadata } from "next";
import AdminAvailabilityManager from "@/components/AdminAvailabilityManager";
import { apartmentClassLabels, apartments } from "@/lib/apartments";
import { getApartmentDisplayAddress } from "@/lib/apartmentLocalization";

export const metadata: Metadata = {
  title: "Управление занятостью квартир",
  robots: {
    index: false,
    follow: false,
  },
};

const kindLabel = {
  studio: "Студия",
  oneBedroom: "1+1 квартира",
  twoBedroom: "2 спальни",
  twoBedroomPlus: "2+1 квартира",
} as const;

export default function AdminAvailabilityPage() {
  const availabilityApartments = apartments.map((apartment) => ({
    id: apartment.id,
    title: apartment.title,
    address: getApartmentDisplayAddress(apartment.id, apartment.title, "ru").replace(
      /^Измаил 88$/,
      "Измаил, 88",
    ),
    category: apartmentClassLabels[apartment.class],
    label: kindLabel[apartment.kind],
    price: apartment.price,
    guests: apartment.guests,
    image: apartment.photos[0],
  }));

  return <AdminAvailabilityManager apartments={availabilityApartments} />;
}
