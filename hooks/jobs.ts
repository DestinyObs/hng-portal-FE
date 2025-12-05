import { deleteJob, draftPost, updateStatus } from '@/api/actions/create-post';
import { createPost } from './../api/actions/create-post';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { makeAuthenticatedRequest } from '@/api/config.server';
import { newPost } from '@/store/create-post';
import { toast } from 'sonner';
import { JobDraftPayload } from '@/validations/create-post.schema';
import { useRouter } from 'next/navigation';
import { JobApplicationPayload } from '@/types/job-application-form';
import { applyForJob } from '@/api/actions/applications';
import { APIResponse } from '@/types/api-response';

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
  jobId: string | undefined,
) => {
  const { data, isPending, error } = useQuery({
    queryKey: ['get-job', companyId, jobId],
    queryFn: async () => {
      const res = await makeAuthenticatedRequest(
        `employer/company/${companyId}/jobs/${jobId}`,
      );
      return res?.data;
    },
    enabled: !!companyId && !!jobId,
  });

  return { data, isPending, error };
};

export const useGetTalentJob = <T>(
  jobId: string | undefined,
): UseQueryResult<APIResponse<T>> => {
  return useQuery({
    queryKey: ['get-job', jobId],
    queryFn: async () => {
      const res = await makeAuthenticatedRequest<T>(`/talent/jobs/${jobId}`);
      return res; // Return the full APIResponse
    },
    enabled: !!jobId,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    mutate: createJob,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: (post: newPost) => createPost(post),

    onSuccess: (response) => {
      if (response && !response.success) {
        const errorMessage = response.message || 'Failed to create job';
        if (response.errors) {
          const errorString = Object.values(response.errors).flat().join(' ');
          toast.error(errorString || errorMessage);
        } else {
          toast.error(errorMessage);
        }
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['get-all-jobs'] });
      toast.success('Your job has been posted successfully');
      router.push('/company/dashboard');
    },

    onError: (err) => {
      console.error('Failed to create job:', err);
      toast.error(
        err instanceof Error ? err.message : 'An unexpected error occurred',
      );
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

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    mutate: changeStatus,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: ({
      company_id,
      job_id,
      status,
    }: {
      company_id: string;
      job_id: string;
      status: string;
    }) => updateStatus(company_id, job_id, status),

    onSuccess: (response) => {
      if (response && !response.success) {
        const errorMessage = response.message || 'Failed to update job status';
        if (response.errors) {
          const errorString = Object.values(response.errors).flat().join(' ');
          toast.error(errorString || errorMessage);
        } else {
          toast.error(errorMessage);
        }
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['get-all-jobs'] });
      toast.success('Your job has been updated successfully');
      router.push('/company/dashboard');
    },

    onError: (err) => {
      console.error('Failed to update job status:', err);
      toast.error(
        err instanceof Error ? err.message : 'An unexpected error occurred',
      );
    },
  });

  return {
    changeStatus,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

export const useDelete = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    mutate: removeJob,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: ({
      company_id,
      job_id,
    }: {
      company_id: string;
      job_id: string;
    }) => deleteJob(company_id, job_id),

    onSuccess: (response) => {
      if (response && !response.success) {
        const errorMessage = response.message || 'Failed to delete job';
        if (response.errors) {
          const errorString = Object.values(response.errors).flat().join(' ');
          toast.error(errorString || errorMessage);
        } else {
          toast.error(errorMessage);
        }
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['get-all-jobs'] });
      toast.success('Your job has been removed successfully');
      router.push('/company/dashboard');
    },

    onError: (err) => {
      console.error('Failed to remove job:', err);
      toast.error(
        err instanceof Error ? err.message : 'An unexpected error occurred',
      );
    },
  });

  return {
    removeJob,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

export const useDraftJob = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    mutate: draftJob,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: (post: JobDraftPayload) => draftPost(post),

    onSuccess: (response) => {
      if (response && !response.success) {
        const errorMessage = response.message || 'Failed to save draft';
        if (response.errors) {
          const errorString = Object.values(response.errors).flat().join(' ');
          toast.error(errorString || errorMessage);
        } else {
          toast.error(errorMessage);
        }
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['get-all-jobs'] });
      toast.success('Your job has been saved to draft successfully');
      router.push('/company/dashboard');
    },

    onError: (err) => {
      console.error('Failed to save draft:', err);
      toast.error(
        err instanceof Error ? err.message : 'An unexpected error occurred',
      );
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

export const useApplyForJob = () => {
  const queryClient = useQueryClient();

  const {
    mutate: applyJob,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: (application: JobApplicationPayload) =>
      applyForJob(application),

    onSuccess: (data) => {
      // applyForJob returns data directly on success, or { success: false, message, errors } on error
      if (
        data &&
        typeof data === 'object' &&
        'success' in data &&
        !data.success
      ) {
        const errorMessage = data.message || 'Failed to submit application';
        if (data.errors) {
          const errorString = Object.values(data.errors).flat().join(' ');
          toast.error(errorString || errorMessage);
        } else {
          toast.error(errorMessage);
        }
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['job-applications'] });
      toast.success('Your application has been submitted successfully');
      console.log(data);
    },

    onError: (err) => {
      console.error('Failed to submit application:', err);
      toast.error(
        err instanceof Error ? err.message : 'An unexpected error occurred',
      );
    },
  });

  return {
    applyJob,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

export const useGetDashboardAnalytics = <T>(): UseQueryResult<T> => {
  return useQuery<T>({
    queryKey: ['get-dashboard-analytics'],
    queryFn: async () => {
      const res = await makeAuthenticatedRequest(`employer/dashboard`);
      // console.log(res);

      return res?.data as T;
    },
  });
};
