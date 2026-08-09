const DATABASE_NAME = "data-science-quest-week-materials";
const STORE_NAME = "pdfs";
const DATABASE_VERSION = 1;

type StoredWeekPdf = {
  week: number;
  blob: Blob;
  fileName: string;
  createdAt: string;
};

function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = window.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: "week" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Não foi possível abrir o armazenamento de materiais."));
  });
}

export async function saveWeekPdf(week: number, file: File) {
  if (file.type !== "application/pdf") throw new Error("Selecione um arquivo PDF.");
  if (file.size > 30 * 1024 * 1024) throw new Error("O PDF deve ter no máximo 30 MB.");
  const database = await openDatabase();
  const record: StoredWeekPdf = { week, blob: file, fileName: file.name, createdAt: new Date().toISOString() };
  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).put(record);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error ?? new Error("Não foi possível vincular o PDF."));
  });
  database.close();
  return { fileName: file.name, createdAt: record.createdAt };
}

export async function loadWeekPdf(week: number) {
  const database = await openDatabase();
  const record = await new Promise<StoredWeekPdf | undefined>((resolve, reject) => {
    const request = database.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME).get(week);
    request.onsuccess = () => resolve(request.result as StoredWeekPdf | undefined);
    request.onerror = () => reject(request.error ?? new Error("Não foi possível abrir o PDF."));
  });
  database.close();
  return record ?? null;
}
