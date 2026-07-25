import type { Language } from "@/locales/translations";
import { normalizeApartmentId } from "@/lib/apartmentId";

type LocalizedApartmentKind = "studio" | "oneBedroom";

type ApartmentLocalizationDefinition = {
  address: Record<Language, string>;
  category: "Standard" | "Standard+" | "Premium";
  kind: LocalizedApartmentKind;
  price: number;
};

export type LocalizedApartmentSeo = {
  displayAddress: string;
  title: string;
  description: string;
  imageAlt: string;
  schemaName: string;
  shortDescription: string;
  layoutDescription: string;
  typeLabel: string;
  aboutTitle: string;
  features: string[];
  descriptionParagraphs?: string[];
  audienceItems?: string[];
  nearbyItems?: string[];
  faq?: Array<{ question: string; answer: string }>;
};

const ismail88: Record<Language, string> = {
  ru: "Измаил, 88",
  ro: "Ismail 88",
  en: "Ismail 88",
  uk: "Ізмаїл, 88",
  cs: "Ismail 88",
};

const grigoreUreche67: Record<Language, string> = {
  ru: "Григоре Уреке, 67",
  ro: "Grigore Ureche 67",
  en: "Grigore Ureche 67",
  uk: "Грігоре Уреке, 67",
  cs: "Grigore Ureche 67",
};

const mihaiEminescu76: Record<Language, string> = {
  ru: "Михай Эминеску, 76",
  ro: "Mihai Eminescu 76",
  en: "Mihai Eminescu 76",
  uk: "Міхай Емінеску, 76",
  cs: "Mihai Eminescu 76",
};

const levTolstoi63: Record<Language, string> = {
  ru: "Лев Толстой, 63/1",
  ro: "Lev Tolstoi 63/1",
  en: "Lev Tolstoy 63/1",
  uk: "Лев Толстой, 63/1",
  cs: "Lev Tolstoj 63/1",
};

const cuzaVoda12: Record<Language, LocalizedApartmentSeo> = {
  ru: {
    displayAddress: "бульвар Куза Водэ, 1/2 · Ботаника",
    title: "Квартира на Ботанике возле аэропорта — бульвар Куза Водэ, 1/2",
    description: "Снять квартиру посуточно на Ботанике по адресу Cuza Vodă 1/2. Спальня и гостиная, до 4 гостей, кофемашина, кондиционер и автономное отопление. 900 MDL.",
    imageAlt: "Квартира посуточно на Ботанике, бульвар Куза Водэ, 1/2, фото {index}",
    schemaName: "Квартира посуточно на Ботанике — бульвар Куза Водэ, 1/2",
    shortDescription: "Современная квартира в новострое на Ботанике, примерно в 10 минутах езды от аэропорта и центра Кишинёва.",
    layoutDescription: "1 спальня + гостиная, до 4 гостей",
    typeLabel: "1 спальня + гостиная",
    aboutTitle: "Квартира посуточно на Ботанике, бульвар Куза Водэ, 1/2",
    features: ["Полностью оборудованная кухня", "Духовка и кофемашина", "Кондиционер", "Автономное отопление", "Гардеробная", "Раскладное спальное место"],
    descriptionParagraphs: [
      "Современная квартира посуточно в новострое на Ботанике, на бульваре Куза Водэ, 1/2. Отдельная спальня и гостиная с дополнительным раскладным спальным местом позволяют комфортно разместить до четырёх гостей.",
      "Квартира полностью обустроена для короткого и продолжительного проживания. В распоряжении гостей оборудованная кухня, духовка, электрический чайник, кофемашина, автономное отопление, исправный кондиционер и отдельная гардеробная.",
      "Дом находится в тихой части Ботаники, в начале улицы Cuza Vodă. Напротив расположен muzCafe Botanica, рядом — парк, кафе, рестораны, спортивные залы, McDonald’s, Andy’s Pizza и La Plăcinte. До аэропорта и центра Кишинёва — около 10 минут езды.",
    ],
    audienceItems: ["Туристам и транзитным гостям", "Семьям с детьми", "Парам", "Деловым путешественникам", "Компаниям до 4 человек"],
    nearbyItems: ["muzCafe Botanica напротив дома", "Парк и тихая прогулочная зона", "Кафе, рестораны и спортивные залы", "McDonald’s, Andy’s Pizza и La Plăcinte", "Около 10 минут до аэропорта", "Около 10 минут до центра"],
    faq: [
      { question: "Сколько гостей может разместиться?", answer: "До четырёх: в квартире есть отдельная спальня и дополнительное раскладное спальное место в гостиной." },
      { question: "Далеко ли аэропорт?", answer: "Поездка до Международного аэропорта Кишинёва занимает около 10 минут в обычных дорожных условиях." },
      { question: "Что есть на кухне?", answer: "Кухня полностью оборудована; есть духовка, электрический чайник и кофемашина." },
    ],
  },
  ro: {
    displayAddress: "bd. Cuza Vodă 1/2, Botanica",
    title: "Apartament în Botanica lângă aeroport — Cuza Vodă 1/2",
    description: "Apartament de închiriat zilnic în Botanica, bd. Cuza Vodă 1/2. Dormitor și living, până la 4 oaspeți, cafetieră, aer condiționat și încălzire autonomă. 900 MDL.",
    imageAlt: "Apartament de închiriat în Botanica, Cuza Vodă 1/2, fotografia {index}",
    schemaName: "Apartament de închiriat în Botanica — Cuza Vodă 1/2",
    shortDescription: "Apartament modern într-un bloc nou din Botanica, la aproximativ 10 minute de aeroport și centrul Chișinăului.",
    layoutDescription: "1 dormitor + living, până la 4 oaspeți",
    typeLabel: "1 dormitor + living",
    aboutTitle: "Apartament de închiriat în Botanica, Cuza Vodă 1/2",
    features: ["Bucătărie complet utilată", "Cuptor și cafetieră", "Aer condiționat", "Încălzire autonomă", "Dressing", "Canapea extensibilă"],
    descriptionParagraphs: [
      "Apartament modern de închiriat zilnic într-un bloc nou din Botanica, pe bd. Cuza Vodă 1/2. Dormitorul separat și livingul cu un loc de dormit extensibil oferă cazare confortabilă pentru până la patru oaspeți.",
      "Apartamentul este complet amenajat pentru șederi scurte sau mai lungi. Oaspeții au la dispoziție o bucătărie utilată, cuptor, fierbător electric, cafetieră, încălzire autonomă, aer condiționat funcțional și dressing separat.",
      "Clădirea se află într-o zonă liniștită din Botanica, la începutul bulevardului Cuza Vodă. Vizavi este muzCafe Botanica, iar în apropiere se găsesc un parc, cafenele, restaurante, săli de sport, McDonald’s, Andy’s Pizza și La Plăcinte. Aeroportul și centrul sunt la aproximativ 10 minute cu mașina.",
    ],
    audienceItems: ["Turiști și oaspeți în tranzit", "Familii cu copii", "Cupluri", "Călători de afaceri", "Grupuri de până la 4 persoane"],
    nearbyItems: ["muzCafe Botanica vizavi", "Parc și zonă liniștită", "Cafenele, restaurante și săli de sport", "McDonald’s, Andy’s Pizza și La Plăcinte", "Aproximativ 10 minute până la aeroport", "Aproximativ 10 minute până în centru"],
    faq: [
      { question: "Câte persoane se pot caza?", answer: "Până la patru persoane, într-un dormitor separat și pe locul de dormit extensibil din living." },
      { question: "Cât de departe este aeroportul?", answer: "Drumul până la Aeroportul Internațional Chișinău durează aproximativ 10 minute în condiții normale de trafic." },
      { question: "Ce dotări are bucătăria?", answer: "Bucătăria este complet utilată și include cuptor, fierbător electric și cafetieră." },
    ],
  },
  en: {
    displayAddress: "1/2 Cuza Vodă Boulevard · Botanica",
    title: "Botanica apartment near the airport — Cuza Vodă 1/2",
    description: "Daily apartment rental in Botanica at Cuza Vodă 1/2. Bedroom and living room for up to 4 guests, coffee machine, air conditioning and independent heating. 900 MDL.",
    imageAlt: "Daily rental apartment in Botanica, Cuza Vodă 1/2, photo {index}",
    schemaName: "Daily rental apartment in Botanica — Cuza Vodă 1/2",
    shortDescription: "Modern apartment in a newer Botanica building, about 10 minutes by car from Chisinau Airport and the city centre.",
    layoutDescription: "1 bedroom + living room, up to 4 guests",
    typeLabel: "1 bedroom + living room",
    aboutTitle: "Daily rental apartment in Botanica, Cuza Vodă 1/2",
    features: ["Fully equipped kitchen", "Oven and coffee machine", "Air conditioning", "Independent heating", "Walk-in wardrobe", "Fold-out sleeping space"],
    descriptionParagraphs: [
      "Modern daily rental apartment in a newer building in Botanica at 1/2 Cuza Vodă Boulevard. A separate bedroom and a living room with an additional fold-out sleeping space comfortably accommodate up to four guests.",
      "The apartment is fully furnished for short or extended stays. It includes an equipped kitchen, oven, electric kettle, coffee machine, independent heating, working air conditioning and a separate walk-in wardrobe.",
      "The building is in a quiet part of Botanica at the beginning of Cuza Vodă Boulevard. muzCafe Botanica is opposite, with a park, cafés, restaurants, gyms, McDonald’s, Andy’s Pizza and La Plăcinte nearby. Both Chisinau Airport and the city centre are about a 10-minute drive away.",
    ],
    audienceItems: ["Tourists and transit guests", "Families with children", "Couples", "Business travellers", "Groups of up to 4"],
    nearbyItems: ["muzCafe Botanica opposite the building", "Park and quiet surroundings", "Cafés, restaurants and gyms", "McDonald’s, Andy’s Pizza and La Plăcinte", "About 10 minutes to the airport", "About 10 minutes to the city centre"],
    faq: [
      { question: "How many guests can stay?", answer: "Up to four guests, using the separate bedroom and the additional fold-out sleeping space in the living room." },
      { question: "How far is the airport?", answer: "Chisinau International Airport is about a 10-minute drive away in normal traffic." },
      { question: "What is available in the kitchen?", answer: "The kitchen is fully equipped and includes an oven, electric kettle and coffee machine." },
    ],
  },
  uk: {
    displayAddress: "бульвар Куза Воде, 1/2 · Ботаніка",
    title: "Квартира на Ботаніці біля аеропорту — бульвар Куза Воде, 1/2",
    description: "Подобова оренда квартири на Ботаніці за адресою Cuza Vodă 1/2. Спальня і вітальня, до 4 гостей, кавоварка, кондиціонер та автономне опалення. 900 MDL.",
    imageAlt: "Квартира подобово на Ботаніці, бульвар Куза Воде, 1/2, фото {index}",
    schemaName: "Квартира подобово на Ботаніці — бульвар Куза Воде, 1/2",
    shortDescription: "Сучасна квартира в новобудові на Ботаніці, приблизно за 10 хвилин їзди від аеропорту та центру Кишинева.",
    layoutDescription: "1 спальня + вітальня, до 4 гостей",
    typeLabel: "1 спальня + вітальня",
    aboutTitle: "Квартира подобово на Ботаніці, бульвар Куза Воде, 1/2",
    features: ["Повністю обладнана кухня", "Духовка та кавоварка", "Кондиціонер", "Автономне опалення", "Гардеробна", "Розкладне спальне місце"],
    descriptionParagraphs: [
      "Сучасна квартира подобово в новобудові на Ботаніці, на бульварі Куза Воде, 1/2. Окрема спальня та вітальня з додатковим розкладним спальним місцем комфортно вміщують до чотирьох гостей.",
      "Квартира повністю облаштована для короткого або тривалого проживання. Є обладнана кухня, духовка, електричний чайник, кавоварка, автономне опалення, справний кондиціонер і окрема гардеробна.",
      "Будинок розташований у тихій частині Ботаніки, на початку вулиці Cuza Vodă. Навпроти — muzCafe Botanica, поруч парк, кафе, ресторани, спортивні зали, McDonald’s, Andy’s Pizza та La Plăcinte. До аеропорту й центру Кишинева — близько 10 хвилин їзди.",
    ],
    audienceItems: ["Туристам і транзитним гостям", "Сім’ям з дітьми", "Парам", "Діловим мандрівникам", "Компаніям до 4 осіб"],
    nearbyItems: ["muzCafe Botanica навпроти", "Парк і тиха зона", "Кафе, ресторани та спортивні зали", "McDonald’s, Andy’s Pizza та La Plăcinte", "Близько 10 хвилин до аеропорту", "Близько 10 хвилин до центру"],
    faq: [
      { question: "Скільки гостей може розміститися?", answer: "До чотирьох: є окрема спальня та додаткове розкладне спальне місце у вітальні." },
      { question: "Далеко до аеропорту?", answer: "Дорога до Міжнародного аеропорту Кишинева займає близько 10 хвилин за звичайного трафіку." },
      { question: "Що є на кухні?", answer: "Кухня повністю обладнана; є духовка, електричний чайник і кавоварка." },
    ],
  },
  cs: {
    displayAddress: "bulvár Cuza Vodă 1/2 · Botanica",
    title: "Apartmán v Botanice u letiště — Cuza Vodă 1/2",
    description: "Krátkodobý pronájem apartmánu v Botanice na adrese Cuza Vodă 1/2. Ložnice a obývací pokoj až pro 4 hosty, kávovar, klimatizace a vlastní topení. 900 MDL.",
    imageAlt: "Apartmán k pronájmu v Botanice, Cuza Vodă 1/2, fotografie {index}",
    schemaName: "Apartmán k pronájmu v Botanice — Cuza Vodă 1/2",
    shortDescription: "Moderní apartmán v novější budově v Botanice, přibližně 10 minut autem od letiště a centra Kišiněva.",
    layoutDescription: "1 ložnice + obývací pokoj, až 4 hosté",
    typeLabel: "1 ložnice + obývací pokoj",
    aboutTitle: "Krátkodobý pronájem v Botanice, Cuza Vodă 1/2",
    features: ["Plně vybavená kuchyně", "Trouba a kávovar", "Klimatizace", "Vlastní topení", "Šatna", "Rozkládací lůžko"],
    descriptionParagraphs: [
      "Moderní apartmán ke krátkodobému pronájmu v novější budově v Botanice na adrese Cuza Vodă 1/2. Samostatná ložnice a obývací pokoj s dalším rozkládacím lůžkem pohodlně ubytují až čtyři hosty.",
      "Apartmán je kompletně zařízený pro krátké i delší pobyty. K dispozici je vybavená kuchyně, trouba, rychlovarná konvice, kávovar, vlastní topení, funkční klimatizace a samostatná šatna.",
      "Dům stojí v klidné části Botanicy na začátku bulváru Cuza Vodă. Naproti je muzCafe Botanica a poblíž park, kavárny, restaurace, fitness centra, McDonald’s, Andy’s Pizza a La Plăcinte. Letiště i centrum Kišiněva jsou přibližně 10 minut jízdy.",
    ],
    audienceItems: ["Turisté a tranzitní hosté", "Rodiny s dětmi", "Páry", "Obchodní cestující", "Skupiny až 4 osob"],
    nearbyItems: ["muzCafe Botanica naproti domu", "Park a klidné okolí", "Kavárny, restaurace a fitness centra", "McDonald’s, Andy’s Pizza a La Plăcinte", "Asi 10 minut na letiště", "Asi 10 minut do centra"],
    faq: [
      { question: "Kolik hostů se může ubytovat?", answer: "Až čtyři hosté v samostatné ložnici a na dalším rozkládacím lůžku v obývacím pokoji." },
      { question: "Jak daleko je letiště?", answer: "Cesta na mezinárodní letiště v Kišiněvě trvá za běžného provozu přibližně 10 minut." },
      { question: "Co je v kuchyni?", answer: "Kuchyně je plně vybavená a zahrnuje troubu, rychlovarnou konvici a kávovar." },
    ],
  },
};

const localizationDefinitions: Record<string, ApartmentLocalizationDefinition> = {
  "25": { address: ismail88, category: "Standard+", kind: "oneBedroom", price: 1000 },
  "30": { address: ismail88, category: "Standard+", kind: "oneBedroom", price: 1000 },
  "67": { address: grigoreUreche67, category: "Standard+", kind: "oneBedroom", price: 1000 },
  "301": { address: ismail88, category: "Standard+", kind: "oneBedroom", price: 1000 },
  "461": { address: ismail88, category: "Standard", kind: "studio", price: 800 },
  "463": { address: ismail88, category: "Standard", kind: "studio", price: 800 },
  "464": { address: ismail88, category: "Standard", kind: "studio", price: 800 },
  "661": { address: ismail88, category: "Standard", kind: "studio", price: 800 },
  "692": { address: ismail88, category: "Standard", kind: "studio", price: 800 },
  "76": { address: mihaiEminescu76, category: "Premium", kind: "oneBedroom", price: 1400 },
  "77": { address: levTolstoi63, category: "Premium", kind: "oneBedroom", price: 1100 },
  "78": { address: levTolstoi63, category: "Premium", kind: "oneBedroom", price: 1100 },
};

type LocalizationText = {
  type: Record<LocalizedApartmentKind, string>;
  short: Record<LocalizedApartmentKind, string>;
  layout: Record<LocalizedApartmentKind, string>;
  about: (type: string, address: string) => string;
  title: (type: string, address: string, id: string) => string;
  description: (type: string, address: string, id: string, category: string, price: number) => string;
  imageAlt: (type: string, address: string, id: string, index: string) => string;
  schemaName: (type: string, address: string, id: string) => string;
  features: (kind: LocalizedApartmentKind, category: string) => string[];
};

const localizationText: Record<Language, LocalizationText> = {
  ru: {
    type: { studio: "Студия", oneBedroom: "Квартира 1+1" },
    short: { studio: "Уютная студия для посуточного проживания.", oneBedroom: "Квартира с отдельной спальней и гостиной." },
    layout: { studio: "Единое жилое пространство со спальной зоной.", oneBedroom: "Отдельная спальня и гостиная." },
    about: (type, address) => type + " по адресу " + address,
    title: (type, address, id) => type + " на " + address + " — ID " + id,
    description: (type, address, id, category, price) => type + " " + category + " ID " + id + " по адресу " + address + ". Цена " + price + " MDL за сутки, реальные фотографии и прямое бронирование RentPlaceMD.",
    imageAlt: (type, address, id, index) => type + " RentPlaceMD ID " + id + ", " + address + ", фото " + index,
    schemaName: (type, address, id) => "RentPlaceMD ID " + id + " — " + type.toLowerCase() + ", " + address,
    features: (kind, category) => kind === "studio" ? [category, "Студия", "Спальная зона"] : [category, "Отдельная спальня", "Гостиная"],
  },
  ro: {
    type: { studio: "Garsonieră", oneBedroom: "Apartament 1+1" },
    short: { studio: "Garsonieră confortabilă pentru închiriere zilnică.", oneBedroom: "Apartament cu dormitor separat și living." },
    layout: { studio: "Spațiu locativ unic cu zonă de dormit.", oneBedroom: "Dormitor separat și living." },
    about: (type, address) => type + " pe " + address,
    title: (type, address, id) => type + " pe " + address + " — ID " + id,
    description: (type, address, id, category, price) => type + " " + category + " ID " + id + " pe " + address + ". Preț " + price + " MDL pe noapte, fotografii reale și rezervare directă RentPlaceMD.",
    imageAlt: (type, address, id, index) => type + " RentPlaceMD ID " + id + ", " + address + ", fotografia " + index,
    schemaName: (type, address, id) => "RentPlaceMD ID " + id + " — " + type.toLowerCase() + ", " + address,
    features: (kind, category) => kind === "studio" ? [category, "Garsonieră", "Zonă de dormit"] : [category, "Dormitor separat", "Living"],
  },
  en: {
    type: { studio: "Studio apartment", oneBedroom: "1+1 apartment" },
    short: { studio: "Comfortable studio for daily rental.", oneBedroom: "Apartment with a separate bedroom and living room." },
    layout: { studio: "Open-plan living space with a sleeping area.", oneBedroom: "Separate bedroom and living room." },
    about: (type, address) => type + " at " + address,
    title: (type, address, id) => type + " at " + address + " — ID " + id,
    description: (type, address, id, category, price) => category + " " + type.toLowerCase() + " ID " + id + " at " + address + ". " + price + " MDL per night, real photos and direct booking with RentPlaceMD.",
    imageAlt: (type, address, id, index) => "RentPlaceMD " + type.toLowerCase() + " ID " + id + ", " + address + ", photo " + index,
    schemaName: (type, address, id) => "RentPlaceMD ID " + id + " — " + type.toLowerCase() + ", " + address,
    features: (kind, category) => kind === "studio" ? [category, "Studio", "Sleeping area"] : [category, "Separate bedroom", "Living room"],
  },
  uk: {
    type: { studio: "Студія", oneBedroom: "Квартира 1+1" },
    short: { studio: "Затишна студія для подобової оренди.", oneBedroom: "Квартира з окремою спальнею та вітальнею." },
    layout: { studio: "Єдиний житловий простір зі спальним місцем.", oneBedroom: "Окрема спальня та вітальня." },
    about: (type, address) => type + " за адресою " + address,
    title: (type, address, id) => type + " на " + address + " — ID " + id,
    description: (type, address, id, category, price) => type + " " + category + " ID " + id + " за адресою " + address + ". Ціна " + price + " MDL за добу, реальні фотографії та пряме бронювання RentPlaceMD.",
    imageAlt: (type, address, id, index) => type + " RentPlaceMD ID " + id + ", " + address + ", фото " + index,
    schemaName: (type, address, id) => "RentPlaceMD ID " + id + " — " + type.toLowerCase() + ", " + address,
    features: (kind, category) => kind === "studio" ? [category, "Студія", "Спальна зона"] : [category, "Окрема спальня", "Вітальня"],
  },
  cs: {
    type: { studio: "Studio", oneBedroom: "Apartmán 1+1" },
    short: { studio: "Pohodlné studio pro denní pronájem.", oneBedroom: "Apartmán s oddělenou ložnicí a obývacím pokojem." },
    layout: { studio: "Otevřený obytný prostor se spací zónou.", oneBedroom: "Oddělená ložnice a obývací pokoj." },
    about: (type, address) => type + " na adrese " + address,
    title: (type, address, id) => type + " na adrese " + address + " — ID " + id,
    description: (type, address, id, category, price) => type + " " + category + " ID " + id + " na adrese " + address + ". Cena " + price + " MDL za noc, reálné fotografie a přímá rezervace RentPlaceMD.",
    imageAlt: (type, address, id, index) => type + " RentPlaceMD ID " + id + ", " + address + ", fotografie " + index,
    schemaName: (type, address, id) => "RentPlaceMD ID " + id + " — " + type.toLowerCase() + ", " + address,
    features: (kind, category) => kind === "studio" ? [category, "Studio", "Spací zóna"] : [category, "Oddělená ložnice", "Obývací pokoj"],
  },
};

export function getApartmentLocalization(apartmentId: string | number, language: Language) {
  const id = normalizeApartmentId(apartmentId);
  if (id === "6") return cuzaVoda12[language];
  const definition = localizationDefinitions[id];
  if (!definition) return null;

  const text = localizationText[language];
  const address = definition.address[language];
  const type = text.type[definition.kind];

  return {
    displayAddress: address,
    title: text.title(type, address, id),
    description: text.description(type, address, id, definition.category, definition.price),
    imageAlt: text.imageAlt(type, address, id, "{index}"),
    schemaName: text.schemaName(type, address, id),
    shortDescription: text.short[definition.kind],
    layoutDescription: text.layout[definition.kind],
    typeLabel: type,
    aboutTitle: text.about(type, address),
    features: text.features(definition.kind, definition.category),
  } satisfies LocalizedApartmentSeo;
}

export function getApartmentDisplayAddress(
  apartmentId: string | number,
  fallbackAddress: string,
  language: Language,
) {
  const localizedAddress = getApartmentLocalization(apartmentId, language)?.displayAddress;

  if (localizedAddress) {
    return localizedAddress;
  }

  const normalizedAddress = fallbackAddress.toLocaleLowerCase();

  if (normalizedAddress.includes("измаил") || normalizedAddress.includes("ізмаїл") || normalizedAddress.includes("ismail")) {
    return ismail88[language];
  }

  if (normalizedAddress.includes("grigore ureche") || normalizedAddress.includes("григоре уреке")) {
    return grigoreUreche67[language];
  }

  if (normalizedAddress.includes("mihai eminescu") || normalizedAddress.includes("михай эминеску")) {
    return mihaiEminescu76[language];
  }

  if (normalizedAddress.includes("lev tolstoi") || normalizedAddress.includes("lev tolstoy") || normalizedAddress.includes("лев толстой")) {
    return levTolstoi63[language];
  }

  return fallbackAddress;
}

export function getApartmentSeoLocalization(apartmentId: string | number, language: Language) {
  return getApartmentLocalization(apartmentId, language);
}

export function hasApartmentLocalization(apartmentId: string | number) {
  const id = normalizeApartmentId(apartmentId);
  return id === "6" || Boolean(localizationDefinitions[id]);
}

export function formatLocalizedImageAlt(template: string, index: number) {
  return template.replace("{index}", String(index));
}
