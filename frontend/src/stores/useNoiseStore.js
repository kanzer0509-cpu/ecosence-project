import { create } from 'zustand';

export const useNoiseStore = create((set) => ({
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