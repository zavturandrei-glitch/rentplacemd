import type { Language } from "@/locales/translations";

export const destinationSlugs = [
  "cricova",
  "milestii-mici",
  "purcari",
  "castel-mimi",
  "orheiul-vechi",
] as const;

export type DestinationSlug = (typeof destinationSlugs)[number];
export type LocalizedText = Record<Language, string>;

type DestinationFaq = {
  question: string;
  answer: string;
};

type DestinationCopy = {
  eyebrow: string;
  title: string;
  seoTitle: string;
  description: string;
  intro: string;
  why: string;
  knownFor: string;
  highlights: { title: string; body: string }[];
  visitTime: string;
  route: string;
  tips: string[];
  nearby: string[];
  faq: DestinationFaq[];
};

export type DestinationData = {
  slug: DestinationSlug;
  name: string;
  image: string;
  imageAlt: LocalizedText;
  accent: string;
  kind: "winery" | "heritage";
  mapUrl: string;
  officialUrl: string;
  sourceName: string;
  copy: Record<Language, DestinationCopy>;
};

export function isDestinationSlug(value: string): value is DestinationSlug {
  return destinationSlugs.includes(value as DestinationSlug);
}

export function destinationPath(slug: DestinationSlug) {
  return `/guide/${slug}`;
}

const alt = (ru: string, ro: string, en: string, uk: string, cs: string): LocalizedText => ({
  ru,
  ro,
  en,
  uk,
  cs,
});

export const destinationUi = {
  hubEyebrow: alt("Маршруты из Кишинёва", "Trasee din Chișinău", "Trips from Chisinau", "Маршрути з Кишинева", "Výlety z Kišiněva"),
  hubTitle: alt("Винодельни Молдовы", "Vinăriile Moldovei", "Wineries of Moldova", "Виноробні Молдови", "Moldavská vinařství"),
  hubIntro: alt(
    "Четыре винодельни с разным характером и один культурно-природный маршрут. Сравните атмосферу, время в дороге и формат визита — затем бронируйте экскурсию напрямую.",
    "Patru vinării cu personalități diferite și un traseu cultural-natural. Compară atmosfera, drumul și formatul vizitei, apoi rezervă direct.",
    "Four wineries with distinct personalities and one cultural-natural escape. Compare the atmosphere, journey and visit style, then book direct.",
    "Чотири виноробні з різним характером і один культурно-природний маршрут. Порівняйте атмосферу, дорогу та формат візиту, а потім бронюйте напряму.",
    "Čtyři vinařství s různou atmosférou a jeden kulturně-přírodní výlet. Porovnejte cestu i styl návštěvy a poté rezervujte přímo."
  ),
  wineriesLabel: alt("Винодельни", "Vinării", "Wineries", "Виноробні", "Vinařství"),
  heritageLabel: alt("Отдельный маршрут", "Traseu aparte", "A different day trip", "Окремий маршрут", "Jiný výlet"),
  openGuide: alt("Открыть путеводитель", "Deschide ghidul", "Open the guide", "Відкрити путівник", "Otevřít průvodce"),
  back: alt("Винодельни и маршруты", "Vinării și trasee", "Wineries and day trips", "Виноробні та маршрути", "Vinařství a výlety"),
  why: alt("Почему стоит приехать", "De ce merită vizitat", "Why it is worth visiting", "Чому варто приїхати", "Proč sem jet"),
  see: alt("Что посмотреть", "Ce să vezi", "What to see", "Що подивитися", "Co vidět"),
  knownFor: alt("Чем место известно", "Pentru ce este cunoscut", "What it is known for", "Чим місце відоме", "Čím je místo známé"),
  time: alt("Сколько времени выделить", "Cât timp să aloci", "How much time to allow", "Скільки часу виділити", "Kolik času si vyhradit"),
  route: alt("Как добраться из Кишинёва", "Cum ajungi din Chișinău", "Getting there from Chisinau", "Як дістатися з Кишинева", "Jak se dostat z Kišiněva"),
  tips: alt("Практические советы", "Sfaturi practice", "Practical tips", "Практичні поради", "Praktické tipy"),
  location: alt("Локация и маршрут", "Locație și traseu", "Location and directions", "Локація та маршрут", "Poloha a trasa"),
  map: alt("Открыть в Google Maps", "Deschide în Google Maps", "Open in Google Maps", "Відкрити в Google Maps", "Otevřít v Google Maps"),
  official: alt("Официальный сайт", "Site oficial", "Official website", "Офіційний сайт", "Oficiální web"),
  nearby: alt("Что посмотреть рядом", "Ce poți vedea în apropiere", "What to see nearby", "Що подивитися поруч", "Co navštívit v okolí"),
  faq: alt("Частые вопросы", "Întrebări frecvente", "Frequently asked questions", "Поширені запитання", "Časté otázky"),
  compareTitle: alt("Cricova или Mileștii Mici — что выбрать?", "Cricova sau Mileștii Mici — ce alegi?", "Cricova or Mileștii Mici — which should you choose?", "Cricova чи Mileștii Mici — що обрати?", "Cricova, nebo Mileștii Mici — co vybrat?"),
  compareBody: alt(
    "Cricova удобна для первого знакомства: она ближе к городу, а маршрут сочетает подземные улицы и нарядные дегустационные залы. Mileștii Mici выбирают ради масштаба подземных галерей и знаменитой коллекции. Для обеих виноделен нужна предварительная бронь; сравнивайте актуальную длительность и язык тура на официальных сайтах.",
    "Cricova este comodă pentru prima experiență: e mai aproape de oraș și combină străzi subterane cu săli elegante. Mileștii Mici atrage prin amploarea galeriilor și colecția renumită. La ambele este necesară rezervarea; compară durata și limba turului pe site-urile oficiale.",
    "Cricova is an easy first choice: it is closer to the city and combines underground streets with ornate tasting rooms. Mileștii Mici is about the scale of the galleries and its celebrated collection. Both require advance booking; compare current tour length and language on their official sites.",
    "Cricova зручна для першого знайомства: вона ближче до міста й поєднує підземні вулиці з ошатними залами. Mileștii Mici обирають за масштаб галерей і відому колекцію. Для обох потрібне попереднє бронювання; звіряйте тривалість і мову туру на офіційних сайтах.",
    "Cricova je snadná první volba: leží blíže městu a spojuje podzemní ulice s elegantními sály. Mileștii Mici láká rozsahem galerií a slavnou sbírkou. U obou je nutná rezervace; aktuální délku a jazyk prohlídky ověřte na oficiálním webu."
  ),
  stayTitle: alt("Где остановиться в Кишинёве", "Unde să te cazezi în Chișinău", "Where to stay in Chisinau", "Де зупинитися в Кишиневі", "Kde se ubytovat v Kišiněvě"),
  stayBody: alt(
    "Выберите квартиру в городе как спокойную базу для поездок по Молдове.",
    "Alege un apartament în oraș ca bază confortabilă pentru excursii prin Moldova.",
    "Choose a city apartment as a comfortable base for day trips around Moldova.",
    "Оберіть квартиру в місті як зручну базу для подорожей Молдовою.",
    "Vyberte si apartmán ve městě jako pohodlnou základnu pro výlety po Moldavsku."
  ),
  apartments: alt("Посмотреть квартиры", "Vezi apartamentele", "Browse apartments", "Переглянути квартири", "Prohlédnout apartmány"),
  related: alt("Продолжить путешествие", "Continuă călătoria", "Continue exploring", "Продовжити подорож", "Pokračovat v cestě"),
  verify: alt(
    "Расписание, цены и состав тура могут меняться. Проверяйте их перед выездом у самой площадки.",
    "Programul, prețurile și conținutul turului se pot schimba. Verifică-le direct înainte de plecare.",
    "Schedules, prices and tour contents can change. Check directly before setting out.",
    "Розклад, ціни та склад туру можуть змінюватися. Перевіряйте їх безпосередньо перед виїздом.",
    "Časy, ceny a obsah prohlídek se mohou měnit. Před cestou je ověřte přímo u místa."
  ),
};

export const destinations: Record<DestinationSlug, DestinationData> = {
  cricova: {
    slug: "cricova",
    name: "Cricova",
    image: "/guide/destinations/cricova.webp",
    imageAlt: alt("Подземная винная галерея Cricova", "Galerie vinicolă subterană la Cricova", "Underground wine gallery at Cricova", "Підземна винна галерея Cricova", "Podzemní vinná galerie v Cricově"),
    accent: "#d4146f",
    kind: "winery",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Cricova+Winery+Moldova",
    officialUrl: "https://cricova.md/en/excursii",
    sourceName: "Cricova",
    copy: {
      ru: {
        eyebrow: "Близкая поездка из Кишинёва",
        title: "Cricova: подземный город вина",
        seoTitle: "Cricova — экскурсия на винодельню из Кишинёва",
        description: "Практический гид по Cricova: подземные галереи, экскурсии, дорога из Кишинёва, советы и что посмотреть рядом.",
        intro: "Cricova — один из самых простых способов добавить винную Молдову в короткую поездку. Главный опыт здесь находится под землёй: бывшие известняковые выработки стали улицами, залами и местом выдержки вина.",
        why: "Ехать стоит не только ради дегустации. Масштаб подземного пространства, прохладный микроклимат и театральные залы превращают визит в самостоятельную достопримечательность.",
        knownFor: "Разветвлённые подземные галереи, традиционное производство игристых вин и коллекционные подвалы.",
        highlights: [
          { title: "Подземные улицы", body: "Маршрут проходит по широким тоннелям с названиями винных сортов; часть экскурсии обычно проходит на транспорте." },
          { title: "Производство и выдержка", body: "Гид объясняет, как стабильная температура под землёй используется для хранения и созревания вина." },
          { title: "Дегустационные залы", body: "Интерьеры заметно отличаются друг от друга и добавляют маршруту праздничный финал." },
        ],
        visitTime: "Обычно удобно заложить 2–3 часа на территории плюс дорогу. Точная длительность зависит от выбранного пакета.",
        route: "Cricova находится к северу от Кишинёва. Практичнее всего ехать на такси, трансфере или с организованной экскурсией; оставьте запас времени на прибытие до забронированного сеанса.",
        tips: ["Бронируйте заранее и сразу уточняйте язык экскурсии.", "Возьмите лёгкую куртку: под землёй прохладнее даже летом.", "После дегустации не садитесь за руль — планируйте обратный трансфер."],
        nearby: ["Кишинёв и его центральные парки", "Орхейский маршрут и Orheiul Vechi", "Музеи и рестораны столицы"],
        faq: [
          { question: "Нужна ли бронь в Cricova?", answer: "Да. Официальный сайт просит бронировать экскурсии заранее; одновременно подтвердите язык и состав программы." },
          { question: "Подойдёт ли Cricova без дегустации?", answer: "Да, ценность маршрута не ограничивается вином. Уточните у площадки доступный безалкогольный формат." },
          { question: "Что надеть?", answer: "Удобную обувь и дополнительный слой одежды: в подземных галереях прохладно." },
        ],
      },
      ro: {
        eyebrow: "Excursie aproape de Chișinău",
        title: "Cricova: orașul subteran al vinului",
        seoTitle: "Cricova — excursie la vinărie din Chișinău",
        description: "Ghid practic pentru Cricova: galerii subterane, excursii, drumul din Chișinău, sfaturi și locuri apropiate.",
        intro: "Cricova este una dintre cele mai simple modalități de a adăuga Moldova vinicolă într-un city-break. Experiența principală este sub pământ: fostele cariere de calcar au devenit străzi, săli și spații de maturare.",
        why: "Merită nu doar pentru degustare. Dimensiunea subteranelor, răcoarea constantă și sălile spectaculoase transformă turul într-o atracție în sine.",
        knownFor: "Galerii subterane ramificate, producerea tradițională a spumantelor și colecții păstrate în pivnițe.",
        highlights: [
          { title: "Străzi subterane", body: "Traseul trece prin tuneluri largi cu nume de soiuri; o parte a vizitei se face de regulă cu transport." },
          { title: "Producere și maturare", body: "Ghidul explică felul în care temperatura stabilă ajută la păstrarea și maturarea vinului." },
          { title: "Săli de degustare", body: "Interioarele diferite dau un final elegant și memorabil traseului." },
        ],
        visitTime: "Rezervă, de regulă, 2–3 ore la vinărie plus drumul. Durata exactă depinde de pachet.",
        route: "Cricova este la nord de Chișinău. Cel mai comod ajungi cu taxiul, transferul sau o excursie organizată; vino cu timp înaintea orei rezervate.",
        tips: ["Rezervă din timp și confirmă limba turului.", "Ia o jachetă subțire: în galerii este răcoare și vara.", "Nu conduce după degustare; stabilește transportul de întoarcere."],
        nearby: ["Chișinău și parcurile centrale", "Orheiul Vechi", "Muzeele și restaurantele capitalei"],
        faq: [
          { question: "Este necesară rezervarea?", answer: "Da. Site-ul oficial solicită rezervare în avans; confirmă și limba, și programul ales." },
          { question: "Merită fără degustare?", answer: "Da. Galeriile sunt atracția principală; întreabă despre opțiunile fără alcool." },
          { question: "Cum mă îmbrac?", answer: "Alege încălțăminte comodă și un strat suplimentar pentru temperatura mai scăzută din subteran." },
        ],
      },
      en: {
        eyebrow: "An easy trip from Chisinau",
        title: "Cricova: an underground wine city",
        seoTitle: "Cricova winery — a day trip from Chisinau",
        description: "A practical Cricova guide: underground galleries, tours, travel from Chisinau, useful tips and nearby places.",
        intro: "Cricova is one of the easiest ways to add Moldova’s wine culture to a short city break. Its defining experience is underground, where former limestone workings became streets, halls and ageing cellars.",
        why: "The visit is worthwhile beyond the tasting. The scale of the tunnels, cool microclimate and theatrical rooms make the tour an attraction in its own right.",
        knownFor: "A branching underground network, traditionally made sparkling wines and collection cellars.",
        highlights: [
          { title: "Underground streets", body: "The route follows broad tunnels named after grape varieties; part of the visit is normally covered by transport." },
          { title: "Production and ageing", body: "Guides explain how the stable underground temperature supports storage and maturation." },
          { title: "Tasting rooms", body: "Distinctive interiors give the route an atmospheric, celebratory finish." },
        ],
        visitTime: "Allow roughly 2–3 hours on site, plus travel. The exact duration depends on the package you book.",
        route: "Cricova lies north of Chisinau. A taxi, pre-arranged transfer or organised tour is the simplest option; leave time to arrive before your booked slot.",
        tips: ["Book ahead and confirm the tour language.", "Bring a light jacket: the galleries stay cool in summer.", "Do not drive after a tasting; arrange your return transport."],
        nearby: ["Central Chisinau and its parks", "Orheiul Vechi", "The capital’s museums and restaurants"],
        faq: [
          { question: "Do I need to book Cricova?", answer: "Yes. The official site asks visitors to reserve in advance; confirm the language and selected programme at the same time." },
          { question: "Is it worthwhile without tasting?", answer: "Yes. The underground complex is the main attraction; ask the venue about alcohol-free options." },
          { question: "What should I wear?", answer: "Comfortable shoes and an extra layer are sensible because the underground galleries are cool." },
        ],
      },
      uk: {
        eyebrow: "Близька подорож із Кишинева",
        title: "Cricova: підземне місто вина",
        seoTitle: "Cricova — екскурсія на виноробню з Кишинева",
        description: "Практичний гід Cricova: підземні галереї, екскурсії, дорога з Кишинева, поради та місця поруч.",
        intro: "Cricova — один із найпростіших способів додати винну Молдову до короткої подорожі. Головний досвід тут під землею: колишні вапнякові виробки стали вулицями, залами та місцем витримки вина.",
        why: "Їхати варто не лише заради дегустації. Масштаб підземелля, прохолодний мікроклімат і виразні зали роблять екскурсію окремою пам’яткою.",
        knownFor: "Розгалужені підземні галереї, традиційне виробництво ігристих вин і колекційні підвали.",
        highlights: [
          { title: "Підземні вулиці", body: "Маршрут іде широкими тунелями з назвами сортів; частину екскурсії зазвичай долають транспортом." },
          { title: "Виробництво й витримка", body: "Гід пояснює, як стабільна температура допомагає зберігати й витримувати вино." },
          { title: "Дегустаційні зали", body: "Різні інтер’єри додають маршруту святкового завершення." },
        ],
        visitTime: "Зазвичай варто закласти 2–3 години на місці плюс дорогу. Тривалість залежить від пакета.",
        route: "Cricova розташована на північ від Кишинева. Найзручніше їхати таксі, трансфером або з організованою екскурсією.",
        tips: ["Бронюйте заздалегідь і підтверджуйте мову.", "Візьміть легку куртку: під землею прохолодно.", "Після дегустації не сідайте за кермо."],
        nearby: ["Центральний Кишинів і парки", "Orheiul Vechi", "Музеї та ресторани столиці"],
        faq: [
          { question: "Чи потрібне бронювання?", answer: "Так. Офіційний сайт просить бронювати наперед; одразу підтвердьте мову та програму." },
          { question: "Чи варто їхати без дегустації?", answer: "Так. Підземний комплекс цікавий сам по собі; уточніть безалкогольний формат." },
          { question: "Що вдягнути?", answer: "Зручне взуття й додатковий шар одягу для прохолодних галерей." },
        ],
      },
      cs: {
        eyebrow: "Snadný výlet z Kišiněva",
        title: "Cricova: podzemní město vína",
        seoTitle: "Cricova — výlet do vinařství z Kišiněva",
        description: "Praktický průvodce Cricovou: podzemní galerie, prohlídky, cesta z Kišiněva, tipy a okolí.",
        intro: "Cricova je snadný způsob, jak během krátkého pobytu poznat vinařské Moldavsko. Bývalé vápencové lomy se proměnily v podzemní ulice, sály a sklepy.",
        why: "Návštěva stojí za to i bez degustace. Rozsah tunelů, chladné mikroklima a výrazné sály tvoří samostatný zážitek.",
        knownFor: "Rozvětvené podzemní galerie, tradiční výroba šumivých vín a sbírkové sklepy.",
        highlights: [
          { title: "Podzemní ulice", body: "Trasa vede širokými tunely pojmenovanými podle odrůd; část se obvykle projíždí dopravním prostředkem." },
          { title: "Výroba a zrání", body: "Průvodce vysvětlí, jak stabilní teplota pomáhá vínu zrát." },
          { title: "Degustační sály", body: "Odlišné interiéry dávají prohlídce slavnostní zakončení." },
        ],
        visitTime: "Počítejte přibližně se 2–3 hodinami na místě plus cestou. Přesný čas závisí na balíčku.",
        route: "Cricova leží severně od Kišiněva. Nejjednodušší je taxi, předem domluvený transfer nebo organizovaný výlet.",
        tips: ["Rezervujte předem a potvrďte jazyk.", "Vezměte si lehkou bundu.", "Po degustaci neřiďte a zajistěte si cestu zpět."],
        nearby: ["Centrum Kišiněva a parky", "Orheiul Vechi", "Muzea a restaurace hlavního města"],
        faq: [
          { question: "Je nutná rezervace?", answer: "Ano. Oficiální web žádá rezervaci předem; potvrďte jazyk i program." },
          { question: "Má návštěva smysl bez degustace?", answer: "Ano. Hlavní atrakcí je podzemní komplex; zeptejte se na nealkoholické možnosti." },
          { question: "Co si obléct?", answer: "Pohodlné boty a další vrstvu do chladných galerií." },
        ],
      },
    },
  },
  "milestii-mici": {
    slug: "milestii-mici",
    name: "Mileștii Mici",
    image: "/guide/destinations/milestii-mici.webp",
    imageAlt: alt("Вход в подземные галереи Mileștii Mici", "Intrarea în galeriile subterane Mileștii Mici", "Entrance to the Mileștii Mici underground galleries", "Вхід до підземних галерей Mileștii Mici", "Vstup do podzemních galerií Mileștii Mici"),
    accent: "#7f1d1d",
    kind: "winery",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Milestii+Mici+Winery+Moldova",
    officialUrl: "https://www.milestii-mici.md/en/wine-tours.html",
    sourceName: "Mileștii Mici",
    copy: {
      ru: {
        eyebrow: "Подземный маршрут к югу от столицы", title: "Mileștii Mici: галереи и золотая коллекция", seoTitle: "Mileștii Mici — винные галереи и поездка из Кишинёва", description: "Туристический гид по Mileștii Mici: подземные галереи, коллекция вин, бронирование, дорога и практические советы.",
        intro: "Mileștii Mici запоминается прежде всего масштабом: экскурсия ведёт через подземную сеть, где дорога, камень и ряды бутылок выглядят как отдельный город.",
        why: "Это выбор для тех, кому важны простор и ощущение настоящей экспедиции под землёй. Даже без интереса к дегустации галереи и история хранения производят сильное впечатление.",
        knownFor: "Обширный подземный комплекс и знаменитая коллекция бутылок, ставшая визитной карточкой винодельни.",
        highlights: [{ title: "Галереи", body: "Большая часть впечатления — движение по длинным подземным коридорам." }, { title: "Золотая коллекция", body: "Ряды выдержанных бутылок показывают коллекционный масштаб места." }, { title: "Залы и музей-магазин", body: "Тур обычно дополняют дегустационные пространства и знакомство с продукцией." }],
        visitTime: "Заложите около 2–3 часов на визит плюс дорогу и время на регистрацию.",
        route: "Винодельня находится примерно в 20 км к югу от Кишинёва. Удобнее ехать на такси или трансфере; заранее уточните у площадки требования к транспорту внутри галерей.",
        tips: ["Бронь обязательна — подтвердите язык и формат.", "Уточните, нужен ли автомобиль для выбранного маршрута.", "Берите тёплый слой одежды и не планируйте вождение после дегустации."],
        nearby: ["Кишинёв", "Манук-Бей в Хынчештах", "Южные винные маршруты Молдовы"],
        faq: [{ question: "Можно ли приехать без брони?", answer: "Нет, лучше не рисковать: официальный сайт указывает, что для посещения галерей нужна предварительная резервация." }, { question: "Нужен ли свой автомобиль?", answer: "Форматы меняются. Спросите при бронировании, какой транспорт используется в подземной части." }, { question: "Подходит ли поездка детям?", answer: "Официальный сайт допускает детей в сопровождении взрослых; актуальные условия подтвердите перед визитом." }],
      },
      ro: {
        eyebrow: "Traseu subteran la sud de capitală", title: "Mileștii Mici: galerii și Colecția de Aur", seoTitle: "Mileștii Mici — galerii vinicole și excursie din Chișinău", description: "Ghid pentru Mileștii Mici: galerii subterane, colecția de vinuri, rezervare, drum și sfaturi practice.",
        intro: "Mileștii Mici impresionează prin scară: traseul traversează o rețea subterană unde drumurile, piatra și șirurile de sticle par un oraș aparte.",
        why: "Este alegerea potrivită dacă vrei amploare și senzația unei expediții subterane. Galeriile și istoria păstrării vinului sunt memorabile chiar și fără degustare.",
        knownFor: "Complexul subteran extins și renumita colecție de sticle, simbolul vinăriei.",
        highlights: [{ title: "Galeriile", body: "O mare parte a experienței înseamnă deplasarea prin coridoare subterane lungi." }, { title: "Colecția de Aur", body: "Rândurile de sticle maturate arată dimensiunea colecționară a locului." }, { title: "Săli și magazin-muzeu", body: "Turul este completat de spații de degustare și produse locale." }],
        visitTime: "Alocă aproximativ 2–3 ore pentru vizită, plus drumul și înregistrarea.",
        route: "Vinăria se află la circa 20 km sud de Chișinău. Taxiul sau transferul sunt cele mai comode; întreabă ce transport este necesar în galerii.",
        tips: ["Rezervarea este necesară; confirmă limba.", "Întreabă dacă ai nevoie de automobil pentru traseu.", "Ia un strat călduros și nu conduce după degustare."],
        nearby: ["Chișinău", "Conacul Manuc Bey din Hîncești", "Traseele vinicole din sud"],
        faq: [{ question: "Pot veni fără rezervare?", answer: "Nu este recomandat: site-ul oficial cere rezervare pentru accesul în galerii." }, { question: "Am nevoie de mașină?", answer: "Formatele se pot schimba. Confirmă la rezervare transportul folosit în subteran." }, { question: "Pot veni copiii?", answer: "Site-ul oficial permite copii însoțiți de adulți; verifică regulile actuale." }],
      },
      en: {
        eyebrow: "An underground route south of the capital", title: "Mileștii Mici: galleries and the Golden Collection", seoTitle: "Mileștii Mici wine galleries — trip from Chisinau", description: "A visitor’s guide to Mileștii Mici: underground galleries, wine collection, booking, transport and practical tips.",
        intro: "Mileștii Mici is defined by scale. The tour moves through an underground network where roads, limestone and rows of bottles feel like a separate town.",
        why: "Choose it for space and a sense of underground exploration. The galleries and story of wine storage are compelling even if tasting is not your priority.",
        knownFor: "An extensive underground complex and a celebrated bottle collection that has become the winery’s signature.",
        highlights: [{ title: "The galleries", body: "Much of the experience is the journey through long underground corridors." }, { title: "The Golden Collection", body: "Rows of matured bottles reveal the collection’s remarkable scale." }, { title: "Rooms and museum shop", body: "Tasting spaces and an introduction to the wines usually complete the route." }],
        visitTime: "Allow about 2–3 hours for the visit, plus travel and check-in time.",
        route: "The winery is about 20 km south of Chisinau. A taxi or transfer is simplest; ask the venue what transport is required inside the galleries.",
        tips: ["Advance booking is required; confirm the language.", "Ask whether a vehicle is needed for your selected route.", "Bring a warm layer and do not drive after tasting."],
        nearby: ["Chisinau", "Manuc Bey mansion in Hîncești", "Southern Moldova wine routes"],
        faq: [{ question: "Can I arrive without booking?", answer: "It is not advisable: the official site says a reservation is needed to visit the galleries." }, { question: "Do I need my own car?", answer: "Formats can change. Ask during booking which transport is used underground." }, { question: "Can children visit?", answer: "The official site permits children accompanied by adults; confirm current conditions." }],
      },
      uk: {
        eyebrow: "Підземний маршрут на південь від столиці", title: "Mileștii Mici: галереї та Золота колекція", seoTitle: "Mileștii Mici — винні галереї та поїздка з Кишинева", description: "Гід Mileștii Mici: підземні галереї, колекція, бронювання, дорога й практичні поради.",
        intro: "Mileștii Mici вражає масштабом: маршрут іде підземною мережею, де дороги, камінь і ряди пляшок нагадують окреме місто.",
        why: "Це вибір для тих, кому важливі простір і відчуття підземної експедиції. Галереї цікаві навіть без дегустації.",
        knownFor: "Великий підземний комплекс і знаменита колекція пляшок.",
        highlights: [{ title: "Галереї", body: "Значна частина враження — рух довгими підземними коридорами." }, { title: "Золота колекція", body: "Ряди витриманих пляшок показують масштаб зібрання." }, { title: "Зали й музей-магазин", body: "Маршрут доповнюють дегустаційні простори та місцеві вина." }],
        visitTime: "Закладіть близько 2–3 годин плюс дорогу та реєстрацію.",
        route: "Виноробня приблизно за 20 км на південь від Кишинева. Зручні таксі або трансфер; уточніть вимоги до транспорту в галереях.",
        tips: ["Бронюйте наперед і підтверджуйте мову.", "Уточніть, чи потрібен автомобіль.", "Візьміть теплий шар і не керуйте після дегустації."],
        nearby: ["Кишинів", "Садиба Манук-Бей у Хинчештах", "Південні винні маршрути"],
        faq: [{ question: "Чи можна без бронювання?", answer: "Не варто: офіційний сайт вимагає резервацію для галерей." }, { question: "Чи потрібне власне авто?", answer: "Формати змінюються; уточніть транспорт під час бронювання." }, { question: "Чи можна з дітьми?", answer: "Офіційний сайт дозволяє дітям з дорослими; перевірте актуальні умови." }],
      },
      cs: {
        eyebrow: "Podzemní trasa jižně od metropole", title: "Mileștii Mici: galerie a Zlatá sbírka", seoTitle: "Mileștii Mici — vinné galerie a výlet z Kišiněva", description: "Průvodce Mileștii Mici: podzemní galerie, sbírka vín, rezervace, doprava a tipy.",
        intro: "Mileștii Mici ohromuje rozsahem. Podzemní síť silnic, kamene a řad lahví působí jako samostatné město.",
        why: "Je to volba pro milovníky prostoru a podzemního dobrodružství. Galerie jsou působivé i bez degustace.",
        knownFor: "Rozsáhlý podzemní komplex a slavná sbírka lahví.",
        highlights: [{ title: "Galerie", body: "Velkou část zážitku tvoří pohyb dlouhými podzemními chodbami." }, { title: "Zlatá sbírka", body: "Řady zrajících lahví ukazují rozsah kolekce." }, { title: "Sály a muzeum-obchod", body: "Trasu obvykle doplní degustační prostory a místní vína." }],
        visitTime: "Vyhraďte si asi 2–3 hodiny plus cestu a registraci.",
        route: "Vinařství leží asi 20 km jižně od Kišiněva. Nejjednodušší je taxi či transfer; ověřte dopravu v galeriích.",
        tips: ["Rezervujte předem a potvrďte jazyk.", "Zjistěte, zda je potřeba automobil.", "Vezměte teplou vrstvu a po degustaci neřiďte."],
        nearby: ["Kišiněv", "Zámek Manuc Bey v Hîncești", "Jižní vinařské trasy"],
        faq: [{ question: "Lze přijet bez rezervace?", answer: "Nedoporučuje se to: oficiální web vyžaduje rezervaci." }, { question: "Potřebuji vlastní auto?", answer: "Formát se může měnit; dopravu potvrďte při rezervaci." }, { question: "Mohou přijet děti?", answer: "Oficiální web dovoluje děti s dospělými; ověřte aktuální pravidla." }],
      },
    },
  },
  purcari: {
    slug: "purcari", name: "Château Purcari", image: "/guide/destinations/purcari.webp",
    imageAlt: alt("Историческое здание Château Purcari", "Clădirea istorică Château Purcari", "Historic Château Purcari building", "Історична будівля Château Purcari", "Historická budova Château Purcari"),
    accent: "#9f1239", kind: "winery",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Chateau+Purcari+Moldova",
    officialUrl: "https://purcari.wine/", sourceName: "Château Purcari",
    copy: {
      ru: {
        eyebrow: "Большой винный день на юго-востоке", title: "Château Purcari: виноградники и неспешный день", seoTitle: "Château Purcari — поездка из Кишинёва и советы туристу", description: "Гид по Château Purcari: виноградники, экскурсия, дорога из Кишинёва, сколько времени выделить и что посмотреть рядом.",
        intro: "Purcari — не короткий заезд, а полноценная поездка за город. Историческая усадьба, виноградники и спокойный ландшафт лучше раскрываются без спешки.",
        why: "Сюда едут за сочетанием истории винодельни, прогулки по территории и более курортного ритма, чем у подземных галерей возле столицы.",
        knownFor: "Винодельческая история с 1827 года, терруар юго-востока Молдовы и шато среди виноградников.",
        highlights: [{ title: "Историческое шато", body: "Архитектура задаёт характер всей территории и служит естественным центром визита." }, { title: "Виноградники и подвалы", body: "Маршрут связывает пейзаж, производство и выдержку вина." }, { title: "Неспешная атмосфера", body: "Территория подходит для обеда, прогулки и длинного загородного дня." }],
        visitTime: "Планируйте минимум половину дня; с обедом и прогулкой — полноценный день.",
        route: "Purcari находится на юго-востоке страны, заметно дальше остальных мест кластера. Лучше заранее заказать трансфер или ехать с организованной экскурсией.",
        tips: ["Не совмещайте с плотной городской программой.", "Заранее резервируйте тур и столик, если планируете обед.", "Проверьте время обратного трансфера и документы, если маршрут идёт близко к приграничной зоне."],
        nearby: ["Винодельни региона Ștefan Vodă", "Пейзажи долины Днестра", "Бендерская крепость — только при отдельном плане поездки"],
        faq: [{ question: "Можно ли съездить в Purcari на полдня?", answer: "Можно, но дорога занимает заметную часть времени. Для спокойной прогулки и обеда лучше оставить целый день." }, { question: "Нужна ли бронь?", answer: "Да, бронируйте экскурсию напрямую и отдельно уточняйте ресторан и дополнительные активности." }, { question: "Стоит ли ехать без автомобиля?", answer: "Да, если заранее заказать двусторонний трансфер или организованную экскурсию." }],
      },
      ro: {
        eyebrow: "O zi vinicolă în sud-est", title: "Château Purcari: podgorii și o zi fără grabă", seoTitle: "Château Purcari — excursie din Chișinău și sfaturi", description: "Ghid Château Purcari: podgorii, tur, drumul din Chișinău, timpul necesar și locuri apropiate.",
        intro: "Purcari nu este o oprire scurtă, ci o excursie completă. Conacul istoric, podgoriile și peisajul liniștit merită descoperite fără grabă.",
        why: "Vizitatorii vin pentru combinația dintre istoria vinăriei, plimbarea pe domeniu și un ritm mai apropiat de resort decât de galeriile subterane.",
        knownFor: "Istorie vinicolă din 1827, terroir-ul din sud-est și château-ul între vii.",
        highlights: [{ title: "Château istoric", body: "Arhitectura dă personalitate domeniului și devine centrul vizitei." }, { title: "Vii și beciuri", body: "Traseul leagă peisajul, producerea și maturarea." }, { title: "Atmosferă tihnită", body: "Domeniul se potrivește pentru prânz, plimbare și o zi lungă la țară." }],
        visitTime: "Planifică cel puțin o jumătate de zi; cu prânz și plimbare, rezervă ziua întreagă.",
        route: "Purcari se află în sud-est, mai departe decât celelalte destinații. Rezervă un transfer sau o excursie organizată.",
        tips: ["Nu combina cu un program urban aglomerat.", "Rezervă turul și masa din timp.", "Stabilește ora returului și verifică documentele pentru orice traseu apropiat de frontieră."],
        nearby: ["Vinăriile din Ștefan Vodă", "Peisajele Nistrului", "Cetatea Tighina doar într-un traseu separat"],
        faq: [{ question: "Ajunge o jumătate de zi?", answer: "Este posibil, dar drumul consumă timp. Pentru plimbare și prânz, o zi întreagă e mai relaxată." }, { question: "Este necesară rezervarea?", answer: "Da. Rezervă turul direct și confirmă separat restaurantul sau activitățile." }, { question: "Pot merge fără mașină?", answer: "Da, cu transfer dus-întors sau excursie organizată rezervată în avans." }],
      },
      en: {
        eyebrow: "A full wine day in the south-east", title: "Château Purcari: vineyards at an unhurried pace", seoTitle: "Château Purcari — day trip from Chisinau", description: "A Château Purcari guide: vineyards, tours, travel from Chisinau, time to allow and nearby ideas.",
        intro: "Purcari is not a quick stop but a proper day out. The historic estate, vineyards and quiet landscape reward a slower pace.",
        why: "Visitors come for the combination of winery history, estate walks and a more resort-like rhythm than the underground galleries near the capital.",
        knownFor: "A winemaking history dating to 1827, south-eastern Moldova’s terroir and a château among the vines.",
        highlights: [{ title: "Historic château", body: "The architecture gives the estate its identity and creates a natural centre for the visit." }, { title: "Vineyards and cellars", body: "The route connects landscape, production and ageing." }, { title: "Slow atmosphere", body: "The grounds suit lunch, a walk and a long country day." }],
        visitTime: "Allow at least half a day; with lunch and a walk, make it a full-day trip.",
        route: "Purcari lies in the south-east and is considerably farther than the other cluster destinations. Pre-book a return transfer or organised tour.",
        tips: ["Do not pair it with a packed city schedule.", "Reserve the tour and restaurant ahead.", "Confirm your return time and carry appropriate documents on routes near the border area."],
        nearby: ["Ștefan Vodă region wineries", "Dniester valley landscapes", "Bender Fortress only as a separately planned route"],
        faq: [{ question: "Can Purcari be a half-day trip?", answer: "Yes, but travel takes a meaningful share of the day. A full day is more relaxed if you want lunch and a walk." }, { question: "Should I book?", answer: "Yes. Book the tour directly and confirm restaurant or additional activities separately." }, { question: "Can I visit without a car?", answer: "Yes, with a pre-booked return transfer or organised tour." }],
      },
      uk: {
        eyebrow: "Великий винний день на південному сході", title: "Château Purcari: виноградники без поспіху", seoTitle: "Château Purcari — подорож із Кишинева", description: "Гід Château Purcari: виноградники, тур, дорога з Кишинева, час і місця поруч.",
        intro: "Purcari — не коротка зупинка, а повноцінна заміська подорож. Історична садиба, виноградники й тихий краєвид потребують неспішного темпу.",
        why: "Сюди їдуть за поєднанням історії, прогулянки територією та курортнішого ритму.",
        knownFor: "Виноробна історія з 1827 року, теруар південного сходу й шато серед виноградників.",
        highlights: [{ title: "Історичне шато", body: "Архітектура задає характер садибі." }, { title: "Виноградники й підвали", body: "Маршрут поєднує краєвид, виробництво та витримку." }, { title: "Спокійна атмосфера", body: "Територія пасує для обіду й довгої прогулянки." }],
        visitTime: "Щонайменше пів дня; з обідом і прогулянкою — цілий день.",
        route: "Purcari далеко на південному сході. Заздалегідь замовте трансфер або організовану екскурсію.",
        tips: ["Не поєднуйте зі щільною міською програмою.", "Резервуйте тур і ресторан.", "Підтвердьте зворотний трансфер і майте документи."],
        nearby: ["Виноробні Ștefan Vodă", "Краєвиди Дністра", "Бендерська фортеця лише окремим маршрутом"],
        faq: [{ question: "Чи вистачить пів дня?", answer: "Можна, але дорога забере час. Для обіду й прогулянки краще цілий день." }, { question: "Чи потрібна бронь?", answer: "Так, бронюйте тур і окремо підтверджуйте ресторан." }, { question: "Чи можна без авто?", answer: "Так, із заздалегідь замовленим трансфером або екскурсією." }],
      },
      cs: {
        eyebrow: "Celý vinařský den na jihovýchodě", title: "Château Purcari: vinice beze spěchu", seoTitle: "Château Purcari — výlet z Kišiněva", description: "Průvodce Château Purcari: vinice, prohlídka, cesta z Kišiněva, čas a okolí.",
        intro: "Purcari není krátká zastávka, ale plnohodnotný výlet. Historické sídlo, vinice a klidná krajina si žádají pomalejší tempo.",
        why: "Láká spojením historie, procházky po areálu a atmosféry bližší resortu.",
        knownFor: "Vinařská historie od roku 1827, terroir jihovýchodu a château mezi vinicemi.",
        highlights: [{ title: "Historické château", body: "Architektura dává areálu jeho charakter." }, { title: "Vinice a sklepy", body: "Trasa propojuje krajinu, výrobu a zrání." }, { title: "Klidná atmosféra", body: "Areál se hodí na oběd a dlouhou procházku." }],
        visitTime: "Nejméně půl dne; s obědem a procházkou celý den.",
        route: "Purcari leží daleko na jihovýchodě. Rezervujte zpáteční transfer nebo organizovaný výlet.",
        tips: ["Nekombinujte s nabitým městským programem.", "Rezervujte prohlídku i restauraci.", "Potvrďte návrat a mějte vhodné doklady."],
        nearby: ["Vinařství regionu Ștefan Vodă", "Krajina Dněstru", "Pevnost Bender jen jako samostatný plán"],
        faq: [{ question: "Stačí půl dne?", answer: "Lze to, ale cesta zabere čas. Pro oběd a procházku je lepší celý den." }, { question: "Je nutná rezervace?", answer: "Ano, rezervujte prohlídku a restauraci zvlášť." }, { question: "Lze přijet bez auta?", answer: "Ano, s předem objednaným transferem nebo zájezdem." }],
      },
    },
  },
  "castel-mimi": {
    slug: "castel-mimi", name: "Castel Mimi", image: "/guide/destinations/castel-mimi.webp",
    imageAlt: alt("Фасад Castel Mimi в Булбоаке", "Fațada Castel Mimi din Bulboaca", "Castel Mimi façade in Bulboaca", "Фасад Castel Mimi в Булбоаці", "Průčelí Castel Mimi v Bulboace"),
    accent: "#b45309", kind: "winery",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Castel+Mimi+Bulboaca+Moldova",
    officialUrl: "https://castelmimi.md/", sourceName: "Castel Mimi",
    copy: {
      ru: {
        eyebrow: "Архитектура и вино недалеко от столицы", title: "Castel Mimi: шато, история и современная Молдова", seoTitle: "Castel Mimi — экскурсия и поездка из Кишинёва", description: "Гид по Castel Mimi: архитектура, винодельня, дорога из Кишинёва, время для визита, советы и места рядом.",
        intro: "Castel Mimi выбирают, когда хочется объединить в одной поездке архитектуру, винную историю и ухоженное современное пространство.",
        why: "Это фотогеничная и понятная однодневная цель без долгого пути на юг. Визит легко выстроить вокруг экскурсии, обеда и прогулки.",
        knownFor: "Восстановленное здание винодельни семьи Мими в Булбоаке и современный туристический комплекс.",
        highlights: [{ title: "Фасад и внутренний двор", body: "Архитектура — главный визуальный образ места и хорошее начало прогулки." }, { title: "Винная история", body: "Экскурсия связывает историю Константина Мими с сегодняшним производством." }, { title: "Гастрономия и события", body: "Ресторанный и событийный формат делает площадку удобной для неспешного визита." }],
        visitTime: "Оптимально 3–5 часов с экскурсией и обедом; без гастрономической части можно короче.",
        route: "Castel Mimi находится в Булбоаке, к юго-востоку от Кишинёва. Подойдут такси, трансфер или заранее проверенный поезд до станции Булбоака.",
        tips: ["Проверьте календарь: крупное событие меняет атмосферу и доступность.", "Бронируйте экскурсию и ресторан отдельно.", "Если едете поездом, сверяйте актуальное расписание и последний рейс обратно."],
        nearby: ["Кишинёв", "Бендерская крепость при отдельном маршруте", "Сельские пейзажи района Anenii Noi"],
        faq: [{ question: "Можно ли приехать только ради архитектуры?", answer: "Да, но доступные зоны и правила самостоятельного визита лучше уточнить у комплекса заранее." }, { question: "Можно ли доехать поездом?", answer: "Станция Булбоака находится рядом, но расписание меняется. Сверьте рейсы и подтвердите путь от станции." }, { question: "Сколько времени нужно?", answer: "Для экскурсии, прогулки и обеда удобно оставить 3–5 часов." }],
      },
      ro: {
        eyebrow: "Arhitectură și vin aproape de capitală", title: "Castel Mimi: château, istorie și Moldova modernă", seoTitle: "Castel Mimi — excursie și drum din Chișinău", description: "Ghid Castel Mimi: arhitectură, vinărie, drumul din Chișinău, durata vizitei, sfaturi și împrejurimi.",
        intro: "Castel Mimi este potrivit când vrei să combini arhitectura, istoria vinului și un spațiu contemporan bine îngrijit.",
        why: "Este o destinație fotogenică de o zi, fără drumul lung spre sud. Poți construi vizita în jurul turului, prânzului și plimbării.",
        knownFor: "Clădirea restaurată a vinăriei familiei Mimi din Bulboaca și complexul turistic actual.",
        highlights: [{ title: "Fațada și curtea", body: "Arhitectura este imaginea centrală a locului și începutul firesc al plimbării." }, { title: "Istoria vinului", body: "Turul leagă povestea lui Constantin Mimi de producția actuală." }, { title: "Gastronomie și evenimente", body: "Restaurantul și evenimentele susțin un ritm relaxat." }],
        visitTime: "Ideal 3–5 ore cu tur și prânz; fără masă, vizita poate fi mai scurtă.",
        route: "Castel Mimi este în Bulboaca, la sud-est de Chișinău. Poți veni cu taxi, transfer sau cu un tren verificat în prealabil până la Bulboaca.",
        tips: ["Verifică agenda evenimentelor.", "Rezervă separat turul și restaurantul.", "Pentru tren, verifică orarul actual și ultima cursă de întoarcere."],
        nearby: ["Chișinău", "Cetatea Tighina într-un traseu separat", "Peisajul rural din Anenii Noi"],
        faq: [{ question: "Pot veni doar pentru arhitectură?", answer: "Da, dar confirmă din timp zonele accesibile fără tur." }, { question: "Pot ajunge cu trenul?", answer: "Gara Bulboaca este aproape, însă orarul se schimbă. Verifică legătura și returul." }, { question: "Cât durează?", answer: "Pentru tur, plimbare și prânz sunt comode 3–5 ore." }],
      },
      en: {
        eyebrow: "Architecture and wine near the capital", title: "Castel Mimi: château, history and modern Moldova", seoTitle: "Castel Mimi — tour and day trip from Chisinau", description: "A Castel Mimi guide: architecture, winery, travel from Chisinau, visit length, practical tips and nearby places.",
        intro: "Castel Mimi suits travellers who want architecture, wine history and a polished contemporary setting in one trip.",
        why: "It is a photogenic, manageable day out without the long journey south. Build the visit around a tour, lunch and a walk.",
        knownFor: "The restored Mimi family winery building in Bulboaca and the modern visitor complex around it.",
        highlights: [{ title: "Façade and courtyard", body: "The architecture is the defining image and a natural starting point." }, { title: "Wine history", body: "Tours connect Constantin Mimi’s story with the winery today." }, { title: "Food and events", body: "Dining and events make a leisurely visit easy to plan." }],
        visitTime: "Allow 3–5 hours for a tour and lunch; a visit without dining can be shorter.",
        route: "Castel Mimi is in Bulboaca, south-east of Chisinau. Travel by taxi, transfer or a carefully checked train to Bulboaca station.",
        tips: ["Check the events calendar first.", "Reserve the tour and restaurant separately.", "If travelling by train, verify the current timetable and last return."],
        nearby: ["Chisinau", "Bender Fortress on a separately planned route", "Anenii Noi countryside"],
        faq: [{ question: "Can I visit just for the architecture?", answer: "Yes, but confirm which areas are open to independent visitors before travelling." }, { question: "Can I travel by train?", answer: "Bulboaca station is nearby, but timetables change. Verify both outward and return services." }, { question: "How long should I allow?", answer: "Three to five hours works well for a tour, walk and lunch." }],
      },
      uk: {
        eyebrow: "Архітектура й вино біля столиці", title: "Castel Mimi: шато, історія та сучасна Молдова", seoTitle: "Castel Mimi — екскурсія з Кишинева", description: "Гід Castel Mimi: архітектура, виноробня, дорога з Кишинева, час і поради.",
        intro: "Castel Mimi пасує тим, хто хоче поєднати архітектуру, винну історію й доглянутий сучасний простір.",
        why: "Це фотогенічна одноденна ціль без довгої дороги на південь. Візит легко поєднати з обідом і прогулянкою.",
        knownFor: "Відновлена будівля виноробні родини Мімі в Булбоаці та сучасний туристичний комплекс.",
        highlights: [{ title: "Фасад і двір", body: "Архітектура — головний образ місця." }, { title: "Винна історія", body: "Тур пов’язує історію Константина Мімі із сьогоденням." }, { title: "Гастрономія й події", body: "Ресторан і події доповнюють неспішний візит." }],
        visitTime: "3–5 годин із туром та обідом; без обіду можна коротше.",
        route: "Castel Mimi у Булбоаці на південний схід від Кишинева. Підійдуть таксі, трансфер або перевірений потяг.",
        tips: ["Перевірте календар подій.", "Бронюйте тур і ресторан окремо.", "Для потяга звірте розклад і останній рейс."],
        nearby: ["Кишинів", "Бендерська фортеця окремим маршрутом", "Сільські краєвиди Anenii Noi"],
        faq: [{ question: "Чи можна лише заради архітектури?", answer: "Так, але уточніть доступні без туру зони." }, { question: "Чи можна потягом?", answer: "Станція Булбоака поруч, але розклад змінюється. Перевірте обидва напрямки." }, { question: "Скільки часу потрібно?", answer: "Для туру, прогулянки й обіду зручно 3–5 годин." }],
      },
      cs: {
        eyebrow: "Architektura a víno nedaleko metropole", title: "Castel Mimi: château, historie a moderní Moldavsko", seoTitle: "Castel Mimi — výlet z Kišiněva", description: "Průvodce Castel Mimi: architektura, vinařství, cesta z Kišiněva, čas a tipy.",
        intro: "Castel Mimi spojuje architekturu, vinařskou historii a upravený moderní areál.",
        why: "Je to fotogenický jednodenní cíl bez dlouhé cesty na jih. Snadno spojíte prohlídku, oběd a procházku.",
        knownFor: "Obnovená budova vinařství rodiny Mimi v Bulboace a současný návštěvnický komplex.",
        highlights: [{ title: "Průčelí a nádvoří", body: "Architektura je hlavním obrazem místa." }, { title: "Vinařská historie", body: "Prohlídka propojuje Constantina Mimiho se současností." }, { title: "Gastronomie a akce", body: "Restaurace a program podporují klidnou návštěvu." }],
        visitTime: "Tři až pět hodin s prohlídkou a obědem; bez jídla méně.",
        route: "Castel Mimi je v Bulboace jihovýchodně od Kišiněva. Využijte taxi, transfer nebo předem ověřený vlak.",
        tips: ["Zkontrolujte kalendář akcí.", "Rezervujte prohlídku a restauraci zvlášť.", "U vlaku ověřte jízdní řád a poslední spoj."],
        nearby: ["Kišiněv", "Pevnost Bender jako samostatná trasa", "Venkov Anenii Noi"],
        faq: [{ question: "Lze přijet jen kvůli architektuře?", answer: "Ano, ale předem ověřte volně přístupné části." }, { question: "Lze jet vlakem?", answer: "Stanice Bulboaca je blízko, jízdní řád se však mění." }, { question: "Kolik času potřebuji?", answer: "Na prohlídku, procházku a oběd počítejte 3–5 hodin." }],
      },
    },
  },
  "orheiul-vechi": {
    slug: "orheiul-vechi", name: "Orheiul Vechi", image: "/guide/moldova-trips.webp",
    imageAlt: alt("Известняковый ландшафт Orheiul Vechi над рекой Реут", "Peisajul calcaros Orheiul Vechi deasupra Răutului", "Orheiul Vechi limestone landscape above the Răut", "Вапняковий краєвид Orheiul Vechi над Реутом", "Vápencová krajina Orheiul Vechi nad řekou Răut"),
    accent: "#166534", kind: "heritage",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Orheiul+Vechi+Butuceni+Moldova",
    officialUrl: "https://orheiulvechi.com/", sourceName: "Orheiul Vechi Reserve",
    copy: {
      ru: {
        eyebrow: "Культурно-природный маршрут", title: "Orheiul Vechi: скалы, история и долина Реута", seoTitle: "Orheiul Vechi — поездка из Кишинёва", description: "Гид по Orheiul Vechi: виды, скальный монастырь, маршрут из Кишинёва, время, советы и места рядом.",
        intro: "Orheiul Vechi показывает другую Молдову: известняковые изгибы над Реутом, археологический ландшафт, село Бутучены и тропы, где важнее идти, чем спешить к одной точке.",
        why: "Это один из лучших маршрутов для природы и истории в одном дне. Виды меняются с каждым подъёмом, а сельская среда делает поездку заметно отличной от столицы.",
        knownFor: "Культурно-природный заповедник, археологические слои, скальный монастырский комплекс и меандры Реута.",
        highlights: [{ title: "Смотровые тропы", body: "Маршруты по известняковым гребням открывают виды на долину и сёла." }, { title: "Скальный монастырь", body: "Пещерные пространства и монастырская история встроены прямо в ландшафт." }, { title: "Бутучены", body: "Традиционная застройка, гостевые дома и местная кухня дополняют прогулку." }],
        visitTime: "Минимум половина дня. Для спокойной прогулки, музея и обеда лучше выделить полный день.",
        route: "Заповедник расположен к северо-востоку от Кишинёва. Самый надёжный вариант — автомобиль, такси с ожиданием, трансфер или организованный тур до Бутучен.",
        tips: ["Наденьте обувь с хорошим сцеплением.", "Летом берите воду, головной убор и защиту от солнца.", "Не заходите на закрытые участки и уважайте действующие религиозные пространства."],
        nearby: ["Село Требужены", "Местные гостевые дома и кухня Бутучен", "Cricova по отдельному, заранее рассчитанному маршруту"],
        faq: [{ question: "Подойдёт ли Orheiul Vechi без автомобиля?", answer: "Да, но удобнее заранее заказать трансфер или экскурсию: общественный транспорт не всегда совпадает с вашим планом прогулки." }, { question: "Нужна ли специальная подготовка?", answer: "Нет, для основного маршрута достаточно удобной обуви; после дождя камень и грунт могут быть скользкими." }, { question: "Можно ли ехать с детьми?", answer: "Да, если выбирать короткий маршрут и внимательно следить за детьми у обрывов и на неровных тропах." }],
      },
      ro: {
        eyebrow: "Traseu cultural-natural", title: "Orheiul Vechi: stânci, istorie și valea Răutului", seoTitle: "Orheiul Vechi — excursie din Chișinău", description: "Ghid Orheiul Vechi: priveliști, mănăstirea rupestră, drumul din Chișinău, timp, sfaturi și împrejurimi.",
        intro: "Orheiul Vechi arată o altă Moldovă: meandre calcaroase deasupra Răutului, peisaj arheologic, satul Butuceni și poteci unde drumul contează la fel de mult ca destinația.",
        why: "Este unul dintre cele mai bune trasee pentru natură și istorie într-o singură zi. Priveliștea se schimbă la fiecare urcare, iar satul contrastează cu capitala.",
        knownFor: "Rezervația cultural-naturală, straturi arheologice, complexe monastice rupestre și meandrele Răutului.",
        highlights: [{ title: "Poteci panoramice", body: "Traseele de pe culmile calcaroase deschid priveliști spre vale și sate." }, { title: "Mănăstirea rupestră", body: "Spațiile săpate în stâncă și istoria monastică fac parte din peisaj." }, { title: "Butuceni", body: "Casele tradiționale, pensiunile și bucătăria locală completează plimbarea." }],
        visitTime: "Cel puțin o jumătate de zi. Pentru plimbare, muzeu și prânz, rezervă ziua întreagă.",
        route: "Rezervația este la nord-est de Chișinău. Cel mai sigur ajungi cu mașina, taxi cu așteptare, transfer sau tur până la Butuceni.",
        tips: ["Poartă încălțăminte cu aderență.", "Vara ia apă, pălărie și protecție solară.", "Respectă zonele închise și spațiile religioase active."],
        nearby: ["Satul Trebujeni", "Pensiunile și bucătăria din Butuceni", "Cricova într-un traseu separat, calculat din timp"],
        faq: [{ question: "Pot veni fără automobil?", answer: "Da, dar transferul sau turul rezervat este mai comod decât adaptarea plimbării la transportul public." }, { question: "Am nevoie de pregătire specială?", answer: "Nu, pentru traseul principal ajung pantofi comozi; după ploaie poate fi alunecos." }, { question: "Este potrivit pentru copii?", answer: "Da, pe un traseu scurt și cu supraveghere atentă lângă margini și pe poteci." }],
      },
      en: {
        eyebrow: "A cultural-natural day trip", title: "Orheiul Vechi: cliffs, history and the Răut valley", seoTitle: "Orheiul Vechi — day trip from Chisinau", description: "An Orheiul Vechi guide: viewpoints, cave monastery, travel from Chisinau, time, practical tips and nearby places.",
        intro: "Orheiul Vechi reveals another Moldova: limestone bends above the Răut, an archaeological landscape, Butuceni village and trails where the walk matters as much as any single sight.",
        why: "It is one of the country’s strongest nature-and-history day trips. Views shift with each climb, while the village setting feels far removed from the capital.",
        knownFor: "A cultural-natural reserve, layered archaeology, rock-cut monastic complexes and the Răut meanders.",
        highlights: [{ title: "Viewpoint trails", body: "Routes across limestone ridges open broad views over the valley and villages." }, { title: "Cave monastery", body: "Rock-cut spaces and living monastic history sit directly within the landscape." }, { title: "Butuceni", body: "Traditional houses, guesthouses and local food round out the walk." }],
        visitTime: "Allow at least half a day. A full day is better for an unhurried walk, museum and lunch.",
        route: "The reserve lies north-east of Chisinau. A car, waiting taxi, booked transfer or organised tour to Butuceni is the most dependable option.",
        tips: ["Wear shoes with reliable grip.", "In summer bring water, a hat and sun protection.", "Keep out of closed areas and respect active religious spaces."],
        nearby: ["Trebujeni village", "Butuceni guesthouses and local food", "Cricova on a separately timed route"],
        faq: [{ question: "Can I visit without a car?", answer: "Yes, though a booked transfer or tour is easier than fitting your walk around public transport." }, { question: "Do I need hiking experience?", answer: "No. Comfortable shoes are enough for the main route, but stone and soil can be slippery after rain." }, { question: "Is it suitable for children?", answer: "Yes on a shorter route, with close supervision near drops and uneven paths." }],
      },
      uk: {
        eyebrow: "Культурно-природний маршрут", title: "Orheiul Vechi: скелі, історія й долина Реута", seoTitle: "Orheiul Vechi — подорож із Кишинева", description: "Гід Orheiul Vechi: краєвиди, скельний монастир, дорога з Кишинева, час і поради.",
        intro: "Orheiul Vechi показує іншу Молдову: вапнякові вигини над Реутом, археологічний ландшафт, Бутучени й стежки.",
        why: "Це один із найкращих маршрутів для природи та історії в одному дні. Краєвид змінюється з кожним підйомом.",
        knownFor: "Культурно-природний заповідник, археологія, скельні монастирські комплекси й меандри Реута.",
        highlights: [{ title: "Оглядові стежки", body: "Вапнякові гребені відкривають краєвиди долини." }, { title: "Скельний монастир", body: "Печерні простори та монастирська історія вписані в ландшафт." }, { title: "Бутучени", body: "Традиційні будинки, садиби й місцева кухня доповнюють прогулянку." }],
        visitTime: "Щонайменше пів дня; для музею, обіду й прогулянки — цілий день.",
        route: "Заповідник на північний схід від Кишинева. Найнадійніше авто, таксі з очікуванням, трансфер або тур.",
        tips: ["Взувайте взуття з добрим зчепленням.", "Влітку беріть воду й захист від сонця.", "Поважайте закриті та діючі релігійні зони."],
        nearby: ["Село Требужени", "Садиби й кухня Бутучен", "Cricova окремим маршрутом"],
        faq: [{ question: "Чи можна без авто?", answer: "Так, але трансфер або тур зручніші за громадський транспорт." }, { question: "Чи потрібна підготовка?", answer: "Ні, достатньо зручного взуття; після дощу слизько." }, { question: "Чи можна з дітьми?", answer: "Так, коротким маршрутом і з наглядом біля урвищ." }],
      },
      cs: {
        eyebrow: "Kulturně-přírodní výlet", title: "Orheiul Vechi: skály, historie a údolí Răutu", seoTitle: "Orheiul Vechi — výlet z Kišiněva", description: "Průvodce Orheiul Vechi: vyhlídky, skalní klášter, cesta z Kišiněva, čas a tipy.",
        intro: "Orheiul Vechi ukazuje jiné Moldavsko: vápencové meandry nad Răutem, archeologickou krajinu, Butuceni a stezky.",
        why: "Je to jeden z nejlepších výletů spojujících přírodu a historii. Výhled se mění s každým stoupáním.",
        knownFor: "Kulturně-přírodní rezervace, archeologie, skalní kláštery a meandry Răutu.",
        highlights: [{ title: "Vyhlídkové stezky", body: "Vápencové hřebeny nabízejí široké pohledy do údolí." }, { title: "Skalní klášter", body: "Jeskynní prostory a klášterní historie jsou součástí krajiny." }, { title: "Butuceni", body: "Tradiční domy, penziony a místní jídlo doplňují výlet." }],
        visitTime: "Nejméně půl dne; pro muzeum, oběd a klidnou chůzi celý den.",
        route: "Rezervace leží severovýchodně od Kišiněva. Nejjistější je auto, čekající taxi, transfer nebo zájezd.",
        tips: ["Vezměte boty s dobrou přilnavostí.", "V létě vodu a ochranu před sluncem.", "Respektujte uzavřená a aktivní náboženská místa."],
        nearby: ["Vesnice Trebujeni", "Penziony a kuchyně v Butuceni", "Cricova jako samostatná trasa"],
        faq: [{ question: "Lze přijet bez auta?", answer: "Ano, ale transfer nebo zájezd je pohodlnější než veřejná doprava." }, { question: "Potřebuji turistickou zkušenost?", answer: "Ne, stačí pohodlné boty; po dešti může být kluzko." }, { question: "Je místo vhodné pro děti?", answer: "Ano, na kratší trase a s dohledem u srázů." }],
      },
    },
  },
};

export const wineryDestinations = destinationSlugs.map((slug) => destinations[slug]);
