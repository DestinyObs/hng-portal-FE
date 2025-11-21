/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type TalentOnboardTab = 'profile' | 'track' | 'portfolio';

interface TalentOnboardTabState {
  tabs: TalentOnboardTab;
  setTabs: (newTab: TalentOnboardTab) => void;
  hydrated: boolean;
}

export const useTalentOnboardTab = create(
  persist<TalentOnboardTabState>(
    (set) => ({
      tabs: 'profile',
      hydrated: false,
      setTabs: (newTab) => set({ tabs: newTab }),
    }),
    {
      name: 'talent-onboard-tab',

      storage: createJSONStorage(() => localStorage),

      // 🔥 set hydrated = true after loading from localStorage
      onRehydrateStorage: () => (state) => {
        state?.hydrated !== undefined &&
          setTimeout(() => {
            state.hydrated = true;
          }, 0);
      },
    },
  ),
);
