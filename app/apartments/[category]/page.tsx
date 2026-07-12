import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import ApartmentCategoryNav from "@/components/ApartmentCategoryNav";
import TodayFree from "@/components/TodayFree";
import Footer from "@/components/Footer";
import {
  apartmentClassToSlug,
  apartmentCategoryOrder,
  getApartmentClassBySlug,
} from "@/lib/apartments";
import {
  getApartmentCategoryJsonLd,
  getApartmentCategoryMetadata,
} from "@/lib/seo";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return apartmentCategoryOrder.map((category) => ({
    category: apartmentClassToSlug[category],
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const apartmentClass = getApartmentClassBySlug(categorySlug);

  if (!apartmentClass) {
    return {};
  }

  return getApartmentCategoryMetadata(apartmentClass);
}

export default async function ApartmentCategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const apartmentClass = getApartmentClassBySlug(categorySlug);

  if (!apartmentClass) {
    notFound();
  }

  const jsonLd = getApartmentCategoryJsonLd(apartmentClass);

  return (
    <main className="min-h-screen bg-[#fffaf0]">
      <Script
        id={"apartment-category-" + categorySlug + "-structured-data"}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <BackButton />
      <ApartmentCategoryNav currentClass={apartmentClass} />
      <TodayFree selectedClass={apartmentClass} />
      <Footer />
    </main>
  );
}
