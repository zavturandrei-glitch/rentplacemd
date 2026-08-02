import type { Metadata } from "next";
import AdminVideosManager from "@/components/AdminVideosManager";

export const metadata: Metadata = {
  title: "Видео — RentPlaceMD Admin",
  robots: { index: false, follow: false },
};

export default function AdminVideosPage() {
  return <AdminVideosManager />;
}
