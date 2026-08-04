import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLdScript from "@/components/JsonLdScript";
import OwnersPage from "@/components/OwnersPage";
import { buildOwnersJsonLd, getOwnersMetadata } from "@/lib/ownersContent";

type PageProps = { searchParams: Promise<{ lang?: string | string[] }> };
const first = (value?: string | string[]) => Array.isArray(value) ? value[0] : value;

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return getOwnersMetadata(first((await searchParams).lang));
}

export default async function OwnersRoute({ searchParams }: PageProps) {
  const language = first((await searchParams).lang);

  return (
    <main className="mobile-dark-page min-h-screen bg-[#fffaf0]">
      <JsonLdScript id="owners-jsonld" data={buildOwnersJsonLd(language)} />
      <Header showBack preserveDesktopBack />
      <OwnersPage />
      <Footer />
    </main>
  );
}
