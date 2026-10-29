import { createHash } from "node:crypto";
import { requireAdmin } from "@/lib/adminAuth";
import { eventSql } from "@/lib/eventStore";
import { isEventAdminSameOrigin } from "@/lib/eventRequest";

export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!(await requireAdmin())) return Response.json({ error: "Требуется вход" }, { status: 401 });
  if (!isEventAdminSameOrigin(request)) return Response.json({ error: "Недопустимый источник" }, { status: 403 });
  if (Number(request.headers.get("content-length") || 0) > 1_100_000) return Response.json({ error: "Максимум 1 MB" }, { status: 413 });
  try {
    const form = await request.formData();
    const file = form.get("file");
    const source = new URL(String(form.get("source")));
    const rights = String(form.get("rights") ?? "").trim();
    if (!(file instanceof File) || file.size > 1_000_000 || file.size < 12 || source.protocol !== "https:" || source.username || source.password || rights.length < 10 || rights.length > 1000) throw new Error("Заполните источник, права (от 10 символов), файл до 1 MB");
    const bytes = Buffer.from(await file.arrayBuffer());
    const mime = bytes.subarray(0, 4).toString() === "RIFF" && bytes.subarray(8, 12).toString() === "WEBP" ? "image/webp"
      : bytes.subarray(4, 8).toString() === "ftyp" && ["avif", "avis"].includes(bytes.subarray(8, 12).toString()) ? "image/avif"
      : bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 ? "image/jpeg"
      : bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) ? "image/png" : null;
    if (!mime) throw new Error("Поддерживаются WebP, AVIF, JPEG и PNG; SVG не принимается");
    const id = createHash("sha256").update(bytes).update(source.href).update(rights).digest("hex");
    const sql = await eventSql();
    await sql`INSERT INTO rentplace_event_images (id, bytes, mime, source, rights) VALUES (${id}, decode(${bytes.toString("hex")}, 'hex'), ${mime}, ${source.href}, ${rights}) ON CONFLICT DO NOTHING`;
    return Response.json({ path: `/event-images/${id}`, source: source.href, rights });
  } catch { return Response.json({ error: "Не удалось загрузить: проверьте формат, размер, источник, права и подключение БД" }, { status: 400 }); }
}
