import { promises as fs } from "fs";
import path from "path";
import seedAvailability from "@/data/availability.json";
import { apartments } from "@/lib/apartments";
import { isPastChisinauDate } from "@/lib/chisinauDate";

export type AvailabilityStatus = "booked" | "free";
export type AvailabilityRecord = {
  apartmentId: string;
  bookedDates: string[];
};

type BookedDateRow = {
  apartment_id: string;
  booked_date: string | Date;
};

const filePath = path.join(process.cwd(), "data", "availability.json");
const apartmentIds = apartments.map((apartment) => String(apartment.id));
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const tableName = "availability_booked_dates";

function normalizeDate(value: string | Date) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return String(value).slice(0, 10);
}

function normalizeRecords(records: AvailabilityRecord[]) {
  const byId = new Map<string, Set<string>>();

  for (const apartmentId of apartmentIds) {
    byId.set(apartmentId, new Set());
  }

  for (const record of records) {
    const apartmentId = String(record.apartmentId);
    if (!byId.has(apartmentId)) {
      continue;
    }

    for (const date of record.bookedDates ?? []) {
      const normalizedDate = normalizeDate(date);
      if (datePattern.test(normalizedDate)) {
        byId.get(apartmentId)?.add(normalizedDate);
      }
    }
  }

  return [...byId.entries()].map(([apartmentId, dates]) => ({
    apartmentId,
    bookedDates: [...dates].sort(),
  }));
}

function recordsFromRows(rows: BookedDateRow[]) {
  const byId = new Map<string, string[]>();

  for (const apartmentId of apartmentIds) {
    byId.set(apartmentId, []);
  }

  for (const row of rows) {
    const apartmentId = String(row.apartment_id);
    const date = normalizeDate(row.booked_date);

    if (byId.has(apartmentId) && datePattern.test(date)) {
      byId.get(apartmentId)?.push(date);
    }
  }

  return normalizeRecords(
    [...byId.entries()].map(([apartmentId, bookedDates]) => ({ apartmentId, bookedDates })),
  );
}

function getPostgresUrl() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL || "";
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

  return url && key ? { url: url.replace(/\/$/, ""), key } : null;
}

async function getNeonSql() {
  const databaseUrl = getPostgresUrl();
  if (!databaseUrl) {
    return null;
  }

  const { neon } = await import("@neondatabase/serverless");
  return neon(databaseUrl);
}

async function ensureNeonTable() {
  const sql = await getNeonSql();
  if (!sql) {
    return null;
  }

  await sql`CREATE TABLE IF NOT EXISTS availability_booked_dates (
    apartment_id text NOT NULL,
    booked_date date NOT NULL,
    source text NOT NULL DEFAULT 'manual',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (apartment_id, booked_date)
  )`;

  return sql;
}

async function readFromNeon() {
  const sql = await ensureNeonTable();
  if (!sql) {
    return null;
  }

  const rows = await sql`SELECT apartment_id, booked_date FROM availability_booked_dates ORDER BY apartment_id, booked_date`;
  return recordsFromRows(rows as BookedDateRow[]);
}

async function setDateInNeon(apartmentId: string, date: string, status: AvailabilityStatus) {
  const sql = await ensureNeonTable();
  if (!sql) {
    return null;
  }

  if (status === "booked") {
    await sql`INSERT INTO availability_booked_dates (apartment_id, booked_date, source, updated_at)
      VALUES (${apartmentId}, ${date}::date, 'manual', now())
      ON CONFLICT (apartment_id, booked_date)
      DO UPDATE SET source = 'manual', updated_at = now()`;
  } else {
    await sql`DELETE FROM availability_booked_dates WHERE apartment_id = ${apartmentId} AND booked_date = ${date}::date`;
  }

  return readApartmentAvailability(apartmentId);
}

async function supabaseFetch(pathname: string, init?: RequestInit) {
  const config = getSupabaseConfig();
  if (!config) {
    return null;
  }

  const response = await fetch(config.url + "/rest/v1/" + pathname, {
    ...init,
    headers: {
      apikey: config.key,
      Authorization: "Bearer " + config.key,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text().catch(() => "");
    throw new Error("Supabase calendar storage error: " + (message || response.status));
  }

  return response;
}

async function readFromSupabase() {
  const response = await supabaseFetch(tableName + "?select=apartment_id,booked_date&order=apartment_id.asc,booked_date.asc");
  if (!response) {
    return null;
  }

  const rows = (await response.json()) as BookedDateRow[];
  return recordsFromRows(rows);
}

async function setDateInSupabase(apartmentId: string, date: string, status: AvailabilityStatus) {
  if (!getSupabaseConfig()) {
    return null;
  }

  if (status === "booked") {
    await supabaseFetch(tableName + "?on_conflict=apartment_id,booked_date", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates" },
      body: JSON.stringify({ apartment_id: apartmentId, booked_date: date, source: "manual" }),
    });
  } else {
    await supabaseFetch(
      tableName + "?apartment_id=eq." + encodeURIComponent(apartmentId) + "&booked_date=eq." + encodeURIComponent(date),
      { method: "DELETE" },
    );
  }

  return readApartmentAvailability(apartmentId);
}

async function readFromLocalFile() {
  try {
    const file = await fs.readFile(filePath, "utf8");
    return normalizeRecords(JSON.parse(file) as AvailabilityRecord[]);
  } catch {
    return normalizeRecords(seedAvailability);
  }
}

async function writeLocalFile(records: AvailabilityRecord[]) {
  const normalized = normalizeRecords(records);
  await fs.writeFile(filePath, JSON.stringify(normalized, null, 2) + "\n", "utf8");
  return normalized;
}

function getMissingStorageError() {
  return "Хранилище календаря не настроено. Добавьте в Vercel DATABASE_URL от Neon PostgreSQL или SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY от Supabase.";
}

export async function readAvailability() {
  const neonRecords = await readFromNeon();
  if (neonRecords) {
    return neonRecords;
  }

  const supabaseRecords = await readFromSupabase();
  if (supabaseRecords) {
    return supabaseRecords;
  }

  if (process.env.NODE_ENV !== "production") {
    return readFromLocalFile();
  }

  return normalizeRecords(seedAvailability);
}

async function writeAvailability(records: AvailabilityRecord[]) {
  if (process.env.NODE_ENV === "production") {
    throw new Error(getMissingStorageError());
  }

  return writeLocalFile(records);
}

export async function readApartmentAvailability(apartmentId: string | number) {
  const records = await readAvailability();
  return records.find((record) => record.apartmentId === String(apartmentId)) ?? {
    apartmentId: String(apartmentId),
    bookedDates: [],
  };
}

export async function setDateAvailability(apartmentId: string | number, date: string, status: AvailabilityStatus) {
  const normalizedApartmentId = String(apartmentId);

  if (!apartmentIds.includes(normalizedApartmentId)) {
    throw new Error("Unknown apartment ID");
  }

  if (!datePattern.test(date)) {
    throw new Error("Invalid date format");
  }

  if (isPastChisinauDate(date)) {
    throw new Error("Past dates cannot be changed");
  }

  const neonRecord = await setDateInNeon(normalizedApartmentId, date, status);
  if (neonRecord) {
    return neonRecord;
  }

  const supabaseRecord = await setDateInSupabase(normalizedApartmentId, date, status);
  if (supabaseRecord) {
    return supabaseRecord;
  }

  const records = await readAvailability();
  const nextRecords = records.map((record) => {
    if (record.apartmentId !== normalizedApartmentId) {
      return record;
    }

    const dates = new Set(record.bookedDates);
    if (status === "booked") {
      dates.add(date);
    } else {
      dates.delete(date);
    }

    return {
      apartmentId: record.apartmentId,
      bookedDates: [...dates].sort(),
    };
  });

  const savedRecords = await writeAvailability(nextRecords);
  return savedRecords.find((record) => record.apartmentId === normalizedApartmentId) ?? {
    apartmentId: normalizedApartmentId,
    bookedDates: [],
  };
}
