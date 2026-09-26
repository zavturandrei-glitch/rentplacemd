import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import CarRentalPage from "@/components/CarRentalPage";
import { getTravelMetadata } from "@/lib/travelSeo";

type Props = { searchParams: Promise<{ lang?: string | string[] }> };
export async function generateMetadata({ searchParams }: Props) {
  const { lang } = await searchParams;
  return getTravelMetadata("car-rental", Array.isArray(lang) ? lang[0] : lang);
}
export default function Page() {
  return <main className="min-h-screen bg-[#f5f1e8]"><Header /><BackButton /><CarRentalPage /><Footer /></main>;
}
