import { create } from 'zustand';

type NoiseMode = 'normal' | 'sleep';

interface Spike {
  timestamp: string;
  db: number;
}

interface NoiseState {
  mode: NoiseMode;
  isMeasuring: boolean;
  currentDb: number | null;
  history: number[];
  spikes: Spike[];

  setMode: (mode: NoiseMode) => void;
  startMeasuring: () => void;
  stopMeasuring: () => void;
  setCurrentDb: (db: number) => void;
  clearHistory: () => void;
  addSpike: (spike: Spike) => void;
  clearSpikes: () => void;
}

export const useNoiseStore = create<NoiseState>((set) => ({
  mode: 'normal',
  isMeasuring: false,
  currentDb: null,
  history: [],
  spikes: [],

  setMode: (mode) => set({ mode }),

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

  addSpike: (spike) =>
    set((state) => ({
      spikes: [...state.spikes, spike],
    })),

  clearSpikes: () =>
    set({
      spikes: [],
    }),
}));