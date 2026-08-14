import type { Language } from "@/locales/translations";
import type { LocalizedApartmentSeo } from "@/lib/apartmentLocalization";

type ApartmentCopy = {
  address: string;
  title: string;
  description: string;
  shortDescription: string;
  aboutTitle: string;
  typeLabel: string;
  view: string;
  features: string[];
  descriptionParagraphs: string[];
  audienceItems: string[];
  nearbyItems?: string[];
  faq: Array<{ question: string; answer: string }>;
};

const photoWord: Record<Language, string> = {
  ru: "фото",
  ro: "fotografia",
  en: "photo",
  uk: "фото",
  cs: "fotografie",
};

const facadeAlt: Record<
  Language,
  { coca: string; varlaam: string }
> = {
  ru: {
    coca: "Фасад здания на ул. Кока, 15 в Кишинёве",
    varlaam: "Фасад двухэтажного здания на ул. Митрополит Варлаам, 50 в Кишинёве",
  },
  ro: {
    coca: "Fațada clădirii Coca 15 din Chișinău",
    varlaam: "Fațada clădirii cu două niveluri de pe Strada Mitropolit Varlaam 50, Chișinău",
  },
  en: {
    coca: "Facade of the Coca 15 building in Chisinau",
    varlaam: "Facade of the two-storey property at 50 Mitropolit Varlaam Street, Chisinau",
  },
  uk: {
    coca: "Фасад будівлі на вул. Кока, 15 у Кишиневі",
    varlaam: "Фасад двоповерхової будівлі на вул. Митрополит Варлаам, 50 у Кишиневі",
  },
  cs: {
    coca: "Fasáda budovy Coca 15 v Kišiněvě",
    varlaam: "Fasáda dvoupodlažního objektu v ulici Mitropolit Varlaam 50 v Kišiněvě",
  },
};

function localized(
  copy: ApartmentCopy,
  id: string,
  language: Language,
): LocalizedApartmentSeo {
  return {
    displayAddress: copy.address,
    title: copy.title,
    description: copy.description,
    imageAlt: `${copy.title}, ${photoWord[language]} {index}`,
    ...(id === "200"
      ? {}
      : { facadeAlt: id === "205" ? facadeAlt[language].varlaam : facadeAlt[language].coca }),
    schemaName: copy.title,
    shortDescription: copy.shortDescription,
    layoutDescription: copy.view,
    typeLabel: copy.typeLabel,
    aboutTitle: copy.aboutTitle,
    features: copy.features,
    descriptionParagraphs: copy.descriptionParagraphs,
    audienceItems: copy.audienceItems,
    nearbyItems: copy.nearbyItems ?? [],
    faq: copy.faq,
  };
}

const newApartmentCopy: Record<Language, Record<string, ApartmentCopy>> = {
  ru: {
    "200": {
      address: "Doina și Ion Aldea-Teodorovici 10/3",
      title: "Однокомнатная квартира на Буюканах — ID 200",
      description: "Современная однокомнатная квартира по адресу Doina și Ion Aldea-Teodorovici 10/3 на Буюканах с хорошим евроремонтом. Для размещения до 4 гостей.",
      shortDescription: "Современная однокомнатная квартира на Буюканах с хорошим евроремонтом для комфортного проживания до 4 гостей.",
      aboutTitle: "Однокомнатная квартира на Буюканах · ID 200",
      typeLabel: "Однокомнатная квартира",
      view: "Буюканы",
      features: ["Однокомнатная квартира", "Современный евроремонт", "До 4 гостей", "4 спальных места", "Буюканы"],
      descriptionParagraphs: [
        "ID 200 — современная однокомнатная квартира по адресу Doina și Ion Aldea-Teodorovici 10/3 в районе Буюканы.",
        "В квартире выполнен хороший современный евроремонт. Она рассчитана на размещение до 4 гостей и располагает 4 спальными местами без указания неподтверждённой конфигурации.",
      ],
      audienceItems: ["Для одного–четырёх гостей", "Для комфортного проживания на Буюканах"],
      faq: [
        { question: "В каком районе находится квартира ID 200?", answer: "Квартира находится в районе Буюканы по адресу Doina și Ion Aldea-Teodorovici 10/3." },
        { question: "Сколько гостей может разместиться?", answer: "До четырёх гостей; предусмотрено 4 спальных места." },
      ],
    },
    "201": {
      address: "ул. Кока, 15 · Кишинёв",
      title: "Студия Комфорт на ул. Кока, 15 — ID 201",
      description: "Студия Комфорт на ул. Кока, 15 в Кишинёве с видом во двор, кондиционером, Wi‑Fi, роллетами и мини-кухней. 900 MDL в сутки.",
      shortDescription: "Свежая студия с видом во двор и практичным оснащением для посуточного проживания.",
      aboutTitle: "Спокойная студия Комфорт на ул. Кока, 15",
      typeLabel: "Студия Комфорт",
      view: "Вид во двор",
      features: ["Комфорт", "Современный евроремонт", "Кондиционер", "Wi‑Fi", "Роллеты", "Мини-кухня", "Телевизор", "Вид во двор"],
      descriptionParagraphs: [
        "ID 201 — аккуратная студия после современного ремонта, подготовленная для посуточного проживания. Окна выходят во двор, поэтому этот вариант подойдёт тем, кто предпочитает спокойный вид.",
        "В студии есть кондиционер, Wi‑Fi, роллеты, мини-кухня и обычный телевизор. Стоимость проживания — 900 MDL в сутки.",
      ],
      audienceItems: ["Для одного гостя или пары", "Для коротких поездок", "Для гостей, которым важен спокойный вид"],
      faq: [
        { question: "Куда выходят окна студии ID 201?", answer: "Окна выходят во двор." },
        { question: "Какой телевизор установлен в ID 201?", answer: "В студии установлен обычный телевизор." },
      ],
    },
    "202": {
      address: "ул. Кока, 15 · Кишинёв",
      title: "Студия с видом в сторону Дендрария — ID 202",
      description: "Студия Комфорт на ул. Кока, 15 с видом в сторону Дендрария, Smart TV, кондиционером, Wi‑Fi и мини-кухней. 1000 MDL в сутки.",
      shortDescription: "Современная студия Комфорт с видом в сторону Дендрария.",
      aboutTitle: "Студия Комфорт рядом с Дендрарием",
      typeLabel: "Студия Комфорт",
      view: "Вид в сторону Дендрария",
      features: ["Комфорт", "Современный евроремонт", "Кондиционер", "Smart TV", "Wi‑Fi", "Роллеты", "Мини-кухня", "Вид в сторону Дендрария"],
      descriptionParagraphs: [
        "ID 202 — свежая студия на ул. Кока, 15 с окнами в сторону зелёной территории Дендрария. Интерьер подготовлен для удобного посуточного проживания.",
        "Оснащение включает кондиционер, Smart TV, Wi‑Fi, роллеты и мини-кухню. Цена — 1000 MDL в сутки.",
      ],
      audienceItems: ["Для одного гостя или пары", "Для отдыха рядом с Дендрарием", "Для деловой поездки"],
      nearbyItems: ["Дендрарий — по направлению вида из окна"],
      faq: [
        { question: "Какой вид у студии ID 202?", answer: "Окна обращены в сторону Дендрария." },
        { question: "Есть ли Smart TV?", answer: "Да, Smart TV входит в подтверждённое оснащение." },
      ],
    },
    "203": {
      address: "ул. Кока, 15 · Кишинёв",
      title: "Премиум-студия у Дендрария — ID 203",
      description: "Премиум-студия на ул. Кока, 15 с современным интерьером, видом в сторону Дендрария, Smart TV, Wi‑Fi и кондиционером. 1100 MDL в сутки.",
      shortDescription: "Выразительная Премиум-студия с цельным интерьером и видом в сторону Дендрария.",
      aboutTitle: "Премиум-студия ID 203 на ул. Кока, 15",
      typeLabel: "Студия Премиум",
      view: "Вид в сторону Дендрария",
      features: ["Премиум", "Современный евроремонт", "Кондиционер", "Smart TV", "Wi‑Fi", "Роллеты", "Мини-кухня", "Вид в сторону Дендрария"],
      descriptionParagraphs: [
        "ID 203 выделяется контрастным современным интерьером и относится к категории Премиум. Из окна открывается вид в сторону Дендрария.",
        "Студия оборудована кондиционером, Smart TV, Wi‑Fi, роллетами и мини-кухней. Стоимость — 1100 MDL в сутки.",
      ],
      audienceItems: ["Для пары", "Для гостей, выбирающих категорию Премиум", "Для поездки рядом с Дендрарием"],
      nearbyItems: ["Дендрарий — по направлению вида из окна"],
      faq: [
        { question: "К какой категории относится ID 203?", answer: "Это студия категории Премиум." },
        { question: "Что видно из окна?", answer: "Окна обращены в сторону Дендрария." },
      ],
    },
    "204": {
      address: "ул. Кока, 15 · Кишинёв",
      title: "Светлая Премиум-студия у Дендрария — ID 204",
      description: "Светлая студия Премиум на ул. Кока, 15 с видом в сторону Дендрария, кондиционером, Smart TV, Wi‑Fi и мини-кухней. 1100 MDL в сутки.",
      shortDescription: "Светлая Премиум-студия со спокойной отделкой и видом в сторону Дендрария.",
      aboutTitle: "Светлая Премиум-студия ID 204",
      typeLabel: "Студия Премиум",
      view: "Вид в сторону Дендрария",
      features: ["Премиум", "Современный евроремонт", "Кондиционер", "Smart TV", "Wi‑Fi", "Роллеты", "Мини-кухня", "Вид в сторону Дендрария"],
      descriptionParagraphs: [
        "ID 204 — светлая студия Премиум с лаконичным современным интерьером. Окна ориентированы в сторону Дендрария.",
        "Для проживания предусмотрены кондиционер, Smart TV, Wi‑Fi, роллеты и мини-кухня. Цена — 1100 MDL в сутки.",
      ],
      audienceItems: ["Для пары", "Для спокойного отдыха", "Для гостей, выбирающих категорию Премиум"],
      nearbyItems: ["Дендрарий — по направлению вида из окна"],
      faq: [
        { question: "Чем отличается ID 204?", answer: "Светлым современным интерьером, категорией Премиум и видом в сторону Дендрария." },
        { question: "Какая цена за сутки?", answer: "1100 MDL в сутки." },
      ],
    },
    "205": {
      address: "ул. Митрополит Варлаам, 50 · Кишинёв",
      title: "Апартамент в двухэтажном доме на ул. Митрополит Варлаам, 50 — ID 205",
      description: "Отдельный апартамент Комфорт в двухэтажном здании на ул. Митрополит Варлаам, 50. Новый интерьер, посуточное проживание, 1200 MDL.",
      shortDescription: "Отдельный апартамент с новым интерьером в двухэтажном здании, разделённом на самостоятельные апартаменты.",
      aboutTitle: "Отдельный апартамент на ул. Митрополит Варлаам, 50",
      typeLabel: "Отдельный апартамент",
      view: "Отдельный апартамент в двухэтажном здании",
      features: ["Комфорт", "Отдельный апартамент", "Двухэтажное здание", "Новый современный интерьер", "Подготовлен для посуточного проживания"],
      descriptionParagraphs: [
        "ID 205 находится в двухэтажном здании, разделённом на самостоятельные апартаменты. Это отдельный апартамент, а не квартира в обычном многоэтажном доме.",
        "Внутри выполнен новый современный интерьер, объект подготовлен для посуточного проживания. Стоимость — 1200 MDL в сутки.",
      ],
      audienceItems: ["Для пары", "Для короткого или длительного пребывания", "Для гостей, предпочитающих отдельный малоэтажный объект"],
      faq: [
        { question: "В каком здании находится ID 205?", answer: "В двухэтажном здании, разделённом на отдельные апартаменты." },
        { question: "Это квартира в многоэтажном доме?", answer: "Нет, это отдельный апартамент в малоэтажном объекте." },
      ],
    },
  },
  ro: {
    "200": {
      address: "Doina și Ion Aldea-Teodorovici 10/3",
      title: "Apartament cu o cameră în Buiucani — ID 200",
      description: "Apartament modern cu o cameră la adresa Doina și Ion Aldea-Teodorovici 10/3, în Buiucani, cu renovare modernă de calitate. Pentru până la 4 oaspeți.",
      shortDescription: "Apartament modern cu o cameră în Buiucani, renovat cu grijă, pentru cazarea confortabilă a până la 4 oaspeți.",
      aboutTitle: "Apartament cu o cameră în Buiucani · ID 200",
      typeLabel: "Apartament cu o cameră",
      view: "Buiucani",
      features: ["Apartament cu o cameră", "Renovare modernă de calitate", "Până la 4 oaspeți", "4 locuri de dormit", "Buiucani"],
      descriptionParagraphs: [
        "ID 200 este un apartament modern cu o cameră la adresa Doina și Ion Aldea-Teodorovici 10/3, în sectorul Buiucani.",
        "Apartamentul are o renovare modernă de calitate, poate găzdui până la 4 oaspeți și oferă 4 locuri de dormit, fără a indica o configurație neconfirmată.",
      ],
      audienceItems: ["Pentru unul până la patru oaspeți", "Pentru un sejur confortabil în Buiucani"],
      faq: [
        { question: "În ce sector se află apartamentul ID 200?", answer: "Apartamentul se află în Buiucani, la adresa Doina și Ion Aldea-Teodorovici 10/3." },
        { question: "Câți oaspeți se pot caza?", answer: "Până la patru oaspeți; sunt disponibile 4 locuri de dormit." },
      ],
    },
    "201": {
      address: "Strada Coca 15, Chișinău",
      title: "Garsonieră Confort pe Strada Coca 15 — ID 201",
      description: "Garsonieră Confort pe Strada Coca 15, cu vedere spre curte, aer condiționat, Wi‑Fi, rulouri și mini-bucătărie. 900 MDL pe noapte.",
      shortDescription: "Garsonieră renovată, cu vedere liniștită spre curte și dotări practice pentru șederi zilnice.",
      aboutTitle: "Garsonieră liniștită Confort pe Strada Coca 15",
      typeLabel: "Garsonieră Confort",
      view: "Vedere spre curte",
      features: ["Confort", "Renovare modernă", "Aer condiționat", "Wi‑Fi", "Rulouri", "Mini-bucătărie", "Televizor", "Vedere spre curte"],
      descriptionParagraphs: [
        "ID 201 este o garsonieră proaspăt renovată și pregătită pentru închiriere zilnică. Ferestrele sunt orientate spre curte.",
        "Sunt confirmate aerul condiționat, Wi‑Fi, rulourile, mini-bucătăria și un televizor obișnuit. Prețul este de 900 MDL pe noapte.",
      ],
      audienceItems: ["Pentru o persoană sau un cuplu", "Pentru călătorii scurte", "Pentru oaspeții care preferă vederea spre curte"],
      faq: [
        { question: "Unde sunt orientate ferestrele apartamentului ID 201?", answer: "Ferestrele sunt orientate spre curte." },
        { question: "Ce televizor este disponibil în ID 201?", answer: "Este disponibil un televizor obișnuit." },
      ],
    },
    "202": {
      address: "Strada Coca 15, Chișinău",
      title: "Garsonieră cu vedere spre Dendrariu — ID 202",
      description: "Garsonieră Confort pe Strada Coca 15, cu vedere spre Dendrariu, Smart TV, aer condiționat, Wi‑Fi și mini-bucătărie. 1000 MDL.",
      shortDescription: "Garsonieră modernă Confort cu vedere în direcția Dendrariului.",
      aboutTitle: "Garsonieră Confort lângă Dendrariu",
      typeLabel: "Garsonieră Confort",
      view: "Vedere în direcția Dendrariului",
      features: ["Confort", "Renovare modernă", "Aer condiționat", "Smart TV", "Wi‑Fi", "Rulouri", "Mini-bucătărie", "Vedere spre Dendrariu"],
      descriptionParagraphs: [
        "ID 202 este o garsonieră proaspăt amenajată pe Strada Coca 15, cu ferestre orientate spre zona verde a Dendrariului.",
        "Dotările confirmate includ aer condiționat, Smart TV, Wi‑Fi, rulouri și mini-bucătărie. Prețul este de 1000 MDL pe noapte.",
      ],
      audienceItems: ["Pentru o persoană sau un cuplu", "Pentru o ședere lângă Dendrariu", "Pentru călătorii de serviciu"],
      nearbyItems: ["Dendrariul — în direcția vederii de la fereastră"],
      faq: [
        { question: "Ce vedere are ID 202?", answer: "Ferestrele sunt orientate în direcția Dendrariului." },
        { question: "Este disponibil Smart TV?", answer: "Da, Smart TV face parte din dotările confirmate." },
      ],
    },
    "203": {
      address: "Strada Coca 15, Chișinău",
      title: "Garsonieră Premium lângă Dendrariu — ID 203",
      description: "Garsonieră Premium pe Strada Coca 15, cu interior modern, vedere spre Dendrariu, Smart TV, Wi‑Fi și aer condiționat. 1100 MDL.",
      shortDescription: "Garsonieră Premium cu design contrastant și vedere în direcția Dendrariului.",
      aboutTitle: "Garsonieră Premium ID 203 pe Strada Coca 15",
      typeLabel: "Garsonieră Premium",
      view: "Vedere în direcția Dendrariului",
      features: ["Premium", "Renovare modernă", "Aer condiționat", "Smart TV", "Wi‑Fi", "Rulouri", "Mini-bucătărie", "Vedere spre Dendrariu"],
      descriptionParagraphs: [
        "ID 203 se remarcă printr-un interior modern contrastant și face parte din categoria Premium. Ferestrele sunt orientate spre Dendrariu.",
        "Garsoniera include aer condiționat, Smart TV, Wi‑Fi, rulouri și mini-bucătărie. Prețul este de 1100 MDL pe noapte.",
      ],
      audienceItems: ["Pentru cupluri", "Pentru oaspeții care aleg clasa Premium", "Pentru o ședere lângă Dendrariu"],
      nearbyItems: ["Dendrariul — în direcția vederii de la fereastră"],
      faq: [
        { question: "Din ce categorie face parte ID 203?", answer: "Este o garsonieră din categoria Premium." },
        { question: "Ce se vede de la fereastră?", answer: "Ferestrele sunt orientate în direcția Dendrariului." },
      ],
    },
    "204": {
      address: "Strada Coca 15, Chișinău",
      title: "Garsonieră Premium luminoasă lângă Dendrariu — ID 204",
      description: "Garsonieră Premium luminoasă pe Strada Coca 15, cu vedere spre Dendrariu, aer condiționat, Smart TV, Wi‑Fi și mini-bucătărie. 1100 MDL.",
      shortDescription: "Garsonieră Premium luminoasă, cu finisaje calme și vedere spre Dendrariu.",
      aboutTitle: "Garsonieră Premium luminoasă ID 204",
      typeLabel: "Garsonieră Premium",
      view: "Vedere în direcția Dendrariului",
      features: ["Premium", "Renovare modernă", "Aer condiționat", "Smart TV", "Wi‑Fi", "Rulouri", "Mini-bucătărie", "Vedere spre Dendrariu"],
      descriptionParagraphs: [
        "ID 204 este o garsonieră Premium luminoasă, cu un interior modern și echilibrat. Ferestrele sunt orientate spre Dendrariu.",
        "Sunt disponibile aer condiționat, Smart TV, Wi‑Fi, rulouri și mini-bucătărie. Prețul este de 1100 MDL pe noapte.",
      ],
      audienceItems: ["Pentru cupluri", "Pentru o ședere liniștită", "Pentru oaspeții care aleg clasa Premium"],
      nearbyItems: ["Dendrariul — în direcția vederii de la fereastră"],
      faq: [
        { question: "Prin ce se distinge ID 204?", answer: "Prin interiorul luminos, clasa Premium și vederea în direcția Dendrariului." },
        { question: "Care este prețul pe noapte?", answer: "1100 MDL pe noapte." },
      ],
    },
    "205": {
      address: "Strada Mitropolit Varlaam 50, Chișinău",
      title: "Apartament într-o clădire cu două niveluri — ID 205",
      description: "Apartament separat Confort într-o clădire cu două niveluri pe Strada Mitropolit Varlaam 50. Interior nou, 1200 MDL pe noapte.",
      shortDescription: "Apartament separat cu interior nou, într-o clădire cu două niveluri împărțită în apartamente individuale.",
      aboutTitle: "Apartament separat pe Strada Mitropolit Varlaam 50",
      typeLabel: "Apartament separat",
      view: "Apartament separat într-o clădire cu două niveluri",
      features: ["Confort", "Apartament separat", "Clădire cu două niveluri", "Interior modern nou", "Pregătit pentru închiriere zilnică"],
      descriptionParagraphs: [
        "ID 205 se află într-o clădire cu două niveluri, împărțită în apartamente individuale. Nu este un apartament obișnuit într-un bloc înalt.",
        "Interiorul este nou și modern, iar spațiul este pregătit pentru șederi zilnice. Prețul este de 1200 MDL pe noapte.",
      ],
      audienceItems: ["Pentru cupluri", "Pentru șederi scurte sau mai lungi", "Pentru oaspeții care preferă o clădire joasă"],
      faq: [
        { question: "În ce tip de clădire se află ID 205?", answer: "Într-o clădire cu două niveluri, împărțită în apartamente separate." },
        { question: "Este într-un bloc cu multe etaje?", answer: "Nu. Este un apartament separat într-o clădire joasă." },
      ],
    },
  },
  en: {
    "200": {
      address: "Doina și Ion Aldea-Teodorovici 10/3",
      title: "One-room apartment in Buiucani — ID 200",
      description: "Modern one-room apartment at Doina și Ion Aldea-Teodorovici 10/3 in Buiucani, with a good contemporary renovation. Suitable for up to 4 guests.",
      shortDescription: "Modern one-room apartment in Buiucani with a good contemporary renovation for a comfortable stay of up to 4 guests.",
      aboutTitle: "One-room apartment in Buiucani · ID 200",
      typeLabel: "One-room apartment",
      view: "Buiucani",
      features: ["One-room apartment", "Good contemporary renovation", "Up to 4 guests", "4 sleeping places", "Buiucani"],
      descriptionParagraphs: [
        "ID 200 is a modern one-room apartment at Doina și Ion Aldea-Teodorovici 10/3 in the Buiucani district.",
        "The apartment has a good contemporary renovation, accommodates up to 4 guests and provides 4 sleeping places without claiming an unconfirmed bed configuration.",
      ],
      audienceItems: ["For one to four guests", "For a comfortable stay in Buiucani"],
      faq: [
        { question: "Which district is apartment ID 200 in?", answer: "The apartment is in Buiucani at Doina și Ion Aldea-Teodorovici 10/3." },
        { question: "How many guests can stay?", answer: "Up to four guests, with 4 sleeping places available." },
      ],
    },
    "201": {
      address: "15 Coca Street, Chisinau",
      title: "Comfort studio at 15 Coca Street — ID 201",
      description: "Comfort studio at 15 Coca Street with a courtyard view, air conditioning, Wi‑Fi, roller shutters and kitchenette. 900 MDL per night.",
      shortDescription: "Freshly renovated studio with a quiet courtyard view and practical short-stay amenities.",
      aboutTitle: "Quiet Comfort studio at 15 Coca Street",
      typeLabel: "Comfort studio",
      view: "Courtyard view",
      features: ["Comfort", "Modern renovation", "Air conditioning", "Wi‑Fi", "Roller shutters", "Kitchenette", "Television", "Courtyard view"],
      descriptionParagraphs: [
        "ID 201 is a freshly renovated studio prepared for daily stays. Its windows face the courtyard, making it a practical choice for guests who prefer a calmer outlook.",
        "Confirmed amenities include air conditioning, Wi‑Fi, roller shutters, a kitchenette and a regular television. The rate is 900 MDL per night.",
      ],
      audienceItems: ["Solo guests or couples", "Short city stays", "Guests who prefer a courtyard view"],
      faq: [
        { question: "Which way do the windows in ID 201 face?", answer: "The windows face the courtyard." },
        { question: "What television is available in ID 201?", answer: "The studio has a regular television." },
      ],
    },
    "202": {
      address: "15 Coca Street, Chisinau",
      title: "Studio facing Dendrarium — ID 202",
      description: "Comfort studio at 15 Coca Street facing Dendrarium, with Smart TV, air conditioning, Wi‑Fi and a kitchenette. 1000 MDL per night.",
      shortDescription: "Modern Comfort studio with a view in the direction of Dendrarium Park.",
      aboutTitle: "Comfort studio near Dendrarium",
      typeLabel: "Comfort studio",
      view: "View towards Dendrarium",
      features: ["Comfort", "Modern renovation", "Air conditioning", "Smart TV", "Wi‑Fi", "Roller shutters", "Kitchenette", "View towards Dendrarium"],
      descriptionParagraphs: [
        "ID 202 is a freshly finished studio at 15 Coca Street, with windows facing the green area of Dendrarium Park.",
        "Confirmed amenities include air conditioning, Smart TV, Wi‑Fi, roller shutters and a kitchenette. The rate is 1000 MDL per night.",
      ],
      audienceItems: ["Solo guests or couples", "Stays near Dendrarium", "Business trips"],
      nearbyItems: ["Dendrarium Park — in the direction of the window view"],
      faq: [
        { question: "What is the view from ID 202?", answer: "The windows face in the direction of Dendrarium Park." },
        { question: "Is there a Smart TV?", answer: "Yes, Smart TV is a confirmed amenity." },
      ],
    },
    "203": {
      address: "15 Coca Street, Chisinau",
      title: "Premium studio near Dendrarium — ID 203",
      description: "Premium studio at 15 Coca Street with a modern interior, view towards Dendrarium, Smart TV, Wi‑Fi and air conditioning. 1100 MDL.",
      shortDescription: "Distinctive Premium studio with a cohesive modern interior and a view towards Dendrarium.",
      aboutTitle: "Premium studio ID 203 at 15 Coca Street",
      typeLabel: "Premium studio",
      view: "View towards Dendrarium",
      features: ["Premium", "Modern renovation", "Air conditioning", "Smart TV", "Wi‑Fi", "Roller shutters", "Kitchenette", "View towards Dendrarium"],
      descriptionParagraphs: [
        "ID 203 stands out with its bold contemporary interior and Premium classification. The windows face in the direction of Dendrarium Park.",
        "The studio has air conditioning, Smart TV, Wi‑Fi, roller shutters and a kitchenette. The rate is 1100 MDL per night.",
      ],
      audienceItems: ["Couples", "Guests choosing Premium comfort", "Stays near Dendrarium"],
      nearbyItems: ["Dendrarium Park — in the direction of the window view"],
      faq: [
        { question: "Which category is ID 203?", answer: "It is a Premium studio." },
        { question: "What is the window view?", answer: "The windows face in the direction of Dendrarium Park." },
      ],
    },
    "204": {
      address: "15 Coca Street, Chisinau",
      title: "Bright Premium studio near Dendrarium — ID 204",
      description: "Bright Premium studio at 15 Coca Street with a view towards Dendrarium, air conditioning, Smart TV, Wi‑Fi and a kitchenette. 1100 MDL.",
      shortDescription: "Bright Premium studio with calm finishes and a view towards Dendrarium.",
      aboutTitle: "Bright Premium studio ID 204",
      typeLabel: "Premium studio",
      view: "View towards Dendrarium",
      features: ["Premium", "Modern renovation", "Air conditioning", "Smart TV", "Wi‑Fi", "Roller shutters", "Kitchenette", "View towards Dendrarium"],
      descriptionParagraphs: [
        "ID 204 is a bright Premium studio with a restrained modern interior. Its windows face in the direction of Dendrarium Park.",
        "Amenities include air conditioning, Smart TV, Wi‑Fi, roller shutters and a kitchenette. The rate is 1100 MDL per night.",
      ],
      audienceItems: ["Couples", "Quiet city stays", "Guests choosing Premium comfort"],
      nearbyItems: ["Dendrarium Park — in the direction of the window view"],
      faq: [
        { question: "What sets ID 204 apart?", answer: "Its bright interior, Premium category and view towards Dendrarium." },
        { question: "What is the nightly rate?", answer: "1100 MDL per night." },
      ],
    },
    "205": {
      address: "50 Mitropolit Varlaam Street, Chisinau",
      title: "Apartment in a two-storey property — ID 205",
      description: "Separate Comfort apartment in a two-storey property at 50 Mitropolit Varlaam Street. New interior, 1200 MDL per night.",
      shortDescription: "Separate apartment with a new interior in a two-storey property divided into individual apartments.",
      aboutTitle: "Separate apartment at 50 Mitropolit Varlaam Street",
      typeLabel: "Separate apartment",
      view: "Separate apartment in a two-storey property",
      features: ["Comfort", "Separate apartment", "Two-storey property", "New modern interior", "Prepared for daily stays"],
      descriptionParagraphs: [
        "ID 205 is in a two-storey property divided into individual apartments. It is not a conventional apartment in a high-rise block.",
        "The interior is new and contemporary, and the property is prepared for daily stays. The rate is 1200 MDL per night.",
      ],
      audienceItems: ["Couples", "Short or extended stays", "Guests who prefer a low-rise property"],
      faq: [
        { question: "What type of building contains ID 205?", answer: "A two-storey property divided into separate apartments." },
        { question: "Is it in a high-rise apartment block?", answer: "No. It is a separate apartment in a low-rise property." },
      ],
    },
  },
  uk: {
    "200": {
      address: "Doina și Ion Aldea-Teodorovici 10/3",
      title: "Однокімнатна квартира на Буюканах — ID 200",
      description: "Сучасна однокімнатна квартира за адресою Doina și Ion Aldea-Teodorovici 10/3 на Буюканах із хорошим євроремонтом. Для розміщення до 4 гостей.",
      shortDescription: "Сучасна однокімнатна квартира на Буюканах із хорошим євроремонтом для комфортного проживання до 4 гостей.",
      aboutTitle: "Однокімнатна квартира на Буюканах · ID 200",
      typeLabel: "Однокімнатна квартира",
      view: "Буюкани",
      features: ["Однокімнатна квартира", "Сучасний євроремонт", "До 4 гостей", "4 спальних місця", "Буюкани"],
      descriptionParagraphs: [
        "ID 200 — сучасна однокімнатна квартира за адресою Doina și Ion Aldea-Teodorovici 10/3 у районі Буюкани.",
        "У квартирі виконано хороший сучасний євроремонт. Вона розрахована на розміщення до 4 гостей і має 4 спальних місця без зазначення непідтвердженої конфігурації.",
      ],
      audienceItems: ["Для одного–чотирьох гостей", "Для комфортного проживання на Буюканах"],
      faq: [
        { question: "У якому районі розташована квартира ID 200?", answer: "Квартира розташована на Буюканах за адресою Doina și Ion Aldea-Teodorovici 10/3." },
        { question: "Скільки гостей може розміститися?", answer: "До чотирьох гостей; передбачено 4 спальних місця." },
      ],
    },
    "201": {
      address: "вул. Кока, 15 · Кишинів",
      title: "Студія Комфорт на вул. Кока, 15 — ID 201",
      description: "Студія Комфорт на вул. Кока, 15 з видом у двір, кондиціонером, Wi‑Fi, ролетами та міні-кухнею. 900 MDL за добу.",
      shortDescription: "Оновлена студія зі спокійним видом у двір і практичним оснащенням для подобового проживання.",
      aboutTitle: "Тиха студія Комфорт на вул. Кока, 15",
      typeLabel: "Студія Комфорт",
      view: "Вид у двір",
      features: ["Комфорт", "Сучасний євроремонт", "Кондиціонер", "Wi‑Fi", "Ролети", "Міні-кухня", "Телевізор", "Вид у двір"],
      descriptionParagraphs: [
        "ID 201 — студія після свіжого сучасного ремонту, підготовлена для подобового проживання. Вікна виходять у двір.",
        "Підтверджене оснащення: кондиціонер, Wi‑Fi, ролети, міні-кухня та звичайний телевізор. Ціна — 900 MDL за добу.",
      ],
      audienceItems: ["Для одного гостя або пари", "Для коротких поїздок", "Для гостей, яким важливий спокійний вид"],
      faq: [
        { question: "Куди виходять вікна ID 201?", answer: "Вікна виходять у двір." },
        { question: "Який телевізор встановлено в ID 201?", answer: "У студії встановлено звичайний телевізор." },
      ],
    },
    "202": {
      address: "вул. Кока, 15 · Кишинів",
      title: "Студія з видом у бік Дендрарію — ID 202",
      description: "Студія Комфорт на вул. Кока, 15 з видом у бік Дендрарію, Smart TV, кондиціонером, Wi‑Fi та міні-кухнею. 1000 MDL.",
      shortDescription: "Сучасна студія Комфорт з видом у напрямку Дендрарію.",
      aboutTitle: "Студія Комфорт біля Дендрарію",
      typeLabel: "Студія Комфорт",
      view: "Вид у напрямку Дендрарію",
      features: ["Комфорт", "Сучасний євроремонт", "Кондиціонер", "Smart TV", "Wi‑Fi", "Ролети", "Міні-кухня", "Вид у бік Дендрарію"],
      descriptionParagraphs: [
        "ID 202 — оновлена студія на вул. Кока, 15, вікна якої орієнтовані в бік зеленої території Дендрарію.",
        "Підтверджене оснащення включає кондиціонер, Smart TV, Wi‑Fi, ролети та міні-кухню. Ціна — 1000 MDL за добу.",
      ],
      audienceItems: ["Для одного гостя або пари", "Для проживання біля Дендрарію", "Для ділових поїздок"],
      nearbyItems: ["Дендрарій — у напрямку виду з вікна"],
      faq: [
        { question: "Який вид має ID 202?", answer: "Вікна орієнтовані в напрямку Дендрарію." },
        { question: "Чи є Smart TV?", answer: "Так, Smart TV входить до підтвердженого оснащення." },
      ],
    },
    "203": {
      address: "вул. Кока, 15 · Кишинів",
      title: "Преміум-студія біля Дендрарію — ID 203",
      description: "Преміум-студія на вул. Кока, 15 із сучасним інтер’єром, видом у бік Дендрарію, Smart TV, Wi‑Fi та кондиціонером. 1100 MDL.",
      shortDescription: "Виразна Преміум-студія з цілісним сучасним інтер’єром і видом у бік Дендрарію.",
      aboutTitle: "Преміум-студія ID 203 на вул. Кока, 15",
      typeLabel: "Студія Преміум",
      view: "Вид у напрямку Дендрарію",
      features: ["Преміум", "Сучасний євроремонт", "Кондиціонер", "Smart TV", "Wi‑Fi", "Ролети", "Міні-кухня", "Вид у бік Дендрарію"],
      descriptionParagraphs: [
        "ID 203 вирізняється контрастним сучасним інтер’єром і належить до категорії Преміум. Вікна орієнтовані в бік Дендрарію.",
        "У студії є кондиціонер, Smart TV, Wi‑Fi, ролети та міні-кухня. Ціна — 1100 MDL за добу.",
      ],
      audienceItems: ["Для пар", "Для гостей, які обирають Преміум", "Для проживання біля Дендрарію"],
      nearbyItems: ["Дендрарій — у напрямку виду з вікна"],
      faq: [
        { question: "До якої категорії належить ID 203?", answer: "Це студія категорії Преміум." },
        { question: "Який вид із вікна?", answer: "Вікна орієнтовані в напрямку Дендрарію." },
      ],
    },
    "204": {
      address: "вул. Кока, 15 · Кишинів",
      title: "Світла Преміум-студія біля Дендрарію — ID 204",
      description: "Світла студія Преміум на вул. Кока, 15 з видом у бік Дендрарію, кондиціонером, Smart TV, Wi‑Fi та міні-кухнею. 1100 MDL.",
      shortDescription: "Світла Преміум-студія зі спокійним оздобленням і видом у бік Дендрарію.",
      aboutTitle: "Світла Преміум-студія ID 204",
      typeLabel: "Студія Преміум",
      view: "Вид у напрямку Дендрарію",
      features: ["Преміум", "Сучасний євроремонт", "Кондиціонер", "Smart TV", "Wi‑Fi", "Ролети", "Міні-кухня", "Вид у бік Дендрарію"],
      descriptionParagraphs: [
        "ID 204 — світла студія Преміум зі стриманим сучасним інтер’єром. Вікна орієнтовані в бік Дендрарію.",
        "Оснащення включає кондиціонер, Smart TV, Wi‑Fi, ролети та міні-кухню. Ціна — 1100 MDL за добу.",
      ],
      audienceItems: ["Для пар", "Для спокійного відпочинку", "Для гостей, які обирають Преміум"],
      nearbyItems: ["Дендрарій — у напрямку виду з вікна"],
      faq: [
        { question: "Чим вирізняється ID 204?", answer: "Світлим інтер’єром, категорією Преміум і видом у бік Дендрарію." },
        { question: "Яка ціна за добу?", answer: "1100 MDL за добу." },
      ],
    },
    "205": {
      address: "вул. Митрополит Варлаам, 50 · Кишинів",
      title: "Апартамент у двоповерховій будівлі — ID 205",
      description: "Окремий апартамент Комфорт у двоповерховій будівлі на вул. Митрополит Варлаам, 50. Новий інтер’єр, 1200 MDL за добу.",
      shortDescription: "Окремий апартамент із новим інтер’єром у двоповерховій будівлі, поділеній на самостійні апартаменти.",
      aboutTitle: "Окремий апартамент на вул. Митрополит Варлаам, 50",
      typeLabel: "Окремий апартамент",
      view: "Окремий апартамент у двоповерховій будівлі",
      features: ["Комфорт", "Окремий апартамент", "Двоповерхова будівля", "Новий сучасний інтер’єр", "Підготовлений для подобового проживання"],
      descriptionParagraphs: [
        "ID 205 розташований у двоповерховій будівлі, поділеній на самостійні апартаменти. Це не звичайна квартира у багатоповерховому будинку.",
        "Усередині виконано новий сучасний інтер’єр, об’єкт підготовлений для подобового проживання. Ціна — 1200 MDL за добу.",
      ],
      audienceItems: ["Для пар", "Для короткого або тривалого проживання", "Для гостей, які надають перевагу малоповерховому об’єкту"],
      faq: [
        { question: "У якій будівлі розташований ID 205?", answer: "У двоповерховій будівлі, поділеній на окремі апартаменти." },
        { question: "Це квартира у багатоповерхівці?", answer: "Ні, це окремий апартамент у малоповерховому об’єкті." },
      ],
    },
  },
  cs: {
    "200": {
      address: "Doina și Ion Aldea-Teodorovici 10/3",
      title: "Jednopokojový apartmán v Buiucani — ID 200",
      description: "Moderní jednopokojový apartmán na adrese Doina și Ion Aldea-Teodorovici 10/3 v Buiucani s kvalitní moderní rekonstrukcí. Až pro 4 hosty.",
      shortDescription: "Moderní jednopokojový apartmán v Buiucani s kvalitní rekonstrukcí pro pohodlný pobyt až 4 hostů.",
      aboutTitle: "Jednopokojový apartmán v Buiucani · ID 200",
      typeLabel: "Jednopokojový apartmán",
      view: "Buiucani",
      features: ["Jednopokojový apartmán", "Kvalitní moderní rekonstrukce", "Až 4 hosté", "4 místa na spaní", "Buiucani"],
      descriptionParagraphs: [
        "ID 200 je moderní jednopokojový apartmán na adrese Doina și Ion Aldea-Teodorovici 10/3 ve čtvrti Buiucani.",
        "Apartmán má kvalitní moderní rekonstrukci, ubytuje až 4 hosty a nabízí 4 místa na spaní bez uvádění nepotvrzeného uspořádání lůžek.",
      ],
      audienceItems: ["Pro jednoho až čtyři hosty", "Pro pohodlný pobyt v Buiucani"],
      faq: [
        { question: "Ve které čtvrti se apartmán ID 200 nachází?", answer: "Apartmán se nachází v Buiucani na adrese Doina și Ion Aldea-Teodorovici 10/3." },
        { question: "Kolik hostů se může ubytovat?", answer: "Až čtyři hosté; k dispozici jsou 4 místa na spaní." },
      ],
    },
    "201": {
      address: "ulice Coca 15, Kišiněv",
      title: "Komfortní studio v ulici Coca 15 — ID 201",
      description: "Komfortní studio v ulici Coca 15 s výhledem do dvora, klimatizací, Wi‑Fi, roletami a kuchyňským koutem. 900 MDL za noc.",
      shortDescription: "Čerstvě renovované studio s klidným výhledem do dvora a praktickým vybavením.",
      aboutTitle: "Klidné komfortní studio v ulici Coca 15",
      typeLabel: "Komfortní studio",
      view: "Výhled do dvora",
      features: ["Komfortní", "Moderní rekonstrukce", "Klimatizace", "Wi‑Fi", "Rolety", "Kuchyňský kout", "Televize", "Výhled do dvora"],
      descriptionParagraphs: [
        "ID 201 je čerstvě renovované studio připravené pro krátkodobé pobyty. Okna směřují do dvora.",
        "Potvrzené vybavení zahrnuje klimatizaci, Wi‑Fi, rolety, kuchyňský kout a běžnou televizi. Cena je 900 MDL za noc.",
      ],
      audienceItems: ["Pro jednotlivce nebo pár", "Pro krátké pobyty", "Pro hosty, kteří preferují výhled do dvora"],
      faq: [
        { question: "Kam směřují okna studia ID 201?", answer: "Okna směřují do dvora." },
        { question: "Jaká televize je v ID 201?", answer: "Ve studiu je běžná televize." },
      ],
    },
    "202": {
      address: "ulice Coca 15, Kišiněv",
      title: "Studio s výhledem směrem k Dendrariu — ID 202",
      description: "Komfortní studio v ulici Coca 15 s výhledem směrem k Dendrariu, Smart TV, klimatizací, Wi‑Fi a kuchyňským koutem. 1000 MDL.",
      shortDescription: "Moderní komfortní studio s výhledem směrem k parku Dendrarium.",
      aboutTitle: "Komfortní studio poblíž Dendraria",
      typeLabel: "Komfortní studio",
      view: "Výhled směrem k Dendrariu",
      features: ["Komfortní", "Moderní rekonstrukce", "Klimatizace", "Smart TV", "Wi‑Fi", "Rolety", "Kuchyňský kout", "Výhled k Dendrariu"],
      descriptionParagraphs: [
        "ID 202 je nově upravené studio v ulici Coca 15 s okny orientovanými k zelené ploše Dendraria.",
        "Potvrzené vybavení zahrnuje klimatizaci, Smart TV, Wi‑Fi, rolety a kuchyňský kout. Cena je 1000 MDL za noc.",
      ],
      audienceItems: ["Pro jednotlivce nebo pár", "Pro pobyt poblíž Dendraria", "Pro služební cesty"],
      nearbyItems: ["Dendrarium — ve směru výhledu z okna"],
      faq: [
        { question: "Jaký výhled má ID 202?", answer: "Okna jsou orientována směrem k Dendrariu." },
        { question: "Je k dispozici Smart TV?", answer: "Ano, Smart TV patří k potvrzenému vybavení." },
      ],
    },
    "203": {
      address: "ulice Coca 15, Kišiněv",
      title: "Prémiové studio poblíž Dendraria — ID 203",
      description: "Prémiové studio v ulici Coca 15 s moderním interiérem, výhledem směrem k Dendrariu, Smart TV, Wi‑Fi a klimatizací. 1100 MDL.",
      shortDescription: "Výrazné Prémiové studio s uceleným moderním interiérem a výhledem směrem k Dendrariu.",
      aboutTitle: "Prémiové studio ID 203 v ulici Coca 15",
      typeLabel: "Prémiové studio",
      view: "Výhled směrem k Dendrariu",
      features: ["Prémiové", "Moderní rekonstrukce", "Klimatizace", "Smart TV", "Wi‑Fi", "Rolety", "Kuchyňský kout", "Výhled k Dendrariu"],
      descriptionParagraphs: [
        "ID 203 zaujme kontrastním moderním interiérem a patří do prémiové kategorie. Okna směřují k Dendrariu.",
        "Studio má klimatizaci, Smart TV, Wi‑Fi, rolety a kuchyňský kout. Cena je 1100 MDL za noc.",
      ],
      audienceItems: ["Pro páry", "Pro hosty volící prémiovou kategorii", "Pro pobyt poblíž Dendraria"],
      nearbyItems: ["Dendrarium — ve směru výhledu z okna"],
      faq: [
        { question: "Do jaké kategorie patří ID 203?", answer: "Jde o studio prémiové kategorie." },
        { question: "Jaký je výhled z okna?", answer: "Okna jsou orientována směrem k Dendrariu." },
      ],
    },
    "204": {
      address: "ulice Coca 15, Kišiněv",
      title: "Světlé Prémiové studio poblíž Dendraria — ID 204",
      description: "Světlé Prémiové studio v ulici Coca 15 s výhledem směrem k Dendrariu, klimatizací, Smart TV, Wi‑Fi a kuchyňským koutem. 1100 MDL.",
      shortDescription: "Světlé Prémiové studio s klidným interiérem a výhledem směrem k Dendrariu.",
      aboutTitle: "Světlé Prémiové studio ID 204",
      typeLabel: "Prémiové studio",
      view: "Výhled směrem k Dendrariu",
      features: ["Prémiové", "Moderní rekonstrukce", "Klimatizace", "Smart TV", "Wi‑Fi", "Rolety", "Kuchyňský kout", "Výhled k Dendrariu"],
      descriptionParagraphs: [
        "ID 204 je světlé prémiové studio se střídmým moderním interiérem. Okna směřují k Dendrariu.",
        "K dispozici je klimatizace, Smart TV, Wi‑Fi, rolety a kuchyňský kout. Cena je 1100 MDL za noc.",
      ],
      audienceItems: ["Pro páry", "Pro klidný pobyt", "Pro hosty volící prémiovou kategorii"],
      nearbyItems: ["Dendrarium — ve směru výhledu z okna"],
      faq: [
        { question: "Čím se ID 204 liší?", answer: "Světlým interiérem, prémiovou kategorií a výhledem směrem k Dendrariu." },
        { question: "Jaká je cena za noc?", answer: "1100 MDL za noc." },
      ],
    },
    "205": {
      address: "ulice Mitropolit Varlaam 50, Kišiněv",
      title: "Apartmán ve dvoupodlažním objektu — ID 205",
      description: "Samostatný komfortní apartmán ve dvoupodlažním objektu v ulici Mitropolit Varlaam 50. Nový interiér, 1200 MDL za noc.",
      shortDescription: "Samostatný apartmán s novým interiérem ve dvoupodlažním objektu rozděleném na jednotlivé apartmány.",
      aboutTitle: "Samostatný apartmán v ulici Mitropolit Varlaam 50",
      typeLabel: "Samostatný apartmán",
      view: "Samostatný apartmán ve dvoupodlažním objektu",
      features: ["Komfortní", "Samostatný apartmán", "Dvoupodlažní objekt", "Nový moderní interiér", "Připraveno pro krátkodobé pobyty"],
      descriptionParagraphs: [
        "ID 205 se nachází ve dvoupodlažním objektu rozděleném na samostatné apartmány. Nejde o běžný byt ve výškovém domě.",
        "Interiér je nový a moderní a objekt je připraven pro krátkodobé pobyty. Cena je 1200 MDL za noc.",
      ],
      audienceItems: ["Pro páry", "Pro krátké i delší pobyty", "Pro hosty, kteří preferují nízkopodlažní objekt"],
      faq: [
        { question: "V jaké budově se ID 205 nachází?", answer: "Ve dvoupodlažním objektu rozděleném na samostatné apartmány." },
        { question: "Je to byt ve výškovém domě?", answer: "Ne. Jde o samostatný apartmán v nízkopodlažním objektu." },
      ],
    },
  },
};

export const newApartmentLocalizations: Record<
  string,
  Record<Language, LocalizedApartmentSeo>
> = Object.fromEntries(
  ["200", "201", "202", "203", "204", "205"].map((id) => [
    id,
    Object.fromEntries(
      (Object.keys(newApartmentCopy) as Language[]).map((language) => [
        language,
        localized(newApartmentCopy[language][id], id, language),
      ]),
    ) as Record<Language, LocalizedApartmentSeo>,
  ]),
);
