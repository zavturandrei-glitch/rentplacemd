"use client";

import { useEffect, useState } from "react";
import { chisinauDate } from "@/lib/eventDates";

export function useCalendarDate(initialDate: string) {
  const [date, setDate] = useState(initialDate);
  useEffect(() => {
    const refresh = () => setDate(chisinauDate());
    refresh();
    const timer = setInterval(refresh, 30_000);
    document.addEventListener("visibilitychange", refresh);
    return () => { clearInterval(timer); document.removeEventListener("visibilitychange", refresh); };
  }, []);
  return date;
}
