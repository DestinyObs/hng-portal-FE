'use client';
import { usePostStore } from '@/store/create-post';
import { PreviewJob } from '../preview';
import { useAuthStore } from '@/store/auth';
import { useState } from 'react';
import {
  useJobLevel,
  useJobTypes,
  useSkills,
  useWorkModes,
} from '@/hooks/lookups';
import { DM_Sans } from 'next/font/google';
import { Button } from '@/components/ui/button';
const dm_sans = DM_Sans({ subsets: ['latin'], variable: '--font-dm_sans' });
import { Modal } from '@/components/dashboard/modal';
import { useCreateJob, useDraftJob } from '@/hooks/jobs';
import { Mail } from 'lucide-react';
import { Country, State } from 'country-state-city';
import Loading from '@/app/loading';

const PostJobPreview = () => {
  const { newPost } = usePostStore();
  const { createJob, isPending: isPublishing } = useCreateJob();
  const { draftJob, isPending: isDrafting } = useDraftJob();
  const { user } = useAuthStore();
  const [showPublishModal, setShowPublishModal] = useState(false);

  const { data: work_modes } = useWorkModes();
  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(newPost?.company_id);
  const { data: JOBTYPES } = useJobTypes();
  const { data: skillsRef } = useSkills();
  const { data: job_level, isPending } = useJobLevel();

  console.log(newPost);
  

  const workMode =
    work_modes &&
    work_modes.find(
      (item: { id: string; name: string }) => item.id === newPost?.work_mode_id,
    );
  const jobLevel =
    job_level &&
    job_level.find(
      (item: { id: string; name: string }) => item.id === newPost?.job_level_id,
    );
    
  const state =
    states && states.find((item) => item.isoCode === newPost?.state);
  const country =
    countries && countries.find((item) => item.isoCode === newPost?.country);
  const skills =
    newPost?.skills &&
    newPost.skills.map((skillId) => {
      const skills =
        skillsRef && skillsRef.find((s: { id: string }) => s.id === skillId);
      return skills ? skills.name : 'skillId';
    });
  const job_type =
    JOBTYPES &&
    JOBTYPES.find((item: { id: string }) => item.id === newPost?.job_type_id);
    
  const job = {
    ...newPost,
    state: state?.name ?? '',
    country: country?.name ?? '',
    skills: skills ?? [],
    company: user?.company?.name ?? '',
    companyLogo: user?.company?.logo_url || undefined,
    job_type: job_type?.name ?? '',
    work_mode: workMode?.name ?? '',
    category: newPost?.category_id,
    title: newPost?.title ?? '',
    description: newPost?.description ?? '',
    acceptance_criteria: newPost?.acceptance_criteria ?? '',
    level: jobLevel?.name ?? '',
  };

  // fixed
  const handlePublish = async () => {
    if (!newPost) return;
    setShowPublishModal(false);
    createJob(newPost);
  };

  const handleDraft = async () => {
    if (!newPost) return;
    draftJob(newPost);
  };
  if (isPending) {
    <Loading />
  }
  return (
    <div className=" p-6 bg-white shadow rounded-lg space-y-6">
      <PreviewJob postDetails={job} />

      <div className="flex flex-col sm:flex-row justify-between gap-4 py-2">
        <div className={`flex justify-between ${dm_sans.className} hidden`}>
          {/* add edit fxnality */}
          <div className="">
            <Button
              variant="outlineGray"
              size={'sm'}
              disabled={isPublishing || isDrafting}
              className={`font-medium`}
            >
              Edit
            </Button>
          </div>
          <div className="">
            <Button
              size={'sm'}
              variant="ghost"
              disabled={isPublishing || isDrafting}
              onClick={handleDraft}
              className="text-tertiary-500 font-semibold border-0 capitalize md:hidden inline-flex"
            >
              Save as draft
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="">
            <Button
              size={'sm'}
              variant="ghost"
              disabled={isPublishing || isDrafting}
              onClick={handleDraft}
              className={`${dm_sans.className}`}
            >
              {isDrafting ? 'Saving to Draft' : 'Save As Draft'}
            </Button>
          </div>

          <div className="">
            <Button
              size={'sm'}
              onClick={() => setShowPublishModal(true)}
              disabled={isPublishing || isDrafting}
              className="bg-[#00AEFF] hover:bg-[#0088cc] capitalize text-white"
            >
              {isPublishing ? 'Publishing...' : 'Publish'}
            </Button>
          </div>
        </div>
      </div>
      {/* Publish Confirmation Modal */}
      <Modal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        title="Are you sure you want to publish this job?"
        message="Once published, this job will be visible to applicants and they can start applying immediately."
        icon={
          <div className="text-primary-300 flex items-center justify-center text-4xl bg-[#F4EBFF] rounded-full w-16 h-16">
            <Mail size={48} className="text-[#5903B5]" />
          </div>
        }
        primaryButton={{
          label: 'Publish Job',
          onClick: handlePublish,
        }}
        secondaryButton={{
          label: 'Cancel',
          onClick: () => setShowPublishModal(false),
        }}
      />
    </div>
  );
};

export default PostJobPreview;
