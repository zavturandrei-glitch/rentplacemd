import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import ApartmentCategoryNav from "@/components/ApartmentCategoryNav";
import JsonLdScript from "@/components/JsonLdScript";
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
  searchParams: Promise<{ lang?: string | string[] }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return apartmentCategoryOrder.map((category) => ({
    category: apartmentClassToSlug[category],
  }));
}

export async function generateMetadata({
  params,
  searchParams,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const { lang } = await searchParams;
  const apartmentClass = getApartmentClassBySlug(categorySlug);

  if (!apartmentClass) {
    return {};
  }

  return getApartmentCategoryMetadata(apartmentClass, typeof lang === "string" ? lang : undefined);
}

export default async function ApartmentCategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const { lang } = await searchParams;
  const apartmentClass = getApartmentClassBySlug(categorySlug);

  if (!apartmentClass) {
    notFound();
  }

  const jsonLd = getApartmentCategoryJsonLd(apartmentClass, typeof lang === "string" ? lang : undefined);

  return (
    <main className="min-h-screen bg-[#fffaf0]">
      <JsonLdScript
        id={"apartment-category-" + categorySlug + "-jsonld"}
        data={jsonLd}
      />
      <Header />
      <BackButton />
      <ApartmentCategoryNav currentClass={apartmentClass} />
      <TodayFree selectedClass={apartmentClass} />
      <Footer />
    </main>
  );
}
