import { updatePost } from '@/api/actions/create-post';
import { makeAuthenticatedRequest } from '@/api/config.server';
import { useAuthStore } from '@/store/auth';
import { JobPostPayload } from '@/validations/create-post.schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const usePost = (jobId: string) => {
  const { user } = useAuthStore();
  const companyId = user?.company && user?.company.id;
  const { data, isPending } = useQuery({
    queryKey: ['post', jobId],
    queryFn: async () => {
      const res = await makeAuthenticatedRequest(
        `/employer/company/${companyId}/jobs/${jobId}`,
      );
      if (!res.success) throw new Error(res.message);
      return res.data || [];
    },
  });
  return { data, isPending };
};

export const useEditPost = (jobId: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const companyId = user?.company?.id;
  const router = useRouter();

  const { mutate: editpost, isPending } = useMutation({
    mutationKey: ['put', jobId],
    mutationFn: (formData: JobPostPayload) => {
      if (!companyId) throw new Error('Company ID is required');
      return updatePost(companyId, jobId, formData);
    },
    onSuccess: () => {
      toast.success('Job updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['get-all-jobs'] });
      queryClient.invalidateQueries({
        queryKey: ['get-job', companyId, jobId],
      });

      router.push('/company/dashboard');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update job');
    },
  });

  return { editpost, isPending };
};
