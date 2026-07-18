import type { Language } from "@/locales/translations";
import { normalizeApartmentId } from "@/lib/apartmentId";

type LocalizedApartmentKind = "studio" | "oneBedroom";

type ApartmentLocalizationDefinition = {
  address: Record<Language, string>;
  category: "Standard+" | "Premium";
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

const localizationDefinitions: Record<string, ApartmentLocalizationDefinition> = {
  "25": { address: ismail88, category: "Standard+", kind: "oneBedroom", price: 1000 },
  "30": { address: ismail88, category: "Standard+", kind: "oneBedroom", price: 1000 },
  "67": { address: grigoreUreche67, category: "Standard+", kind: "oneBedroom", price: 1000 },
  "301": { address: ismail88, category: "Standard+", kind: "oneBedroom", price: 1000 },
  "461": { address: ismail88, category: "Standard+", kind: "studio", price: 800 },
  "463": { address: ismail88, category: "Standard+", kind: "studio", price: 800 },
  "464": { address: ismail88, category: "Standard+", kind: "studio", price: 800 },
  "661": { address: ismail88, category: "Standard+", kind: "studio", price: 800 },
  "692": { address: ismail88, category: "Standard+", kind: "studio", price: 800 },
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
  return getApartmentLocalization(apartmentId, language)?.displayAddress ?? fallbackAddress;
}

export function getApartmentSeoLocalization(apartmentId: string | number, language: Language) {
  return getApartmentLocalization(apartmentId, language);
}

export function hasApartmentLocalization(apartmentId: string | number) {
  return Boolean(localizationDefinitions[normalizeApartmentId(apartmentId)]);
}

export function formatLocalizedImageAlt(template: string, index: number) {
  return template.replace("{index}", String(index));
}
