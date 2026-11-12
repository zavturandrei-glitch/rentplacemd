import type { Language } from "@/locales/translations";
import type { LocalizedApartmentSeo } from "./apartmentLocalization";

const copy = {
  ru: [
    "Крянгэ 5/2 — квартира Премиум у Дендрария",
    "Однокомнатная квартира",
    "Буюканы",
    "Однокомнатная квартира на Буюканах в Кишинёве: 35 м², до двух гостей, бесплатная парковка. 1000 MDL за сутки.",
    "Квартира находится на шестом этаже современного жилого дома с лифтом. Здесь новый евроремонт, качественная современная мебель и одна двуспальная кровать.",
    "Есть кондиционер, автономное отопление, Wi-Fi, Smart TV с YouTube и стиральная машина. На кухне — холодильник, газовая плита, микроволновая печь и электрочайник.",
    "Гостям доступны застеклённый балкон, бесплатная парковка, постельное бельё, полотенца, фен и утюг.",
    "Рядом парк Дендрарий, магазины, рынок и остановки. На общественном транспорте удобно добираться до проспекта Штефана чел Маре и центра Кишинёва.",
    "Wi-Fi|Кондиционер|Автономное отопление|Двуспальная кровать|Smart TV с YouTube|Стиральная машина|Холодильник|Газовая плита|Микроволновая печь|Электрочайник|Застеклённый балкон|Лифт|Бесплатная парковка|Постельное бельё и полотенца|Фен|Утюг",
    "Спальня с двуспальной кроватью|Спальня, вид со стороны кровати|Кухня с обеденным столом|Прихожая|Застеклённый балкон|Лифт",
  ],
  ro: [
    "Ion Creangă 5/2 — apartament Premium lângă Parcul Dendrariu",
    "Apartament cu o cameră",
    "Buiucani",
    "Apartament cu o cameră în sectorul Buiucani, Chișinău: 35 m², până la doi oaspeți și parcare gratuită. 1000 MDL pe noapte.",
    "Apartamentul se află la etajul șase al unui bloc nou cu lift. Este recent renovat, cu mobilier modern de calitate și un pat dublu.",
    "Are aer condiționat, încălzire autonomă, Wi-Fi, Smart TV cu YouTube și mașină de spălat. Bucătăria este dotată cu frigider, plită pe gaz, cuptor cu microunde și fierbător electric.",
    "Oaspeții au la dispoziție un balcon închis, parcare gratuită, lenjerie de pat, prosoape, uscător de păr și fier de călcat.",
    "În apropiere se află Parcul Dendrariu, magazine, piață și stații de transport public, cu acces spre bulevardul Ștefan cel Mare și centrul Chișinăului.",
    "Wi-Fi|Aer condiționat|Încălzire autonomă|Pat dublu|Smart TV cu YouTube|Mașină de spălat|Frigider|Plită pe gaz|Cuptor cu microunde|Fierbător electric|Balcon închis|Lift|Parcare gratuită|Lenjerie de pat și prosoape|Uscător de păr|Fier de călcat",
    "Dormitor cu pat dublu|Dormitor văzut dinspre pat|Bucătărie cu masă|Hol|Balcon închis|Lift",
  ],
  en: [
    "Ion Creangă 5/2 — premium apartment near Dendrarium Park",
    "One-room apartment",
    "Buiucani",
    "One-room apartment in Buiucani, Chișinău: 35 m², sleeps two, with free parking. 1,000 MDL per night.",
    "The apartment is on the sixth floor of a modern building with a lift. It has been newly renovated and has contemporary furniture and one double bed.",
    "There is air conditioning, independent heating, Wi-Fi, a smart TV with YouTube and a washing machine. The kitchen has a fridge, gas hob, microwave and electric kettle.",
    "Guests have an enclosed balcony, free parking, bed linen, towels, a hairdryer and an iron.",
    "Dendrarium Park, shops, a market and public transport stops are nearby. Public transport connects the area with Ștefan cel Mare Boulevard and central Chișinău.",
    "Wi-Fi|Air conditioning|Independent heating|Double bed|Smart TV with YouTube|Washing machine|Fridge|Gas hob|Microwave|Electric kettle|Enclosed balcony|Lift|Free parking|Bed linen and towels|Hairdryer|Iron",
    "Bedroom with a double bed|Bedroom viewed from beside the bed|Kitchen with a dining table|Entrance hall|Enclosed balcony|Lift",
  ],
  uk: [
    "Крянге 5/2 — квартира Преміум біля Дендрарію",
    "Однокімнатна квартира",
    "Буюкани",
    "Однокімнатна квартира в районі Буюкани в Кишиневі: 35 м², до двох гостей, безплатне паркування. 1000 MDL за добу.",
    "Квартира розташована на шостому поверсі нового будинку з ліфтом. Тут свіжий ремонт, якісні сучасні меблі та одне двоспальне ліжко.",
    "Є кондиціонер, автономне опалення, Wi-Fi, Smart TV з YouTube і пральна машина. На кухні є холодильник, газова плита, мікрохвильова піч і електрочайник.",
    "До послуг гостей засклений балкон, безплатне паркування, постільна білизна, рушники, фен і праска.",
    "Поруч Дендрарій, магазини, ринок і зупинки громадського транспорту. Звідси зручно дістатися до проспекту Штефана чел Маре та центру Кишинева.",
    "Wi-Fi|Кондиціонер|Автономне опалення|Двоспальне ліжко|Smart TV з YouTube|Пральна машина|Холодильник|Газова плита|Мікрохвильова піч|Електрочайник|Засклений балкон|Ліфт|Безплатне паркування|Постільна білизна й рушники|Фен|Праска",
    "Спальня з двоспальним ліжком|Спальня, вид із боку ліжка|Кухня з обіднім столом|Передпокій|Засклений балкон|Ліфт",
  ],
  cs: [
    "Ion Creangă 5/2 — prémiový apartmán u parku Dendrariu",
    "Jednopokojový apartmán",
    "Buiucani",
    "Jednopokojový apartmán ve čtvrti Buiucani v Kišiněvě: 35 m², až pro dva hosty, parkování zdarma. 1000 MDL za noc.",
    "Apartmán je v šestém patře nového domu s výtahem. Je čerstvě zrekonstruovaný a vybavený moderním kvalitním nábytkem a jednou manželskou postelí.",
    "K vybavení patří klimatizace, vlastní vytápění, Wi-Fi, chytrá televize s YouTube a pračka. V kuchyni je lednice, plynová varná deska, mikrovlnná trouba a rychlovarná konvice.",
    "Hosté mají k dispozici zasklený balkon, parkování zdarma, ložní prádlo, ručníky, fén a žehličku.",
    "Nedaleko je park Dendrariu, obchody, tržnice a zastávky městské dopravy. Spojení vede k bulváru Ștefan cel Mare i do centra Kišiněva.",
    "Wi-Fi|Klimatizace|Vlastní vytápění|Manželská postel|Chytrá TV s YouTube|Pračka|Lednice|Plynová varná deska|Mikrovlnná trouba|Rychlovarná konvice|Zasklený balkon|Výtah|Parkování zdarma|Ložní prádlo a ručníky|Fén|Žehlička",
    "Ložnice s manželskou postelí|Ložnice z pohledu od postele|Kuchyň s jídelním stolem|Předsíň|Zasklený balkon|Výtah",
  ],
} as const satisfies Record<Language, readonly string[]>;

export const creangaLocalizations = Object.fromEntries(
  Object.entries(copy).map(([language, entry]) => {
    const [title, typeLabel, district, description, interior, equipment, extras, nearby, amenities, photos] = entry;
    const imageAlts = photos.split("|").map((photo) => `${photo} · Ion Creangă 5/2`);
    return [language, {
      displayAddress: `Ion Creangă 5/2 · ${district} · Chișinău`,
      title,
      description,
      imageAlt: imageAlts[0],
      imageAlts,
      schemaName: title,
      shortDescription: description,
      layoutDescription: district,
      typeLabel,
      aboutTitle: title,
      features: amenities.split("|"),
      descriptionParagraphs: [description, interior, equipment, extras, nearby],
    } satisfies LocalizedApartmentSeo];
  }),
) as Record<Language, LocalizedApartmentSeo>;
