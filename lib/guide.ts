import type { Language } from "@/locales/translations";

export const guideSlugs = [
  "walking-tours",
  "events",
  "dental-tourism",
  "moldova-trips",
  "transnistria",
  "monasteries",
  "museums",
  "wineries",
  "attractions",
  "restaurants",
] as const;

export type GuideSlug = (typeof guideSlugs)[number];

export function isGuideSlug(value: string): value is GuideSlug {
  return guideSlugs.includes(value as GuideSlug);
}

type Localized = Record<Language, string>;

export type GuideSource = {
  sourceName: string;
  sourceUrl: string;
  verifiedAt: string;
  updatedAt: string;
};

export type GuideSection = {
  title: Localized;
  body: Localized;
  note?: {
    title: Localized;
    body: Localized;
  };
  links?: { slug: GuideSlug; label: Localized }[];
};

export type GuidePageData = {
  slug: GuideSlug;
  image: string;
  title: Localized;
  description: Localized;
  eyebrow: Localized;
  sections: GuideSection[];
  sources: GuideSource[];
};

const l = (ru: string, ro: string, en: string, uk: string, cs: string): Localized => ({
  ru,
  ro,
  en,
  uk,
  cs,
});

export const guideUi = {
  hubTitle: l("Гид по Кишинёву и Молдове", "Ghid pentru Chișinău și Moldova", "Chisinau and Moldova guide", "Гід Кишиневом і Молдовою", "Průvodce Kišiněvem a Moldavskem"),
  hubIntro: l(
    "Практичные маршруты и идеи для поездки: что посмотреть в городе, куда съездить на день и что проверить перед выездом.",
    "Trasee și idei practice: ce să vezi în oraș, unde să mergi pentru o zi și ce să verifici înainte de plecare.",
    "Practical routes and trip ideas: what to see in the city, where to go for a day and what to check before leaving.",
    "Практичні маршрути та ідеї: що подивитися в місті, куди поїхати на день і що перевірити перед виїздом.",
    "Praktické trasy a tipy: co vidět ve městě, kam vyrazit na den a co před cestou ověřit."
  ),
  open: l("Открыть гид", "Deschide ghidul", "Open guide", "Відкрити гід", "Otevřít průvodce"),
  sources: l("Полезные официальные ресурсы", "Resurse oficiale utile", "Useful official resources", "Корисні офіційні ресурси", "Užitečné oficiální zdroje"),
  back: l("Все темы", "Toate temele", "All topics", "Усі теми", "Všechna témata"),
  emptyEvents: l(
    "Сейчас нет событий, подтверждённых организатором. Мы не публикуем примерные или вымышленные афиши.",
    "În prezent nu există evenimente confirmate de organizator. Nu publicăm afișe aproximative sau fictive.",
    "There are currently no organiser-verified events. We do not publish illustrative or invented listings.",
    "Наразі немає подій, підтверджених організатором. Ми не публікуємо приблизні чи вигадані афіші.",
    "Momentálně nejsou k dispozici akce ověřené pořadatelem. Nezveřejňujeme orientační ani smyšlené programy."
  ),
};

const commonSources = {
  visitChisinau: { sourceName: "Visit Chișinău", sourceUrl: "https://visit.chisinau.md/en/", verifiedAt: "2026-07-25", updatedAt: "2026-07-25" },
  moldovaTravel: { sourceName: "Moldova Travel", sourceUrl: "https://moldova.travel/en/", verifiedAt: "2026-07-25", updatedAt: "2026-07-25" },
  borderPolice: { sourceName: "Border Police of the Republic of Moldova", sourceUrl: "https://border.gov.md/", verifiedAt: "2026-07-25", updatedAt: "2026-07-25" },
  historyMuseum: { sourceName: "National Museum of History of Moldova", sourceUrl: "https://www.nationalmuseum.md/", verifiedAt: "2026-07-25", updatedAt: "2026-07-25" },
  artMuseum: { sourceName: "National Art Museum of Moldova", sourceUrl: "https://www.mnam.md/en", verifiedAt: "2026-07-25", updatedAt: "2026-07-25" },
} satisfies Record<string, GuideSource>;

const page = (
  slug: GuideSlug,
  image: string,
  title: Localized,
  description: Localized,
  sections: GuideSection[],
  sources: GuideSource[],
): GuidePageData => ({
  slug,
  image,
  title,
  description,
  eyebrow: l("RentPlaceMD · путеводитель", "RentPlaceMD · ghid", "RentPlaceMD · guide", "RentPlaceMD · путівник", "RentPlaceMD · průvodce"),
  sections,
  sources,
});

export const guidePages: Record<GuideSlug, GuidePageData> = {
  "walking-tours": page(
    "walking-tours",
    "/guide/walking-tours.webp",
    l("Пешие маршруты по Кишинёву", "Trasee pietonale prin Chișinău", "Walking routes in Chisinau", "Піші маршрути Кишиневом", "Pěší trasy po Kišiněvě"),
    l(
      "Четыре самостоятельных маршрута от короткой прогулки по центру до полного дня в городе.",
      "Patru trasee independente, de la o plimbare scurtă prin centru la o zi întreagă în oraș.",
      "Four self-guided routes, from a short central walk to a full day in the city.",
      "Чотири самостійні маршрути — від короткої прогулянки центром до цілого дня в місті.",
      "Čtyři samostatné trasy od krátké procházky centrem po celý den ve městě."
    ),
    [
      {
        title: l("1. Исторический центр · 2–3 часа · около 3 км", "1. Centrul istoric · 2–3 ore · circa 3 km", "1. Historic centre · 2–3 hours · about 3 km", "1. Історичний центр · 2–3 години · близько 3 км", "1. Historické centrum · 2–3 hodiny · asi 3 km"),
        body: l(
          "Старт: Площадь Великого Национального Собрания. Финиш: Национальный музей истории. Лёгкий маршрут по центральным улицам.",
          "Start: Piața Marii Adunări Naționale. Final: Muzeul Național de Istorie. Traseu ușor pe străzile centrale.",
          "Start: Great National Assembly Square. Finish: National Museum of History. An easy route through central streets.",
          "Старт: Площа Великих Національних Зборів. Фініш: Національний музей історії. Легкий маршрут центральними вулицями.",
          "Start: Náměstí Velkého národního shromáždění. Cíl: Národní historické muzeum. Lehká trasa centrem."
        ),
        note: {
          title: l("Остановки по пути", "Opriri pe traseu", "Stops along the way", "Зупинки на маршруті", "Zastávky po cestě"),
          body: l(
            "Маршрут проходит через Соборный парк, мимо кафедрального собора и Триумфальной арки, затем продолжается через парк Штефана чел Маре к улице 31 Августа 1989.",
            "Traseul trece prin Parcul Catedralei, pe lângă catedrală și Arcul de Triumf, apoi continuă prin Parcul Ștefan cel Mare spre strada 31 August 1989.",
            "The route crosses Cathedral Park, passes the cathedral and Triumphal Arch, then continues through Ștefan cel Mare Park towards 31 August 1989 Street.",
            "Маршрут проходить через Соборний парк, повз кафедральний собор і Тріумфальну арку, а далі — через парк Штефана чел Маре до вулиці 31 Серпня 1989.",
            "Trasa vede Katedrálním parkem kolem katedrály a Vítězného oblouku, pokračuje parkem Ștefan cel Mare a dále k ulici 31. srpna 1989."
          ),
        },
      },
      {
        title: l("2. Парки и зелёный город · 2,5–3 часа · около 5 км", "2. Parcuri și oraș verde · 2,5–3 ore · circa 5 km", "2. Parks and green city · 2.5–3 hours · about 5 km", "2. Парки й зелене місто · 2,5–3 години · близько 5 км", "2. Parky a zelené město · 2,5–3 hodiny · asi 5 km"),
        body: l(
          "Старт: парк Штефана чел Маре. Финиш: Дендрарий. Между ними — спокойная прогулка через Валя Морилор; есть подъёмы.",
          "Start: Parcul Ștefan cel Mare. Final: Dendrariu. Între ele — o plimbare liniștită prin Valea Morilor; există urcări.",
          "Start: Ștefan cel Mare Park. Finish: Dendrarium. A relaxed walk via Valea Morilor, with some uphill sections.",
          "Старт: парк Штефана чел Маре. Фініш: Дендрарій. Спокійна прогулянка через Валя Морілор; є підйоми.",
          "Start: park Ștefan cel Mare. Cíl: dendrárium. Klidná procházka přes Valea Morilor s několika stoupáními."
        ),
        note: {
          title: l("Перед прогулкой", "Înainte de plimbare", "Before the walk", "Перед прогулянкою", "Před procházkou"),
          body: l(
            "В жаркий день пригодится вода, а для лестниц и склонов — удобная обувь. Режим работы Дендрария лучше проверить непосредственно перед визитом.",
            "Într-o zi călduroasă ia apă și poartă încălțăminte comodă pentru scări și pante. Verifică programul Dendrariului înainte de vizită.",
            "Carry water on hot days and wear comfortable shoes for the steps and slopes. Check the Dendrarium’s current opening information before visiting.",
            "У спекотний день візьміть воду, а для сходів і схилів — зручне взуття. Години роботи Дендрарію краще перевірити перед візитом.",
            "V horkém dni si vezměte vodu a na schody a svahy pohodlnou obuv. Před návštěvou ověřte aktuální otevírací dobu dendrária."
          ),
        },
      },
      {
        title: l("3. Архитектура XX века · 2 часа · около 4 км", "3. Arhitectura secolului XX · 2 ore · circa 4 km", "3. Twentieth-century architecture · 2 hours · about 4 km", "3. Архітектура XX століття · 2 години · близько 4 км", "3. Architektura 20. století · 2 hodiny · asi 4 km"),
        body: l(
          "Старт: Кишинёвский цирк. Финиш: центральный рынок. Маршрут показывает контраст позднесоветской и современной городской среды; здания осматривайте с улицы.",
          "Start: Circul din Chișinău. Final: Piața Centrală. Traseul arată contrastul dintre mediul urban sovietic târziu și cel contemporan; privește clădirile din spațiul public.",
          "Start: Chisinau Circus. Finish: Central Market. The route shows the contrast between late-Soviet and contemporary urban space; view buildings from public areas.",
          "Старт: Кишинівський цирк. Фініш: Центральний ринок. Маршрут показує контраст пізньорадянського й сучасного міста; оглядайте будівлі з публічного простору.",
          "Start: Kišiněvský cirkus. Cíl: centrální tržnice. Trasa ukazuje kontrast pozdně sovětského a současného města; budovy si prohlížejte z veřejného prostoru."
        ),
      },
      {
        title: l("4. Кишинёв за один день · 6–8 часов · около 8 км", "4. Chișinău într-o zi · 6–8 ore · circa 8 km", "4. Chisinau in one day · 6–8 hours · about 8 km", "4. Кишинів за один день · 6–8 годин · близько 8 км", "4. Kišiněv za jeden den · 6–8 hodin · asi 8 km"),
        body: l(
          "Объедините исторический центр, один музей и Валя Морилор. Оставьте запас времени на обед и не планируйте музей без проверки официального расписания.",
          "Combină centrul istoric, un muzeu și Valea Morilor. Păstrează timp pentru prânz și nu planifica muzeul fără a verifica programul oficial.",
          "Combine the historic centre, one museum and Valea Morilor. Leave time for lunch and check the museum’s official schedule first.",
          "Поєднайте історичний центр, один музей і Валя Морілор. Залиште час на обід і спочатку перевірте офіційний розклад музею.",
          "Spojte historické centrum, jedno muzeum a Valea Morilor. Nechte si čas na oběd a nejprve ověřte oficiální otevírací dobu muzea."
        ),
      },
    ],
    [commonSources.visitChisinau, commonSources.historyMuseum]
  ),
  events: page(
    "events",
    "/guide/events.webp",
    l("Календарь концертов и событий в Кишинёве 2026", "Calendarul concertelor și evenimentelor din Chișinău 2026", "Chișinău concerts and events calendar 2026", "Календар концертів і подій у Кишиневі 2026", "Kalendář koncertů a akcí v Kišiněvě 2026"),
    l("Подтверждённые концерты, фестивали, спектакли и городские события с прямыми ссылками на организаторов и билеты.", "Concerte, festivaluri, spectacole și evenimente urbane confirmate, cu linkuri directe către organizatori și bilete.", "Confirmed concerts, festivals, shows and city events with direct organiser and ticket links.", "Підтверджені концерти, фестивалі, вистави й міські події з прямими посиланнями на організаторів і квитки.", "Potvrzené koncerty, festivaly, představení a městské akce s přímými odkazy na pořadatele a vstupenky."),
    [{
      title: l("Как мы отбираем афишу", "Cum selectăm evenimentele", "How listings are selected", "Як ми відбираємо афішу", "Jak vybíráme akce"),
      body: l(
        "У записи должны быть дата, место и прямая ссылка на первоисточник. Если подтверждения нет или дата прошла, запись не показывается.",
        "O înregistrare trebuie să aibă dată, loc și un link direct către sursa primară. Dacă nu există confirmare sau data a trecut, nu este afișată.",
        "A listing needs a date, venue and direct primary-source link. Unverified or expired listings are not shown.",
        "Запис має містити дату, місце та пряме посилання на першоджерело. Непідтверджені або минулі події не показуються.",
        "Záznam musí mít datum, místo a přímý odkaz na primární zdroj. Neověřené nebo proběhlé akce se nezobrazují."
      ),
    }],
    [commonSources.visitChisinau]
  ),
  "dental-tourism": page(
    "dental-tourism",
    "/guide/dental-tourism.webp",
    l("Стоматологический туризм", "Turism stomatologic", "Dental tourism", "Стоматологічний туризм", "Dentální turistika"),
    l("Практическая информация для планирования лечения и проживания без рекомендаций конкретных клиник.", "Informații practice pentru planificarea tratamentului și cazării, fără recomandări de clinici.", "Practical information for planning treatment and accommodation, without recommending clinics.", "Практична інформація для планування лікування й проживання без рекомендацій клінік.", "Praktické informace pro plánování léčby a ubytování bez doporučování klinik."),
    [
      {
        title: l("До записи", "Înainte de programare", "Before booking", "До запису", "Před objednáním"),
        body: l(
          "Попросите письменный план лечения, квалификацию врача, перечень материалов, полную смету и условия гарантии. Уточните, какие этапы требуют повторного визита.",
          "Cere un plan de tratament scris, calificările medicului, materialele, devizul complet și condițiile garanției. Clarifică etapele care necesită o vizită repetată.",
          "Ask for a written treatment plan, clinician credentials, materials, total estimate and warranty terms. Confirm which stages require a return visit.",
          "Попросіть письмовий план лікування, кваліфікацію лікаря, перелік матеріалів, повний кошторис та умови гарантії. Уточніть, які етапи потребують повторного візиту.",
          "Vyžádejte si písemný léčebný plán, kvalifikaci lékaře, materiály, celkový rozpočet a záruční podmínky. Ověřte, které fáze vyžadují další návštěvu."
        ),
        note: {
          title: l("План поездки", "Planul călătoriei", "Planning the trip", "План поїздки", "Plánování cesty"),
          body: l(
            "Медицинское решение не стоит принимать только по переписке. Оставьте после процедуры несколько резервных дней и сохраните снимки, договор, чеки и выписку.",
            "Nu lua o decizie medicală doar din mesaje. Păstrează câteva zile de rezervă după procedură și toate imaginile, contractul, chitanțele și scrisoarea medicală.",
            "Do not make a medical decision from messages alone. Keep a few buffer days after treatment and retain scans, the contract, receipts and discharge notes.",
            "Не ухвалюйте медичного рішення лише за листуванням. Залиште кілька резервних днів після процедури та збережіть знімки, договір, чеки й виписку.",
            "O léčbě nerozhodujte pouze podle zpráv. Po zákroku si nechte několik volných dnů a uchovejte snímky, smlouvu, účtenky i lékařskou zprávu."
          ),
        },
      },
      {
        title: l("Проживание и безопасность", "Cazare și siguranță", "Stay and safety", "Проживання й безпека", "Pobyt a bezpečnost"),
        body: l(
          "Выбирайте жильё с тихим местом для отдыха, кухней и понятным транспортом до клиники. При тревожных симптомах связывайтесь с лечащим врачом или экстренной службой; этот гид не заменяет медицинскую консультацию.",
          "Alege cazare cu un loc liniștit pentru odihnă, bucătărie și transport clar către clinică. Pentru simptome îngrijorătoare contactează medicul sau serviciile de urgență; ghidul nu înlocuiește consultația medicală.",
          "Choose accommodation with a quiet rest area, kitchen and a clear journey to the clinic. For concerning symptoms contact your clinician or emergency services; this guide is not medical advice.",
          "Обирайте житло з тихим місцем для відпочинку, кухнею та зрозумілим маршрутом до клініки. За тривожних симптомів звертайтеся до лікаря або екстреної служби; цей гід не замінює консультацію.",
          "Vyberte ubytování s klidným místem k odpočinku, kuchyní a snadnou cestou na kliniku. Při znepokojivých příznacích kontaktujte lékaře nebo pohotovost; průvodce nenahrazuje lékařskou konzultaci."
        ),
      },
    ],
    []
  ),
  "moldova-trips": page(
    "moldova-trips",
    "/guide/moldova-trips.webp",
    l("Поездки по Молдове", "Excursii prin Moldova", "Trips around Moldova", "Подорожі Молдовою", "Výlety po Moldavsku"),
    l("Идеи для самостоятельных поездок на один день из Кишинёва.", "Idei pentru excursii independente de o zi din Chișinău.", "Ideas for independent day trips from Chisinau.", "Ідеї для самостійних одноденних поїздок із Кишинева.", "Tipy na samostatné jednodenní výlety z Kišiněva."),
    [
      {
        title: l("Орхейул Векь", "Orheiul Vechi", "Orheiul Vechi", "Орхейул Векь", "Orheiul Vechi"),
        body: l(
          "Археологический и природный ландшафт с пещерным монастырём, тропами и сёлами Бутучень и Требужень. Для спокойного осмотра выделите большую часть дня.",
          "Peisaj arheologic și natural cu mănăstire rupestră, trasee și satele Butuceni și Trebujeni. Rezervă cea mai mare parte a zilei.",
          "An archaeological and natural landscape with a cave monastery, trails and the villages of Butuceni and Trebujeni. Allow most of a day.",
          "Археологічний і природний ландшафт із печерним монастирем, стежками та селами Бутучень і Требужень. Виділіть більшу частину дня.",
          "Archeologická a přírodní krajina s jeskynním klášterem, stezkami a vesnicemi Butuceni a Trebujeni. Vyhraďte si většinu dne."
        ),
      },
      {
        title: l("Выберите тему", "Alege tema", "Choose a theme", "Оберіть тему", "Vyberte téma"),
        body: l("Отдельные материалы помогают проверить особенности маршрута перед выездом.", "Ghidurile separate te ajută să verifici particularitățile traseului.", "Dedicated guides help you check each route before departure.", "Окремі матеріали допомагають перевірити особливості маршруту.", "Samostatní průvodci pomohou ověřit podrobnosti trasy."),
        links: [
          { slug: "monasteries", label: l("Монастыри", "Mănăstiri", "Monasteries", "Монастирі", "Kláštery") },
          { slug: "museums", label: l("Музеи", "Muzee", "Museums", "Музеї", "Muzea") },
          { slug: "wineries", label: l("Винодельни", "Vinării", "Wineries", "Виноробні", "Vinařství") },
          { slug: "transnistria", label: l("Приднестровский регион", "Regiunea transnistreană", "Transnistrian region", "Придністровський регіон", "Podněsterský region") },
        ],
      },
    ],
    [commonSources.moldovaTravel]
  ),
  transnistria: page(
    "transnistria",
    "/guide/transnistria.webp",
    l("Поездка в Приднестровский регион", "Călătorie în regiunea transnistreană", "Visiting the Transnistrian region", "Поїздка до Придністровського регіону", "Návštěva Podněsterského regionu"),
    l("Нейтральная подготовка к поездке в регион с особым фактическим режимом.", "Pregătire neutră pentru o vizită într-o regiune cu regim de facto distinct.", "Neutral preparation for a visit to a region with distinct de facto arrangements.", "Нейтральна підготовка до поїздки в регіон з особливим фактичним режимом.", "Neutrální příprava na cestu do regionu se zvláštním faktickým režimem."),
    [
      {
        title: l("Перед поездкой", "Înainte de călătorie", "Before you go", "Перед поїздкою", "Před cestou"),
        body: l(
          "Проверьте актуальные рекомендации властей вашей страны, требования Пограничной полиции Молдовы и условия страхования. Не полагайтесь на старые блоги: правила и ситуация могут измениться.",
          "Verifică recomandările actuale ale autorităților țării tale, informațiile Poliției de Frontieră a Moldovei și condițiile asigurării. Nu te baza pe bloguri vechi.",
          "Check current advice from your own authorities, Moldova’s Border Police information and your insurance terms. Do not rely on old blogs; rules and conditions can change.",
          "Перевірте актуальні рекомендації влади своєї країни, інформацію Прикордонної поліції Молдови та умови страхування. Не покладайтеся на старі блоги.",
          "Ověřte aktuální doporučení úřadů své země, informace moldavské pohraniční policie a podmínky pojištění. Nespoléhejte na staré blogy."
        ),
        note: {
          title: l("Документы и связь", "Documente și comunicare", "Documents and communication", "Документи й зв’язок", "Doklady a spojení"),
          body: l(
            "Возьмите оригинал подходящего проездного документа, сообщите близким маршрут и время возвращения. Связь, способы оплаты и обратный транспорт стоит уточнить до выезда.",
            "Ia documentul original potrivit călătoriei și comunică apropiaților traseul și ora revenirii. Verifică din timp comunicațiile, plata și transportul de întoarcere.",
            "Carry the original travel document appropriate to your journey and share your route and return time. Check connectivity, payment options and return transport in advance.",
            "Візьміть оригінал документа, придатного для поїздки, та повідомте близьким маршрут і час повернення. Заздалегідь перевірте зв’язок, оплату й зворотний транспорт.",
            "Vezměte si originál vhodného cestovního dokladu a sdělte blízkým trasu i čas návratu. Předem ověřte spojení, platby a dopravu zpět."
          ),
        },
      },
      {
        title: l("Тирасполь и Бендеры", "Tiraspol și Bender", "Tiraspol and Bender", "Тирасполь і Бендери", "Tiraspol a Bender"),
        body: l(
          "Обычно в культурный маршрут включают центральные общественные пространства Тирасполя и Бендерскую крепость. Доступ, часы и билеты проверяйте непосредственно у объекта.",
          "Un traseu cultural include de obicei spațiile publice centrale din Tiraspol și Cetatea Bender. Verifică accesul, programul și biletele direct la obiectiv.",
          "A cultural itinerary commonly includes central public spaces in Tiraspol and Bender Fortress. Confirm access, opening information and tickets directly with the attraction.",
          "Культурний маршрут зазвичай охоплює центральні публічні простори Тирасполя та Бендерську фортецю. Доступ, години й квитки перевіряйте безпосередньо.",
          "Kulturní trasa obvykle zahrnuje centrální veřejná místa Tiraspolu a pevnost Bender. Vstup, otevírací dobu a vstupenky ověřte přímo u památky."
        ),
      },
    ],
    [commonSources.moldovaTravel, commonSources.borderPolice]
  ),
  monasteries: page(
    "monasteries",
    "/guide/monasteries.webp",
    l("Монастыри Молдовы", "Mănăstirile Moldovei", "Monasteries of Moldova", "Монастирі Молдови", "Moldavské kláštery"),
    l("Спокойный гид по религиозному наследию и правилам уважительного посещения.", "Ghid calm despre patrimoniul religios și vizitarea respectuoasă.", "A considerate guide to religious heritage and respectful visits.", "Спокійний гід релігійною спадщиною та правилами поважного відвідування.", "Ohleduplný průvodce náboženským dědictvím."),
    [
      {
        title: l("Кэприяна, Курки и пещерные комплексы", "Căpriana, Curchi și complexele rupestre", "Căpriana, Curchi and cave complexes", "Кепріяна, Куркі та печерні комплекси", "Căpriana, Curchi a jeskynní komplexy"),
        body: l(
          "Кэприяна и Курки подходят для отдельной поездки из Кишинёва; пещерные монастырские пространства Орхейул Векь и Цыпова требуют удобной обуви и учёта рельефа. Не объединяйте далёкие точки без проверки времени в пути.",
          "Căpriana și Curchi pot fi vizitate într-o excursie separată din Chișinău; spațiile rupestre de la Orheiul Vechi și Țipova cer încălțăminte comodă și atenție la relief.",
          "Căpriana and Curchi work as separate trips from Chisinau; the cave monastic landscapes at Orheiul Vechi and Țipova require suitable footwear and awareness of the terrain.",
          "Кепріяна й Куркі підходять для окремої поїздки з Кишинева; печерні монастирські простори Орхейул Векь і Ципова потребують зручного взуття.",
          "Căpriana a Curchi se hodí na samostatné výlety z Kišiněva; jeskynní klášterní lokality Orheiul Vechi a Țipova vyžadují vhodnou obuv."
        ),
      },
      {
        title: l("Этикет", "Etichetă", "Etiquette", "Етикет", "Etiketa"),
        body: l(
          "Это действующие религиозные места. Выбирайте сдержанную одежду, говорите тихо, не снимайте людей и службы без разрешения и следуйте указаниям на месте.",
          "Sunt lăcașuri religioase active. Alege îmbrăcăminte decentă, vorbește încet, nu fotografia persoane sau slujbe fără permisiune și urmează indicațiile locale.",
          "These are active religious sites. Dress modestly, speak quietly, do not photograph people or services without permission, and follow local instructions.",
          "Це чинні релігійні місця. Обирайте стриманий одяг, говоріть тихо, не фотографуйте людей чи служби без дозволу.",
          "Jde o aktivní náboženská místa. Oblečte se střídmě, mluvte tiše, nefotografujte lidi ani obřady bez svolení a respektujte místní pokyny."
        ),
      },
    ],
    [commonSources.moldovaTravel]
  ),
  museums: page(
    "museums",
    "/guide/museums.webp",
    l("Музеи Кишинёва", "Muzeele Chișinăului", "Museums in Chisinau", "Музеї Кишинева", "Muzea v Kišiněvě"),
    l("Как выбрать музей и проверить актуальную информацию перед визитом.", "Cum să alegi un muzeu și să verifici informația actuală înainte de vizită.", "How to choose a museum and verify current visitor information.", "Як обрати музей і перевірити актуальну інформацію перед візитом.", "Jak vybrat muzeum a ověřit aktuální informace."),
    [
      {
        title: l("История, искусство и этнография", "Istorie, artă și etnografie", "History, art and ethnography", "Історія, мистецтво й етнографія", "Historie, umění a etnografie"),
        body: l(
          "Для истории страны выберите Национальный музей истории, для национального и европейского искусства — Национальный художественный музей. Этнографический музей знакомит с природой и культурой региона.",
          "Pentru istoria țării alege Muzeul Național de Istorie, iar pentru artă națională și universală — Muzeul Național de Artă. Muzeul de Etnografie prezintă natura și cultura regiunii.",
          "Choose the National Museum of History for the country’s history and the National Art Museum for Moldovan and international art. The ethnography museum introduces the region’s nature and culture.",
          "Для історії країни оберіть Національний музей історії, для національного та світового мистецтва — Національний художній музей. Етнографічний музей знайомить із природою й культурою регіону.",
          "Pro dějiny země zvolte Národní historické muzeum, pro moldavské a světové umění Národní muzeum umění. Etnografické muzeum představuje přírodu a kulturu regionu."
        ),
      },
      {
        title: l("Перед визитом", "Înainte de vizită", "Before visiting", "Перед візитом", "Před návštěvou"),
        body: l(
          "На этой странице намеренно нет переписанных часов и цен. Откройте официальный сайт в день визита: выставки, выходные, касса и условия съёмки меняются.",
          "Pagina nu copiază intenționat programul și prețurile. Deschide site-ul oficial în ziua vizitei: expozițiile, zilele libere, casa și regulile foto se schimbă.",
          "This page intentionally does not copy hours or prices. Open the official site on the day: exhibitions, closures, ticket desks and photography rules change.",
          "На сторінці навмисно немає переписаних годин і цін. Відкрийте офіційний сайт у день візиту: виставки, вихідні, каса й правила зйомки змінюються.",
          "Stránka záměrně nekopíruje otevírací dobu ani ceny. V den návštěvy otevřete oficiální web; výstavy, uzávěry i pravidla focení se mění."
        ),
      },
    ],
    [commonSources.historyMuseum, commonSources.artMuseum, commonSources.visitChisinau]
  ),
  wineries: page(
    "wineries",
    "/guide/wineries.webp",
    l("Винодельни Молдовы", "Vinăriile Moldovei", "Wineries of Moldova", "Виноробні Молдови", "Moldavská vinařství"),
    l("Как спланировать визит на винодельню без устаревших цен и расписаний.", "Cum să planifici o vizită la vinărie fără prețuri și programe învechite.", "How to plan a winery visit without relying on outdated prices or schedules.", "Як спланувати візит на виноробню без застарілих цін і розкладів.", "Jak naplánovat návštěvu vinařství bez zastaralých cen a časů."),
    [
      {
        title: l("Бронируйте напрямую", "Rezervă direct", "Book direct", "Бронюйте напряму", "Rezervujte přímo"),
        body: l(
          "Крикова, Милештий Мичь и другие винодельни предлагают разные форматы посещения. Выберите официальный сайт конкретной винодельни, подтвердите язык экскурсии, длительность, дегустацию и транспорт.",
          "Cricova, Mileștii Mici și alte vinării oferă formate diferite. Folosește site-ul oficial al vinăriei și confirmă limba turului, durata, degustarea și transportul.",
          "Cricova, Mileștii Mici and other wineries offer different visitor formats. Use the winery’s own website and confirm tour language, duration, tasting and transport.",
          "Крікова, Мілештій Міч та інші виноробні мають різні формати. Скористайтеся офіційним сайтом і підтвердьте мову екскурсії, тривалість, дегустацію та транспорт.",
          "Cricova, Mileștii Mici a další vinařství nabízejí různé formáty. Použijte oficiální web vinařství a potvrďte jazyk prohlídky, délku, degustaci a dopravu."
        ),
      },
      {
        title: l("Ответственное посещение", "Vizită responsabilă", "Visit responsibly", "Відповідальне відвідування", "Odpovědná návštěva"),
        body: l(
          "Не садитесь за руль после дегустации. Для детей, беременности, медицинских ограничений и безалкогольного формата заранее уточните доступные варианты у организатора.",
          "Nu conduce după degustare. Pentru copii, sarcină, restricții medicale sau format fără alcool, clarifică opțiunile cu organizatorul.",
          "Do not drive after tasting. Ask the organiser in advance about children, pregnancy, medical restrictions and alcohol-free options.",
          "Не сідайте за кермо після дегустації. Для дітей, вагітності, медичних обмежень і безалкогольного формату заздалегідь уточніть варіанти.",
          "Po degustaci neřiďte. Možnosti pro děti, těhotenství, zdravotní omezení a nealkoholický program ověřte předem."
        ),
      },
    ],
    [commonSources.moldovaTravel]
  ),
  attractions: page(
    "attractions",
    "/guide/attractions.webp",
    l("Что посмотреть в Кишинёве", "Ce să vezi în Chișinău", "What to see in Chisinau", "Що подивитися в Кишиневі", "Co vidět v Kišiněvě"),
    l("Ориентиры для первого знакомства с городом.", "Repere pentru prima întâlnire cu orașul.", "Landmarks for a first introduction to the city.", "Орієнтири для першого знайомства з містом.", "Místa pro první seznámení s městem."),
    [
      {
        title: l("Центр", "Centru", "City centre", "Центр", "Centrum"),
        body: l(
          "Начните с Соборного парка, Триумфальной арки и парка Штефана чел Маре, затем пройдите по улице 31 Августа 1989 к музеям. Все точки удобно объединить пешком.",
          "Începe cu Parcul Catedralei, Arcul de Triumf și Parcul Ștefan cel Mare, apoi mergi pe strada 31 August 1989 spre muzee. Obiectivele se leagă ușor pe jos.",
          "Start with Cathedral Park, the Triumphal Arch and Ștefan cel Mare Park, then follow 31 August 1989 Street towards the museums. The sights combine easily on foot.",
          "Почніть із Соборного парку, Тріумфальної арки та парку Штефана чел Маре, потім пройдіть вулицею 31 Серпня 1989 до музеїв.",
          "Začněte v Katedrálním parku, u Vítězného oblouku a v parku Ștefan cel Mare, poté pokračujte ulicí 31. srpna 1989 k muzeím."
        ),
        links: [{ slug: "walking-tours", label: l("Готовые пешие маршруты", "Trasee pietonale gata", "Ready-made walking routes", "Готові піші маршрути", "Hotové pěší trasy") }],
      },
      {
        title: l("Парки и районы", "Parcuri și cartiere", "Parks and neighbourhoods", "Парки й райони", "Parky a čtvrti"),
        body: l(
          "Для более спокойной части дня выберите Валя Морилор или Дендрарий. Днём можно дополнить прогулку пешеходной улицей Евгения Доги и центральными кафе.",
          "Pentru o parte mai liniștită a zilei alege Valea Morilor sau Dendrariul. Completează plimbarea cu strada pietonală Eugen Doga și cafenelele centrale.",
          "For a quieter part of the day choose Valea Morilor or the Dendrarium. Add Eugen Doga pedestrian street and central cafés.",
          "Для спокійнішої частини дня оберіть Валя Морілор або Дендрарій. Додайте пішохідну вулицю Євгена Доги та центральні кафе.",
          "Pro klidnější část dne zvolte Valea Morilor nebo dendrárium. Přidejte pěší ulici Eugena Dogy a kavárny v centru."
        ),
      },
    ],
    [commonSources.visitChisinau, commonSources.moldovaTravel]
  ),
  restaurants: page(
    "restaurants",
    "/guide/restaurants.webp",
    l("Рестораны и местная кухня", "Restaurante și bucătărie locală", "Restaurants and local food", "Ресторани й місцева кухня", "Restaurace a místní kuchyně"),
    l("Что попробовать и как выбрать место без рекламного рейтинга.", "Ce să încerci și cum să alegi un local fără clasamente publicitare.", "What to try and how to choose a place without an advertising ranking.", "Що скуштувати та як обрати місце без рекламного рейтингу.", "Co ochutnat a jak vybrat podnik bez reklamního žebříčku."),
    [
      {
        title: l("Что попробовать", "Ce să încerci", "What to try", "Що скуштувати", "Co ochutnat"),
        body: l(
          "В меню ищите мамалыгу, плацинды, заму, голубцы и блюда из сезонных овощей. Названия и рецепты различаются, поэтому спрашивайте состав и размер порции.",
          "Caută în meniu mămăligă, plăcinte, zeamă, sarmale și preparate din legume de sezon. Rețetele diferă, așa că întreabă despre ingrediente și porție.",
          "Look for mămăligă, plăcinte, zeamă, sarmale and seasonal vegetable dishes. Recipes vary, so ask about ingredients and portion size.",
          "Шукайте в меню мамалигу, плацинди, заму, голубці та сезонні овочеві страви. Рецепти різняться, тож запитайте про склад і порцію.",
          "Hledejte mămăligu, plăcinte, polévku zeamă, sarmale a sezonní zeleninová jídla. Recepty se liší, ptejte se na složení a velikost porce."
        ),
      },
      {
        title: l("Как выбрать", "Cum alegi", "How to choose", "Як обрати", "Jak vybrat"),
        body: l(
          "Проверяйте свежие отзывы, актуальное меню на официальной странице и возможность бронирования. При аллергии сообщите о ней до заказа; перевод названия блюда не гарантирует одинаковый состав.",
          "Verifică recenziile recente, meniul actual pe pagina oficială și posibilitatea rezervării. În caz de alergii, anunță înainte de comandă.",
          "Check recent reviews, the current menu on the venue’s own page and booking options. Tell staff about allergies before ordering; translated dish names do not guarantee identical ingredients.",
          "Перевіряйте свіжі відгуки, актуальне меню на офіційній сторінці та бронювання. Про алергію повідомте до замовлення.",
          "Ověřte čerstvé recenze, aktuální menu na stránce podniku a možnost rezervace. Na alergii upozorněte před objednáním."
        ),
      },
    ],
    [commonSources.visitChisinau, commonSources.moldovaTravel]
  ),
};

export const guideCards = guideSlugs.map((slug) => ({
  slug,
  image: guidePages[slug].image,
  title: guidePages[slug].title,
  description: guidePages[slug].description,
}));

export function guidePath(slug: GuideSlug) {
  return slug === "events" ? "/events" : `/guide/${slug}`;
}
