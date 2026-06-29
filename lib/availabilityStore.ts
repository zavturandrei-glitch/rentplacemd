import { promises as fs } from "fs";
import path from "path";
import seedAvailability from "@/data/availability.json";
import { apartmentDetailsById } from "@/data/apartments";

export type AvailabilityStatus = "booked" | "free";
export type AvailabilityRecord = {
  apartmentId: string;
  bookedDates: string[];
};

const storeKey = "rentplacemd:availability:v1";
const filePath = path.join(process.cwd(), "data", "availability.json");
const apartmentIds = Object.keys(apartmentDetailsById);
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

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
      if (datePattern.test(date)) {
        byId.get(apartmentId)?.add(date);
      }
    }
  }

  return [...byId.entries()].map(([apartmentId, dates]) => ({
    apartmentId,
    bookedDates: [...dates].sort(),
  }));
}

function getUpstashConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  return url && token ? { url, token } : null;
}

async function upstashCommand<T>(command: unknown[]) {
  const config = getUpstashConfig();
  if (!config) {
    return null;
  }

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + config.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Availability storage request failed");
  }

  const payload = (await response.json()) as { result?: T };
  return payload.result ?? null;
}

export async function readAvailability() {
  const stored = await upstashCommand<string | AvailabilityRecord[]>(["GET", storeKey]);
  if (stored) {
    const parsed = typeof stored === "string" ? JSON.parse(stored) : stored;
    return normalizeRecords(parsed);
  }

  if (process.env.NODE_ENV !== "production") {
    try {
      const file = await fs.readFile(filePath, "utf8");
      return normalizeRecords(JSON.parse(file) as AvailabilityRecord[]);
    } catch {
      return normalizeRecords(seedAvailability);
    }
  }

  return normalizeRecords(seedAvailability);
}

async function writeAvailability(records: AvailabilityRecord[]) {
  const normalized = normalizeRecords(records);
  const serialized = JSON.stringify(normalized, null, 2);

  if (getUpstashConfig()) {
    await upstashCommand(["SET", storeKey, serialized]);
    return normalized;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Persistent availability storage is not configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.");
  }

  await fs.writeFile(filePath, serialized + "\n", "utf8");
  return normalized;
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
