import {
  ensureStudySchema,
  getAssetsBucket,
  getOwnerId,
  getRawDb,
} from "@/lib/persistence";

const MAX_SIZE = 8 * 1024 * 1024;
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function safeFileName(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100);
}

export async function POST(request: Request) {
  try {
    const ownerId = await getOwnerId();
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File) || !allowedTypes.has(file.type)) {
      return Response.json({ error: "Envie uma imagem JPG, PNG, WebP ou GIF." }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return Response.json({ error: "A imagem deve ter no máximo 8 MB." }, { status: 413 });
    }

    const id = crypto.randomUUID();
    const objectKey = `${ownerId}/${new Date().toISOString().slice(0, 10)}/${id}-${safeFileName(file.name)}`;
    const bucket = getAssetsBucket();
    await bucket.put(objectKey, file.stream(), {
      httpMetadata: { contentType: file.type },
      customMetadata: { ownerId, originalName: file.name },
    });

    const db = getRawDb();
    await ensureStudySchema(db);
    await db
      .prepare(
        "INSERT INTO attachments (id, owner_id, object_key, file_name, mime_type, size) VALUES (?, ?, ?, ?, ?, ?)",
      )
      .bind(id, ownerId, objectKey, file.name, file.type, file.size)
      .run();

    return Response.json({
      id,
      fileName: file.name,
      url: `/api/uploads?key=${encodeURIComponent(objectKey)}`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao enviar a imagem.";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const ownerId = await getOwnerId();
    const key = new URL(request.url).searchParams.get("key") ?? "";
    if (!key.startsWith(`${ownerId}/`)) {
      return new Response("Não autorizado", { status: 403 });
    }
    const object = await getAssetsBucket().get(key);
    if (!object) return new Response("Imagem não encontrada", { status: 404 });
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    headers.set("cache-control", "private, max-age=3600");
    return new Response(object.body, { headers });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao abrir a imagem.";
    return new Response(message, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const ownerId = await getOwnerId();
    const key = new URL(request.url).searchParams.get("key") ?? "";
    if (!key.startsWith(`${ownerId}/`)) {
      return Response.json({ error: "Não autorizado." }, { status: 403 });
    }
    await getAssetsBucket().delete(key);
    const db = getRawDb();
    await ensureStudySchema(db);
    await db
      .prepare("DELETE FROM attachments WHERE owner_id = ? AND object_key = ?")
      .bind(ownerId, key)
      .run();
    return Response.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao excluir a imagem.";
    return Response.json({ error: message }, { status: 500 });
  }
}
