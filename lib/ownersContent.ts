import type { Metadata } from "next";
import type { Language } from "@/locales/translations";
import {
  baseUrl,
  mainSocialImageUrl,
  normalizeSiteLanguage,
  routeAlternates,
  siteName,
} from "@/lib/seo";

export const ownersPath = "/owners";
export const ownersPhoneHref = "tel:+37369990190";
export const ownersPhoneLabel = "+373 69 990 190";

type OwnersCopy = {
  home: {
    eyebrow: string;
    title: string;
    text: string;
    button: string;
    note: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    text: string;
    button: string;
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    items: string[];
  };
  steps: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; text: string }>;
  };
  fit: {
    eyebrow: string;
    title: string;
    text: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    whatsapp: string;
    call: string;
    whatsappMessage: string;
  };
  breadcrumb: string;
  seo: {
    title: string;
    description: string;
  };
};

export const ownersContent: Record<Language, OwnersCopy> = {
  ru: {
    home: {
      eyebrow: "Владельцам квартир",
      title: "Передайте квартиру в управление RentPlace",
      text: "Поможем с размещением, заявками, гостями и ежедневным администрированием посуточной аренды.",
      button: "Передать квартиру в управление",
      note: "Обсудить сотрудничество",
    },
    hero: {
      eyebrow: "RentPlace для владельцев",
      title: "Передайте квартиру в управление RentPlace",
      text: "Помогаем владельцам сдавать квартиры посуточно и берём на себя размещение объекта, заявки, бронирования и общение с гостями.",
      button: "Обсудить сотрудничество",
    },
    services: {
      eyebrow: "Работа с объектом",
      title: "Что мы берём на себя",
      intro: "Состав услуг и формат сотрудничества согласовываем с владельцем до публикации квартиры.",
      items: [
        "Размещение квартиры на RentPlace",
        "Приём заявок и бронирований",
        "Общение и поддержка гостей",
        "Координация заселения",
        "Ведение календаря занятости",
        "Продвижение объекта на площадке",
      ],
    },
    steps: {
      eyebrow: "Начало работы",
      title: "Три понятных шага",
      items: [
        { title: "Расскажите о квартире", text: "Отправьте адрес, фотографии и основные сведения об объекте." },
        { title: "Согласуем формат", text: "Обсудим состояние квартиры, задачи и подходящий объём работы." },
        { title: "Опубликуем объект", text: "После согласования подготовим квартиру к появлению в системе RentPlace." },
      ],
    },
    fit: {
      eyebrow: "Кому подходит",
      title: "Квартиры для посуточного проживания в Кишинёве",
      text: "Рассматриваем объекты в Кишинёве, подходящие для краткосрочного размещения, и работаем с владельцами, которые хотят делегировать коммуникацию с гостями и бронирования.",
    },
    contact: {
      eyebrow: "Прямой контакт",
      title: "Есть квартира? Давайте обсудим.",
      text: "Напишите в WhatsApp или позвоните — уточним детали объекта и возможный формат сотрудничества.",
      whatsapp: "WhatsApp",
      call: "Позвонить",
      whatsappMessage: "Здравствуйте! Хочу обсудить передачу квартиры в управление RentPlace.",
    },
    breadcrumb: "Владельцам квартир",
    seo: {
      title: "Управление квартирой в Кишинёве — RentPlaceMD",
      description: "Передайте квартиру в управление RentPlaceMD: размещение, бронирования, общение с гостями и администрирование посуточной аренды в Кишинёве.",
    },
  },
  ro: {
    home: {
      eyebrow: "Pentru proprietari",
      title: "Încredințați apartamentul administrării RentPlace",
      text: "Vă ajutăm cu publicarea, solicitările, oaspeții și administrarea zilnică a închirierilor pe termen scurt.",
      button: "Încredințează apartamentul",
      note: "Discută colaborarea",
    },
    hero: {
      eyebrow: "RentPlace pentru proprietari",
      title: "Încredințați apartamentul administrării RentPlace",
      text: "Ajutăm proprietarii să închirieze pe termen scurt și preluăm publicarea obiectului, solicitările, rezervările și comunicarea cu oaspeții.",
      button: "Discută colaborarea",
    },
    services: {
      eyebrow: "Lucrul cu proprietatea",
      title: "De ce ne ocupăm",
      intro: "Stabilim împreună cu proprietarul serviciile și formatul colaborării înainte de publicare.",
      items: [
        "Publicarea apartamentului pe RentPlace",
        "Preluarea solicitărilor și rezervărilor",
        "Comunicarea și suportul oaspeților",
        "Coordonarea cazării",
        "Gestionarea calendarului de ocupare",
        "Promovarea proprietății pe platformă",
      ],
    },
    steps: {
      eyebrow: "Începerea colaborării",
      title: "Trei pași simpli",
      items: [
        { title: "Ne prezentați apartamentul", text: "Trimiteți adresa, fotografiile și informațiile principale." },
        { title: "Stabilim formatul", text: "Discutăm starea proprietății, obiectivele și volumul potrivit de servicii." },
        { title: "Publicăm proprietatea", text: "După acord, pregătim apartamentul pentru sistemul RentPlace." },
      ],
    },
    fit: {
      eyebrow: "Pentru cine",
      title: "Apartamente potrivite pentru sejururi scurte în Chișinău",
      text: "Analizăm proprietăți din Chișinău potrivite pentru cazare pe termen scurt și colaborăm cu proprietari care vor să delege comunicarea cu oaspeții și rezervările.",
    },
    contact: {
      eyebrow: "Contact direct",
      title: "Aveți un apartament? Să discutăm.",
      text: "Scrieți-ne pe WhatsApp sau sunați-ne pentru a clarifica detaliile și formatul posibil al colaborării.",
      whatsapp: "WhatsApp",
      call: "Sună",
      whatsappMessage: "Bună ziua! Aș dori să discut administrarea apartamentului meu prin RentPlace.",
    },
    breadcrumb: "Pentru proprietari",
    seo: {
      title: "Administrarea apartamentelor în Chișinău — RentPlaceMD",
      description: "Încredințați apartamentul RentPlaceMD: publicare, rezervări, comunicare cu oaspeții și administrarea închirierilor pe termen scurt în Chișinău.",
    },
  },
  en: {
    home: {
      eyebrow: "For apartment owners",
      title: "Put your apartment under RentPlace management",
      text: "We help with listing, enquiries, guests and the day-to-day administration of short stays.",
      button: "Put your apartment under management",
      note: "Discuss a partnership",
    },
    hero: {
      eyebrow: "RentPlace for owners",
      title: "Put your apartment under RentPlace management",
      text: "We help owners offer short stays and handle the property listing, enquiries, bookings and guest communication.",
      button: "Discuss a partnership",
    },
    services: {
      eyebrow: "Property operations",
      title: "What we handle",
      intro: "We agree the service scope and partnership model with each owner before the apartment is published.",
      items: [
        "Listing the apartment on RentPlace",
        "Handling enquiries and bookings",
        "Guest communication and support",
        "Coordinating check-in",
        "Maintaining the availability calendar",
        "Promoting the property on the platform",
      ],
    },
    steps: {
      eyebrow: "Getting started",
      title: "Three clear steps",
      items: [
        { title: "Tell us about the apartment", text: "Send the address, photographs and key property details." },
        { title: "Agree the format", text: "We discuss its condition, your goals and the appropriate scope of work." },
        { title: "Publish the property", text: "Once agreed, we prepare the apartment for the RentPlace system." },
      ],
    },
    fit: {
      eyebrow: "Who it suits",
      title: "Chisinau apartments suitable for short stays",
      text: "We consider properties in Chisinau that suit short-stay guests and work with owners who want to delegate booking and guest communication.",
    },
    contact: {
      eyebrow: "Direct contact",
      title: "Own an apartment? Let’s talk.",
      text: "Message us on WhatsApp or call to discuss the property and a suitable partnership format.",
      whatsapp: "WhatsApp",
      call: "Call",
      whatsappMessage: "Hello! I would like to discuss placing my apartment under RentPlace management.",
    },
    breadcrumb: "For apartment owners",
    seo: {
      title: "Apartment management in Chisinau — RentPlaceMD",
      description: "Put your apartment under RentPlaceMD management for listing, bookings, guest communication and short-stay administration in Chisinau.",
    },
  },
  uk: {
    home: {
      eyebrow: "Власникам квартир",
      title: "Передайте квартиру в управління RentPlace",
      text: "Допоможемо з розміщенням, заявками, гостями та щоденним адмініструванням подобової оренди.",
      button: "Передати квартиру в управління",
      note: "Обговорити співпрацю",
    },
    hero: {
      eyebrow: "RentPlace для власників",
      title: "Передайте квартиру в управління RentPlace",
      text: "Допомагаємо власникам здавати квартири подобово та беремо на себе розміщення об’єкта, заявки, бронювання і спілкування з гостями.",
      button: "Обговорити співпрацю",
    },
    services: {
      eyebrow: "Робота з об’єктом",
      title: "Що ми беремо на себе",
      intro: "Перелік послуг і формат співпраці погоджуємо з власником до публікації квартири.",
      items: [
        "Розміщення квартири на RentPlace",
        "Приймання заявок і бронювань",
        "Спілкування та підтримка гостей",
        "Координація заселення",
        "Ведення календаря зайнятості",
        "Просування об’єкта на платформі",
      ],
    },
    steps: {
      eyebrow: "Початок роботи",
      title: "Три зрозумілі кроки",
      items: [
        { title: "Розкажіть про квартиру", text: "Надішліть адресу, фотографії та основну інформацію про об’єкт." },
        { title: "Погодимо формат", text: "Обговоримо стан квартири, завдання та відповідний обсяг роботи." },
        { title: "Опублікуємо об’єкт", text: "Після погодження підготуємо квартиру до появи в системі RentPlace." },
      ],
    },
    fit: {
      eyebrow: "Кому підходить",
      title: "Квартири для подобового проживання в Кишиневі",
      text: "Розглядаємо об’єкти в Кишиневі, придатні для короткострокового проживання, і працюємо з власниками, які хочуть делегувати комунікацію з гостями та бронювання.",
    },
    contact: {
      eyebrow: "Прямий контакт",
      title: "Є квартира? Обговорімо.",
      text: "Напишіть у WhatsApp або зателефонуйте — уточнимо деталі об’єкта та можливий формат співпраці.",
      whatsapp: "WhatsApp",
      call: "Зателефонувати",
      whatsappMessage: "Вітаю! Хочу обговорити передачу квартири в управління RentPlace.",
    },
    breadcrumb: "Власникам квартир",
    seo: {
      title: "Управління квартирою в Кишиневі — RentPlaceMD",
      description: "Передайте квартиру в управління RentPlaceMD: розміщення, бронювання, спілкування з гостями та адміністрування подобової оренди в Кишиневі.",
    },
  },
  cs: {
    home: {
      eyebrow: "Pro majitele apartmánů",
      title: "Svěřte apartmán do správy RentPlace",
      text: "Pomůžeme se zveřejněním, poptávkami, hosty a každodenní správou krátkodobých pobytů.",
      button: "Svěřit apartmán do správy",
      note: "Projednat spolupráci",
    },
    hero: {
      eyebrow: "RentPlace pro majitele",
      title: "Svěřte apartmán do správy RentPlace",
      text: "Pomáháme majitelům s krátkodobými pronájmy a zajišťujeme zveřejnění objektu, poptávky, rezervace i komunikaci s hosty.",
      button: "Projednat spolupráci",
    },
    services: {
      eyebrow: "Práce s objektem",
      title: "Co zajišťujeme",
      intro: "Rozsah služeb a způsob spolupráce dohodneme s majitelem ještě před zveřejněním apartmánu.",
      items: [
        "Zveřejnění apartmánu na RentPlace",
        "Vyřizování poptávek a rezervací",
        "Komunikace a podpora hostů",
        "Koordinace ubytování",
        "Správa kalendáře obsazenosti",
        "Propagace objektu na platformě",
      ],
    },
    steps: {
      eyebrow: "Začátek spolupráce",
      title: "Tři srozumitelné kroky",
      items: [
        { title: "Představíte nám apartmán", text: "Pošlete adresu, fotografie a základní informace o objektu." },
        { title: "Dohodneme formát", text: "Probereme stav objektu, vaše cíle a vhodný rozsah práce." },
        { title: "Objekt zveřejníme", text: "Po dohodě připravíme apartmán pro systém RentPlace." },
      ],
    },
    fit: {
      eyebrow: "Pro koho",
      title: "Apartmány v Kišiněvě vhodné pro krátkodobé pobyty",
      text: "Posuzujeme objekty v Kišiněvě vhodné pro krátkodobé ubytování a spolupracujeme s majiteli, kteří chtějí delegovat rezervace a komunikaci s hosty.",
    },
    contact: {
      eyebrow: "Přímý kontakt",
      title: "Máte apartmán? Pojďme si promluvit.",
      text: "Napište nám přes WhatsApp nebo zavolejte a probereme objekt i vhodný způsob spolupráce.",
      whatsapp: "WhatsApp",
      call: "Zavolat",
      whatsappMessage: "Dobrý den! Rád/a bych projednal/a správu svého apartmánu přes RentPlace.",
    },
    breadcrumb: "Pro majitele apartmánů",
    seo: {
      title: "Správa apartmánů v Kišiněvě — RentPlaceMD",
      description: "Svěřte apartmán RentPlaceMD: zveřejnění, rezervace, komunikace s hosty a správa krátkodobých pronájmů v Kišiněvě.",
    },
  },
};

export function getOwnersWhatsappHref(language: Language) {
  return "https://wa.me/37369990190?text=" +
    encodeURIComponent(ownersContent[language].contact.whatsappMessage);
}

export function getOwnersMetadata(languageInput?: string): Metadata {
  const language = normalizeSiteLanguage(languageInput);
  const content = ownersContent[language];
  const url = baseUrl + ownersPath + (languageInput ? `?lang=${language}` : "");

  return {
    title: { absolute: content.seo.title },
    description: content.seo.description,
    alternates: routeAlternates(ownersPath, languageInput),
    robots: { index: true, follow: true },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url,
      siteName,
      type: "website",
      locale: language,
      images: [{ url: mainSocialImageUrl, alt: content.seo.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
      images: [mainSocialImageUrl],
    },
  };
}

export function buildOwnersJsonLd(languageInput?: string) {
  const language = normalizeSiteLanguage(languageInput);
  const content = ownersContent[language];
  const url = baseUrl + ownersPath + (languageInput ? `?lang=${language}` : "");

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: content.seo.title,
      description: content.seo.description,
      url,
      inLanguage: language,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteName, item: baseUrl },
        { "@type": "ListItem", position: 2, name: content.breadcrumb, item: url },
      ],
    },
  ];
}
