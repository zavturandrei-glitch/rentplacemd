import Script from "next/script";
import ApartmentDetails from "@/components/ApartmentDetails";
import { apartmentDetailsById } from "@/data/apartments";
import { getApartmentJsonLd, getApartmentMetadata } from "@/data/apartmentSeo";

export const metadata = getApartmentMetadata(22);

export default function ApartmentPage() {
  const jsonLd = getApartmentJsonLd(22);

  return (
    <>
      <Script
        id="apartment-22-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ApartmentDetails apartment={apartmentDetailsById[22]} />
    </>
  );
}
