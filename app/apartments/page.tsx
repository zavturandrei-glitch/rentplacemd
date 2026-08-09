import type { Metadata } from "next";
import Header from "@/components/Header";
import HomeCategoryLinks from "@/components/HomeCategoryLinks";
import ApartmentCategoryNav from "@/components/ApartmentCategoryNav";
import ApartmentCategoryContent from "@/components/ApartmentCategoryContent";
import Footer from "@/components/Footer";
import JsonLdScript from "@/components/JsonLdScript";
import {
  getApartmentsPageMetadata,
  getApartmentCategoryMenuJsonLd,
} from "@/lib/seo";

type ApartmentsPageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export async function generateMetadata({ searchParams }: ApartmentsPageProps): Promise<Metadata> {
  const { lang } = await searchParams;
  return getApartmentsPageMetadata(typeof lang === "string" ? lang : undefined);
}

export default async function ApartmentsPage({ searchParams }: ApartmentsPageProps) {
  const { lang } = await searchParams;
  const jsonLd = getApartmentCategoryMenuJsonLd(typeof lang === "string" ? lang : undefined);

  return (
    <main className="min-h-screen bg-[#111b2a]">
      <JsonLdScript
        id="apartment-categories-jsonld"
        data={jsonLd}
      />
      <Header />
      <ApartmentCategoryNav backHref="/" />
      <HomeCategoryLinks />
      <ApartmentCategoryContent compactCatalog />
      <Footer />
    </main>
  );
}
