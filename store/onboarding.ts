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




// === COMPANY ONBOARDING ===
export type CompanyOnboardTab = 'profile-setup' | 'company-detail';

interface CompanyOnboardTabState {
  tabs: CompanyOnboardTab;
  setTabs: (newTab: CompanyOnboardTab) => void;
  hydrated: boolean;
}

export const useCompanyOnboardTab = create(
  persist<CompanyOnboardTabState>(
    (set) => ({
      tabs: 'profile-setup',
      hydrated: false,
      setTabs: (newTab) => set({ tabs: newTab }),
    }),
    {
      name: 'company-onboard-tab',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.hydrated !== undefined &&
          setTimeout(() => {
            state.hydrated = true;
          }, 0);
      },
    },
  ),
);


// === SHARED USER TYPE ===
export type UserType = 'talent' | 'company';

interface UserTypeState {
  userType: UserType;
  setUserType: (type: UserType) => void;
  hydrated: boolean;
}

export const useUserType = create(
  persist<UserTypeState>(
    (set) => ({
      userType: 'talent',
      hydrated: false,
      setUserType: (type) => set({ userType: type }),
    }),
    {
      name: 'user-type',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.hydrated !== undefined &&
          setTimeout(() => {
            state.hydrated = true;
          }, 0);
      },
    },
  ),
);
