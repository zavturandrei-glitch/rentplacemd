import type { Language } from "@/locales/translations";

const amenityTranslations: Record<
  string,
  Partial<Record<Exclude<Language, "ru">, string>>
> = {
  "1 большая комната + кухня": { ro: "1 cameră mare + bucătărie", en: "1 large room + kitchen", uk: "1 велика кімната + кухня", cs: "1 velký pokoj + kuchyně" },
  "2 двуспальные кровати": { ro: "2 paturi duble", en: "2 double beds", uk: "2 двоспальні ліжка", cs: "2 manželské postele" },
  "Автономное отопление": { ro: "Încălzire autonomă", en: "Independent heating", uk: "Автономне опалення", cs: "Vlastní vytápění" },
  "Большая двуспальная кровать": { ro: "Pat dublu mare", en: "Large double bed", uk: "Велике двоспальне ліжко", cs: "Velká manželská postel" },
  "Варочная поверхность": { ro: "Plită", en: "Cooktop", uk: "Варильна поверхня", cs: "Varná deska" },
  "Вид в сторону Дендрария": { ro: "Vedere spre Dendrariu", en: "View towards Dendrarium Park", uk: "Вид у бік Дендрарію", cs: "Výhled směrem k parku Dendrarium" },
  "Вид во двор": { ro: "Vedere spre curte", en: "Courtyard view", uk: "Вид у двір", cs: "Výhled do dvora" },
  "Гардеробная": { ro: "Dressing", en: "Walk-in wardrobe", uk: "Гардеробна", cs: "Šatna" },
  "Гель для душа": { ro: "Gel de duș", en: "Shower gel", uk: "Гель для душу", cs: "Sprchový gel" },
  "Двухэтажное здание": { ro: "Clădire cu două niveluri", en: "Two-storey building", uk: "Двоповерхова будівля", cs: "Dvoupodlažní budova" },
  "Духовка": { ro: "Cuptor", en: "Oven", uk: "Духова шафа", cs: "Trouba" },
  "Душевая кабина": { ro: "Cabină de duș", en: "Shower cabin", uk: "Душова кабіна", cs: "Sprchový kout" },
  "Заселение 24/7": { ro: "Cazare 24/7", en: "24/7 check-in", uk: "Заселення 24/7", cs: "Ubytování 24/7" },
  "Кондиционер": { ro: "Aer condiționat", en: "Air conditioning", uk: "Кондиціонер", cs: "Klimatizace" },
  "Кофемашина": { ro: "Aparat de cafea", en: "Coffee machine", uk: "Кавомашина", cs: "Kávovar" },
  "Кухонные принадлежности": { ro: "Ustensile de bucătărie", en: "Kitchen utensils", uk: "Кухонне приладдя", cs: "Kuchyňské potřeby" },
  "Микроволновая печь": { ro: "Cuptor cu microunde", en: "Microwave", uk: "Мікрохвильова піч", cs: "Mikrovlnná trouba" },
  "Мини-кухня": { ro: "Chicinetă", en: "Kitchenette", uk: "Мінікухня", cs: "Kuchyňský kout" },
  "Новый современный интерьер": { ro: "Interior modern nou", en: "New modern interior", uk: "Новий сучасний інтер’єр", cs: "Nový moderní interiér" },
  "Обеденный стол": { ro: "Masă de sufragerie", en: "Dining table", uk: "Обідній стіл", cs: "Jídelní stůl" },
  "Оборудованная кухня": { ro: "Bucătărie utilată", en: "Equipped kitchen", uk: "Обладнана кухня", cs: "Vybavená kuchyně" },
  "Отдельная гостиная": { ro: "Living separat", en: "Separate living room", uk: "Окрема вітальня", cs: "Samostatný obývací pokoj" },
  "Отдельная спальня": { ro: "Dormitor separat", en: "Separate bedroom", uk: "Окрема спальня", cs: "Samostatná ložnice" },
  "Отдельный апартамент": { ro: "Apartament separat", en: "Private apartment", uk: "Окремий апартамент", cs: "Samostatný apartmán" },
  "Подготовлен для посуточного проживания": { ro: "Pregătit pentru cazare pe termen scurt", en: "Prepared for short stays", uk: "Підготовлено для подобового проживання", cs: "Připraveno pro krátkodobé pobyty" },
  "Полностью оборудованная кухня": { ro: "Bucătărie complet utilată", en: "Fully equipped kitchen", uk: "Повністю обладнана кухня", cs: "Plně vybavená kuchyně" },
  "Полный набор кухонной посуды": { ro: "Set complet de veselă", en: "Full set of cookware", uk: "Повний набір кухонного посуду", cs: "Kompletní sada nádobí" },
  "Полотенца": { ro: "Prosoape", en: "Towels", uk: "Рушники", cs: "Ručníky" },
  "Посуда": { ro: "Veselă", en: "Cookware", uk: "Посуд", cs: "Nádobí" },
  "Раскладное спальное место": { ro: "Loc de dormit extensibil", en: "Convertible sleeping place", uk: "Розкладне спальне місце", cs: "Rozkládací lůžko" },
  "Роллеты": { ro: "Rulouri", en: "Window blinds", uk: "Ролети", cs: "Rolety" },
  "Современная душевая": { ro: "Duș modern", en: "Modern shower", uk: "Сучасна душова", cs: "Moderní sprcha" },
  "Современный евроремонт": { ro: "Renovare modernă", en: "Modern renovation", uk: "Сучасний євроремонт", cs: "Moderní rekonstrukce" },
  "Современный новострой": { ro: "Bloc nou modern", en: "Modern new-build", uk: "Сучасна новобудова", cs: "Moderní novostavba" },
  "Телевизор": { ro: "Televizor", en: "Television", uk: "Телевізор", cs: "Televize" },
  "Фен": { ro: "Uscător de păr", en: "Hair dryer", uk: "Фен", cs: "Fén" },
  "Холодильник": { ro: "Frigider", en: "Refrigerator", uk: "Холодильник", cs: "Lednice" },
  "Чистое постельное бельё": { ro: "Lenjerie de pat curată", en: "Clean bed linen", uk: "Чиста постільна білизна", cs: "Čisté ložní prádlo" },
  "Шампунь": { ro: "Șampon", en: "Shampoo", uk: "Шампунь", cs: "Šampon" },
  "Электрический чайник": { ro: "Fierbător electric", en: "Electric kettle", uk: "Електричний чайник", cs: "Rychlovarná konvice" },
  "Электрочайник": { ro: "Fierbător electric", en: "Electric kettle", uk: "Електрочайник", cs: "Rychlovarná konvice" },
};

export function localizeAmenity(value: string, language: Language) {
  if (language === "ru" || value === "Wi-Fi" || value === "Smart TV") {
    return value;
  }

  return amenityTranslations[value]?.[language] ?? value;
}
