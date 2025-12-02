'use client';

import { JobApplicationFormData } from '@/types/job-application-form';
import React, { useEffect, useState } from 'react';
import JobApplicationForm from './application-form';
import JobApplicationPreview from './preview-form';
import { useApplyForJob } from '@/hooks/jobs';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { Modal } from '../dashboard/modal';
import { ChevronLeft, CircleCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

const JobApplicationPage = () => {
  const params = useParams();
  const jobId = params?.id;
  const router = useRouter();

  const [step, setStep] = useState<'form' | 'preview'>('form');
  const [formData, setFormData] = useState<JobApplicationFormData | null>(null);

  const { applyJob, isPending, isSuccess } = useApplyForJob();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => setShowSuccessModal(true), 0);
    }
  }, [isSuccess]);

  if (!jobId) {
    // Stop submission if jobId is missing
    toast.error('Job ID is missing.');
    return null;
  }

  const handleFormSubmit = (data: JobApplicationFormData) => {
    setFormData(data);
    setStep('preview');
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

    const jobId = Array.isArray(params?.id) ? params.id[0] : params?.id;
    if (!jobId) {
      toast.error('Job ID is missing.');
      return;
    }

    applyJob({
      cover_letter: formData.cover_letter,
      resume: formData.resume[0], // first file from the list
      job_id: jobId,
    });
  };

  return (
    <>
      {/* Back button */}
      <button
        className="inline-flex items-center text-left text-primary-blue font-semibold p-6 cursor-pointer"
        onClick={() => router.back()}
      >
        <ChevronLeft className="mr-2" />
        Back
      </button>

      {step === 'form' ? (
        <JobApplicationForm
          onNext={handleFormSubmit}
          defaultValues={formData || undefined}
        />
      ) : (
        <JobApplicationPreview
          data={formData!}
          onSubmit={handleFinalSubmit}
          onEdit={() => setStep('form')}
          isSubmitting={isPending}
        />
      )}

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Application Sent Successfully!"
        message="Great work your application has been successfully submitted."
        icon={
          <div className="text-primary-300 flex items-center justify-center text-4xl bg-[#D1FADF] rounded-full w-16 h-16">
            <CircleCheck size={48} className="text-[#039855]" />
          </div>
        }
        primaryButton={{
          label: 'Back to Explore Jobs',
          onClick: () => {
            setShowSuccessModal(false);
            router.push('/talent/dashboard');
          },
        }}
        secondaryButton={{
          label: 'View Job Details',
          onClick: () => {
            setShowSuccessModal(false);
            router.push(`/talent/job/${jobId}`);
          },
        }}
      />
    </>
  );
};

export default JobApplicationPage;
