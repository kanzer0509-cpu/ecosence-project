const DB_NAME = 'ecosense-db';
const DB_VERSION = 1;
const STORE_NAME = 'spikes';

export interface StoredSpike {
  id?: number;
  timestamp: string;
  db: number;
  createdAt: string;
}

export const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveSpike = async (spike: Omit<StoredSpike, 'id'>) => {
  const db = await openDatabase();

  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const request = transaction.objectStore(STORE_NAME).add(spike);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getSpikes = async (): Promise<StoredSpike[]> => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const request = transaction.objectStore(STORE_NAME).getAll();

    request.onsuccess = () => resolve(request.result as StoredSpike[]);
    request.onerror = () => reject(request.error);
  });
};

export const clearSpikes = async () => {
  const db = await openDatabase();

  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const request = transaction.objectStore(STORE_NAME).clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};