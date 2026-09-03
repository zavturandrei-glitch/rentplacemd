import type {
  ApartmentDetailsData,
  ApartmentGuests,
  ApartmentKind,
} from "@/components/ApartmentDetails";
import { normalizeApartmentId } from "@/lib/apartmentId";

export { normalizeApartmentId } from "@/lib/apartmentId";

export type ApartmentId = string | number;
export type ApartmentClass = "economy" | "standard" | "standardPlus" | "premium";
export type ApartmentCategorySlug = "economy" | "standard" | "standard-plus" | "premium";
export type ApartmentStatus = "active" | "hidden";
export type ApartmentRooms = "studio" | "1+1" | "2+1";

export type Apartment = {
  id: ApartmentId;
  slug: string;
  title: string;
  address: string;
  floor: number | null;
  entrance: string | null;
  apartmentNumber: string | null;
  class: ApartmentClass;
  price: number;
  guests: ApartmentGuests | null;
  rooms: ApartmentRooms;
  beds: number | null;
  shortDescription: string;
  fullDescription: string;
  amenities: string[];
  photos: string[];
  facadePhoto: string | null;
  status: ApartmentStatus;
  kind: ApartmentKind;
  cardPhoto?: string;
  heroPosition?: string;
  cardImagePosition?: string;
  galleryLayout?: ApartmentDetailsData["galleryLayout"];
};

export const apartmentClassLabels: Record<ApartmentClass, string> = {
  economy: "Economy",
  standard: "Standard",
  standardPlus: "Comfort",
  premium: "Premium",
};

export const apartmentCategoryOrder = [
  "economy",
  "standard",
  "standardPlus",
  "premium",
] as const satisfies readonly ApartmentClass[];

export const apartmentClassToSlug: Record<ApartmentClass, ApartmentCategorySlug> = {
  economy: "economy",
  standard: "standard",
  standardPlus: "standard-plus",
  premium: "premium",
};

export const apartmentSlugToClass: Record<ApartmentCategorySlug, ApartmentClass> = {
  economy: "economy",
  standard: "standard",
  "standard-plus": "standardPlus",
  premium: "premium",
};

export function getApartmentCategoryPath(category: ApartmentClass) {
  return "/apartments/" + apartmentClassToSlug[category];
}

export function getApartmentClassBySlug(slug: string) {
  return (apartmentSlugToClass as Record<string, ApartmentClass | undefined>)[slug];
}

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

function numberedApartmentPhotos(slug: string, numbers: readonly number[]) {
  return numbers.map((number) => "/apartments/" + slug + "/" + number + ".jpg");
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
    facadePhoto:
      input.facadePhoto === undefined ? "/common/building.png" : input.facadePhoto,
    amenities: input.amenities ?? commonAmenities,
    status: input.status ?? "active",
  };
}

type VerifiedDescriptionInput = {
  id: ApartmentId;
  address: string;
  category: ApartmentClass;
  price: number;
  rooms: ApartmentRooms;
  guests: ApartmentGuests | null;
  beds: number | null;
  photoCount: number;
  floor?: number | null;
};

const verifiedRoomLabel: Record<ApartmentRooms, string> = {
  studio: "студия",
  "1+1": "планировка 1+1",
  "2+1": "планировка 2+1",
};

const verifiedCategoryLabel: Record<ApartmentClass, string> = {
  economy: "Эконом",
  standard: "Стандарт",
  standardPlus: "Комфорт",
  premium: "Премиум",
};

function verifiedShortDescription(input: VerifiedDescriptionInput) {
  const category = verifiedCategoryLabel[input.category];
  const capacity = input.guests === null ? "" : ", до " + input.guests + " гостей";

  return "ID " + input.id + ": " + verifiedRoomLabel[input.rooms] + " " + category + capacity +
    ", " + input.photoCount + " фото в каталоге.";
}

function verifiedFullDescription(input: VerifiedDescriptionInput) {
  const facts = [
    verifiedRoomLabel[input.rooms],
    "категория " + verifiedCategoryLabel[input.category],
    "адрес " + input.address,
    "цена " + input.price + " MDL за сутки",
    input.guests === null ? null : "вместимость до " + input.guests + " гостей",
    input.beds === null ? null : input.beds + " кровать" + (input.beds === 1 ? "" : input.beds < 5 ? "и" : "ей"),
    input.floor == null ? null : input.floor + " этаж",
    input.photoCount + " фотографий конкретной квартиры",
  ].filter((fact): fact is string => Boolean(fact));

  return "Для квартиры ID " + input.id + " подтверждены следующие данные: " + facts.join(", ") + ".";
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
    price: 1100,
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
    price: 1000,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription: verifiedShortDescription({
      id: 2, address: "Измаил, 88", category: "standardPlus", price: 1000,
      rooms: "studio", guests: 2, beds: 1, photoCount: 4, floor: 4,
    }),
    fullDescription: verifiedFullDescription({
      id: 2, address: "Измаил, 88", category: "standardPlus", price: 1000,
      rooms: "studio", guests: 2, beds: 1, photoCount: 4, floor: 4,
    }),
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
    price: 1000,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription:
      "Современная студия категории Комфорт в новом доме в центре Кишинёва для двух гостей.",
    fullDescription:
      "Современная студия категории Комфорт в новом доме в центре Кишинёва.\n\nПодходит для двух гостей.\n\nВ квартире имеются большая двуспальная кровать, кондиционер, Smart TV, Wi-Fi, мини-кухня, холодильник, микроволновая печь, электрочайник, полный набор кухонной посуды, современная душевая, фен, полотенца, шампунь и гель для душа.\n\nКруглосуточное заселение по предварительной договорённости.",
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
    price: 1000,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription: verifiedShortDescription({
      id: 4, address: "Измаил, 88", category: "standardPlus", price: 1000,
      rooms: "studio", guests: 2, beds: 1, photoCount: 5, floor: 4,
    }),
    fullDescription: verifiedFullDescription({
      id: 4, address: "Измаил, 88", category: "standardPlus", price: 1000,
      rooms: "studio", guests: 2, beds: 1, photoCount: 5, floor: 4,
    }),
    photos: apartmentPhotos("izmail88-4", 5, "jpeg"),
    facadePhoto: "/apartments/izmail88-4/5.jpeg",
    cardPhoto: "/apartments/izmail88-4/1.jpeg",
    galleryLayout: "extended",
  }),
  // TODO(owner data, IDs 5, 7): подтвердить индивидуальные отличия студий
  // помимо ID и разных фотогалерей (например, конкретную комплектацию или тип кровати).
  createApartment({
    id: 5,
    floor: null,
    entrance: null,
    apartmentNumber: "5",
    class: "standardPlus",
    price: 1000,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription:
      "Студия Комфорт ID 5 для двух гостей; в каталоге 19 фотографий конкретной квартиры.",
    fullDescription:
      "Студия Комфорт ID 5 рассчитана на двух гостей и стоит 1000 MDL за сутки.\n\nВ квартире подтверждены большая двуспальная кровать, кондиционер, Smart TV, Wi-Fi, мини-кухня, холодильник, микроволновая печь, электрочайник, кухонные принадлежности, современная душевая, фен, полотенца, шампунь и гель для душа.\n\nВ каталоге опубликовано 19 фотографий этой квартиры. Заселение 24/7 возможно по предварительной договорённости.",
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
    id: 6,
    slug: "cuza-voda-1-2-6",
    title: "Cuza Vodă 1/2",
    address: "bd. Cuza Vodă 1/2, Chișinău",
    floor: null,
    entrance: null,
    apartmentNumber: "6",
    class: "standardPlus",
    price: 1000,
    guests: 4,
    rooms: "1+1",
    beds: 2,
    kind: "oneBedroom",
    shortDescription:
      "Современная квартира на Ботанике: отдельная спальня, гостиная и размещение до 4 гостей.",
    fullDescription:
      "Современная квартира посуточно в новострое на Ботанике, по адресу bd. Cuza Vodă 1/2. Отдельная спальня и гостиная с дополнительным раскладным спальным местом подходят для проживания до четырёх гостей.\n\nВ квартире есть полностью оборудованная кухня, духовка, электрический чайник, кофемашина, автономное отопление, кондиционер и отдельная гардеробная.\n\nДом находится в тихой части района Ботаника, в начале бульвара Cuza Vodă.",
    amenities: [
      "Полностью оборудованная кухня",
      "Духовка",
      "Электрический чайник",
      "Кофемашина",
      "Автономное отопление",
      "Кондиционер",
      "Раскладное спальное место",
      "Гардеробная",
      "Современный новострой",
    ],
    photos: [
      "/apartments/cuza-voda-1-2-6/1.png",
      "/apartments/cuza-voda-1-2-6/7.png",
      "/apartments/cuza-voda-1-2-6/10.png",
      "/apartments/cuza-voda-1-2-6/2.png",
      "/apartments/cuza-voda-1-2-6/3.png",
      "/apartments/cuza-voda-1-2-6/4.png",
      "/apartments/cuza-voda-1-2-6/5.png",
      "/apartments/cuza-voda-1-2-6/6.png",
      "/apartments/cuza-voda-1-2-6/8.png",
      "/apartments/cuza-voda-1-2-6/9.png",
    ],
    facadePhoto: "/apartments/cuza-voda-1-2-6/11.png",
    cardPhoto: "/apartments/cuza-voda-1-2-6/1.png",
    galleryLayout: "extended",
  }),
  createApartment({
    id: 7,
    floor: null,
    entrance: null,
    apartmentNumber: "7",
    class: "standardPlus",
    price: 1000,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription:
      "Студия Комфорт ID 7 для двух гостей; в каталоге 28 фотографий конкретной квартиры.",
    fullDescription:
      "Студия Комфорт ID 7 рассчитана на двух гостей и стоит 1000 MDL за сутки.\n\nВ квартире подтверждены большая двуспальная кровать, кондиционер, Smart TV, Wi-Fi, мини-кухня, холодильник, микроволновая печь, электрочайник, кухонные принадлежности, современная душевая, фен, полотенца, шампунь и гель для душа.\n\nВ каталоге опубликовано 28 фотографий этой квартиры. Заселение 24/7 возможно по предварительной договорённости.",
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
  // TODO(owner data, IDs 2, 4, 8, 9, 14, 110, 111, 112):
  // получить отличия конкретных студий — тип кровати, индивидуальную комплектацию,
  // особенности санузла/кухни и подтверждённые характеристики расположения внутри дома.
  createApartment({
    id: 8,
    floor: null,
    entrance: null,
    apartmentNumber: "8",
    class: "standardPlus",
    price: 1000,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription: verifiedShortDescription({
      id: 8, address: "Измаил, 88", category: "standardPlus", price: 1000,
      rooms: "studio", guests: 2, beds: 1, photoCount: 23,
    }),
    fullDescription: verifiedFullDescription({
      id: 8, address: "Измаил, 88", category: "standardPlus", price: 1000,
      rooms: "studio", guests: 2, beds: 1, photoCount: 23,
    }),
    galleryLayout: "extended",
    ...ismail88Et3PhotosWithMain("izmail88-8", 23, 46, 27),
  }),
  createApartment({
    id: 9,
    floor: null,
    entrance: null,
    apartmentNumber: "9",
    class: "standardPlus",
    price: 1000,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription: verifiedShortDescription({
      id: 9, address: "Измаил, 88", category: "standardPlus", price: 1000,
      rooms: "studio", guests: 2, beds: 1, photoCount: 21,
    }),
    fullDescription: verifiedFullDescription({
      id: 9, address: "Измаил, 88", category: "standardPlus", price: 1000,
      rooms: "studio", guests: 2, beds: 1, photoCount: 21,
    }),
    galleryLayout: "extended",
    ...ismail88Et3BasePhotosWithMain("izmail88-9", 22, 8),
  }),
  createApartment({
    id: 10,
    floor: null,
    entrance: null,
    apartmentNumber: "10",
    class: "standard",
    price: 900,
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
    price: 900,
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
    price: 900,
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
    class: "standardPlus",
    price: 1000,
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
    price: 1000,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription: verifiedShortDescription({
      id: 14, address: "Измаил, 88", category: "standardPlus", price: 1000,
      rooms: "studio", guests: 2, beds: 1, photoCount: 22,
    }),
    fullDescription: verifiedFullDescription({
      id: 14, address: "Измаил, 88", category: "standardPlus", price: 1000,
      rooms: "studio", guests: 2, beds: 1, photoCount: 22,
    }),
    galleryLayout: "extended",
    ...ismail88Et3PhotosWithMain("izmail88-14", 125, 147, 129),
  }),
  createApartment({
    id: 15,
    slug: "izmail-31-id15",
    title: "Измаил 31",
    address: "Измаил 31, Кишинёв",
    floor: null,
    entrance: null,
    apartmentNumber: "15",
    class: "standardPlus",
    price: 1000,
    guests: 3,
    rooms: "1+1",
    beds: 3,
    kind: "oneBedroom",
    shortDescription:
      "Однокомнатная квартира класса Комфорт в ультрацентре Кишинёва, в современном доме со стеклянным фасадом. До 3 гостей.",
    fullDescription:
      "ID 15 — однокомнатная квартира по адресу Измаил 31 в ультрацентре Кишинёва. Современный дом со стеклянным фасадом расположен рядом с McDonald’s, UNIC, проспектом Штефан чел Маре и городской инфраструктурой.\n\nКвартира рассчитана на размещение до 3 гостей и располагает 3 спальными местами. Фасад здания включён в галерею отдельным кадром.",
    amenities: [
      "Комфорт",
      "Ультрацентр Кишинёва",
      "Современный дом",
      "Стеклянный фасад",
      "До 3 гостей",
      "3 спальных места",
      "Отдельная кухня",
      "Стиральная машина",
    ],
    photos: promotePhoto(
      numberedApartmentPhotos("izmail-31-15", [2, 3, 4, 5, 6, 7]),
      "/apartments/izmail-31-15/7.jpg",
    ),
    cardPhoto: "/apartments/izmail-31-15/7.jpg",
    facadePhoto: "/apartments/izmail-31-15/1.jpg",
    galleryLayout: "extended",
  }),
  createApartment({
    id: 16,
    slug: "alba-iulia-103-id16",
    title: "Алба Юлия 103",
    address: "Алба Юлия 103, Кишинёв",
    floor: null,
    entrance: null,
    apartmentNumber: "16",
    class: "standardPlus",
    price: 1000,
    guests: 3,
    rooms: "1+1",
    beds: 3,
    kind: "oneBedroom",
    shortDescription:
      "Однокомнатная квартира класса Комфорт в новострое на Алба Юлия 103. Удобная городская локация и размещение до 3 гостей.",
    fullDescription:
      "ID 16 — однокомнатная квартира в новострое по адресу Алба Юлия 103 в Кишинёве. Квартира находится в удобной городской локации и подготовлена для посуточного проживания.\n\nПо фотографиям подтверждены отдельная кухня, ванная комната, телевизор, стиральная машина и 3 спальных места. Квартира рассчитана на размещение до 3 гостей.",
    amenities: [
      "Комфорт",
      "Новострой",
      "Удобная городская локация",
      "До 3 гостей",
      "3 спальных места",
      "Отдельная кухня",
      "Телевизор",
      "Стиральная машина",
    ],
    photos: promotePhoto(
      apartmentPhotos("alba-iulia-103-16", 7, "jpg"),
      "/apartments/alba-iulia-103-16/3.jpg",
    ),
    cardPhoto: "/apartments/alba-iulia-103-16/3.jpg",
    facadePhoto: null,
    galleryLayout: "extended",
  }),
  createApartment({
    id: 20,
    floor: null,
    entrance: null,
    apartmentNumber: "20",
    class: "economy",
    price: 900,
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
    price: 900,
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
    price: 900,
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
    price: 900,
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
    price: 900,
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
    price: 900,
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
    class: "standardPlus",
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
    id: 61,
    slug: "izmail-106-2-61",
    title: "Измаил 106/2",
    address: "Strada Ismail 106/2, Chișinău",
    floor: null,
    entrance: null,
    apartmentNumber: "61",
    class: "premium",
    price: 1000,
    guests: 4,
    rooms: "1+1",
    beds: 2,
    kind: "oneBedroom",
    shortDescription:
      "Полностью обновлённая двухкомнатная квартира с отдельной спальней и гостиной для размещения до 4 гостей.",
    fullDescription:
      "Современная двухкомнатная квартира после полного ремонта по адресу Измаил 106/2 в Кишинёве.\n\nОтдельная спальня с двуспальной кроватью и просторная гостиная с раскладным диваном позволяют разместить до 4 гостей.\n\nВ квартире есть телевизор, кондиционер, стиральная машина, ванна и оборудованная кухня с холодильником, духовкой, микроволновой печью, газовой варочной поверхностью, мойкой, посудой и столовыми приборами.",
    amenities: [
      "Отдельная спальня",
      "Отдельная гостиная",
      "До 4 гостей",
      "Двуспальная кровать",
      "Раскладной диван",
      "Телевизор",
      "Кондиционер",
      "Стиральная машина",
      "Ванна",
      "Оборудованная кухня",
      "Холодильник",
      "Духовка",
      "Микроволновая печь",
      "Газовая варочная поверхность",
      "Кухонная мойка",
      "Посуда и столовые приборы",
      "Места для хранения вещей",
      "Современный интерьер",
      "Квартира после ремонта",
    ],
    photos: [
      "/apartments/izmail-106-2-61/5.webp",
      "/apartments/izmail-106-2-61/8.webp",
      "/apartments/izmail-106-2-61/1.webp",
      "/apartments/izmail-106-2-61/4.webp",
      "/apartments/izmail-106-2-61/3.webp",
      "/apartments/izmail-106-2-61/9.webp",
      "/apartments/izmail-106-2-61/7.webp",
      "/apartments/izmail-106-2-61/2.webp",
      "/apartments/izmail-106-2-61/10.webp",
      "/apartments/izmail-106-2-61/11.webp",
      "/apartments/izmail-106-2-61/6.webp",
    ],
    cardPhoto: "/apartments/izmail-106-2-61/5.webp",
    facadePhoto: null,
    galleryLayout: "extended",
  }),
  createApartment({
    id: 67,
    slug: "grigore-ureche-67",
    title: "Grigore Ureche 67",
    address: "Grigore Ureche 67, Chișinău",
    floor: null,
    entrance: null,
    apartmentNumber: "67",
    class: "standardPlus",
    price: 1100,
    guests: 4,
    rooms: "1+1",
    beds: 2,
    kind: "oneBedroom",
    shortDescription: "Современная квартира Комфорт с отдельной спальней и гостиной для размещения до 4 гостей.",
    fullDescription: "Современная квартира после евроремонта по адресу Grigore Ureche 67 в Кишинёве.\n\nПланировка включает отдельную спальню, просторную гостиную и оборудованную кухню.\n\nКвартира рассчитана на комфортное проживание до 4 гостей.",
    amenities: ["Wi-Fi", "Отдельная спальня", "Отдельная гостиная", "Современный евроремонт", "Оборудованная кухня", "Кондиционер", "Smart TV", "Чистое постельное бельё", "Полотенца", "Заселение 24/7"],
    photos: apartmentPhotos("GrigoreUreche67", 7, "jpeg"),
    facadePhoto: "/apartments/GrigoreUreche67/8.jpeg",
    cardPhoto: "/apartments/GrigoreUreche67/4.jpeg",
    galleryLayout: "extended",
  }),
  createApartment({
    id: 110,
    floor: null,
    entrance: null,
    apartmentNumber: "110",
    class: "standardPlus",
    price: 1000,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription: verifiedShortDescription({
      id: 110, address: "Измаил, 88", category: "standardPlus", price: 1000,
      rooms: "studio", guests: 2, beds: 1, photoCount: 21,
    }),
    fullDescription: verifiedFullDescription({
      id: 110, address: "Измаил, 88", category: "standardPlus", price: 1000,
      rooms: "studio", guests: 2, beds: 1, photoCount: 21,
    }),
    galleryLayout: "extended",
    ...ismail88Et3PhotosWithMain("izmail88-110", 47, 68, 53),
  }),
  createApartment({
    id: 111,
    floor: null,
    entrance: null,
    apartmentNumber: "111",
    class: "standardPlus",
    price: 1000,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription: verifiedShortDescription({
      id: 111, address: "Измаил, 88", category: "standardPlus", price: 1000,
      rooms: "studio", guests: 2, beds: 1, photoCount: 32,
    }),
    fullDescription: verifiedFullDescription({
      id: 111, address: "Измаил, 88", category: "standardPlus", price: 1000,
      rooms: "studio", guests: 2, beds: 1, photoCount: 32,
    }),
    galleryLayout: "extended",
    ...ismail88Et3PhotosWithMain("izmail88-111", 69, 101, 88),
  }),
  createApartment({
    id: 112,
    floor: null,
    entrance: null,
    apartmentNumber: "112",
    class: "standardPlus",
    price: 1000,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription: verifiedShortDescription({
      id: 112, address: "Измаил, 88", category: "standardPlus", price: 1000,
      rooms: "studio", guests: 2, beds: 1, photoCount: 22,
    }),
    fullDescription: verifiedFullDescription({
      id: 112, address: "Измаил, 88", category: "standardPlus", price: 1000,
      rooms: "studio", guests: 2, beds: 1, photoCount: 22,
    }),
    galleryLayout: "extended",
    ...ismail88Et3PhotosWithMain("izmail88-112", 102, 124, 105),
  }),
  createApartment({
    id: 371,
    floor: null,
    entrance: null,
    apartmentNumber: "371",
    class: "standard",
    price: 900,
    guests: 2,
    rooms: "studio",
    beds: 1,
    kind: "studio",
    shortDescription: "Студия в комплексе Измаил 88, до 2 гостей.",
    fullDescription:
      "Уютная студия в центре Кишинева для одного гостя или пары, с удобной локацией и всем необходимым.",
    photos: apartmentPhotos("izmail88-371", 4),
  }),
  // TODO(owner data, IDs 25, 30, 301): уточнить вместимость, количество и тип
  // кроватей, индивидуальное оснащение и реальные отличия трёх квартир 1+1.
  createApartment({
    id: 25,
    floor: null,
    entrance: null,
    apartmentNumber: "25",
    class: "standardPlus",
    price: 1100,
    guests: null,
    rooms: "1+1",
    beds: null,
    kind: "oneBedroom",
    shortDescription: verifiedShortDescription({
      id: 25, address: "Измаил, 88", category: "standardPlus", price: 1100,
      rooms: "1+1", guests: null, beds: null, photoCount: 6,
    }),
    fullDescription: verifiedFullDescription({
      id: 25, address: "Измаил, 88", category: "standardPlus", price: 1100,
      rooms: "1+1", guests: null, beds: null, photoCount: 6,
    }),
    photos: promotePhoto(apartmentPhotos("izmail88-25", 6, "jpg"), "/apartments/izmail88-25/3.jpg"),
    cardPhoto: "/apartments/izmail88-25/3.jpg",
    facadePhoto: null,
    amenities: [],
  }),
  createApartment({
    id: 30,
    floor: null,
    entrance: null,
    apartmentNumber: "30",
    class: "standardPlus",
    price: 1100,
    guests: null,
    rooms: "1+1",
    beds: null,
    kind: "oneBedroom",
    shortDescription: verifiedShortDescription({
      id: 30, address: "Измаил, 88", category: "standardPlus", price: 1100,
      rooms: "1+1", guests: null, beds: null, photoCount: 6,
    }),
    fullDescription: verifiedFullDescription({
      id: 30, address: "Измаил, 88", category: "standardPlus", price: 1100,
      rooms: "1+1", guests: null, beds: null, photoCount: 6,
    }),
    photos: promotePhoto(apartmentPhotos("izmail88-30", 6, "jpg"), "/apartments/izmail88-30/2.jpg"),
    cardPhoto: "/apartments/izmail88-30/2.jpg",
    facadePhoto: null,
    amenities: [],
  }),
  createApartment({
    id: 301,
    floor: null,
    entrance: null,
    apartmentNumber: "301",
    class: "standardPlus",
    price: 1100,
    guests: null,
    rooms: "1+1",
    beds: null,
    kind: "oneBedroom",
    shortDescription: verifiedShortDescription({
      id: 301, address: "Измаил, 88", category: "standardPlus", price: 1100,
      rooms: "1+1", guests: null, beds: null, photoCount: 7,
    }),
    fullDescription: verifiedFullDescription({
      id: 301, address: "Измаил, 88", category: "standardPlus", price: 1100,
      rooms: "1+1", guests: null, beds: null, photoCount: 7,
    }),
    photos: promotePhoto(apartmentPhotos("izmail88-301", 7, "jpg"), "/apartments/izmail88-301/5.jpg"),
    cardPhoto: "/apartments/izmail88-301/5.jpg",
    facadePhoto: null,
    amenities: [],
  }),
  // TODO(owner data, IDs 461, 463, 464, 661, 692): уточнить вместимость,
  // кровати и индивидуальное оснащение; сейчас подтверждены только класс,
  // планировка, цена, адрес и набор фотографий каждой студии.
  createApartment({
    id: 461,
    floor: null,
    entrance: null,
    apartmentNumber: "461",
    class: "standard",
    price: 900,
    guests: null,
    rooms: "studio",
    beds: null,
    kind: "studio",
    shortDescription: verifiedShortDescription({
      id: 461, address: "Измаил, 88", category: "standard", price: 900,
      rooms: "studio", guests: null, beds: null, photoCount: 8,
    }),
    fullDescription: verifiedFullDescription({
      id: 461, address: "Измаил, 88", category: "standard", price: 900,
      rooms: "studio", guests: null, beds: null, photoCount: 8,
    }),
    photos: numberedApartmentPhotos("izmail88-461", [1, 2, 3, 4, 5, 6, 8, 9]),
    cardPhoto: "/apartments/izmail88-461/1.jpg",
    facadePhoto: null,
    amenities: [],
  }),
  createApartment({
    id: 463,
    floor: null,
    entrance: null,
    apartmentNumber: "463",
    class: "standard",
    price: 900,
    guests: null,
    rooms: "studio",
    beds: null,
    kind: "studio",
    shortDescription: verifiedShortDescription({
      id: 463, address: "Измаил, 88", category: "standard", price: 900,
      rooms: "studio", guests: null, beds: null, photoCount: 8,
    }),
    fullDescription: verifiedFullDescription({
      id: 463, address: "Измаил, 88", category: "standard", price: 900,
      rooms: "studio", guests: null, beds: null, photoCount: 8,
    }),
    photos: promotePhoto(
      numberedApartmentPhotos("izmail88-463", [1, 2, 3, 4, 5, 7, 9, 10]),
      "/apartments/izmail88-463/3.jpg",
    ),
    cardPhoto: "/apartments/izmail88-463/3.jpg",
    facadePhoto: null,
    amenities: [],
  }),
  createApartment({
    id: 464,
    floor: null,
    entrance: null,
    apartmentNumber: "464",
    class: "standard",
    price: 900,
    guests: null,
    rooms: "studio",
    beds: null,
    kind: "studio",
    shortDescription: verifiedShortDescription({
      id: 464, address: "Измаил, 88", category: "standard", price: 900,
      rooms: "studio", guests: null, beds: null, photoCount: 6,
    }),
    fullDescription: verifiedFullDescription({
      id: 464, address: "Измаил, 88", category: "standard", price: 900,
      rooms: "studio", guests: null, beds: null, photoCount: 6,
    }),
    photos: promotePhoto(
      numberedApartmentPhotos("izmail88-464", [1, 2, 3, 4, 5, 6]),
      "/apartments/izmail88-464/3.jpg",
    ),
    cardPhoto: "/apartments/izmail88-464/3.jpg",
    facadePhoto: null,
    amenities: [],
  }),
  createApartment({
    id: 661,
    floor: null,
    entrance: null,
    apartmentNumber: "661",
    class: "standard",
    price: 900,
    guests: null,
    rooms: "studio",
    beds: null,
    kind: "studio",
    shortDescription: verifiedShortDescription({
      id: 661, address: "Измаил, 88", category: "standard", price: 900,
      rooms: "studio", guests: null, beds: null, photoCount: 8,
    }),
    fullDescription: verifiedFullDescription({
      id: 661, address: "Измаил, 88", category: "standard", price: 900,
      rooms: "studio", guests: null, beds: null, photoCount: 8,
    }),
    photos: promotePhoto(
      numberedApartmentPhotos("izmail88-661", [1, 2, 3, 4, 5, 8, 9, 10]),
      "/apartments/izmail88-661/5.jpg",
    ),
    cardPhoto: "/apartments/izmail88-661/5.jpg",
    facadePhoto: null,
    amenities: [],
  }),
  createApartment({
    id: 692,
    floor: null,
    entrance: null,
    apartmentNumber: "692",
    class: "standard",
    price: 900,
    guests: null,
    rooms: "studio",
    beds: null,
    kind: "studio",
    shortDescription: verifiedShortDescription({
      id: 692, address: "Измаил, 88", category: "standard", price: 900,
      rooms: "studio", guests: null, beds: null, photoCount: 6,
    }),
    fullDescription: verifiedFullDescription({
      id: 692, address: "Измаил, 88", category: "standard", price: 900,
      rooms: "studio", guests: null, beds: null, photoCount: 6,
    }),
    photos: promotePhoto(apartmentPhotos("izmail88-692", 6, "jpg"), "/apartments/izmail88-692/2.jpg"),
    cardPhoto: "/apartments/izmail88-692/2.jpg",
    facadePhoto: null,
    amenities: [],
  }),
  createApartment({
    id: 76,
    slug: "mihai-eminescu-76-76",
    title: "Михай Эминеску, 76",
    address: "Михай Эминеску, 76, Кишинёв",
    floor: null,
    entrance: null,
    apartmentNumber: "76",
    class: "premium",
    price: 1500,
    guests: null,
    rooms: "1+1",
    beds: null,
    kind: "oneBedroom",
    shortDescription: "Квартира с отдельной спальней и гостиной.",
    fullDescription: "Квартира Premium с отдельной спальней и гостиной по адресу Михай Эминеску, 76.",
    photos: promotePhoto(
      numberedApartmentPhotos("mihai-eminescu-76-me-76", [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12]),
      "/apartments/mihai-eminescu-76-me-76/8.jpg",
    ),
    cardPhoto: "/apartments/mihai-eminescu-76-me-76/8.jpg",
    facadePhoto: null,
    amenities: [],
  }),
  // TODO(owner data, IDs 77, 78): получить подтверждённые различия по
  // вместимости, кроватям, оснащению и особенностям двух квартир по одному адресу.
  createApartment({
    id: 77,
    slug: "lev-tolstoi-63-1-77",
    title: "Лев Толстой, 63/1",
    address: "Лев Толстой, 63/1, Кишинёв",
    floor: null,
    entrance: null,
    apartmentNumber: "77",
    class: "premium",
    price: 1200,
    guests: null,
    rooms: "1+1",
    beds: null,
    kind: "oneBedroom",
    shortDescription: verifiedShortDescription({
      id: 77, address: "Лев Толстой, 63/1", category: "premium", price: 1200,
      rooms: "1+1", guests: null, beds: null, photoCount: 9,
    }),
    fullDescription: verifiedFullDescription({
      id: 77, address: "Лев Толстой, 63/1", category: "premium", price: 1200,
      rooms: "1+1", guests: null, beds: null, photoCount: 9,
    }),
    photos: promotePhoto(apartmentPhotos("lev-tolstoi-63-1-ltz-63", 9, "jpg"), "/apartments/lev-tolstoi-63-1-ltz-63/1.jpg"),
    cardPhoto: "/apartments/lev-tolstoi-63-1-ltz-63/1.jpg",
    facadePhoto: null,
    amenities: [],
  }),
  createApartment({
    id: 78,
    slug: "lev-tolstoi-63-1-78",
    title: "Лев Толстой, 63/1",
    address: "Лев Толстой, 63/1, Кишинёв",
    floor: null,
    entrance: null,
    apartmentNumber: "78",
    class: "premium",
    price: 1200,
    guests: null,
    rooms: "1+1",
    beds: null,
    kind: "oneBedroom",
    shortDescription: verifiedShortDescription({
      id: 78, address: "Лев Толстой, 63/1", category: "premium", price: 1200,
      rooms: "1+1", guests: null, beds: null, photoCount: 7,
    }),
    fullDescription: verifiedFullDescription({
      id: 78, address: "Лев Толстой, 63/1", category: "premium", price: 1200,
      rooms: "1+1", guests: null, beds: null, photoCount: 7,
    }),
    photos: promotePhoto(apartmentPhotos("lev-tolstoi-63-1-ltg-63", 7, "jpg"), "/apartments/lev-tolstoi-63-1-ltg-63/3.jpg"),
    cardPhoto: "/apartments/lev-tolstoi-63-1-ltg-63/3.jpg",
    facadePhoto: null,
    amenities: [],
  }),
  createApartment({
    id: 200,
    slug: "doina-ion-aldea-teodorovici-10-3",
    title: "Doina și Ion Aldea-Teodorovici 10/3",
    address: "Doina și Ion Aldea-Teodorovici 10/3",
    floor: null,
    entrance: null,
    apartmentNumber: "200",
    class: "standardPlus",
    price: 1100,
    guests: 4,
    rooms: "1+1",
    beds: 4,
    kind: "oneBedroom",
    shortDescription:
      "Современная однокомнатная квартира на Буюканах с хорошим евроремонтом. Подходит для комфортного проживания до 4 гостей.",
    fullDescription:
      "Современная однокомнатная квартира по адресу Doina și Ion Aldea-Teodorovici 10/3 в районе Буюканы. В квартире выполнен хороший современный евроремонт.\n\nКвартира рассчитана на размещение до 4 гостей и располагает 4 спальными местами без указания неподтверждённой конфигурации кроватей.",
    amenities: [
      "Современный евроремонт",
      "До 4 гостей",
      "4 спальных места",
      "Буюканы",
    ],
    photos: promotePhoto(
      apartmentPhotos("doina-ion-aldea-teodorovici-10-3", 13, "webp"),
      "/apartments/doina-ion-aldea-teodorovici-10-3/4.webp",
    ),
    cardPhoto: "/apartments/doina-ion-aldea-teodorovici-10-3/4.webp",
    facadePhoto: null,
    galleryLayout: "extended",
  }),
  createApartment({
    id: 201,
    slug: "coca-15-201",
    title: "Strada Coca 15",
    address: "Strada Coca 15, Chișinău",
    floor: null,
    entrance: null,
    apartmentNumber: "201",
    class: "standardPlus",
    price: 900,
    guests: null,
    rooms: "studio",
    beds: null,
    kind: "studio",
    shortDescription:
      "Свежая студия Комфорт с видом во двор, мини-кухней, кондиционером и Wi-Fi.",
    fullDescription:
      "Студия ID 201 на Strada Coca 15 подготовлена для посуточного проживания. Спокойный вид во двор и цена 900 MDL делают её практичным вариантом для поездки в Кишинёв.\n\nВ студии выполнен современный евроремонт. Подтверждённое оснащение: кондиционер, Wi-Fi, роллеты, мини-кухня и обычный телевизор.",
    amenities: [
      "Комфорт",
      "Современный евроремонт",
      "Кондиционер",
      "Wi-Fi",
      "Роллеты",
      "Мини-кухня",
      "Телевизор",
      "Вид во двор",
    ],
    photos: apartmentPhotos("coca-15-201", 8, "jpg"),
    cardPhoto: "/apartments/coca-15-201/1.jpg",
    facadePhoto: "/apartments/coca-15-201/12.png",
    galleryLayout: "extended",
  }),
  createApartment({
    id: 202,
    slug: "coca-15-202",
    title: "Strada Coca 15",
    address: "Strada Coca 15, Chișinău",
    floor: null,
    entrance: null,
    apartmentNumber: "202",
    class: "standardPlus",
    price: 1000,
    guests: null,
    rooms: "studio",
    beds: null,
    kind: "studio",
    shortDescription:
      "Современная студия Комфорт с видом в сторону Дендрария и оснащением для посуточного проживания.",
    fullDescription:
      "Студия ID 202 на Strada Coca 15 обращена в сторону Дендрария. Свежий интерьер и цена 1000 MDL подходят для короткой остановки или более длительного пребывания.\n\nПодтверждённое оснащение включает кондиционер, Smart TV, Wi-Fi, роллеты и мини-кухню.",
    amenities: [
      "Комфорт",
      "Современный евроремонт",
      "Кондиционер",
      "Smart TV",
      "Wi-Fi",
      "Роллеты",
      "Мини-кухня",
      "Вид в сторону Дендрария",
    ],
    photos: promotePhoto(
      [
        ...apartmentPhotos("coca-15-202", 7, "jpg"),
        "/apartments/coca-15-202/8.JPG",
      ],
      "/apartments/coca-15-202/2.jpg",
    ),
    cardPhoto: "/apartments/coca-15-202/2.jpg",
    facadePhoto: "/apartments/coca-15-201/12.png",
    galleryLayout: "extended",
  }),
  createApartment({
    id: 203,
    slug: "coca-15-203",
    title: "Strada Coca 15",
    address: "Strada Coca 15, Chișinău",
    floor: null,
    entrance: null,
    apartmentNumber: "203",
    class: "premium",
    price: 1100,
    guests: null,
    rooms: "studio",
    beds: null,
    kind: "studio",
    shortDescription:
      "Premium-студия с выразительным современным интерьером и видом в сторону Дендрария.",
    fullDescription:
      "Студия ID 203 на Strada Coca 15 — вариант категории Премиум с цельным современным интерьером и видом в сторону Дендрария. Стоимость проживания составляет 1100 MDL в сутки.\n\nДля гостей подтверждены кондиционер, Smart TV, Wi-Fi, роллеты и мини-кухня.",
    amenities: [
      "Premium",
      "Современный евроремонт",
      "Кондиционер",
      "Smart TV",
      "Wi-Fi",
      "Роллеты",
      "Мини-кухня",
      "Вид в сторону Дендрария",
    ],
    photos: [
      ...apartmentPhotos("coca-15-203", 7, "jpg"),
      "/apartments/coca-15-203/IMG_8422.JPG",
    ],
    cardPhoto: "/apartments/coca-15-203/1.jpg",
    facadePhoto: "/apartments/coca-15-201/12.png",
    galleryLayout: "extended",
  }),
  createApartment({
    id: 204,
    slug: "coca-15-204",
    title: "Strada Coca 15",
    address: "Strada Coca 15, Chișinău",
    floor: null,
    entrance: null,
    apartmentNumber: "204",
    class: "premium",
    price: 1100,
    guests: null,
    rooms: "studio",
    beds: null,
    kind: "studio",
    shortDescription:
      "Светлая студия Премиум с лаконичным интерьером и видом в сторону Дендрария.",
    fullDescription:
      "Студия ID 204 на Strada Coca 15 сочетает спокойную светлую отделку, категорию Premium и вид в сторону Дендрария. Цена — 1100 MDL за сутки.\n\nКвартира подготовлена для посуточного проживания; подтверждены кондиционер, Smart TV, Wi-Fi, роллеты и мини-кухня.",
    amenities: [
      "Premium",
      "Современный евроремонт",
      "Кондиционер",
      "Smart TV",
      "Wi-Fi",
      "Роллеты",
      "Мини-кухня",
      "Вид в сторону Дендрария",
    ],
    photos: [
      ...apartmentPhotos("coca-15-204", 8, "jpg"),
      "/apartments/coca-15-204/9.JPG",
    ],
    cardPhoto: "/apartments/coca-15-204/1.jpg",
    facadePhoto: "/apartments/coca-15-201/12.png",
    galleryLayout: "extended",
  }),
  createApartment({
    id: 205,
    slug: "varlaam-50-205",
    title: "Strada Mitropolit Varlaam 50",
    address: "Strada Mitropolit Varlaam 50, Chișinău",
    floor: null,
    entrance: null,
    apartmentNumber: "205",
    class: "standardPlus",
    price: 1200,
    guests: null,
    rooms: "1+1",
    beds: null,
    kind: "oneBedroom",
    shortDescription:
      "Отдельный апартамент с новым интерьером в двухэтажном здании, разделённом на самостоятельные апартаменты.",
    fullDescription:
      "ID 205 — отдельный апартамент на Strada Mitropolit Varlaam 50 в двухэтажном здании, разделённом на самостоятельные апартаменты. Это не квартира в обычном многоэтажном доме.\n\nОбъект подготовлен для посуточного проживания и оформлен в новом современном стиле. Стоимость — 1200 MDL в сутки.",
    amenities: [
      "Комфорт",
      "Отдельный апартамент",
      "Двухэтажное здание",
      "Новый современный интерьер",
      "Подготовлен для посуточного проживания",
    ],
    photos: promotePhoto(
      apartmentPhotos("varlaam-50-205", 4, "jpeg"),
      "/apartments/varlaam-50-205/2.jpeg",
    ),
    cardPhoto: "/apartments/varlaam-50-205/2.jpeg",
    facadePhoto: "/apartments/varlaam-50-205/12.png",
    galleryLayout: "extended",
  }),
] as const satisfies readonly Apartment[];

export const activeApartments = apartments.filter(
  (apartment) => apartment.status === "active",
);

export const activeApartmentCount = activeApartments.length;

export function formatApartmentCountText(text: string) {
  return text.replaceAll("{count}", String(activeApartmentCount));
}

export const ECONOMY_CATALOG_DISCOUNT_MDL = 100;

export function getApartmentCatalogPrice(
  apartment: Pick<Apartment, "class" | "price">,
) {
  return apartment.class === "economy"
    ? Math.max(0, apartment.price - ECONOMY_CATALOG_DISCOUNT_MDL)
    : apartment.price;
}

export function getApartmentsByClass(category: ApartmentClass) {
  return activeApartments.filter((apartment) => apartment.class === category);
}

export function getApartmentCategoryMinimumPrice(category: ApartmentClass) {
  const categoryApartments = getApartmentsByClass(category);

  return categoryApartments.length > 0
    ? Math.min(...categoryApartments.map(getApartmentCatalogPrice))
    : null;
}

export const apartmentDetailsById = Object.fromEntries(
  apartments.map((apartment) => [
    apartment.id,
    {
      id: apartment.id,
      title: apartment.title,
      address: apartment.address,
      price: apartment.price,
      images: apartment.photos,
      kind: apartment.kind,
      class: apartment.class,
      guests: apartment.guests,
      heroPosition: apartment.heroPosition,
      facadePhoto: apartment.facadePhoto,
      galleryLayout: apartment.galleryLayout,
      intro: apartment.shortDescription,
      aboutTitle: "Квартира ID " + apartment.id + " · " + apartment.title,
      descriptionParagraphs: apartment.fullDescription.split("\n\n"),
      features: apartment.amenities,
      ...(apartment.id === 1
        ? {
            displayKind: "Комфорт",
            displayOverlay: "2 двуспальные кровати",
            intro: apartment.shortDescription,
            aboutTitle: "Новая просторная квартира для 4 гостей",
            descriptionParagraphs: apartment.fullDescription.split("\n\n"),
            features: [
              "Комфорт",
              "1 большая комната + кухня",
              ...apartment.amenities,
            ],
            galleryLayout: "extended" as const,
          }
        : {}),
      ...(apartment.id === 3 || apartment.id === 5 || apartment.id === 7
        ? {
            displayKind: "Комфорт",
            displayOverlay: "1 большая двуспальная кровать",
            intro: apartment.shortDescription,
            aboutTitle:
              apartment.id === 5 || apartment.id === 7
                ? "Современная студия Комфорт для 2 гостей"
                : "Современная студия Комфорт для 2 гостей",
            descriptionParagraphs: apartment.fullDescription.split("\n\n"),
            features: apartment.amenities,
            galleryLayout: "extended" as const,
          }
        : {}),
    } satisfies ApartmentDetailsData,
  ]),
) as Record<string, ApartmentDetailsData>;

export function getApartmentBySlug(slug: string) {
  return apartments.find((apartment) => apartment.slug === slug);
}

export function getActiveApartmentBySlug(slug: string) {
  return activeApartments.find((apartment) => apartment.slug === slug);
}

export function getApartmentById(id: string | number) {
  const normalizedId = normalizeApartmentId(id);
  return apartments.find((apartment) => normalizeApartmentId(apartment.id) === normalizedId);
}

export function getActiveApartmentById(id: string | number) {
  const normalizedId = normalizeApartmentId(id);
  return activeApartments.find((apartment) => normalizeApartmentId(apartment.id) === normalizedId);
}

export function getApartmentPath(apartment: Pick<Apartment, "slug">) {
  return "/apartment/" + apartment.slug;
}

export function getApartmentPathById(id: string | number) {
  const apartment = getActiveApartmentById(id);
  return apartment ? getApartmentPath(apartment) : null;
}
