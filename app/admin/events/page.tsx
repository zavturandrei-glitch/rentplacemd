import type { Metadata } from "next";
import AdminEventsManager from "@/components/AdminEventsManager";

export const metadata: Metadata = { title: "События — RentPlaceMD Admin", robots: { index: false, follow: false } };
export default function AdminEventsPage() { return <AdminEventsManager />; }
