import { eventSql } from "@/lib/eventStore";

export const runtime = "nodejs";
export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!/^[a-f0-9]{64}$/.test(id)) return new Response(null, { status: 404 });
  try {
    const sql = await eventSql();
    const [row] = await sql`SELECT encode(bytes, 'base64') AS data, mime FROM rentplace_event_images WHERE id = ${id}`;
    if (!row) return new Response(null, { status: 404 });
    const record = row as { data: string; mime: string };
    return new Response(Buffer.from(record.data, "base64"), { headers: { "Content-Type": record.mime, "Cache-Control": "public, max-age=31536000, immutable", "X-Content-Type-Options": "nosniff" } });
  } catch { return new Response(null, { status: 503 }); }
}
