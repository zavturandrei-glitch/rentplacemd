export type ApartmentAvailability = {
  apartmentId: string;
  bookedDates: string[];
};

export const apartmentAvailability: ApartmentAvailability[] = [
  {
    apartmentId: "13",
    bookedDates: ["2026-07-01", "2026-07-02", "2026-07-03", "2026-07-12"],
  },
  {
    apartmentId: "20",
    bookedDates: ["2026-07-05", "2026-07-06", "2026-07-18", "2026-07-19"],
  },
  {
    apartmentId: "21",
    bookedDates: ["2026-07-09", "2026-07-10", "2026-07-11"],
  },
  {
    apartmentId: "22",
    bookedDates: ["2026-07-14", "2026-07-15"],
  },
  {
    apartmentId: "23",
    bookedDates: ["2026-07-20", "2026-07-21", "2026-07-22"],
  },
  {
    apartmentId: "38",
    bookedDates: ["2026-07-04", "2026-07-05", "2026-07-25"],
  },
  {
    apartmentId: "42",
    bookedDates: ["2026-07-07", "2026-07-08", "2026-07-16", "2026-07-17"],
  },
];

export function getApartmentBookedDates(apartmentId: string | number) {
  const availability = apartmentAvailability.find(
    (item) => item.apartmentId === String(apartmentId),
  );

  return availability?.bookedDates ?? [];
}
