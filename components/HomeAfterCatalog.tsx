"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/locales/translations";

const contactPhone = "+37369990190";
const displayPhone = "+373 69 990 190";
const telegramUrl = "https://t.me/rentplacemd";

function whatsappUrl(message: string) {
  return "https://wa.me/37369990190?text=" + encodeURIComponent(message);
}

type HomeAfterCatalogText = {
  sectionTitle: string;
  sectionText: string;
  routeButton: string;
  callButton: string;
  mapTitle: string;
  cards: Array<{
    title: string;
    eyebrow: string;
    text: string;
    href: string;
    image: string;
    alt: string;
    position: string;
  }>;
  about: {
    label: string;
    title: string;
    text: string;
  };
  rules: {
    label: string;
    title: string;
    text: string;
    message: string;
    button: string;
    items: Array<{ title: string; text: string }>;
  };
  transfer: {
    price: string;
    label: string;
    title: string;
    text: string;
    message: string;
    imageAlt: string;
    highlights: string[];
  };
  why: {
    label: string;
    title: string;
    text: string;
    items: Array<{ title: string; text: string }>;
  };
};

const sharedCards = {
  about: {
    href: "#about",
    image: "/apartments/izmail88-5/D4S_2602.jpg",
    position: "50% 48%",
  },
  apartments: {
    href: "#apartments",
    image: "/apartments/izmail88-3/D4S_2531.jpg",
    position: "50% 52%",
  },
  rules: {
    href: "#check-in-rules",
    image: "/guest-essentials/check-in-keys.png",
    position: "64% 50%",
  },
  transfers: {
    href: "#transfers",
    image: "/guest-essentials/airport-transfer.png",
    position: "58% 50%",
  },
  why: {
    href: "#why-us",
    image: "/common/building.png",
    position: "50% 58%",
  },
};

const textByLanguage: Record<Language, HomeAfterCatalogText> = {
  ru: {
    sectionTitle: "Все, что нужно гостю",
    sectionText:
      "Навигация по ключевым сервисам: квартиры, правила, трансфер, локация и преимущества RentPlaceMD.",
    routeButton: "Построить маршрут",
    callButton: "Позвонить",
    mapTitle: "RentPlaceMD на карте: Измаил 88, Chisinau, Moldova",
    cards: [
      {
        ...sharedCards.about,
        title: "О нас",
        eyebrow: "RentPlaceMD",
        text: "Реальные квартиры в комплексе Измаил 88, проверенные фото и сопровождение гостя до заселения.",
        alt: "Светлая квартира RentPlaceMD в комплексе Измаил 88",
      },
      {
        ...sharedCards.apartments,
        title: "Все квартиры",
        eyebrow: "Каталог",
        text: "Студии и квартиры с актуальными ценами, вместимостью, фото и быстрым переходом к деталям.",
        alt: "Интерьер квартиры RentPlaceMD в комплексе Измаил 88",
      },
      {
        ...sharedCards.rules,
        title: "Правила заселения",
        eyebrow: "Заезд 24/7",
        text: "Время заезда и выезда, документы, оплата и правила проживания в одном понятном разделе.",
        alt: "Ключи у современной двери квартиры",
      },
      {
        ...sharedCards.transfers,
        title: "Трансферы",
        eyebrow: "Аэропорт",
        text: "Встреча в аэропорту Кишинева, помощь с багажом и доставка прямо к квартире.",
        alt: "Современный автомобиль возле аэропорта",
      },
      {
        ...sharedCards.why,
        title: "Почему выбирают нас",
        eyebrow: "Сервис",
        text: "Центр города, реальные квартиры, быстрый ответ, чистота и поддержка на протяжении проживания.",
        alt: "Комплекс Измаил 88 в центре Кишинева",
      },
    ],
    about: {
      label: "О нас",
      title: "RentPlaceMD - квартиры посуточно в центре Кишинева",
      text: "Работаем с реальными квартирами в комплексе Измаил 88, заранее показываем актуальные фото и помогаем гостю быстро выбрать подходящий вариант.",
    },
    rules: {
      label: "Правила заселения",
      title: "Все понятно до приезда",
      text: "Если нужен ранний заезд или поздний выезд - сообщите заранее. Если квартира свободна, мы постараемся пойти навстречу.",
      message: "Здравствуйте! Хочу уточнить правила заселения RentPlaceMD.",
      button: "Уточнить правила",
      items: [
        { title: "Заезд", text: "с 14:00" },
        { title: "Выезд", text: "до 12:00" },
        { title: "Оплата", text: "при заселении" },
        { title: "Документы", text: "заселение по документу" },
        { title: "Правила проживания", text: "курение только на балконе или в разрешенных местах" },
        { title: "Поддержка 24/7", text: "связь с RentPlaceMD в течение проживания" },
      ],
    },
    transfer: {
      price: "от 19.99 EUR",
      label: "Трансфер",
      title: "Из аэропорта Кишинева - прямо к квартире",
      text: "Удобно при позднем прилете, с багажом или если хочется заранее согласовать спокойную дорогу до адреса проживания.",
      message: "Здравствуйте! Интересует трансфер из аэропорта Кишинева к квартире.",
      imageAlt: "Современный автомобиль возле аэропорта",
      highlights: [
        "Трансфер из аэропорта Кишинева до квартиры",
        "Встреча в аэропорту",
        "Помощь с багажом",
        "Доставка по адресу проживания",
        "Возможность предварительного заказа",
        "Удобно при позднем прилете",
      ],
    },
    why: {
      label: "Почему выбирают нас",
      title: "Сервис, который чувствуется до заселения",
      text: "RentPlaceMD делает короткую аренду понятной: без лишних шагов, с быстрым ответом и аккуратными квартирами в центре города.",
      items: [
        { title: "Реальные квартиры", text: "Показываем настоящие фотографии объектов и заранее уточняем детали проживания." },
        { title: "Центр Кишинева", text: "Основная локация RentPlaceMD - Измаил 88, удобный район рядом с центром города." },
        { title: "Быстрое заселение", text: "Согласуем время, оплату и документы до приезда, чтобы не тратить время на месте." },
        { title: "Поддержка 24/7", text: "Остаемся на связи в WhatsApp, Viber, Telegram и по телефону." },
      ],
    },
  },
  ro: {
    sectionTitle: "Tot ce are nevoie oaspetele",
    sectionText:
      "Navigare prin serviciile cheie: apartamente, reguli, transfer, locatie si avantajele RentPlaceMD.",
    routeButton: "Construieste ruta",
    callButton: "Suna",
    mapTitle: "RentPlaceMD pe harta: Ismail 88, Chisinau, Moldova",
    cards: [
      {
        ...sharedCards.about,
        title: "Despre noi",
        eyebrow: "RentPlaceMD",
        text: "Apartamente reale in complexul Ismail 88, fotografii verificate si asistenta pana la cazare.",
        alt: "Apartament luminos RentPlaceMD in complexul Ismail 88",
      },
      {
        ...sharedCards.apartments,
        title: "Toate apartamentele",
        eyebrow: "Catalog",
        text: "Garsoniere si apartamente cu preturi, capacitate, fotografii si acces rapid la detalii.",
        alt: "Interior de apartament RentPlaceMD in complexul Ismail 88",
      },
      {
        ...sharedCards.rules,
        title: "Reguli de cazare",
        eyebrow: "Cazare 24/7",
        text: "Orele de sosire si plecare, documentele, plata si regulile de sedere intr-un singur loc.",
        alt: "Chei langa usa moderna a unui apartament",
      },
      {
        ...sharedCards.transfers,
        title: "Transferuri",
        eyebrow: "Aeroport",
        text: "Intampinare la aeroportul Chisinau, ajutor cu bagajele si livrare direct la apartament.",
        alt: "Masina moderna langa aeroport",
      },
      {
        ...sharedCards.why,
        title: "De ce ne aleg",
        eyebrow: "Serviciu",
        text: "Centru, apartamente reale, raspuns rapid, curatenie si suport pe durata sederii.",
        alt: "Complexul Ismail 88 in centrul Chisinaului",
      },
    ],
    about: {
      label: "Despre noi",
      title: "RentPlaceMD - apartamente pe zi in centrul Chisinaului",
      text: "Lucram cu apartamente reale in complexul Ismail 88, aratam fotografii actuale si ajutam oaspetele sa aleaga rapid varianta potrivita.",
    },
    rules: {
      label: "Reguli de cazare",
      title: "Totul este clar inainte de sosire",
      text: "Daca aveti nevoie de check-in mai devreme sau check-out mai tarziu, anuntati-ne din timp. Daca apartamentul este liber, incercam sa ajutam.",
      message: "Buna ziua! Vreau sa verific regulile de cazare RentPlaceMD.",
      button: "Verifica regulile",
      items: [
        { title: "Check-in", text: "de la 14:00" },
        { title: "Check-out", text: "pana la 12:00" },
        { title: "Plata", text: "la cazare" },
        { title: "Documente", text: "cazare pe baza unui document" },
        { title: "Reguli", text: "fumatul doar pe balcon sau in locurile permise" },
        { title: "Suport 24/7", text: "contact cu RentPlaceMD pe durata sederii" },
      ],
    },
    transfer: {
      price: "de la 19.99 EUR",
      label: "Transfer",
      title: "De la aeroportul Chisinau direct la apartament",
      text: "Convenabil pentru sosiri tarzii, bagaje sau cand doriti sa coordonati din timp drumul pana la adresa.",
      message: "Buna ziua! Ma intereseaza transferul de la aeroportul Chisinau la apartament.",
      imageAlt: "Masina moderna langa aeroport",
      highlights: [
        "Transfer de la aeroportul Chisinau la apartament",
        "Intampinare la aeroport",
        "Ajutor cu bagajele",
        "Livrare la adresa de cazare",
        "Posibilitate de rezervare in avans",
        "Convenabil pentru sosiri tarzii",
      ],
    },
    why: {
      label: "De ce ne aleg",
      title: "Serviciu care se simte inainte de cazare",
      text: "RentPlaceMD face inchirierea pe termen scurt clara: fara pasi inutili, cu raspuns rapid si apartamente ingrijite in centru.",
      items: [
        { title: "Apartamente reale", text: "Aratam fotografii reale ale obiectelor si clarificam detaliile de sedere din timp." },
        { title: "Centrul Chisinaului", text: "Locatia principala RentPlaceMD este Ismail 88, o zona comoda aproape de centru." },
        { title: "Cazare rapida", text: "Coordonam ora, plata si documentele inainte de sosire." },
        { title: "Suport 24/7", text: "Ramanem disponibili pe WhatsApp, Viber, Telegram si telefon." },
      ],
    },
  },
  en: {
    sectionTitle: "Everything a guest needs",
    sectionText:
      "Navigation through key services: apartments, rules, transfer, location and RentPlaceMD advantages.",
    routeButton: "Get directions",
    callButton: "Call",
    mapTitle: "RentPlaceMD on the map: Ismail 88, Chisinau, Moldova",
    cards: [
      {
        ...sharedCards.about,
        title: "About us",
        eyebrow: "RentPlaceMD",
        text: "Real apartments in the Ismail 88 complex, verified photos and guest support before check-in.",
        alt: "Bright RentPlaceMD apartment in the Ismail 88 complex",
      },
      {
        ...sharedCards.apartments,
        title: "All apartments",
        eyebrow: "Catalog",
        text: "Studios and apartments with current prices, capacity, photos and quick access to details.",
        alt: "RentPlaceMD apartment interior in the Ismail 88 complex",
      },
      {
        ...sharedCards.rules,
        title: "Check-in rules",
        eyebrow: "24/7 check-in",
        text: "Arrival and departure time, documents, payment and stay rules in one clear section.",
        alt: "Keys near a modern apartment door",
      },
      {
        ...sharedCards.transfers,
        title: "Transfers",
        eyebrow: "Airport",
        text: "Meet and greet at Chisinau airport, help with luggage and delivery straight to the apartment.",
        alt: "Modern car near an airport",
      },
      {
        ...sharedCards.why,
        title: "Why choose us",
        eyebrow: "Service",
        text: "City center, real apartments, fast reply, cleanliness and support throughout the stay.",
        alt: "Ismail 88 complex in central Chisinau",
      },
    ],
    about: {
      label: "About us",
      title: "RentPlaceMD - daily apartments in central Chisinau",
      text: "We work with real apartments in the Ismail 88 complex, show up-to-date photos in advance and help guests quickly choose the right option.",
    },
    rules: {
      label: "Check-in rules",
      title: "Everything is clear before arrival",
      text: "If you need early check-in or late check-out, let us know in advance. If the apartment is free, we will try to help.",
      message: "Hello! I would like to clarify the RentPlaceMD check-in rules.",
      button: "Clarify rules",
      items: [
        { title: "Check-in", text: "from 14:00" },
        { title: "Check-out", text: "until 12:00" },
        { title: "Payment", text: "on check-in" },
        { title: "Documents", text: "check-in with an ID document" },
        { title: "Stay rules", text: "smoking only on the balcony or in permitted areas" },
        { title: "24/7 support", text: "RentPlaceMD contact during your stay" },
      ],
    },
    transfer: {
      price: "from 19.99 EUR",
      label: "Transfer",
      title: "From Chisinau airport straight to the apartment",
      text: "Convenient for late arrivals, luggage or when you want to coordinate a calm ride to the address in advance.",
      message: "Hello! I am interested in a transfer from Chisinau airport to the apartment.",
      imageAlt: "Modern car near an airport",
      highlights: [
        "Transfer from Chisinau airport to the apartment",
        "Meet and greet at the airport",
        "Help with luggage",
        "Delivery to the stay address",
        "Advance booking available",
        "Convenient for late arrivals",
      ],
    },
    why: {
      label: "Why choose us",
      title: "Service you feel before check-in",
      text: "RentPlaceMD makes short-term rental clear: fewer steps, fast replies and tidy apartments in the city center.",
      items: [
        { title: "Real apartments", text: "We show real photos of the properties and clarify stay details in advance." },
        { title: "Central Chisinau", text: "RentPlaceMD's main location is Ismail 88, a convenient area close to the center." },
        { title: "Fast check-in", text: "We coordinate time, payment and documents before arrival." },
        { title: "24/7 support", text: "We stay available via WhatsApp, Viber, Telegram and phone." },
      ],
    },
  },
  uk: {
    sectionTitle: "Все, що потрібно гостю",
    sectionText:
      "Навігація ключовими сервісами: квартири, правила, трансфер, локація та переваги RentPlaceMD.",
    routeButton: "Побудувати маршрут",
    callButton: "Подзвонити",
    mapTitle: "RentPlaceMD на карті: Ізмаїл 88, Chisinau, Moldova",
    cards: [
      {
        ...sharedCards.about,
        title: "Про нас",
        eyebrow: "RentPlaceMD",
        text: "Реальні квартири в комплексі Ізмаїл 88, перевірені фото та супровід гостя до заселення.",
        alt: "Світла квартира RentPlaceMD в комплексі Ізмаїл 88",
      },
      {
        ...sharedCards.apartments,
        title: "Усі квартири",
        eyebrow: "Каталог",
        text: "Студії та квартири з актуальними цінами, місткістю, фото і швидким переходом до деталей.",
        alt: "Інтер'єр квартири RentPlaceMD в комплексі Ізмаїл 88",
      },
      {
        ...sharedCards.rules,
        title: "Правила заселення",
        eyebrow: "Заїзд 24/7",
        text: "Час заїзду та виїзду, документи, оплата і правила проживання в одному зрозумілому розділі.",
        alt: "Ключі біля сучасних дверей квартири",
      },
      {
        ...sharedCards.transfers,
        title: "Трансфери",
        eyebrow: "Аеропорт",
        text: "Зустріч в аеропорту Кишинева, допомога з багажем і доставка прямо до квартири.",
        alt: "Сучасний автомобіль біля аеропорту",
      },
      {
        ...sharedCards.why,
        title: "Чому обирають нас",
        eyebrow: "Сервіс",
        text: "Центр міста, реальні квартири, швидка відповідь, чистота і підтримка протягом проживання.",
        alt: "Комплекс Ізмаїл 88 в центрі Кишинева",
      },
    ],
    about: {
      label: "Про нас",
      title: "RentPlaceMD - квартири подобово в центрі Кишинева",
      text: "Працюємо з реальними квартирами в комплексі Ізмаїл 88, заздалегідь показуємо актуальні фото і допомагаємо гостю швидко вибрати відповідний варіант.",
    },
    rules: {
      label: "Правила заселення",
      title: "Все зрозуміло до приїзду",
      text: "Якщо потрібен ранній заїзд або пізній виїзд, повідомте заздалегідь. Якщо квартира вільна, ми постараємося піти назустріч.",
      message: "Добрий день! Хочу уточнити правила заселення RentPlaceMD.",
      button: "Уточнити правила",
      items: [
        { title: "Заїзд", text: "з 14:00" },
        { title: "Виїзд", text: "до 12:00" },
        { title: "Оплата", text: "при заселенні" },
        { title: "Документи", text: "заселення за документом" },
        { title: "Правила проживання", text: "куріння тільки на балконі або у дозволених місцях" },
        { title: "Підтримка 24/7", text: "зв'язок з RentPlaceMD протягом проживання" },
      ],
    },
    transfer: {
      price: "від 19.99 EUR",
      label: "Трансфер",
      title: "З аеропорту Кишинева - прямо до квартири",
      text: "Зручно при пізньому прильоті, з багажем або якщо хочеться заздалегідь узгодити спокійну дорогу до адреси проживання.",
      message: "Добрий день! Цікавить трансфер з аеропорту Кишинева до квартири.",
      imageAlt: "Сучасний автомобіль біля аеропорту",
      highlights: [
        "Трансфер з аеропорту Кишинева до квартири",
        "Зустріч в аеропорту",
        "Допомога з багажем",
        "Доставка за адресою проживання",
        "Можливість попереднього замовлення",
        "Зручно при пізньому прильоті",
      ],
    },
    why: {
      label: "Чому обирають нас",
      title: "Сервіс, який відчувається до заселення",
      text: "RentPlaceMD робить коротку оренду зрозумілою: без зайвих кроків, зі швидкою відповіддю та охайними квартирами в центрі міста.",
      items: [
        { title: "Реальні квартири", text: "Показуємо справжні фотографії об'єктів і заздалегідь уточнюємо деталі проживання." },
        { title: "Центр Кишинева", text: "Основна локація RentPlaceMD - Ізмаїл 88, зручний район поруч із центром міста." },
        { title: "Швидке заселення", text: "Узгоджуємо час, оплату і документи до приїзду." },
        { title: "Підтримка 24/7", text: "Залишаємось на зв'язку в WhatsApp, Viber, Telegram і телефоном." },
      ],
    },
  },
  cs: {
    sectionTitle: "Vse, co host potrebuje",
    sectionText:
      "Navigace ke klicovym sluzbam: apartmany, pravidla, transfer, lokalita a vyhody RentPlaceMD.",
    routeButton: "Naplanovat trasu",
    callButton: "Zavolat",
    mapTitle: "RentPlaceMD na mape: Ismail 88, Chisinau, Moldova",
    cards: [
      {
        ...sharedCards.about,
        title: "O nas",
        eyebrow: "RentPlaceMD",
        text: "Realne apartmany v komplexu Ismail 88, overene fotografie a podpora hosta pred ubytovanim.",
        alt: "Svetly apartman RentPlaceMD v komplexu Ismail 88",
      },
      {
        ...sharedCards.apartments,
        title: "Vsechny apartmany",
        eyebrow: "Katalog",
        text: "Studia a apartmany s aktualnimi cenami, kapacitou, fotografiemi a rychlym prechodem na detail.",
        alt: "Interier apartmanu RentPlaceMD v komplexu Ismail 88",
      },
      {
        ...sharedCards.rules,
        title: "Pravidla ubytovani",
        eyebrow: "Ubytovani 24/7",
        text: "Cas prijezdu a odjezdu, dokumenty, platba a pravidla pobytu na jednom jasnem miste.",
        alt: "Klice u modernich dveri apartmanu",
      },
      {
        ...sharedCards.transfers,
        title: "Transfery",
        eyebrow: "Letiste",
        text: "Privitani na letisti v Chisinau, pomoc se zavazadly a doprava primo k apartmanu.",
        alt: "Moderni auto u letiste",
      },
      {
        ...sharedCards.why,
        title: "Proc si vybrat nas",
        eyebrow: "Sluzba",
        text: "Centrum mesta, realne apartmany, rychla odpoved, cistota a podpora po celou dobu pobytu.",
        alt: "Komplex Ismail 88 v centru Chisinau",
      },
    ],
    about: {
      label: "O nas",
      title: "RentPlaceMD - apartmany na den v centru Chisinau",
      text: "Pracujeme s realnymi apartmany v komplexu Ismail 88, predem ukazujeme aktualni fotografie a pomahame hostovi rychle vybrat vhodnou moznost.",
    },
    rules: {
      label: "Pravidla ubytovani",
      title: "Vse je jasne pred prijezdem",
      text: "Pokud potrebujete drivsi check-in nebo pozdejsi check-out, dejte nam vedet predem. Pokud je apartman volny, pokusime se vyjit vstric.",
      message: "Dobry den! Chci si upresnit pravidla ubytovani RentPlaceMD.",
      button: "Upresnit pravidla",
      items: [
        { title: "Check-in", text: "od 14:00" },
        { title: "Check-out", text: "do 12:00" },
        { title: "Platba", text: "pri ubytovani" },
        { title: "Dokumenty", text: "ubytovani s dokladem" },
        { title: "Pravidla pobytu", text: "koureni pouze na balkone nebo na povolenych mistech" },
        { title: "Podpora 24/7", text: "kontakt s RentPlaceMD behem pobytu" },
      ],
    },
    transfer: {
      price: "od 19.99 EUR",
      label: "Transfer",
      title: "Z letiste Chisinau primo k apartmanu",
      text: "Pohodlne pri pozdnim priletu, se zavazadly nebo kdyz chcete predem domluvit klidnou cestu na adresu.",
      message: "Dobry den! Zajima me transfer z letiste Chisinau k apartmanu.",
      imageAlt: "Moderni auto u letiste",
      highlights: [
        "Transfer z letiste Chisinau k apartmanu",
        "Privitani na letisti",
        "Pomoc se zavazadly",
        "Doprava na adresu pobytu",
        "Moznost objednat predem",
        "Pohodlne pri pozdnim priletu",
      ],
    },
    why: {
      label: "Proc si vybrat nas",
      title: "Sluzba, kterou citite pred ubytovanim",
      text: "RentPlaceMD dela kratkodoby pronajem prehlednym: bez zbytecnych kroku, s rychlou odpovedi a upravenymi apartmany v centru.",
      items: [
        { title: "Realne apartmany", text: "Ukazujeme skutecne fotografie objektu a predem upresnujeme detaily pobytu." },
        { title: "Centrum Chisinau", text: "Hlavni lokalita RentPlaceMD je Ismail 88, pohodlna oblast blizko centra." },
        { title: "Rychle ubytovani", text: "Pred prijezdem koordinujeme cas, platbu a dokumenty." },
        { title: "Podpora 24/7", text: "Zustavame k dispozici pres WhatsApp, Viber, Telegram a telefon." },
      ],
    },
  },
};

const mapUrl =
  "https://www.google.com/maps?q=Izmail%2088%2C%20Chi%C8%99in%C4%83u%2C%20Moldova&output=embed";
const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Izmail%2088%2C%20Chi%C8%99in%C4%83u%2C%20Moldova";

export default function HomeAfterCatalog() {
  const { language } = useLanguage();
  const text = textByLanguage[language];

  return (
    <section
      id="guest-essentials"
      className="overflow-hidden bg-[#fffaf0] px-4 py-14 sm:px-6 sm:py-18 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[#d4146f] shadow-sm ring-1 ring-[#f0dfbd]">
              RentPlaceMD
            </p>
            <h2 className="mt-5 text-3xl font-black leading-tight text-[#07111f] sm:text-5xl">
              {text.sectionTitle}
            </h2>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-8">
              {text.sectionText}
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {text.cards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_18px_48px_rgba(15,23,42,0.08)] ring-1 ring-[#f1e6d4] transition duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-[0_28px_76px_rgba(15,23,42,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4146f]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#f4f1ee]">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 1280px) 20vw, (min-width: 768px) 50vw, 100vw"
                    quality={75}
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.055]"
                    style={{ objectPosition: card.position }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07111f]/55 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#d4146f] shadow-sm ring-1 ring-white/70 backdrop-blur">
                    {card.eyebrow}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-xl font-black leading-tight text-[#07111f]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                    {card.text}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <section
            id="about"
            aria-labelledby="about-title"
            className="mt-8 scroll-mt-32 overflow-hidden rounded-[30px] border border-[#f0dfbf] bg-[#fffefb] shadow-[0_20px_60px_rgba(15,23,42,0.09)] lg:scroll-mt-24"
          >
            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="p-5 sm:p-7 lg:p-8">
                <span className="inline-flex rounded-full bg-[#d4146f]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#d4146f]">
                  {text.about.label}
                </span>
                <h2
                  id="about-title"
                  className="mt-5 text-2xl font-black leading-tight text-[#07111f] sm:text-4xl"
                >
                  {text.about.title}
                </h2>
                <p className="mt-4 text-base font-semibold leading-7 text-slate-600 sm:text-lg">
                  {text.about.text}
                </p>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[#d4146f] px-6 py-4 text-center text-base font-black text-white shadow-lg shadow-pink-700/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#bd0f60] sm:w-auto"
                >
                  {text.routeButton}
                </a>
              </div>

              <div className="min-h-[320px] border-t border-[#f0dfbf] bg-[#f7efe3] lg:border-l lg:border-t-0">
                <iframe
                  title={text.mapTitle}
                  src={mapUrl}
                  className="h-[320px] w-full sm:h-[380px] lg:h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </section>

          <section
            id="check-in-rules"
            aria-labelledby="check-in-rules-title"
            className="mt-8 scroll-mt-32 rounded-[30px] border border-[#f0dfbf] bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-7 lg:scroll-mt-24 lg:p-8"
          >
            <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <span className="inline-flex rounded-full bg-[#ffd21f]/45 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#07111f]">
                  {text.rules.label}
                </span>
                <h2 id="check-in-rules-title" className="mt-5 text-2xl font-black leading-tight text-[#07111f] sm:text-4xl">
                  {text.rules.title}
                </h2>
                <p className="mt-4 text-base font-semibold leading-7 text-slate-600 sm:text-lg">
                  {text.rules.text}
                </p>
                <a
                  href={whatsappUrl(text.rules.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[#07111f] px-6 py-4 text-center text-base font-black text-white shadow-lg shadow-slate-900/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[#d4146f] sm:w-auto"
                >
                  {text.rules.button}
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {text.rules.items.map((rule) => (
                  <article key={rule.title} className="rounded-[22px] border border-[#f1e6d4] bg-[#fffaf0] p-5 shadow-sm shadow-black/5">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d4146f]">
                      {rule.title}
                    </p>
                    <p className="mt-2 text-lg font-black leading-snug text-[#07111f]">
                      {rule.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            id="transfers"
            aria-labelledby="transfers-title"
            className="mt-8 scroll-mt-32 overflow-hidden rounded-[30px] bg-[#07111f] text-white shadow-[0_28px_80px_rgba(7,17,31,0.22)] lg:scroll-mt-24"
          >
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[260px] overflow-hidden lg:min-h-full">
                <Image
                  src="/guest-essentials/airport-transfer.png"
                  alt={text.transfer.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  quality={75}
                  className="object-cover"
                  style={{ objectPosition: "58% 50%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07111f]/15 via-transparent to-[#07111f]/55 lg:bg-gradient-to-r" />
                <div className="absolute left-5 top-5 rounded-full bg-white/92 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#d4146f] shadow-sm backdrop-blur">
                  {text.transfer.price}
                </div>
              </div>

              <div className="p-5 sm:p-7 lg:p-8">
                <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#ffd21f] ring-1 ring-white/10">
                  {text.transfer.label}
                </span>
                <h2 id="transfers-title" className="mt-5 text-2xl font-black leading-tight sm:text-4xl">
                  {text.transfer.title}
                </h2>
                <p className="mt-4 text-base font-semibold leading-7 text-white/72 sm:text-lg">
                  {text.transfer.text}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {text.transfer.highlights.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-black leading-5 text-white/88">
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <a href={whatsappUrl(text.transfer.message)} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-[#25D366] px-5 py-4 text-center text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:brightness-110">
                    WhatsApp
                  </a>
                  <a href={"viber://chat?number=%2B" + contactPhone.slice(1)} className="rounded-2xl bg-[#7360F2] px-5 py-4 text-center text-sm font-black text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:brightness-110">
                    Viber
                  </a>
                  <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-[#229ED9] px-5 py-4 text-center text-sm font-black text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:brightness-110">
                    Telegram
                  </a>
                  <a href={"tel:" + contactPhone} className="rounded-2xl bg-white px-5 py-4 text-center text-sm font-black text-[#07111f] shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-[#ffd21f]">
                    {text.callButton} {displayPhone}
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section
            id="why-us"
            aria-labelledby="why-us-title"
            className="mt-8 scroll-mt-32 rounded-[30px] border border-[#f0dfbf] bg-[#fffefb] p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-7 lg:scroll-mt-24 lg:p-8"
          >
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full bg-[#d4146f]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#d4146f]">
                {text.why.label}
              </span>
              <h2 id="why-us-title" className="mt-5 text-2xl font-black leading-tight text-[#07111f] sm:text-4xl">
                {text.why.title}
              </h2>
              <p className="mt-4 text-base font-semibold leading-7 text-slate-600 sm:text-lg">
                {text.why.text}
              </p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {text.why.items.map((item) => (
                <article key={item.title} className="rounded-[24px] border border-[#f1e6d4] bg-white p-5 shadow-sm shadow-black/5">
                  <h3 className="text-lg font-black text-[#07111f]">{item.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{item.text}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
