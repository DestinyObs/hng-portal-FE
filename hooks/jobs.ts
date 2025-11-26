import { draftPost } from '@/api/actions/create-post';
import { createPost } from './../api/actions/create-post';
import { JobCardProps } from '@/types/job-card';
import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { makeAuthenticatedRequest } from '@/api/config.server';
import { newPost } from '@/store/create-post';
import { toast } from 'sonner';
import { JobDraftPayload } from '@/validations/create-post.schema';
import { useRouter } from 'next/navigation';

export const useGetAllJobs = <T>(
  companyId: string | undefined,
): UseQueryResult<T> => {
  return useQuery<T>({
    queryKey: ['get-all-jobs', companyId],
    queryFn: async () => {
      const res = await makeAuthenticatedRequest(
        `employer/company/${companyId}/jobs`,
      );
      return res?.data as T;
    },
    enabled: !!companyId,
  });
};

export const useGetJob = (
  companyId: string | undefined,
  jobId: string | undefined
) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["get-job", companyId, jobId],
    queryFn: async () => {
      const res = await makeAuthenticatedRequest(
        `employer/company/${companyId}/jobs/${jobId}`
      );
      return res?.data;
    },
    enabled: !!companyId && !!jobId,
  });

  return { data, isPending, error };
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: createJob, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (post: newPost) => createPost(post),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-jobs"] });
      toast.success('Your job has been posted successfully')
      router.push('/company/dashboard');
    },

    onError: (err) => {
      console.error("Failed to create job:", err);
      toast.error(err.message)
    },
  });

  return {
    createJob,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

export const useDraftJob = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: draftJob, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (post: JobDraftPayload) => draftPost(post),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-jobs"] });
      toast.success('Your job has been saved to draft successfully');
      router.push('/company/dashboard');
    },

    onError: (err) => {
      console.error("Failed to create job:", err);
      toast.error(err.message)
    },
  });

  return {
    draftJob,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
;