import Script from "next/script";
import ApartmentDetails from "@/components/ApartmentDetails";
import { apartmentDetailsById } from "@/data/apartments";
import { getApartmentJsonLd, getApartmentMetadata } from "@/data/apartmentSeo";

export const metadata = getApartmentMetadata(10);

export default function ApartmentPage() {
  const jsonLd = getApartmentJsonLd(10);

  return (
    <>
      <Script
        id="apartment-10-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ApartmentDetails apartment={apartmentDetailsById[10]} />
    </>
  );
}
