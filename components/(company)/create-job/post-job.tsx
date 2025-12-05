'use client';
import { useState, useMemo } from 'react';
import JobDetails from './job-details';
import JobDetailsStep2 from './job-details2';
import type { JobFormData, JobFormData2 } from '@/types/create-new-job';
import { usePost } from '@/hooks/posts';
import Loading from '@/app/loading';

const steps = [
  { id: 1, label: 'Job Details', sub: 'What is the job about?' },
  { id: 2, label: 'Location', sub: 'Where is job located?' },
  { id: 3, label: 'Preview', sub: 'Preview job post' },
];

const getInitialFormData = (data: JobFormData | undefined): JobFormData2 => ({
  category_id: data?.category_id ?? '',
  title: data?.title ?? '',
  description: data?.description ?? '',
  acceptance_criteria: data?.acceptance_criteria ?? '',
  skills: data?.skills ?? [],
  job_level_id: data?.job_level_id ?? '',
  track_id: data?.track_id ?? '',
  job_type_id: data?.job_type_id ?? '',
  work_mode_id: data?.work_mode_id ?? '',
  price: data?.price,
  state_id: data?.state_id ?? '',
  country_id: data?.country_id ?? '',
  company_id: data?.company_id ?? '',
});

export default function PostJob({ id }: { id?: string }) {
  const { data, isPending } = usePost(id || '');
  const [currentStep, setCurrentStep] = useState(1);
  // console.log('API Data:', data);

  // Compute form data whenever data changes
  const initialFormData = useMemo(
    () => getInitialFormData(data as JobFormData | undefined),
    [data],
  );

  const [formData, setFormData] = useState<JobFormData2>(initialFormData);

  // Update formData when initialFormData changes (data loads)
  if (
    JSON.stringify(formData) ===
      JSON.stringify(getInitialFormData(undefined)) &&
    data &&
    JSON.stringify(initialFormData) !== JSON.stringify(formData)
  ) {
    setFormData(initialFormData);
  }

  const handleFormUpdate = (details: Partial<JobFormData2>): void => {
    setFormData((prev) => ({ ...prev, ...details }));
  };

  const handleNext = (): void => {
    setCurrentStep(2);
  };

  const handlePrev = (): void => {
    setCurrentStep(1);
  };

  if (id && isPending) {
    return <Loading />;
  }

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
                id={id}
              />
            )}

            {currentStep === 2 && (
              <JobDetailsStep2
                initialData={formData}
                onUpdate={handleFormUpdate}
                onPrev={handlePrev}
                id={id}
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
