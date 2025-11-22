'use client';

import { create } from 'zustand';

type CarouselStore = {
  activePage: number;
  isPaused: boolean;
  setActivePage: (page: number) => void;
  setIsPaused: (paused: boolean) => void;
  nextPage: () => void;
};

export const useCarousel = create<CarouselStore>((set) => ({
  activePage: 0,
  isPaused: false,
  setActivePage: (page) => set({ activePage: page }),
  setIsPaused: (paused) => set({ isPaused: paused }),
  nextPage: () => set((state) => ({
    activePage: (state.activePage + 1) % 3,
  })),
}));