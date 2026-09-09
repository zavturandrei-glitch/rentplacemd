"use client";

import Link from "@/components/LocalizedLink";
import { useLanguage } from "@/context/LanguageContext";
import { activeApartmentCount } from "@/lib/apartments";
import { centerApartments } from "@/lib/apartmentDistricts";
import { centerApartmentsContent } from "@/lib/centerApartmentsContent";
import type { Language } from "@/locales/translations";

const copy: Record<Language, { title: string; text: (count: number) => string; cta: string }> = {
  ru: {
    title: "Краткосрочная аренда с понятным выбором",
    text: (count) => `RentPlaceMD — сервис посуточной и краткосрочной аренды квартир в Кишинёве. В каталоге опубликовано ${count} вариантов по нескольким адресам города: для каждого указаны актуальная цена, реальные фотографии, планировка и подтверждённая вместимость. Выберите подходящую квартиру, откройте её страницу и проверьте доступные даты в календаре. Чтобы уточнить условия и отправить запрос на бронирование, свяжитесь напрямую с администратором RentPlaceMD по телефону, WhatsApp, Viber или Telegram.`,
    cta: "Смотреть квартиры посуточно в Кишинёве",
  },
  ro: {
    title: "Cazare pe termen scurt cu o alegere clară",
    text: (count) => `RentPlaceMD este un serviciu de închiriere zilnică și pe termen scurt în Chișinău. Catalogul include ${count} de opțiuni la mai multe adrese din oraș, fiecare cu preț actual, fotografii reale, compartimentare și capacitate confirmată. Alegeți un apartament, deschideți pagina lui și verificați datele disponibile în calendar. Pentru condiții și o solicitare de rezervare, contactați direct administratorul RentPlaceMD prin telefon, WhatsApp, Viber sau Telegram.`,
    cta: "Vezi apartamente în regim hotelier în Chișinău",
  },
  en: {
    title: "Short stays with a clear choice",
    text: (count) => `RentPlaceMD is a daily and short-stay apartment service in Chisinau. The catalogue contains ${count} options across several city addresses, each with a current price, real photographs, layout and confirmed guest capacity. Choose a suitable apartment, open its page and check available dates in the calendar. To clarify the stay conditions and send a booking request, contact the RentPlaceMD administrator directly by phone, WhatsApp, Viber or Telegram.`,
    cta: "View short-stay apartments in Chisinau",
  },
  uk: {
    title: "Короткострокова оренда зі зрозумілим вибором",
    text: (count) => `RentPlaceMD — сервіс подобової та короткострокової оренди квартир у Кишиневі. У каталозі опубліковано ${count} варіантів за кількома адресами міста, для кожного вказані актуальна ціна, реальні фотографії, планування та підтверджена місткість. Виберіть квартиру, відкрийте її сторінку й перевірте вільні дати в календарі. Щоб уточнити умови та надіслати запит на бронювання, зв’яжіться безпосередньо з адміністратором RentPlaceMD телефоном, через WhatsApp, Viber або Telegram.`,
    cta: "Переглянути квартири подобово в Кишиневі",
  },
  cs: {
    title: "Krátkodobý pobyt s přehledným výběrem",
    text: (count) => `RentPlaceMD nabízí denní a krátkodobé pronájmy apartmánů v Kišiněvě. Katalog obsahuje ${count} možností na několika adresách ve městě, vždy s aktuální cenou, skutečnými fotografiemi, dispozicí a potvrzenou kapacitou. Vyberte apartmán, otevřete jeho stránku a ověřte volné termíny v kalendáři. Podmínky pobytu a žádost o rezervaci vyřídíte přímo se správcem RentPlaceMD telefonicky nebo přes WhatsApp, Viber či Telegram.`,
    cta: "Zobrazit krátkodobé pronájmy v Kišiněvě",
  },
};

export default function HomeCommercialIntro() {
  const { language } = useLanguage();
  const text = copy[language];
  const centerCopy = centerApartmentsContent[language];

  return (
    <section className="bg-[#07111f] px-4 pb-6 text-white sm:px-6 sm:pb-10 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[20px] border border-white/10 bg-white/[0.05] p-4 sm:rounded-[24px] sm:p-7">
        <h2 className="text-xl font-black tracking-[-0.03em] sm:text-3xl">{text.title}</h2>
        <p className="mt-2 max-w-4xl text-[13px] font-medium leading-5 text-white/72 sm:mt-3 sm:text-base sm:leading-7">
          {text.text(activeApartmentCount)}
        </p>
        <Link href="/apartments" className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#ffd21f] px-4 text-[13px] font-black text-[#07111f] shadow-lg shadow-yellow-400/10 sm:mt-5 sm:min-h-12 sm:px-5 sm:text-sm">
          {text.cta}
        </Link>
        <div className="mt-4 border-t border-white/10 pt-4 sm:mt-6 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:pt-5">
          <div>
            <h3 className="text-base font-black sm:text-lg">{centerCopy.homeTitle}</h3>
            <p className="mt-1 text-[13px] font-medium leading-5 text-white/65 sm:text-sm sm:leading-6">{centerCopy.homeText(centerApartments.length)}</p>
          </div>
          <Link href="/apartments/center" className="mt-3 inline-flex min-h-11 shrink-0 items-center rounded-xl border border-white/20 px-4 text-[13px] font-black text-white transition hover:border-[#ffd21f] hover:text-[#ffd21f] sm:mt-0 sm:text-sm">
            {centerCopy.homeLink} →
          </Link>
        </div>
      </div>
    </section>
  );
}
