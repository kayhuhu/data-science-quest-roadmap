import { ensureStudySchema, getOwnerId, getRawDb } from "@/lib/persistence";

const allowedKinds = new Set([
  "workspace",
  "note",
  "session",
  "error",
  "settings",
]);

function safeJson(value: string) {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const kind = url.searchParams.get("kind") ?? "workspace";
    const key = url.searchParams.get("key");
    if (!allowedKinds.has(kind)) {
      return Response.json({ error: "Tipo de registro inválido." }, { status: 400 });
    }

    const ownerId = await getOwnerId();
    const db = getRawDb();
    await ensureStudySchema(db);
    const query = key
      ? db
          .prepare(
            "SELECT record_key, payload, updated_at FROM study_records WHERE owner_id = ? AND kind = ? AND record_key = ? LIMIT 1",
          )
          .bind(ownerId, kind, key)
      : db
          .prepare(
            "SELECT record_key, payload, updated_at FROM study_records WHERE owner_id = ? AND kind = ? ORDER BY updated_at DESC LIMIT 200",
          )
          .bind(ownerId, kind);
    const result = await query.all<{ record_key: string; payload: string; updated_at: string }>();
    const records = result.results.map((row) => ({
      key: row.record_key,
      value: safeJson(row.payload),
      updatedAt: row.updated_at,
    }));
    return Response.json({ records });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao carregar os estudos.";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { kind?: string; key?: string; value?: unknown };
    const kind = body.kind ?? "workspace";
    const key = body.key?.trim() ?? "main";
    if (!allowedKinds.has(kind) || !key || key.length > 120) {
      return Response.json({ error: "Registro inválido." }, { status: 400 });
    }
    const payload = JSON.stringify(body.value ?? null);
    if (payload.length > 750_000) {
      return Response.json({ error: "O registro ultrapassa o limite permitido." }, { status: 413 });
    }

    const ownerId = await getOwnerId();
    const db = getRawDb();
    await ensureStudySchema(db);
    const id = crypto.randomUUID();
    await db
      .prepare(
        `INSERT INTO study_records (id, owner_id, kind, record_key, payload)
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(owner_id, kind, record_key)
         DO UPDATE SET payload = excluded.payload, updated_at = CURRENT_TIMESTAMP`,
      )
      .bind(id, ownerId, kind, key, payload)
      .run();
    return Response.json({ ok: true, updatedAt: new Date().toISOString() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao salvar os estudos.";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const kind = url.searchParams.get("kind") ?? "workspace";
    const key = url.searchParams.get("key") ?? "";
    if (!allowedKinds.has(kind) || !key) {
      return Response.json({ error: "Registro inválido." }, { status: 400 });
    }
    const ownerId = await getOwnerId();
    const db = getRawDb();
    await ensureStudySchema(db);
    await db
      .prepare("DELETE FROM study_records WHERE owner_id = ? AND kind = ? AND record_key = ?")
      .bind(ownerId, kind, key)
      .run();
    return Response.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao excluir o registro.";
    return Response.json({ error: message }, { status: 500 });
  }
}
