const DATABASE_NAME = "data-science-quest-assets";
const STORE_NAME = "images";
const DATABASE_VERSION = 1;

type StoredImage = {
  id: string;
  blob: Blob;
  fileName: string;
  mimeType: string;
  createdAt: string;
};

function openAssetsDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = window.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Não foi possível abrir o armazenamento de imagens."));
  });
}

export async function saveStudyImage(file: File) {
  const database = await openAssetsDatabase();
  const id = crypto.randomUUID();
  const record: StoredImage = {
    id,
    blob: file,
    fileName: file.name,
    mimeType: file.type,
    createdAt: new Date().toISOString(),
  };

  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).put(record);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error ?? new Error("Não foi possível salvar a imagem."));
  });
  database.close();

  return { id, fileName: file.name, url: `/local-assets/${id}` };
}

export async function loadStudyImage(id: string) {
  const database = await openAssetsDatabase();
  const record = await new Promise<StoredImage | undefined>((resolve, reject) => {
    const request = database.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME).get(id);
    request.onsuccess = () => resolve(request.result as StoredImage | undefined);
    request.onerror = () => reject(request.error ?? new Error("Não foi possível abrir a imagem."));
  });
  database.close();
  return record?.blob ?? null;
}
