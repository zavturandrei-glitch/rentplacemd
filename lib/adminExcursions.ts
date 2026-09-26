import "server-only";
import { requireAdmin } from "@/lib/adminAuth";

type Reference = { name: string; url: string; note: string; kind: "Исполнитель / посещение" | "Источник фактов / поиск исполнителя" };
const reference = (name: string, url: string, note: string, kind: Reference["kind"] = "Исполнитель / посещение"): Reference => ({ name, url, note, kind });
const cricova = reference("Cricova", "https://cricova.md/en/excursii", "Проверить программы, язык, слоты и дегустацию. Цена и условия — уточнить.");
const orhei = reference("Orheiul Vechi", "https://orheiulvechi.com/en/tourism/", "Доступ в заповедник, посещение и контакты. Сопровождение и условия — уточнить.");
const tourism = reference("Moldova Travel", "https://moldova.travel/en/", "Туристические сведения и контакты для дальнейшего поиска. Исполнителя, программу и условия — уточнить.", "Источник фактов / поиск исполнителя");
const references: Record<string, Reference[]> = {
  orhei: [orhei, tourism],
  cricova: [cricova],
  milestii: [reference("Mileștii Mici", "https://milestii-mici.md/en/tourist-spots/underground-galleries.html", "Подземные галереи, транспорт, язык и запись. Цена и условия — уточнить.")],
  city: [reference("Visit Chișinău", "https://visit.chisinau.md/en/", "Места в городе, туристическая информация и контакты гидов. Конкретного исполнителя и условия — уточнить.", "Источник фактов / поиск исполнителя"), tourism],
  combined: [orhei, cricova, tourism],
  gagauzia: [reference("Moldova Travel · юг", "https://moldova.travel/en/south-of-moldova/", "Комрат, Бешалма и региональные контакты. Музей, язык сопровождения и исполнителя — уточнить.", "Источник фактов / поиск исполнителя")],
  soroca: [reference("Moldova Travel · север", "https://moldova.travel/en/north-of-moldova/", "Сорока, крепость и региональные контакты. Доступ и исполнителя — уточнить.", "Источник фактов / поиск исполнителя")],
  monasteries: [tourism],
  mimi: [reference("Castel Mimi", "https://castelmimi.md/en/wine-tours/", "Визиты, язык, дегустация и режим в дни мероприятий. Цена и условия — уточнить."), reference("Purcari · связанный винный гид", "https://purcariwineries.com/en/", "Источник из связанного гида о Purcari; это другое место, не исполнитель маршрута Castel Mimi. Условия — уточнить.", "Источник фактов / поиск исполнителя")],
};

// Both the module boundary and the data accessor enforce privacy.
export async function getAdminExcursionReferences() {
  if (!(await requireAdmin())) return null;
  return references;
}
