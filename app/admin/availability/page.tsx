import type { Metadata } from "next";
import AdminAvailabilityManager from "@/components/AdminAvailabilityManager";
import { apartmentDetailsById } from "@/data/apartments";

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
  const apartments = Object.values(apartmentDetailsById).map((apartment) => ({
    id: apartment.id,
    label: kindLabel[apartment.kind],
    price: apartment.price,
    guests: apartment.guests,
    image: apartment.images[0],
  }));

  return <AdminAvailabilityManager apartments={apartments} />;
}
