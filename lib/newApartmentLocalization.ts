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

const apartment15And16Copy: Record<
  Language,
  Record<"15" | "16", ApartmentCopy>
> = {
  ru: {
    "15": {
      address: "Измаил 31 · Кишинёв",
      title: "Однокомнатная квартира в ультрацентре — ID 15",
      description: "Однокомнатная квартира класса Комфорт по адресу Измаил 31 в ультрацентре Кишинёва. Современный дом со стеклянным фасадом, 3 спальных места и городская инфраструктура рядом.",
      shortDescription: "Квартира Комфорт в ультрацентре Кишинёва, в современном доме со стеклянным фасадом, для размещения до 3 гостей.",
      aboutTitle: "Квартира Комфорт в ультрацентре · ID 15",
      typeLabel: "Однокомнатная квартира",
      view: "Ультрацентр",
      features: ["Комфорт", "Однокомнатная квартира", "Ультрацентр", "Современный дом", "Стеклянный фасад", "До 3 гостей", "3 спальных места", "Отдельная кухня", "Стиральная машина"],
      descriptionParagraphs: [
        "ID 15 находится по адресу Измаил 31 в ультрацентре Кишинёва. Современный дом со стеклянным фасадом расположен рядом с ключевой городской инфраструктурой.",
        "Квартира рассчитана на размещение до 3 гостей и располагает 3 спальными местами. В галерее показаны интерьер и отдельный кадр фасада здания.",
      ],
      audienceItems: ["Для одного–трёх гостей", "Для проживания в ультрацентре", "Для деловых и туристических поездок"],
      nearbyItems: ["McDonald’s", "UNIC", "проспект Штефан чел Маре", "угол улицы Измаил", "центр города", "магазины, кафе и транспорт"],
      faq: [
        { question: "Где находится квартира ID 15?", answer: "По адресу Измаил 31, в ультрацентре Кишинёва." },
        { question: "Сколько спальных мест в квартире?", answer: "В квартире предусмотрено 3 спальных места для размещения до 3 гостей." },
      ],
    },
    "16": {
      address: "Алба Юлия 103 · Кишинёв",
      title: "Однокомнатная квартира в новострое — ID 16",
      description: "Однокомнатная квартира класса Комфорт в новострое по адресу Алба Юлия 103 в Кишинёве. Удобная городская локация, 3 спальных места и оснащение для посуточного проживания.",
      shortDescription: "Квартира Комфорт в новострое на Алба Юлия 103, в удобной городской локации, для размещения до 3 гостей.",
      aboutTitle: "Квартира Комфорт в новострое · ID 16",
      typeLabel: "Однокомнатная квартира",
      view: "Удобная городская локация",
      features: ["Комфорт", "Однокомнатная квартира", "Новострой", "До 3 гостей", "3 спальных места", "Отдельная кухня", "Телевизор", "Стиральная машина"],
      descriptionParagraphs: [
        "ID 16 — однокомнатная квартира в новострое по адресу Алба Юлия 103 в Кишинёве. Дом расположен в удобной городской локации.",
        "По фотографиям подтверждены отдельная кухня, ванная комната, телевизор, стиральная машина и 3 спальных места. Квартира рассчитана на размещение до 3 гостей.",
      ],
      audienceItems: ["Для одного–трёх гостей", "Для кратких и более длительных поездок", "Для гостей, которым важна удобная городская локация"],
      faq: [
        { question: "В каком доме находится квартира ID 16?", answer: "Квартира находится в новострое по адресу Алба Юлия 103." },
        { question: "Сколько гостей можно разместить?", answer: "До 3 гостей; предусмотрено 3 спальных места." },
      ],
    },
  },
  ro: {
    "15": {
      address: "Strada Ismail 31 · Chișinău",
      title: "Apartament cu o cameră în ultracentru — ID 15",
      description: "Apartament cu o cameră din categoria Confort, pe Strada Ismail 31, în ultracentrul Chișinăului. Clădire modernă cu fațadă din sticlă, 3 locuri de dormit și infrastructură urbană în apropiere.",
      shortDescription: "Apartament Confort în ultracentrul Chișinăului, într-o clădire modernă cu fațadă din sticlă, pentru până la 3 oaspeți.",
      aboutTitle: "Apartament Confort în ultracentru · ID 15",
      typeLabel: "Apartament cu o cameră",
      view: "Ultracentru",
      features: ["Confort", "Apartament cu o cameră", "Ultracentru", "Clădire modernă", "Fațadă din sticlă", "Până la 3 oaspeți", "3 locuri de dormit", "Bucătărie separată", "Mașină de spălat"],
      descriptionParagraphs: [
        "ID 15 se află pe Strada Ismail 31, în ultracentrul Chișinăului. Clădirea modernă cu fațadă din sticlă este aproape de infrastructura importantă a orașului.",
        "Apartamentul poate găzdui până la 3 oaspeți și oferă 3 locuri de dormit. Galeria include interioarele și o fotografie separată a fațadei.",
      ],
      audienceItems: ["Pentru unul până la trei oaspeți", "Pentru un sejur în ultracentru", "Pentru călătorii de afaceri și turistice"],
      nearbyItems: ["McDonald’s", "UNIC", "bulevardul Ștefan cel Mare", "intersecția cu Strada Ismail", "centrul orașului", "magazine, cafenele și transport public"],
      faq: [
        { question: "Unde se află apartamentul ID 15?", answer: "Pe Strada Ismail 31, în ultracentrul Chișinăului." },
        { question: "Câte locuri de dormit sunt disponibile?", answer: "Sunt disponibile 3 locuri de dormit pentru până la 3 oaspeți." },
      ],
    },
    "16": {
      address: "Strada Alba Iulia 103 · Chișinău",
      title: "Apartament cu o cameră într-un bloc nou — ID 16",
      description: "Apartament cu o cameră din categoria Confort, într-un bloc nou de pe Strada Alba Iulia 103, Chișinău. Amplasare urbană comodă, 3 locuri de dormit și dotări pentru cazare pe termen scurt.",
      shortDescription: "Apartament Confort într-un bloc nou pe Strada Alba Iulia 103, într-o zonă urbană comodă, pentru până la 3 oaspeți.",
      aboutTitle: "Apartament Confort într-un bloc nou · ID 16",
      typeLabel: "Apartament cu o cameră",
      view: "Amplasare urbană comodă",
      features: ["Confort", "Apartament cu o cameră", "Bloc nou", "Până la 3 oaspeți", "3 locuri de dormit", "Bucătărie separată", "Televizor", "Mașină de spălat"],
      descriptionParagraphs: [
        "ID 16 este un apartament cu o cameră într-un bloc nou de pe Strada Alba Iulia 103 din Chișinău. Clădirea are o amplasare urbană comodă.",
        "Fotografiile confirmă bucătăria separată, baia, televizorul, mașina de spălat și 3 locuri de dormit. Apartamentul poate găzdui până la 3 oaspeți.",
      ],
      audienceItems: ["Pentru unul până la trei oaspeți", "Pentru sejururi scurte sau mai lungi", "Pentru oaspeții care apreciază o amplasare urbană comodă"],
      faq: [
        { question: "În ce tip de clădire se află ID 16?", answer: "Apartamentul se află într-un bloc nou pe Strada Alba Iulia 103." },
        { question: "Câți oaspeți pot fi cazați?", answer: "Până la 3 oaspeți; sunt disponibile 3 locuri de dormit." },
      ],
    },
  },
  en: {
    "15": {
      address: "31 Ismail Street · Chisinau",
      title: "One-room apartment in the city centre — ID 15",
      description: "Comfort-class one-room apartment at 31 Ismail Street in central Chisinau. Modern glass-fronted building, 3 sleeping places and city amenities nearby.",
      shortDescription: "Comfort apartment in central Chisinau, in a modern glass-fronted building, for up to 3 guests.",
      aboutTitle: "Comfort apartment in central Chisinau · ID 15",
      typeLabel: "One-room apartment",
      view: "Central Chisinau",
      features: ["Comfort", "One-room apartment", "Central Chisinau", "Modern building", "Glass facade", "Up to 3 guests", "3 sleeping places", "Separate kitchen", "Washing machine"],
      descriptionParagraphs: [
        "ID 15 is located at 31 Ismail Street in central Chisinau. The modern glass-fronted building is close to key city amenities.",
        "The apartment accommodates up to 3 guests and provides 3 sleeping places. The gallery includes the interior and a separate facade photograph.",
      ],
      audienceItems: ["For one to three guests", "For a stay in central Chisinau", "For business and leisure trips"],
      nearbyItems: ["McDonald’s", "UNIC", "Stefan cel Mare Boulevard", "the corner of Ismail Street", "the city centre", "shops, cafés and public transport"],
      faq: [
        { question: "Where is apartment ID 15?", answer: "At 31 Ismail Street in central Chisinau." },
        { question: "How many sleeping places are available?", answer: "There are 3 sleeping places for up to 3 guests." },
      ],
    },
    "16": {
      address: "103 Alba Iulia Street · Chisinau",
      title: "One-room apartment in a new building — ID 16",
      description: "Comfort-class one-room apartment in a new building at 103 Alba Iulia Street, Chisinau. Convenient urban location, 3 sleeping places and practical amenities for short stays.",
      shortDescription: "Comfort apartment in a new building at 103 Alba Iulia Street, in a convenient urban location, for up to 3 guests.",
      aboutTitle: "Comfort apartment in a new building · ID 16",
      typeLabel: "One-room apartment",
      view: "Convenient urban location",
      features: ["Comfort", "One-room apartment", "New building", "Up to 3 guests", "3 sleeping places", "Separate kitchen", "Television", "Washing machine"],
      descriptionParagraphs: [
        "ID 16 is a one-room apartment in a new building at 103 Alba Iulia Street in Chisinau. The building has a convenient urban location.",
        "The photographs confirm a separate kitchen, bathroom, television, washing machine and 3 sleeping places. The apartment accommodates up to 3 guests.",
      ],
      audienceItems: ["For one to three guests", "For short or longer stays", "For guests who value a convenient urban location"],
      faq: [
        { question: "What type of building contains ID 16?", answer: "The apartment is in a new building at 103 Alba Iulia Street." },
        { question: "How many guests can stay?", answer: "Up to 3 guests; 3 sleeping places are available." },
      ],
    },
  },
  uk: {
    "15": {
      address: "вул. Ізмаїл, 31 · Кишинів",
      title: "Однокімнатна квартира в ультрацентрі — ID 15",
      description: "Однокімнатна квартира класу Комфорт на вул. Ізмаїл, 31 в ультрацентрі Кишинева. Сучасний будинок зі скляним фасадом, 3 спальні місця та міська інфраструктура поруч.",
      shortDescription: "Квартира Комфорт в ультрацентрі Кишинева, у сучасному будинку зі скляним фасадом, для розміщення до 3 гостей.",
      aboutTitle: "Квартира Комфорт в ультрацентрі · ID 15",
      typeLabel: "Однокімнатна квартира",
      view: "Ультрацентр",
      features: ["Комфорт", "Однокімнатна квартира", "Ультрацентр", "Сучасний будинок", "Скляний фасад", "До 3 гостей", "3 спальні місця", "Окрема кухня", "Пральна машина"],
      descriptionParagraphs: [
        "ID 15 розташована на вул. Ізмаїл, 31 в ультрацентрі Кишинева. Сучасний будинок зі скляним фасадом знаходиться поруч із важливою міською інфраструктурою.",
        "Квартира розрахована на розміщення до 3 гостей і має 3 спальні місця. У галереї показано інтер’єр та окреме фото фасаду будинку.",
      ],
      audienceItems: ["Для одного–трьох гостей", "Для проживання в ультрацентрі", "Для ділових і туристичних поїздок"],
      nearbyItems: ["McDonald’s", "UNIC", "проспект Штефана чел Маре", "ріг вулиці Ізмаїл", "центр міста", "магазини, кафе та громадський транспорт"],
      faq: [
        { question: "Де розташована квартира ID 15?", answer: "На вул. Ізмаїл, 31 в ультрацентрі Кишинева." },
        { question: "Скільки спальних місць доступно?", answer: "Передбачено 3 спальні місця для розміщення до 3 гостей." },
      ],
    },
    "16": {
      address: "вул. Алба-Юлія, 103 · Кишинів",
      title: "Однокімнатна квартира в новобудові — ID 16",
      description: "Однокімнатна квартира класу Комфорт у новобудові на вул. Алба-Юлія, 103 в Кишиневі. Зручна міська локація, 3 спальні місця та оснащення для подобового проживання.",
      shortDescription: "Квартира Комфорт у новобудові на вул. Алба-Юлія, 103, у зручній міській локації, для розміщення до 3 гостей.",
      aboutTitle: "Квартира Комфорт у новобудові · ID 16",
      typeLabel: "Однокімнатна квартира",
      view: "Зручна міська локація",
      features: ["Комфорт", "Однокімнатна квартира", "Новобудова", "До 3 гостей", "3 спальні місця", "Окрема кухня", "Телевізор", "Пральна машина"],
      descriptionParagraphs: [
        "ID 16 — однокімнатна квартира в новобудові на вул. Алба-Юлія, 103 в Кишиневі. Будинок має зручне міське розташування.",
        "Фотографії підтверджують окрему кухню, ванну кімнату, телевізор, пральну машину та 3 спальні місця. Квартира розрахована на розміщення до 3 гостей.",
      ],
      audienceItems: ["Для одного–трьох гостей", "Для коротких або триваліших поїздок", "Для гостей, яким важлива зручна міська локація"],
      faq: [
        { question: "У якому будинку розташована квартира ID 16?", answer: "Квартира розташована в новобудові на вул. Алба-Юлія, 103." },
        { question: "Скільки гостей можна розмістити?", answer: "До 3 гостей; передбачено 3 спальні місця." },
      ],
    },
  },
  cs: {
    "15": {
      address: "ulice Ismail 31 · Kišiněv",
      title: "Jednopokojový apartmán v centru — ID 15",
      description: "Jednopokojový apartmán kategorie Komfortní v ulici Ismail 31 v centru Kišiněva. Moderní budova se skleněnou fasádou, 3 místa na spaní a městská infrastruktura v okolí.",
      shortDescription: "Komfortní apartmán v centru Kišiněva, v moderní budově se skleněnou fasádou, až pro 3 hosty.",
      aboutTitle: "Komfortní apartmán v centru · ID 15",
      typeLabel: "Jednopokojový apartmán",
      view: "Centrum Kišiněva",
      features: ["Komfortní", "Jednopokojový apartmán", "Centrum Kišiněva", "Moderní budova", "Skleněná fasáda", "Až 3 hosté", "3 místa na spaní", "Samostatná kuchyně", "Pračka"],
      descriptionParagraphs: [
        "ID 15 se nachází v ulici Ismail 31 v centru Kišiněva. Moderní budova se skleněnou fasádou stojí poblíž důležité městské infrastruktury.",
        "Apartmán ubytuje až 3 hosty a nabízí 3 místa na spaní. Galerie zahrnuje interiér a samostatnou fotografii fasády.",
      ],
      audienceItems: ["Pro jednoho až tři hosty", "Pro pobyt v centru", "Pro služební i turistické cesty"],
      nearbyItems: ["McDonald’s", "UNIC", "bulvár Ștefan cel Mare", "nároží ulice Ismail", "centrum města", "obchody, kavárny a veřejná doprava"],
      faq: [
        { question: "Kde se apartmán ID 15 nachází?", answer: "V ulici Ismail 31 v centru Kišiněva." },
        { question: "Kolik míst na spaní je k dispozici?", answer: "K dispozici jsou 3 místa na spaní až pro 3 hosty." },
      ],
    },
    "16": {
      address: "ulice Alba Iulia 103 · Kišiněv",
      title: "Jednopokojový apartmán v novostavbě — ID 16",
      description: "Jednopokojový apartmán kategorie Komfortní v novostavbě v ulici Alba Iulia 103 v Kišiněvě. Výhodná městská poloha, 3 místa na spaní a praktické vybavení pro krátkodobé pobyty.",
      shortDescription: "Komfortní apartmán v novostavbě v ulici Alba Iulia 103, ve výhodné městské lokalitě, až pro 3 hosty.",
      aboutTitle: "Komfortní apartmán v novostavbě · ID 16",
      typeLabel: "Jednopokojový apartmán",
      view: "Výhodná městská poloha",
      features: ["Komfortní", "Jednopokojový apartmán", "Novostavba", "Až 3 hosté", "3 místa na spaní", "Samostatná kuchyně", "Televize", "Pračka"],
      descriptionParagraphs: [
        "ID 16 je jednopokojový apartmán v novostavbě v ulici Alba Iulia 103 v Kišiněvě. Budova má výhodnou městskou polohu.",
        "Fotografie potvrzují samostatnou kuchyni, koupelnu, televizi, pračku a 3 místa na spaní. Apartmán ubytuje až 3 hosty.",
      ],
      audienceItems: ["Pro jednoho až tři hosty", "Pro krátké i delší pobyty", "Pro hosty, kteří oceňují výhodnou městskou polohu"],
      faq: [
        { question: "V jakém domě se ID 16 nachází?", answer: "Apartmán se nachází v novostavbě v ulici Alba Iulia 103." },
        { question: "Kolik hostů se může ubytovat?", answer: "Až 3 hosté; k dispozici jsou 3 místa na spaní." },
      ],
    },
  },
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
  { coca: string; varlaam: string; izmail31: string }
> = {
  ru: {
    coca: "Фасад здания на ул. Кока, 15 в Кишинёве",
    varlaam: "Фасад двухэтажного здания на ул. Митрополит Варлаам, 50 в Кишинёве",
    izmail31: "Стеклянный фасад современного дома на улице Измаил 31 в Кишинёве",
  },
  ro: {
    coca: "Fațada clădirii Coca 15 din Chișinău",
    varlaam: "Fațada clădirii cu două niveluri de pe Strada Mitropolit Varlaam 50, Chișinău",
    izmail31: "Fațada din sticlă a clădirii moderne de pe Strada Ismail 31, Chișinău",
  },
  en: {
    coca: "Facade of the Coca 15 building in Chisinau",
    varlaam: "Facade of the two-storey property at 50 Mitropolit Varlaam Street, Chisinau",
    izmail31: "Glass facade of the modern building at 31 Ismail Street, Chisinau",
  },
  uk: {
    coca: "Фасад будівлі на вул. Кока, 15 у Кишиневі",
    varlaam: "Фасад двоповерхової будівлі на вул. Митрополит Варлаам, 50 у Кишиневі",
    izmail31: "Скляний фасад сучасного будинку на вул. Ізмаїл, 31 у Кишиневі",
  },
  cs: {
    coca: "Fasáda budovy Coca 15 v Kišiněvě",
    varlaam: "Fasáda dvoupodlažního objektu v ulici Mitropolit Varlaam 50 v Kišiněvě",
    izmail31: "Skleněná fasáda moderní budovy v ulici Ismail 31 v Kišiněvě",
  },
};

const facadeKeyByApartmentId = {
  "15": "izmail31",
  "201": "coca",
  "202": "coca",
  "203": "coca",
  "204": "coca",
  "205": "varlaam",
} as const;

function localized(
  copy: ApartmentCopy,
  id: string,
  language: Language,
): LocalizedApartmentSeo {
  const facadeKey = facadeKeyByApartmentId[id as keyof typeof facadeKeyByApartmentId];

  return {
    displayAddress: copy.address,
    title: copy.title,
    description: copy.description,
    imageAlt: `${copy.title}, ${photoWord[language]} {index}`,
    ...(facadeKey ? { facadeAlt: facadeAlt[language][facadeKey] } : {}),
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

const apartment61Copy: Record<Language, ApartmentCopy> = {
  ru: {
    address: "Измаил 106/2 · Кишинёв",
    title: "Двухкомнатная квартира после ремонта на Измаил 106/2 — ID 61",
    description: "Современная двухкомнатная квартира Premium после полного ремонта на Измаил 106/2 в Кишинёве. Отдельные спальня и гостиная, до 4 гостей, оборудованная кухня, кондиционер, стиральная машина и ванна. 1000 MDL в сутки.",
    shortDescription: "Полностью обновлённая двухкомнатная квартира с отдельной спальней и гостиной для комфортного размещения до 4 гостей.",
    aboutTitle: "Обновлённая двухкомнатная квартира на Измаил 106/2 · ID 61",
    typeLabel: "2 отдельные комнаты",
    view: "Отдельная спальня + гостиная",
    features: ["Premium", "2 отдельные комнаты", "Отдельная спальня", "Отдельная гостиная", "До 4 гостей", "Двуспальная кровать", "Раскладной диван", "Телевизор", "Кондиционер", "Стиральная машина", "Ванна", "Оборудованная кухня", "Холодильник", "Духовка", "Микроволновая печь", "Газовая варочная поверхность", "Кухонная мойка", "Посуда и столовые приборы", "Места для хранения вещей", "Современный интерьер", "Квартира после ремонта"],
    descriptionParagraphs: [
      "Современная двухкомнатная квартира после полного ремонта расположена по адресу Измаил 106/2 в Кишинёве. Светлый обновлённый интерьер подходит как для короткого визита, так и для более продолжительного проживания.",
      "В отдельной спальне установлена двуспальная кровать, а в просторной гостиной — раскладной диван. Квартира рассчитана на размещение до 4 гостей.",
      "Кухня оборудована холодильником, духовкой, микроволновой печью, газовой варочной поверхностью и мойкой; имеются посуда и столовые приборы. Также в квартире есть телевизор, кондиционер, стиральная машина, ванна и места для хранения вещей.",
    ],
    audienceItems: ["Для пар", "Для семей и компаний до 4 гостей", "Для кратких и продолжительных поездок"],
    faq: [
      { question: "Сколько гостей можно разместить в квартире ID 61?", answer: "Квартира рассчитана на размещение до 4 гостей." },
      { question: "Какие спальные места предусмотрены?", answer: "Двуспальная кровать находится в отдельной спальне, раскладной диван — в гостиной." },
      { question: "Какова стоимость проживания?", answer: "Стоимость составляет 1000 MDL в сутки." },
    ],
  },
  ro: {
    address: "Strada Ismail 106/2 · Chișinău",
    title: "Apartament renovat cu 2 camere pe Strada Ismail 106/2 — ID 61",
    description: "Apartament Premium modern cu 2 camere, complet renovat, pe Strada Ismail 106/2 din Chișinău. Dormitor și living separate, până la 4 oaspeți, bucătărie utilată, aer condiționat, mașină de spălat și cadă. 1000 MDL pe noapte.",
    shortDescription: "Apartament complet renovat, cu dormitor și living separate, potrivit pentru un sejur confortabil alături de până la 4 oaspeți.",
    aboutTitle: "Apartament renovat cu 2 camere pe Strada Ismail 106/2 · ID 61",
    typeLabel: "2 camere separate",
    view: "Dormitor separat + living",
    features: ["Premium", "2 camere separate", "Dormitor separat", "Living separat", "Până la 4 oaspeți", "Pat matrimonial", "Canapea extensibilă", "Televizor", "Aer condiționat", "Mașină de spălat", "Cadă", "Bucătărie utilată", "Frigider", "Cuptor", "Cuptor cu microunde", "Plită pe gaz", "Chiuvetă de bucătărie", "Veselă și tacâmuri", "Spații de depozitare", "Interior modern", "Apartament renovat"],
    descriptionParagraphs: [
      "Apartamentul modern cu 2 camere de pe Strada Ismail 106/2 din Chișinău a fost complet renovat. Interiorul luminos și actual este potrivit atât pentru vizite scurte, cât și pentru șederi mai lungi.",
      "Dormitorul separat are un pat matrimonial, iar livingul spațios este dotat cu o canapea extensibilă. Apartamentul poate găzdui până la 4 persoane.",
      "Bucătăria este echipată cu frigider, cuptor, cuptor cu microunde, plită pe gaz și chiuvetă, precum și veselă și tacâmuri. Sunt disponibile televizor, aer condiționat, mașină de spălat, cadă și spații de depozitare.",
    ],
    audienceItems: ["Pentru cupluri", "Pentru familii și grupuri de până la 4 oaspeți", "Pentru șederi scurte sau mai lungi"],
    faq: [
      { question: "Câți oaspeți pot fi cazați în apartamentul ID 61?", answer: "Apartamentul poate găzdui până la 4 oaspeți." },
      { question: "Ce locuri de dormit sunt disponibile?", answer: "Dormitorul separat are un pat matrimonial, iar livingul are o canapea extensibilă." },
      { question: "Care este prețul pe noapte?", answer: "Prețul este de 1000 MDL pe noapte." },
    ],
  },
  en: {
    address: "106/2 Ismail Street · Chisinau",
    title: "Renovated two-room apartment at 106/2 Ismail Street — ID 61",
    description: "Modern fully renovated Premium two-room apartment at 106/2 Ismail Street in Chisinau. Separate bedroom and living room, up to 4 guests, equipped kitchen, air conditioning, washing machine and bathtub. 1000 MDL per night.",
    shortDescription: "A fully renovated two-room apartment with a separate bedroom and living room, comfortably accommodating up to 4 guests.",
    aboutTitle: "Renovated two-room apartment at 106/2 Ismail Street · ID 61",
    typeLabel: "2 separate rooms",
    view: "Separate bedroom + living room",
    features: ["Premium", "2 separate rooms", "Separate bedroom", "Separate living room", "Up to 4 guests", "Double bed", "Sofa bed", "Television", "Air conditioning", "Washing machine", "Bathtub", "Equipped kitchen", "Refrigerator", "Oven", "Microwave", "Gas hob", "Kitchen sink", "Cookware and cutlery", "Storage space", "Modern interior", "Fully renovated apartment"],
    descriptionParagraphs: [
      "This modern two-room apartment at 106/2 Ismail Street in Chisinau has been fully renovated. Its bright, updated interior suits both short visits and longer stays.",
      "The separate bedroom has a double bed, while the spacious living room includes a sofa bed. The apartment accommodates up to 4 guests.",
      "The kitchen includes a refrigerator, oven, microwave, gas hob and sink, along with cookware and cutlery. The apartment also provides a television, air conditioning, washing machine, bathtub and storage space.",
    ],
    audienceItems: ["For couples", "For families and groups of up to 4 guests", "For short or extended stays"],
    faq: [
      { question: "How many guests can stay in apartment ID 61?", answer: "The apartment accommodates up to 4 guests." },
      { question: "What sleeping arrangements are available?", answer: "There is a double bed in the separate bedroom and a sofa bed in the living room." },
      { question: "What is the nightly price?", answer: "The price is 1000 MDL per night." },
    ],
  },
  uk: {
    address: "вул. Ізмаїл, 106/2 · Кишинів",
    title: "Двокімнатна квартира після ремонту на вул. Ізмаїл, 106/2 — ID 61",
    description: "Сучасна повністю оновлена двокімнатна квартира Premium на вул. Ізмаїл, 106/2 у Кишиневі. Окремі спальня й вітальня, до 4 гостей, обладнана кухня, кондиціонер, пральна машина та ванна. 1000 MDL за добу.",
    shortDescription: "Повністю оновлена двокімнатна квартира з окремими спальнею та вітальнею для комфортного розміщення до 4 гостей.",
    aboutTitle: "Оновлена двокімнатна квартира на вул. Ізмаїл, 106/2 · ID 61",
    typeLabel: "2 окремі кімнати",
    view: "Окрема спальня + вітальня",
    features: ["Premium", "2 окремі кімнати", "Окрема спальня", "Окрема вітальня", "До 4 гостей", "Двоспальне ліжко", "Розкладний диван", "Телевізор", "Кондиціонер", "Пральна машина", "Ванна", "Обладнана кухня", "Холодильник", "Духова шафа", "Мікрохвильова піч", "Газова варильна поверхня", "Кухонна мийка", "Посуд і столові прилади", "Місця для зберігання", "Сучасний інтер’єр", "Квартира після ремонту"],
    descriptionParagraphs: [
      "Сучасна двокімнатна квартира на вул. Ізмаїл, 106/2 у Кишиневі повністю оновлена після ремонту. Світлий інтер’єр підходить і для коротких візитів, і для тривалішого проживання.",
      "В окремій спальні встановлено двоспальне ліжко, а у просторій вітальні — розкладний диван. Квартира розрахована на розміщення до 4 гостей.",
      "Кухня обладнана холодильником, духовою шафою, мікрохвильовою піччю, газовою варильною поверхнею та мийкою; є посуд і столові прилади. Також доступні телевізор, кондиціонер, пральна машина, ванна й місця для зберігання.",
    ],
    audienceItems: ["Для пар", "Для сімей і компаній до 4 гостей", "Для коротких і триваліших поїздок"],
    faq: [
      { question: "Скільки гостей можна розмістити у квартирі ID 61?", answer: "Квартира розрахована на розміщення до 4 гостей." },
      { question: "Які спальні місця передбачені?", answer: "В окремій спальні є двоспальне ліжко, а у вітальні — розкладний диван." },
      { question: "Яка вартість проживання?", answer: "Вартість становить 1000 MDL за добу." },
    ],
  },
  cs: {
    address: "ulice Ismail 106/2 · Kišiněv",
    title: "Zrekonstruovaný dvoupokojový apartmán v ulici Ismail 106/2 — ID 61",
    description: "Moderní kompletně zrekonstruovaný apartmán Premium se 2 pokoji v ulici Ismail 106/2 v Kišiněvě. Samostatná ložnice a obývací pokoj, až 4 hosté, vybavená kuchyň, klimatizace, pračka a vana. 1000 MDL za noc.",
    shortDescription: "Kompletně zrekonstruovaný dvoupokojový apartmán se samostatnou ložnicí a obývacím pokojem až pro 4 hosty.",
    aboutTitle: "Zrekonstruovaný dvoupokojový apartmán v ulici Ismail 106/2 · ID 61",
    typeLabel: "2 samostatné pokoje",
    view: "Samostatná ložnice + obývací pokoj",
    features: ["Premium", "2 samostatné pokoje", "Samostatná ložnice", "Samostatný obývací pokoj", "Až 4 hosté", "Manželská postel", "Rozkládací pohovka", "Televize", "Klimatizace", "Pračka", "Vana", "Vybavená kuchyň", "Lednice", "Trouba", "Mikrovlnná trouba", "Plynová varná deska", "Kuchyňský dřez", "Nádobí a příbory", "Úložné prostory", "Moderní interiér", "Apartmán po rekonstrukci"],
    descriptionParagraphs: [
      "Moderní dvoupokojový apartmán v ulici Ismail 106/2 v Kišiněvě prošel kompletní rekonstrukcí. Světlý, aktualizovaný interiér je vhodný pro krátké návštěvy i delší pobyty.",
      "Samostatná ložnice nabízí manželskou postel a prostorný obývací pokoj rozkládací pohovku. Apartmán ubytuje až 4 hosty.",
      "Kuchyň je vybavena lednicí, troubou, mikrovlnnou troubou, plynovou varnou deskou a dřezem; nechybí nádobí ani příbory. K dispozici je také televize, klimatizace, pračka, vana a úložné prostory.",
    ],
    audienceItems: ["Pro páry", "Pro rodiny a skupiny až 4 hostů", "Pro krátké i delší pobyty"],
    faq: [
      { question: "Kolik hostů může bydlet v apartmánu ID 61?", answer: "Apartmán ubytuje až 4 hosty." },
      { question: "Jaká místa na spaní jsou k dispozici?", answer: "V samostatné ložnici je manželská postel a v obývacím pokoji rozkládací pohovka." },
      { question: "Jaká je cena za noc?", answer: "Cena je 1000 MDL za noc." },
    ],
  },
};

const allNewApartmentCopy: Record<Language, Record<string, ApartmentCopy>> = {
  ru: { ...apartment15And16Copy.ru, ...newApartmentCopy.ru, "61": apartment61Copy.ru },
  ro: { ...apartment15And16Copy.ro, ...newApartmentCopy.ro, "61": apartment61Copy.ro },
  en: { ...apartment15And16Copy.en, ...newApartmentCopy.en, "61": apartment61Copy.en },
  uk: { ...apartment15And16Copy.uk, ...newApartmentCopy.uk, "61": apartment61Copy.uk },
  cs: { ...apartment15And16Copy.cs, ...newApartmentCopy.cs, "61": apartment61Copy.cs },
};

export const newApartmentLocalizations: Record<
  string,
  Record<Language, LocalizedApartmentSeo>
> = Object.fromEntries(
  ["15", "16", "61", "200", "201", "202", "203", "204", "205"].map((id) => [
    id,
    Object.fromEntries(
      (Object.keys(newApartmentCopy) as Language[]).map((language) => [
        language,
        localized(allNewApartmentCopy[language][id], id, language),
      ]),
    ) as Record<Language, LocalizedApartmentSeo>,
  ]),
);
