import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import ApartmentDetails from "@/components/ApartmentDetails";
import {
  apartmentDetailsById,
  apartments,
  getApartmentBySlug,
} from "@/lib/apartments";
import { getApartmentJsonLd, getApartmentMetadata } from "@/lib/seo";

type ApartmentPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return apartments.map((apartment) => ({
    slug: apartment.slug,
  }));
}

export async function generateMetadata({
  params,
}: ApartmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const apartment = getApartmentBySlug(slug);

  if (!apartment) {
    return {};
  }

  return getApartmentMetadata(apartment.id);
}

export default async function ApartmentPage({ params }: ApartmentPageProps) {
  const { slug } = await params;
  const apartment = getApartmentBySlug(slug);

  if (!apartment) {
    notFound();
  }

  const jsonLd = getApartmentJsonLd(apartment.id);

  return (
    <>
      <Script
        id={"apartment-" + apartment.id + "-structured-data"}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ApartmentDetails apartment={apartmentDetailsById[apartment.id]} />
    </>
  );
}
