import type { Metadata } from "next";
import BackButton from "@/components/BackButton";
import BookingTermsPage from "@/components/BookingTermsPage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLdScript from "@/components/JsonLdScript";
import {
  buildBookingTermsJsonLd,
  getBookingTermsMetadata,
} from "@/lib/bookingTerms";

type PageProps = { searchParams: Promise<{ lang?: string | string[] }> };
const first = (value?: string | string[]) => Array.isArray(value) ? value[0] : value;

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return getBookingTermsMetadata(first((await searchParams).lang));
}

export default async function BookingTermsRoute({ searchParams }: PageProps) {
  const language = first((await searchParams).lang);
  return (
    <main className="min-h-screen overflow-x-clip bg-[#faf9f6]">
      <JsonLdScript id="booking-terms-jsonld" data={buildBookingTermsJsonLd(language)} />
      <Header />
      <BackButton />
      <BookingTermsPage />
      <Footer />
    </main>
  );
}
