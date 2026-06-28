"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { type Language } from "@/locales/translations";

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
  const { language } = useLanguage();
  const text = detailText[language];
  const facadePhoto = "/common/building.png";
  const galleryImages = apartment.images.slice(1);
  const whatsappText = format(text.whatsappMessage, { id: apartment.id });
  const whatsappLink = "https://wa.me/37369990190?text=" + encodeURIComponent(whatsappText);
  const heroPosition = apartment.heroPosition ?? "center 45%";

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#07111f]">
      <Header />

      <section className="mx-auto max-w-[1600px] px-4 pb-32 pt-4 sm:px-6 lg:px-10 lg:pb-16 lg:pt-8">
        <a href="/" className="mb-4 inline-flex rounded-full border border-[#d4146f]/10 bg-white px-4 py-2 text-xs font-black text-[#d4146f] shadow-lg shadow-black/5 transition hover:-translate-y-0.5 hover:shadow-xl sm:mb-6 sm:px-5 sm:py-2.5 sm:text-sm">← {text.back}</a>

        <div className="overflow-hidden rounded-[22px] bg-[#07111f] shadow-2xl shadow-black/25 ring-1 ring-black/5 sm:rounded-[26px]">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            <div className="flex min-h-[0] flex-col justify-center bg-gradient-to-br from-[#07111f] via-[#0b1628] to-[#121b2b] p-5 text-white sm:min-h-[440px] sm:p-9 lg:min-h-[500px] lg:p-12">
              <div className="mb-4 flex flex-wrap gap-2 sm:mb-6 sm:gap-2.5">
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-black text-white shadow-inner sm:px-4 sm:py-2 sm:text-sm">ID {apartment.id}</span>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-black text-white shadow-inner sm:px-4 sm:py-2 sm:text-sm">{text.kinds[apartment.kind]}</span>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-black text-white shadow-inner sm:px-4 sm:py-2 sm:text-sm">{text.guests[apartment.guests]}</span>
              </div>
              <h1 className="text-4xl font-black leading-[0.98] tracking-tight text-white sm:text-7xl lg:text-8xl">{text.addressTitle}</h1>
              <p className="mt-4 max-w-xl text-base font-medium leading-7 text-white/78 sm:mt-6 sm:text-lg sm:leading-8">{text.intro[apartment.kind]}</p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-9 sm:grid-cols-3">
                <div className="col-span-2 rounded-2xl bg-white p-4 text-[#07111f] shadow-xl shadow-black/10 sm:col-span-1 sm:p-5"><p className="text-3xl font-black leading-none text-[#d4146f] sm:text-4xl">{apartment.price}</p><p className="mt-1 text-xs font-black text-gray-500 sm:mt-2 sm:text-sm">{text.priceSuffix}</p></div>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex min-h-[58px] items-center justify-center rounded-2xl bg-[#25D366] p-3 text-center text-sm font-black text-white shadow-xl shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:brightness-110 sm:min-h-[92px] sm:p-5 sm:text-base">{text.checkAvailability}</a>
                <a href="tel:+37369990190" className="flex min-h-[58px] items-center justify-center rounded-2xl bg-[#ffb800] p-3 text-center text-sm font-black text-[#07111f] shadow-xl shadow-yellow-500/20 transition hover:-translate-y-0.5 hover:brightness-105 sm:min-h-[92px] sm:p-5 sm:text-base">{text.call}</a>
              </div>
            </div>
            <div className="rpm-watermark-frame relative h-[270px] overflow-hidden bg-[#07111f] sm:h-[460px] lg:h-[500px]">
              <img src={apartment.images[0]} alt={text.addressTitle + " ID " + apartment.id} className="h-full w-full object-contain lg:object-cover" style={{ objectPosition: heroPosition }} />
              <div className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] rounded-2xl bg-white/92 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur sm:bottom-5 sm:left-5 sm:px-5 sm:py-4"><p className="text-xs font-black text-gray-500 sm:text-sm">{text.kinds[apartment.kind]}</p><p className="text-base font-black text-[#07111f] sm:text-xl">{text.overlay[apartment.kind]}</p></div>
            </div>
          </div>
        </div>

        <section className="mt-9 sm:mt-12">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#d4146f]">{text.photo}</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-[#07111f] sm:text-5xl">{text.galleryTitle}</h2>
          <div className="mt-5 grid gap-4 sm:mt-6 sm:gap-5 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="rpm-watermark-frame overflow-hidden rounded-[26px] bg-white p-2 shadow-xl shadow-black/10"><img src={apartment.images[0]} alt={format(text.mainPhotoAlt, { id: apartment.id })} className="h-[260px] w-full rounded-[18px] object-contain sm:h-[460px] sm:rounded-[20px] lg:h-[500px] lg:object-cover" style={{ objectPosition: heroPosition }} /></div>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {galleryImages.map((image, index) => (<div key={image} className="rpm-watermark-frame rpm-watermark-frame--compact overflow-hidden rounded-[24px] bg-white p-2 shadow-xl shadow-black/10"><img src={image} alt={format(text.galleryPhotoAlt, { id: apartment.id, index: index + 1 })} loading="lazy" className="h-[220px] w-full rounded-[16px] object-contain object-center sm:h-[230px] sm:rounded-[18px] sm:object-cover lg:h-[178px]" /></div>))}
              <div className="overflow-hidden rounded-[24px] bg-white p-2 shadow-xl shadow-black/10 sm:col-span-2"><img src={facadePhoto} alt={text.facadeAlt} loading="lazy" className="h-[220px] w-full rounded-[18px] object-cover object-center lg:h-[178px]" /></div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid items-start gap-5 sm:mt-10 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_460px]">
          <div className="rounded-[22px] bg-white p-5 shadow-2xl shadow-black/10 sm:rounded-[26px] sm:p-9">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#d4146f]">{text.aboutLabel}</p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-[#07111f] sm:text-5xl">{text.aboutTitle[apartment.kind]}</h2>
            <p className="mt-4 text-base leading-7 text-gray-700 sm:mt-6 sm:text-lg sm:leading-8">{text.aboutFirst[apartment.kind]}</p>
            <p className="mt-4 text-base leading-7 text-gray-700 sm:mt-5 sm:text-lg sm:leading-8">{text.aboutSecond[apartment.kind]}</p>
            <div className="mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3">{[text.guests[apartment.guests], ...text.features[apartment.kind]].map((item) => (<div key={item} className="rounded-2xl bg-[#f4f1ee] px-4 py-3 text-sm font-black text-[#07111f] shadow-inner sm:px-5 sm:py-4 sm:text-base">✓ {item}</div>))}</div>
          </div>
          <aside className="rounded-[22px] bg-[#d4146f] p-5 text-white shadow-2xl shadow-pink-700/20 sm:rounded-[26px] sm:p-8 lg:sticky lg:top-28 lg:h-fit">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-white/70">{text.bookingLabel}</p>
            <p className="mt-3 text-5xl font-black leading-none sm:mt-4 sm:text-7xl">{apartment.price}</p>
            <p className="mt-2 text-lg font-black text-white/80">{text.priceSuffix}</p>
            <div className="mt-6 grid gap-3 sm:mt-8"><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block rounded-2xl bg-white py-4 text-center text-base font-black text-[#d4146f] shadow-lg transition hover:-translate-y-0.5 sm:py-5 sm:text-lg">WhatsApp</a><a href="viber://chat?number=%2B37369990190" className="block rounded-2xl bg-[#7c00d9] py-4 text-center text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 sm:py-5 sm:text-lg">Viber</a><a href="tel:+37369990190" className="block rounded-2xl bg-[#ffb800] py-4 text-center text-base font-black text-[#07111f] shadow-lg transition hover:-translate-y-0.5 sm:py-5 sm:text-lg">{text.call}</a></div>
            <p className="mt-5 rounded-2xl bg-white/12 p-4 text-center text-sm font-black leading-6 text-white/90 sm:mt-7 sm:p-5 sm:text-base sm:leading-7">{text.bookingNote}</p>
          </aside>
        </section>
      </section>

      <Footer />
      <div className="fixed bottom-3 left-3 right-3 z-50 grid grid-cols-3 gap-2 rounded-[20px] border border-white/20 bg-[#07111f]/88 p-2 shadow-2xl shadow-black/30 backdrop-blur lg:hidden"><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-[#25D366] py-3.5 text-center text-sm font-black text-white shadow-2xl shadow-emerald-500/25">WhatsApp</a><a href="viber://chat?number=%2B37369990190" className="rounded-2xl bg-[#7c00d9] py-3.5 text-center text-sm font-black text-white shadow-2xl shadow-purple-600/25">Viber</a><a href="tel:+37369990190" className="rounded-2xl bg-[#d4146f] py-3.5 text-center text-sm font-black text-white shadow-2xl shadow-pink-600/25">{text.call}</a></div>
    </main>
  );
}
