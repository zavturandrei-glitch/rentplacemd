import type {
  ApartmentDetailsData,
  ApartmentGuests,
  ApartmentKind,
} from "@/components/ApartmentDetails";

export type ApartmentClass = "economy" | "standard" | "standardPlus";
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
  galleryLayout?: ApartmentDetailsData["galleryLayout"];
};

export const apartmentClassLabels: Record<ApartmentClass, string> = {
  economy: "Эконом",
  standard: "Стандарт",
  standardPlus: "Standard+",
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

function apartmentPhotos(slug: string, count: number, extension = "png") {
  return Array.from(
    { length: count },
    (_, index) =>
      "/apartments/" + slug + "/" + (index + 1) + "." + extension,
  );
}

function namedApartmentPhoto(slug: string, fileName: string) {
  return "/apartments/" + slug + "/" + fileName;
}

function apartmentPhotoRange(slug: string, start: number, end: number) {
  return Array.from(
    { length: end - start + 1 },
    (_, index) => namedApartmentPhoto(slug, "Ismail 88 et 3-" + (start + index) + ".jpg"),
  );
}

function promotePhoto(photos: string[], mainPhoto: string) {
  return [mainPhoto, ...photos.filter((photo) => photo !== mainPhoto)];
}

function apartmentPhotosWithMain(
  slug: string,
  count: number,
  mainFileName: string,
  extension = "png",
) {
  return promotePhoto(apartmentPhotos(slug, count, extension), namedApartmentPhoto(slug, mainFileName));
}

function ismail88Et3Photos(slug: string, start: number, end: number) {
  const photos = apartmentPhotoRange(slug, start, end);

  return {
    photos: photos.slice(0, -1),
    facadePhoto: photos[photos.length - 1],
  };
}

function ismail88Et3PhotosWithMain(
  slug: string,
  start: number,
  end: number,
  mainPhotoNumber: number,
) {
  const gallery = ismail88Et3Photos(slug, start, end);
  const mainPhoto = namedApartmentPhoto(slug, "Ismail 88 et 3-" + mainPhotoNumber + ".jpg");

  return {
    ...gallery,
    photos: promotePhoto(gallery.photos, mainPhoto),
    cardPhoto: mainPhoto,
  };
}

function ismail88Et3BasePhotos(slug: string, end: number) {
  const photos = [
    namedApartmentPhoto(slug, "Ismail 88 et 3.jpg"),
    ...apartmentPhotoRange(slug, 2, end),
  ];

  return {
    photos: photos.slice(0, -1),
    facadePhoto: photos[photos.length - 1],
  };
}

function ismail88Et3BasePhotosWithMain(
  slug: string,
  end: number,
  mainPhotoNumber: number,
) {
  const gallery = ismail88Et3BasePhotos(slug, end);
  const mainPhoto = namedApartmentPhoto(slug, "Ismail 88 et 3-" + mainPhotoNumber + ".jpg");

  return {
    ...gallery,
    photos: promotePhoto(gallery.photos, mainPhoto),
    cardPhoto: mainPhoto,
  };
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
    class: input.class,
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
    class: "standardPlus",
    price: 1000,
    guests: 4,
    rooms: "1+1",
    beds: 2,
    kind: "oneBedroom",
    shortDescription:
      "Новая просторная квартира в центре Кишинёва для проживания до 4 гостей.",
    fullDescription:
      "Новая просторная квартира в жилом комплексе Измаил 88.\n\nКвартира после нового ремонта, чистая, светлая и уютная.\n\nЗдесь ощущается свежесть нового жилья.\n\nВ квартире находятся две полноценные двуспальные кровати.\n\nМаксимальное размещение — до 4 гостей.\n\nЕсть полностью оборудованная кухня, современная душевая, кондиционер, Smart TV, быстрый Wi-Fi, холодильник, микроволновая печь, варочная поверхность, электрический чайник и всё необходимое для комфортного проживания.\n\nОтличный вариант для семьи, друзей, туристов и командировок.",
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
    photos: apartmentPhotos("izmail88-1", 8, "jpeg"),
  }),
  createApartment({
    id: 2,
    floor: 4,
    entrance: null,
    apartmentNumber: "2",
    class: "standardPlus",
    price: 900,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription: "Standard+ studio apartment in the Ismail 88 complex for up to 2 guests.",
    fullDescription:
      "Standard+ studio apartment in the Ismail 88 complex. Suitable for one guest or a couple, with Wi-Fi, TV, air conditioning, kitchen, clean linen and 24/7 check-in.",
    photos: apartmentPhotos("izmail88-2", 4, "jpeg"),
    facadePhoto: "/apartments/izmail88-2/4.jpeg",
    cardPhoto: "/apartments/izmail88-2/1.jpeg",
    galleryLayout: "extended",
  }),
  createApartment({
    id: 3,
    floor: null,
    entrance: null,
    apartmentNumber: "3",
    class: "standardPlus",
    price: 900,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription:
      "Современная студия категории Standard Plus в новом доме в центре Кишинёва для двух гостей.",
    fullDescription:
      "Современная студия категории Standard Plus в новом доме в центре Кишинёва.\n\nПодходит для двух гостей.\n\nВ квартире имеются большая двуспальная кровать, кондиционер, Smart TV, Wi-Fi, мини-кухня, холодильник, микроволновая печь, электрочайник, полный набор кухонной посуды, современная душевая, фен, полотенца, шампунь и гель для душа.\n\nКруглосуточное заселение по предварительной договорённости.",
    amenities: [
      "Большая двуспальная кровать",
      "Кондиционер",
      "Smart TV",
      "Wi-Fi",
      "Мини-кухня",
      "Холодильник",
      "Микроволновая печь",
      "Электрочайник",
      "Полный набор кухонной посуды",
      "Современная душевая",
      "Фен",
      "Полотенца",
      "Шампунь",
      "Гель для душа",
      "Заселение 24/7",
    ],
    photos: [
      "/apartments/izmail88-3/D4S_2531.jpg",
      "/apartments/izmail88-3/D4S_2532.jpg",
      "/apartments/izmail88-3/D4S_2535.jpg",
      "/apartments/izmail88-3/D4S_2533.jpg",
      "/apartments/izmail88-3/D4S_2538.jpg",
      "/apartments/izmail88-3/D4S_2536.jpg",
      "/apartments/izmail88-3/D4S_2534.jpg",
      "/apartments/izmail88-3/D4S_2539.jpg",
      "/apartments/izmail88-3/D4S_2540.jpg",
      "/apartments/izmail88-3/D4S_2543.jpg",
      "/apartments/izmail88-3/D4S_2544.jpg",
      "/apartments/izmail88-3/D4S_2545.jpg",
      "/apartments/izmail88-3/D4S_2546.jpg",
      "/apartments/izmail88-3/D4S_2547.jpg",
      "/apartments/izmail88-3/D4S_2552.jpg",
      "/apartments/izmail88-3/D4S_2553.jpg",
      "/apartments/izmail88-3/D4S_2555.jpg",
      "/apartments/izmail88-3/D4S_2554.jpg",
      "/apartments/izmail88-3/D4S_2551.jpg",
      "/apartments/izmail88-3/D4S_2549.jpg",
      "/apartments/izmail88-3/D4S_2550.jpg",
      "/apartments/izmail88-3/D4S_2548.jpg",
      "/apartments/izmail88-3/D4S_2557.jpg",
      "/apartments/izmail88-3/D4S_2556.jpg",
      "/apartments/izmail88-3/D4S_2561.jpg",
      "/apartments/izmail88-3/D4S_2559.jpg",
      "/apartments/izmail88-3/D4S_2560.jpg",
    ],
    cardPhoto: "/apartments/izmail88-3/D4S_2531.jpg",
  }),
  createApartment({
    id: 4,
    floor: 4,
    entrance: null,
    apartmentNumber: "4",
    class: "standardPlus",
    price: 900,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription: "Standard+ studio apartment in the Ismail 88 complex for up to 2 guests.",
    fullDescription:
      "Standard+ studio apartment in the Ismail 88 complex. Suitable for one guest or a couple, with Wi-Fi, TV, air conditioning, kitchen, clean linen and 24/7 check-in.",
    photos: apartmentPhotos("izmail88-4", 5, "jpeg"),
    facadePhoto: "/apartments/izmail88-4/5.jpeg",
    cardPhoto: "/apartments/izmail88-4/1.jpeg",
    galleryLayout: "extended",
  }),
  createApartment({
    id: 5,
    floor: null,
    entrance: null,
    apartmentNumber: "5",
    class: "standardPlus",
    price: 900,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription:
      "Современная студия категории Standard+ в центре Кишинёва для двух гостей.",
    fullDescription:
      "Современная студия категории Standard+ в новом доме в центре Кишинёва.\n\nПодходит для двух гостей.\n\nВ квартире имеются большая двуспальная кровать, кондиционер, Smart TV, Wi-Fi, мини-кухня, холодильник, микроволновая печь, электрочайник, кухонные принадлежности, современная душевая, фен, полотенца, шампунь и гель для душа.\n\nКруглосуточное заселение по предварительной договорённости.",
    amenities: [
      "Большая двуспальная кровать",
      "Кондиционер",
      "Smart TV",
      "Wi-Fi",
      "Мини-кухня",
      "Холодильник",
      "Микроволновая печь",
      "Электрочайник",
      "Кухонные принадлежности",
      "Современная душевая",
      "Фен",
      "Полотенца",
      "Шампунь",
      "Гель для душа",
      "Заселение 24/7",
    ],
    photos: [
      "/apartments/izmail88-5/D4S_2596.jpg",
      "/apartments/izmail88-5/D4S_2598.jpg",
      "/apartments/izmail88-5/D4S_2599.jpg",
      "/apartments/izmail88-5/D4S_2601.jpg",
      "/apartments/izmail88-5/D4S_2602.jpg",
      "/apartments/izmail88-5/D4S_2603.jpg",
      "/apartments/izmail88-5/D4S_2604.jpg",
      "/apartments/izmail88-5/D4S_2606.jpg",
      "/apartments/izmail88-5/D4S_2608.jpg",
      "/apartments/izmail88-5/D4S_2610.jpg",
      "/apartments/izmail88-5/D4S_2612.jpg",
      "/apartments/izmail88-5/D4S_2613.jpg",
      "/apartments/izmail88-5/D4S_2615.jpg",
      "/apartments/izmail88-5/D4S_2618.jpg",
      "/apartments/izmail88-5/D4S_2619.jpg",
      "/apartments/izmail88-5/D4S_2620.jpg",
      "/apartments/izmail88-5/D4S_2622.jpg",
      "/apartments/izmail88-5/D4S_2623.jpg",
      "/apartments/izmail88-5/D4S_2626.jpg",
    ],
    cardPhoto: "/apartments/izmail88-5/D4S_2602.jpg",
  }),
  createApartment({
    id: 7,
    floor: null,
    entrance: null,
    apartmentNumber: "7",
    class: "standardPlus",
    price: 900,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription:
      "Современная студия категории Standard+ в центре Кишинёва для двух гостей.",
    fullDescription:
      "Современная студия категории Standard+ в новом доме в центре Кишинёва.\n\nПодходит для двух гостей.\n\nВ квартире имеются большая двуспальная кровать, кондиционер, Smart TV, Wi-Fi, мини-кухня, холодильник, микроволновая печь, электрочайник, кухонные принадлежности, современная душевая, фен, полотенца, шампунь и гель для душа.\n\nКруглосуточное заселение по предварительной договорённости.",
    amenities: [
      "Большая двуспальная кровать",
      "Кондиционер",
      "Smart TV",
      "Wi-Fi",
      "Мини-кухня",
      "Холодильник",
      "Микроволновая печь",
      "Электрочайник",
      "Кухонные принадлежности",
      "Современная душевая",
      "Фен",
      "Полотенца",
      "Шампунь",
      "Гель для душа",
      "Заселение 24/7",
    ],
    photos: [
      "/apartments/izmail88-7/D4S_2562.jpg",
      "/apartments/izmail88-7/D4S_2563.jpg",
      "/apartments/izmail88-7/D4S_2565.jpg",
      "/apartments/izmail88-7/D4S_2567.jpg",
      "/apartments/izmail88-7/D4S_2568.jpg",
      "/apartments/izmail88-7/D4S_2569.jpg",
      "/apartments/izmail88-7/D4S_2570.jpg",
      "/apartments/izmail88-7/D4S_2571.jpg",
      "/apartments/izmail88-7/D4S_2572.jpg",
      "/apartments/izmail88-7/D4S_2573.jpg",
      "/apartments/izmail88-7/D4S_2574.jpg",
      "/apartments/izmail88-7/D4S_2575.jpg",
      "/apartments/izmail88-7/D4S_2576.jpg",
      "/apartments/izmail88-7/D4S_2579.jpg",
      "/apartments/izmail88-7/D4S_2580.jpg",
      "/apartments/izmail88-7/D4S_2581.jpg",
      "/apartments/izmail88-7/D4S_2582.jpg",
      "/apartments/izmail88-7/D4S_2583.jpg",
      "/apartments/izmail88-7/D4S_2584.jpg",
      "/apartments/izmail88-7/D4S_2585.jpg",
      "/apartments/izmail88-7/D4S_2587.jpg",
      "/apartments/izmail88-7/D4S_2588.jpg",
      "/apartments/izmail88-7/D4S_2589.jpg",
      "/apartments/izmail88-7/D4S_2590.jpg",
      "/apartments/izmail88-7/D4S_2591.jpg",
      "/apartments/izmail88-7/D4S_2592.jpg",
      "/apartments/izmail88-7/D4S_2594.jpg",
      "/apartments/izmail88-7/D4S_2595.jpg",
    ],
    cardPhoto: "/apartments/izmail88-7/D4S_2562.jpg",
  }),
  createApartment({
    id: 8,
    floor: null,
    entrance: null,
    apartmentNumber: "8",
    class: "standardPlus",
    price: 900,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription: "Standard+ studio apartment in the Ismail 88 complex for up to 2 guests.",
    fullDescription:
      "Standard+ studio apartment in the Ismail 88 complex. Suitable for one guest or a couple, with Wi-Fi, TV, air conditioning, kitchen, clean linen and 24/7 check-in.",
    galleryLayout: "extended",
    ...ismail88Et3PhotosWithMain("izmail88-8", 23, 46, 27),
  }),
  createApartment({
    id: 9,
    floor: null,
    entrance: null,
    apartmentNumber: "9",
    class: "standardPlus",
    price: 900,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription: "Standard+ studio apartment in the Ismail 88 complex for up to 2 guests.",
    fullDescription:
      "Standard+ studio apartment in the Ismail 88 complex. Suitable for one guest or a couple, with Wi-Fi, TV, air conditioning, kitchen, clean linen and 24/7 check-in.",
    galleryLayout: "extended",
    ...ismail88Et3BasePhotosWithMain("izmail88-9", 22, 8),
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
    id: 14,
    floor: null,
    entrance: null,
    apartmentNumber: "14",
    class: "standardPlus",
    price: 900,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription: "Standard+ studio apartment in the Ismail 88 complex for up to 2 guests.",
    fullDescription:
      "Standard+ studio apartment in the Ismail 88 complex. Suitable for one guest or a couple, with Wi-Fi, TV, air conditioning, kitchen, clean linen and 24/7 check-in.",
    galleryLayout: "extended",
    ...ismail88Et3PhotosWithMain("izmail88-14", 125, 147, 129),
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
    photos: apartmentPhotosWithMain("izmail88-20", 5, "4.png"),
    cardPhoto: "/apartments/izmail88-20/4.png",
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
    price: 900,
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
    id: 110,
    floor: null,
    entrance: null,
    apartmentNumber: "110",
    class: "standardPlus",
    price: 900,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription: "Standard+ studio apartment in the Ismail 88 complex for up to 2 guests.",
    fullDescription:
      "Standard+ studio apartment in the Ismail 88 complex. Suitable for one guest or a couple, with Wi-Fi, TV, air conditioning, kitchen, clean linen and 24/7 check-in.",
    galleryLayout: "extended",
    ...ismail88Et3PhotosWithMain("izmail88-110", 47, 68, 53),
  }),
  createApartment({
    id: 111,
    floor: null,
    entrance: null,
    apartmentNumber: "111",
    class: "standardPlus",
    price: 900,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription: "Standard+ studio apartment in the Ismail 88 complex for up to 2 guests.",
    fullDescription:
      "Standard+ studio apartment in the Ismail 88 complex. Suitable for one guest or a couple, with Wi-Fi, TV, air conditioning, kitchen, clean linen and 24/7 check-in.",
    galleryLayout: "extended",
    ...ismail88Et3PhotosWithMain("izmail88-111", 69, 101, 88),
  }),
  createApartment({
    id: 112,
    floor: null,
    entrance: null,
    apartmentNumber: "112",
    class: "standardPlus",
    price: 900,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription: "Standard+ studio apartment in the Ismail 88 complex for up to 2 guests.",
    fullDescription:
      "Standard+ studio apartment in the Ismail 88 complex. Suitable for one guest or a couple, with Wi-Fi, TV, air conditioning, kitchen, clean linen and 24/7 check-in.",
    galleryLayout: "extended",
    ...ismail88Et3PhotosWithMain("izmail88-112", 102, 124, 105),
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
      galleryLayout: apartment.galleryLayout,
      ...(apartment.id === 1
        ? {
            displayKind: "Standard+",
            displayOverlay: "2 двуспальные кровати",
            intro: apartment.shortDescription,
            aboutTitle: "Новая просторная квартира для 4 гостей",
            descriptionParagraphs: apartment.fullDescription.split("\n\n"),
            features: [
              "Standard+",
              "1 большая комната + кухня",
              ...apartment.amenities,
            ],
            galleryLayout: "extended" as const,
          }
        : {}),
      ...(apartment.id === 3 || apartment.id === 5 || apartment.id === 7
        ? {
            displayKind: "Standard+",
            displayOverlay: "1 большая двуспальная кровать",
            intro: apartment.shortDescription,
            aboutTitle:
              apartment.id === 5 || apartment.id === 7
                ? "Современная студия Standard+ для 2 гостей"
                : "Современная студия Standard Plus для 2 гостей",
            descriptionParagraphs: apartment.fullDescription.split("\n\n"),
            features: apartment.amenities,
            galleryLayout: "extended" as const,
          }
        : {}),
    } satisfies ApartmentDetailsData,
  ]),
) as Record<number, ApartmentDetailsData>;

export function getApartmentBySlug(slug: string) {
  return apartments.find((apartment) => apartment.slug === slug);
}

export function getActiveApartmentBySlug(slug: string) {
  return activeApartments.find((apartment) => apartment.slug === slug);
}

export function getApartmentById(id: string | number) {
  return apartments.find((apartment) => String(apartment.id) === String(id));
}

export function getActiveApartmentById(id: string | number) {
  return activeApartments.find((apartment) => String(apartment.id) === String(id));
}

export function getApartmentPath(apartment: Pick<Apartment, "slug">) {
  return "/apartment/" + apartment.slug;
}

export function getApartmentPathById(id: string | number) {
  const apartment = getActiveApartmentById(id);
  return apartment ? getApartmentPath(apartment) : null;
}
