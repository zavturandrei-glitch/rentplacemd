import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import ApartmentDetails, {
  type ApartmentLocalizedSeoPayload,
} from "@/components/ApartmentDetails";
import {
  apartmentDetailsById,
  activeApartments,
  getActiveApartmentBySlug,
} from "@/lib/apartments";
import {
  buildApartmentDescription,
  buildApartmentTitle,
  getApartmentJsonLd,
  getApartmentMetadata,
} from "@/lib/seo";
import type { Language } from "@/locales/translations";

type ApartmentPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return activeApartments.map((apartment) => ({
    slug: apartment.slug,
  }));
}

export async function generateMetadata({
  params,
}: ApartmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const apartment = getActiveApartmentBySlug(slug);

  if (!apartment) {
    return {};
  }

  return getApartmentMetadata(apartment.id);
}

export default async function ApartmentPage({ params }: ApartmentPageProps) {
  const { slug } = await params;
  const apartment = getActiveApartmentBySlug(slug);

  if (!apartment) {
    notFound();
  }

  const jsonLd = getApartmentJsonLd(apartment.id);
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
      <Script
        id={"apartment-" + apartment.id + "-structured-data"}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ApartmentDetails
        apartment={apartmentDetailsById[apartment.id]}
        localizedSeo={apartment.id === 67 ? localizedSeo : undefined}
      />
    </>
  );
}
