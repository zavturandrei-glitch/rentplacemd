import Script from "next/script";
import ApartmentDetails from "@/components/ApartmentDetails";
import { apartmentDetailsById } from "@/data/apartments";
import { getApartmentJsonLd, getApartmentMetadata } from "@/data/apartmentSeo";

export const metadata = getApartmentMetadata(13);

export default function ApartmentPage() {
  const jsonLd = getApartmentJsonLd(13);

  return (
    <>
      <Script
        id="apartment-13-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ApartmentDetails apartment={apartmentDetailsById[13]} />
    </>
  );
}
