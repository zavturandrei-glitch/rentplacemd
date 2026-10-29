import type { ChisinauEvent } from "@/lib/events";
import type { Language } from "@/locales/translations";

const notices = {
  ru: { cancelled: "Отменено", postponed: "Перенесено: новая дата уточняется", moved: "Новая дата. Ранее:", sold: "Билеты распроданы" },
  ro: { cancelled: "Anulat", postponed: "Amânat: noua dată urmează", moved: "Dată nouă. Anterior:", sold: "Bilete epuizate" },
  en: { cancelled: "Cancelled", postponed: "Postponed: new date to be announced", moved: "Rescheduled. Previously:", sold: "Sold out" },
  uk: { cancelled: "Скасовано", postponed: "Перенесено: нова дата уточнюється", moved: "Нова дата. Раніше:", sold: "Квитки розпродано" },
  cs: { cancelled: "Zrušeno", postponed: "Odloženo: nový termín bude oznámen", moved: "Nový termín. Původně:", sold: "Vyprodáno" },
};

export default function EventNotice({ event, language }: { event: ChisinauEvent; language: Language }) {
  const ui = notices[language];
  const message = event.status === "cancelled" ? ui.cancelled : event.status === "postponed" ? ui.postponed
    : event.status === "sold-out" ? ui.sold : event.previousStartDate ? `${ui.moved} ${event.previousStartDate}` : null;
  return message ? <p className="my-3 rounded-xl bg-amber-100 p-3 text-sm font-semibold text-amber-950" role="status">{message}</p> : null;
}
