import { publicFetch } from '@/api/public-client';
import { TRACKS } from '@/constants/talent-onboarding';
import { MergedTracksData, Tracks } from '@/types/onboarding-talent';
import { useQuery } from '@tanstack/react-query';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await publicFetch('lookups/categories');
      if (!res.success) throw new Error(res.message);
      return res.data || [];
    },
  });
};

export const useJobLevel = () => {
  return useQuery({
    queryKey: ['job-level'],
    queryFn: async () => {
      const res = await publicFetch('lookups/job-levels');
      if (!res.success) throw new Error(res.message);
      console.log(res);

      return res.data || [];
    },
  });
};

export const useJobTypes = () => {
  return useQuery({
    queryKey: ['job-types'],
    queryFn: async () => {
      const res = await publicFetch('lookups/job-types');
      if (!res.success) throw new Error(res.message);
      return res.data || [];
    },
  });
};
export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const res = await publicFetch('lookups/skills');
      if (!res.success) throw new Error(res.message);
      return res.data || [];
    },
  });
};

export const useStates = () => {
  return useQuery({
    queryKey: ['states'],
    queryFn: async () => {
      const res = await publicFetch('lookups/states');
      if (!res.success) throw new Error(res.message);
      return res.data || [];
    },
  });
};

export const useTracks = () => {
  return useQuery<Tracks[], Error, MergedTracksData[]>({
    queryKey: ['tracks'],
    queryFn: async () => {
      const res = await publicFetch('lookups/tracks');
      if (!res.success) throw new Error(res.message);
      return res.data || [];
    },
    select: (data: Tracks[]): MergedTracksData[] => {
      return data.slice(0, 8).map((track, index) => ({
        ...track,
        icon: TRACKS[index % TRACKS.length].icon,
        color: TRACKS[index % TRACKS.length].color,
        description: TRACKS[index % TRACKS.length].description,
      }));
    },
  });
};

export const useWorkModes = () => {
  return useQuery({
    queryKey: ['work-modes'],
    queryFn: async () => {
      const res = await publicFetch('lookups/work-modes');
      if (!res.success) throw new Error(res.message);
      return res.data || [];
    },
  });
};

export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const res = await publicFetch('lookups/countries');
      if (!res.success) throw new Error(res.message);
      return res.data || [];
    },
  });
};
