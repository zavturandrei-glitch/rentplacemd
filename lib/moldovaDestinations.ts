import type { Language } from "@/locales/translations";

type Localized = Record<Language, string>;

export const winerySlugs = ["cricova", "milestii-mici", "purcari", "castel-mimi"] as const;
export type WinerySlug = (typeof winerySlugs)[number];
export type DestinationSlug = WinerySlug | "orheiul-vechi";

export type DestinationSection = {
  title: Localized;
  body: Localized;
};

export type DestinationData = {
  slug: DestinationSlug;
  path: string;
  image: string;
  title: Localized;
  description: Localized;
  eyebrow: Localized;
  location: Localized;
  tripLength: Localized;
  route: Localized;
  mapUrl: string;
  officialUrl: string;
  officialName: string;
  sections: DestinationSection[];
};

const l = (ru: string, ro: string, en: string, uk: string, cs: string): Localized => ({
  ru, ro, en, uk, cs,
});

const section = (
  title: Localized,
  body: Localized,
): DestinationSection => ({ title, body });

export const destinationUi = {
  facts: l("План поездки", "Planul călătoriei", "Plan your visit", "План поїздки", "Plán návštěvy"),
  location: l("Где находится", "Unde se află", "Location", "Де розташовано", "Poloha"),
  duration: l("Сколько заложить", "Timp recomandat", "Time to allow", "Скільки часу", "Doporučený čas"),
  route: l("Как добраться", "Cum ajungi", "Getting there", "Як дістатися", "Jak se tam dostat"),
  official: l("Проверить экскурсии", "Verifică excursiile", "Check tours", "Перевірити екскурсії", "Ověřit prohlídky"),
  map: l("Открыть карту", "Deschide harta", "Open map", "Відкрити мапу", "Otevřít mapu"),
  related: l("Продолжить маршрут", "Continuă traseul", "Continue your route", "Продовжити маршрут", "Pokračovat v trase"),
  wineries: l("Все винодельни", "Toate vinăriile", "All wineries", "Усі виноробні", "Všechna vinařství"),
  guide: l("Гид по Кишинёву и Молдове", "Ghid pentru Chișinău și Moldova", "Chisinau and Moldova guide", "Гід Кишиневом і Молдовою", "Průvodce Kišiněvem a Moldavskem"),
  apartmentsTitle: l("Где остановиться в Кишинёве", "Unde să te cazezi în Chișinău", "Where to stay in Chisinau", "Де зупинитися в Кишиневі", "Kde se ubytovat v Kišiněvě"),
  apartmentsBody: l(
    "Кишинёв удобно использовать как базу для поездок по Молдове. После экскурсии можно вернуться в город и остановиться в квартире RentPlace.",
    "Chișinăul este o bază comodă pentru excursii prin Moldova. După vizită te poți întoarce în oraș și caza într-un apartament RentPlace.",
    "Chisinau is a practical base for day trips around Moldova. After the visit, return to the city and stay in a RentPlace apartment.",
    "Кишинів зручно використовувати як базу для подорожей Молдовою. Після екскурсії можна повернутися до міста й зупинитися в квартирі RentPlace.",
    "Kišiněv je praktickou základnou pro výlety po Moldavsku. Po návštěvě se můžete vrátit do města a ubytovat se v apartmánu RentPlace."
  ),
  apartmentsLink: l("Посмотреть квартиры в Кишинёве", "Vezi apartamente în Chișinău", "See apartments in Chisinau", "Переглянути квартири в Кишиневі", "Zobrazit apartmány v Kišiněvě"),
  currentInfo: l(
    "Программы, расписание и стоимость могут меняться. Перед выездом проверьте условия и забронируйте визит на официальном сайте.",
    "Programele, orarul și tarifele se pot schimba. Verifică condițiile și rezervă vizita pe site-ul oficial înainte de plecare.",
    "Tours, schedules and prices can change. Check current conditions and reserve on the official website before setting out.",
    "Програми, розклад і вартість можуть змінюватися. Перед виїздом перевірте умови та забронюйте візит на офіційному сайті.",
    "Programy, otevírací doba a ceny se mohou měnit. Před cestou ověřte podmínky a rezervujte návštěvu na oficiálním webu."
  ),
};

export const destinations: Record<DestinationSlug, DestinationData> = {
  cricova: {
    slug: "cricova",
    path: "/guide/wineries/cricova",
    image: "/guide/wineries.webp",
    title: l("Cricova — винные подземелья рядом с Кишинёвом", "Cricova — galeriile vinicole de lângă Chișinău", "Cricova wine cellars near Chisinau", "Cricova — винні підземелля біля Кишинева", "Cricova — vinné sklepy nedaleko Kišiněva"),
    description: l(
      "Практический гид по Cricova: подземные галереи, история, экскурсии, дорога из Кишинёва и официальная информация для бронирования.",
      "Ghid practic pentru Cricova: galerii subterane, istorie, excursii, drumul din Chișinău și informații oficiale pentru rezervare.",
      "A practical Cricova guide covering the underground galleries, history, tours, travel from Chisinau and official booking information.",
      "Практичний гід Cricova: підземні галереї, історія, екскурсії, дорога з Кишинева та офіційна інформація для бронювання.",
      "Praktický průvodce Cricovou: podzemní galerie, historie, prohlídky, cesta z Kišiněva a oficiální informace k rezervaci."
    ),
    eyebrow: l("Винодельни Молдовы", "Vinăriile Moldovei", "Wineries of Moldova", "Виноробні Молдови", "Moldavská vinařství"),
    location: l("Город Cricova, к северу от Кишинёва", "Orașul Cricova, la nord de Chișinău", "Cricova, north of Chisinau", "Місто Cricova, на північ від Кишинева", "Cricova, severně od Kišiněva"),
    tripLength: l("Полдня с дорогой", "O jumătate de zi cu drumul", "Half a day including travel", "Пів дня разом із дорогою", "Půl dne včetně cesty"),
    route: l("Такси, автомобиль или организованный трансфер", "Taxi, automobil sau transfer organizat", "Taxi, car or organised transfer", "Таксі, автомобіль або організований трансфер", "Taxi, auto nebo organizovaný transfer"),
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Cricova+Winery+Moldova",
    officialUrl: "https://cricova.md/en/excursii",
    officialName: "Cricova",
    sections: [
      section(
        l("Подземный город вина", "Un oraș subteran al vinului", "An underground wine city", "Підземне місто вина", "Podzemní město vína"),
        l(
          "Cricova выросла вокруг бывших известняковых выработок. Сегодня галереи образуют разветвлённый подземный маршрут с названиями улиц, залами и коллекциями. По данным винодельни, галереи тянутся примерно на 120 километров, а постоянная прохлада помогает хранению вина.",
          "Cricova s-a dezvoltat în fostele galerii de calcar. Astăzi, acestea formează un traseu subteran cu străzi denumite, săli și colecții. Potrivit vinăriei, galeriile se întind pe aproximativ 120 de kilometri, iar temperatura constantă favorizează păstrarea vinului.",
          "Cricova developed inside former limestone workings. Today the network feels like an underground town, with named streets, halls and collections. The winery describes around 120 kilometres of galleries, where a stable cool temperature supports wine storage.",
          "Cricova розвинулася у колишніх вапнякових виробках. Сьогодні галереї утворюють підземний маршрут із названими вулицями, залами та колекціями. За даними виноробні, їхня довжина становить близько 120 кілометрів, а стабільна прохолода сприяє зберіганню вина.",
          "Cricova vznikla v bývalých vápencových lomech. Dnes síť připomíná podzemní město s pojmenovanými ulicemi, sály a sbírkami. Vinařství uvádí přibližně 120 kilometrů galerií, kde stálý chlad pomáhá uchovávat víno."
        )
      ),
      section(
        l("Что увидит посетитель", "Ce vede vizitatorul", "What visitors see", "Що побачить відвідувач", "Co návštěvník uvidí"),
        l(
          "Экскурсионные программы знакомят с производством игристых вин, выдержкой и подземными коллекциями. Формат зависит от выбранной программы: перед бронированием сравните продолжительность, язык сопровождения и наличие дегустации.",
          "Programele de vizitare prezintă producerea vinurilor spumante, maturarea și colecțiile subterane. Formatul diferă: înainte de rezervare compară durata, limba ghidajului și includerea degustării.",
          "Tours introduce sparkling-wine production, ageing and the underground collections. Formats vary, so compare duration, guiding language and whether a tasting is included before booking.",
          "Екскурсійні програми знайомлять із виробництвом ігристих вин, витримкою та підземними колекціями. Формати різняться, тому перед бронюванням перевірте тривалість, мову супроводу й наявність дегустації.",
          "Prohlídky představují výrobu šumivých vín, zrání a podzemní sbírky. Nabídky se liší, proto před rezervací porovnejte délku, jazyk průvodce a případnou degustaci."
        )
      ),
      section(
        l("История и атмосфера", "Istorie și atmosferă", "History and atmosphere", "Історія й атмосфера", "Historie a atmosféra"),
        l(
          "Промышленная история Cricova начинается в 1952 году. Главная особенность визита — контраст между масштабом каменных коридоров и тихими залами, где вино созревает вдали от дневного света.",
          "Istoria industrială a Cricovei începe în 1952. Farmecul vizitei vine din contrastul dintre amploarea coridoarelor de piatră și sălile liniștite în care vinul se maturează departe de lumină.",
          "Cricova’s industrial story begins in 1952. The visit is defined by the contrast between vast stone corridors and quiet rooms where wine matures away from daylight.",
          "Промислова історія Cricova починається 1952 року. Враження створює контраст між масштабними кам’яними коридорами й тихими залами, де вино дозріває без денного світла.",
          "Průmyslová historie Cricovy začíná v roce 1952. Zážitek vytváří kontrast rozsáhlých kamenných chodeb a tichých sálů, kde víno zraje bez denního světla."
        )
      ),
      section(
        l("Перед поездкой", "Înainte de plecare", "Before you go", "Перед поїздкою", "Před cestou"),
        l(
          "Под землёй прохладно круглый год: пригодятся закрытая обувь и дополнительный слой одежды. Экскурсию лучше бронировать заранее и прибыть с запасом времени; возрастные правила дегустации и документы уточняйте у организатора.",
          "În subteran este răcoare tot anul, așa că sunt utile încălțămintea închisă și un strat suplimentar. Rezervă din timp și ajungi puțin mai devreme; verifică la organizator regulile pentru degustare și actele necesare.",
          "It stays cool underground year-round, so closed shoes and an extra layer are useful. Reserve ahead and arrive with time to spare; confirm tasting age rules and required documents with the organiser.",
          "Під землею прохолодно протягом усього року, тож знадобляться закрите взуття й додатковий шар одягу. Бронюйте заздалегідь і приїдьте завчасно; правила дегустації та документи уточнюйте в організатора.",
          "V podzemí je chladno po celý rok, proto se hodí uzavřená obuv a další vrstva oblečení. Rezervujte předem a přijeďte s časovou rezervou; pravidla degustace a potřebné doklady ověřte u pořadatele."
        )
      ),
    ],
  },
  "milestii-mici": {
    slug: "milestii-mici",
    path: "/guide/wineries/milestii-mici",
    image: "/guide/wineries.webp",
    title: l("Mileștii Mici — путешествие по подземной винной галерее", "Mileștii Mici — călătorie prin galeriile vinicole subterane", "Mileștii Mici underground wine galleries", "Mileștii Mici — подорож підземними винними галереями", "Mileștii Mici — cesta podzemními vinnými galeriemi"),
    description: l("Что посмотреть в Mileștii Mici, как проходит подземная экскурсия, как добраться из Кишинёва и где проверить актуальные условия.", "Ce vezi la Mileștii Mici, cum se desfășoară excursia subterană, cum ajungi din Chișinău și unde verifici condițiile actuale.", "What to see at Mileștii Mici, how the underground visit works, travel from Chisinau and where to check current arrangements.", "Що подивитися в Mileștii Mici, як відбувається підземна екскурсія, як дістатися з Кишинева та де перевірити актуальні умови.", "Co vidět v Mileștii Mici, jak probíhá podzemní prohlídka, cesta z Kišiněva a kde ověřit aktuální podmínky."),
    eyebrow: l("Винодельни Молдовы", "Vinăriile Moldovei", "Wineries of Moldova", "Виноробні Молдови", "Moldavská vinařství"),
    location: l("Село Mileștii Mici, к югу от Кишинёва", "Satul Mileștii Mici, la sud de Chișinău", "Mileștii Mici village, south of Chisinau", "Село Mileștii Mici, на південь від Кишинева", "Obec Mileștii Mici, jižně od Kišiněva"),
    tripLength: l("Полдня с дорогой", "O jumătate de zi cu drumul", "Half a day including travel", "Пів дня разом із дорогою", "Půl dne včetně cesty"),
    route: l("Автомобиль, такси или трансфер по предварительной записи", "Automobil, taxi sau transfer cu rezervare", "Car, taxi or pre-booked transfer", "Автомобіль, таксі або трансфер за бронюванням", "Auto, taxi nebo předem objednaný transfer"),
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Milestii+Mici+Winery+Moldova",
    officialUrl: "https://milestii-mici.md/en/tourist-spots/underground-galleries.html",
    officialName: "Mileștii Mici",
    sections: [
      section(l("Масштаб под землёй", "Scara lumii subterane", "The scale underground", "Масштаб під землею", "Rozměr podzemí"), l(
        "Винодельня находится в известняковых галереях общей протяжённостью около 200 километров; для хранения и движения используется лишь часть сети. Официальный маршрут проходит на глубине примерно 30–85 метров и воспринимается как поездка по отдельному подземному городу.",
        "Vinăria se află în galerii de calcar cu o lungime totală de circa 200 de kilometri, dintre care doar o parte este folosită. Traseul oficial coboară aproximativ la 30–85 de metri și seamănă cu o călătorie printr-un oraș subteran.",
        "The winery occupies limestone galleries extending for about 200 kilometres in total, only part of which is used. The official route reaches roughly 30–85 metres underground and feels like a journey through a separate subterranean town.",
        "Виноробня розташована у вапнякових галереях загальною довжиною близько 200 кілометрів, з яких використовується лише частина. Офіційний маршрут проходить на глибині приблизно 30–85 метрів і нагадує подорож окремим підземним містом.",
        "Vinařství leží ve vápencových galeriích o celkové délce přibližně 200 kilometrů, využívá se jen část. Oficiální trasa vede asi 30–85 metrů pod zemí a připomíná cestu samostatným podzemním městem."
      )),
      section(l("Как проходит визит", "Cum decurge vizita", "How the visit works", "Як відбувається візит", "Jak návštěva probíhá"), l(
        "Из-за расстояний экскурсия проходит на транспорте — формат может включать автомобиль, электропоезд или велосипед в зависимости от действующей программы. По пути показывают коридоры хранения, коллекцию и дегустационные пространства.",
        "Din cauza distanțelor, excursia se face cu transport — automobil, tren electric sau bicicletă, în funcție de programul disponibil. Traseul include coridoare de păstrare, colecția și spațiile de degustare.",
        "Because of the distances, tours use transport — car, electric train or bicycle depending on the current programme. The route introduces storage corridors, the collection and tasting spaces.",
        "Через великі відстані екскурсія відбувається на транспорті — автомобілі, електропоїзді або велосипеді залежно від програми. Маршрут охоплює коридори зберігання, колекцію та дегустаційні зали.",
        "Kvůli vzdálenostem se prohlídka koná dopravním prostředkem — autem, elektrickým vláčkem nebo na kole podle aktuálního programu. Trasa ukazuje skladovací chodby, sbírku a degustační prostory."
      )),
      section(l("Коллекция и тишина галерей", "Colecția și liniștea galeriilor", "The collection and quiet galleries", "Колекція й тиша галерей", "Sbírka a ticho galerií"), l(
        "Главное впечатление создают длинные ряды бутылок и масштаб коридоров. Температура держится примерно на уровне 12–14 °C: это часть технологии хранения и одновременно важная подсказка для одежды посетителя.",
        "Impresia principală vine din șirurile lungi de sticle și dimensiunea coridoarelor. Temperatura se menține în jur de 12–14 °C — o condiție de păstrare și un indiciu util pentru îmbrăcăminte.",
        "Long rows of bottles and the size of the corridors define the experience. Temperatures remain around 12–14°C, both a storage condition and a useful guide for what to wear.",
        "Головне враження створюють довгі ряди пляшок і масштаб коридорів. Температура тримається близько 12–14 °C — це умова зберігання й підказка щодо одягу.",
        "Zážitek určují dlouhé řady lahví a rozměr chodeb. Teplota se drží kolem 12–14 °C, což je podmínka skladování i vodítko pro vhodné oblečení."
      )),
      section(l("Практика поездки", "Detalii practice", "Practical planning", "Практика поїздки", "Praktické plánování"), l(
        "Предварительная запись обязательна для надёжного плана: организатору важно знать программу, язык и транспорт. Если планируется дегустация, заранее определите водителя, который не будет употреблять алкоголь.",
        "Rezervarea prealabilă este esențială: organizatorul trebuie să cunoască programul, limba și transportul. Dacă alegi degustarea, stabilește din timp un șofer care nu va consuma alcool.",
        "Advance booking is essential: the organiser needs the programme, language and transport details. If your visit includes a tasting, arrange a driver who will not drink.",
        "Попереднє бронювання необхідне: організатору потрібні програма, мова й транспорт. Якщо планується дегустація, заздалегідь визначте водія, який не вживатиме алкоголь.",
        "Rezervace předem je zásadní: pořadatel potřebuje znát program, jazyk a dopravu. Pokud je součástí degustace, zajistěte řidiče, který nebude pít alkohol."
      )),
    ],
  },
  purcari: {
    slug: "purcari",
    path: "/guide/wineries/purcari",
    image: "/guide/wineries.webp",
    title: l("Château Purcari — винодельческое путешествие на юго-восток Молдовы", "Château Purcari — călătorie vitivinicolă în sud-estul Moldovei", "Château Purcari — a wine journey in south-east Moldova", "Château Purcari — винна подорож на південний схід Молдови", "Château Purcari — vinařská cesta na jihovýchod Moldavska"),
    description: l("Полный гид по Château Purcari: наследие с 1827 года, территория, дегустации, маршрут из Кишинёва и подготовка к поездке.", "Ghid complet pentru Château Purcari: patrimoniu din 1827, domeniu, degustări, traseul din Chișinău și pregătirea vizitei.", "A complete Château Purcari guide: heritage since 1827, estate, tastings, route from Chisinau and trip planning.", "Повний гід Château Purcari: спадщина з 1827 року, маєток, дегустації, маршрут із Кишинева та підготовка до подорожі.", "Kompletní průvodce Château Purcari: tradice od roku 1827, areál, degustace, cesta z Kišiněva a příprava návštěvy."),
    eyebrow: l("Винодельни Молдовы", "Vinăriile Moldovei", "Wineries of Moldova", "Виноробні Молдови", "Moldavská vinařství"),
    location: l("Purcari, район Ștefan Vodă", "Purcari, raionul Ștefan Vodă", "Purcari, Ștefan Vodă district", "Purcari, район Ștefan Vodă", "Purcari, okres Ștefan Vodă"),
    tripLength: l("Полный день с дорогой", "O zi întreagă cu drumul", "A full day including travel", "Повний день разом із дорогою", "Celý den včetně cesty"),
    route: l("Автомобиль или заранее организованный трансфер", "Automobil sau transfer organizat din timp", "Car or pre-arranged transfer", "Автомобіль або заздалегідь організований трансфер", "Auto nebo předem zajištěný transfer"),
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Chateau+Purcari+Moldova",
    officialUrl: "https://purcariwineries.com/en/",
    officialName: "Purcari Wineries",
    sections: [
      section(l("Поместье с историей", "Un domeniu cu istorie", "An estate with history", "Маєток з історією", "Areál s historií"), l(
        "История Purcari ведётся с 1827 года. Сегодня Château Purcari соединяет работающую винодельню, исторический образ поместья и спокойный сельский ландшафт юго-востока страны.",
        "Istoria Purcari începe în 1827. Astăzi, Château Purcari reunește o vinărie activă, imaginea unui domeniu istoric și peisajul liniștit din sud-estul țării.",
        "Purcari traces its history to 1827. Today Château Purcari combines a working winery, the character of a historic estate and the quiet landscape of south-east Moldova.",
        "Історія Purcari починається 1827 року. Сьогодні Château Purcari поєднує діючу виноробню, характер історичного маєтку й спокійний ландшафт південного сходу країни.",
        "Historie Purcari sahá do roku 1827. Château Purcari dnes spojuje fungující vinařství, charakter historického panství a klidnou krajinu jihovýchodního Moldavska."
      )),
      section(l("Не только погреба", "Mai mult decât beciuri", "More than cellars", "Не лише погреби", "Více než sklepy"), l(
        "Сюда едут не за одним подземным эпизодом, а за неспешным знакомством с винодельческим поместьем. Программа может включать производство, погреба, дегустацию и прогулку по территории; точный состав выбирают при бронировании.",
        "Vizita nu se rezumă la un episod subteran, ci oferă ritmul unui domeniu vitivinicol. Programul poate include producerea, beciurile, degustarea și plimbarea prin teritoriu; conținutul exact se alege la rezervare.",
        "This is not simply an underground stop but an unhurried estate visit. Programmes may combine production, cellars, tasting and time around the grounds; choose the exact format when reserving.",
        "Сюди їдуть не за одним підземним епізодом, а за неспішним знайомством із винним маєтком. Програма може охоплювати виробництво, погреби, дегустацію та прогулянку територією; точний формат обирають під час бронювання.",
        "Nejde jen o podzemní zastávku, ale o klidné poznání vinařského panství. Program může zahrnout výrobu, sklepy, degustaci i procházku areálem; přesný formát zvolte při rezervaci."
      )),
      section(l("Дорога как часть маршрута", "Drumul face parte din traseu", "The journey is part of the day", "Дорога як частина маршруту", "Cesta je součástí dne"), l(
        "Purcari заметно дальше от Кишинёва, чем Cricova или Mileștii Mici, поэтому визит лучше планировать как отдельный день. Оставьте запас на дорогу и не объединяйте поездку с плотной вечерней программой в городе.",
        "Purcari este considerabil mai departe de Chișinău decât Cricova sau Mileștii Mici, de aceea vizita merită o zi separată. Lasă rezervă pentru drum și evită un program aglomerat seara în oraș.",
        "Purcari is considerably farther from Chisinau than Cricova or Mileștii Mici, so it works best as a dedicated day trip. Allow extra travel time and avoid a tightly scheduled evening back in the city.",
        "Purcari розташована значно далі від Кишинева, ніж Cricova чи Mileștii Mici, тому краще присвятити їй окремий день. Залиште запас на дорогу й не плануйте щільну вечірню програму в місті.",
        "Purcari leží podstatně dál od Kišiněva než Cricova či Mileștii Mici, proto mu věnujte samostatný den. Nechte si rezervu na cestu a neplánujte nabitý večer ve městě."
      )),
      section(l("Бронирование и безопасность", "Rezervare și siguranță", "Booking and safety", "Бронювання й безпека", "Rezervace a bezpečnost"), l(
        "Проверьте язык экскурсии, продолжительность и состав дегустации напрямую у винодельни. Для поездки с дегустацией удобнее заказать трансфер или назначить трезвого водителя; условия посещения с детьми также стоит уточнить заранее.",
        "Verifică direct la vinărie limba excursiei, durata și conținutul degustării. Pentru o vizită cu degustare este mai comod un transfer sau un șofer desemnat; întreabă din timp și despre condițiile pentru copii.",
        "Confirm tour language, duration and tasting details directly with the winery. A transfer or designated driver is sensible when tasting; also ask ahead about arrangements for children.",
        "Перевірте мову екскурсії, тривалість і склад дегустації безпосередньо у виноробні. Для поїздки з дегустацією оберіть трансфер або тверезого водія; умови для дітей також уточніть заздалегідь.",
        "Jazyk prohlídky, délku a podobu degustace potvrďte přímo u vinařství. Při degustaci zvolte transfer nebo určeného řidiče; předem ověřte i podmínky pro děti."
      )),
    ],
  },
  "castel-mimi": {
    slug: "castel-mimi",
    path: "/guide/wineries/castel-mimi",
    image: "/guide/wineries.webp",
    title: l("Castel Mimi — винный замок в Bulboaca", "Castel Mimi — castelul vinicol din Bulboaca", "Castel Mimi wine castle in Bulboaca", "Castel Mimi — винний замок у Bulboaca", "Castel Mimi — vinařský zámek v Bulboace"),
    description: l("Гид по Castel Mimi: история Константина Мими, архитектура, экскурсии, дорога из Кишинёва и официальное бронирование.", "Ghid pentru Castel Mimi: istoria lui Constantin Mimi, arhitectură, excursii, drumul din Chișinău și rezervare oficială.", "A guide to Castel Mimi: Constantin Mimi’s history, architecture, tours, travel from Chisinau and official booking.", "Гід Castel Mimi: історія Константина Мімі, архітектура, екскурсії, дорога з Кишинева та офіційне бронювання.", "Průvodce Castel Mimi: historie Constantina Mimiho, architektura, prohlídky, cesta z Kišiněva a oficiální rezervace."),
    eyebrow: l("Винодельни Молдовы", "Vinăriile Moldovei", "Wineries of Moldova", "Виноробні Молдови", "Moldavská vinařství"),
    location: l("Bulboaca, район Anenii Noi", "Bulboaca, raionul Anenii Noi", "Bulboaca, Anenii Noi district", "Bulboaca, район Anenii Noi", "Bulboaca, okres Anenii Noi"),
    tripLength: l("Полдня или неспешный день", "O jumătate de zi sau o zi relaxată", "Half a day or a relaxed full day", "Пів дня або неспішний день", "Půl dne nebo klidný celý den"),
    route: l("Автомобиль, такси, поезд до Bulboaca или трансфер", "Automobil, taxi, tren până la Bulboaca sau transfer", "Car, taxi, train to Bulboaca or transfer", "Автомобіль, таксі, потяг до Bulboaca або трансфер", "Auto, taxi, vlak do Bulboacy nebo transfer"),
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Castel+Mimi+Bulboaca",
    officialUrl: "https://castelmimi.md/en/wine-tours/",
    officialName: "Castel Mimi",
    sections: [
      section(l("Архитектура винного поместья", "Arhitectura domeniului vinicol", "Architecture of a wine estate", "Архітектура винного маєтку", "Architektura vinařského panství"), l(
        "Castel Mimi выделяется среди винных маршрутов Молдовы выразительной архитектурой. Исторические погреба связаны с Константином Мими — виноделом и общественным деятелем, заложившим здесь современное для своего времени хозяйство.",
        "Castel Mimi se distinge prin arhitectura sa. Beciurile istorice sunt legate de Constantin Mimi, viticultor și personalitate publică ce a creat aici o gospodărie modernă pentru epoca sa.",
        "Castel Mimi stands out for its architecture. Its historic cellars are associated with Constantin Mimi, a winemaker and public figure who developed an estate that was modern for its time.",
        "Castel Mimi вирізняється виразною архітектурою. Історичні погреби пов’язані з Константином Мімі — виноробом і громадським діячем, який створив тут сучасне для свого часу господарство.",
        "Castel Mimi vyniká architekturou. Historické sklepy jsou spojeny s Constantinem Mimim, vinařem a veřejnou osobností, který zde vybudoval na svou dobu moderní hospodářství."
      )),
      section(l("Сценарий визита", "Cum arată vizita", "The shape of a visit", "Сценарій візиту", "Podoba návštěvy"), l(
        "Экскурсии сочетают историю здания, винодельческое производство, погреба и дегустацию. Территория располагает к более медленному темпу, поэтому после основной программы стоит оставить время на архитектуру и двор.",
        "Excursiile combină istoria clădirii, producerea vinului, beciurile și degustarea. Domeniul invită la un ritm mai lent, așa că păstrează timp pentru arhitectură și curte după program.",
        "Tours combine the building’s story, wine production, cellars and tasting. The estate rewards a slower pace, so leave time after the formal tour to take in the architecture and grounds.",
        "Екскурсії поєднують історію будівлі, виробництво вина, погреби й дегустацію. Маєток варто оглядати неспішно, тому після основної програми залиште час на архітектуру та двір.",
        "Prohlídky spojují historii budovy, výrobu vína, sklepy a degustaci. Areál si zaslouží pomalejší tempo, proto si po programu nechte čas na architekturu a nádvoří."
      )),
      section(l("Как выстроить день", "Cum planifici ziua", "How to plan the day", "Як спланувати день", "Jak naplánovat den"), l(
        "Bulboaca находится восточнее Кишинёва. Поезд может быть интересной альтернативой автомобилю, но расписание необходимо проверять на дату поездки; обратный маршрут и последний доступный рейс продумайте заранее.",
        "Bulboaca se află la est de Chișinău. Trenul poate fi o alternativă interesantă la automobil, însă orarul trebuie verificat pentru ziua călătoriei; planifică din timp și întoarcerea.",
        "Bulboaca lies east of Chisinau. The train can be an appealing alternative to driving, but check the timetable for your exact date and plan the return journey in advance.",
        "Bulboaca розташована на схід від Кишинева. Потяг може бути цікавою альтернативою автомобілю, але розклад слід перевірити на дату поїздки й заздалегідь спланувати повернення.",
        "Bulboaca leží východně od Kišiněva. Vlak může být zajímavou alternativou k autu, jízdní řád však ověřte pro konkrétní datum a návrat naplánujte předem."
      )),
      section(l("Что проверить заранее", "Ce verifici din timp", "What to check ahead", "Що перевірити заздалегідь", "Co ověřit předem"), l(
        "На официальном сайте доступны разные типы туров. Сравните язык, длительность, состав дегустации и доступность на нужную дату. Для мероприятий часть территории может работать по особому режиму.",
        "Site-ul oficial prezintă mai multe tipuri de tururi. Compară limba, durata, degustarea și disponibilitatea pentru data dorită. În zilele cu evenimente, unele spații pot avea un regim special.",
        "The official site lists several tour types. Compare language, duration, tasting details and availability for your date. Parts of the estate may operate differently on event days.",
        "На офіційному сайті є кілька типів турів. Порівняйте мову, тривалість, склад дегустації й доступність на потрібну дату. У дні подій частина території може працювати за особливим режимом.",
        "Oficiální web nabízí několik typů prohlídek. Porovnejte jazyk, délku, degustaci a dostupnost pro své datum. Během akcí mohou části areálu fungovat v jiném režimu."
      )),
    ],
  },
  "orheiul-vechi": {
    slug: "orheiul-vechi",
    path: "/guide/orheiul-vechi",
    image: "/guide/moldova-trips.webp",
    title: l("Orheiul Vechi — скалы, история и монастыри Молдовы", "Orheiul Vechi — stânci, istorie și mănăstiri", "Orheiul Vechi — cliffs, history and monasteries", "Orheiul Vechi — скелі, історія та монастирі", "Orheiul Vechi — skály, historie a kláštery"),
    description: l("Путеводитель по Orheiul Vechi: археологический ландшафт, пещерный монастырь, маршруты, дорога из Кишинёва и полезные советы.", "Ghid pentru Orheiul Vechi: peisaj arheologic, mănăstire rupestră, trasee, drumul din Chișinău și sfaturi practice.", "An Orheiul Vechi guide to the archaeological landscape, cave monastery, routes from Chisinau and practical advice.", "Путівник Orheiul Vechi: археологічний ландшафт, печерний монастир, маршрути, дорога з Кишинева та практичні поради.", "Průvodce Orheiul Vechi: archeologická krajina, jeskynní klášter, trasy z Kišiněva a praktické tipy."),
    eyebrow: l("Поездки по Молдове", "Excursii prin Moldova", "Trips around Moldova", "Подорожі Молдовою", "Výlety po Moldavsku"),
    location: l("Примерно 46 км к северу от Кишинёва", "La circa 46 km nord de Chișinău", "About 46 km north of Chisinau", "Приблизно 46 км на північ від Кишинева", "Asi 46 km severně od Kišiněva"),
    tripLength: l("Полдня; полный день для прогулки и сёл", "O jumătate de zi; o zi pentru drumeție și sate", "Half a day; a full day for walking and villages", "Пів дня; повний день для прогулянки й сіл", "Půl dne; celý den na procházku a vesnice"),
    route: l("Автомобиль, такси, экскурсия или региональный транспорт", "Automobil, taxi, excursie sau transport regional", "Car, taxi, tour or regional transport", "Автомобіль, таксі, екскурсія або регіональний транспорт", "Auto, taxi, organizovaný výlet nebo regionální doprava"),
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Orheiul+Vechi+Moldova",
    officialUrl: "https://orheiulvechi.com/en/tourism/",
    officialName: "Orheiul Vechi Cultural-Natural Reserve",
    sections: [
      section(l("Ландшафт, который читается как история", "Un peisaj citit ca istorie", "A landscape read as history", "Ландшафт, що читається як історія", "Krajina, kterou lze číst jako historii"), l(
        "Orheiul Vechi — культурно-природный заповедник в долине Реута. Известняковые выступы, изгиб реки и следы поселений разных эпох образуют цельный исторический ландшафт, который лучше воспринимается пешком.",
        "Orheiul Vechi este o rezervație cultural-naturală în valea Răutului. Stâncile de calcar, cotul râului și urmele așezărilor din epoci diferite formează un peisaj istoric care se descoperă cel mai bine pe jos.",
        "Orheiul Vechi is a cultural-natural reserve in the Răut valley. Limestone ridges, the river bend and traces of settlements from different periods form a historic landscape best understood on foot.",
        "Orheiul Vechi — культурно-природний заповідник у долині Реута. Вапнякові виступи, вигин річки й сліди поселень різних епох утворюють цілісний історичний ландшафт, який найкраще пізнавати пішки.",
        "Orheiul Vechi je kulturně-přírodní rezervace v údolí Răutu. Vápencové hřebeny, ohyb řeky a stopy sídel z různých epoch tvoří historickou krajinu, kterou nejlépe poznáte pěšky."
      )),
      section(l("Пещерный монастырь и археология", "Mănăstirea rupestră și arheologia", "Cave monastery and archaeology", "Печерний монастир та археологія", "Jeskynní klášter a archeologie"), l(
        "Один из главных ориентиров — монастырский комплекс в скале над долиной. Рядом находятся археологические участки и музейная информация о слоях истории территории. Это действующее религиозное место: одежда и поведение должны быть уважительными.",
        "Un reper important este complexul monastic săpat în stâncă deasupra văii. În apropiere se află situri arheologice și informații muzeale despre straturile istorice. Este un loc religios activ, unde se recomandă o ținută și un comportament respectuos.",
        "A principal landmark is the monastic complex cut into the cliff above the valley. Archaeological areas and museum interpretation nearby explain the site’s many historical layers. It remains an active religious place, so dress and behave respectfully.",
        "Один із головних орієнтирів — монастирський комплекс у скелі над долиною. Поруч є археологічні ділянки й музейна інформація про історичні шари території. Це чинне релігійне місце, тож одяг і поведінка мають бути поважними.",
        "Hlavní dominantou je klášterní komplex vytesaný do skály nad údolím. Nedaleká archeologická místa a muzejní informace vysvětlují historické vrstvy lokality. Jde o živé náboženské místo, proto volte ohleduplné oblečení a chování."
      )),
      section(l("Маршрут на месте", "Traseul la fața locului", "A route on site", "Маршрут на місці", "Trasa na místě"), l(
        "Начните с информационного пункта, затем поднимитесь к обзорным площадкам и монастырю, оставив время на спокойную прогулку вдоль гребня. Тропы местами неровные и открытые солнцу; после дождя камень и грунт могут быть скользкими.",
        "Începe la punctul de informare, apoi urcă spre belvederi și mănăstire, păstrând timp pentru o plimbare pe creastă. Potecile sunt pe alocuri denivelate și expuse soarelui; după ploaie, piatra și solul pot deveni alunecoase.",
        "Begin at the visitor information point, then climb towards viewpoints and the monastery, leaving time for a gentle walk along the ridge. Paths can be uneven and exposed to sun; stone and soil may be slippery after rain.",
        "Почніть з інформаційного пункту, потім підніміться до оглядових майданчиків і монастиря, залишивши час на прогулянку вздовж хребта. Стежки місцями нерівні й відкриті сонцю; після дощу камінь і ґрунт можуть бути слизькими.",
        "Začněte u informačního místa, poté vystoupejte k vyhlídkám a klášteru a nechte si čas na procházku po hřebeni. Cesty jsou místy nerovné a bez stínu; po dešti může kámen i půda klouzat."
      )),
      section(l("Как подготовиться", "Cum te pregătești", "How to prepare", "Як підготуватися", "Jak se připravit"), l(
        "Лучше приезжать в светлое время суток, взять воду, защиту от солнца и обувь с устойчивой подошвой. Расписание транспорта, билеты и режим объектов проверяйте перед поездкой на сайте заповедника; в выходные закладывайте дополнительное время.",
        "Este mai bine să ajungi pe lumină, cu apă, protecție solară și încălțăminte stabilă. Verifică transportul, biletele și programul obiectivelor pe site-ul rezervației; în weekend păstrează timp suplimentar.",
        "Visit in daylight and bring water, sun protection and shoes with reliable grip. Check transport, tickets and site opening arrangements on the reserve’s website; allow extra time at weekends.",
        "Краще приїжджати у світлу пору доби, взяти воду, захист від сонця та взуття зі стійкою підошвою. Транспорт, квитки й режим об’єктів перевіряйте на сайті заповідника; у вихідні залишайте додатковий час.",
        "Přijeďte za denního světla, vezměte vodu, ochranu před sluncem a pevnou obuv. Dopravu, vstupenky a provoz objektů ověřte na webu rezervace; o víkendech počítejte s časovou rezervou."
      )),
    ],
  },
};

export function isWinerySlug(value: string): value is WinerySlug {
  return winerySlugs.includes(value as WinerySlug);
}
