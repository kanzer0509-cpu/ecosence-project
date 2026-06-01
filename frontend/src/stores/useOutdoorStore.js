import { create } from 'zustand';

export const useOutdoorStore = create((set) => ({
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