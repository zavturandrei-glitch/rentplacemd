import type {
  ApartmentDetailsData,
  ApartmentGuests,
  ApartmentKind,
} from "@/components/ApartmentDetails";

export type ApartmentClass = "economy" | "standard" | "premium";
export type ApartmentStatus = "active" | "hidden";
export type ApartmentRooms = "studio" | "1+1" | "2+1";

export type Apartment = {
  id: number;
  slug: string;
  title: string;
  address: string;
  floor: number | null;
  entrance: string | null;
  apartmentNumber: string | null;
  class: ApartmentClass;
  price: number;
  guests: ApartmentGuests;
  rooms: ApartmentRooms;
  beds: number;
  shortDescription: string;
  fullDescription: string;
  amenities: string[];
  photos: string[];
  facadePhoto: string;
  status: ApartmentStatus;
  kind: ApartmentKind;
  cardPhoto?: string;
  heroPosition?: string;
  cardImagePosition?: string;
};

export const apartmentClassLabels: Record<ApartmentClass, string> = {
  economy: "Эконом",
  standard: "Стандарт",
  premium: "Премиум",
};

const commonAmenities = [
  "Wi-Fi",
  "TV",
  "Кондиционер",
  "Кухня",
  "Чистое белье",
  "Душ",
  "Парковка рядом",
  "Заселение 24/7",
];

function apartmentPhotos(slug: string, count: number) {
  return Array.from(
    { length: count },
    (_, index) => "/apartments/" + slug + "/" + (index + 1) + ".png",
  );
}

function createApartment(
  input: Omit<
    Apartment,
    "slug" | "title" | "address" | "facadePhoto" | "amenities" | "status"
  > &
    Partial<
      Pick<
        Apartment,
        "slug" | "title" | "address" | "facadePhoto" | "amenities" | "status"
      >
    >,
): Apartment {
  const slug = input.slug ?? "izmail88-" + input.id;

  return {
    ...input,
    slug,
    title: input.title ?? "Измаил 88",
    address: input.address ?? "Измаил 88, Кишинев",
    facadePhoto: input.facadePhoto ?? "/common/building.png",
    amenities: input.amenities ?? commonAmenities,
    status: input.status ?? "active",
  };
}

export const apartments = [
  createApartment({
    id: 1,
    slug: "izmail88-1",
    title: "Измаил 88",
    address: "Измаил 88",
    floor: 3,
    entrance: "1",
    apartmentNumber: "1",
    class: "standard",
    price: 1000,
    guests: 4,
    rooms: "1+1",
    beds: 2,
    kind: "oneBedroom",
    shortDescription:
      "Новая просторная квартира в центре Кишинёва для проживания до 4 гостей.",
    fullDescription:
      "Новая просторная квартира в жилом комплексе Измаил 88.\n\nКвартира после нового ремонта, чистая, светлая и уютная. Здесь ощущается свежесть нового жилья. Всё выглядит новым, аккуратным и ухоженным.\n\nВ квартире расположены две полноценные двуспальные кровати, благодаря чему здесь комфортно разместятся до четырёх гостей.\n\nЕсть полностью оборудованная кухня, современная ванная комната с душевой кабиной, кондиционер, Smart TV, быстрый Wi-Fi, холодильник, микроволновая печь, варочная поверхность, электрический чайник и всё необходимое для комфортного проживания.\n\nОтличный вариант для семьи, друзей, туристов и командировок.",
    amenities: [
      "Wi-Fi",
      "Кондиционер",
      "Smart TV",
      "2 двуспальные кровати",
      "Полностью оборудованная кухня",
      "Холодильник",
      "Микроволновая печь",
      "Варочная поверхность",
      "Электрический чайник",
      "Посуда",
      "Обеденный стол",
      "Душевая кабина",
      "Чистое постельное бельё",
      "Полотенца",
    ],
    photos: apartmentPhotos("izmail88-1", 8),
  }),
  createApartment({
    id: 10,
    floor: null,
    entrance: null,
    apartmentNumber: "10",
    class: "standard",
    price: 800,
    guests: 4,
    rooms: "1+1",
    beds: 2,
    kind: "oneBedroom",
    shortDescription: "Квартира 1+1 в комплексе Измаил 88, до 4 гостей.",
    fullDescription:
      "Уютная квартира 1+1 в центре Кишинева. Отдельная спальня, гостиная зона, кухня и все необходимое для комфортного проживания.",
    photos: apartmentPhotos("izmail88-10", 5),
    heroPosition: "42% center",
    cardImagePosition: "42% center",
  }),
  createApartment({
    id: 11,
    floor: null,
    entrance: null,
    apartmentNumber: "11",
    class: "standard",
    price: 800,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription: "Студия в комплексе Измаил 88, до 2 гостей.",
    fullDescription:
      "Уютная студия в центре Кишинева. Подходит для одного гостя или пары, есть спальная зона, кухня и все необходимое.",
    photos: apartmentPhotos("izmail88-11", 4),
  }),
  createApartment({
    id: 12,
    floor: null,
    entrance: null,
    apartmentNumber: "12",
    class: "standard",
    price: 800,
    guests: 3,
    rooms: "1+1",
    beds: 2,
    kind: "oneBedroom",
    shortDescription: "Квартира 1+1 в комплексе Измаил 88, до 3 гостей.",
    fullDescription:
      "Уютная квартира 1+1 в центре Кишинева с отдельной спальней, гостиной зоной и оборудованной кухней.",
    photos: apartmentPhotos("izmail88-12", 4),
  }),
  createApartment({
    id: 13,
    floor: null,
    entrance: null,
    apartmentNumber: "13",
    class: "economy",
    price: 900,
    guests: 4,
    rooms: "2+1",
    beds: 2,
    kind: "twoBedroom",
    shortDescription: "Квартира с двумя спальнями в комплексе Измаил 88.",
    fullDescription:
      "Практичная квартира с двумя спальнями в центре Кишинева. Хороший вариант для семьи, пары или гостей в командировке.",
    photos: apartmentPhotos("izmail88-13", 5),
    cardPhoto: "/apartments/izmail88-13/4.png",
  }),
  createApartment({
    id: 20,
    floor: null,
    entrance: null,
    apartmentNumber: "20",
    class: "economy",
    price: 800,
    guests: 4,
    rooms: "1+1",
    beds: 2,
    kind: "oneBedroom",
    shortDescription: "Квартира 1+1 в комплексе Измаил 88, до 4 гостей.",
    fullDescription:
      "Практичная квартира 1+1 в центре Кишинева с отдельной спальней, гостиной зоной и кухней.",
    photos: apartmentPhotos("izmail88-20", 5),
    cardPhoto: "/apartments/izmail88-20/2.png",
  }),
  createApartment({
    id: 21,
    floor: null,
    entrance: null,
    apartmentNumber: "21",
    class: "economy",
    price: 800,
    guests: 3,
    rooms: "1+1",
    beds: 2,
    kind: "oneBedroom",
    shortDescription: "Квартира 1+1 в комплексе Измаил 88, до 3 гостей.",
    fullDescription:
      "Практичная квартира 1+1 в центре Кишинева для пары, семьи или гостей в командировке.",
    photos: apartmentPhotos("izmail88-21", 5),
    cardPhoto: "/apartments/izmail88-21/2.png",
  }),
  createApartment({
    id: 22,
    floor: null,
    entrance: null,
    apartmentNumber: "22",
    class: "standard",
    price: 800,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription: "Студия в комплексе Измаил 88, до 2 гостей.",
    fullDescription:
      "Уютная студия в центре Кишинева для одного гостя или пары, со спальной зоной и кухней.",
    photos: apartmentPhotos("izmail88-22", 5),
  }),
  createApartment({
    id: 23,
    floor: null,
    entrance: null,
    apartmentNumber: "23",
    class: "standard",
    price: 800,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription: "Студия в комплексе Измаил 88, до 2 гостей.",
    fullDescription:
      "Уютная студия в центре Кишинева с кухней, Wi-Fi, TV и всем необходимым для проживания.",
    photos: apartmentPhotos("izmail88-23", 5),
  }),
  createApartment({
    id: 37,
    floor: null,
    entrance: null,
    apartmentNumber: "37",
    class: "economy",
    price: 800,
    guests: 4,
    rooms: "1+1",
    beds: 2,
    kind: "oneBedroom",
    shortDescription: "Квартира 1+1 в комплексе Измаил 88, до 4 гостей.",
    fullDescription:
      "Практичная квартира 1+1 в центре Кишинева с удобной локацией и всем необходимым для проживания.",
    photos: apartmentPhotos("izmail88-37", 4),
    cardPhoto: "/apartments/izmail88-37/2.png",
  }),
  createApartment({
    id: 38,
    floor: null,
    entrance: null,
    apartmentNumber: "38",
    class: "economy",
    price: 800,
    guests: 4,
    rooms: "1+1",
    beds: 2,
    kind: "oneBedroom",
    shortDescription: "Квартира 1+1 в комплексе Измаил 88, до 4 гостей.",
    fullDescription:
      "Практичная квартира 1+1 в центре Кишинева для комфортного краткосрочного проживания.",
    photos: apartmentPhotos("izmail88-38", 5),
    cardPhoto: "/apartments/izmail88-38/2.png",
  }),
  createApartment({
    id: 42,
    floor: null,
    entrance: null,
    apartmentNumber: "42",
    class: "standard",
    price: 1000,
    guests: 5,
    rooms: "2+1",
    beds: 3,
    kind: "twoBedroomPlus",
    shortDescription:
      "Просторная квартира 2+1 в комплексе Измаил 88, до 5 гостей.",
    fullDescription:
      "Просторная квартира 2+1 в центре Кишинева. Две спальни, гостиная зона, кухня и комфортное размещение до 5 гостей.",
    photos: apartmentPhotos("izmail88-42", 4),
    cardPhoto: "/apartments/izmail88-42/2.png",
  }),
  createApartment({
    id: 371,
    floor: null,
    entrance: null,
    apartmentNumber: "371",
    class: "standard",
    price: 800,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription: "Студия в комплексе Измаил 88, до 2 гостей.",
    fullDescription:
      "Уютная студия в центре Кишинева для одного гостя или пары, с удобной локацией и всем необходимым.",
    photos: apartmentPhotos("izmail88-371", 4),
  }),
] as const satisfies readonly Apartment[];

export const activeApartments = apartments.filter(
  (apartment) => apartment.status === "active",
);

export const apartmentDetailsById = Object.fromEntries(
  apartments.map((apartment) => [
    apartment.id,
    {
      id: apartment.id,
      price: apartment.price,
      images: apartment.photos,
      kind: apartment.kind,
      guests: apartment.guests,
      heroPosition: apartment.heroPosition,
      facadePhoto: apartment.facadePhoto,
    } satisfies ApartmentDetailsData,
  ]),
) as Record<number, ApartmentDetailsData>;

export function getApartmentBySlug(slug: string) {
  return apartments.find((apartment) => apartment.slug === slug);
}

export function getApartmentById(id: string | number) {
  return apartments.find((apartment) => String(apartment.id) === String(id));
}

export function getApartmentPath(apartment: Pick<Apartment, "slug">) {
  return "/apartment/" + apartment.slug;
}

export function getApartmentPathById(id: string | number) {
  const apartment = getApartmentById(id);
  return apartment ? getApartmentPath(apartment) : null;
}
