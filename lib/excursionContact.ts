import type { Language } from "@/locales/translations";
import { excursionLabel, l, type Excursion } from "./excursions";

export const excursionContact = {
  question: l("Задать вопрос о маршруте", "Întreabă despre traseu", "Ask about this route", "Запитати про маршрут", "Zeptat se na trasu"),
  note: l("Информационный маршрут. Организация, программа, цена и доступность пока не подтверждены.", "Traseu informativ. Organizarea, programul, prețul și disponibilitatea nu sunt confirmate.", "Informational route. Organisation, programme, price and availability are not confirmed.", "Інформаційний маршрут. Організація, програма, ціна й доступність поки не підтверджені.", "Informační trasa. Organizace, program, cena a dostupnost nejsou potvrzeny."),
  message: l("Здравствуйте! Подскажите, что можно уточнить по маршруту", "Bună ziua! Ce informații puteți oferi despre traseul", "Hello! What information can you provide about route", "Вітаю! Що можна уточнити щодо маршруту", "Dobrý den! Jaké informace můžete poskytnout o trase"),
};

export function excursionInquiry(route: Excursion, language: Language) {
  return `${excursionContact.message[language]} ${excursionLabel(route, language)}?\n${excursionContact.note[language]}`;
}

export function excursionInquiryUrl(route: Excursion, language: Language) {
  return `https://wa.me/37369990190?text=${encodeURIComponent(excursionInquiry(route, language))}`;
}
