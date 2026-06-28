import Script from "next/script";
import ApartmentDetails from "@/components/ApartmentDetails";
import { apartmentDetailsById } from "@/data/apartments";
import { getApartmentJsonLd, getApartmentMetadata } from "@/data/apartmentSeo";

export const metadata = getApartmentMetadata(12);

export default function ApartmentPage() {
  const jsonLd = getApartmentJsonLd(12);

  return (
    <>
      <Script
        id="apartment-12-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ApartmentDetails apartment={apartmentDetailsById[12]} />
    </>
  );
}
