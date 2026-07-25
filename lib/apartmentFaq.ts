import type { Language } from "@/locales/translations";

export const apartmentFaqByLanguage: Record<
  Language,
  Array<{ question: string; answer: string }>
> = {
  ru: [
    {
      question: "Можно ли заказать трансфер?",
      answer: "Да, трансфер из аэропорта Кишинёва до квартиры можно согласовать заранее.",
    },
  ],
  ro: [
    {
      question: "Se poate comanda transfer?",
      answer: "Da, transferul de la aeroportul Chișinău la apartament poate fi stabilit în avans.",
    },
  ],
  en: [
    {
      question: "Can I book an airport transfer?",
      answer: "Yes, a transfer from Chisinau Airport to the apartment can be arranged in advance.",
    },
  ],
  uk: [
    {
      question: "Чи можна замовити трансфер?",
      answer: "Так, трансфер з аеропорту Кишинева до квартири можна погодити заздалегідь.",
    },
  ],
  cs: [
    {
      question: "Lze objednat transfer?",
      answer: "Ano, transfer z letiště Kišiněv k apartmánu lze domluvit předem.",
    },
  ],
};
