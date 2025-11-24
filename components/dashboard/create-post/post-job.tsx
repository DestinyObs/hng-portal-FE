'use client';
import { useState } from 'react';
import JobDetails from './job-details';
import JobDetailsStep2 from './job-details2';
import type { JobFormData } from '@/types/create-new-job';
import { useRouter } from 'next/navigation';

const initialJobData: JobFormData = {
  category_id: '',
  title: '',
  description: '',
  skills: [],
  acceptance_criteria: '',
};

const steps = [
  { id: 1, label: 'Job Details', sub: 'What is the job about?' },
  { id: 2, label: 'Location', sub: 'Where is job located?' },
  { id: 3, label: 'Preview', sub: 'Preview job post' },
];

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
    <div>
      <div className="w-full space-y-8">
        <div className="flex gap-5">
          <div className="lg:w-3/4">
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

          <div className="space-y-6 hidden lg:block">
            {steps.map((step) => {
              const isActive = step.id === currentStep;

              return (
                <div
                  key={step.id}
                  className={`flex flex-col transition-colors`}
                >
                  <span
                    className={`
                        font-semibold text-[16px]
                        ${isActive ? 'text-[#111827]' : 'text-[#92959C]'}
                      `}
                  >
                    {step.label}
                  </span>

                  <span
                    className={`
                        text-[14px] mt-1
                        ${isActive ? 'text-[#414652]' : 'text-[#B5B7BC]'}
                      `}
                  >
                    {step.sub}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
