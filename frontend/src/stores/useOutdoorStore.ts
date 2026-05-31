import { create } from 'zustand';

interface OutdoorData {
  temperature: number;
  humidity: number;
  precipitation: number;
  uv: string;
  aqi: string;
}

interface OutdoorState {
  data: OutdoorData | null;
  location: string;

  setLocation: (location: string) => void;
  setData: (data: OutdoorData) => void;
}

export const useOutdoorStore = create<OutdoorState>((set) => ({
  data: null,
  location: '창원',

  setLocation: (location) =>
    set({
      location,
    }),

  setData: (data) =>
    set({
      data,
    }),
}));