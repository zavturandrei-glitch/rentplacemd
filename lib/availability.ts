import availabilityData from "@/data/availability.json";

export type ApartmentAvailability = {
  apartmentId: string;
  bookedDates: string[];
};

export const apartmentAvailability: ApartmentAvailability[] = availabilityData;

export function getApartmentBookedDates(apartmentId: string | number) {
  const availability = apartmentAvailability.find(
    (item) => item.apartmentId === String(apartmentId),
  );

  return availability?.bookedDates ?? [];
}
