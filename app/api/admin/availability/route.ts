import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { readApartmentAvailability, readAvailability, setDateAvailability, type AvailabilityStatus } from "@/lib/availabilityStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Требуется вход администратора." }, { status: 401 });
  }

  const apartmentId = request.nextUrl.searchParams.get("apartmentId");
  if (apartmentId) {
    return Response.json(await readApartmentAvailability(apartmentId));
  }

  return Response.json({ records: await readAvailability() });
}

export async function PATCH(request: NextRequest) {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Требуется вход администратора." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    apartmentId?: string;
    date?: string;
    status?: AvailabilityStatus;
  } | null;

  if (!body?.apartmentId || !body.date || (body.status !== "booked" && body.status !== "free")) {
    return Response.json({ error: "Нужны apartmentId, date и status." }, { status: 400 });
  }

  try {
    return Response.json(await setDateAvailability(body.apartmentId, body.date, body.status));
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Не удалось сохранить дату." },
      { status: 500 },
    );
  }
}
