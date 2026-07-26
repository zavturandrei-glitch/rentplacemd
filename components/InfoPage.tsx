"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/locales/translations";

export type InfoPageKind = "about" | "rules" | "transfer" | "guide";

type AboutCopy = {
  title: string;
  lead: string;
  imageAlt: string;
  quote: string;
  introduction: string;
  sections: Array<{ title: string; paragraphs: string[] }>;
  closingTitle: string;
  closingText: string;
  apartments: string;
  contact: string;
};

const aboutCopy: Record<Language, AboutCopy> = {
  ru: {
    title: "RentPlaceMD — сервис посуточной аренды квартир в Кишинёве",
    lead: "Помогаем выбрать жильё, согласовать детали приезда и спокойно пройти весь путь от первого обращения до выезда.",
    imageAlt: "Светлая подготовленная спальня в квартире RentPlaceMD",
    quote: "Хороший сервис начинается с ясности: гость заранее понимает, какую квартиру выбирает, как пройдёт заселение и к кому обратиться во время поездки.",
    introduction: "RentPlaceMD появился из практической работы с посуточной арендой в Кишинёве. После дороги человеку нужны не громкие обещания, а точная информация, понятный контакт и квартира, соответствующая фотографиям. На этом мы и строим сервис.",
    sections: [
      {
        title: "Понятный выбор",
        paragraphs: [
          "В каталоге представлены конкретные квартиры с реальными фотографиями, стоимостью, вместимостью и расположением. Эти данные помогают сравнить варианты до обращения и быстрее найти жильё под формат поездки.",
        ],
      },
      {
        title: "Поддержка гостя",
        paragraphs: [
          "Мы помогаем уточнить свободные даты, время приезда и условия заселения. Связаться можно по телефону или через привычный мессенджер. Контакт остаётся доступным до приезда и во время проживания, если возникает практический вопрос.",
          "На сайте также есть правила заселения, трансфер из аэропорта и локальный гид по Кишинёву. Все основные разделы адаптированы для телефона и доступны на пяти языках.",
        ],
      },
      {
        title: "Развитие сервиса",
        paragraphs: [
          "RentPlaceMD постепенно расширяет каталог и совершенствует информацию, которая помогает гостю подготовиться к поездке. Мы развиваем сервис без обещаний автоматического бронирования или мгновенного подтверждения там, где решение требует общения с человеком.",
          "Владельцы квартир, которым близок такой подход к представлению объектов и работе с гостями, могут связаться с нами и обсудить сотрудничество.",
        ],
      },
    ],
    closingTitle: "Начните с квартиры, подходящей вашей поездке",
    closingText: "Посмотрите каталог или напишите нам, если нужно быстро сориентироваться в вариантах.",
    apartments: "Посмотреть квартиры",
    contact: "Связаться",
  },
  ro: {
    title: "RentPlaceMD — serviciu de închiriere zilnică a apartamentelor în Chișinău",
    lead: "Vă ajutăm să alegeți locuința, să coordonați sosirea și să parcurgeți simplu drumul de la primul mesaj până la plecare.",
    imageAlt: "Dormitor luminos pregătit pentru oaspeți într-un apartament RentPlaceMD",
    quote: "Un serviciu bun începe cu claritate: oaspetele știe din timp ce apartament alege, cum are loc cazarea și pe cine poate contacta în timpul călătoriei.",
    introduction: "RentPlaceMD s-a format din experiența practică a închirierilor zilnice în Chișinău. După drum, oamenii au nevoie de informații exacte, de un contact accesibil și de un apartament care corespunde fotografiilor, nu de promisiuni sonore. Acesta este punctul de plecare al serviciului nostru.",
    sections: [
      {
        title: "O alegere bine informată",
        paragraphs: [
          "Catalogul prezintă apartamente concrete, cu fotografii reale, preț, capacitate și amplasare. Informațiile permit compararea opțiunilor înainte de contact și scurtează drumul către locuința potrivită.",
        ],
      },
      {
        title: "Sprijin pentru oaspeți",
        paragraphs: [
          "Ajutăm la verificarea datelor libere, a orei de sosire și a condițiilor de cazare. Ne puteți contacta prin telefon sau mesageria preferată, iar legătura rămâne disponibilă înainte de sosire și în timpul șederii.",
          "Pe site se găsesc și regulile de cazare, transferul de la aeroport și un ghid local al Chișinăului. Secțiunile principale sunt adaptate pentru telefon și disponibile în cinci limbi.",
        ],
      },
      {
        title: "Cum evoluează RentPlaceMD",
        paragraphs: [
          "Extindem treptat catalogul și îmbunătățim informațiile utile înainte de călătorie. Nu promitem rezervare automată sau confirmare instantanee atunci când o decizie trebuie coordonată cu o persoană.",
          "Proprietarii care apreciază această prezentare atentă și comunicarea clară cu oaspeții ne pot contacta pentru a discuta o colaborare.",
        ],
      },
    ],
    closingTitle: "Începeți cu apartamentul potrivit călătoriei",
    closingText: "Consultați catalogul sau scrieți-ne dacă doriți ajutor pentru o alegere rapidă.",
    apartments: "Vezi apartamentele",
    contact: "Contactează-ne",
  },
  en: {
    title: "RentPlaceMD — daily apartment rentals in Chișinău",
    lead: "We help guests choose a place to stay, agree the arrival details and move smoothly from the first enquiry to departure.",
    imageAlt: "Bright guest-ready bedroom in a RentPlaceMD apartment",
    quote: "Good service begins with clarity: guests know which apartment they are choosing, how check-in will work and who to contact during the trip.",
    introduction: "RentPlaceMD grew out of practical experience with short stays in Chișinău. After a journey, people need accurate information, an accessible contact and an apartment that matches its photographs—not grand promises. That is the standard behind the service.",
    sections: [
      {
        title: "A clear choice",
        paragraphs: [
          "The catalogue presents individual apartments with genuine photographs, price, capacity and location. Guests can compare the essentials before getting in touch and narrow the choice to the accommodation that fits their trip.",
        ],
      },
      {
        title: "Support for the stay",
        paragraphs: [
          "We help confirm available dates, arrival time and the terms of each stay. Guests can contact us by phone or their usual messenger, and support remains available before arrival and during the stay when a practical question comes up.",
          "The website also includes check-in guidance, an airport transfer and a local Chișinău guide. Its main sections are mobile-friendly and available in five languages.",
        ],
      },
      {
        title: "How RentPlaceMD is developing",
        paragraphs: [
          "We are gradually expanding the catalogue and improving the information guests need before a trip. We do not claim automatic booking or instant confirmation where an arrangement still requires a conversation.",
          "Apartment owners who value careful presentation and straightforward guest communication are welcome to contact us to discuss cooperation.",
        ],
      },
    ],
    closingTitle: "Start with an apartment that fits your trip",
    closingText: "Browse the catalogue, or message us if you would like help narrowing the options.",
    apartments: "View apartments",
    contact: "Contact us",
  },
  uk: {
    title: "RentPlaceMD — сервіс подобової оренди квартир у Кишиневі",
    lead: "Допомагаємо обрати житло, погодити деталі приїзду та спокійно пройти шлях від першого звернення до виїзду.",
    imageAlt: "Світла підготовлена спальня у квартирі RentPlaceMD",
    quote: "Хороший сервіс починається з ясності: гість заздалегідь розуміє, яку квартиру обирає, як відбудеться заселення і до кого звернутися під час поїздки.",
    introduction: "RentPlaceMD виріс із практичного досвіду подобової оренди в Кишиневі. Після дороги людині потрібні точна інформація, доступний контакт і квартира, що відповідає фотографіям, а не гучні обіцянки. На цьому ґрунтується наша робота.",
    sections: [
      {
        title: "Зрозумілий вибір",
        paragraphs: [
          "У каталозі представлені конкретні квартири з реальними фотографіями, ціною, місткістю та розташуванням. Це дає змогу порівняти варіанти до звернення і швидше знайти житло під формат поїздки.",
        ],
      },
      {
        title: "Підтримка гостя",
        paragraphs: [
          "Ми допомагаємо уточнити вільні дати, час приїзду та умови заселення. Зв’язатися можна телефоном або через звичний месенджер. Контакт залишається доступним до приїзду і під час проживання.",
          "На сайті також є правила заселення, трансфер з аеропорту та локальний гід Кишиневом. Основні розділи адаптовані для телефона і доступні п’ятьма мовами.",
        ],
      },
      {
        title: "Розвиток RentPlaceMD",
        paragraphs: [
          "Ми поступово розширюємо каталог і покращуємо інформацію, потрібну гостю до поїздки. Не обіцяємо автоматичного бронювання чи миттєвого підтвердження там, де рішення потребує спілкування.",
          "Власники квартир, яким близькі уважна презентація об’єкта та зрозуміла комунікація з гостями, можуть звернутися до нас для обговорення співпраці.",
        ],
      },
    ],
    closingTitle: "Почніть із квартири, що відповідає вашій поїздці",
    closingText: "Перегляньте каталог або напишіть нам, якщо потрібна допомога з вибором.",
    apartments: "Переглянути квартири",
    contact: "Зв’язатися",
  },
  cs: {
    title: "RentPlaceMD — krátkodobý pronájem apartmánů v Kišiněvě",
    lead: "Pomáháme hostům vybrat ubytování, domluvit příjezd a projít bez zbytečných nejasností celou cestu od prvního dotazu po odjezd.",
    imageAlt: "Světlá ložnice připravená pro hosty v apartmánu RentPlaceMD",
    quote: "Dobrá služba začíná přehledem: host předem ví, který apartmán si vybírá, jak proběhne ubytování a na koho se během cesty obrátit.",
    introduction: "RentPlaceMD vychází z praktické zkušenosti s krátkodobými pobyty v Kišiněvě. Po cestě lidé potřebují přesné informace, dostupný kontakt a apartmán, který odpovídá fotografiím, nikoli velká reklamní slova. Na tom stavíme naši službu.",
    sections: [
      {
        title: "Přehledný výběr",
        paragraphs: [
          "V katalogu jsou konkrétní apartmány se skutečnými fotografiemi, cenou, kapacitou a polohou. Host může porovnat základní údaje ještě před kontaktováním a rychleji najít ubytování pro svou cestu.",
        ],
      },
      {
        title: "Podpora hostů",
        paragraphs: [
          "Pomáháme ověřit volné termíny, čas příjezdu a podmínky pobytu. Kontaktovat nás lze telefonem nebo běžným messengerem; před příjezdem i během pobytu jsme k dispozici pro praktické dotazy.",
          "Web nabízí také pravidla ubytování, transfer z letiště a místního průvodce Kišiněvem. Hlavní části jsou přizpůsobené telefonu a dostupné v pěti jazycích.",
        ],
      },
      {
        title: "Další rozvoj RentPlaceMD",
        paragraphs: [
          "Katalog postupně rozšiřujeme a zpřesňujeme informace, které host potřebuje před cestou. Neslibujeme automatickou rezervaci ani okamžité potvrzení tam, kde je ještě nutná osobní domluva.",
          "Majitelé apartmánů, kteří oceňují pečlivou prezentaci a srozumitelnou komunikaci s hosty, nás mohou kontaktovat a projednat spolupráci.",
        ],
      },
    ],
    closingTitle: "Začněte apartmánem, který odpovídá vaší cestě",
    closingText: "Prohlédněte si katalog nebo nám napište, pokud chcete s výběrem poradit.",
    apartments: "Zobrazit apartmány",
    contact: "Kontaktovat",
  },
};

type RulesCopy = {
  title: string;
  lead: string;
  imageAlt: string;
  schedule: string;
  steps: Array<{ title: string; paragraphs: string[] }>;
  closing: string;
  contact: string;
};

const rulesCopy: Record<Language, RulesCopy> = {
  ru: {
    title: "Правила заселения",
    lead: "Коротко о том, что нужно согласовать до приезда, как проходит заселение и что важно помнить при выезде.",
    imageAlt: "Подготовленная к приезду гостей спальня в квартире RentPlaceMD",
    schedule: "Стандартное время заезда — с 14:00, выезда — до 12:00. Другое время возможно только по предварительному согласованию и при наличии возможности.",
    steps: [
      {
        title: "До приезда",
        paragraphs: [
          "Заранее сообщите ориентировочное время прибытия и предупредите, если оно изменилось. Мы подтвердим детали конкретного заселения, способ связи и окончательные условия бронирования.",
          "При необходимости подготовьте документ гостя для подтверждения личности. Способ оплаты и другие условия лучше уточнить до поездки, поскольку они могут зависеть от выбранной квартиры.",
        ],
      },
      {
        title: "Заселение",
        paragraphs: [
          "Перед приездом вы получите понятные инструкции по адресу и передаче ключей. Единый способ заселения не обещается для всех квартир: конкретный порядок подтверждается заранее.",
          "Ранний заезд возможен только по договорённости, если квартира успела освободиться и подготовлена к вашему приезду. Контакт RentPlaceMD остаётся доступным, если в дороге появится вопрос.",
        ],
      },
      {
        title: "Во время проживания",
        paragraphs: [
          "Пожалуйста, бережно относитесь к квартире и её имуществу, соблюдайте тишину и уважайте соседей. Вечеринки и мероприятия следует заранее согласовать.",
          "Если обнаружена неисправность или нужна помощь, сообщите об этом как можно раньше. Так вопрос обычно удаётся решить быстрее и без лишних неудобств.",
        ],
      },
      {
        title: "Выезд",
        paragraphs: [
          "Стандартное время выезда — до 12:00. Поздний выезд возможен только после предварительного подтверждения и при наличии возможности.",
          "Согласуйте передачу ключей, проверьте личные вещи и оставьте квартиру в нормальном состоянии. Если планы изменились, достаточно связаться с RentPlaceMD по телефону или через привычный мессенджер.",
        ],
      },
    ],
    closing: "Условия конкретной квартиры подтверждаются перед приездом. Если что-то осталось непонятным, напишите нам — обычного сообщения достаточно.",
    contact: "Задать вопрос",
  },
  ro: {
    title: "Reguli de cazare",
    lead: "Pe scurt: ce trebuie coordonat înainte de sosire, cum are loc cazarea și ce este important la plecare.",
    imageAlt: "Dormitor RentPlaceMD pregătit pentru sosirea oaspeților",
    schedule: "Ora standard de check-in este după 14:00, iar check-out-ul până la 12:00. Un alt program este posibil numai cu acord prealabil și dacă situația permite.",
    steps: [
      {
        title: "Înainte de sosire",
        paragraphs: [
          "Comunicați din timp ora aproximativă a sosirii și anunțați-ne dacă se schimbă. Confirmăm detaliile cazării, modul de contact și condițiile finale ale rezervării.",
          "Dacă este necesar, pregătiți actul unui oaspete pentru confirmarea identității. Metoda de plată și celelalte condiții trebuie clarificate înainte de călătorie, deoarece pot depinde de apartament.",
        ],
      },
      {
        title: "Cazarea",
        paragraphs: [
          "Înainte de sosire primiți instrucțiuni clare despre adresă și predarea cheilor. Procedura nu este identică pentru toate apartamentele și se confirmă în prealabil.",
          "Check-in-ul mai devreme este posibil doar dacă a fost coordonat și apartamentul este disponibil și pregătit. Contactul RentPlaceMD rămâne accesibil pentru întrebări pe drum.",
        ],
      },
      {
        title: "În timpul șederii",
        paragraphs: [
          "Folosiți cu grijă apartamentul și bunurile sale, păstrați liniștea și respectați vecinii. Petrecerile sau evenimentele trebuie discutate în prealabil.",
          "Dacă observați o defecțiune sau aveți nevoie de ajutor, anunțați-ne cât mai repede. Astfel problema poate fi rezolvată cu mai puține incomodități.",
        ],
      },
      {
        title: "Plecarea",
        paragraphs: [
          "Ora standard de plecare este până la 12:00. Check-out-ul târziu este posibil numai după confirmare și dacă programul apartamentului permite.",
          "Coordonați predarea cheilor, verificați lucrurile personale și lăsați apartamentul într-o stare normală. Dacă planurile se schimbă, contactați-ne prin telefon sau mesageria preferată.",
        ],
      },
    ],
    closing: "Condițiile apartamentului ales sunt confirmate înainte de sosire. Dacă mai aveți o întrebare, este suficient să ne scrieți.",
    contact: "Pune o întrebare",
  },
  en: {
    title: "Check-in rules",
    lead: "A straightforward guide to what should be agreed before arrival, how check-in works and what to remember when leaving.",
    imageAlt: "RentPlaceMD bedroom prepared for arriving guests",
    schedule: "Standard check-in is from 14:00 and check-out is by 12:00. Different times are possible only by prior agreement and when the apartment schedule allows.",
    steps: [
      {
        title: "Before arrival",
        paragraphs: [
          "Share your approximate arrival time in advance and let us know if it changes. We will confirm the details for the specific stay, the best contact method and the final booking terms.",
          "Where needed, have one guest’s ID available for identity confirmation. Payment method and other conditions should be clarified before travelling because they can depend on the apartment.",
        ],
      },
      {
        title: "Check-in",
        paragraphs: [
          "Before arrival, you will receive clear directions for the address and key handover. The process is not identical for every apartment, so the exact arrangement is confirmed in advance.",
          "Early check-in is possible only by prior agreement, when the apartment is available and ready. RentPlaceMD remains reachable if a question comes up on the way.",
        ],
      },
      {
        title: "During the stay",
        paragraphs: [
          "Please take care of the apartment and its contents, keep noise considerate and respect the neighbours. Parties or events should be discussed beforehand.",
          "Tell us promptly if you notice a fault or need practical help. Early notice usually makes the issue easier to resolve.",
        ],
      },
      {
        title: "Departure",
        paragraphs: [
          "Standard departure is by 12:00. Late check-out is possible only after confirmation and when the apartment schedule allows.",
          "Agree the key return, check your personal belongings and leave the apartment in a reasonable condition. If plans change, contact RentPlaceMD by phone or your usual messenger.",
        ],
      },
    ],
    closing: "The terms for the chosen apartment are confirmed before arrival. If anything is unclear, simply send us a message.",
    contact: "Ask a question",
  },
  uk: {
    title: "Правила заселення",
    lead: "Коротко про те, що потрібно погодити до приїзду, як відбувається заселення і що важливо пам’ятати під час виїзду.",
    imageAlt: "Підготовлена до приїзду гостей спальня у квартирі RentPlaceMD",
    schedule: "Стандартний час заїзду — з 14:00, виїзду — до 12:00. Інший час можливий лише за попереднім погодженням і якщо це дозволяє графік квартири.",
    steps: [
      {
        title: "До приїзду",
        paragraphs: [
          "Заздалегідь повідомте орієнтовний час прибуття та попередьте, якщо він змінився. Ми підтвердимо деталі конкретного заселення, спосіб зв’язку та остаточні умови бронювання.",
          "За потреби підготуйте документ гостя для підтвердження особи. Спосіб оплати та інші умови варто уточнити до поїздки, адже вони можуть залежати від обраної квартири.",
        ],
      },
      {
        title: "Заселення",
        paragraphs: [
          "До приїзду ви отримаєте зрозумілі інструкції щодо адреси та передачі ключів. Порядок не однаковий для всіх квартир, тому конкретні деталі підтверджуються заздалегідь.",
          "Ранній заїзд можливий лише за домовленістю, якщо квартира вільна і підготовлена. Контакт RentPlaceMD залишається доступним, якщо в дорозі виникне питання.",
        ],
      },
      {
        title: "Під час проживання",
        paragraphs: [
          "Будь ласка, дбайливо ставтеся до квартири та майна, дотримуйтеся тиші й поважайте сусідів. Вечірки або заходи слід погоджувати заздалегідь.",
          "Якщо ви помітили несправність або потрібна допомога, повідомте якомога раніше. Так питання зазвичай вдається вирішити швидше.",
        ],
      },
      {
        title: "Виїзд",
        paragraphs: [
          "Стандартний час виїзду — до 12:00. Пізній виїзд можливий лише після підтвердження і якщо це дозволяє графік квартири.",
          "Погодьте передачу ключів, перевірте особисті речі та залиште квартиру в нормальному стані. Якщо плани змінилися, зв’яжіться з RentPlaceMD телефоном або через месенджер.",
        ],
      },
    ],
    closing: "Умови конкретної квартири підтверджуються до приїзду. Якщо щось залишилося незрозумілим, просто напишіть нам.",
    contact: "Поставити запитання",
  },
  cs: {
    title: "Pravidla ubytování",
    lead: "Stručně a srozumitelně: co domluvit před příjezdem, jak probíhá ubytování a na co myslet při odjezdu.",
    imageAlt: "Ložnice RentPlaceMD připravená na příjezd hostů",
    schedule: "Standardní check-in je od 14:00 a check-out do 12:00. Jiný čas je možný pouze po předchozí dohodě a podle možností apartmánu.",
    steps: [
      {
        title: "Před příjezdem",
        paragraphs: [
          "Sdělte předem přibližný čas příjezdu a dejte vědět, pokud se změní. Potvrdíme podrobnosti konkrétního pobytu, způsob kontaktu a konečné podmínky rezervace.",
          "Pokud je to potřeba, připravte doklad jednoho hosta k ověření totožnosti. Způsob platby a další podmínky je vhodné upřesnit před cestou, protože se mohou u jednotlivých apartmánů lišit.",
        ],
      },
      {
        title: "Ubytování",
        paragraphs: [
          "Před příjezdem obdržíte jasné pokyny k adrese a předání klíčů. Postup není u všech apartmánů stejný, proto konkrétní domluvu vždy potvrdíme předem.",
          "Dřívější check-in je možný jen po dohodě, pokud je apartmán volný a připravený. Kontakt na RentPlaceMD zůstává dostupný pro dotazy během cesty.",
        ],
      },
      {
        title: "Během pobytu",
        paragraphs: [
          "Zacházejte prosím šetrně s apartmánem a vybavením, dodržujte přiměřený klid a respektujte sousedy. Večírky nebo akce je třeba předem projednat.",
          "Když zjistíte závadu nebo potřebujete pomoc, ozvěte se co nejdříve. Včasná zpráva obvykle usnadní řešení.",
        ],
      },
      {
        title: "Odjezd",
        paragraphs: [
          "Standardní odjezd je do 12:00. Pozdější check-out je možný pouze po potvrzení a podle možností apartmánu.",
          "Domluvte vrácení klíčů, zkontrolujte osobní věci a zanechte apartmán v běžném stavu. Při změně plánů nás kontaktujte telefonem nebo přes obvyklý messenger.",
        ],
      },
    ],
    closing: "Podmínky vybraného apartmánu potvrzujeme před příjezdem. Pokud něco není jasné, stačí nám napsat.",
    contact: "Položit otázku",
  },
};

type TransferCopy = {
  title: string;
  lead: string;
  imageAlt: string;
  price: string;
  priceNote: string;
  sections: Array<{ title: string; paragraphs: string[] }>;
  contact: string;
};

const transferCopy: Record<Language, TransferCopy> = {
  ru: {
    title: "Трансфер из аэропорта Кишинёва до квартиры",
    lead: "Встретим в аэропорту и доставим прямо к адресу проживания. После прилёта не придётся искать такси, объяснять маршрут или делать пересадки.",
    imageAlt: "Графитовый Peugeot 3008 в городской поездке",
    price: "25 EUR за индивидуальный трансфер",
    priceNote: "Время, адрес и детали поездки подтверждаются заранее.",
    sections: [
      {
        title: "Как заказать",
        paragraphs: [
          "Напишите в WhatsApp, Viber, Telegram или позвоните. Укажите дату, номер рейса, ориентировочное время прилёта, количество пассажиров и багажа. После уточнения деталей мы подтвердим возможность трансфера.",
        ],
      },
      {
        title: "Как проходит встреча",
        paragraphs: [
          "Время встречи согласовывается заранее. Мы остаёмся на связи перед прилётом, встречаем в аэропорту и помогаем с багажом. Если расписание изменилось, сообщите об этом как можно раньше.",
        ],
      },
      {
        title: "Что входит в услугу",
        paragraphs: [
          "Предварительное согласование времени, встреча в аэропорту, помощь с багажом и индивидуальная поездка без попутчиков прямо к адресу квартиры.",
        ],
      },
    ],
    contact: "Заказать трансфер",
  },
  ro: {
    title: "Transfer de la aeroportul Chișinău la apartament",
    lead: "Vă întâmpinăm la aeroport și mergem direct la adresa de cazare. După aterizare nu trebuie să căutați un taxi, să explicați traseul sau să schimbați transportul.",
    imageAlt: "Peugeot 3008 grafit într-o călătorie urbană",
    price: "25 EUR pentru un transfer individual",
    priceNote: "Ora, adresa și detaliile călătoriei se confirmă în prealabil.",
    sections: [
      {
        title: "Cum rezervați",
        paragraphs: [
          "Scrieți pe WhatsApp, Viber sau Telegram ori sunați-ne. Indicați data, numărul zborului, ora aproximativă a sosirii, numărul de pasageri și bagajele. După clarificarea detaliilor confirmăm disponibilitatea transferului.",
        ],
      },
      {
        title: "Cum are loc întâlnirea",
        paragraphs: [
          "Ora întâlnirii se stabilește din timp. Rămânem în contact înainte de aterizare, vă întâmpinăm la aeroport și ajutăm cu bagajele. Dacă programul se schimbă, anunțați-ne cât mai devreme.",
        ],
      },
      {
        title: "Ce include serviciul",
        paragraphs: [
          "Coordonarea prealabilă a orei, întâmpinarea la aeroport, ajutorul cu bagajele și o călătorie individuală, fără alți pasageri, direct la adresa apartamentului.",
        ],
      },
    ],
    contact: "Rezervă transferul",
  },
  en: {
    title: "Transfer from Chișinău Airport to your apartment",
    lead: "We meet you at the airport and drive directly to your accommodation. There is no need to find a taxi, explain the route or change transport after landing.",
    imageAlt: "Graphite Peugeot 3008 travelling through the city",
    price: "25 EUR for a private transfer",
    priceNote: "Time, address and trip details are confirmed in advance.",
    sections: [
      {
        title: "How to arrange it",
        paragraphs: [
          "Message us on WhatsApp, Viber or Telegram, or call. Share the date, flight number, approximate arrival time, passenger count and luggage. We confirm availability after the details have been agreed.",
        ],
      },
      {
        title: "Meeting at the airport",
        paragraphs: [
          "The meeting time is arranged in advance. We stay in touch before landing, meet you at the airport and help with luggage. If the flight schedule changes, let us know as early as possible.",
        ],
      },
      {
        title: "What the service includes",
        paragraphs: [
          "Advance coordination, airport meeting, luggage assistance and a private ride with no shared passengers directly to the apartment address.",
        ],
      },
    ],
    contact: "Arrange a transfer",
  },
  uk: {
    title: "Трансфер з аеропорту Кишинева до квартири",
    lead: "Зустрінемо в аеропорту та довеземо прямо до адреси проживання. Після прильоту не потрібно шукати таксі, пояснювати маршрут або робити пересадки.",
    imageAlt: "Графітовий Peugeot 3008 під час міської поїздки",
    price: "25 EUR за індивідуальний трансфер",
    priceNote: "Час, адреса та деталі поїздки підтверджуються заздалегідь.",
    sections: [
      {
        title: "Як замовити",
        paragraphs: [
          "Напишіть у WhatsApp, Viber, Telegram або зателефонуйте. Укажіть дату, номер рейсу, орієнтовний час прильоту, кількість пасажирів і багажу. Після уточнення деталей ми підтвердимо можливість трансферу.",
        ],
      },
      {
        title: "Як відбувається зустріч",
        paragraphs: [
          "Час зустрічі погоджується заздалегідь. Ми залишаємося на зв’язку перед прильотом, зустрічаємо в аеропорту та допомагаємо з багажем. Якщо розклад змінився, повідомте якомога раніше.",
        ],
      },
      {
        title: "Що входить у послугу",
        paragraphs: [
          "Попереднє погодження часу, зустріч в аеропорту, допомога з багажем та індивідуальна поїздка без попутників прямо до адреси квартири.",
        ],
      },
    ],
    contact: "Замовити трансфер",
  },
  cs: {
    title: "Transfer z letiště v Kišiněvě k apartmánu",
    lead: "Vyzvedneme vás na letišti a odvezeme přímo na adresu ubytování. Po příletu nemusíte hledat taxi, vysvětlovat trasu ani přestupovat.",
    imageAlt: "Grafitový Peugeot 3008 během jízdy městem",
    price: "25 EUR za soukromý transfer",
    priceNote: "Čas, adresa a podrobnosti cesty se potvrzují předem.",
    sections: [
      {
        title: "Jak transfer objednat",
        paragraphs: [
          "Napište přes WhatsApp, Viber nebo Telegram, případně zavolejte. Uveďte datum, číslo letu, přibližný čas příletu, počet cestujících a zavazadel. Po upřesnění potvrdíme dostupnost transferu.",
        ],
      },
      {
        title: "Jak probíhá setkání",
        paragraphs: [
          "Čas setkání domluvíme předem. Před příletem zůstáváme v kontaktu, vyzvedneme vás na letišti a pomůžeme se zavazadly. Při změně letového řádu nám dejte vědět co nejdříve.",
        ],
      },
      {
        title: "Co služba zahrnuje",
        paragraphs: [
          "Předchozí domluvu času, vyzvednutí na letišti, pomoc se zavazadly a soukromou jízdu bez dalších cestujících přímo k apartmánu.",
        ],
      },
    ],
    contact: "Objednat transfer",
  },
};

const primaryButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#d4146f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b81160] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f]";
const secondaryButton = "inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#07111f] transition hover:border-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07111f]";

function AboutPage({ copy }: { copy: AboutCopy }) {
  return (
    <article className="bg-[#faf9f6] text-[#07111f]">
      <header className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-12 lg:px-8">
        <h1 className="max-w-5xl text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
          {copy.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
          {copy.lead}
        </p>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-slate-200 sm:aspect-[16/9] sm:rounded-[30px]">
          <Image
            src="/service-pages/about-apartment.webp"
            alt={copy.imageAlt}
            fill
            preload
            sizes="(min-width: 1280px) 1216px, calc(100vw - 32px)"
            className="object-cover object-center"
          />
        </div>
      </div>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <blockquote className="border-y border-slate-300 py-12 font-serif text-2xl italic leading-[1.45] text-[#07111f] sm:py-16 sm:text-4xl">
          {copy.quote}
        </blockquote>
        <p className="mt-14 max-w-3xl text-lg leading-8 text-slate-700 sm:text-xl sm:leading-9">
          {copy.introduction}
        </p>

        <div className="mt-16">
          {copy.sections.map((section) => (
            <section key={section.title} className="grid gap-5 border-t border-slate-300 py-10 md:grid-cols-[0.38fr_0.62fr] md:gap-12 md:py-12">
              <h2 className="text-2xl font-semibold tracking-[-0.02em]">{section.title}</h2>
              <div className="max-w-2xl space-y-5 text-base leading-8 text-slate-600 sm:text-lg">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>
      </section>

      <SimpleCta
        title={copy.closingTitle}
        text={copy.closingText}
        primaryLabel={copy.apartments}
        primaryHref="/apartments"
        secondaryLabel={copy.contact}
      />
    </article>
  );
}

function RulesPage({ copy }: { copy: RulesCopy }) {
  return (
    <article className="bg-[#faf9f6] text-[#07111f]">
      <header className="mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-8 sm:px-6 sm:pt-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <h1 className="text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl">{copy.title}</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">{copy.lead}</p>
          <p className="mt-7 max-w-xl border-l-2 border-[#d4146f] pl-5 text-base leading-7 text-slate-700">{copy.schedule}</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-slate-200 sm:aspect-[16/10] sm:rounded-[30px]">
          <Image
            src="/service-pages/check-in-ready.webp"
            alt={copy.imageAlt}
            fill
            preload
            sizes="(min-width: 1024px) 58vw, calc(100vw - 32px)"
            className="object-cover object-center"
          />
        </div>
      </header>

      <ol className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        {copy.steps.map((step, index) => (
          <li key={step.title} className="grid gap-4 border-t border-slate-300 py-10 sm:grid-cols-[80px_1fr] sm:gap-8 sm:py-12">
            <span className="text-5xl font-light leading-none text-slate-300" aria-hidden="true">{index + 1}</span>
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{step.title}</h2>
              <div className="mt-5 max-w-3xl space-y-4 text-base leading-8 text-slate-600 sm:text-lg">
                {step.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <SimpleCta
        title={copy.closing}
        primaryLabel={copy.contact}
        primaryHref="https://wa.me/37369990190"
      />
    </article>
  );
}

function TransferPage({ copy }: { copy: TransferCopy }) {
  return (
    <article className="bg-[#faf9f6] text-[#07111f]">
      <header className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <div className="grid gap-7 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl">{copy.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">{copy.lead}</p>
          </div>
          <div className="border-t border-slate-300 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="text-2xl font-semibold">{copy.price}</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">{copy.priceNote}</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-slate-200 sm:aspect-[16/8] sm:rounded-[30px]">
          <Image
            src="/service-pages/transfer-city.webp"
            alt={copy.imageAlt}
            fill
            preload
            sizes="(min-width: 1280px) 1216px, calc(100vw - 32px)"
            className="object-cover object-center"
          />
        </div>
      </div>

      <ol className="mx-auto grid max-w-7xl gap-0 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-3 lg:px-8">
        {copy.sections.map((section, index) => (
          <li key={section.title} className="border-t border-slate-300 py-9 lg:border-l lg:border-t-0 lg:px-9 lg:py-0 first:lg:border-l-0 first:lg:pl-0">
            <p className="text-sm text-slate-400">{index + 1}.</p>
            <h2 className="mt-5 text-2xl font-semibold tracking-[-0.02em]">{section.title}</h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-slate-600">
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </li>
        ))}
      </ol>

      <SimpleCta
        title={copy.price}
        text={copy.priceNote}
        primaryLabel={copy.contact}
        primaryHref="https://wa.me/37369990190"
      />
    </article>
  );
}

function SimpleCta({
  title,
  text,
  primaryLabel,
  primaryHref,
  secondaryLabel,
}: {
  title: string;
  text?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="border-t border-white/10 bg-[#07111f] px-4 py-14 text-white sm:px-6 sm:py-18 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <h2 className="max-w-3xl text-2xl font-semibold leading-tight tracking-[-0.02em] sm:text-3xl">{title}</h2>
          {text ? <p className="mt-3 max-w-2xl leading-7 text-white/65">{text}</p> : null}
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href={primaryHref} className={primaryButton}>{primaryLabel}</Link>
          {secondaryLabel ? <Link href="https://wa.me/37369990190" className={secondaryButton}>{secondaryLabel}</Link> : null}
        </div>
      </div>
    </section>
  );
}

export default function InfoPage({ kind }: { kind: InfoPageKind }) {
  const { language } = useLanguage();

  if (kind === "about") return <AboutPage copy={aboutCopy[language]} />;
  if (kind === "rules") return <RulesPage copy={rulesCopy[language]} />;
  if (kind === "transfer") return <TransferPage copy={transferCopy[language]} />;
  return null;
}
