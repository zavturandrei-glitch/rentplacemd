"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/locales/translations";

type TrustText = {
  reviewsLabel: string;
  reviewsTitle: string;
  reviewsSubtitle: string;
  whyLabel: string;
  whyTitle: string;
  nearbyLabel: string;
  nearbyTitle: string;
  faqLabel: string;
  faqTitle: string;
  ratingText: string;
  verifiedText: string;
  reviews: Array<{ name: string; text: string; meta: string }>;
  why: Array<{ title: string; text: string }>;
  nearby: string[];
  faq: Array<{ question: string; answer: string }>;
};

const trustText: Record<Language, TrustText> = {
  ru: {
    reviewsLabel: "Отзывы",
    reviewsTitle: "Гости возвращаются и рекомендуют RentPlaceMD",
    reviewsSubtitle: "Квартиры в центре, быстрая связь и аккуратное заселение без лишних шагов.",
    whyLabel: "Почему выбирают нас",
    whyTitle: "Сервис, который чувствуется с первого сообщения",
    nearbyLabel: "Рядом",
    nearbyTitle: "Все нужное в центре Кишинева",
    faqLabel: "FAQ",
    faqTitle: "Коротко о бронировании",
    ratingText: "4.9 / 5 средняя оценка гостей",
    verifiedText: "Проверенные квартиры, реальные фото, связь 24/7",
    reviews: [
      { name: "Анна", meta: "семейная поездка", text: "Чистая квартира, быстро ответили в WhatsApp и заселили без ожидания. Фото соответствовали реальности." },
      { name: "Mihai", meta: "business trip", text: "Great central location, quiet apartment and very easy communication. I would book again." },
      { name: "Ирина", meta: "выходные в Кишиневе", text: "Удобно, что можно сразу уточнить свободные даты. В квартире было все необходимое." },
    ],
    why: [
      { title: "Центр города", text: "Комплекс Измаил 88 - удобная точка для деловых поездок, отдыха и коротких остановок." },
      { title: "Заселение 24/7", text: "Можно согласовать приезд поздно вечером или рано утром, без сложной бюрократии." },
      { title: "Без посредников", text: "Прямая связь по телефону, WhatsApp, Viber и Telegram, без лишних комиссий." },
      { title: "Единый стандарт", text: "Фото, карточки и описание приведены к одному визуальному уровню для спокойного выбора." },
    ],
    nearby: ["Центр города", "Кафе и рестораны", "Магазины", "Общественный транспорт", "Деловые адреса", "Парковка рядом"],
    faq: [
      { question: "Как проверить свободные даты?", answer: "Нажмите WhatsApp, Viber или Позвонить и напишите даты, ID квартиры и количество гостей." },
      { question: "Фото реальные?", answer: "Да, на сайте используются фотографии конкретных квартир RentPlaceMD." },
      { question: "Можно заселиться ночью?", answer: "Да, заселение согласовывается индивидуально, связь доступна 24/7." },
      { question: "Где находятся квартиры?", answer: "Основная локация - комплекс Измаил 88 в центральной части Кишинева." },
    ],
  },
  ro: {
    reviewsLabel: "Recenzii",
    reviewsTitle: "Oaspetii revin si recomanda RentPlaceMD",
    reviewsSubtitle: "Apartamente centrale, comunicare rapida si cazare simpla.",
    whyLabel: "De ce RentPlaceMD",
    whyTitle: "Serviciu clar din primul mesaj",
    nearbyLabel: "In apropiere",
    nearbyTitle: "Tot ce ai nevoie in centrul Chisinaului",
    faqLabel: "FAQ",
    faqTitle: "Pe scurt despre rezervare",
    ratingText: "4.9 / 5 rating mediu",
    verifiedText: "Apartamente verificate, fotografii reale, contact 24/7",
    reviews: [
      { name: "Ana", meta: "calatorie de familie", text: "Apartament curat, raspuns rapid pe WhatsApp si cazare fara asteptare." },
      { name: "Mihai", meta: "business trip", text: "Locatie centrala, apartament linistit si comunicare usoara." },
      { name: "Irina", meta: "weekend", text: "A fost simplu sa verific datele libere. Apartamentul avea tot ce trebuie." },
    ],
    why: [
      { title: "Centru", text: "Ismail 88 este o locatie comoda pentru calatorii scurte sau business." },
      { title: "Cazare 24/7", text: "Ora sosirii se poate coordona flexibil." },
      { title: "Fara intermediari", text: "Contact direct prin telefon, WhatsApp, Viber si Telegram." },
      { title: "Standard unic", text: "Fotografii si carduri aliniate pentru o alegere usoara." },
    ],
    nearby: ["Centru", "Cafenele", "Magazine", "Transport", "Zone business", "Parcare aproape"],
    faq: [
      { question: "Cum verific disponibilitatea?", answer: "Scrieti datele, ID-ul apartamentului si numarul de oaspeti pe WhatsApp sau Viber." },
      { question: "Fotografiile sunt reale?", answer: "Da, sunt fotografii ale apartamentelor RentPlaceMD." },
      { question: "Pot ajunge noaptea?", answer: "Da, cazarea se coordoneaza individual, contact 24/7." },
      { question: "Unde sunt apartamentele?", answer: "Locatia principala este complexul Ismail 88 din Chisinau." },
    ],
  },
  en: {
    reviewsLabel: "Reviews",
    reviewsTitle: "Guests return and recommend RentPlaceMD",
    reviewsSubtitle: "Central apartments, fast communication and smooth check-in.",
    whyLabel: "Why choose us",
    whyTitle: "A clear service from the first message",
    nearbyLabel: "Nearby",
    nearbyTitle: "Everything you need in central Chisinau",
    faqLabel: "FAQ",
    faqTitle: "Booking, briefly",
    ratingText: "4.9 / 5 average guest rating",
    verifiedText: "Verified apartments, real photos, 24/7 contact",
    reviews: [
      { name: "Anna", meta: "family stay", text: "Clean apartment, quick WhatsApp response and check-in without waiting." },
      { name: "Mihai", meta: "business trip", text: "Great central location, quiet apartment and very easy communication." },
      { name: "Iryna", meta: "weekend stay", text: "Easy to check available dates. The apartment had everything needed." },
    ],
    why: [
      { title: "City center", text: "Ismail 88 is convenient for business, leisure and short stays." },
      { title: "24/7 check-in", text: "Arrival can be coordinated late at night or early in the morning." },
      { title: "No middlemen", text: "Direct contact by phone, WhatsApp, Viber and Telegram." },
      { title: "Consistent standard", text: "Photos and cards are aligned for a calm, confident choice." },
    ],
    nearby: ["City center", "Cafes", "Shops", "Transport", "Business areas", "Nearby parking"],
    faq: [
      { question: "How do I check dates?", answer: "Send dates, apartment ID and guest count via WhatsApp, Viber or phone." },
      { question: "Are the photos real?", answer: "Yes, the website uses photos of specific RentPlaceMD apartments." },
      { question: "Can I check in at night?", answer: "Yes, check-in is coordinated individually, contact is available 24/7." },
      { question: "Where are the apartments?", answer: "The main location is Ismail 88 in central Chisinau." },
    ],
  },
  uk: {
    reviewsLabel: "Відгуки",
    reviewsTitle: "Гості повертаються і рекомендують RentPlaceMD",
    reviewsSubtitle: "Квартири в центрі, швидкий зв'язок і акуратне заселення без зайвих кроків.",
    whyLabel: "Чому обирають нас",
    whyTitle: "Сервіс, який відчувається з першого повідомлення",
    nearbyLabel: "Поруч",
    nearbyTitle: "Все потрібне в центрі Кишинева",
    faqLabel: "FAQ",
    faqTitle: "Коротко про бронювання",
    ratingText: "4.9 / 5 середня оцінка гостей",
    verifiedText: "Перевірені квартири, реальні фото, зв'язок 24/7",
    reviews: [
      { name: "Анна", meta: "сімейна поїздка", text: "Чиста квартира, швидко відповіли в WhatsApp і заселили без очікування." },
      { name: "Mihai", meta: "business trip", text: "Great central location, quiet apartment and very easy communication." },
      { name: "Ірина", meta: "вихідні в Кишиневі", text: "Зручно, що можна одразу уточнити вільні дати. У квартирі було все необхідне." },
    ],
    why: [
      { title: "Центр міста", text: "Комплекс Ізмаїл 88 - зручна точка для ділових поїздок, відпочинку і коротких зупинок." },
      { title: "Заселення 24/7", text: "Можна узгодити приїзд пізно ввечері або рано вранці." },
      { title: "Без посередників", text: "Прямий зв'язок телефоном, WhatsApp, Viber і Telegram." },
      { title: "Єдиний стандарт", text: "Фото, картки й опис приведені до одного візуального рівня для спокійного вибору." },
    ],
    nearby: ["Центр міста", "Кафе і ресторани", "Магазини", "Громадський транспорт", "Ділові адреси", "Парковка поруч"],
    faq: [
      { question: "Як перевірити вільні дати?", answer: "Натисніть WhatsApp, Viber або Подзвонити і напишіть дати, ID квартири та кількість гостей." },
      { question: "Фото реальні?", answer: "Так, на сайті використовуються фотографії конкретних квартир RentPlaceMD." },
      { question: "Можна заселитися вночі?", answer: "Так, заселення узгоджується індивідуально, зв'язок доступний 24/7." },
      { question: "Де знаходяться квартири?", answer: "Основна локація - комплекс Ізмаїл 88 у центральній частині Кишинева." },
    ],
  },
  cs: {
    reviewsLabel: "Recenze",
    reviewsTitle: "Hoste se vraceji a doporucuji RentPlaceMD",
    reviewsSubtitle: "Apartmany v centru, rychla komunikace a jednoduche ubytovani bez zbytecnych kroku.",
    whyLabel: "Proc si vybrat nas",
    whyTitle: "Sluzba, ktera je citit od prvni zpravy",
    nearbyLabel: "V okoli",
    nearbyTitle: "Vse potrebne v centru Chisinau",
    faqLabel: "FAQ",
    faqTitle: "Strucne o rezervaci",
    ratingText: "4.9 / 5 prumerne hodnoceni hostu",
    verifiedText: "Overene apartmany, realne fotografie, kontakt 24/7",
    reviews: [
      { name: "Anna", meta: "rodinna cesta", text: "Cisty apartman, rychla odpoved na WhatsAppu a ubytovani bez cekani." },
      { name: "Mihai", meta: "business trip", text: "Great central location, quiet apartment and very easy communication." },
      { name: "Iryna", meta: "vikendovy pobyt", text: "Bylo jednoduche overit volne terminy. Apartman mel vse potrebne." },
    ],
    why: [
      { title: "Centrum mesta", text: "Komplex Ismail 88 je pohodlne misto pro pracovni cesty, odpocinek i kratke zastavky." },
      { title: "Ubytovani 24/7", text: "Prijezd lze domluvit pozde vecer nebo brzy rano." },
      { title: "Bez prostredniku", text: "Primy kontakt telefonem, pres WhatsApp, Viber a Telegram." },
      { title: "Jednotny standard", text: "Fotografie, karty a popis jsou sjednocene pro klidny vyber." },
    ],
    nearby: ["Centrum mesta", "Kavarny a restaurace", "Obchody", "Verejna doprava", "Business adresy", "Parkovani pobliz"],
    faq: [
      { question: "Jak overit volne terminy?", answer: "Napiste data, ID apartmanu a pocet hostu pres WhatsApp, Viber nebo telefon." },
      { question: "Jsou fotografie realne?", answer: "Ano, na webu jsou fotografie konkretnich apartmanu RentPlaceMD." },
      { question: "Lze se ubytovat v noci?", answer: "Ano, ubytovani se domlouva individualne, kontakt je dostupny 24/7." },
      { question: "Kde jsou apartmany?", answer: "Hlavni lokalitou je komplex Ismail 88 v centralni casti Chisinau." },
    ],
  },
};

export default function TrustSections() {
  const { language } = useLanguage();
  const text = trustText[language];

  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-18" aria-labelledby="trust-title">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d4146f]">{text.reviewsLabel}</p>
            <h2 id="trust-title" className="mt-3 max-w-3xl text-3xl font-black leading-tight text-[#07111f] sm:text-5xl">
              {text.reviewsTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-slate-600 sm:text-lg">
              {text.reviewsSubtitle}
            </p>
          </div>

          <div className="rounded-[28px] border border-[#d4146f]/10 bg-[#fffaf0] p-5 shadow-xl shadow-black/5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-4xl font-black leading-none text-[#d4146f]">4.9</p>
                <p className="mt-1 text-sm font-black text-slate-600">{text.ratingText}</p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3 text-sm font-black leading-6 text-[#07111f] shadow-inner">
                {text.verifiedText}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {text.reviews.map((review) => (
            <article key={review.name} className="rounded-[24px] border border-slate-100 bg-white p-5 shadow-lg shadow-black/5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black text-[#07111f]">{review.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{review.meta}</p>
                </div>
                <p className="rounded-full bg-[#ffd21f] px-3 py-1 text-sm font-black text-[#07111f]">5.0</p>
              </div>
              <p className="text-sm font-semibold leading-6 text-slate-600">{review.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <section className="rounded-[28px] bg-[#07111f] p-5 text-white shadow-2xl shadow-black/20 sm:p-7" aria-labelledby="why-title">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ffd21f]">{text.whyLabel}</p>
            <h2 id="why-title" className="mt-3 text-2xl font-black leading-tight sm:text-4xl">{text.whyTitle}</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {text.why.map((item) => (
                <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <h3 className="font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-white/70">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] bg-[#fffaf0] p-5 shadow-2xl shadow-black/8 ring-1 ring-black/5 sm:p-7" aria-labelledby="nearby-title">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d4146f]">{text.nearbyLabel}</p>
            <h2 id="nearby-title" className="mt-3 text-2xl font-black leading-tight text-[#07111f] sm:text-4xl">{text.nearbyTitle}</h2>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {text.nearby.map((item) => (
                <div key={item} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#07111f] shadow-inner">
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-12" aria-labelledby="faq-title">
          <p className="text-center text-xs font-black uppercase tracking-[0.24em] text-[#d4146f]">{text.faqLabel}</p>
          <h2 id="faq-title" className="mt-3 text-center text-3xl font-black text-[#07111f] sm:text-4xl">{text.faqTitle}</h2>
          <div className="mx-auto mt-6 grid max-w-5xl gap-3 md:grid-cols-2">
            {text.faq.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-lg shadow-black/5">
                <summary className="cursor-pointer list-none text-base font-black text-[#07111f] outline-none focus-visible:ring-2 focus-visible:ring-[#d4146f]">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
