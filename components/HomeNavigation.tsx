"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/locales/translations";

type PrimaryKey = "about" | "rules" | "owners";
type SecondaryKey = "transfer" | "guide" | "events";

const primaryLinks: Array<{ key: PrimaryKey; href: string }> = [
  { key: "about", href: "/about" },
  { key: "rules", href: "/check-in-rules" },
  { key: "owners", href: "/owners" },
];

const secondaryLinks: Array<{ key: SecondaryKey; href: string }> = [
  { key: "transfer", href: "/transfer" },
  { key: "guide", href: "/chisinau-guide" },
  { key: "events", href: "/events" },
];

const textByLanguage: Record<
  Language,
  {
    label: string;
    title: string;
    primary: Record<PrimaryKey, { title: string; text: string; action: string }>;
    secondary: Record<SecondaryKey, string>;
  }
> = {
  ru: {
    label: "Полезные разделы",
    title: "Всё важное для поездки и сотрудничества",
    primary: {
      about: {
        title: "О нас",
        text: "Кто такой RentPlaceMD и как мы помогаем гостям.",
        action: "Узнать о сервисе",
      },
      rules: {
        title: "Правила заселения",
        text: "Что важно согласовать до приезда и при выезде.",
        action: "Прочитать правила",
      },
      owners: {
        title: "Передать квартиру в управление",
        text: "Отдельный раздел для владельцев квартир в Кишинёве.",
        action: "Условия для владельцев",
      },
    },
    secondary: {
      transfer: "Трансфер из аэропорта",
      guide: "Гид по Кишинёву",
      events: "События в Кишинёве",
    },
  },
  ro: {
    label: "Secțiuni utile",
    title: "Tot ce este important pentru călătorie și colaborare",
    primary: {
      about: {
        title: "Despre noi",
        text: "Cine este RentPlaceMD și cum îi ajutăm pe oaspeți.",
        action: "Despre serviciu",
      },
      rules: {
        title: "Reguli de cazare",
        text: "Ce trebuie coordonat înainte de sosire și la plecare.",
        action: "Citește regulile",
      },
      owners: {
        title: "Încredințează-ne apartamentul",
        text: "Secțiunea dedicată proprietarilor de apartamente din Chișinău.",
        action: "Pentru proprietari",
      },
    },
    secondary: {
      transfer: "Transfer de la aeroport",
      guide: "Ghidul Chișinăului",
      events: "Evenimente în Chișinău",
    },
  },
  en: {
    label: "Useful sections",
    title: "The essentials for your trip and for working with us",
    primary: {
      about: {
        title: "About us",
        text: "Who RentPlaceMD is and how we support guests.",
        action: "About the service",
      },
      rules: {
        title: "Check-in rules",
        text: "What to agree before arrival and at departure.",
        action: "Read the rules",
      },
      owners: {
        title: "Let us manage your apartment",
        text: "A dedicated section for apartment owners in Chișinău.",
        action: "Information for owners",
      },
    },
    secondary: {
      transfer: "Airport transfer",
      guide: "Chișinău guide",
      events: "Events in Chișinău",
    },
  },
  uk: {
    label: "Корисні розділи",
    title: "Усе важливе для поїздки та співпраці",
    primary: {
      about: {
        title: "Про нас",
        text: "Хто такий RentPlaceMD і як ми допомагаємо гостям.",
        action: "Дізнатися про сервіс",
      },
      rules: {
        title: "Правила заселення",
        text: "Що важливо погодити до приїзду та під час виїзду.",
        action: "Прочитати правила",
      },
      owners: {
        title: "Передати квартиру в управління",
        text: "Окремий розділ для власників квартир у Кишиневі.",
        action: "Умови для власників",
      },
    },
    secondary: {
      transfer: "Трансфер з аеропорту",
      guide: "Гід Кишиневом",
      events: "Події в Кишиневі",
    },
  },
  cs: {
    label: "Užitečné sekce",
    title: "Vše důležité pro cestu i spolupráci",
    primary: {
      about: {
        title: "O nás",
        text: "Kdo je RentPlaceMD a jak pomáháme hostům.",
        action: "O službě",
      },
      rules: {
        title: "Pravidla ubytování",
        text: "Co domluvit před příjezdem a při odjezdu.",
        action: "Přečíst pravidla",
      },
      owners: {
        title: "Svěřit apartmán do správy",
        text: "Samostatná sekce pro majitele apartmánů v Kišiněvě.",
        action: "Informace pro majitele",
      },
    },
    secondary: {
      transfer: "Transfer z letiště",
      guide: "Průvodce Kišiněvem",
      events: "Akce v Kišiněvě",
    },
  },
};

export default function HomeNavigation() {
  const { language } = useLanguage();
  const text = textByLanguage[language];

  return (
    <section className="bg-[#efeee9] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-[#d4146f]">{text.label}</p>
        <h2 className="mt-2 max-w-3xl text-2xl font-semibold leading-tight tracking-[-0.02em] text-[#07111f] sm:text-3xl">
          {text.title}
        </h2>

        <div className="mt-7 divide-y divide-[#07111f]/10 border-y border-[#07111f]/10 md:grid md:grid-cols-3 md:divide-x md:divide-y-0">
          {primaryLinks.map((item) => {
            const copy = text.primary[item.key];
            const isOwnerLink = item.key === "owners";

            return (
              <Link
                key={item.key}
                href={`${item.href}?lang=${language}`}
                className={[
                  "group flex min-h-[164px] flex-col justify-between px-1 py-6 transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4146f] md:px-6",
                  isOwnerLink
                    ? "bg-[#07111f] px-5 text-white hover:bg-[#122037] md:px-6"
                    : "text-[#07111f] hover:bg-white/55",
                ].join(" ")}
              >
                <div>
                  <h3 className="text-xl font-semibold leading-tight">{copy.title}</h3>
                  <p className={`mt-2 text-sm leading-6 ${isOwnerLink ? "text-white/70" : "text-slate-600"}`}>
                    {copy.text}
                  </p>
                </div>
                <span className={`mt-5 text-sm font-semibold ${isOwnerLink ? "text-[#ff5ca7]" : "text-[#d4146f]"}`}>
                  {copy.action} →
                </span>
              </Link>
            );
          })}
        </div>

        <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-3" aria-label={text.label}>
          {secondaryLinks.map((item) => (
            <Link
              key={item.key}
              href={`${item.href}?lang=${language}`}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-slate-600 underline decoration-slate-300 underline-offset-4 transition hover:text-[#07111f] hover:decoration-[#d4146f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f]"
            >
              {text.secondary[item.key]}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
