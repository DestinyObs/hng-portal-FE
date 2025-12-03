import { User } from '@/lib/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  email: string | null;
  user_id: string | null;
  user: User | null;
  hydrated: boolean;

  setEmail: (email: string) => void;
  clearEmail: () => void;
  setId: (id: string) => void;
  setData: (data: User | null) => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      email: null,
      user_id: null,
      user: null,
      hydrated: false,

      setEmail: (email) => set({ email }),
      clearEmail: () => set({ email: null }),
      setId: (id) => set({ user_id: id }),
      setData: (data) => set({ user: data }),

      clearAuth: () => {
        set({
          email: null,
          user_id: null,
          user: null,
        });
        const storageKey = 'auth-store';
        localStorage.removeItem(storageKey);
      },
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
