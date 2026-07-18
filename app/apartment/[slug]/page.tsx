import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ApartmentDetails, {
  type ApartmentLocalizedSeoPayload,
} from "@/components/ApartmentDetails";
import JsonLdScript from "@/components/JsonLdScript";
import {
  apartmentDetailsById,
  activeApartments,
  getActiveApartmentBySlug,
} from "@/lib/apartments";
import { hasApartmentLocalization } from "@/lib/apartmentLocalization";
import {
  buildApartmentDescription,
  buildApartmentTitle,
  getApartmentJsonLd,
  getApartmentMetadata,
} from "@/lib/seo";
import type { Language } from "@/locales/translations";

type ApartmentPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

export function generateStaticParams() {
  return activeApartments.map((apartment) => ({
    slug: apartment.slug,
  }));
}

export async function generateMetadata({
  params,
  searchParams,
}: ApartmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { lang } = await searchParams;
  const apartment = getActiveApartmentBySlug(slug);

  if (!apartment) {
    return {};
  }

  return getApartmentMetadata(apartment.id, typeof lang === "string" ? lang : undefined);
}

export default async function ApartmentPage({ params, searchParams }: ApartmentPageProps) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const apartment = getActiveApartmentBySlug(slug);

  if (!apartment) {
    notFound();
  }

  const language = typeof lang === "string" && ["ru", "ro", "en", "uk", "cs"].includes(lang) ? lang as Language : "ru";
  const jsonLd = getApartmentJsonLd(apartment.id, language, typeof lang === "string");
  const languages: Language[] = ["ru", "ro", "en", "uk", "cs"];
  const localizedSeo = Object.fromEntries(
    languages.map((language) => [
      language,
      {
        title: buildApartmentTitle(apartment.id, language),
        description: buildApartmentDescription(apartment.id, language),
        jsonLd: getApartmentJsonLd(apartment.id, language),
      },
    ]),
  ) as ApartmentLocalizedSeoPayload;

  return (
    <>
      <JsonLdScript
        id={"apartment-" + apartment.id + "-jsonld"}
        data={jsonLd}
      />
      <ApartmentDetails
        apartment={apartmentDetailsById[String(apartment.id)]}
        localizedSeo={hasApartmentLocalization(apartment.id) ? localizedSeo : undefined}
      />
    </>
  );
}
