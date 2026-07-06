"use client";

import { useLanguage } from "@/context/LanguageContext";

type AfterCatalogText = {
  trustTitle: string;
  trustText: string;
  trustItems: Array<{ icon: string; title: string; text: string }>;
  faqTitle: string;
  faq: Array<{ question: string; answer: string }>;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  whatsappText: string;
};

const afterCatalogText: Record<string, AfterCatalogText> = {
  ru: {
    trustTitle: "RentPlaceMD — квартиры, которым можно доверять",
    trustText:
      "Мы показываем реальные фотографии, быстро отвечаем в мессенджерах и помогаем подобрать квартиру под даты, количество гостей и бюджет.",
    trustItems: [
      {
        icon: "36",
        title: "36 квартир в одном комплексе",
        text: "Легко подобрать вариант рядом с нужной квартирой или для группы гостей.",
      },
      {
        icon: "Фото",
        title: "Реальные фотографии",
        text: "На сайте показаны настоящие фото квартир без фейковых интерьеров.",
      },
      {
        icon: "5 мин",
        title: "Ответ за несколько минут",
        text: "WhatsApp, Viber, Telegram и телефон всегда под рукой.",
      },
      {
        icon: "24/7",
        title: "Заселение по договорённости",
        text: "Можно согласовать удобное время заезда заранее.",
      },
    ],
    faqTitle: "Частые вопросы",
    faq: [
      {
        question: "Во сколько заселение и выезд?",
        answer:
          "Стандартное заселение — после 14:00, выезд — до 12:00. Другое время можно согласовать заранее.",
      },
      {
        question: "Можно заселиться ночью?",
        answer:
          "Да, заселение возможно 24/7 по предварительной договорённости.",
      },
      {
        question: "Как уточнить свободные даты?",
        answer:
          "Напишите нам в WhatsApp, Viber или Telegram — мы быстро проверим доступные квартиры.",
      },
      {
        question: "Фотографии настоящие?",
        answer:
          "Да, на сайте используются реальные фотографии квартир RentPlaceMD.",
      },
    ],
    ctaTitle: "Не нашли подходящую квартиру?",
    ctaText:
      "Напишите нам — подберём вариант под ваши даты, количество гостей и бюджет.",
    ctaButton: "Подобрать квартиру",
    whatsappText:
      "Здравствуйте! Помогите подобрать квартиру под мои даты, количество гостей и бюджет.",
  },
  ro: {
    trustTitle: "RentPlaceMD — apartamente în care poți avea încredere",
    trustText:
      "Arătăm fotografii reale, răspundem rapid în mesagerii și vă ajutăm să alegeți apartamentul potrivit pentru date, numărul de oaspeți și buget.",
    trustItems: [
      { icon: "36", title: "36 apartamente într-un complex", text: "Este ușor să alegi variante apropiate sau pentru un grup de oaspeți." },
      { icon: "Foto", title: "Fotografii reale", text: "Pe site sunt prezentate fotografii reale ale apartamentelor." },
      { icon: "5 min", title: "Răspuns în câteva minute", text: "WhatsApp, Viber, Telegram și telefonul sunt mereu disponibile." },
      { icon: "24/7", title: "Cazare prin acord", text: "Ora de sosire poate fi coordonată din timp." },
    ],
    faqTitle: "Întrebări frecvente",
    faq: [
      { question: "La ce oră este check-in și check-out?", answer: "Check-in standard — după 14:00, check-out — până la 12:00. Altă oră se poate coordona din timp." },
      { question: "Pot ajunge noaptea?", answer: "Da, cazarea este posibilă 24/7 cu acord prealabil." },
      { question: "Cum verific datele libere?", answer: "Scrieți-ne pe WhatsApp, Viber sau Telegram — verificăm rapid apartamentele disponibile." },
      { question: "Fotografiile sunt reale?", answer: "Da, pe site sunt folosite fotografii reale ale apartamentelor RentPlaceMD." },
    ],
    ctaTitle: "Nu ați găsit apartamentul potrivit?",
    ctaText: "Scrieți-ne — alegem o variantă pentru datele, numărul de oaspeți și bugetul dvs.",
    ctaButton: "Alege apartament",
    whatsappText: "Bună ziua! Ajutați-mă să aleg un apartament pentru datele, numărul de oaspeți și bugetul meu.",
  },
  en: {
    trustTitle: "RentPlaceMD — apartments you can trust",
    trustText:
      "We show real photos, reply quickly in messengers and help match an apartment to your dates, guest count and budget.",
    trustItems: [
      { icon: "36", title: "36 apartments in one complex", text: "Easy to match nearby options or apartments for a group of guests." },
      { icon: "Photo", title: "Real photos", text: "The website shows real apartment photos without fake interiors." },
      { icon: "5 min", title: "Reply in a few minutes", text: "WhatsApp, Viber, Telegram and phone are always available." },
      { icon: "24/7", title: "Check-in by arrangement", text: "A convenient arrival time can be agreed in advance." },
    ],
    faqTitle: "Frequently Asked Questions",
    faq: [
      { question: "What time are check-in and check-out?", answer: "Standard check-in is after 14:00, check-out is by 12:00. Other times can be arranged in advance." },
      { question: "Can I check in at night?", answer: "Yes, 24/7 check-in is possible by prior arrangement." },
      { question: "How do I check available dates?", answer: "Message us on WhatsApp, Viber or Telegram and we will quickly check available apartments." },
      { question: "Are the photos real?", answer: "Yes, the website uses real photos of RentPlaceMD apartments." },
    ],
    ctaTitle: "Didn't find the right apartment?",
    ctaText: "Message us and we will match an option to your dates, guest count and budget.",
    ctaButton: "Find an apartment",
    whatsappText: "Hello! Please help me find an apartment for my dates, guest count and budget.",
  },
  uk: {
    trustTitle: "RentPlaceMD — квартири, яким можна довіряти",
    trustText:
      "Ми показуємо реальні фотографії, швидко відповідаємо в месенджерах і допомагаємо підібрати квартиру під дати, кількість гостей і бюджет.",
    trustItems: [
      { icon: "36", title: "36 квартир в одному комплексі", text: "Легко підібрати варіант поруч або для групи гостей." },
      { icon: "Фото", title: "Реальні фотографії", text: "На сайті показані справжні фото квартир без фейкових інтер'єрів." },
      { icon: "5 хв", title: "Відповідь за кілька хвилин", text: "WhatsApp, Viber, Telegram і телефон завжди під рукою." },
      { icon: "24/7", title: "Заселення за домовленістю", text: "Можна узгодити зручний час заїзду заздалегідь." },
    ],
    faqTitle: "Часті питання",
    faq: [
      { question: "О котрій заселення і виїзд?", answer: "Стандартне заселення — після 14:00, виїзд — до 12:00. Інший час можна узгодити заздалегідь." },
      { question: "Можна заселитися вночі?", answer: "Так, заселення можливе 24/7 за попередньою домовленістю." },
      { question: "Як уточнити вільні дати?", answer: "Напишіть нам у WhatsApp, Viber або Telegram — ми швидко перевіримо доступні квартири." },
      { question: "Фотографії справжні?", answer: "Так, на сайті використовуються реальні фотографії квартир RentPlaceMD." },
    ],
    ctaTitle: "Не знайшли відповідну квартиру?",
    ctaText: "Напишіть нам — підберемо варіант під ваші дати, кількість гостей і бюджет.",
    ctaButton: "Підібрати квартиру",
    whatsappText: "Добрий день! Допоможіть підібрати квартиру під мої дати, кількість гостей і бюджет.",
  },
  cs: {
    trustTitle: "RentPlaceMD — apartmány, kterým můžete věřit",
    trustText:
      "Ukazujeme reálné fotografie, rychle odpovídáme v messengerech a pomůžeme vybrat apartmán podle termínu, počtu hostů a rozpočtu.",
    trustItems: [
      { icon: "36", title: "36 apartmánů v jednom komplexu", text: "Snadno vyberete blízké možnosti nebo apartmány pro skupinu hostů." },
      { icon: "Foto", title: "Reálné fotografie", text: "Na webu jsou skutečné fotografie apartmánů bez falešných interiérů." },
      { icon: "5 min", title: "Odpověď za pár minut", text: "WhatsApp, Viber, Telegram a telefon jsou vždy k dispozici." },
      { icon: "24/7", title: "Ubytování po domluvě", text: "Pohodlný čas příjezdu lze dohodnout předem." },
    ],
    faqTitle: "Časté otázky",
    faq: [
      { question: "Kdy je check-in a check-out?", answer: "Standardní check-in je po 14:00, check-out do 12:00. Jiný čas lze domluvit předem." },
      { question: "Mohu přijet v noci?", answer: "Ano, ubytování 24/7 je možné po předchozí domluvě." },
      { question: "Jak ověřit volné termíny?", answer: "Napište nám na WhatsApp, Viber nebo Telegram a rychle ověříme dostupné apartmány." },
      { question: "Jsou fotografie skutečné?", answer: "Ano, na webu používáme reálné fotografie apartmánů RentPlaceMD." },
    ],
    ctaTitle: "Nenašli jste vhodný apartmán?",
    ctaText: "Napište nám — vybereme variantu podle termínu, počtu hostů a rozpočtu.",
    ctaButton: "Vybrat apartmán",
    whatsappText: "Dobrý den! Pomozte mi prosím vybrat apartmán podle termínu, počtu hostů a rozpočtu.",
  },
};

function getText(language: string) {
  return afterCatalogText[language] ?? afterCatalogText.ru;
}

export default function HomeAfterCatalog() {
  const { language } = useLanguage();
  const text = getText(language);
  const whatsappLink =
    "https://wa.me/37369990190?text=" + encodeURIComponent(text.whatsappText);

  return (
    <section className="bg-[#fffaf0] px-4 pb-14 pt-2 sm:px-6 sm:pb-18 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-7 sm:space-y-8">
        <section className="rounded-[28px] border border-[#f0e2cf] bg-[#fffefb] p-5 shadow-[0_18px_55px_rgba(15,23,42,0.07)] sm:p-7 lg:p-8" aria-labelledby="home-trust-title">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d4146f]">RentPlaceMD</p>
              <h2 id="home-trust-title" className="mt-3 text-2xl font-black leading-tight text-[#07111f] sm:text-4xl">
                {text.trustTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-slate-600">
                {text.trustText}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {text.trustItems.map((item) => (
                <article key={item.title} className="rounded-[20px] border border-[#f1e7d7] bg-white p-4 shadow-sm shadow-black/5">
                  <div className="mb-3 inline-flex min-h-9 min-w-9 items-center justify-center rounded-xl bg-[#fff4c2] px-2.5 text-xs font-black text-[#8a5b00] ring-1 ring-[#efd887]">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-black leading-snug text-[#07111f]">{item.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-[#f0e2cf] bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.06)] sm:p-7" aria-labelledby="home-faq-title">
          <h2 id="home-faq-title" className="text-2xl font-black text-[#07111f] sm:text-3xl">
            {text.faqTitle}
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {text.faq.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-slate-100 bg-[#fffefb] p-4 shadow-sm shadow-black/5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-black leading-snug text-[#07111f] outline-none focus-visible:ring-2 focus-visible:ring-[#d4146f]">
                  {item.question}
                  <span className="mt-0.5 shrink-0 text-lg leading-none text-[#d4146f] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] bg-[#07111f] p-5 text-white shadow-[0_22px_65px_rgba(7,17,31,0.2)] sm:p-7 lg:flex lg:items-center lg:justify-between lg:gap-8" aria-labelledby="home-final-cta-title">
          <div>
            <h2 id="home-final-cta-title" className="text-2xl font-black leading-tight sm:text-3xl">
              {text.ctaTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-white/72">
              {text.ctaText}
            </p>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#ffd21f] px-6 py-4 text-center text-base font-black text-[#07111f] shadow-lg shadow-yellow-500/20 transition hover:-translate-y-0.5 hover:brightness-105 sm:w-auto lg:mt-0"
          >
            {text.ctaButton}
          </a>
        </section>
      </div>
    </section>
  );
}
