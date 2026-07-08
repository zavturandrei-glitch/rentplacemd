import { requireAdmin } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BEDBOOKING_ICAL_URL = process.env.BEDBOOKING_ICAL_URL || "";

function unfoldIcs(text: string) {
  return text.replace(/\r?\n[ \t]/g, "");
}

function parseIcsEvents(text: string) {
  const clean = unfoldIcs(text);
  const blocks = clean.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) ?? [];

  return blocks.map((block) => {
    const get = (name: string) => {
      const match = block.match(new RegExp("^" + name + "(?:;[^:]*)?:(.*)$", "m"));
      return match?.[1]?.trim() ?? "";
    };

    return {
      dtstart: get("DTSTART"),
      dtend: get("DTEND"),
      uid: get("UID"),
      summary: get("SUMMARY"),
      description: get("DESCRIPTION"),
      raw: block,
    };
  });
}

export async function GET() {
  if (!(await requireAdmin())) {
    return Response.json(
      { error: "Требуется вход администратора." },
      { status: 401 }
    );
  }

  if (!BEDBOOKING_ICAL_URL) {
    return Response.json(
      { error: "BEDBOOKING_ICAL_URL не задан в .env.local" },
      { status: 500 }
    );
  }

  const response = await fetch(BEDBOOKING_ICAL_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    return Response.json(
      {
        error: "Не удалось скачать iCal",
        status: response.status,
      },
      { status: 500 }
    );
  }

  const text = await response.text();
  const events = parseIcsEvents(text);

  const hasApartmentInfo = events.some((event) => {
    const data = [
      event.summary,
      event.description,
      event.uid,
      event.raw,
    ]
      .join(" ")
      .toLowerCase();

    return (
      data.includes("room") ||
      data.includes("apartment") ||
      data.includes("property") ||
      data.includes("roomid") ||
      data.includes("квартира")
    );
  });

  return Response.json({
    source: "BedBooking iCal",
    eventsCount: events.length,
    hasApartmentInfo,
    warning: hasApartmentInfo
      ? "В календаре обнаружены возможные признаки квартиры."
      : "Название квартиры или ID комнаты не найдены.",
    events: events.map((event) => ({
      start: event.dtstart,
      end: event.dtend,
      uid: event.uid,
      summary: event.summary,
      description: event.description,
    })),
  });
}