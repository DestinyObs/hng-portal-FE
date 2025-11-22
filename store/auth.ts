import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  email: string | null;
  setEmail: (email: string) => void;
  hydrated: boolean;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      email: null,
      hydrated: false,
      setEmail: (email) => set({ email }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
        }
      },
    },
  ),
);
