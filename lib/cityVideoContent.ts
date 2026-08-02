import type { Metadata } from "next";
import type { Language } from "@/locales/translations";
import {
  baseUrl,
  mainSocialImageUrl,
  normalizeSiteLanguage,
  routeAlternates,
  siteName,
} from "@/lib/seo";

export const cityVideosPath = "/chisinau-videos";

export type CityVideoUi = {
  home: { eyebrow: string; title: string; intro: string; all: string; empty: string };
  events: { eyebrow: string; title: string; intro: string; all: string; empty: string };
  page: {
    eyebrow: string;
    title: string;
    intro: string;
    empty: string;
    linksTitle: string;
    events: string;
    guide: string;
    apartments: string;
    attractions: string;
  };
  actions: { play: string; original: string; related: string };
  seo: { title: string; description: string; breadcrumb: string };
};

export const cityVideoUi: Record<Language, CityVideoUi> = {
  ru: {
    home: {
      eyebrow: "Городские видео",
      title: "Кишинёв в движении",
      intro: "События, фестивали и атмосфера города глазами RentPlace.",
      all: "Смотреть все",
      empty: "Опубликованные ролики появятся здесь после добавления в админке.",
    },
    events: {
      eyebrow: "Видеоархив",
      title: "Как это было",
      intro: "Короткие видео с прошедших концертов, фестивалей и городских праздников Кишинёва.",
      all: "Все видео о Кишинёве",
      empty: "Видео прошедших событий пока не опубликованы.",
    },
    page: {
      eyebrow: "RentPlace · городской гид",
      title: "Видео о Кишинёве — события, фестивали и интересные места",
      intro: "Короткие ролики помогают увидеть атмосферу города перед поездкой: городские события, праздники и места, которые можно добавить в маршрут.",
      empty: "Пока нет опубликованных роликов. Новые видео появятся после проверки и публикации через админку RentPlace.",
      linksTitle: "Продолжить знакомство с Кишинёвом",
      events: "Календарь событий",
      guide: "Гид по Кишинёву",
      apartments: "Квартиры посуточно",
      attractions: "Достопримечательности",
    },
    actions: { play: "Смотреть видео", original: "Открыть оригинал", related: "Подробнее о событии" },
    seo: {
      title: "Видео о Кишинёве: события и фестивали — RentPlaceMD",
      description: "Короткие видео о Кишинёве: городские события, фестивали, праздники и интересные места для планирования поездки.",
      breadcrumb: "Видео о Кишинёве",
    },
  },
  ro: {
    home: {
      eyebrow: "Videoclipuri urbane",
      title: "Chișinăul în mișcare",
      intro: "Evenimente, festivaluri și atmosfera orașului prin ochii RentPlace.",
      all: "Vezi toate",
      empty: "Videoclipurile publicate vor apărea aici după adăugarea lor în administrare.",
    },
    events: {
      eyebrow: "Arhivă video",
      title: "Cum a fost",
      intro: "Videoclipuri scurte de la concerte, festivaluri și sărbători urbane din Chișinău.",
      all: "Toate videoclipurile despre Chișinău",
      empty: "Nu sunt încă publicate videoclipuri de la evenimente trecute.",
    },
    page: {
      eyebrow: "RentPlace · ghid urban",
      title: "Videoclipuri despre Chișinău — evenimente, festivaluri și locuri interesante",
      intro: "Videoclipurile scurte prezintă atmosfera orașului înainte de călătorie: evenimente, sărbători și locuri pe care le puteți adăuga traseului.",
      empty: "Nu există încă videoclipuri publicate. Acestea vor apărea după verificare și publicare în administrarea RentPlace.",
      linksTitle: "Continuați să descoperiți Chișinăul",
      events: "Calendar de evenimente",
      guide: "Ghidul Chișinăului",
      apartments: "Apartamente în regim hotelier",
      attractions: "Atracții turistice",
    },
    actions: { play: "Redă videoclipul", original: "Deschide originalul", related: "Detalii despre eveniment" },
    seo: {
      title: "Videoclipuri despre Chișinău: evenimente și festivaluri — RentPlaceMD",
      description: "Videoclipuri scurte despre Chișinău: evenimente urbane, festivaluri, sărbători și locuri interesante pentru planificarea călătoriei.",
      breadcrumb: "Videoclipuri despre Chișinău",
    },
  },
  en: {
    home: {
      eyebrow: "City videos",
      title: "Chisinau in motion",
      intro: "Events, festivals and the atmosphere of the city through RentPlace.",
      all: "View all",
      empty: "Published videos will appear here after they are added in the admin area.",
    },
    events: {
      eyebrow: "Video archive",
      title: "How it looked",
      intro: "Short videos from past concerts, festivals and city celebrations in Chisinau.",
      all: "All Chisinau videos",
      empty: "No videos from past events have been published yet.",
    },
    page: {
      eyebrow: "RentPlace · city guide",
      title: "Videos of Chisinau — events, festivals and places to see",
      intro: "Short videos offer a feel for the city before your trip: events, celebrations and places worth adding to your itinerary.",
      empty: "There are no published videos yet. New videos will appear after review and publication through the RentPlace admin area.",
      linksTitle: "Keep exploring Chisinau",
      events: "Events calendar",
      guide: "Chisinau guide",
      apartments: "Short-stay apartments",
      attractions: "Attractions",
    },
    actions: { play: "Play video", original: "Open original", related: "Event details" },
    seo: {
      title: "Chisinau videos: events and festivals — RentPlaceMD",
      description: "Short videos of Chisinau featuring city events, festivals, celebrations and interesting places to help plan your trip.",
      breadcrumb: "Chisinau videos",
    },
  },
  uk: {
    home: {
      eyebrow: "Міські відео",
      title: "Кишинів у русі",
      intro: "Події, фестивалі та атмосфера міста очима RentPlace.",
      all: "Переглянути всі",
      empty: "Опубліковані ролики з’являться тут після додавання в адмінці.",
    },
    events: {
      eyebrow: "Відеоархів",
      title: "Як це було",
      intro: "Короткі відео з минулих концертів, фестивалів і міських свят Кишинева.",
      all: "Усі відео про Кишинів",
      empty: "Відео минулих подій ще не опубліковані.",
    },
    page: {
      eyebrow: "RentPlace · міський гід",
      title: "Відео про Кишинів — події, фестивалі та цікаві місця",
      intro: "Короткі ролики допомагають відчути атмосферу міста перед поїздкою: події, свята та місця, які варто додати до маршруту.",
      empty: "Опублікованих роликів поки немає. Нові відео з’являться після перевірки та публікації через адмінку RentPlace.",
      linksTitle: "Продовжити знайомство з Кишиневом",
      events: "Календар подій",
      guide: "Гід по Кишиневу",
      apartments: "Квартири подобово",
      attractions: "Визначні місця",
    },
    actions: { play: "Дивитися відео", original: "Відкрити оригінал", related: "Докладніше про подію" },
    seo: {
      title: "Відео про Кишинів: події та фестивалі — RentPlaceMD",
      description: "Короткі відео про Кишинів: міські події, фестивалі, свята та цікаві місця для планування поїздки.",
      breadcrumb: "Відео про Кишинів",
    },
  },
  cs: {
    home: {
      eyebrow: "Městská videa",
      title: "Kišiněv v pohybu",
      intro: "Akce, festivaly a atmosféra města očima RentPlace.",
      all: "Zobrazit vše",
      empty: "Zveřejněná videa se zde objeví po přidání v administraci.",
    },
    events: {
      eyebrow: "Videoarchiv",
      title: "Jaké to bylo",
      intro: "Krátká videa z minulých koncertů, festivalů a městských slavností v Kišiněvě.",
      all: "Všechna videa o Kišiněvě",
      empty: "Videa z minulých akcí zatím nebyla zveřejněna.",
    },
    page: {
      eyebrow: "RentPlace · městský průvodce",
      title: "Videa o Kišiněvě — akce, festivaly a zajímavá místa",
      intro: "Krátká videa přibližují atmosféru města před cestou: akce, slavnosti a místa, která stojí za zařazení do programu.",
      empty: "Zatím nejsou zveřejněna žádná videa. Nová se objeví po kontrole a zveřejnění v administraci RentPlace.",
      linksTitle: "Pokračujte v objevování Kišiněva",
      events: "Kalendář akcí",
      guide: "Průvodce Kišiněvem",
      apartments: "Krátkodobé ubytování",
      attractions: "Památky",
    },
    actions: { play: "Přehrát video", original: "Otevřít originál", related: "Podrobnosti o akci" },
    seo: {
      title: "Videa o Kišiněvě: akce a festivaly — RentPlaceMD",
      description: "Krátká videa o Kišiněvě: městské akce, festivaly, slavnosti a zajímavá místa pro plánování cesty.",
      breadcrumb: "Videa o Kišiněvě",
    },
  },
};

export function getCityVideoMetadata(languageInput?: string): Metadata {
  const language = normalizeSiteLanguage(languageInput);
  const copy = cityVideoUi[language].seo;
  const url = baseUrl + cityVideosPath + (languageInput ? `?lang=${language}` : "");
  return {
    title: { absolute: copy.title },
    description: copy.description,
    alternates: routeAlternates(cityVideosPath, languageInput),
    robots: { index: true, follow: true },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url,
      siteName,
      type: "website",
      images: [{ url: mainSocialImageUrl, alt: copy.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [mainSocialImageUrl],
    },
  };
}

export function buildCityVideoPageJsonLd(languageInput?: string) {
  const language = normalizeSiteLanguage(languageInput);
  const copy = cityVideoUi[language].seo;
  const url = baseUrl + cityVideosPath + (languageInput ? `?lang=${language}` : "");
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: copy.title,
      description: copy.description,
      url,
      inLanguage: language,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteName, item: baseUrl },
        { "@type": "ListItem", position: 2, name: copy.breadcrumb, item: url },
      ],
    },
  ];
}
