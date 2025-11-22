'use client';

import { useState } from 'react';
import CreateNewJob from './create-new-job';
import JobDetails from './job-details';
import JobDetailsStep2 from './job-details2';
import { ArrowLeft } from 'lucide-react';
import type { JobFormData } from '@/types/create-new-job';

const initialJobData: JobFormData = {
  category: '',
  title: '',
  description: '',
  skills: [],
  acceptanceCriteria: '',
};

export default function PostJob() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<JobFormData>(initialJobData);

  const handleFormUpdate = (data: Partial<JobFormData>): void => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = (): void => {
    setCurrentStep(2);
  };

  const handlePrev = (): void => {
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <div className="">
        <div className="max-w-4xl mx-auto px-6 pt-6 cursor-pointer">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-[#00AEFF] font-medium hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4 text-[#667085] " />
            Back to Jobs
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <CreateNewJob />

        {currentStep === 1 && (
          <JobDetails
            initialData={formData}
            onUpdate={handleFormUpdate}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <JobDetailsStep2
            initialData={formData}
            onUpdate={handleFormUpdate}
            onPrev={handlePrev}
          />
        )}
      </div>
    </div>
  );
}
