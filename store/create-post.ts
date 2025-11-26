import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type newPost = {
  company_id: string;
  title: string;
  description: string;
  acceptance_criteria: string;
  state_id: string;
  country_id: string;
  price: string;
  track_id: string;
  category_id: string;
  job_type_id: string;
  work_mode_id: string;
  skills: string[];
  job_level_id: string;
};

interface postStore {
  newPost: newPost | null;
  setNewPost: (newPost: newPost) => void;
  hydrated: boolean;
}

export const usePostStore = create(
  persist<postStore>(
    (set) => ({
      newPost: null,
      setNewPost: (data) => set({ newPost: data }),
      hydrated: false,
    }),
    {
      name: 'post-store',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
        }
      },
    },
  ),
);
