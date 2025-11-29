'use client';

import { JobApplicationFormData } from '@/types/job-application-form';
import React, { useState } from 'react';
import JobApplicationForm from './application-form';
import JobApplicationPreview from './preview-form';
import { useApplyForJob } from '@/hooks/jobs';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

const JobApplicationPage = () => {
  const params = useParams();
  const jobId = params?.id;

  const [step, setStep] = useState<'form' | 'preview'>('form');
  const [formData, setFormData] = useState<JobApplicationFormData | null>(null);

  const { applyJob, isPending } = useApplyForJob();

  if (!jobId) {
    // Stop submission if jobId is missing
    toast.error('Job ID is missing.');
    return null;
  }

  const handleFormSubmit = (data: JobApplicationFormData) => {
    setFormData(data);
    setStep('preview');
    console.log(data.resume instanceof FileList, data.resume?.length);
  };

  const handleFinalSubmit = () => {
    if (
      !formData?.resume ||
      !(formData.resume instanceof FileList) ||
      formData.resume.length === 0
    ) {
      toast.error('Resume is required.');
      return;
    }

    const file = formData.resume[0]; // ✅ Extract the actual File

    const jobId = Array.isArray(params?.id) ? params.id[0] : params?.id;
    if (!jobId) {
      toast.error('Job ID is missing.');
      return;
    }

    console.log('Submitting:', {
      cover_letter: formData.cover_letter,
      resume: file,
      job_id: jobId,
    });

    applyJob({
      cover_letter: formData.cover_letter,
      resume: formData.resume[0], // first file from the list
      job_id: jobId,
    });
  };

  return step === 'form' ? (
    <JobApplicationForm onNext={handleFormSubmit} />
  ) : (
    <JobApplicationPreview
      data={formData!}
      onSubmit={handleFinalSubmit}
      onEdit={() => setStep('form')}
      isSubmitting={isPending}
    />
  );
};

export default JobApplicationPage;
