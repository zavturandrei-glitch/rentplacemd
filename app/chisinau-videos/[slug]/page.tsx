import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLdScript from "@/components/JsonLdScript";
import {
  buildCityVideoWatchJsonLd,
  cityVideoUi,
  getCityVideoWatchDescription,
  getCityVideoWatchMetadata,
} from "@/lib/cityVideoContent";
import { getCityVideoEmbedUrl, getCityVideoThumbnail } from "@/lib/cityVideoTypes";
import { readPublishedCityVideoBySlug } from "@/lib/cityVideoStore";
import { normalizeSiteLanguage } from "@/lib/seo";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

const first = (value?: string | string[]) => Array.isArray(value) ? value[0] : value;
const dateLocales = { ru: "ru-MD", ro: "ro-MD", en: "en-GB", uk: "uk-UA", cs: "cs-CZ" } as const;
const watchCopy = {
  ru: { back: "Все видео о Кишинёве", date: "Дата события", original: "Открыть оригинал", related: "Подробнее" },
  ro: { back: "Toate videoclipurile despre Chișinău", date: "Data evenimentului", original: "Deschide originalul", related: "Mai multe" },
  en: { back: "All Chisinau videos", date: "Event date", original: "Open original", related: "Learn more" },
  uk: { back: "Усі відео про Кишинів", date: "Дата події", original: "Відкрити оригінал", related: "Докладніше" },
  cs: { back: "Všechna videa o Kišiněvě", date: "Datum akce", original: "Otevřít originál", related: "Více informací" },
} as const;

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const video = await readPublishedCityVideoBySlug(slug);
  if (!video) return { title: "Видео не найдено", robots: { index: false, follow: false } };
  return getCityVideoWatchMetadata(video, first(query.lang));
}

export default async function CityVideoWatchPage({ params, searchParams }: PageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const video = await readPublishedCityVideoBySlug(slug);
  if (!video) notFound();

  const languageInput = first(query.lang);
  const language = normalizeSiteLanguage(languageInput);
  const copy = watchCopy[language];
  const title = video.title[language];
  const description = getCityVideoWatchDescription(video, language);
  const thumbnail = getCityVideoThumbnail(video);
  const embedUrl = getCityVideoEmbedUrl(video);
  if (!thumbnail || !embedUrl) notFound();
  const localizedSuffix = languageInput ? `?lang=${language}` : "";
  const eventDate = new Intl.DateTimeFormat(dateLocales[language], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Chisinau",
  }).format(new Date(`${video.date}T12:00:00+03:00`));
  const optimizedThumbnail = thumbnail.startsWith("/") || thumbnail.startsWith("https://i.ytimg.com/");

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#07111f]">
      <JsonLdScript id="city-video-watch-jsonld" data={buildCityVideoWatchJsonLd(video, languageInput)} />
      <Header />
      <article className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link href={`/chisinau-videos${localizedSuffix}`} className="inline-flex min-h-11 items-center rounded-xl border border-black/10 bg-white px-4 text-sm font-black shadow-sm">
            ← {copy.back}
          </Link>

          <div className="mt-7 grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10">
            <div className={video.platform === "tiktok" ? "mx-auto w-full max-w-[430px]" : "w-full"}>
              <div className={`relative overflow-hidden rounded-[24px] bg-[#07111f] shadow-[0_18px_45px_rgba(7,17,31,0.2)] ${video.platform === "tiktok" ? "aspect-[9/16]" : "aspect-video"}`}>
                {optimizedThumbnail ? (
                  <Image fill preload sizes={video.platform === "tiktok" ? "(max-width: 640px) 100vw, 430px" : "(max-width: 1024px) 100vw, 800px"} src={thumbnail} alt={title} className="object-cover" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={thumbnail} alt={title} className="absolute inset-0 h-full w-full object-cover" />
                )}
                <iframe
                  src={embedUrl}
                  title={title}
                  className="absolute inset-0 z-10 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  allowFullScreen
                  loading="eager"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>

            <div className="lg:pt-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d4146f]">{cityVideoUi[language].page.eyebrow}</p>
              <h1 className="mt-3 text-balance text-3xl font-black leading-[1.05] tracking-[-0.04em] sm:text-4xl">{title}</h1>
              <p className="mt-5 text-base leading-7 text-slate-700">{description}</p>
              <dl className="mt-6 border-y border-black/10 py-4 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-black">{copy.date}</dt>
                  <dd className="text-right text-slate-600"><time dateTime={video.date}>{eventDate}</time></dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-xl bg-[#d4146f] px-5 text-sm font-black text-white">{copy.original} ↗</a>
                {video.relatedUrl ? (
                  video.relatedUrl.startsWith("/")
                    ? <Link href={`${video.relatedUrl}${video.relatedUrl.includes("?") ? "&" : "?"}lang=${language}`} className="inline-flex min-h-12 items-center rounded-xl border border-black/10 bg-white px-5 text-sm font-black">{copy.related} →</Link>
                    : <a href={video.relatedUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-xl border border-black/10 bg-white px-5 text-sm font-black">{copy.related} ↗</a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
