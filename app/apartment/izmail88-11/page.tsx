import ApartmentDetails from "@/components/ApartmentDetails";
import { apartmentDetailsById } from "@/data/apartments";

export default function ApartmentPage() {
  return <ApartmentDetails apartment={apartmentDetailsById[11]} />;
}
