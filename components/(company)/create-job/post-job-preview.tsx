'use client';
import { usePostStore } from '@/store/create-post';
import { PreviewJob } from '../preview';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  useCountries,
  useJobTypes,
  useSkills,
  useStates,
  useWorkModes,
} from '@/hooks/lookups';
import { DM_Sans } from 'next/font/google';
import { Button } from '@/components/ui/button';
const dm_sans = DM_Sans({ subsets: ['latin'], variable: '--font-dm_sans' });
import { createPost, draftPost } from '@/api/actions/create-post';
import { Modal } from '@/components/dashboard/modal';

const PostJobPreview = () => {
  const { newPost } = usePostStore();
  const { user } = useAuthStore();
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);

  const { data: work_modes } = useWorkModes();
  const { data: countries } = useCountries();
  const { data: states } = useStates();
  const { data: JOBTYPES } = useJobTypes();
  const { data: skillsRef } = useSkills();

  const workMode =
    work_modes &&
    work_modes.find(
      (item: { id: string; name: string }) => item.id === newPost?.work_mode_id,
    );
  const state =
    states &&
    states.find((item: { id: string }) => item.id === newPost?.state_id);
  const country =
    countries &&
    countries.find((item: { id: string }) => item.id === newPost?.country_id);
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
    state,
    country,
    skills: skills ?? [],
    company: user?.company?.name ?? '',
    companyLogo: user?.company?.logo_url ?? '/images/company-profile.png',
    job_type,
    work_mode: workMode ?? '',
    category: newPost?.category_id,
    title: newPost?.title ?? '',
    description: newPost?.description ?? '',
    acceptance_criteria: newPost?.acceptance_criteria ?? '',
  };

  const handlePublish = async () => {
    if (!newPost) return;
    setIsPublishing(true);
    setShowPublishModal(false);
    try {
      const response = await createPost(newPost);
      console.log(response);

      if (response && !response?.success) {
        toast.error(response.message);
        return;
      }

      toast.success('Your job has been posted successfully');
      router.push('/dashboard/jobs');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      console.log(error);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDraft = async () => {
    if (!newPost) return;
    setIsDrafting(true);
    try {
      const response = await draftPost(newPost);
      console.log(response);

      if (response && !response?.success) {
        toast.error(response.message);
        return;
      }

      toast.success('Your job has been saved to draft successfully');
      router.push('/dashboard/jobs');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsDrafting(false);
    }
  };
  return (
    <div className=" p-6 bg-white shadow rounded-lg space-y-6">
      <PreviewJob postDetails={job} />

      <div className="flex flex-col sm:flex-row justify-between gap-4 py-2">
        <div className={`flex justify-between ${dm_sans.className}`}>
          {/* add edit fxnality */}
          <Button
            variant="outlineGray"
            size={'sm'}
            disabled={isPublishing || isDrafting}
            className={`font-medium`}
          >
            Edit
          </Button>
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

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            size={'sm'}
            variant="ghost"
            disabled={isPublishing || isDrafting}
            onClick={handleDraft}
            className={`${dm_sans.className}`}
          >
            {isDrafting ? 'Saving to Draft' : 'Save As Draft'}
          </Button>

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
      {/* Publish Confirmation Modal */}
      <Modal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        title="Are you sure you want to publish this job?"
        message="Once published, this job will be visible to applicants and they can start applying immediately."
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
