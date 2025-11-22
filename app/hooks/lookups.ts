import { makePublicRequest } from '@/api/config.server';
import { useQuery } from '@tanstack/react-query';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res =
        await makePublicRequest<{ id: string; name: string }[]>(
          'lookups/categories',
        );
      if (!res.success) throw new Error(res.message);
      return res.data || [];
    },
  });
};

export const useJobTypes = () => {
  return useQuery({
    queryKey: ['job-types'],
    queryFn: async () => {
      const res =
        await makePublicRequest<{ id: string; name: string }[]>(
          'lookups/job-types',
        );
      if (!res.success) throw new Error(res.message);
      return res.data || [];
    },
  });
};
export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const res =
        await makePublicRequest<{ id: string; name: string }[]>(
          'lookups/skills',
        );
      if (!res.success) throw new Error(res.message);
      return res.data || [];
    },
  });
};

export const useStates = () => {
  return useQuery({
    queryKey: ['states'],
    queryFn: async () => {
      const res =
        await makePublicRequest<{ id: string; name: string }[]>(
          'lookups/states',
        );
      if (!res.success) throw new Error(res.message);
      return res.data || [];
    },
  });
};

export const useTracks = () => {
  return useQuery({
    queryKey: ['tracks'],
    queryFn: async () => {
      const res =
        await makePublicRequest<{ id: string; name: string }[]>(
          'lookups/tracks',
        );
      if (!res.success) throw new Error(res.message);
      return res.data || [];
    },
  });
};

export const useWorkModes = () => {
  return useQuery({
    queryKey: ['work-modes'],
    queryFn: async () => {
      const res =
        await makePublicRequest<{ id: string; name: string }[]>(
          'lookups/work-modes',
        );
      if (!res.success) throw new Error(res.message);
      return res.data || [];
    },
  });
};

export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const res =
        await makePublicRequest<{ id: string; name: string }[]>(
          'lookups/countries',
        );
      if (!res.success) throw new Error(res.message);
      return res.data || [];
    },
  });
};
