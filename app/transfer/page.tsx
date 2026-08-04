import type { Metadata } from "next";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import InfoPage from "@/components/InfoPage";
import JsonLdScript from "@/components/JsonLdScript";
import { buildInfoJsonLd, getInfoMetadata } from "@/lib/infoSeo";

type PageProps = { searchParams: Promise<{ lang?: string | string[] }> };
const first = (value?: string | string[]) => Array.isArray(value) ? value[0] : value;

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return getInfoMetadata("transfer", first((await searchParams).lang));
}

export default async function TransferPage({ searchParams }: PageProps) {
  const language = first((await searchParams).lang);
  return (
    <main className="min-h-screen bg-[#fffaf0]">
      <JsonLdScript id="transfer-jsonld" data={buildInfoJsonLd("transfer", language)} />
      <Header />
      <BackButton />
      <InfoPage kind="transfer" />
      <Footer />
    </main>
  );
}
