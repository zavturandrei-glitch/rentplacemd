import { NextRequest } from "next/server";
import { readApartmentAvailability, readAvailability } from "@/lib/availabilityStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const apartmentId = request.nextUrl.searchParams.get("apartmentId");

  try {
    if (apartmentId) {
      return Response.json(await readApartmentAvailability(apartmentId));
    }

    return Response.json({ records: await readAvailability() });
  } catch {
    return Response.json({ error: "Не удалось загрузить календарь занятости." }, { status: 500 });
  }
}
