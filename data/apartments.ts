import type { ApartmentDetailsData } from "@/components/ApartmentDetails";

export const apartmentDetailsById = {
  10: { id: 10, price: 800, kind: "oneBedroom", guests: 4, heroPosition: "42% center", images: ["/apartments/izmail88-10/1.png", "/apartments/izmail88-10/2.png", "/apartments/izmail88-10/3.png", "/apartments/izmail88-10/4.png", "/apartments/izmail88-10/5.png"] },
  11: { id: 11, price: 800, kind: "studio", guests: 2, images: ["/apartments/izmail88-11/1.png", "/apartments/izmail88-11/2.png", "/apartments/izmail88-11/3.png", "/apartments/izmail88-11/4.png"] },
  12: { id: 12, price: 800, kind: "oneBedroom", guests: 3, images: ["/apartments/izmail88-12/1.png", "/apartments/izmail88-12/2.png", "/apartments/izmail88-12/3.png", "/apartments/izmail88-12/4.png"] },
  13: { id: 13, price: 900, kind: "twoBedroom", guests: 4, images: ["/apartments/izmail88-13/1.png", "/apartments/izmail88-13/2.png", "/apartments/izmail88-13/3.png", "/apartments/izmail88-13/4.png", "/apartments/izmail88-13/5.png"] },
  20: { id: 20, price: 800, kind: "oneBedroom", guests: 4, images: ["/apartments/izmail88-20/1.png", "/apartments/izmail88-20/2.png", "/apartments/izmail88-20/3.png", "/apartments/izmail88-20/4.png", "/apartments/izmail88-20/5.png"] },
  21: { id: 21, price: 800, kind: "oneBedroom", guests: 3, images: ["/apartments/izmail88-21/1.png", "/apartments/izmail88-21/2.png", "/apartments/izmail88-21/3.png", "/apartments/izmail88-21/4.png", "/apartments/izmail88-21/5.png"] },
  22: { id: 22, price: 800, kind: "studio", guests: 2, images: ["/apartments/izmail88-22/1.png", "/apartments/izmail88-22/2.png", "/apartments/izmail88-22/3.png", "/apartments/izmail88-22/4.png", "/apartments/izmail88-22/5.png"] },
  23: { id: 23, price: 800, kind: "studio", guests: 2, images: ["/apartments/izmail88-23/1.png", "/apartments/izmail88-23/2.png", "/apartments/izmail88-23/3.png", "/apartments/izmail88-23/4.png", "/apartments/izmail88-23/5.png"] },
  37: { id: 37, price: 800, kind: "oneBedroom", guests: 4, images: ["/apartments/izmail88-37/1.png", "/apartments/izmail88-37/2.png", "/apartments/izmail88-37/3.png", "/apartments/izmail88-37/4.png"] },
  38: { id: 38, price: 800, kind: "oneBedroom", guests: 4, images: ["/apartments/izmail88-38/1.png", "/apartments/izmail88-38/2.png", "/apartments/izmail88-38/3.png", "/apartments/izmail88-38/4.png", "/apartments/izmail88-38/5.png"] },
  42: { id: 42, price: 1000, kind: "twoBedroomPlus", guests: 5, images: ["/apartments/izmail88-42/1.png", "/apartments/izmail88-42/2.png", "/apartments/izmail88-42/3.png", "/apartments/izmail88-42/4.png"] },
  371: { id: 371, price: 800, kind: "studio", guests: 2, images: ["/apartments/izmail88-371/1.png", "/apartments/izmail88-371/2.png", "/apartments/izmail88-371/3.png", "/apartments/izmail88-371/4.png"] },
} as const satisfies Record<number, ApartmentDetailsData>;
