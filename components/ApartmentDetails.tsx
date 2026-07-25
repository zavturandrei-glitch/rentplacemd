"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import ResponsiveImage from "@/components/ResponsiveImage";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import { useLanguage } from "@/context/LanguageContext";
import { type Language } from "@/locales/translations";
import { getApartmentBookedDates } from "@/lib/availability";
import { apartmentFaqByLanguage } from "@/lib/apartmentFaq";
import {
  formatLocalizedImageAlt,
  getApartmentDisplayAddress,
  getApartmentLocalization,
} from "@/lib/apartmentLocalization";
import {
  activeApartments,
  getApartmentCatalogPrice,
  getApartmentCategoryPath,
  getApartmentPath,
  type ApartmentClass,
} from "@/lib/apartments";

export type ApartmentKind = "studio" | "oneBedroom" | "twoBedroom" | "twoBedroomPlus";
export type ApartmentGuests = 2 | 3 | 4 | 5;

export type ApartmentDetailsData = {
  id: string | number;
  title: string;
  address: string;
  price: number;
  images: string[];
  kind: ApartmentKind;
  class: ApartmentClass;
  guests: ApartmentGuests | null;
  heroPosition?: string;
  facadePhoto?: string | null;
  displayKind?: string;
  displayOverlay?: string;
  intro?: string;
  aboutTitle?: string;
  descriptionParagraphs?: string[];
  features?: string[];
  galleryLayout?: "standard" | "extended";
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
  rulesLabel: string;
  rulesTitle: string;
  rulesCheckInLabel: string;
  rulesCheckInTime: string;
  rulesCheckOutLabel: string;
  rulesCheckOutTime: string;
  rulesIntro: string;
  rulesItems: string[];
  content: {
    whyTitle: string;
    fitTitle: string;
    nearbyTitle: string;
    trustTitle: string;
    faqTitle: string;
    relatedTitle: string;
    relatedText: string;
    relatedGuests: string;
    relatedPrice: string;
    nearbyFallback: string;
    faq: Array<{ question: string; answer: string }>;
    valuePhrases: Record<string, string>;
    audiencePhrases: Record<string, string>;
    nearbyPhrases: Record<string, string>;
    trustPhrases: string[];
  };
  kinds: Record<ApartmentKind, string>;
  guests: Record<ApartmentGuests, string>;
  overlay: Record<ApartmentKind, string>;
  intro: Record<ApartmentKind, string>;
  aboutTitle: Record<ApartmentKind, string>;
  aboutFirst: Record<ApartmentKind, string>;
  aboutSecond: Record<ApartmentKind, string>;
  features: Record<ApartmentKind, string[]>;
};

export type ApartmentLocalizedSeoPayload = Record<
  Language,
  { title: string; description: string; jsonLd: unknown }
>;

const apartmentPageContentText: Record<Language, DetailText["content"]> = {
  ru: {
    whyTitle: "Оснащение квартиры",
    fitTitle: "Кому подойдёт эта квартира",
    nearbyTitle: "Что находится рядом",
    trustTitle: "Почему RentPlaceMD можно доверять",
    faqTitle: "Вопросы гостей",
    relatedTitle: "Похожие варианты",
    relatedText: "Другие квартиры RentPlaceMD с похожей вместимостью, уровнем комфорта или ценой.",
    relatedGuests: "гостей",
    relatedPrice: "лей / сутки",
    nearbyFallback: "Точная инфраструктура вокруг дома уточняется перед заселением, чтобы не обещать гостю неподтверждённые объекты.",
    faq: [
      { question: "Во сколько заселение?", answer: "Стандартное заселение с 14:00. Ранний заезд можно согласовать заранее, если квартира свободна." },
      { question: "Есть ли Wi-Fi и кухня?", answer: "Да, в квартире есть Wi-Fi, TV, кондиционер и кухня или мини-кухня для повседневного проживания." },
      { question: "Можно ли поздний заезд?", answer: "Да, поздний заезд возможен по предварительной договорённости. Связь с RentPlaceMD доступна 24/7." },
      { question: "Можно ли заказать трансфер?", answer: "Да, можно заранее уточнить трансфер из аэропорта Кишинёва прямо к адресу проживания." },
    ],
    valuePhrases: {
      studio: "Компактная студия удобна, когда нужны чистая спальная зона, кухня и быстрый доступ к центру.",
      oneBedroom: "Отдельная спальня и зона отдыха помогают комфортно разделить сон, работу и короткий отдых.",
      twoBedroom: "Две спальни дают больше приватности для семьи, друзей или гостей, которым важно спать отдельно.",
      twoBedroomPlus: "Планировка 2+1 удобна для семьи или небольшой компании: есть отдельные спальни и общая зона.",
      standardPlus: "Формат Standard+ лучше подходит гостям, которые хотят более свежий интерьер и аккуратный визуальный уровень.",
      standard: "Практичный стандартный вариант для поездки на несколько дней без переплаты за лишние опции.",
      economy: "Хороший выбор, когда важны расположение, базовый комфорт и разумная стоимость проживания.",
      twoGuests: "Оптимально для одного гостя или пары: пространство не перегружено, всё нужное под рукой.",
      family: "Подходит для семьи или гостей, которым нужны дополнительные спальные места.",
      kitchen: "Кухня помогает не зависеть от кафе: можно приготовить завтрак, разогреть еду или поработать за столом.",
      checkin: "Заселение 24/7 по договорённости удобно при позднем прилёте или плотном графике.",
    },
    audiencePhrases: {
      couple: "парам, которым нужна аккуратная квартира в центре",
      business: "командировочным гостям, которым важны Wi-Fi, быстрый ответ и понятное заселение",
      solo: "одному гостю на несколько дней в Кишинёве",
      family: "семье или небольшой компании, которым нужны дополнительные спальные места",
      medical: "гостям, приезжающим в город по делам, на лечение или к родственникам",
      transit: "тем, кто прилетает поздно и хочет заранее согласовать трансфер и заселение",
    },
    nearbyPhrases: {
      center: "центральная часть Кишинёва и комплекс Измаил 88",
      shops: "магазины и повседневные сервисы рядом с районом проживания",
      transport: "городской транспорт и удобный выезд по центральным улицам",
      parking: "парковка рядом с домом по ситуации на месте",
      airport: "возможность заказать трансфер из аэропорта Кишинёва",
    },
    trustPhrases: [
      "Реальные фотографии конкретной квартиры, а не случайная интерьерная подборка.",
      "На странице заранее видны ID, цена, вместимость, правила проживания и способы связи.",
      "Поддержка доступна в WhatsApp, Viber, Telegram и по телефону.",
      "Детали проживания уточняются до приезда, без посредников и лишних шагов.",
    ],
  },
  ro: {
    whyTitle: "Dotările apartamentului",
    fitTitle: "Pentru cine este potrivit",
    nearbyTitle: "Ce este in apropiere",
    trustTitle: "De ce puteti avea incredere in RentPlaceMD",
    faqTitle: "Intrebari frecvente",
    relatedTitle: "Optiuni similare",
    relatedText: "Alte apartamente RentPlaceMD cu capacitate, confort sau pret apropiat.",
    relatedGuests: "oaspeti",
    relatedPrice: "lei / zi",
    nearbyFallback: "Infrastructura exacta din jur se confirma inainte de cazare, ca sa nu promitem obiecte neverificate.",
    faq: [
      { question: "La ce ora este check-in?", answer: "Check-in standard de la 14:00. Check-in mai devreme se poate coordona daca apartamentul este liber." },
      { question: "Exista Wi-Fi si bucatarie?", answer: "Da, apartamentul are Wi-Fi, TV, aer conditionat si bucatarie sau mini-bucatarie." },
      { question: "Este posibil check-in tarziu?", answer: "Da, check-in tarziu este posibil cu acord prealabil. Contactul RentPlaceMD este disponibil 24/7." },
      { question: "Pot comanda transfer?", answer: "Da, puteti coordona din timp transferul de la aeroportul Chisinau la adresa." },
    ],
    valuePhrases: {
      studio: "Studio compact, util cand aveti nevoie de zona de dormit curata, bucatarie si acces rapid spre centru.",
      oneBedroom: "Dormitorul separat si zona de relaxare ajuta la impartirea confortabila a somnului, lucrului si odihnei.",
      twoBedroom: "Doua dormitoare ofera mai multa intimitate pentru familie sau oaspeti care vor sa doarma separat.",
      twoBedroomPlus: "Planul 2+1 este comod pentru familie sau grup mic: dormitoare separate si zona comuna.",
      standardPlus: "Formatul Standard+ este potrivit pentru oaspeti care prefera interior mai nou si prezentare ingrijita.",
      standard: "Optiune practica pentru cateva zile, fara costuri inutile.",
      economy: "Alegere buna cand conteaza locatia, confortul de baza si pretul rezonabil.",
      twoGuests: "Optim pentru un oaspete sau un cuplu: spatiu clar si tot ce trebuie la indemana.",
      family: "Potrivit pentru familie sau oaspeti care au nevoie de locuri suplimentare de dormit.",
      kitchen: "Bucataria ajuta la micul dejun, incalzirea mancarii sau lucru linistit la masa.",
      checkin: "Cazarea 24/7 cu acord prealabil este comoda pentru sosiri tarzii.",
    },
    audiencePhrases: {
      couple: "cupluri care cauta un apartament ingrijit in centru",
      business: "oaspeti in deplasare care au nevoie de Wi-Fi si check-in clar",
      solo: "un oaspete pentru cateva zile in Chisinau",
      family: "familie sau grup mic care are nevoie de locuri suplimentare",
      medical: "oaspeti veniti in oras pentru treburi, tratament sau rude",
      transit: "oaspeti care ajung tarziu si vor transfer sau cazare coordonata",
    },
    nearbyPhrases: {
      center: "zona centrala a Chisinaului si complexul Ismail 88",
      shops: "magazine si servicii zilnice in zona",
      transport: "transport urban si iesire comoda pe strazile centrale",
      parking: "parcare in apropiere, in functie de disponibilitatea de la fata locului",
      airport: "posibilitate de transfer de la aeroportul Chisinau",
    },
    trustPhrases: [
      "Fotografii reale ale apartamentului concret.",
      "ID-ul, pretul, capacitatea, regulile si contactele sunt vizibile inainte de rezervare.",
      "Suport prin WhatsApp, Viber, Telegram si telefon.",
      "Detaliile de cazare se clarifica inainte de sosire, fara intermediari.",
    ],
  },
  en: {
    whyTitle: "Apartment amenities",
    fitTitle: "Who this apartment suits",
    nearbyTitle: "What is nearby",
    trustTitle: "Why RentPlaceMD is trustworthy",
    faqTitle: "Guest questions",
    relatedTitle: "Similar options",
    relatedText: "Other RentPlaceMD apartments with similar capacity, comfort level or price.",
    relatedGuests: "guests",
    relatedPrice: "MDL / day",
    nearbyFallback: "Exact nearby infrastructure is confirmed before check-in, so guests are not promised unverified places.",
    faq: [
      { question: "What time is check-in?", answer: "Standard check-in starts at 14:00. Earlier check-in can be discussed if the apartment is free." },
      { question: "Is there Wi-Fi and a kitchen?", answer: "Yes, the apartment has Wi-Fi, TV, air conditioning and a kitchen or kitchenette." },
      { question: "Is late check-in possible?", answer: "Yes, late check-in is possible by prior arrangement. RentPlaceMD contact is available 24/7." },
      { question: "Can I order a transfer?", answer: "Yes, airport transfer from Chisinau airport to the address can be arranged in advance." },
    ],
    valuePhrases: {
      studio: "A compact studio works well when you need a clean sleeping area, kitchen and quick access to the center.",
      oneBedroom: "A separate bedroom and sitting area make it easier to separate sleep, work and rest during the trip.",
      twoBedroom: "Two bedrooms give more privacy for a family, friends or guests who prefer separate sleeping places.",
      twoBedroomPlus: "The 2+1 layout is convenient for a family or small group, with bedrooms and a shared area.",
      standardPlus: "Standard+ suits guests who prefer a fresher interior and a more polished visual standard.",
      standard: "A practical standard option for a few days without paying for extras you may not need.",
      economy: "A good choice when location, basic comfort and reasonable cost matter most.",
      twoGuests: "Best for one guest or a couple: simple space with everything close at hand.",
      family: "Suitable for a family or guests who need additional sleeping places.",
      kitchen: "The kitchen helps with breakfast, reheating food or working quietly at the table.",
      checkin: "24/7 check-in by arrangement is useful for late arrivals or a tight schedule.",
    },
    audiencePhrases: {
      couple: "couples looking for a tidy central apartment",
      business: "business travelers who need Wi-Fi, quick replies and clear check-in",
      solo: "one guest staying in Chisinau for a few days",
      family: "a family or small group needing extra sleeping places",
      medical: "guests visiting the city for errands, treatment or relatives",
      transit: "late-arriving guests who want transfer and check-in arranged in advance",
    },
    nearbyPhrases: {
      center: "central Chisinau and the Ismail 88 complex",
      shops: "shops and daily services in the area",
      transport: "city transport and convenient access to central streets",
      parking: "nearby parking depending on availability on site",
      airport: "airport transfer from Chisinau airport can be arranged",
    },
    trustPhrases: [
      "Real photos of the specific apartment, not generic interior sets.",
      "Guests see the ID, price, capacity, rules and contact options in advance.",
      "Support is available via WhatsApp, Viber, Telegram and phone.",
      "Stay details are clarified before arrival, directly and without middlemen.",
    ],
  },
  uk: {
    whyTitle: "Оснащення квартири",
    fitTitle: "Кому підійде ця квартира",
    nearbyTitle: "Що знаходиться поруч",
    trustTitle: "Чому RentPlaceMD можна довіряти",
    faqTitle: "Питання гостей",
    relatedTitle: "Схожі варіанти",
    relatedText: "Інші квартири RentPlaceMD зі схожою місткістю, рівнем комфорту або ціною.",
    relatedGuests: "гостей",
    relatedPrice: "лей / доба",
    nearbyFallback: "Точна інфраструктура навколо будинку уточнюється перед заселенням, щоб не обіцяти неперевірені об'єкти.",
    faq: [
      { question: "О котрій заселення?", answer: "Стандартне заселення з 14:00. Ранній заїзд можна узгодити заздалегідь, якщо квартира вільна." },
      { question: "Є Wi-Fi і кухня?", answer: "Так, у квартирі є Wi-Fi, TV, кондиціонер і кухня або міні-кухня." },
      { question: "Можливий пізній заїзд?", answer: "Так, пізній заїзд можливий за попередньою домовленістю. Зв'язок з RentPlaceMD доступний 24/7." },
      { question: "Можна замовити трансфер?", answer: "Так, можна заздалегідь уточнити трансфер з аеропорту Кишинева до адреси проживання." },
    ],
    valuePhrases: {
      studio: "Компактна студія зручна, коли потрібні чиста спальна зона, кухня і швидкий доступ до центру.",
      oneBedroom: "Окрема спальня і зона відпочинку допомагають розділити сон, роботу і короткий відпочинок.",
      twoBedroom: "Дві спальні дають більше приватності для сім'ї або гостей, яким важливо спати окремо.",
      twoBedroomPlus: "Планування 2+1 зручне для сім'ї або невеликої компанії: є спальні й спільна зона.",
      standardPlus: "Формат Standard+ підходить гостям, які хочуть свіжіший інтер'єр і охайний візуальний рівень.",
      standard: "Практичний стандартний варіант для кількох днів без переплати за зайві опції.",
      economy: "Хороший вибір, коли важливі розташування, базовий комфорт і розумна ціна.",
      twoGuests: "Оптимально для одного гостя або пари: простір не перевантажений, усе потрібне поруч.",
      family: "Підійде для сім'ї або гостей, яким потрібні додаткові спальні місця.",
      kitchen: "Кухня допомагає приготувати сніданок, розігріти їжу або спокійно попрацювати за столом.",
      checkin: "Заселення 24/7 за домовленістю зручне при пізньому прильоті або щільному графіку.",
    },
    audiencePhrases: {
      couple: "парам, яким потрібна охайна квартира в центрі",
      business: "гостям у відрядженні, яким важливі Wi-Fi, швидка відповідь і зрозуміле заселення",
      solo: "одному гостю на кілька днів у Кишиневі",
      family: "сім'ї або невеликій компанії, яким потрібні додаткові спальні місця",
      medical: "гостям, які приїжджають у місто у справах, на лікування або до родичів",
      transit: "тим, хто прилітає пізно і хоче заздалегідь узгодити трансфер та заселення",
    },
    nearbyPhrases: {
      center: "центральна частина Кишинева і комплекс Ізмаїл 88",
      shops: "магазини та повсякденні сервіси в районі проживання",
      transport: "міський транспорт і зручний виїзд центральними вулицями",
      parking: "парковка поруч з будинком залежно від ситуації на місці",
      airport: "можливість замовити трансфер з аеропорту Кишинева",
    },
    trustPhrases: [
      "Реальні фотографії конкретної квартири, а не випадкова добірка інтер'єрів.",
      "Гість заздалегідь бачить ID, ціну, місткість, правила і способи зв'язку.",
      "Підтримка доступна в WhatsApp, Viber, Telegram і телефоном.",
      "Деталі проживання уточнюються до приїзду, без посередників.",
    ],
  },
  cs: {
    whyTitle: "Vybavení apartmánu",
    fitTitle: "Pro koho se apartman hodi",
    nearbyTitle: "Co je pobliz",
    trustTitle: "Proc duverovat RentPlaceMD",
    faqTitle: "Otazky hostu",
    relatedTitle: "Podobne moznosti",
    relatedText: "Dalsi apartmany RentPlaceMD s podobnou kapacitou, komfortem nebo cenou.",
    relatedGuests: "hostu",
    relatedPrice: "lei / den",
    nearbyFallback: "Presna infrastruktura v okoli se potvrzuje pred ubytovanim, abychom neslibovali neoverena mista.",
    faq: [
      { question: "V kolik je check-in?", answer: "Standardni check-in je od 14:00. Drivejsi prijezd lze domluvit, pokud je apartman volny." },
      { question: "Je k dispozici Wi-Fi a kuchyn?", answer: "Ano, apartman ma Wi-Fi, TV, klimatizaci a kuchyn nebo mini-kuchyn." },
      { question: "Je mozny pozdni prijezd?", answer: "Ano, pozdni prijezd je mozny po predchozi domluve. Kontakt RentPlaceMD je dostupny 24/7." },
      { question: "Lze objednat transfer?", answer: "Ano, transfer z letiste Chisinau na adresu lze domluvit predem." },
    ],
    valuePhrases: {
      studio: "Kompaktni studio se hodi, kdyz potrebujete cistou spaci zonu, kuchyn a rychly pristup do centra.",
      oneBedroom: "Samostatna loznice a odpocinkova zona pomahaji oddelit spanek, praci a kratky odpocinek.",
      twoBedroom: "Dve loznice davaji vice soukromi pro rodinu nebo hosty, kteri chteji spat oddelene.",
      twoBedroomPlus: "Dispozice 2+1 je prakticka pro rodinu nebo malou skupinu: loznice a spolecna zona.",
      standardPlus: "Standard+ se hodi pro hosty, kteri preferuji novejsi interier a upraveny vizualni standard.",
      standard: "Prakticka standardni moznost na nekolik dni bez placeni za zbytecne doplnky.",
      economy: "Dobra volba, kdyz je dulezita poloha, zakladni komfort a rozumna cena.",
      twoGuests: "Optimalni pro jednoho hosta nebo par: prostor neni preplneny a vse je po ruce.",
      family: "Vhodne pro rodinu nebo hosty, kteri potrebuji dalsi mista na spani.",
      kitchen: "Kuchyn pomuze se snidani, ohrevem jidla nebo klidnou praci u stolu.",
      checkin: "Ubytovani 24/7 po domluve je prakticke pri pozdnim priletu nebo nabitem programu.",
    },
    audiencePhrases: {
      couple: "parum, ktere hledaji upraveny apartman v centru",
      business: "hostum na pracovni ceste, kteri potrebuji Wi-Fi a jasny check-in",
      solo: "jednomu hostovi na nekolik dni v Chisinau",
      family: "rodine nebo male skupine, ktera potrebuje dalsi mista na spani",
      medical: "hostum, kteri prijizdeji kvuli zalezitostem, lecbe nebo rodine",
      transit: "hostum s pozdnim priletem, kteri chteji transfer a check-in domluvit predem",
    },
    nearbyPhrases: {
      center: "centralni cast Chisinau a komplex Ismail 88",
      shops: "obchody a kazdodenni sluzby v oblasti",
      transport: "mestska doprava a pohodlny vyjezd na centralni ulice",
      parking: "parkovani pobliz podle situace na miste",
      airport: "moznost objednat transfer z letiste Chisinau",
    },
    trustPhrases: [
      "Realne fotografie konkretniho apartmanu, ne nahodne interierove sety.",
      "Host predem vidi ID, cenu, kapacitu, pravidla a kontaktni moznosti.",
      "Podpora je dostupna pres WhatsApp, Viber, Telegram a telefon.",
      "Detaily pobytu se upresnuji pred prijezdem, primo a bez prostredniku.",
    ],
  },
};

const detailText: Record<Language, DetailText> = {
  ru: {
    brandSubtitle: "Квартиры посуточно в Кишинёве",
    addressTitle: "Измаил 88",
    back: "Назад ко всем квартирам",
    call: "Позвонить",
    checkAvailability: "Проверить даты",
    whatsappMessage: "Здравствуйте! Интересует квартира по адресу {address}, ID {id}",
    priceSuffix: "лей / сутки",
    photo: "Фото",
    galleryTitle: "Галерея квартиры",
    mainPhotoAlt: "Главное фото ID {id}",
    galleryPhotoAlt: "Фото квартиры ID {id} {index}",
    facadeAlt: "Фасад дома по адресу {address}",
    aboutLabel: "О квартире",
    bookingLabel: "Бронирование",
    bookingNote: "Напишите даты и количество гостей - быстро проверим свободна ли квартира.",
    footerText: "Квартиры посуточно в Кишинёве • Центр • Заселение 24/7",
    rulesLabel: "Правила проживания",
    rulesTitle: "Правила проживания",
    rulesCheckInLabel: "Заезд",
    rulesCheckInTime: "с 14:00",
    rulesCheckOutLabel: "Выезд",
    rulesCheckOutTime: "до 12:00",
    rulesIntro: "Если нужен ранний заезд или поздний выезд — сообщите заранее. Если квартира свободна, мы постараемся пойти навстречу.",
    rulesItems: ["Заселение по документу", "Курение только на балконе или в разрешённых местах", "Чистое постельное бельё и полотенца", "Связь 24/7", "Оплата при заселении"],
    content: apartmentPageContentText.ru,
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
    whatsappMessage: "Bună ziua! Mă interesează apartamentul de pe {address}, ID {id}",
    priceSuffix: "lei / zi",
    photo: "Foto",
    galleryTitle: "Galeria apartamentului",
    mainPhotoAlt: "Foto principală ID {id}",
    galleryPhotoAlt: "Foto apartament ID {id} {index}",
    facadeAlt: "Fațada blocului de pe {address}",
    aboutLabel: "Despre apartament",
    bookingLabel: "Rezervare",
    bookingNote: "Scrieți datele și numărul de oaspeți - verificăm rapid disponibilitatea.",
    footerText: "Apartamente în chirie pe zi în Chișinău • Centru • Cazare 24/7",
    rulesLabel: "Reguli de ședere",
    rulesTitle: "Reguli de ședere",
    rulesCheckInLabel: "Check-in",
    rulesCheckInTime: "de la 14:00",
    rulesCheckOutLabel: "Check-out",
    rulesCheckOutTime: "până la 12:00",
    rulesIntro: "Dacă aveți nevoie de check-in mai devreme sau check-out mai târziu, anunțați-ne din timp. Dacă apartamentul este liber, încercăm să vă ajutăm.",
    rulesItems: ["Cazare pe baza unui document", "Fumatul doar pe balcon sau în locuri permise", "Lenjerie de pat și prosoape curate", "Contact 24/7", "Plata la cazare"],
    content: apartmentPageContentText.ro,
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
    whatsappMessage: "Hello! I am interested in the apartment at {address}, ID {id}",
    priceSuffix: "MDL / night",
    photo: "Photos",
    galleryTitle: "Apartment gallery",
    mainPhotoAlt: "Main photo ID {id}",
    galleryPhotoAlt: "Apartment photo ID {id} {index}",
    facadeAlt: "Building facade at {address}",
    aboutLabel: "About the apartment",
    bookingLabel: "Booking",
    bookingNote: "Send your dates and number of guests - we will quickly check availability.",
    footerText: "Daily apartments in Chisinau • Center • 24/7 check-in",
    rulesLabel: "House rules",
    rulesTitle: "House rules",
    rulesCheckInLabel: "Check-in",
    rulesCheckInTime: "from 14:00",
    rulesCheckOutLabel: "Check-out",
    rulesCheckOutTime: "by 12:00",
    rulesIntro: "If you need early check-in or late check-out, please tell us in advance. If the apartment is free, we will try to help.",
    rulesItems: ["Check-in with an identity document", "Smoking only on the balcony or in permitted areas", "Clean bed linen and towels", "24/7 contact", "Payment at check-in"],
    content: apartmentPageContentText.en,
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
    checkAvailability: "Перевірити дати",
    whatsappMessage: "Добрий день! Цікавить квартира за адресою {address}, ID {id}",
    priceSuffix: "лей / доба",
    photo: "Фото",
    galleryTitle: "Галерея квартири",
    mainPhotoAlt: "Головне фото ID {id}",
    galleryPhotoAlt: "Фото квартири ID {id} {index}",
    facadeAlt: "Фасад будинку за адресою {address}",
    aboutLabel: "Про квартиру",
    bookingLabel: "Бронювання",
    bookingNote: "Напишіть дати та кількість гостей - швидко перевіримо, чи квартира вільна.",
    footerText: "Квартири подобово в Кишиневі • Центр • Заселення 24/7",
    rulesLabel: "Правила проживання",
    rulesTitle: "Правила проживання",
    rulesCheckInLabel: "Заїзд",
    rulesCheckInTime: "з 14:00",
    rulesCheckOutLabel: "Виїзд",
    rulesCheckOutTime: "до 12:00",
    rulesIntro: "Якщо потрібен ранній заїзд або пізній виїзд, повідомте заздалегідь. Якщо квартира вільна, ми постараємося піти назустріч.",
    rulesItems: ["Заселення за документом", "Куріння тільки на балконі або в дозволених місцях", "Чиста постільна білизна та рушники", "Звʼязок 24/7", "Оплата при заселенні"],
    content: apartmentPageContentText.uk,
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
    whatsappMessage: "Dobrý den! Mám zájem o apartmán na adrese {address}, ID {id}",
    priceSuffix: "lei / noc",
    photo: "Foto",
    galleryTitle: "Galerie apartmánu",
    mainPhotoAlt: "Hlavní foto ID {id}",
    galleryPhotoAlt: "Foto apartmánu ID {id} {index}",
    facadeAlt: "Fasáda domu na adrese {address}",
    aboutLabel: "O apartmánu",
    bookingLabel: "Rezervace",
    bookingNote: "Napište termíny a počet hostů - rychle ověříme dostupnost.",
    footerText: "Apartmány na den v Kišiněvě • Centrum • Ubytování 24/7",
    rulesLabel: "Pravidla pobytu",
    rulesTitle: "Pravidla pobytu",
    rulesCheckInLabel: "Check-in",
    rulesCheckInTime: "od 14:00",
    rulesCheckOutLabel: "Check-out",
    rulesCheckOutTime: "do 12:00",
    rulesIntro: "Pokud potřebujete dřívější příjezd nebo pozdější odjezd, dejte nám vědět předem. Pokud je apartmán volný, pokusíme se vyjít vstříc.",
    rulesItems: ["Ubytování po předložení dokladu", "Kouření pouze na balkoně nebo na povolených místech", "Čisté ložní prádlo a ručníky", "Kontakt 24/7", "Platba při příjezdu"],
    content: apartmentPageContentText.cs,
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

type ApartmentContentProfile = {
  valueKeys: string[];
  audienceKeys: string[];
  nearbyKeys: string[];
};

const apartmentContentProfiles: Record<string, ApartmentContentProfile> = {
  1: { valueKeys: ["twoBedroomPlus", "standardPlus", "family", "kitchen", "checkin"], audienceKeys: ["family", "business", "medical", "transit"], nearbyKeys: ["center", "shops", "transport", "parking", "airport"] },
  3: { valueKeys: ["studio", "standardPlus", "twoGuests", "kitchen", "checkin"], audienceKeys: ["couple", "business", "solo", "transit"], nearbyKeys: ["center", "shops", "transport", "airport"] },
  5: { valueKeys: ["studio", "standardPlus", "twoGuests", "kitchen", "checkin"], audienceKeys: ["couple", "solo", "business", "medical"], nearbyKeys: ["center", "shops", "transport", "parking"] },
  7: { valueKeys: ["studio", "standardPlus", "twoGuests", "kitchen", "checkin"], audienceKeys: ["couple", "business", "transit", "solo"], nearbyKeys: ["center", "transport", "shops", "airport"] },
  8: { valueKeys: ["studio", "standardPlus", "twoGuests", "kitchen", "checkin"], audienceKeys: ["couple", "solo", "business", "transit"], nearbyKeys: ["center", "shops", "transport", "airport"] },
  9: { valueKeys: ["studio", "standardPlus", "twoGuests", "kitchen", "checkin"], audienceKeys: ["business", "couple", "solo", "medical"], nearbyKeys: ["center", "transport", "shops", "parking"] },
  10: { valueKeys: ["oneBedroom", "standard", "family", "kitchen", "checkin"], audienceKeys: ["family", "business", "medical", "transit"], nearbyKeys: ["center", "shops", "transport", "airport"] },
  11: { valueKeys: ["studio", "standard", "twoGuests", "kitchen", "checkin"], audienceKeys: ["solo", "couple", "business", "medical"], nearbyKeys: ["center", "shops", "transport"] },
  12: { valueKeys: ["oneBedroom", "standard", "family", "kitchen", "checkin"], audienceKeys: ["couple", "family", "business", "medical"], nearbyKeys: ["center", "shops", "transport", "parking"] },
  13: { valueKeys: ["twoBedroom", "economy", "family", "kitchen", "checkin"], audienceKeys: ["family", "business", "medical", "transit"], nearbyKeys: ["center", "shops", "transport", "airport"] },
  14: { valueKeys: ["studio", "standardPlus", "twoGuests", "kitchen", "checkin"], audienceKeys: ["couple", "solo", "business", "transit"], nearbyKeys: ["center", "transport", "shops", "airport"] },
  20: { valueKeys: ["oneBedroom", "economy", "family", "kitchen", "checkin"], audienceKeys: ["family", "medical", "business", "transit"], nearbyKeys: ["center", "shops", "transport", "parking"] },
  21: { valueKeys: ["oneBedroom", "economy", "family", "kitchen", "checkin"], audienceKeys: ["couple", "family", "medical", "business"], nearbyKeys: ["center", "shops", "transport"] },
  22: { valueKeys: ["studio", "standard", "twoGuests", "kitchen", "checkin"], audienceKeys: ["solo", "couple", "business", "transit"], nearbyKeys: ["center", "transport", "airport"] },
  23: { valueKeys: ["studio", "standard", "twoGuests", "kitchen", "checkin"], audienceKeys: ["business", "solo", "couple", "medical"], nearbyKeys: ["center", "shops", "transport", "parking"] },
  37: { valueKeys: ["oneBedroom", "economy", "family", "kitchen", "checkin"], audienceKeys: ["family", "business", "medical", "transit"], nearbyKeys: ["center", "shops", "transport", "parking"] },
  38: { valueKeys: ["oneBedroom", "economy", "family", "kitchen", "checkin"], audienceKeys: ["couple", "family", "business", "medical"], nearbyKeys: ["center", "shops", "transport"] },
  42: { valueKeys: ["twoBedroomPlus", "standard", "family", "kitchen", "checkin"], audienceKeys: ["family", "business", "medical", "transit"], nearbyKeys: ["center", "shops", "transport", "parking", "airport"] },
  110: { valueKeys: ["studio", "standardPlus", "twoGuests", "kitchen", "checkin"], audienceKeys: ["business", "couple", "solo", "transit"], nearbyKeys: ["center", "transport", "shops", "airport"] },
  111: { valueKeys: ["studio", "standardPlus", "twoGuests", "kitchen", "checkin"], audienceKeys: ["couple", "solo", "business", "medical"], nearbyKeys: ["center", "shops", "transport", "parking"] },
  112: { valueKeys: ["studio", "standardPlus", "twoGuests", "kitchen", "checkin"], audienceKeys: ["solo", "couple", "business", "transit"], nearbyKeys: ["center", "shops", "transport", "airport"] },
  371: { valueKeys: ["studio", "standard", "twoGuests", "kitchen", "checkin"], audienceKeys: ["couple", "solo", "medical", "business"], nearbyKeys: ["center", "shops", "transport", "parking"] },
};

function resolvePhrases(keys: string[], dictionary: Record<string, string>) {
  return keys.map((key) => dictionary[key]).filter(Boolean);
}

function replaceApartmentLocation(
  value: string,
  apartment: ApartmentDetailsData,
  displayAddress: string,
) {
  if (apartment.id !== 67) {
    return value;
  }

  return value.replace(/Измаил 88|Ізмаїл 88|Ismail 88|Grigore Ureche 67|Григоре Уреке, 67|Грігоре Уреке, 67/g, displayAddress);
}

function getRelatedApartments(apartment: ApartmentDetailsData) {
  const apartmentArea = String(apartment.id) === "6" ? "botanica" : "center";

  return activeApartments
    .filter((candidate) => candidate.id !== apartment.id)
    .map((candidate) => {
      const candidateArea = String(candidate.id) === "6" ? "botanica" : "center";
      const priceDifference = Math.abs(getApartmentCatalogPrice(candidate) - getApartmentCatalogPrice(apartment));
      const score =
        (candidate.class === apartment.class ? 10 : 0) +
        (apartment.guests !== null && candidate.guests === apartment.guests ? 7 : 0) +
        (candidate.kind === apartment.kind ? 5 : 0) +
        (candidateArea === apartmentArea ? 4 : 0) +
        (priceDifference === 0 ? 5 : priceDifference <= 100 ? 3 : priceDifference <= 200 ? 1 : 0);

      return { apartment: candidate, score };
    })
    .sort((left, right) => right.score - left.score || Math.abs(getApartmentCatalogPrice(left.apartment) - getApartmentCatalogPrice(apartment)) - Math.abs(getApartmentCatalogPrice(right.apartment) - getApartmentCatalogPrice(apartment)))
    .slice(0, 3)
    .map(({ apartment: candidate }) => candidate);
}

export default function ApartmentDetails({
  apartment,
  localizedSeo,
}: {
  apartment: ApartmentDetailsData;
  localizedSeo?: ApartmentLocalizedSeoPayload;
}) {
  const { language } = useLanguage();
  const text = detailText[language];
  const localizedApartment = getApartmentLocalization(apartment.id, language);
  const facadePhoto = apartment.facadePhoto;
  const locationTitle = getApartmentDisplayAddress(apartment.id, apartment.title, language);
  const facadeAlt = format(text.facadeAlt, { address: locationTitle });
  const mainPhotoAlt = localizedApartment
    ? formatLocalizedImageAlt(localizedApartment.imageAlt, 1)
    : format(text.mainPhotoAlt, { id: apartment.id }) + " · " + locationTitle;
  const galleryPhotoAlt = useCallback(
    (index: number) =>
      localizedApartment
        ? formatLocalizedImageAlt(localizedApartment.imageAlt, index + 1)
        : format(text.galleryPhotoAlt, { id: apartment.id, index }) + " · " + locationTitle,
    [apartment.id, localizedApartment, locationTitle, text.galleryPhotoAlt],
  );
  const galleryImages = apartment.images.slice(1);
  const whatsappText = format(text.whatsappMessage, {
    id: apartment.id,
    address: locationTitle,
  });
  const whatsappLink = "https://wa.me/37369990190?text=" + encodeURIComponent(whatsappText);
  const heroPosition = apartment.heroPosition ?? "center 45%";
  const bookedDates = getApartmentBookedDates(apartment.id);
  const kindLabel = localizedApartment?.typeLabel ?? apartment.displayKind ?? text.kinds[apartment.kind];
  const intro = localizedApartment?.shortDescription ?? replaceApartmentLocation(apartment.intro ?? text.intro[apartment.kind], apartment, locationTitle);
  const aboutTitle = localizedApartment?.aboutTitle ?? replaceApartmentLocation(apartment.aboutTitle ?? text.aboutTitle[apartment.kind], apartment, locationTitle);
  const features = localizedApartment?.features ?? apartment.features ?? text.features[apartment.kind];
  const contentProfile = apartmentContentProfiles[String(apartment.id)] ?? {
    valueKeys: [apartment.kind, apartment.guests !== null && apartment.guests <= 2 ? "twoGuests" : "family", "kitchen", "checkin"],
    audienceKeys: apartment.guests !== null && apartment.guests <= 2 ? ["couple", "solo", "business"] : ["family", "business", "medical"],
    nearbyKeys: ["center", "shops", "transport"],
  };
  const equipmentItems = Array.from(new Set(features));
  const audienceItems = localizedApartment?.audienceItems ?? (localizedApartment ? [] : resolvePhrases(contentProfile.audienceKeys, text.content.audiencePhrases));
  const nearbyItems = (localizedApartment?.nearbyItems ?? (localizedApartment ? [] : resolvePhrases(contentProfile.nearbyKeys.filter((key) => key !== "airport"), text.content.nearbyPhrases).map((item) => replaceApartmentLocation(item, apartment, locationTitle)))).slice(0, 4);
  const faq = apartmentFaqByLanguage[language].map((item) => ({
    ...item,
    question: replaceApartmentLocation(item.question, apartment, locationTitle),
    answer: replaceApartmentLocation(item.answer, apartment, locationTitle),
  }));
  const relatedApartments = useMemo(() => getRelatedApartments(apartment), [apartment]);
  const categoryPath = getApartmentCategoryPath(apartment.class);
  const categoryLabel = apartment.class === "premium" ? "Premium" : apartment.class === "standardPlus" ? "Standard+" : apartment.class === "standard" ? "Standard" : "Economy";
  const topGalleryImages = galleryImages.slice(0, 4);
  const hiddenGalleryCount = Math.max(0, galleryImages.length + (facadePhoto ? 1 : 0) - topGalleryImages.length);
  const displayedPrice = getApartmentCatalogPrice(apartment);
  const lightboxPhotos = useMemo(
    () => [
      ...apartment.images.map((image, index) => ({
        src: image,
        alt: index === 0 ? mainPhotoAlt : galleryPhotoAlt(index),
      })),
      ...(facadePhoto ? [{ src: facadePhoto, alt: facadeAlt }] : []),
    ],
    [apartment.images, facadeAlt, facadePhoto, galleryPhotoAlt, mainPhotoAlt],
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isLightboxVisible, setIsLightboxVisible] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const pointerStartXRef = useRef<number | null>(null);
  const activeLightboxIndex = lightboxIndex ?? 0;
  const activeLightboxPhoto = lightboxPhotos[activeLightboxIndex] ?? lightboxPhotos[0];

  useEffect(() => {
    const seo = localizedSeo?.[language];
    if (!seo) return;

    const localizedTitle = seo.title + " | RentPlaceMD";
    document.title = localizedTitle;
    const titleObserver = new MutationObserver(() => {
      if (document.title !== localizedTitle) document.title = localizedTitle;
    });
    titleObserver.observe(document.head, { childList: true, characterData: true, subtree: true });

    const updateMeta = (selector: string, content: string) => {
      document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", content);
    };

    updateMeta('meta[name="description"]', seo.description);
    updateMeta('meta[property="og:title"]', seo.title);
    updateMeta('meta[property="og:description"]', seo.description);
    updateMeta('meta[name="twitter:title"]', seo.title);
    updateMeta('meta[name="twitter:description"]', seo.description);

    const jsonLdScript = document.getElementById("apartment-" + apartment.id + "-jsonld");
    if (jsonLdScript) {
      jsonLdScript.textContent = JSON.stringify(seo.jsonLd);
    }

    return () => titleObserver.disconnect();
  }, [apartment.id, language, localizedSeo]);

  const openLightbox = useCallback((index: number) => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setLightboxIndex(index);
    window.setTimeout(() => setIsLightboxVisible(true), 0);
  }, [setIsLightboxVisible, setLightboxIndex]);

  const closeLightbox = useCallback(() => {
    setIsLightboxVisible(false);

    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = window.setTimeout(() => {
      setLightboxIndex(null);
      closeTimeoutRef.current = null;
    }, 260);
  }, [setIsLightboxVisible, setLightboxIndex]);

  const showPreviousPhoto = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null || lightboxPhotos.length === 0) return current;
      return (current - 1 + lightboxPhotos.length) % lightboxPhotos.length;
    });
  }, [lightboxPhotos.length, setLightboxIndex]);

  const showNextPhoto = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null || lightboxPhotos.length === 0) return current;
      return (current + 1) % lightboxPhotos.length;
    });
  }, [lightboxPhotos.length, setLightboxIndex]);

  const handleLightboxPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStartXRef.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleLightboxPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const startX = pointerStartXRef.current;
    const endX = event.clientX;
    pointerStartXRef.current = null;

    if (startX === null) return;

    const distance = endX - startX;
    if (Math.abs(distance) < 48) return;

    if (distance > 0) {
      showPreviousPhoto();
    } else {
      showNextPhoto();
    }
  };

  const handleLightboxPointerCancel = () => {
    pointerStartXRef.current = null;
  };

  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPreviousPhoto();
      if (event.key === "ArrowRight") showNextPhoto();
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeLightbox, lightboxIndex, showNextPhoto, showPreviousPhoto]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#07111f]">
      <Header />
      <BackButton />

      <section className="mx-auto max-w-7xl px-4 pb-36 pt-3 sm:px-6 sm:pt-5 lg:px-8 lg:pb-20">
        <nav aria-label="Breadcrumb" className="mb-5 hidden items-center gap-2 text-sm font-bold text-[#07111f]/55 md:flex">
          <Link href="/apartments" className="transition hover:text-[#d4146f]">{text.back}</Link>
          <span aria-hidden="true">/</span>
          <Link href={categoryPath} className="transition hover:text-[#d4146f]">{categoryLabel}</Link>
          <span aria-hidden="true">/</span>
          <span className="truncate text-[#07111f]">{locationTitle} · ID {apartment.id}</span>
        </nav>

        <article className="overflow-hidden rounded-[24px] bg-[#07111f] shadow-[0_24px_70px_rgba(7,17,31,0.2)] sm:rounded-[30px]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col justify-center p-5 text-white sm:p-8 lg:p-10 xl:p-12">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-black ring-1 ring-white/10">ID {apartment.id}</span>
                <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-black ring-1 ring-white/10">{categoryLabel}</span>
              </div>
              <h1 className="mt-5 text-3xl font-black leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl">{locationTitle}</h1>
              <div className="mt-5 flex flex-wrap gap-2 text-sm font-black text-white/90">
                <span className="rounded-xl bg-white/[0.08] px-3 py-2">{kindLabel}</span>
                {apartment.guests !== null ? <span className="rounded-xl bg-white/[0.08] px-3 py-2">{text.guests[apartment.guests]}</span> : null}
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-[0.8fr_1.1fr_1fr]">
                <div className="rounded-2xl bg-white px-4 py-3 text-[#07111f]">
                  <p className="text-3xl font-black leading-none text-[#d4146f]">{displayedPrice}</p>
                  <p className="mt-1 text-xs font-black text-slate-500">{text.priceSuffix}</p>
                </div>
                <a href="#availability" className="flex min-h-14 items-center justify-center rounded-2xl bg-[#ffd21f] px-4 py-3 text-center text-sm font-black text-[#07111f] transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{text.checkAvailability}</a>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hidden min-h-14 items-center justify-center rounded-2xl bg-[#25D366] px-4 py-3 text-center text-sm font-black text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:flex">WhatsApp</a>
              </div>
            </div>
            <button type="button" onClick={() => openLightbox(0)} className="block min-h-[260px] w-full cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#ffd21f]" aria-label={mainPhotoAlt}>
              <ResponsiveImage
                src={apartment.images[0]}
                alt={mainPhotoAlt}
                className="h-[280px] bg-[#07111f] sm:h-[430px] lg:h-full lg:min-h-[500px]"
                imgClassName="object-cover"
                sizes="(min-width: 1024px) 56vw, 100vw"
                objectPosition={heroPosition}
                priority
                withWatermark
              />
            </button>
          </div>
        </article>

        {topGalleryImages.length > 0 ? (
          <section className="mt-8 sm:mt-10" aria-labelledby="apartment-gallery-title">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d4146f]">{text.photo}</p>
                <h2 id="apartment-gallery-title" className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">{text.galleryTitle}</h2>
              </div>
              <button type="button" onClick={() => openLightbox(0)} className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-black text-[#07111f] shadow-sm ring-1 ring-black/5 transition hover:text-[#d4146f]">
                {lightboxPhotos.length} {text.photo.toLocaleLowerCase()}
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
              {topGalleryImages.map((image, index) => (
                <button key={image} type="button" onClick={() => openLightbox(index + 1)} className="relative overflow-hidden rounded-[18px] bg-white p-1.5 shadow-lg shadow-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f]" aria-label={galleryPhotoAlt(index + 1)}>
                  <ResponsiveImage src={image} alt={galleryPhotoAlt(index + 1)} className="h-[150px] rounded-[13px] sm:h-[220px] lg:h-[210px]" imgClassName="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" loading="lazy" withWatermark />
                  {index === topGalleryImages.length - 1 && hiddenGalleryCount > 0 ? <span className="absolute inset-1.5 flex items-center justify-center rounded-[13px] bg-[#07111f]/60 text-xl font-black text-white backdrop-blur-[2px]">+{hiddenGalleryCount}</span> : null}
                </button>
              ))}
            </div>
          </section>
        ) : null}

        <div id="availability" className="scroll-mt-24 pt-2">
          <AvailabilityCalendar apartmentId={apartment.id} bookedDates={bookedDates} />
        </div>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <article className="rounded-[24px] bg-white p-5 shadow-xl shadow-black/8 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d4146f]">{text.aboutLabel}</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-4xl">{aboutTitle}</h2>
            <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">{intro}</p>

            {equipmentItems.length > 0 ? (
              <section className="mt-7 border-t border-slate-100 pt-6">
                <h3 className="text-lg font-black sm:text-xl">{text.content.whyTitle}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {equipmentItems.map((item) => <span key={item} className="rounded-full bg-[#f4f1ee] px-3.5 py-2 text-sm font-bold text-[#07111f]">{item}</span>)}
                </div>
              </section>
            ) : null}

            {audienceItems.length > 0 ? (
              <section className="mt-6">
                <h3 className="text-lg font-black sm:text-xl">{text.content.fitTitle}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {audienceItems.map((item) => <span key={item} className="rounded-full border border-[#d4146f]/15 bg-[#fffaf0] px-3.5 py-2 text-sm font-bold text-[#07111f]">{item}</span>)}
                </div>
              </section>
            ) : null}
          </article>

          <aside className="rounded-[24px] bg-[#07111f] p-5 text-white shadow-xl shadow-black/10 sm:p-7">
            <h2 className="text-2xl font-black tracking-tight">{text.content.nearbyTitle}</h2>
            {nearbyItems.length > 0 ? (
              <ul className="mt-5 grid gap-4">
                {nearbyItems.map((item) => <li key={item} className="flex gap-3 text-sm font-bold leading-6 text-white/82"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#ffd21f]" />{item}</li>)}
              </ul>
            ) : <p className="mt-4 text-sm font-semibold leading-6 text-white/70">{text.content.nearbyFallback}</p>}
          </aside>
        </section>

        <section className="mt-6 rounded-[24px] bg-white p-5 shadow-lg shadow-black/7 sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d4146f]">{text.rulesLabel}</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight">{text.rulesTitle}</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[#fffaf0] p-4"><p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{text.rulesCheckInLabel}</p><p className="mt-1 text-xl font-black">{text.rulesCheckInTime}</p></div>
                <div className="rounded-2xl bg-[#fffaf0] p-4"><p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{text.rulesCheckOutLabel}</p><p className="mt-1 text-xl font-black">{text.rulesCheckOutTime}</p></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium leading-6 text-slate-600">{text.rulesIntro}</p>
              <ul className="mt-4 grid gap-x-5 gap-y-3 sm:grid-cols-2">
                {text.rulesItems.map((item) => <li key={item} className="flex gap-2.5 text-sm font-bold leading-5"><span className="text-[#d4146f]">✓</span>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {faq.length > 0 ? (
          <section className="mt-6 rounded-[24px] bg-[#fffefb] p-5 shadow-lg shadow-black/7 sm:p-7">
            <h2 className="text-2xl font-black tracking-tight">{text.content.faqTitle}</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {faq.map((item) => (
                <details key={item.question} className="group rounded-2xl bg-white p-4 ring-1 ring-black/5">
                  <summary className="cursor-pointer list-none font-black outline-none focus-visible:ring-2 focus-visible:ring-[#d4146f]">{item.question}</summary>
                  <p className="mt-3 text-sm font-medium leading-6 text-slate-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        {relatedApartments.length > 0 ? (
          <section className="mt-8" aria-labelledby="related-apartments-title">
            <h2 id="related-apartments-title" className="text-2xl font-black tracking-tight sm:text-3xl">{text.content.relatedTitle}</h2>
            <p className="mt-2 text-sm font-medium text-slate-600">{text.content.relatedText}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {relatedApartments.map((relatedApartment) => {
                const relatedAddress = getApartmentDisplayAddress(relatedApartment.id, relatedApartment.title, language);
                return (
                  <Link key={relatedApartment.id} href={getApartmentPath(relatedApartment)} className="group overflow-hidden rounded-[20px] bg-white shadow-lg shadow-black/8 ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f]">
                    <ResponsiveImage src={relatedApartment.cardPhoto ?? relatedApartment.photos[0]} alt={relatedAddress + " · ID " + relatedApartment.id} className="h-40" imgClassName="object-cover transition group-hover:scale-[1.02]" sizes="(min-width: 768px) 33vw, 100vw" loading="lazy" />
                    <div className="p-4">
                      <div className="flex items-center justify-between gap-3"><p className="text-xs font-black text-[#d4146f]">ID {relatedApartment.id}</p><p className="text-sm font-black">{getApartmentCatalogPrice(relatedApartment)} {text.content.relatedPrice}</p></div>
                      <p className="mt-2 truncate font-black">{relatedAddress}</p>
                      <p className="mt-1 text-xs font-bold text-slate-500">{text.kinds[relatedApartment.kind]}{relatedApartment.guests !== null ? " · " + text.guests[relatedApartment.guests] : ""}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}
      </section>

      {lightboxIndex !== null && activeLightboxPhoto ? (
        <div
          className={(isLightboxVisible ? "opacity-100" : "opacity-0") + " fixed inset-0 z-[100] flex flex-col bg-black/95 text-white transition-opacity duration-300 ease-out"}
          role="dialog"
          aria-modal="true"
          aria-label={text.galleryTitle}
          onClick={closeLightbox}
        >
          <div className="pointer-events-none absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm font-black shadow-2xl backdrop-blur sm:top-5 sm:text-base" aria-live="polite">
            {activeLightboxIndex + 1} / {lightboxPhotos.length}
          </div>
          <button type="button" onClick={closeLightbox} className="absolute right-3 top-3 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white/12 text-3xl font-light leading-none text-white shadow-2xl backdrop-blur transition duration-200 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-5 sm:top-5" aria-label="Close">
            ×
          </button>
          <button type="button" onClick={(event) => { event.stopPropagation(); showPreviousPhoto(); }} className="absolute left-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-4xl font-light leading-none text-white shadow-2xl backdrop-blur transition duration-200 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-5 sm:h-14 sm:w-14" aria-label="Previous photo">
            ‹
          </button>
          <button type="button" onClick={(event) => { event.stopPropagation(); showNextPhoto(); }} className="absolute right-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-4xl font-light leading-none text-white shadow-2xl backdrop-blur transition duration-200 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-5 sm:h-14 sm:w-14" aria-label="Next photo">
            ›
          </button>

          <div className="flex min-h-0 flex-1 touch-pan-y items-center justify-center px-3 pb-24 pt-16 sm:px-20 sm:pb-28 sm:pt-20" onClick={(event) => event.stopPropagation()} onPointerDown={handleLightboxPointerDown} onPointerUp={handleLightboxPointerUp} onPointerCancel={handleLightboxPointerCancel}>
            <div className="relative h-full max-h-[calc(100dvh-10rem)] w-full max-w-[calc(100vw-1.5rem)] transition duration-300 ease-out sm:max-h-[calc(100dvh-12rem)] sm:max-w-6xl">
              <Image
                key={activeLightboxPhoto.src}
                src={activeLightboxPhoto.src}
                alt={activeLightboxPhoto.alt}
                fill
                sizes="100vw"
                loading="eager"
                className="object-contain"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/65 px-3 py-3 backdrop-blur sm:px-5 sm:py-4" onClick={(event) => event.stopPropagation()}>
            <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto pb-1 sm:gap-3">
              {lightboxPhotos.map((photo, index) => (
                <button
                  key={photo.src + index}
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className={(index === activeLightboxIndex ? "ring-2 ring-[#ffd21f] ring-offset-2 ring-offset-black" : "opacity-70 hover:opacity-100") + " relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-white/10 transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-20 sm:w-28"}
                  aria-label={photo.alt}
                >
                  <ResponsiveImage src={photo.src} alt={photo.alt} className="h-full w-full rounded-xl bg-transparent" imgClassName="object-cover" sizes="112px" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
      <div className="h-20 lg:hidden" aria-hidden="true" />
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/15 bg-[#07111f]/94 px-3 pt-2 shadow-[0_-12px_35px_rgba(7,17,31,0.24)] backdrop-blur lg:hidden" style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}>
        <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="rounded-xl bg-[#25D366] py-3 text-center text-sm font-black text-white">WhatsApp</a>
          <a href="viber://chat?number=%2B37369990190" aria-label="Viber" className="rounded-xl bg-[#7c00d9] py-3 text-center text-sm font-black text-white">Viber</a>
          <a href="tel:+37369990190" aria-label={text.call} className="rounded-xl bg-[#d4146f] py-3 text-center text-sm font-black text-white">{text.call}</a>
        </div>
      </div>
    </main>
  );
}
