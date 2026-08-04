import { env } from "cloudflare:workers";
import { getChatGPTUser } from "@/app/chatgpt-auth";

export async function getOwnerId() {
  const user = await getChatGPTUser();
  return user?.userId ?? "local-preview";
}

export function getRawDb() {
  if (!env.DB) throw new Error("O armazenamento de estudos ainda não está disponível.");
  return env.DB;
}

export function getAssetsBucket() {
  const bucket = (env as unknown as { STUDY_ASSETS?: R2Bucket }).STUDY_ASSETS;
  if (!bucket) throw new Error("O armazenamento de imagens ainda não está disponível.");
  return bucket;
}

export async function ensureStudySchema(db: D1Database) {
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS study_records (
      id TEXT PRIMARY KEY,
      owner_id TEXT NOT NULL,
      kind TEXT NOT NULL,
      record_key TEXT NOT NULL,
      payload TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare(`CREATE UNIQUE INDEX IF NOT EXISTS idx_study_records_owner_kind_key
      ON study_records(owner_id, kind, record_key)`),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_study_records_owner_kind
      ON study_records(owner_id, kind)`),
    db.prepare(`CREATE TABLE IF NOT EXISTS attachments (
      id TEXT PRIMARY KEY,
      owner_id TEXT NOT NULL,
      object_key TEXT NOT NULL UNIQUE,
      file_name TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_attachments_owner
      ON attachments(owner_id)`),
  ]);
}
