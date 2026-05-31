import { create } from 'zustand';

interface SensorData {
  temperature: number | null;
  humidity: number | null;
}

interface SensorState {
  isConnected: boolean;
  data: SensorData;

  connect: () => void;
  disconnect: () => void;
  setData: (data: SensorData) => void;
}

export const useSensorStore = create<SensorState>((set) => ({
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