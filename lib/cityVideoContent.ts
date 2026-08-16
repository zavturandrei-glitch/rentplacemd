import type { Metadata } from "next";
import type { Language } from "@/locales/translations";
import type { CityVideo, CityVideoCategory } from "@/lib/cityVideoTypes";
import {
  baseUrl,
  mainSocialImageUrl,
  normalizeSiteLanguage,
  routeAlternates,
  siteName,
} from "@/lib/seo";

export const cityVideosPath = "/chisinau-videos";
const openGraphLocale: Record<Language, string> = {
  ru: "ru_MD",
  ro: "ro_MD",
  en: "en_US",
  uk: "uk_UA",
  cs: "cs_CZ",
};

export const cityVideoCategoryLabels: Record<CityVideoCategory, Record<Language, string>> = {
  city: { ru: "Город", ro: "Oraș", en: "City", uk: "Місто", cs: "Město" },
  events: { ru: "События", ro: "Evenimente", en: "Events", uk: "Події", cs: "Akce" },
  places: { ru: "Места", ro: "Locuri", en: "Places", uk: "Місця", cs: "Místa" },
  food: { ru: "Еда", ro: "Gastronomie", en: "Food", uk: "Їжа", cs: "Gastronomie" },
  culture: { ru: "Культура", ro: "Cultură", en: "Culture", uk: "Культура", cs: "Kultura" },
};

export type CityVideoUi = {
  home: { eyebrow: string; title: string; intro: string; all: string; empty: string };
  events: { eyebrow: string; title: string; intro: string; all: string; empty: string };
  page: {
    eyebrow: string;
    title: string;
    intro: string;
    empty: string;
    videosTitle: string;
    exploreTitle: string;
    exploreText: string;
    featuredEvent: string;
    eventDetails: string;
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
      empty: "Новые проверенные ролики скоро появятся в этом разделе.",
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
      empty: "Видеоархив готовится. Пока продолжите знакомство с городом в путеводителе и календаре событий.",
      videosTitle: "Новые видео и события Кишинёва",
      exploreTitle: "Концерты, фестивали и жизнь города",
      exploreText: "Здесь собраны короткие видео с городских мероприятий, концертов на Arena Chișinău, фестивалей вроде Summer Fest и интересных мест Кишинёва. Проверяйте даты в календаре событий перед поездкой.",
      featuredEvent: "Актуальное событие",
      eventDetails: "Открыть подтверждённую афишу",
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
      empty: "Videoclipuri noi și verificate vor apărea în curând aici.",
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
      empty: "Arhiva video este în pregătire. Între timp, descoperă orașul în ghid și în calendarul de evenimente.",
      videosTitle: "Videoclipuri și evenimente noi din Chișinău",
      exploreTitle: "Concerte, festivaluri și viața orașului",
      exploreText: "Aici găsiți videoclipuri scurte de la evenimente urbane, concerte la Arena Chișinău, festivaluri precum Summer Fest și locuri interesante din oraș. Verificați datele în calendar înainte de călătorie.",
      featuredEvent: "Eveniment actual",
      eventDetails: "Deschide programul confirmat",
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
      empty: "New verified city videos will appear here soon.",
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
      empty: "The video archive is being prepared. In the meantime, explore the city guide and events calendar.",
      videosTitle: "Latest Chisinau videos and events",
      exploreTitle: "Concerts, festivals and city life",
      exploreText: "Explore short videos from city events, concerts at Arena Chișinău, festivals such as Summer Fest and interesting places around Chisinau. Check confirmed dates in the events calendar before travelling.",
      featuredEvent: "Current event",
      eventDetails: "View confirmed listing",
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
      empty: "Нові перевірені відео незабаром з’являться в цьому розділі.",
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
      empty: "Відеоархів готується. А поки відкрийте міський гід і календар подій.",
      videosTitle: "Нові відео та події Кишинева",
      exploreTitle: "Концерти, фестивалі та життя міста",
      exploreText: "Тут зібрані короткі відео з міських подій, концертів на Arena Chișinău, фестивалів на кшталт Summer Fest і цікавих місць Кишинева. Перевіряйте дати в календарі перед поїздкою.",
      featuredEvent: "Актуальна подія",
      eventDetails: "Відкрити підтверджену афішу",
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
      empty: "Nová ověřená městská videa se zde brzy objeví.",
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
      empty: "Videoarchiv se připravuje. Mezitím pokračujte průvodcem města a kalendářem akcí.",
      videosTitle: "Nová videa a akce z Kišiněva",
      exploreTitle: "Koncerty, festivaly a život ve městě",
      exploreText: "Najdete zde krátká videa z městských akcí, koncertů v Arena Chișinău, festivalů jako Summer Fest a zajímavých míst v Kišiněvě. Před cestou si ověřte data v kalendáři akcí.",
      featuredEvent: "Aktuální akce",
      eventDetails: "Otevřít ověřený program",
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
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url,
      siteName,
      type: "website",
      locale: openGraphLocale[language],
      alternateLocale: Object.values(openGraphLocale).filter((locale) => locale !== openGraphLocale[language]),
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

export function buildCityVideoPageJsonLd(languageInput?: string, videos: CityVideo[] = []) {
  const language = normalizeSiteLanguage(languageInput);
  const copy = cityVideoUi[language].seo;
  const url = baseUrl + cityVideosPath + (languageInput ? `?lang=${language}` : "");
  const itemListId = `${url}#videos`;
  const lastUpdated = videos.reduce<string | null>(
    (latest, video) => !latest || video.updatedAt > latest ? video.updatedAt : latest,
    null,
  );
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: copy.title,
      description: copy.description,
      url,
      inLanguage: language,
      ...(lastUpdated ? { dateModified: lastUpdated } : {}),
      ...(videos.length > 0 ? { mainEntity: { "@id": itemListId } } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteName, item: baseUrl },
        { "@type": "ListItem", position: 2, name: copy.breadcrumb, item: url },
      ],
    },
    ...(videos.length > 0 ? [{
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": itemListId,
      name: cityVideoUi[language].page.videosTitle,
      numberOfItems: videos.length,
      itemListElement: videos.map((video, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: video.title[language],
        url: video.videoUrl,
      })),
    }] : []),
  ];
}
