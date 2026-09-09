"use client";

import Link from "@/components/LocalizedLink";
import { useLanguage } from "@/context/LanguageContext";
import { centerApartments } from "@/lib/apartmentDistricts";
import { centerApartmentsContent } from "@/lib/centerApartmentsContent";

export default function ApartmentDistrictLinks() {
  const { language } = useLanguage();
  const copy = centerApartmentsContent[language];

  return (
    <section className="bg-[#111b2a] px-4 pb-8 text-white sm:px-6 lg:px-8" aria-labelledby="apartment-districts-title">
      <div className="mx-auto max-w-7xl rounded-[22px] border border-white/10 bg-white/[0.05] p-5 sm:p-6">
        <h2 id="apartment-districts-title" className="text-xl font-black sm:text-2xl">{copy.districtBlockTitle}</h2>
        <p className="mt-2 max-w-4xl text-sm font-medium leading-6 text-white/68">{copy.districtBlockText(centerApartments.length)}</p>
        <Link href="/apartments/center" className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-[#ffd21f] px-4 text-sm font-black text-[#07111f]">
          {copy.districtBlockLink} →
        </Link>
      </div>
    </section>
  );
}
