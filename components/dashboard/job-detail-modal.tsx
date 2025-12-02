'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X, Heart } from 'lucide-react';
import { TalentJob } from '@/types/job-card'; // Import TalentJob
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveJob } from '@/api/actions/talent';
import { toast } from 'sonner';
import { APIResponse, SuccessResponse } from '@/types/api-response';

interface JobDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: TalentJob | null; // Use TalentJob
}

const JobDetailModal = ({ isOpen, onClose, job }: JobDetailModalProps) => {
  const queryClient = useQueryClient();

  const { mutate: a_saveJob, isPending: isSaving } = useMutation({
    mutationKey: ['saveJob', job?.id],
    mutationFn: () => saveJob(job!.id),
    onSuccess: (response: APIResponse<SuccessResponse>) => {
      if (response.success) {
        toast.success('Job saved successfully!');
        queryClient.invalidateQueries({ queryKey: ['savedJobs'] }); // Invalidate saved jobs query to refetch
      } else {
        toast.error(response.message || 'Failed to save job.');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'A network error occurred.');
    },
  });

  if (!job) {
    return null;
  }

  const companyName = job.company?.name || 'N/A';
  const jobLevel = job.job_levels?.name || 'N/A';
  const workMode = job.work_mode?.name || 'N/A';
  const jobType = job.job_type?.name || 'N/A';
  const location = [job.state?.name, job.country?.name]
    .filter(Boolean)
    .join(', ');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] p-8">
        <DialogHeader className="flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-4">
            {job.company?.logo_url ? (
              <Image
                src={job.company.logo_url}
                alt={companyName}
                width={56}
                height={56}
                className="rounded-lg"
              />
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-purple-600">
                <span className="text-2xl font-bold text-white">
                  {companyName.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <DialogTitle className="text-xl font-bold">
                {job.title}
              </DialogTitle>
              <p className="text-md text-gray-600 flex items-center">
                {companyName}
                {/* isVerified not directly available in RawJob */}
              </p>
            </div>
          </div>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          <p className="text-sm text-gray-800">{job.description}</p>

          {/* Skills Section */}
          <div className="flex flex-wrap gap-2">
            {job.skills && job.skills.length > 0 ? (
              job.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-md text-xs text-gray-700"
                >
                  {skill.name}
                </span>
              ))
            ) : (
              <span className="px-3 py-1 bg-white border border-gray-300 rounded-md text-xs text-gray-700">
                No skills specified
              </span>
            )}
          </div>

          {/* Metadata Line */}
          <div className="text-sm text-gray-500">
            Posted: {job.created_at || 'N/A'} &mdash; {workMode} &mdash;{' '}
            {jobType} &mdash; {jobLevel} &mdash; {location}
          </div>

          <p className="text-xl font-bold text-gray-900">
            {job.salary ? `₦ ${job.salary}` : 'Salary not specified'} per Month
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full mt-8">
            <Button className="w-full" size="lg">
              Start Application
            </Button>
            <Button
              className="w-full"
              variant="outline"
              size="lg"
              onClick={() => a_saveJob()}
              disabled={isSaving}
            >
              <Heart className="mr-2 h-4 w-4" /> Save job
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
