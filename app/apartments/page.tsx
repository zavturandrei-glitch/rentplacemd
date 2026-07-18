import type { Metadata } from "next";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import ApartmentCategoryMenu from "@/components/ApartmentCategoryMenu";
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
    <main className="min-h-screen bg-[#efeee9]">
      <JsonLdScript
        id="apartment-categories-jsonld"
        data={jsonLd}
      />
      <Header />
      <BackButton />
      <ApartmentCategoryMenu />
      <Footer />
    </main>
  );
}
