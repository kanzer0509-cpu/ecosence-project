import { create } from 'zustand';

export const useSensorStore = create((set) => ({
  isConnected: false,

  data: {
    temperature: null,
    humidity: null,
  },

  connect: () => set({ isConnected: true }),

  disconnect: () =>
    set({
      isConnected: false,
      data: {
        temperature: null,
        humidity: null,
      },
    }),

  setData: (data) => set({ data }),
}));