import type { Language } from "@/locales/translations";

type CenterApartmentsCopy = {
  metaTitle: string;
  metaDescription: string;
  breadcrumbHome: string;
  breadcrumbApartments: string;
  breadcrumbCenter: string;
  eyebrow: string;
  title: string;
  intro: string;
  inventoryTitle: string;
  inventorySummary: (count: number) => string;
  allApartments: string;
  districtBlockTitle: string;
  districtBlockText: (count: number) => string;
  districtBlockLink: string;
  homeTitle: string;
  homeText: (count: number) => string;
  homeLink: string;
  apartmentLink: string;
};

export const centerApartmentsContent: Record<Language, CenterApartmentsCopy> = {
  ru: {
    metaTitle: "Квартиры посуточно в центре Кишинёва — цены",
    metaDescription: "Квартиры посуточно в центре Кишинёва: реальные фотографии, актуальные цены, адреса и вместимость. Сравните варианты и отправьте запрос на бронирование.",
    breadcrumbHome: "Главная",
    breadcrumbApartments: "Квартиры",
    breadcrumbCenter: "Центр Кишинёва",
    eyebrow: "Подборка по локации",
    title: "Квартиры посуточно в центре Кишинёва",
    intro: "В этой подборке показаны квартиры RentPlaceMD по подтверждённым центральным адресам Кишинёва. Сравните стоимость аренды на сутки, реальные фотографии, планировку и указанную вместимость. В карточке каждого объекта опубликован точный адрес, характеристики и календарь доступности. Подборка подходит тем, кто хочет снять квартиру в центре для короткой поездки, командировки или более продолжительного проживания. Выберите апартаменты и свяжитесь напрямую с администратором, чтобы уточнить даты и отправить запрос на бронирование.",
    inventoryTitle: "Квартиры в центре: фото, адреса и цены",
    inventorySummary: (count) => `В подборке ${count} активных квартир по адресам, которые подтверждены данными RentPlaceMD как центральные. Цена и вместимость указаны отдельно для каждого объекта.`,
    allApartments: "Смотреть весь каталог квартир",
    districtBlockTitle: "Квартиры по районам Кишинёва",
    districtBlockText: (count) => `Для центра доступна отдельная подборка из ${count} квартир с реальными фото, ценами и адресами. Другие районы появятся только при достаточном подтверждённом инвентаре.`,
    districtBlockLink: "Квартиры посуточно в центре Кишинёва",
    homeTitle: "Ищете квартиру в центре Кишинёва?",
    homeText: (count) => `Откройте отдельную подборку из ${count} квартир по подтверждённым центральным адресам.`,
    homeLink: "Выбрать квартиру в центре",
    apartmentLink: "Другие квартиры в центре Кишинёва",
  },
  ro: {
    metaTitle: "Apartamente în regim hotelier în centrul Chișinăului — prețuri",
    metaDescription: "Apartamente în regim hotelier în centrul Chișinăului, cu fotografii reale, prețuri actuale, adrese și capacitate. Comparați opțiunile și trimiteți o solicitare.",
    breadcrumbHome: "Acasă",
    breadcrumbApartments: "Apartamente",
    breadcrumbCenter: "Centrul Chișinăului",
    eyebrow: "Selecție după zonă",
    title: "Apartamente în regim hotelier în centrul Chișinăului",
    intro: "Această selecție prezintă apartamente RentPlaceMD la adrese centrale confirmate din Chișinău. Comparați tariful pe noapte, fotografiile reale, compartimentarea și capacitatea indicată. Pagina fiecărui apartament include adresa exactă, dotările și calendarul disponibilității. Selecția este utilă pentru o vizită scurtă, o călătorie de afaceri sau o ședere mai lungă în centru. Alegeți apartamentul potrivit și contactați direct administratorul pentru a confirma datele și a trimite solicitarea de rezervare.",
    inventoryTitle: "Apartamente în centru: fotografii, adrese și prețuri",
    inventorySummary: (count) => `Selecția include ${count} de apartamente active la adrese centrale confirmate în datele RentPlaceMD. Prețul și capacitatea sunt afișate separat pentru fiecare opțiune.`,
    allApartments: "Vezi întregul catalog",
    districtBlockTitle: "Apartamente după zonele Chișinăului",
    districtBlockText: (count) => `Pentru centru este disponibilă o selecție separată cu ${count} de apartamente, fotografii reale, prețuri și adrese. Alte zone vor fi publicate doar când există suficient inventar confirmat.`,
    districtBlockLink: "Apartamente în centrul Chișinăului",
    homeTitle: "Căutați un apartament în centrul Chișinăului?",
    homeText: (count) => `Descoperiți selecția separată cu ${count} de apartamente la adrese centrale confirmate.`,
    homeLink: "Alege un apartament în centru",
    apartmentLink: "Alte apartamente în centrul Chișinăului",
  },
  en: {
    metaTitle: "Short-stay apartments in central Chisinau — prices",
    metaDescription: "Short-stay apartments in central Chisinau with real photos, current prices, addresses and guest capacity. Compare properties and send a booking request.",
    breadcrumbHome: "Home",
    breadcrumbApartments: "Apartments",
    breadcrumbCenter: "Central Chisinau",
    eyebrow: "Location collection",
    title: "Short-stay apartments in central Chisinau",
    intro: "This collection shows RentPlaceMD apartments at confirmed central Chisinau addresses. Compare nightly prices, real photographs, layouts and stated guest capacity. Each property page provides the exact address, apartment features and an availability calendar. The collection is useful for a short city visit, a business trip or a longer stay in the centre. Choose a suitable apartment and contact the administrator directly to confirm your dates and send a booking request.",
    inventoryTitle: "Central apartments: photos, addresses and prices",
    inventorySummary: (count) => `The collection contains ${count} active apartments at addresses confirmed as central in RentPlaceMD data. Price and capacity are shown separately for every property.`,
    allApartments: "View the full apartment catalogue",
    districtBlockTitle: "Apartments by Chisinau area",
    districtBlockText: (count) => `A dedicated central collection contains ${count} apartments with real photos, prices and addresses. Other areas will be published only when enough inventory is confirmed.`,
    districtBlockLink: "Short-stay apartments in central Chisinau",
    homeTitle: "Looking for an apartment in central Chisinau?",
    homeText: (count) => `Explore a dedicated collection of ${count} apartments at confirmed central addresses.`,
    homeLink: "Choose a central apartment",
    apartmentLink: "Other apartments in central Chisinau",
  },
  uk: {
    metaTitle: "Квартири подобово в центрі Кишинева — ціни",
    metaDescription: "Квартири подобово в центрі Кишинева: реальні фотографії, актуальні ціни, адреси й місткість. Порівняйте варіанти та надішліть запит на бронювання.",
    breadcrumbHome: "Головна",
    breadcrumbApartments: "Квартири",
    breadcrumbCenter: "Центр Кишинева",
    eyebrow: "Добірка за локацією",
    title: "Квартири подобово в центрі Кишинева",
    intro: "У цій добірці представлені квартири RentPlaceMD за підтвердженими центральними адресами Кишинева. Порівнюйте ціну оренди за добу, реальні фотографії, планування та зазначену місткість. На сторінці кожного об’єкта є точна адреса, характеристики й календар доступності. Добірка стане у пригоді для короткої поїздки, відрядження або тривалішого проживання в центрі. Виберіть квартиру та зв’яжіться безпосередньо з адміністратором, щоб підтвердити дати й надіслати запит на бронювання.",
    inventoryTitle: "Квартири в центрі: фото, адреси та ціни",
    inventorySummary: (count) => `У добірці ${count} активних квартир за адресами, підтвердженими даними RentPlaceMD як центральні. Ціну та місткість указано окремо для кожного об’єкта.`,
    allApartments: "Переглянути весь каталог квартир",
    districtBlockTitle: "Квартири за районами Кишинева",
    districtBlockText: (count) => `Для центру доступна окрема добірка з ${count} квартир із реальними фото, цінами й адресами. Інші райони з’являться лише за достатнього підтвердженого інвентарю.`,
    districtBlockLink: "Квартири подобово в центрі Кишинева",
    homeTitle: "Шукаєте квартиру в центрі Кишинева?",
    homeText: (count) => `Відкрийте окрему добірку з ${count} квартир за підтвердженими центральними адресами.`,
    homeLink: "Вибрати квартиру в центрі",
    apartmentLink: "Інші квартири в центрі Кишинева",
  },
  cs: {
    metaTitle: "Krátkodobé pronájmy v centru Kišiněva — ceny",
    metaDescription: "Krátkodobé pronájmy v centru Kišiněva se skutečnými fotografiemi, aktuálními cenami, adresami a kapacitou. Porovnejte nabídky a odešlete poptávku.",
    breadcrumbHome: "Domů",
    breadcrumbApartments: "Apartmány",
    breadcrumbCenter: "Centrum Kišiněva",
    eyebrow: "Výběr podle lokality",
    title: "Krátkodobé pronájmy apartmánů v centru Kišiněva",
    intro: "Tento výběr obsahuje apartmány RentPlaceMD na potvrzených adresách v centru Kišiněva. Porovnejte cenu za noc, skutečné fotografie, dispozici a uvedenou kapacitu. Stránka každého apartmánu nabízí přesnou adresu, vybavení a kalendář dostupnosti. Výběr je vhodný pro krátkou návštěvu města, služební cestu i delší pobyt v centru. Zvolte si apartmán a kontaktujte přímo správce, který potvrdí termín a přijme žádost o rezervaci.",
    inventoryTitle: "Apartmány v centru: fotografie, adresy a ceny",
    inventorySummary: (count) => `Výběr obsahuje ${count} aktivních apartmánů na adresách potvrzených v datech RentPlaceMD jako centrální. Cena a kapacita jsou uvedeny u každé nabídky.`,
    allApartments: "Zobrazit celý katalog",
    districtBlockTitle: "Apartmány podle částí Kišiněva",
    districtBlockText: (count) => `Pro centrum je dostupný samostatný výběr ${count} apartmánů se skutečnými fotografiemi, cenami a adresami. Další části zveřejníme jen s dostatkem potvrzených nabídek.`,
    districtBlockLink: "Krátkodobé pronájmy v centru Kišiněva",
    homeTitle: "Hledáte apartmán v centru Kišiněva?",
    homeText: (count) => `Prohlédněte si samostatný výběr ${count} apartmánů na potvrzených centrálních adresách.`,
    homeLink: "Vybrat apartmán v centru",
    apartmentLink: "Další apartmány v centru Kišiněva",
  },
};
