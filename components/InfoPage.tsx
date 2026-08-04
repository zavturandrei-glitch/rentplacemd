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

type AboutBusinessCopy = {
  title: string;
  lead: string;
  chooseApartment: string;
  manageApartment: string;
  whoTitle: string;
  who: string[];
  guestsTitle: string;
  guestItems: string[];
  ownersTitle: string;
  ownersText: string;
  ownerItems: string[];
  suitableTitle: string;
  suitableItems: string[];
  stepsTitle: string;
  steps: string[];
  ownerCtaTitle: string;
  ownerCtaText: string;
  whatsapp: string;
  viber: string;
  telegram: string;
  call: string;
};

const aboutBusinessCopy: Record<Language, AboutBusinessCopy> = {
  ru: {
    title: "RentPlaceMD — квартиры посуточно и профессиональное управление недвижимостью в Кишинёве",
    lead: "Помогаем гостям быстро находить подходящие квартиры, а владельцам — получать доход от посуточной аренды без ежедневной рутины.",
    chooseApartment: "Подобрать квартиру",
    manageApartment: "Передать квартиру в управление",
    whoTitle: "Кто мы",
    who: [
      "RentPlaceMD — локальный сервис посуточной аренды квартир в Кишинёве. Мы работаем непосредственно с объектами размещения, помогаем гостям подобрать подходящую квартиру и сопровождаем бронирование от первого обращения до выезда.",
      "Наша задача — сделать аренду понятной, быстрой и безопасной: предоставить актуальную информацию, реальные фотографии, удобную связь и поддержку во время проживания.",
    ],
    guestsTitle: "Что получают гости",
    guestItems: [
      "Подбор квартиры по датам, бюджету и району",
      "Реальные фотографии и понятное описание",
      "Прямая связь с RentPlaceMD",
      "Сопровождение до заселения",
      "Помощь во время проживания",
      "Возможность заказать трансфер",
      "Квартиры в центре и других удобных районах Кишинёва",
    ],
    ownersTitle: "Передайте квартиру в профессиональное администрирование",
    ownersText: "Если у вас есть квартира в Кишинёве, RentPlaceMD может взять на себя организацию посуточной аренды полностью или частично. Формат сотрудничества и перечень услуг согласовываются индивидуально с владельцем.",
    ownerItems: [
      "Подготовка объекта к размещению",
      "Создание и улучшение объявления",
      "Фотографии и описание",
      "Размещение на RentPlaceMD и согласованных площадках",
      "Обработка обращений и общение с гостями",
      "Согласование бронирований",
      "Ведение календаря занятости",
      "Организация заселения и выезда",
      "Координация уборки и подготовки квартиры",
      "Контроль состояния объекта",
      "Информирование владельца",
      "Рекомендации по цене и загрузке",
    ],
    suitableTitle: "Кому подходит такой формат",
    suitableItems: [
      "Владельцам, которые живут за границей",
      "Тем, у кого нет времени ежедневно заниматься гостями",
      "Собственникам, которым сложно вести несколько площадок",
      "Владельцам, желающим улучшить объявление и обслуживание",
      "Инвесторам с одной или несколькими квартирами",
    ],
    stepsTitle: "Как начать сотрудничество",
    steps: [
      "Свяжитесь с RentPlaceMD удобным способом.",
      "Мы знакомимся с квартирой и обсуждаем условия.",
      "Согласовываем формат управления и перечень услуг.",
      "Подготавливаем объект и начинаем работу.",
    ],
    ownerCtaTitle: "Есть квартира в Кишинёве?",
    ownerCtaText: "Свяжитесь с нами, чтобы обсудить размещение квартиры на RentPlaceMD или передачу объекта в администрирование.",
    whatsapp: "Написать в WhatsApp",
    viber: "Написать в Viber",
    telegram: "Написать в Telegram",
    call: "Позвонить",
  },
  ro: {
    title: "RentPlaceMD — apartamente în regim hotelier și administrare profesionistă în Chișinău",
    lead: "Îi ajutăm pe oaspeți să găsească rapid apartamentul potrivit, iar pe proprietari să obțină venituri din închirierea pe termen scurt fără rutina zilnică.",
    chooseApartment: "Alege un apartament",
    manageApartment: "Încredințează-ne apartamentul",
    whoTitle: "Cine suntem",
    who: [
      "RentPlaceMD este un serviciu local de închiriere în regim hotelier în Chișinău. Lucrăm direct cu proprietățile, îi ajutăm pe oaspeți să aleagă locuința potrivită și îi însoțim de la prima solicitare până la plecare.",
      "Ne dorim ca închirierea să fie clară, rapidă și sigură, cu informații actuale, fotografii reale, comunicare accesibilă și sprijin în timpul șederii.",
    ],
    guestsTitle: "Ce primesc oaspeții",
    guestItems: [
      "Selecție după date, buget și zonă",
      "Fotografii reale și descrieri clare",
      "Comunicare directă cu RentPlaceMD",
      "Asistență înainte de cazare",
      "Ajutor în timpul șederii",
      "Posibilitatea de a comanda transfer",
      "Apartamente în centru și în alte zone convenabile",
    ],
    ownersTitle: "Încredințați apartamentul unei administrări profesioniste",
    ownersText: "Dacă aveți un apartament în Chișinău, RentPlaceMD poate prelua integral sau parțial organizarea închirierii pe termen scurt. Formatul colaborării și serviciile se stabilesc individual cu proprietarul.",
    ownerItems: [
      "Pregătirea proprietății pentru închiriere",
      "Crearea și îmbunătățirea anunțului",
      "Fotografii și descriere",
      "Publicarea pe RentPlaceMD și pe platformele agreate",
      "Prelucrarea solicitărilor și comunicarea cu oaspeții",
      "Coordonarea rezervărilor",
      "Gestionarea calendarului de ocupare",
      "Organizarea cazării și plecării",
      "Coordonarea curățeniei și pregătirii",
      "Supravegherea stării proprietății",
      "Informarea proprietarului",
      "Recomandări privind prețul și gradul de ocupare",
    ],
    suitableTitle: "Cui i se potrivește",
    suitableItems: [
      "Proprietarilor care locuiesc în străinătate",
      "Celor care nu au timp pentru comunicarea zilnică cu oaspeții",
      "Proprietarilor care gestionează cu dificultate mai multe platforme",
      "Celor care vor un anunț și un serviciu mai bine organizate",
      "Investitorilor cu unul sau mai multe apartamente",
    ],
    stepsTitle: "Cum începem colaborarea",
    steps: [
      "Contactați RentPlaceMD prin canalul preferat.",
      "Cunoaștem apartamentul și discutăm condițiile.",
      "Stabilim formatul administrării și serviciile.",
      "Pregătim proprietatea și începem activitatea.",
    ],
    ownerCtaTitle: "Aveți un apartament în Chișinău?",
    ownerCtaText: "Contactați-ne pentru a discuta publicarea pe RentPlaceMD sau administrarea proprietății.",
    whatsapp: "Scrie pe WhatsApp",
    viber: "Scrie pe Viber",
    telegram: "Scrie pe Telegram",
    call: "Sună",
  },
  en: {
    title: "RentPlaceMD — short-stay apartments and professional property management in Chișinău",
    lead: "We help guests find the right apartment quickly and help owners earn from short stays without managing the daily routine themselves.",
    chooseApartment: "Find an apartment",
    manageApartment: "Let us manage your apartment",
    whoTitle: "Who we are",
    who: [
      "RentPlaceMD is a local short-stay apartment service in Chișinău. We work directly with the properties, help guests choose suitable accommodation and support each stay from the first enquiry to departure.",
      "Our aim is to make renting clear, efficient and safe through current information, genuine photographs, accessible communication and support during the stay.",
    ],
    guestsTitle: "What guests receive",
    guestItems: [
      "Apartment selection by dates, budget and area",
      "Genuine photographs and clear descriptions",
      "Direct contact with RentPlaceMD",
      "Support before check-in",
      "Help during the stay",
      "Optional airport transfer",
      "Apartments in the centre and other convenient areas",
    ],
    ownersTitle: "Put your apartment in professional management",
    ownersText: "If you own an apartment in Chișinău, RentPlaceMD can manage all or part of its short-stay operation. The scope of work and cooperation model are agreed individually with each owner.",
    ownerItems: [
      "Preparing the property for guests",
      "Creating and improving the listing",
      "Photography and written description",
      "Publishing on RentPlaceMD and agreed platforms",
      "Handling enquiries and guest communication",
      "Coordinating reservations",
      "Maintaining the occupancy calendar",
      "Organising check-in and departure",
      "Coordinating cleaning and preparation",
      "Monitoring the condition of the property",
      "Keeping the owner informed",
      "Recommendations on pricing and occupancy",
    ],
    suitableTitle: "Who this suits",
    suitableItems: [
      "Owners who live abroad",
      "Owners without time for daily guest communication",
      "People who find it difficult to manage several platforms",
      "Owners who want to improve their listing and service",
      "Investors with one or several apartments",
    ],
    stepsTitle: "How to start",
    steps: [
      "Contact RentPlaceMD through your preferred channel.",
      "We visit the apartment and discuss the terms.",
      "We agree the management model and services.",
      "We prepare the property and begin work.",
    ],
    ownerCtaTitle: "Do you own an apartment in Chișinău?",
    ownerCtaText: "Contact us to discuss listing it on RentPlaceMD or placing the property under management.",
    whatsapp: "Message on WhatsApp",
    viber: "Message on Viber",
    telegram: "Message on Telegram",
    call: "Call us",
  },
  uk: {
    title: "RentPlaceMD — подобова оренда та професійне управління нерухомістю в Кишиневі",
    lead: "Допомагаємо гостям швидко знаходити відповідні квартири, а власникам — отримувати дохід від подобової оренди без щоденної рутини.",
    chooseApartment: "Підібрати квартиру",
    manageApartment: "Передати квартиру в управління",
    whoTitle: "Хто ми",
    who: [
      "RentPlaceMD — локальний сервіс подобової оренди квартир у Кишиневі. Ми працюємо безпосередньо з об’єктами, допомагаємо гостям обрати житло та супроводжуємо проживання від першого звернення до виїзду.",
      "Наше завдання — зробити оренду зрозумілою, швидкою та безпечною завдяки актуальній інформації, реальним фотографіям, зручному зв’язку й підтримці під час проживання.",
    ],
    guestsTitle: "Що отримують гості",
    guestItems: [
      "Підбір квартири за датами, бюджетом і районом",
      "Реальні фотографії та зрозумілий опис",
      "Прямий зв’язок із RentPlaceMD",
      "Супровід до заселення",
      "Допомога під час проживання",
      "Можливість замовити трансфер",
      "Квартири в центрі та інших зручних районах",
    ],
    ownersTitle: "Передайте квартиру в професійне адміністрування",
    ownersText: "Якщо у вас є квартира в Кишиневі, RentPlaceMD може повністю або частково організувати її подобову оренду. Формат співпраці та перелік послуг погоджуються з власником індивідуально.",
    ownerItems: [
      "Підготовка об’єкта до розміщення",
      "Створення та покращення оголошення",
      "Фотографії й опис",
      "Розміщення на RentPlaceMD і погоджених платформах",
      "Обробка звернень і спілкування з гостями",
      "Погодження бронювань",
      "Ведення календаря зайнятості",
      "Організація заселення та виїзду",
      "Координація прибирання й підготовки",
      "Контроль стану об’єкта",
      "Інформування власника",
      "Рекомендації щодо ціни та завантаження",
    ],
    suitableTitle: "Кому підходить",
    suitableItems: [
      "Власникам, які живуть за кордоном",
      "Тим, хто не має часу щодня працювати з гостями",
      "Власникам, яким складно вести кілька платформ",
      "Тим, хто прагне покращити оголошення та сервіс",
      "Інвесторам з однією чи кількома квартирами",
    ],
    stepsTitle: "Як почати співпрацю",
    steps: [
      "Зв’яжіться з RentPlaceMD зручним способом.",
      "Ми знайомимося з квартирою та обговорюємо умови.",
      "Погоджуємо формат управління і перелік послуг.",
      "Готуємо об’єкт і починаємо роботу.",
    ],
    ownerCtaTitle: "Маєте квартиру в Кишиневі?",
    ownerCtaText: "Зв’яжіться з нами, щоб обговорити розміщення на RentPlaceMD або передачу об’єкта в адміністрування.",
    whatsapp: "Написати у WhatsApp",
    viber: "Написати у Viber",
    telegram: "Написати у Telegram",
    call: "Зателефонувати",
  },
  cs: {
    title: "RentPlaceMD — krátkodobé pronájmy a profesionální správa nemovitostí v Kišiněvě",
    lead: "Hostům pomáháme rychle najít vhodný apartmán a majitelům získávat příjem z krátkodobých pobytů bez každodenní administrativy.",
    chooseApartment: "Vybrat apartmán",
    manageApartment: "Svěřit apartmán do správy",
    whoTitle: "Kdo jsme",
    who: [
      "RentPlaceMD je místní služba krátkodobých pronájmů v Kišiněvě. Pracujeme přímo s ubytovacími objekty, pomáháme hostům vybrat vhodný apartmán a provázíme pobyt od prvního dotazu až po odjezd.",
      "Naším cílem je přehledný, rychlý a bezpečný pronájem s aktuálními informacemi, skutečnými fotografiemi, snadným kontaktem a podporou během pobytu.",
    ],
    guestsTitle: "Co získávají hosté",
    guestItems: [
      "Výběr podle termínu, rozpočtu a čtvrti",
      "Skutečné fotografie a jasný popis",
      "Přímý kontakt s RentPlaceMD",
      "Podporu před ubytováním",
      "Pomoc během pobytu",
      "Možnost objednat transfer",
      "Apartmány v centru i dalších praktických čtvrtích",
    ],
    ownersTitle: "Svěřte apartmán do profesionální správy",
    ownersText: "Máte-li apartmán v Kišiněvě, RentPlaceMD může převzít celou nebo část organizace krátkodobých pronájmů. Rozsah služeb a způsob spolupráce domlouváme s každým majitelem individuálně.",
    ownerItems: [
      "Příprava nemovitosti pro hosty",
      "Vytvoření a vylepšení nabídky",
      "Fotografie a textový popis",
      "Zveřejnění na RentPlaceMD a dohodnutých platformách",
      "Vyřizování dotazů a komunikace s hosty",
      "Koordinace rezervací",
      "Správa kalendáře obsazenosti",
      "Organizace příjezdu a odjezdu",
      "Koordinace úklidu a přípravy",
      "Kontrola stavu nemovitosti",
      "Informování majitele",
      "Doporučení k ceně a obsazenosti",
    ],
    suitableTitle: "Pro koho je služba vhodná",
    suitableItems: [
      "Pro majitele žijící v zahraničí",
      "Pro ty, kdo nemají čas na každodenní komunikaci s hosty",
      "Pro majitele, kteří obtížně spravují více platforem",
      "Pro ty, kdo chtějí zlepšit nabídku a služby",
      "Pro investory s jedním či několika apartmány",
    ],
    stepsTitle: "Jak začít spolupráci",
    steps: [
      "Kontaktujte RentPlaceMD zvoleným způsobem.",
      "Seznámíme se s apartmánem a probereme podmínky.",
      "Dohodneme model správy a rozsah služeb.",
      "Připravíme nemovitost a zahájíme práci.",
    ],
    ownerCtaTitle: "Máte apartmán v Kišiněvě?",
    ownerCtaText: "Ozvěte se nám a probereme zveřejnění na RentPlaceMD nebo předání nemovitosti do správy.",
    whatsapp: "Napsat na WhatsApp",
    viber: "Napsat na Viber",
    telegram: "Napsat na Telegram",
    call: "Zavolat",
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

function AboutPage({ copy, business }: { copy: AboutCopy; business: AboutBusinessCopy }) {
  return (
    <article className="bg-[#faf9f6] text-[#07111f]">
      <header className="mx-auto grid max-w-7xl gap-7 px-4 pb-8 pt-8 sm:gap-10 sm:px-6 sm:pb-16 sm:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:px-8">
        <div>
          <h1 className="max-w-5xl text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[3.5rem]">
            {business.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
            {business.lead}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <Link href="/apartments" className={primaryButton}>{business.chooseApartment}</Link>
            <Link href="#owners" className={secondaryButton}>{business.manageApartment}</Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-slate-200 sm:aspect-[16/12] sm:rounded-[30px]">
          <Image
            src="/service-pages/about-apartment.webp"
            alt={copy.imageAlt}
            fill
            preload
            sizes="(min-width: 1024px) 46vw, calc(100vw - 32px)"
            className="object-cover object-center"
          />
        </div>
      </header>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 sm:py-20 md:grid-cols-[0.34fr_0.66fr] md:gap-14 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-[-0.03em]">{business.whoTitle}</h2>
          <div className="space-y-5 text-lg leading-8 text-slate-600">
            {business.who.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{business.guestsTitle}</h2>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-[24px] border border-slate-200 bg-slate-200 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {business.guestItems.map((item) => (
            <li key={item} className="bg-white p-5 text-base font-medium leading-7 text-slate-700 sm:p-6">{item}</li>
          ))}
        </ul>
      </section>

      <section id="owners" className="scroll-mt-[210px] bg-[#07111f] text-white lg:scroll-mt-8">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
          <div>
            <h2 className="text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">{business.ownersTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-white/70">{business.ownersText}</p>
          </div>
          <ul className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
            {business.ownerItems.map((item) => (
              <li key={item} className="border-t border-white/15 py-4 text-sm font-medium leading-6 text-white/85">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:gap-12 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-[-0.03em]">{business.suitableTitle}</h2>
          <ul className="mt-7 divide-y divide-slate-300 border-y border-slate-300">
            {business.suitableItems.map((item) => <li key={item} className="py-4 leading-7 text-slate-600">{item}</li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-3xl font-semibold tracking-[-0.03em]">{business.stepsTitle}</h2>
          <ol className="mt-7 space-y-5">
            {business.steps.map((step, index) => (
              <li key={step} className="grid grid-cols-[42px_1fr] gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-sm font-semibold">{index + 1}</span>
                <p className="pt-1.5 leading-7 text-slate-600">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-4 py-10 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold tracking-[-0.03em]">{business.ownerCtaTitle}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{business.ownerCtaText}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <a href="https://wa.me/37369990190" target="_blank" rel="noopener noreferrer" className={primaryButton}>{business.whatsapp}</a>
            <a href="viber://chat?number=%2B37369990190" className={secondaryButton}>{business.viber}</a>
            <a href="https://t.me/rentplacemd" target="_blank" rel="noopener noreferrer" className={secondaryButton}>{business.telegram}</a>
            <a href="tel:+37379990190" className={secondaryButton}>{business.call}</a>
          </div>
          <p className="mt-6 text-sm font-medium text-slate-500">+373 79 990 190 · +373 69 990 190</p>
        </div>
      </section>
    </article>
  );
}

function RulesPage({ copy }: { copy: RulesCopy }) {
  return (
    <article className="bg-[#faf9f6] text-[#07111f]">
      <header className="mx-auto grid max-w-7xl gap-7 px-4 pb-8 pt-8 sm:gap-10 sm:px-6 sm:pb-14 sm:pt-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16 lg:px-8">
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

      <ol className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 sm:pb-24 lg:px-8">
        {copy.steps.map((step, index) => (
          <li key={step.title} className="grid gap-4 border-t border-slate-300 py-7 sm:grid-cols-[80px_1fr] sm:gap-8 sm:py-12">
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
      <header className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 sm:pb-12 sm:pt-12 lg:px-8">
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

      <ol className="mx-auto grid max-w-7xl gap-0 px-4 py-10 sm:px-6 sm:py-24 lg:grid-cols-3 lg:px-8">
        {copy.sections.map((section, index) => (
          <li key={section.title} className="border-t border-slate-300 py-7 sm:py-9 lg:border-l lg:border-t-0 lg:px-9 lg:py-0 first:lg:border-l-0 first:lg:pl-0">
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
    <section className="border-t border-white/10 bg-[#07111f] px-4 py-10 text-white sm:px-6 sm:py-18 lg:px-8">
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

  if (kind === "about") return <AboutPage copy={aboutCopy[language]} business={aboutBusinessCopy[language]} />;
  if (kind === "rules") return <RulesPage copy={rulesCopy[language]} />;
  if (kind === "transfer") return <TransferPage copy={transferCopy[language]} />;
  return null;
}
