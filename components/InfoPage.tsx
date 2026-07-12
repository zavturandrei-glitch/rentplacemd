"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/locales/translations";

export type InfoPageKind = "about" | "rules" | "transfer" | "guide";

type InfoPageData = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Array<{ title: string; text: string }>;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image?: { src: string; alt: string };
  dark?: boolean;
};

const pages: Record<InfoPageKind, Record<Language, InfoPageData>> = {
  about: {
    ru: {
      eyebrow: "RentPlaceMD",
      title: "RentPlaceMD приветствует вас!",
      intro: "Мы помогаем гостям Кишинёва быстро найти комфортное и надёжное жильё для посуточной аренды — от доступных студий до современных апартаментов повышенного комфорта.",
      sections: [
        { title: "Комфорт и оснащение", text: "Все объекты проверяются и оснащены удобной мебелью, современной техникой, Wi-Fi, кухней, чистым постельным бельём и всем необходимым для короткого или длительного проживания." },
        { title: "Удобное расположение", text: "Квартиры расположены в удобных районах Кишинёва, рядом с магазинами, кафе, ресторанами, остановками и городскими достопримечательностями." },
        { title: "Простые условия", text: "Мы предлагаем быстрое заселение, прозрачные условия аренды, поддержку гостей и выбор вариантов на разный бюджет." },
        { title: "Дополнительные услуги", text: "Доступны трансфер из аэропорта и по городу, помощь в организации поездки, бронирование авиабилетов и аренда современных автомобилей." },
        { title: "Наша цель", text: "Сделать пребывание каждого гостя максимально комфортным, безопасным и удобным. Спасибо, что выбираете RentPlaceMD!" },
      ],
      cta: { label: "Все квартиры", href: "/apartments" },
      secondaryCta: { label: "Подобрать квартиру", href: "/#quick-pick" },
    },
    ro: {
      eyebrow: "RentPlaceMD",
      title: "Despre noi",
      intro: "RentPlaceMD este un serviciu de apartamente in chirie pe zi in Chisinau, cu fotografii reale, preturi clare si contact rapid.",
      sections: [
        { title: "Cine suntem", text: "Pe site sunt prezentate apartamente pentru calatorii scurte, deplasari si sederi de cateva zile. O parte importanta se afla in complexul Ismail 88." },
        { title: "Cum alege oaspetele", text: "Puteti verifica din timp pozele, ID-ul, pretul, capacitatea si categoria: Economy, Standard sau Standard+." },
        { title: "Contact si cazare", text: "Datele libere, ora de cazare, predarea cheilor si transferul pot fi coordonate prin WhatsApp, Viber, Telegram sau telefon." },
      ],
      cta: { label: "Toate apartamentele", href: "/apartments" },
      secondaryCta: { label: "Alege apartament", href: "/#quick-pick" },
    },
    en: {
      eyebrow: "RentPlaceMD",
      title: "About us",
      intro: "RentPlaceMD offers daily apartments in Chisinau with real photos, clear prices and fast contact.",
      sections: [
        { title: "Who we are", text: "The site presents apartments for short trips, business stays and several-day visits. Many options are in the Ismail 88 complex, close to the city center." },
        { title: "How guests choose", text: "Guests can check photos, ID, price, capacity and class in advance: Economy, Standard or Standard+." },
        { title: "Contact and check-in", text: "Availability, check-in time, key handover and transfer can be discussed through WhatsApp, Viber, Telegram or phone." },
      ],
      cta: { label: "All apartments", href: "/apartments" },
      secondaryCta: { label: "Find apartment", href: "/#quick-pick" },
    },
    uk: {
      eyebrow: "RentPlaceMD",
      title: "Про нас",
      intro: "RentPlaceMD — сервіс подобової оренди квартир у Кишиневі з реальними фото, зрозумілими цінами та швидким зв'язком.",
      sections: [
        { title: "Хто ми", text: "На сайті представлені квартири для коротких поїздок, відряджень і проживання на кілька днів. Багато варіантів розташовані в комплексі Ізмаїл 88." },
        { title: "Як обирає гість", text: "Можна заздалегідь переглянути фото, ID, ціну, місткість і категорію: Economy, Standard або Standard+." },
        { title: "Зв'язок і заселення", text: "Дати, час заселення, передача ключів і трансфер узгоджуються через WhatsApp, Viber, Telegram або телефон." },
      ],
      cta: { label: "Усі квартири", href: "/apartments" },
      secondaryCta: { label: "Підібрати квартиру", href: "/#quick-pick" },
    },
    cs: {
      eyebrow: "RentPlaceMD",
      title: "O nas",
      intro: "RentPlaceMD nabizi apartmany na den v Kisineve se skutecnymi fotkami, jasnymi cenami a rychlym kontaktem.",
      sections: [
        { title: "Kdo jsme", text: "Na webu jsou apartmany pro kratke cesty, pracovni pobyty i nekolikadenní navstevy. Mnoho moznosti je v komplexu Ismail 88." },
        { title: "Jak host vybira", text: "Host si muze predem zkontrolovat fotky, ID, cenu, kapacitu a kategorii: Economy, Standard nebo Standard+." },
        { title: "Kontakt a ubytovani", text: "Dostupnost, cas ubytovani, predani klicu a transfer lze domluvit pres WhatsApp, Viber, Telegram nebo telefon." },
      ],
      cta: { label: "Vsechny apartmany", href: "/apartments" },
      secondaryCta: { label: "Vybrat apartman", href: "/#quick-pick" },
    },
  },
  rules: {
    ru: {
      eyebrow: "Заселение",
      title: "Правила заселения",
      intro: "Основные условия лучше согласовать до приезда: так заселение проходит спокойнее.",
      sections: [
        { title: "Заезд и выезд", text: "Обычно заезд с 14:00, выезд до 12:00. Ранний заезд или поздний выезд обсуждаются заранее." },
        { title: "Документы и оплата", text: "Для заселения нужен документ гостя. Условия оплаты подтверждаются перед приездом." },
        { title: "Связь", text: "Если меняется время прибытия или нужны детали по квартире, напишите в WhatsApp, Viber, Telegram или позвоните." },
      ],
      cta: { label: "Связаться", href: "https://wa.me/37369990190" },
    },
    ro: {
      eyebrow: "Cazare",
      title: "Reguli de cazare",
      intro: "Este mai bine sa coordonati conditiile inainte de sosire, pentru o cazare linistita.",
      sections: [
        { title: "Sosire si plecare", text: "De obicei check-in de la 14:00 si check-out pana la 12:00. Orele speciale se discuta din timp." },
        { title: "Documente si plata", text: "Pentru cazare este necesar un document. Conditiile de plata se confirma inainte de sosire." },
        { title: "Contact", text: "Daca se schimba ora sosirii sau aveti intrebari, scrieti pe WhatsApp, Viber, Telegram sau sunati." },
      ],
      cta: { label: "Contact", href: "https://wa.me/37369990190" },
    },
    en: {
      eyebrow: "Check-in",
      title: "Check-in rules",
      intro: "It is best to confirm the main details before arrival, so check-in stays calm and clear.",
      sections: [
        { title: "Arrival and departure", text: "Standard check-in is from 14:00 and check-out is until 12:00. Early or late times can be discussed in advance." },
        { title: "Documents and payment", text: "Guest ID is required for check-in. Payment details are confirmed before arrival." },
        { title: "Contact", text: "If arrival time changes or you need apartment details, use WhatsApp, Viber, Telegram or phone." },
      ],
      cta: { label: "Contact", href: "https://wa.me/37369990190" },
    },
    uk: {
      eyebrow: "Заселення",
      title: "Правила заселення",
      intro: "Основні умови краще узгодити до приїзду, щоб заселення пройшло спокійно.",
      sections: [
        { title: "Заїзд і виїзд", text: "Зазвичай заїзд з 14:00, виїзд до 12:00. Ранній заїзд або пізній виїзд обговорюються заздалегідь." },
        { title: "Документи й оплата", text: "Для заселення потрібен документ гостя. Умови оплати підтверджуються до приїзду." },
        { title: "Зв'язок", text: "Якщо змінюється час прибуття або потрібні деталі, напишіть у WhatsApp, Viber, Telegram або зателефонуйте." },
      ],
      cta: { label: "Зв'язатися", href: "https://wa.me/37369990190" },
    },
    cs: {
      eyebrow: "Ubytovani",
      title: "Pravidla ubytovani",
      intro: "Hlavni podminky je dobre domluvit pred prijezdem, aby ubytovani probehlo klidne.",
      sections: [
        { title: "Prijezd a odjezd", text: "Obvykle check-in od 14:00 a check-out do 12:00. Jine casy lze domluvit predem." },
        { title: "Doklady a platba", text: "K ubytovani je potreba doklad hosta. Platebni podminky se potvrzuji pred prijezdem." },
        { title: "Kontakt", text: "Pokud se meni cas prijezdu nebo potrebujete detaily, piste pres WhatsApp, Viber, Telegram nebo volejte." },
      ],
      cta: { label: "Kontakt", href: "https://wa.me/37369990190" },
    },
  },
  transfer: {
    ru: {
      eyebrow: "от 19.99 EUR",
      title: "Трансфер до квартиры",
      intro: "Трансфер удобен при позднем прилёте, багаже или поездке с семьёй. Время, адрес и стоимость согласуются заранее.",
      sections: [
        { title: "Из аэропорта", text: "Можно обсудить встречу в аэропорту Кишинёва и поездку до адреса проживания." },
        { title: "По договорённости", text: "Детали зависят от времени прибытия, количества гостей и багажа." },
      ],
      cta: { label: "WhatsApp", href: "https://wa.me/37369990190?text=Здравствуйте! Интересует трансфер из аэропорта." },
      image: { src: "/guest-essentials/airport-transfer.png", alt: "Трансфер из аэропорта Кишинёва" },
      dark: true,
    },
    ro: {
      eyebrow: "de la 19.99 EUR",
      title: "Transfer pana la apartament",
      intro: "Transferul este comod pentru sosiri tarzii, bagaje sau calatorii cu familia. Ora, adresa si pretul se coordoneaza din timp.",
      sections: [
        { title: "De la aeroport", text: "Puteti discuta intampinarea la aeroportul Chisinau si drumul pana la apartament." },
        { title: "Cu acord prealabil", text: "Detaliile depind de ora sosirii, numarul de oaspeti si bagaje." },
      ],
      cta: { label: "WhatsApp", href: "https://wa.me/37369990190?text=Buna ziua! Ma intereseaza transferul de la aeroport." },
      image: { src: "/guest-essentials/airport-transfer.png", alt: "Transfer de la aeroportul Chisinau" },
      dark: true,
    },
    en: {
      eyebrow: "from 19.99 EUR",
      title: "Transfer to the apartment",
      intro: "Transfer is useful for late arrivals, luggage or family trips. Time, address and price are agreed in advance.",
      sections: [
        { title: "From the airport", text: "You can discuss pickup at Chisinau airport and the ride to the apartment address." },
        { title: "By arrangement", text: "Details depend on arrival time, number of guests and luggage." },
      ],
      cta: { label: "WhatsApp", href: "https://wa.me/37369990190?text=Hello! I am interested in airport transfer." },
      image: { src: "/guest-essentials/airport-transfer.png", alt: "Transfer from Chisinau airport" },
      dark: true,
    },
    uk: {
      eyebrow: "від 19.99 EUR",
      title: "Трансфер до квартири",
      intro: "Трансфер зручний при пізньому прильоті, багажі або поїздці з родиною. Час, адресу і ціну узгоджують заздалегідь.",
      sections: [
        { title: "З аеропорту", text: "Можна обговорити зустріч в аеропорту Кишинева і дорогу до квартири." },
        { title: "За домовленістю", text: "Деталі залежать від часу прибуття, кількості гостей і багажу." },
      ],
      cta: { label: "WhatsApp", href: "https://wa.me/37369990190?text=Добрий день! Цікавить трансфер з аеропорту." },
      image: { src: "/guest-essentials/airport-transfer.png", alt: "Трансфер з аеропорту Кишинева" },
      dark: true,
    },
    cs: {
      eyebrow: "od 19.99 EUR",
      title: "Transfer k apartmanu",
      intro: "Transfer je prakticky pri pozdnim priletu, zavazadlech nebo ceste s rodinou. Cas, adresa a cena se domlouvaji predem.",
      sections: [
        { title: "Z letiste", text: "Lze domluvit vyzvednuti na letisti v Kisineve a cestu na adresu apartmanu." },
        { title: "Po dohode", text: "Detaily zavisi na casu prijezdu, poctu hostu a zavazadlech." },
      ],
      cta: { label: "WhatsApp", href: "https://wa.me/37369990190?text=Dobry den! Zajima me transfer z letiste." },
      image: { src: "/guest-essentials/airport-transfer.png", alt: "Transfer z letiste Kisinev" },
      dark: true,
    },
  },
  guide: {
    ru: {
      eyebrow: "RentPlaceMD guide",
      title: "Гид по Кишинёву: где остановиться и как выбрать квартиру посуточно",
      intro: "Короткий гид для гостей, которые приезжают в Кишинёв на одну ночь, несколько дней, в командировку или туристическую поездку.",
      sections: [
        { title: "Что посмотреть", text: "Начните с Триумфальной арки, Соборного парка и прогулки по проспекту Штефана чел Маре." },
        { title: "Куда сходить", text: "Днём подойдут музеи и парки, вечером — театр, концерт или заведения в центре." },
        { title: "Лучшие рестораны", text: "Ищите места с молдавской кухней и уточняйте столик заранее в пятницу и выходные." },
        { title: "Кафе, завтрак и ужин", text: "В центре много кофеен, пекарен и ресторанов. Проверяйте время работы и меню перед визитом." },
        { title: "Супермаркеты и аптеки", text: "Крупные сети и дежурные аптеки легко найти на карте; для ночной покупки сначала уточните график." },
        { title: "Банкоматы и обмен валют", text: "Пользуйтесь банкоматами при банках и лицензированными обменными пунктами; сохраняйте чек." },
        { title: "Такси и общественный транспорт", text: "Такси удобнее заказывать через приложение. Троллейбусы и автобусы подходят для бюджетных поездок." },
        { title: "Как добраться из аэропорта", text: "Заранее согласуйте трансфер или закажите официальное такси, особенно при позднем прилёте и багаже." },
        { title: "Парковки и аренда автомобиля", text: "В центре парковочные места ограничены. Уточняйте правила двора и условия страховки арендованной машины." },
        { title: "Торговые центры", text: "В торговых центрах есть магазины, фуд-корты, кино и банкоматы — удобно для дождливого дня." },
        { title: "Парки и музеи", text: "Парк Валя Морилор подходит для прогулки, а национальные музеи помогут познакомиться с историей Молдовы." },
        { title: "Ночная жизнь", text: "Выбирайте лицензированные заведения, планируйте обратную поездку заранее и не оставляйте вещи без присмотра." },
        { title: "Семейный отдых и дети", text: "Парки, зоопарк, детские центры и интерактивные музеи легко объединить в спокойный семейный маршрут." },
        { title: "Медицинские центры и телефоны", text: "В экстренной ситуации звоните 112. Адрес ближайшей клиники и страховую помощь лучше сохранить до поездки." },
        { title: "FAQ туристов", text: "В Молдове расплачиваются леями. Карты принимают широко, но небольшой запас наличных пригодится." },
        { title: "Маршрут на 1 день", text: "Центр города, Триумфальная арка, музей, обед с молдавской кухней и вечерняя прогулка дают хорошее первое знакомство." },
        { title: "Маршрут на 2 дня", text: "К пешему центру добавьте Валя Морилор, ещё один музей, рынок или торговый центр и спокойный ужин." },
        { title: "Маршрут на 3 дня", text: "Третий день оставьте для винодельни или загородной поездки, заранее проверив экскурсию и трансфер." },
      ],
      cta: { label: "Открыть каталог", href: "/apartments" },
    },
    ro: {
      eyebrow: "RentPlaceMD guide",
      title: "Ghid Chisinau: unde sa stai si cum alegi un apartament pe zi",
      intro: "Un ghid scurt pentru oaspetii care vin in Chisinau pentru o noapte, cateva zile, serviciu sau turism.",
      sections: [
        { title: "Unde sa stai", text: "Pentru o calatorie scurta este comod sa alegeti cazare aproape de centru, magazine, cafenele si transport." },
        { title: "Apartament sau hotel", text: "Un apartament pe zi este potrivit cand aveti nevoie de bucatarie, spatiu separat si pret clar." },
        { title: "Ce sa verifici", text: "Inainte de rezervare verificati pozele, capacitatea, pretul, ora de cazare, adresa si contactele." },
        { title: "Ismail 88", text: "Complexul Ismail 88 este in zona centrala si este comod pentru sederi de cateva zile." },
      ],
      cta: { label: "Deschide catalogul", href: "/apartments" },
    },
    en: {
      eyebrow: "RentPlaceMD guide",
      title: "Chisinau guide: where to stay and how to choose a daily apartment",
      intro: "A short guide for guests coming to Chisinau for one night, several days, a business trip or tourism.",
      sections: [
        { title: "Where to stay", text: "For a short trip, it is convenient to stay near the center, shops, cafes and transport." },
        { title: "Apartment or hotel", text: "A daily apartment suits guests who need a kitchen, separate space and clear day pricing." },
        { title: "What to check", text: "Before booking, check photos, capacity, price, check-in time, address and contact options." },
        { title: "Ismail 88", text: "The Ismail 88 complex is in the central area and works well for several-day stays." },
      ],
      cta: { label: "Open catalog", href: "/apartments" },
    },
    uk: {
      eyebrow: "RentPlaceMD guide",
      title: "Гід по Кишиневу: де зупинитися і як обрати квартиру подобово",
      intro: "Короткий гід для гостей, які приїжджають у Кишинів на одну ніч, кілька днів, у відрядження або туристичну поїздку.",
      sections: [
        { title: "Де зупинитися", text: "Для короткої поїздки зручно обирати житло поруч із центром, магазинами, кафе і транспортом." },
        { title: "Квартира чи готель", text: "Квартира подобово підходить гостям, яким потрібні кухня, окремий простір і зрозуміла ціна." },
        { title: "Що перевірити", text: "Перед бронюванням уточніть фото, місткість, ціну, час заїзду, адресу і способи зв'язку." },
        { title: "Ізмаїл 88", text: "Комплекс Ізмаїл 88 розташований у центральній частині міста і зручний для проживання на кілька днів." },
      ],
      cta: { label: "Відкрити каталог", href: "/apartments" },
    },
    cs: {
      eyebrow: "RentPlaceMD guide",
      title: "Pruvodce Kisinevem: kde bydlet a jak vybrat apartman na den",
      intro: "Kratky pruvodce pro hosty, kteri prijizdeji do Kisineva na jednu noc, nekolik dni, pracovne nebo turisticky.",
      sections: [
        { title: "Kde bydlet", text: "Pro kratkou cestu je pohodlne zvolit ubytovani pobliz centra, obchodu, kavaren a dopravy." },
        { title: "Apartman nebo hotel", text: "Apartman na den vyhovuje hostum, kteri potrebuji kuchyn, samostatny prostor a jasnou cenu." },
        { title: "Co zkontrolovat", text: "Pred rezervaci overte fotky, kapacitu, cenu, cas prijezdu, adresu a moznosti kontaktu." },
        { title: "Ismail 88", text: "Komplex Ismail 88 je v centralni casti mesta a je vhodny pro pobyt na nekolik dni." },
      ],
      cta: { label: "Otevrit katalog", href: "/apartments" },
    },
  },
};

export default function InfoPage({ kind }: { kind: InfoPageKind }) {
  const { language } = useLanguage();
  const page = pages[kind][language];
  const shellClass = page.dark
    ? "mx-auto grid max-w-6xl overflow-hidden rounded-[26px] bg-[#07111f] text-white shadow-[0_24px_70px_rgba(7,17,31,0.22)] lg:grid-cols-[1fr_0.95fr]"
    : "mx-auto max-w-5xl";

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className={shellClass}>
        {page.image ? (
          <div className="relative min-h-[280px]">
            <Image
              src={page.image.src}
              alt={page.image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
        <div className={page.dark ? "p-6 sm:p-9" : "rounded-[26px] bg-white p-6 shadow-[0_18px_54px_rgba(15,23,42,0.08)] sm:p-9"}>
          <p className={page.dark ? "text-xs font-black uppercase tracking-[0.22em] text-[#ffd21f]" : "text-xs font-black uppercase tracking-[0.22em] text-[#d4146f]"}>
            {page.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
            {page.title}
          </h1>
          <p className={page.dark ? "mt-5 text-base font-semibold leading-8 text-white/78 sm:text-lg" : "mt-5 text-base font-semibold leading-8 text-slate-700 sm:text-lg"}>
            {page.intro}
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {page.sections.map((section) => (
              <article key={section.title} className={page.dark ? "rounded-[22px] border border-white/10 bg-white/[0.06] p-5" : "rounded-[22px] bg-[#fffaf0] p-5 ring-1 ring-[#f0dfbf]"}>
                <h2 className="text-xl font-black">{section.title}</h2>
                <p className={page.dark ? "mt-3 text-sm font-semibold leading-6 text-white/72" : "mt-3 text-sm font-semibold leading-6 text-slate-600"}>
                  {section.text}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {page.cta ? (
              <Link href={page.cta.href} className="rounded-2xl bg-[#d4146f] px-6 py-4 text-center font-black text-white">
                {page.cta.label}
              </Link>
            ) : null}
            {page.secondaryCta ? (
              <Link href={page.secondaryCta.href} className="rounded-2xl bg-[#07111f] px-6 py-4 text-center font-black text-white">
                {page.secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
