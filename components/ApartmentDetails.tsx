"use client";

import { useLanguage } from "@/context/LanguageContext";
import { languages, type Language } from "@/locales/translations";

export type ApartmentKind = "studio" | "oneBedroom" | "twoBedroom" | "twoBedroomPlus";
export type ApartmentGuests = 2 | 3 | 4 | 5;

export type ApartmentDetailsData = {
  id: number;
  price: number;
  images: string[];
  kind: ApartmentKind;
  guests: ApartmentGuests;
  heroPosition?: string;
};

type DetailText = {
  brandSubtitle: string;
  addressTitle: string;
  back: string;
  call: string;
  checkAvailability: string;
  whatsappMessage: string;
  priceSuffix: string;
  photo: string;
  galleryTitle: string;
  mainPhotoAlt: string;
  galleryPhotoAlt: string;
  facadeAlt: string;
  aboutLabel: string;
  bookingLabel: string;
  bookingNote: string;
  footerText: string;
  kinds: Record<ApartmentKind, string>;
  guests: Record<ApartmentGuests, string>;
  overlay: Record<ApartmentKind, string>;
  intro: Record<ApartmentKind, string>;
  aboutTitle: Record<ApartmentKind, string>;
  aboutFirst: Record<ApartmentKind, string>;
  aboutSecond: Record<ApartmentKind, string>;
  features: Record<ApartmentKind, string[]>;
};

const detailText: Record<Language, DetailText> = {
  ru: {
    brandSubtitle: "Квартиры посуточно в Кишинёве",
    addressTitle: "Измаил 88",
    back: "Назад ко всем квартирам",
    call: "Позвонить",
    checkAvailability: "Проверить свободна",
    whatsappMessage: "Здравствуйте! Интересует квартира Измаил 88, ID {id}",
    priceSuffix: "лей / сутки",
    photo: "Фото",
    galleryTitle: "Галерея квартиры",
    mainPhotoAlt: "Главное фото ID {id}",
    galleryPhotoAlt: "Фото квартиры ID {id} {index}",
    facadeAlt: "Фасад дома Измаил 88",
    aboutLabel: "О квартире",
    bookingLabel: "Бронирование",
    bookingNote: "Напишите даты и количество гостей - быстро проверим свободна ли квартира.",
    footerText: "Квартиры посуточно в Кишинёве • Центр • Заселение 24/7",
    kinds: { studio: "Студия", oneBedroom: "1+1 квартира", twoBedroom: "2 спальни", twoBedroomPlus: "2+1 квартира" },
    guests: { 2: "До 2 гостей", 3: "До 3 гостей", 4: "До 4 гостей", 5: "До 5 гостей" },
    overlay: { studio: "Спальная зона", oneBedroom: "Спальня + гостиная", twoBedroom: "2 спальни", twoBedroomPlus: "2 спальни + гостиная" },
    intro: {
      studio: "Уютная студия в центре Кишинёва. Подходит для одного гостя или пары. В квартире есть спальная зона, кухня и всё необходимое для комфортного проживания.",
      oneBedroom: "Уютная квартира 1+1 в центре Кишинёва. Отдельная спальня, гостиная зона, кухня и комфортное размещение для гостей.",
      twoBedroom: "Просторная квартира с двумя спальнями в центре Кишинёва. Хороший вариант для семьи, пары или гостей в командировке.",
      twoBedroomPlus: "Просторная квартира 2+1 в центре Кишинёва. Две спальни, гостиная зона и комфортное размещение до 5 гостей.",
    },
    aboutTitle: { studio: "Уютная студия для 1-2 гостей", oneBedroom: "Удобная квартира в центре", twoBedroom: "Квартира с двумя спальнями", twoBedroomPlus: "Просторная квартира для семьи" },
    aboutFirst: {
      studio: "Уютная студия в центре Кишинёва, комплекс Измаил 88. В квартире есть спальная зона, кухня, чистое бельё, Wi-Fi, TV, кондиционер и всё необходимое для короткого или длительного проживания.",
      oneBedroom: "Уютная квартира 1+1 в центре Кишинёва, комплекс Измаил 88. В квартире есть отдельная спальня, гостиная зона, оборудованная кухня, чистое бельё, Wi-Fi, TV, кондиционер и всё необходимое для комфортного проживания.",
      twoBedroom: "Удобная квартира с двумя спальнями в центре Кишинёва, комплекс Измаил 88. В квартире есть оборудованная кухня, чистое бельё, Wi-Fi, TV, кондиционер и всё необходимое для комфортного проживания.",
      twoBedroomPlus: "Просторная квартира 2+1 в центре Кишинёва, комплекс Измаил 88. Две спальни, гостиная зона, кухня, чистое бельё, Wi-Fi, TV, кондиционер и всё необходимое для комфортного проживания.",
    },
    aboutSecond: {
      studio: "Хорошо подходит для одного гостя или пары. Удобная локация в центре города, рядом магазины, транспорт и всё необходимое.",
      oneBedroom: "Хорошо подходит для пары, семьи или гостей в командировке. Удобная локация в центре города, рядом магазины, транспорт и всё необходимое для проживания.",
      twoBedroom: "Хорошо подходит для семьи или небольшой компании. Удобная локация в центре города, рядом магазины, транспорт и всё необходимое.",
      twoBedroomPlus: "Хорошо подходит для семьи или компании до 5 гостей. Удобная локация в центре города, рядом магазины, транспорт и всё необходимое.",
    },
    features: {
      studio: ["Студия", "Спальная зона", "Wi-Fi", "TV", "Кондиционер", "Кухня", "Чистое бельё", "Душ", "Парковка рядом", "Заселение 24/7"],
      oneBedroom: ["1+1 планировка", "Отдельная спальня", "Двуспальная кровать", "Диван", "Wi-Fi", "TV", "Кондиционер", "Кухня", "Чистое бельё", "Душ", "Парковка рядом", "Заселение 24/7"],
      twoBedroom: ["2 спальни", "Двуспальная кровать", "Диван", "Wi-Fi", "TV", "Кондиционер", "Кухня", "Чистое бельё", "Душ", "Парковка рядом", "Заселение 24/7"],
      twoBedroomPlus: ["2+1 планировка", "2 спальни", "Гостиная", "Wi-Fi", "TV", "Кондиционер", "Кухня", "Чистое бельё", "Душ", "Парковка рядом", "Заселение 24/7"],
    },
  },
  ro: {
    brandSubtitle: "Apartamente în chirie pe zi în Chișinău",
    addressTitle: "Ismail 88",
    back: "Înapoi la toate apartamentele",
    call: "Sună",
    checkAvailability: "Verifică disponibilitatea",
    whatsappMessage: "Bună ziua! Mă interesează apartamentul Ismail 88, ID {id}",
    priceSuffix: "lei / zi",
    photo: "Foto",
    galleryTitle: "Galeria apartamentului",
    mainPhotoAlt: "Foto principală ID {id}",
    galleryPhotoAlt: "Foto apartament ID {id} {index}",
    facadeAlt: "Fațada blocului Ismail 88",
    aboutLabel: "Despre apartament",
    bookingLabel: "Rezervare",
    bookingNote: "Scrieți datele și numărul de oaspeți - verificăm rapid disponibilitatea.",
    footerText: "Apartamente în chirie pe zi în Chișinău • Centru • Cazare 24/7",
    kinds: { studio: "Studio", oneBedroom: "Apartament 1+1", twoBedroom: "2 dormitoare", twoBedroomPlus: "Apartament 2+1" },
    guests: { 2: "Până la 2 oaspeți", 3: "Până la 3 oaspeți", 4: "Până la 4 oaspeți", 5: "Până la 5 oaspeți" },
    overlay: { studio: "Zonă de dormit", oneBedroom: "Dormitor + living", twoBedroom: "2 dormitoare", twoBedroomPlus: "2 dormitoare + living" },
    intro: {
      studio: "Studio confortabil în centrul Chișinăului. Potrivit pentru un oaspete sau un cuplu, cu zonă de dormit, bucătărie și tot ce este necesar.",
      oneBedroom: "Apartament 1+1 confortabil în centrul Chișinăului. Dormitor separat, zonă de living, bucătărie și cazare comodă pentru oaspeți.",
      twoBedroom: "Apartament spațios cu două dormitoare în centrul Chișinăului. O opțiune bună pentru familie sau oaspeți în deplasare.",
      twoBedroomPlus: "Apartament spațios 2+1 în centrul Chișinăului, cu două dormitoare, living și cazare comodă pentru până la 5 oaspeți.",
    },
    aboutTitle: { studio: "Studio comod pentru 1-2 oaspeți", oneBedroom: "Apartament comod în centru", twoBedroom: "Apartament cu două dormitoare", twoBedroomPlus: "Apartament spațios pentru familie" },
    aboutFirst: {
      studio: "Studio confortabil în centrul Chișinăului, complexul Ismail 88. Are zonă de dormit, bucătărie, lenjerie curată, Wi-Fi, TV, aer condiționat și tot ce este necesar.",
      oneBedroom: "Apartament 1+1 în centrul Chișinăului, complexul Ismail 88. Are dormitor separat, living, bucătărie utilată, lenjerie curată, Wi-Fi, TV și aer condiționat.",
      twoBedroom: "Apartament cu două dormitoare în centrul Chișinăului, complexul Ismail 88. Are bucătărie utilată, lenjerie curată, Wi-Fi, TV și aer condiționat.",
      twoBedroomPlus: "Apartament 2+1 spațios în centrul Chișinăului, complexul Ismail 88. Două dormitoare, living, bucătărie, lenjerie curată, Wi-Fi, TV și aer condiționat.",
    },
    aboutSecond: {
      studio: "Potrivit pentru un oaspete sau un cuplu. Locație comodă în centru, aproape de magazine și transport.",
      oneBedroom: "Potrivit pentru cuplu, familie sau oaspeți în deplasare. Locație comodă în centrul orașului.",
      twoBedroom: "Potrivit pentru familie sau un grup mic. Locație comodă în centru, aproape de magazine și transport.",
      twoBedroomPlus: "Potrivit pentru familie sau grup de până la 5 oaspeți. Locație comodă în centrul orașului.",
    },
    features: {
      studio: ["Studio", "Zonă de dormit", "Wi-Fi", "TV", "Aer condiționat", "Bucătărie", "Lenjerie curată", "Duș", "Parcare în apropiere", "Cazare 24/7"],
      oneBedroom: ["Plan 1+1", "Dormitor separat", "Pat dublu", "Canapea", "Wi-Fi", "TV", "Aer condiționat", "Bucătărie", "Lenjerie curată", "Duș", "Parcare în apropiere", "Cazare 24/7"],
      twoBedroom: ["2 dormitoare", "Pat dublu", "Canapea", "Wi-Fi", "TV", "Aer condiționat", "Bucătărie", "Lenjerie curată", "Duș", "Parcare în apropiere", "Cazare 24/7"],
      twoBedroomPlus: ["Plan 2+1", "2 dormitoare", "Living", "Wi-Fi", "TV", "Aer condiționat", "Bucătărie", "Lenjerie curată", "Duș", "Parcare în apropiere", "Cazare 24/7"],
    },
  },
  en: {
    brandSubtitle: "Daily apartments in Chisinau",
    addressTitle: "Ismail 88",
    back: "Back to all apartments",
    call: "Call",
    checkAvailability: "Check availability",
    whatsappMessage: "Hello! I am interested in apartment Ismail 88, ID {id}",
    priceSuffix: "MDL / night",
    photo: "Photos",
    galleryTitle: "Apartment gallery",
    mainPhotoAlt: "Main photo ID {id}",
    galleryPhotoAlt: "Apartment photo ID {id} {index}",
    facadeAlt: "Ismail 88 building facade",
    aboutLabel: "About the apartment",
    bookingLabel: "Booking",
    bookingNote: "Send your dates and number of guests - we will quickly check availability.",
    footerText: "Daily apartments in Chisinau • Center • 24/7 check-in",
    kinds: { studio: "Studio", oneBedroom: "1+1 apartment", twoBedroom: "2 bedrooms", twoBedroomPlus: "2+1 apartment" },
    guests: { 2: "Up to 2 guests", 3: "Up to 3 guests", 4: "Up to 4 guests", 5: "Up to 5 guests" },
    overlay: { studio: "Sleeping area", oneBedroom: "Bedroom + living room", twoBedroom: "2 bedrooms", twoBedroomPlus: "2 bedrooms + living room" },
    intro: {
      studio: "Cozy studio in central Chisinau. Good for one guest or a couple, with a sleeping area, kitchen and everything needed for a comfortable stay.",
      oneBedroom: "Cozy 1+1 apartment in central Chisinau. Separate bedroom, living area, kitchen and comfortable accommodation for guests.",
      twoBedroom: "Spacious apartment with two bedrooms in central Chisinau. A good option for a family or business guests.",
      twoBedroomPlus: "Spacious 2+1 apartment in central Chisinau with two bedrooms, a living area and comfortable accommodation for up to 5 guests.",
    },
    aboutTitle: { studio: "Cozy studio for 1-2 guests", oneBedroom: "Comfortable central apartment", twoBedroom: "Apartment with two bedrooms", twoBedroomPlus: "Spacious family apartment" },
    aboutFirst: {
      studio: "Cozy studio in central Chisinau, Ismail 88 complex. It has a sleeping area, kitchen, clean linen, Wi-Fi, TV, air conditioning and everything needed for a short or long stay.",
      oneBedroom: "Cozy 1+1 apartment in central Chisinau, Ismail 88 complex. It has a separate bedroom, living area, equipped kitchen, clean linen, Wi-Fi, TV and air conditioning.",
      twoBedroom: "Comfortable apartment with two bedrooms in central Chisinau, Ismail 88 complex. It has an equipped kitchen, clean linen, Wi-Fi, TV and air conditioning.",
      twoBedroomPlus: "Spacious 2+1 apartment in central Chisinau, Ismail 88 complex. Two bedrooms, living area, kitchen, clean linen, Wi-Fi, TV and air conditioning.",
    },
    aboutSecond: {
      studio: "Good for one guest or a couple. Convenient city-center location near shops, transport and everyday essentials.",
      oneBedroom: "Good for a couple, family or business guests. Convenient city-center location near shops, transport and everyday essentials.",
      twoBedroom: "Good for a family or small group. Convenient city-center location near shops, transport and everyday essentials.",
      twoBedroomPlus: "Good for a family or group of up to 5 guests. Convenient city-center location near shops, transport and everyday essentials.",
    },
    features: {
      studio: ["Studio", "Sleeping area", "Wi-Fi", "TV", "Air conditioning", "Kitchen", "Clean linen", "Shower", "Nearby parking", "24/7 check-in"],
      oneBedroom: ["1+1 layout", "Separate bedroom", "Double bed", "Sofa", "Wi-Fi", "TV", "Air conditioning", "Kitchen", "Clean linen", "Shower", "Nearby parking", "24/7 check-in"],
      twoBedroom: ["2 bedrooms", "Double bed", "Sofa", "Wi-Fi", "TV", "Air conditioning", "Kitchen", "Clean linen", "Shower", "Nearby parking", "24/7 check-in"],
      twoBedroomPlus: ["2+1 layout", "2 bedrooms", "Living room", "Wi-Fi", "TV", "Air conditioning", "Kitchen", "Clean linen", "Shower", "Nearby parking", "24/7 check-in"],
    },
  },
  uk: {
    brandSubtitle: "Квартири подобово в Кишиневі",
    addressTitle: "Ізмаїл 88",
    back: "Назад до всіх квартир",
    call: "Подзвонити",
    checkAvailability: "Перевірити вільна",
    whatsappMessage: "Добрий день! Цікавить квартира Ізмаїл 88, ID {id}",
    priceSuffix: "лей / доба",
    photo: "Фото",
    galleryTitle: "Галерея квартири",
    mainPhotoAlt: "Головне фото ID {id}",
    galleryPhotoAlt: "Фото квартири ID {id} {index}",
    facadeAlt: "Фасад будинку Ізмаїл 88",
    aboutLabel: "Про квартиру",
    bookingLabel: "Бронювання",
    bookingNote: "Напишіть дати та кількість гостей - швидко перевіримо, чи квартира вільна.",
    footerText: "Квартири подобово в Кишиневі • Центр • Заселення 24/7",
    kinds: { studio: "Студія", oneBedroom: "1+1 квартира", twoBedroom: "2 спальні", twoBedroomPlus: "2+1 квартира" },
    guests: { 2: "До 2 гостей", 3: "До 3 гостей", 4: "До 4 гостей", 5: "До 5 гостей" },
    overlay: { studio: "Спальна зона", oneBedroom: "Спальня + вітальня", twoBedroom: "2 спальні", twoBedroomPlus: "2 спальні + вітальня" },
    intro: {
      studio: "Затишна студія в центрі Кишинева. Підходить для одного гостя або пари, зі спальною зоною, кухнею та всім необхідним.",
      oneBedroom: "Затишна квартира 1+1 в центрі Кишинева. Окрема спальня, зона вітальні, кухня та комфортне розміщення гостей.",
      twoBedroom: "Простора квартира з двома спальнями в центрі Кишинева. Гарний варіант для сім'ї або гостей у відрядженні.",
      twoBedroomPlus: "Простора квартира 2+1 в центрі Кишинева з двома спальнями, вітальнею та розміщенням до 5 гостей.",
    },
    aboutTitle: { studio: "Затишна студія для 1-2 гостей", oneBedroom: "Зручна квартира в центрі", twoBedroom: "Квартира з двома спальнями", twoBedroomPlus: "Простора квартира для сім'ї" },
    aboutFirst: {
      studio: "Затишна студія в центрі Кишинева, комплекс Ізмаїл 88. Є спальна зона, кухня, чиста білизна, Wi-Fi, TV, кондиціонер і все необхідне.",
      oneBedroom: "Затишна квартира 1+1 в центрі Кишинева, комплекс Ізмаїл 88. Є окрема спальня, зона вітальні, обладнана кухня, чиста білизна, Wi-Fi, TV і кондиціонер.",
      twoBedroom: "Зручна квартира з двома спальнями в центрі Кишинева, комплекс Ізмаїл 88. Є обладнана кухня, чиста білизна, Wi-Fi, TV і кондиціонер.",
      twoBedroomPlus: "Простора квартира 2+1 в центрі Кишинева, комплекс Ізмаїл 88. Дві спальні, вітальня, кухня, чиста білизна, Wi-Fi, TV і кондиціонер.",
    },
    aboutSecond: {
      studio: "Підходить для одного гостя або пари. Зручна локація в центрі міста, поруч магазини й транспорт.",
      oneBedroom: "Підходить для пари, сім'ї або гостей у відрядженні. Зручна локація в центрі міста.",
      twoBedroom: "Підходить для сім'ї або невеликої компанії. Зручна локація в центрі міста.",
      twoBedroomPlus: "Підходить для сім'ї або компанії до 5 гостей. Зручна локація в центрі міста.",
    },
    features: {
      studio: ["Студія", "Спальна зона", "Wi-Fi", "TV", "Кондиціонер", "Кухня", "Чиста білизна", "Душ", "Парковка поруч", "Заселення 24/7"],
      oneBedroom: ["1+1 планування", "Окрема спальня", "Двоспальне ліжко", "Диван", "Wi-Fi", "TV", "Кондиціонер", "Кухня", "Чиста білизна", "Душ", "Парковка поруч", "Заселення 24/7"],
      twoBedroom: ["2 спальні", "Двоспальне ліжко", "Диван", "Wi-Fi", "TV", "Кондиціонер", "Кухня", "Чиста білизна", "Душ", "Парковка поруч", "Заселення 24/7"],
      twoBedroomPlus: ["2+1 планування", "2 спальні", "Вітальня", "Wi-Fi", "TV", "Кондиціонер", "Кухня", "Чиста білизна", "Душ", "Парковка поруч", "Заселення 24/7"],
    },
  },
  cs: {
    brandSubtitle: "Apartmány na den v Kišiněvě",
    addressTitle: "Ismail 88",
    back: "Zpět na všechny apartmány",
    call: "Zavolat",
    checkAvailability: "Ověřit dostupnost",
    whatsappMessage: "Dobrý den! Mám zájem o apartmán Ismail 88, ID {id}",
    priceSuffix: "lei / noc",
    photo: "Foto",
    galleryTitle: "Galerie apartmánu",
    mainPhotoAlt: "Hlavní foto ID {id}",
    galleryPhotoAlt: "Foto apartmánu ID {id} {index}",
    facadeAlt: "Fasáda domu Ismail 88",
    aboutLabel: "O apartmánu",
    bookingLabel: "Rezervace",
    bookingNote: "Napište termíny a počet hostů - rychle ověříme dostupnost.",
    footerText: "Apartmány na den v Kišiněvě • Centrum • Ubytování 24/7",
    kinds: { studio: "Studio", oneBedroom: "Apartmán 1+1", twoBedroom: "2 ložnice", twoBedroomPlus: "Apartmán 2+1" },
    guests: { 2: "Až 2 hosté", 3: "Až 3 hosté", 4: "Až 4 hosté", 5: "Až 5 hostů" },
    overlay: { studio: "Spací zóna", oneBedroom: "Ložnice + obývací pokoj", twoBedroom: "2 ložnice", twoBedroomPlus: "2 ložnice + obývací pokoj" },
    intro: {
      studio: "Útulné studio v centru Kišiněva. Vhodné pro jednoho hosta nebo pár, se spací zónou, kuchyní a vším potřebným.",
      oneBedroom: "Útulný apartmán 1+1 v centru Kišiněva. Samostatná ložnice, obývací zóna, kuchyně a pohodlné ubytování pro hosty.",
      twoBedroom: "Prostorný apartmán se dvěma ložnicemi v centru Kišiněva. Dobrá volba pro rodinu nebo pracovní cestu.",
      twoBedroomPlus: "Prostorný apartmán 2+1 v centru Kišiněva se dvěma ložnicemi, obývacím pokojem a ubytováním až pro 5 hostů.",
    },
    aboutTitle: { studio: "Útulné studio pro 1-2 hosty", oneBedroom: "Pohodlný apartmán v centru", twoBedroom: "Apartmán se dvěma ložnicemi", twoBedroomPlus: "Prostorný apartmán pro rodinu" },
    aboutFirst: {
      studio: "Útulné studio v centru Kišiněva, komplex Ismail 88. Má spací zónu, kuchyni, čisté povlečení, Wi-Fi, TV, klimatizaci a vše potřebné.",
      oneBedroom: "Útulný apartmán 1+1 v centru Kišiněva, komplex Ismail 88. Má samostatnou ložnici, obývací zónu, vybavenou kuchyni, čisté povlečení, Wi-Fi, TV a klimatizaci.",
      twoBedroom: "Pohodlný apartmán se dvěma ložnicemi v centru Kišiněva, komplex Ismail 88. Má vybavenou kuchyni, čisté povlečení, Wi-Fi, TV a klimatizaci.",
      twoBedroomPlus: "Prostorný apartmán 2+1 v centru Kišiněva, komplex Ismail 88. Dvě ložnice, obývací pokoj, kuchyně, čisté povlečení, Wi-Fi, TV a klimatizace.",
    },
    aboutSecond: {
      studio: "Vhodné pro jednoho hosta nebo pár. Pohodlná poloha v centru města, blízko obchodů a dopravy.",
      oneBedroom: "Vhodné pro pár, rodinu nebo pracovní cestu. Pohodlná poloha v centru města.",
      twoBedroom: "Vhodné pro rodinu nebo menší skupinu. Pohodlná poloha v centru města.",
      twoBedroomPlus: "Vhodné pro rodinu nebo skupinu až 5 hostů. Pohodlná poloha v centru města.",
    },
    features: {
      studio: ["Studio", "Spací zóna", "Wi-Fi", "TV", "Klimatizace", "Kuchyně", "Čisté povlečení", "Sprcha", "Parkování poblíž", "Ubytování 24/7"],
      oneBedroom: ["Dispozice 1+1", "Samostatná ložnice", "Manželská postel", "Pohovka", "Wi-Fi", "TV", "Klimatizace", "Kuchyně", "Čisté povlečení", "Sprcha", "Parkování poblíž", "Ubytování 24/7"],
      twoBedroom: ["2 ložnice", "Manželská postel", "Pohovka", "Wi-Fi", "TV", "Klimatizace", "Kuchyně", "Čisté povlečení", "Sprcha", "Parkování poblíž", "Ubytování 24/7"],
      twoBedroomPlus: ["Dispozice 2+1", "2 ložnice", "Obývací pokoj", "Wi-Fi", "TV", "Klimatizace", "Kuchyně", "Čisté povlečení", "Sprcha", "Parkování poblíž", "Ubytování 24/7"],
    },
  },
};

function format(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

export default function ApartmentDetails({ apartment }: { apartment: ApartmentDetailsData }) {
  const { language, setLanguage } = useLanguage();
  const text = detailText[language];
  const facadePhoto = "/common/building.png";
  const galleryImages = apartment.images.slice(1);
  const whatsappText = format(text.whatsappMessage, { id: apartment.id });
  const whatsappLink = "https://wa.me/37369990190?text=" + encodeURIComponent(whatsappText);
  const heroPosition = apartment.heroPosition ?? "center 45%";

  return (
    <main className="min-h-screen bg-[#f4f1ee] text-[#111827]">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#d4146f] text-xl font-black text-white shadow-lg">R</div>
            <div className="min-w-0">
              <p className="text-xl font-black leading-none sm:text-3xl">Rent<span className="text-[#d4146f]">Place</span><span className="text-[#ffb800]">MD</span></p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.24em] text-gray-500 sm:text-xs">{text.brandSubtitle}</p>
            </div>
          </a>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="flex items-center gap-1 rounded-2xl bg-[#f4f1ee] p-1">
              {languages.map((item) => (
                <button key={item.code} type="button" onClick={() => setLanguage(item.code)} className={(language === item.code ? "bg-[#d4146f] text-white" : "text-gray-500 hover:bg-white") + " rounded-xl px-3 py-2 text-xs font-black transition"} aria-label={item.label}>{item.short}</button>
              ))}
            </div>
            <div className="rounded-2xl bg-[#f4f1ee] px-5 py-3 text-right font-black text-[#d4146f]">
              <a href="tel:+37369990190" className="block text-sm">+373 69 990 190</a>
              <a href="tel:+37379990190" className="mt-1 block text-sm">+373 79 990 190</a>
            </div>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-[#25D366] px-5 py-4 text-sm font-black text-white">WhatsApp</a>
            <a href="viber://chat?number=%2B37369990190" className="rounded-2xl bg-purple-700 px-5 py-4 text-sm font-black text-white">Viber</a>
          </div>

          <a href="tel:+37369990190" className="rounded-2xl bg-[#d4146f] px-4 py-3 text-sm font-black text-white lg:hidden">{text.call}</a>
        </div>

        <div className="border-t border-black/5 px-4 py-2 lg:hidden">
          <div className="mx-auto flex max-w-7xl justify-center gap-1 rounded-2xl bg-[#f4f1ee] p-1">
            {languages.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setLanguage(item.code)}
                className={(language === item.code ? "bg-[#d4146f] text-white" : "text-gray-500") + " flex-1 rounded-xl px-2 py-2 text-xs font-black transition"}
                aria-label={item.label}
              >
                {item.short}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-14 lg:pt-8">
        <a href="/" className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-[#d4146f] shadow-sm">← {text.back}</a>

        <div className="overflow-hidden rounded-[34px] bg-[#111827] shadow-2xl">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col justify-center p-6 text-white sm:p-9 lg:p-10">
              <div className="mb-5 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-black">ID {apartment.id}</span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-black">{text.kinds[apartment.kind]}</span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-black">{text.guests[apartment.guests]}</span>
              </div>
              <h1 className="text-5xl font-black leading-tight sm:text-7xl">{text.addressTitle}</h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">{text.intro[apartment.kind]}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl bg-white p-5 text-[#111827]"><p className="text-4xl font-black text-[#d4146f]">{apartment.price}</p><p className="font-bold text-gray-500">{text.priceSuffix}</p></div>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-3xl bg-[#25D366] p-5 text-center text-lg font-black text-white">{text.checkAvailability}</a>
                <a href="tel:+37369990190" className="flex items-center justify-center rounded-3xl bg-[#ffb800] p-5 text-center text-lg font-black text-[#111827]">{text.call}</a>
              </div>
            </div>
            <div className="relative h-[360px] overflow-hidden sm:h-[520px] lg:h-[590px]">
              <img src={apartment.images[0]} alt={text.addressTitle + " ID " + apartment.id} className="h-full w-full object-cover" style={{ objectPosition: heroPosition }} />
              <div className="absolute bottom-5 left-5 rounded-3xl bg-white/90 px-5 py-4 shadow-xl backdrop-blur"><p className="text-sm font-bold text-gray-500">{text.kinds[apartment.kind]}</p><p className="text-xl font-black text-[#111827]">{text.overlay[apartment.kind]}</p></div>
            </div>
          </div>
        </div>

        <section className="mt-8">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#d4146f]">{text.photo}</p>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">{text.galleryTitle}</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[32px] bg-white p-2 shadow-lg"><img src={apartment.images[0]} alt={format(text.mainPhotoAlt, { id: apartment.id })} className="h-[340px] w-full rounded-[26px] object-cover sm:h-[560px] lg:h-[760px]" style={{ objectPosition: heroPosition }} /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              {galleryImages.map((image, index) => (<div key={image} className="overflow-hidden rounded-[32px] bg-white p-2 shadow-lg"><img src={image} alt={format(text.galleryPhotoAlt, { id: apartment.id, index: index + 1 })} loading="lazy" className="h-[240px] w-full rounded-[26px] object-cover object-center sm:h-[260px] lg:h-[250px]" /></div>))}
              <div className="overflow-hidden rounded-[32px] bg-white p-2 shadow-lg sm:col-span-2"><img src={facadePhoto} alt={text.facadeAlt} loading="lazy" className="h-[260px] w-full rounded-[26px] object-cover object-center lg:h-[224px]" /></div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[36px] bg-white p-6 shadow-lg sm:p-9 lg:col-span-2">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#d4146f]">{text.aboutLabel}</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">{text.aboutTitle[apartment.kind]}</h2>
            <p className="mt-5 text-lg leading-8 text-gray-700">{text.aboutFirst[apartment.kind]}</p>
            <p className="mt-5 text-lg leading-8 text-gray-700">{text.aboutSecond[apartment.kind]}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">{[text.guests[apartment.guests], ...text.features[apartment.kind]].map((item) => (<div key={item} className="rounded-2xl bg-[#f4f1ee] px-5 py-4 font-black text-gray-800">✓ {item}</div>))}</div>
          </div>
          <aside className="rounded-[36px] bg-[#d4146f] p-6 text-white shadow-xl sm:p-8 lg:sticky lg:top-28 lg:h-fit">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-white/70">{text.bookingLabel}</p>
            <p className="mt-4 text-6xl font-black">{apartment.price}</p>
            <p className="text-lg font-bold text-white/80">{text.priceSuffix}</p>
            <div className="mt-6 space-y-3"><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block rounded-2xl bg-white py-4 text-center text-lg font-black text-[#d4146f]">WhatsApp</a><a href="tel:+37369990190" className="block rounded-2xl bg-[#ffb800] py-4 text-center text-lg font-black text-[#111827]">{text.call}</a><a href="viber://chat?number=%2B37369990190" className="block rounded-2xl bg-purple-700 py-4 text-center text-lg font-black text-white">Viber</a></div>
            <p className="mt-6 rounded-2xl bg-white/10 p-4 text-center font-bold text-white/85">{text.bookingNote}</p>
          </aside>
        </section>
      </section>

      <footer className="bg-[#111827] px-4 py-10 text-white sm:px-6 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-3xl font-black">Rent<span className="text-[#d4146f]">Place</span><span className="text-[#ffb800]">MD</span></p><p className="mt-2 text-white/60">{text.footerText}</p></div><div className="text-lg font-black"><a href="tel:+37369990190" className="block">+373 69 990 190</a><a href="tel:+37379990190" className="mt-1 block">+373 79 990 190</a></div></div></footer>
      <div className="fixed bottom-4 left-4 right-4 z-50 grid grid-cols-2 gap-3 lg:hidden"><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-[#25D366] py-4 text-center text-base font-black text-white shadow-2xl">WhatsApp</a><a href="tel:+37369990190" className="rounded-2xl bg-[#d4146f] py-4 text-center text-base font-black text-white shadow-2xl">{text.call}</a></div>
    </main>
  );
}
