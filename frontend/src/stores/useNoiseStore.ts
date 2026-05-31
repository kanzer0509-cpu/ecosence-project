import { create } from 'zustand';

interface NoiseState {
  isMeasuring: boolean;
  currentDb: number | null;

  startMeasuring: () => void;
  stopMeasuring: () => void;
  setCurrentDb: (db: number) => void;
}

export const useNoiseStore = create<NoiseState>((set) => ({
  isMeasuring: false,
  currentDb: null,

  startMeasuring: () => set({ isMeasuring: true }),
  stopMeasuring: () =>
    set({
      isMeasuring: false,
      currentDb: null,
    }),

  setCurrentDb: (db) => set({ currentDb: db }),
}));