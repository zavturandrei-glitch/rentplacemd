import type { Language } from "@/locales/translations";

type ApartmentsPageCopy = {
  breadcrumbHome: string;
  breadcrumbApartments: string;
  title: string;
  intro: string;
  catalogSummary: (count: number) => string;
  faqTitle: string;
  faq: Array<{ question: string; answer: string }>;
};

export const apartmentsPageContent: Record<Language, ApartmentsPageCopy> = {
  ru: {
    breadcrumbHome: "Главная",
    breadcrumbApartments: "Квартиры",
    title: "Квартиры посуточно в Кишинёве — каталог и цены",
    intro: "В каталоге RentPlaceMD собраны квартиры для посуточной и краткосрочной аренды в Кишинёве. Сравните актуальные цены, реальные фотографии, адрес, планировку и указанную вместимость каждого варианта. На странице конкретной квартиры можно посмотреть доступные даты, условия проживания и подробные характеристики. После выбора свяжитесь с администратором RentPlaceMD по телефону или через удобный мессенджер, чтобы уточнить свободные даты и отправить запрос на бронирование напрямую.",
    catalogSummary: (count) => `Сейчас в каталоге опубликовано ${count} квартир категорий Эконом, Стандарт, Комфорт и Премиум. Откройте подходящий вариант, чтобы сравнить его характеристики и проверить календарь.`,
    faqTitle: "Частые вопросы о посуточной аренде",
    faq: [
      { question: "Сколько стоит квартира на сутки?", answer: "Опубликованные цены указаны на карточках квартир в MDL за сутки. Для длительного проживания и отдельных дат возможна индивидуальная цена, которую нужно уточнить при бронировании." },
      { question: "Как проверить свободные даты?", answer: "Откройте страницу квартиры и выберите даты в календаре. После этого можно отправить запрос администратору RentPlaceMD через WhatsApp или связаться по телефону." },
      { question: "Во сколько заезд и выезд?", answer: "Стандартный заезд — с 14:00, выезд — до 12:00. Ранний заезд и поздний выезд согласовываются заранее, если квартира свободна." },
      { question: "Как связаться с RentPlaceMD?", answer: "На сайте доступны телефон, WhatsApp, Viber и Telegram. Для запроса укажите даты, ID выбранной квартиры и количество гостей." },
    ],
  },
  ro: {
    breadcrumbHome: "Acasă",
    breadcrumbApartments: "Apartamente",
    title: "Apartamente în regim hotelier în Chișinău — catalog și prețuri",
    intro: "Catalogul RentPlaceMD reunește apartamente pentru cazare pe termen scurt în Chișinău. Comparați prețurile actuale, fotografiile reale, adresa, compartimentarea și capacitatea indicată pentru fiecare opțiune. Pe pagina apartamentului puteți vedea datele disponibile, condițiile de cazare și caracteristicile detaliate. După ce alegeți, contactați direct administratorul RentPlaceMD prin telefon sau messenger pentru a confirma datele libere și a trimite solicitarea de rezervare.",
    catalogSummary: (count) => `În catalog sunt publicate în prezent ${count} de apartamente din categoriile Economic, Standard, Confort și Premium. Deschideți o opțiune pentru a compara caracteristicile și calendarul.`,
    faqTitle: "Întrebări despre cazarea pe termen scurt",
    faq: [
      { question: "Cât costă un apartament pe noapte?", answer: "Prețurile publicate sunt afișate pe cardurile apartamentelor în MDL pe noapte. Pentru șederi mai lungi și anumite date poate fi disponibil un preț individual, confirmat la rezervare." },
      { question: "Cum verific datele libere?", answer: "Deschideți pagina apartamentului și selectați datele în calendar. Apoi puteți trimite o solicitare administratorului RentPlaceMD prin WhatsApp sau puteți suna." },
      { question: "Care sunt orele de check-in și check-out?", answer: "Check-inul standard începe la 14:00, iar check-outul este până la 12:00. Sosirea mai devreme și plecarea mai târziu se coordonează în avans dacă apartamentul este liber." },
      { question: "Cum contactez RentPlaceMD?", answer: "Pe site sunt disponibile telefonul, WhatsApp, Viber și Telegram. În solicitare indicați datele, ID-ul apartamentului și numărul de oaspeți." },
    ],
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbApartments: "Apartments",
    title: "Short-stay apartments in Chisinau — catalogue and prices",
    intro: "The RentPlaceMD catalogue brings together apartments for daily and short stays in Chisinau. Compare current prices, real photographs, the address, layout and stated guest capacity for each option. An apartment page shows available dates, stay conditions and detailed features. Once you have chosen a suitable property, contact the RentPlaceMD administrator directly by phone or messenger to confirm the dates and send a booking request.",
    catalogSummary: (count) => `The catalogue currently contains ${count} published apartments across Economy, Standard, Comfort and Premium. Open an option to compare its features and availability calendar.`,
    faqTitle: "Short-stay apartment questions",
    faq: [
      { question: "How much is an apartment per night?", answer: "Published prices are shown on apartment cards in MDL per night. An individual price may be available for longer stays and selected dates and is confirmed when booking." },
      { question: "How do I check available dates?", answer: "Open an apartment page and select your dates in the calendar. You can then send a request to the RentPlaceMD administrator through WhatsApp or call by phone." },
      { question: "What are the check-in and check-out times?", answer: "Standard check-in is from 14:00 and check-out is by 12:00. Early arrival and late departure can be arranged in advance when the apartment is available." },
      { question: "How can I contact RentPlaceMD?", answer: "The website provides phone, WhatsApp, Viber and Telegram contacts. Include your dates, the apartment ID and the number of guests in your request." },
    ],
  },
  uk: {
    breadcrumbHome: "Головна",
    breadcrumbApartments: "Квартири",
    title: "Квартири подобово в Кишиневі — каталог і ціни",
    intro: "У каталозі RentPlaceMD зібрані квартири для подобової та короткострокової оренди в Кишиневі. Порівнюйте актуальні ціни, реальні фотографії, адресу, планування та зазначену місткість кожного варіанта. На сторінці квартири можна переглянути вільні дати, умови проживання й докладні характеристики. Після вибору зв’яжіться безпосередньо з адміністратором RentPlaceMD телефоном або через месенджер, щоб підтвердити дати та надіслати запит на бронювання.",
    catalogSummary: (count) => `Зараз у каталозі опубліковано ${count} квартир категорій Економ, Стандарт, Комфорт і Преміум. Відкрийте варіант, щоб порівняти характеристики та календар.`,
    faqTitle: "Часті питання про подобову оренду",
    faq: [
      { question: "Скільки коштує квартира на добу?", answer: "Опубліковані ціни вказані на картках квартир у MDL за добу. Для тривалого проживання та окремих дат можлива індивідуальна ціна, яку потрібно уточнити під час бронювання." },
      { question: "Як перевірити вільні дати?", answer: "Відкрийте сторінку квартири та виберіть дати в календарі. Після цього можна надіслати запит адміністратору RentPlaceMD через WhatsApp або зателефонувати." },
      { question: "О котрій заїзд і виїзд?", answer: "Стандартний заїзд — з 14:00, виїзд — до 12:00. Ранній заїзд і пізній виїзд узгоджуються заздалегідь, якщо квартира вільна." },
      { question: "Як зв’язатися з RentPlaceMD?", answer: "На сайті доступні телефон, WhatsApp, Viber і Telegram. У запиті вкажіть дати, ID квартири та кількість гостей." },
    ],
  },
  cs: {
    breadcrumbHome: "Domů",
    breadcrumbApartments: "Apartmány",
    title: "Krátkodobé pronájmy v Kišiněvě — katalog a ceny",
    intro: "Katalog RentPlaceMD nabízí apartmány pro denní a krátkodobé pobyty v Kišiněvě. U každé možnosti můžete porovnat aktuální cenu, skutečné fotografie, adresu, dispozici a uvedenou kapacitu. Stránka apartmánu obsahuje dostupné termíny, podmínky pobytu a podrobné vybavení. Po výběru kontaktujte přímo správce RentPlaceMD telefonicky nebo přes messenger, ověřte volný termín a odešlete žádost o rezervaci.",
    catalogSummary: (count) => `V katalogu je nyní zveřejněno ${count} apartmánů v kategoriích Ekonomická, Standardní, Komfortní a Prémiová. Otevřete nabídku a porovnejte její vybavení a kalendář.`,
    faqTitle: "Časté otázky ke krátkodobému pobytu",
    faq: [
      { question: "Kolik stojí apartmán za noc?", answer: "Zveřejněné ceny jsou uvedeny na kartách apartmánů v MDL za noc. Pro delší pobyty a vybrané termíny může být dostupná individuální cena potvrzená při rezervaci." },
      { question: "Jak ověřím volné termíny?", answer: "Otevřete stránku apartmánu a vyberte termín v kalendáři. Poté můžete poslat žádost správci RentPlaceMD přes WhatsApp nebo zavolat." },
      { question: "Kdy je příjezd a odjezd?", answer: "Standardní příjezd je od 14:00 a odjezd do 12:00. Dřívější příjezd a pozdější odjezd lze domluvit předem, pokud je apartmán volný." },
      { question: "Jak mohu kontaktovat RentPlaceMD?", answer: "Na webu jsou k dispozici telefon, WhatsApp, Viber a Telegram. V žádosti uveďte termín, ID apartmánu a počet hostů." },
    ],
  },
};
