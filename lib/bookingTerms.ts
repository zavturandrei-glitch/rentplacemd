import type { Metadata } from "next";
import type { Language } from "@/locales/translations";
import {
  baseUrl,
  mainSocialImageUrl,
  normalizeSiteLanguage,
  routeAlternates,
  siteName,
} from "@/lib/seo";

export const bookingTermsPath = "/booking-terms";

type BookingSection = {
  title: string;
  paragraphs: string[];
};

export type BookingTermsCopy = {
  title: string;
  lead: string;
  summary: string;
  sections: BookingSection[];
  apartments: string;
  rules: string;
  contact: string;
};

export const bookingTermsContent: Record<Language, BookingTermsCopy> = {
  ru: {
    title: "Как проходит бронирование RentPlaceMD",
    lead: "Запрос отправляется напрямую, а квартира и даты подтверждаются после проверки доступности.",
    summary: "На сайте нет автоматической оплаты или мгновенного подтверждения. Перед поездкой вы получаете согласованные детали конкретной квартиры и заселения.",
    sections: [
      {
        title: "1. Отправьте запрос",
        paragraphs: [
          "Укажите даты, ID квартиры и количество гостей в WhatsApp, Viber, Telegram или по телефону. Если конкретная квартира занята, мы можем предложить доступный вариант.",
        ],
      },
      {
        title: "2. Дождитесь подтверждения",
        paragraphs: [
          "Отправленное сообщение ещё не является подтверждённой бронью. RentPlaceMD проверяет квартиру и даты, после чего подтверждает договорённость напрямую.",
        ],
      },
      {
        title: "3. Уточните детали до приезда",
        paragraphs: [
          "До поездки согласуются адрес, ориентировочное время прибытия, способ передачи ключей, контакт для связи и условия выбранного проживания.",
        ],
      },
      {
        title: "4. Заезд и выезд",
        paragraphs: [
          "Стандартный заезд — с 14:00, выезд — до 12:00. Ранний заезд или поздний выезд возможны только после отдельного подтверждения и при наличии возможности.",
        ],
      },
      {
        title: "5. Оплата",
        paragraphs: [
          "Способ и момент оплаты подтверждаются в прямом общении до приезда. Универсальные условия предоплаты или депозита на сайте не публикуются, поскольку они должны быть достоверно согласованы для конкретной брони.",
        ],
      },
      {
        title: "6. Изменение или отмена",
        paragraphs: [
          "Условия изменения или отмены уточняются до подтверждения конкретной брони. При изменении планов свяжитесь с RentPlaceMD как можно раньше.",
        ],
      },
      {
        title: "7. Ответственность гостя",
        paragraphs: [
          "Сообщайте достоверное количество гостей, бережно относитесь к квартире, соблюдайте тишину и заранее согласовывайте вопросы, способные повлиять на проживание.",
        ],
      },
    ],
    apartments: "Выбрать квартиру",
    rules: "Правила заселения",
    contact: "Задать вопрос",
  },
  ro: {
    title: "Cum funcționează rezervarea RentPlaceMD",
    lead: "Solicitarea este trimisă direct, iar apartamentul și datele sunt confirmate după verificarea disponibilității.",
    summary: "Site-ul nu folosește plată automată sau confirmare instantanee. Înainte de călătorie primiți detaliile convenite pentru apartament și cazare.",
    sections: [
      { title: "1. Trimiteți solicitarea", paragraphs: ["Indicați datele, ID-ul apartamentului și numărul de oaspeți prin WhatsApp, Viber, Telegram sau telefon. Dacă apartamentul este ocupat, putem propune o variantă disponibilă."] },
      { title: "2. Așteptați confirmarea", paragraphs: ["Mesajul trimis nu reprezintă încă o rezervare confirmată. RentPlaceMD verifică apartamentul și datele, apoi confirmă direct înțelegerea."] },
      { title: "3. Clarificați detaliile", paragraphs: ["Înainte de călătorie se stabilesc adresa, ora aproximativă a sosirii, predarea cheilor, contactul și condițiile șederii alese."] },
      { title: "4. Check-in și check-out", paragraphs: ["Check-in-ul standard începe la 14:00, iar check-out-ul este până la 12:00. Alte ore sunt posibile doar după confirmare și în funcție de disponibilitate."] },
      { title: "5. Plata", paragraphs: ["Metoda și momentul plății se confirmă direct înainte de sosire. Site-ul nu publică o regulă universală privind avansul sau garanția fără condiții confirmate pentru rezervarea concretă."] },
      { title: "6. Modificare sau anulare", paragraphs: ["Condițiile se clarifică înainte de confirmarea rezervării. Dacă planurile se schimbă, contactați RentPlaceMD cât mai devreme."] },
      { title: "7. Responsabilitatea oaspetelui", paragraphs: ["Comunicați numărul real de oaspeți, folosiți cu grijă apartamentul, respectați liniștea și discutați din timp situațiile care pot influența șederea."] },
    ],
    apartments: "Alege un apartament",
    rules: "Reguli de cazare",
    contact: "Pune o întrebare",
  },
  en: {
    title: "How RentPlaceMD booking works",
    lead: "You send a direct request, and the apartment and dates are confirmed after availability has been checked.",
    summary: "The website does not use automatic payment or instant confirmation. Before travelling, you receive the agreed details for the apartment and check-in.",
    sections: [
      { title: "1. Send a request", paragraphs: ["Share the dates, apartment ID and guest count by WhatsApp, Viber, Telegram or phone. If that apartment is occupied, we can suggest an available option."] },
      { title: "2. Wait for confirmation", paragraphs: ["A sent message is not yet a confirmed booking. RentPlaceMD checks the apartment and dates, then confirms the arrangement directly."] },
      { title: "3. Agree the arrival details", paragraphs: ["Before travelling, confirm the address, approximate arrival time, key handover, contact method and the conditions for the selected stay."] },
      { title: "4. Check-in and check-out", paragraphs: ["Standard check-in is from 14:00 and check-out is by 12:00. Other times are possible only after separate confirmation and when the apartment schedule allows."] },
      { title: "5. Payment", paragraphs: ["The payment method and timing are confirmed directly before arrival. The website does not state universal prepayment or deposit terms without verified conditions for the individual booking."] },
      { title: "6. Changes or cancellation", paragraphs: ["The applicable conditions are clarified before the individual booking is confirmed. If plans change, contact RentPlaceMD as early as possible."] },
      { title: "7. Guest responsibility", paragraphs: ["Provide the correct guest count, take reasonable care of the apartment, respect neighbours and discuss in advance anything that may affect the stay."] },
    ],
    apartments: "Choose an apartment",
    rules: "Check-in rules",
    contact: "Ask a question",
  },
  uk: {
    title: "Як відбувається бронювання RentPlaceMD",
    lead: "Запит надсилається напряму, а квартира й дати підтверджуються після перевірки доступності.",
    summary: "На сайті немає автоматичної оплати чи миттєвого підтвердження. До поїздки ви отримуєте погоджені деталі квартири та заселення.",
    sections: [
      { title: "1. Надішліть запит", paragraphs: ["Укажіть дати, ID квартири та кількість гостей у WhatsApp, Viber, Telegram або телефоном. Якщо квартира зайнята, ми можемо запропонувати доступний варіант."] },
      { title: "2. Дочекайтеся підтвердження", paragraphs: ["Надіслане повідомлення ще не є підтвердженим бронюванням. RentPlaceMD перевіряє квартиру й дати, а потім підтверджує домовленість напряму."] },
      { title: "3. Погодьте деталі", paragraphs: ["До поїздки погоджуються адреса, орієнтовний час прибуття, передача ключів, контакт і умови обраного проживання."] },
      { title: "4. Заїзд і виїзд", paragraphs: ["Стандартний заїзд — з 14:00, виїзд — до 12:00. Інший час можливий лише після окремого підтвердження та за наявності можливості."] },
      { title: "5. Оплата", paragraphs: ["Спосіб і час оплати підтверджуються безпосередньо до приїзду. Сайт не публікує універсальних умов передоплати чи депозиту без достовірних умов конкретного бронювання."] },
      { title: "6. Зміна або скасування", paragraphs: ["Умови уточнюються до підтвердження конкретного бронювання. Якщо плани змінилися, зв’яжіться з RentPlaceMD якомога раніше."] },
      { title: "7. Відповідальність гостя", paragraphs: ["Повідомляйте правильну кількість гостей, дбайливо ставтеся до квартири, поважайте сусідів і заздалегідь погоджуйте обставини, що можуть вплинути на проживання."] },
    ],
    apartments: "Обрати квартиру",
    rules: "Правила заселення",
    contact: "Поставити запитання",
  },
  cs: {
    title: "Jak probíhá rezervace RentPlaceMD",
    lead: "Žádost posíláte přímo a apartmán s termínem se potvrzuje po ověření dostupnosti.",
    summary: "Web nepoužívá automatickou platbu ani okamžité potvrzení. Před cestou obdržíte dohodnuté podrobnosti k apartmánu a ubytování.",
    sections: [
      { title: "1. Odešlete žádost", paragraphs: ["Uveďte termín, ID apartmánu a počet hostů přes WhatsApp, Viber, Telegram nebo telefon. Je-li apartmán obsazený, můžeme navrhnout dostupnou variantu."] },
      { title: "2. Počkejte na potvrzení", paragraphs: ["Odeslaná zpráva ještě není potvrzenou rezervací. RentPlaceMD ověří apartmán a termín a poté dohodu přímo potvrdí."] },
      { title: "3. Upřesněte příjezd", paragraphs: ["Před cestou se domluví adresa, přibližný čas příjezdu, předání klíčů, kontakt a podmínky vybraného pobytu."] },
      { title: "4. Příjezd a odjezd", paragraphs: ["Standardní check-in je od 14:00 a check-out do 12:00. Jiný čas je možný pouze po samostatném potvrzení a podle možností apartmánu."] },
      { title: "5. Platba", paragraphs: ["Způsob a termín platby se potvrzují přímo před příjezdem. Web neuvádí jednotné podmínky zálohy nebo kauce bez ověřených pravidel pro konkrétní rezervaci."] },
      { title: "6. Změna nebo zrušení", paragraphs: ["Podmínky se upřesňují před potvrzením konkrétní rezervace. Pokud se plány změní, kontaktujte RentPlaceMD co nejdříve."] },
      { title: "7. Odpovědnost hosta", paragraphs: ["Uveďte správný počet hostů, zacházejte s apartmánem šetrně, respektujte sousedy a předem proberte vše, co může ovlivnit pobyt."] },
    ],
    apartments: "Vybrat apartmán",
    rules: "Pravidla ubytování",
    contact: "Položit otázku",
  },
};

export function getBookingTermsMetadata(languageInput?: string): Metadata {
  const language = normalizeSiteLanguage(languageInput);
  const copy = bookingTermsContent[language];
  const url = baseUrl + bookingTermsPath + (languageInput ? `?lang=${language}` : "");
  return {
    title: copy.title,
    description: copy.lead,
    alternates: routeAlternates(bookingTermsPath, languageInput),
    openGraph: {
      title: copy.title,
      description: copy.lead,
      url,
      siteName,
      type: "website",
      images: [{ url: mainSocialImageUrl, alt: copy.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.lead,
      images: [mainSocialImageUrl],
    },
  };
}

export function buildBookingTermsJsonLd(languageInput?: string) {
  const language = normalizeSiteLanguage(languageInput);
  const copy = bookingTermsContent[language];
  const url = baseUrl + bookingTermsPath + (languageInput ? `?lang=${language}` : "");
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: copy.title,
      description: copy.lead,
      url,
      inLanguage: language,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteName, item: baseUrl },
        { "@type": "ListItem", position: 2, name: copy.title, item: url },
      ],
    },
  ];
}
