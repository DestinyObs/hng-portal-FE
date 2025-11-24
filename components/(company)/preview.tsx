'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Dot } from 'lucide-react';
import { DM_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { useAuthStore } from '@/store/auth';
import { usePostStore } from '@/store/create-post';
import {
  useCountries,
  useJobTypes,
  useSkills,
  useStates,
  useWorkModes,
} from '@/hooks/lookups';

import { createPost, draftPost } from '@/api/actions/create-post';

import { Button } from '@/components/ui/button';

const dm_sans = DM_Sans({ subsets: ['latin'], variable: '--font-dm_sans' });

export const PreviewJob = () => {
  const { newPost } = usePostStore();
  const { user } = useAuthStore();
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);

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

  const handlePublish = async () => {
    if (!newPost) return;
    setIsPublishing(true);
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
      {/* Job Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-tertiary-50 pb-4">
        <div className="flex flex-col gap-2">
          {/* company-logo */}
          <div className="relative w-28 h-28 img">
            <Image fill src={'/images/company-profile.png'} alt={''} />
          </div>
          <h2 className="text-[32px] font-bold text-gray-800 ">
            {newPost?.title}
          </h2>
          <p className="text-sec-dark-gray font-semibold text-[24px]">
            {user?.company?.name}
          </p>
          <div
            className={`text-[14px] capitalize text-[#969696] font-['var(--font-dm_sans)'] flex ${dm_sans.className}`}
          >
            {/* work-mode */}
            <span>{workMode?.name}</span>
            <Dot />
            <span>{job_type?.name}</span>
            {/* <span>Entry Level</span>  */}
            <Dot />
            {/* location */}
            <span>
              {state?.name}, {country?.name}
            </span>
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className={`space-y-2 ${dm_sans.className}`}>
        <h3 className="text-xl font-semibold text-tertiary-500 ">
          Job Description
        </h3>
        <p className="text-tertiary-200 text-[16px]">{newPost?.description}</p>
      </div>

      {/* Skills and Expertise */}
      <div className="space-y-2 py-4 pb-5 border-y border-y-tertiary-50">
        <h3 className="text-xl font-medium text-tertiary-500 ">
          Skills and Expertise
        </h3>
        <ul className="flex justify-start gap-3 text-gray-600">
          {skills &&
            skills.map((item: string, index: number) => (
              <li
                key={index}
                className="border border-[#EAF0ED] py-1.5 px-3 p rounded-full"
              >
                {item}
              </li>
            ))}
        </ul>
      </div>

      {/* Acceptance Criteria */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-tertiary-500">
          Acceptance Criteria
        </h3>
        <div className="list-disc list-inside text-tertiary-200 space-y-1 text-[16px] ${dm_sans.className}">
          {newPost?.acceptance_criteria}
        </div>
      </div>

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
            onClick={handlePublish}
            disabled={isPublishing || isDrafting}
            className="bg-[#00AEFF] hover:bg-[#0088cc] capitalize text-white"
          >
            {isPublishing ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </div>
    </div>
  );
};
