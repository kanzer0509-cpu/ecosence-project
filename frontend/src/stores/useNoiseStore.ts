import { create } from 'zustand';

interface NoiseState {
  isMeasuring: boolean;
  currentDb: number | null;
  history: number[];

  startMeasuring: () => void;
  stopMeasuring: () => void;
  setCurrentDb: (db: number) => void;
  clearHistory: () => void;
}

export const useNoiseStore = create<NoiseState>((set) => ({
  isMeasuring: false,
  currentDb: null,
  history: [],

  startMeasuring: () =>
    set({
      isMeasuring: true,
      history: [],
    }),

  stopMeasuring: () =>
    set({
      isMeasuring: false,
      currentDb: null,
    }),

  setCurrentDb: (db) =>
    set((state) => ({
      currentDb: db,
      history: [...state.history, db].slice(-30),
    })),

  clearHistory: () =>
    set({
      history: [],
      currentDb: null,
    }),
}));