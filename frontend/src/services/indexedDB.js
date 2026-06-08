const DB_NAME = 'ecosense-db';
const DB_VERSION = 2;
const SPIKE_STORE = 'spikes';
const RECORDING_STORE = 'recordings';

export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(SPIKE_STORE)) {
        db.createObjectStore(SPIKE_STORE, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }

      if (!db.objectStoreNames.contains(RECORDING_STORE)) {
        db.createObjectStore(RECORDING_STORE, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveSpike = async (spike) => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(SPIKE_STORE, 'readwrite');
    const request = transaction.objectStore(SPIKE_STORE).add(spike);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getSpikes = async () => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(SPIKE_STORE, 'readonly');
    const request = transaction.objectStore(SPIKE_STORE).getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const clearSpikes = async () => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(SPIKE_STORE, 'readwrite');
    const request = transaction.objectStore(SPIKE_STORE).clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const saveRecording = async (recording) => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(RECORDING_STORE, 'readwrite');
    const request = transaction.objectStore(RECORDING_STORE).add(recording);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getRecordings = async () => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(RECORDING_STORE, 'readonly');
    const request = transaction.objectStore(RECORDING_STORE).getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const clearRecordings = async () => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(RECORDING_STORE, 'readwrite');
    const request = transaction.objectStore(RECORDING_STORE).clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getLocalSyncData = async () => {
  const spikes = await getSpikes();

  return {
    sessions: [],
    spikes: spikes.map((spike) => ({
      client_id: spike.createdAt,
      detected_at: spike.createdAt,
      db_level: spike.db,
      duration_sec: 10,
    })),
  };
};