'use client';

import { JobApplicationFormData } from '@/types/job-application-form';
import React, { useState } from 'react';
import JobApplicationForm from './application-form';
import JobApplicationPreview from './preview-form';

const JobApplicationPage = () => {
  const [step, setStep] = useState<'form' | 'preview'>('form');
  const [formData, setFormData] = useState<JobApplicationFormData | null>(null);

  const handleFormSubmit = (data: JobApplicationFormData) => {
    setFormData(data);
    setStep('preview');
  };

  return step === 'form' ? (
    <JobApplicationForm onNext={handleFormSubmit} />
  ) : (
    <JobApplicationPreview
      data={formData!}
      onSubmit={() => console.log('Final submit')}
      onEdit={() => setStep('form')}
    />
  );
};

export default JobApplicationPage;
