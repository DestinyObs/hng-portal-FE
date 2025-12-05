'use client';

import React from 'react';
import Link from 'next/link';
import Loading from '@/app/loading';
import { useGetUserProfile, useGetCompanyProfile } from '@/hooks/profile';
import { useTracks } from '@/hooks/lookups';
import { UserProfileData, CompanyProfileData } from '@/types/profile';
import { TalentProfileView } from '@/components/dashboard/talent-profile-view';
import { CompanyProfileDisplay } from '@/components/dashboard/company-profile-view';
import { useAuthStore } from '@/store/auth';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const isCompany = user?.current_role === 'employer';
  const { data: talentData, isLoading: talentLoading } =
    useGetUserProfile<UserProfileData>(!isCompany);
  const { data: companyData, isLoading: companyLoading } =
    useGetCompanyProfile<CompanyProfileData>(isCompany);
  const { data: tracks, isLoading: tracksLoading } = useTracks(!isCompany);
  const isLoading =
    (isCompany ? companyLoading : talentLoading) ||
    (!isCompany && tracksLoading);
  if (isLoading) return <Loading />;

  if (!isCompany && !talentData) {
    return <div>No profile found</div>;
  }

  if (isCompany && !companyData) {
    return <div>No profile found</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto md:p-8">
      <div className="flex px-1 justify-start mb-6">
        <Link
          href={isCompany ? '/company/dashboard' : '/talent/dashboard'}
          className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-2"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Conditional Rendering */}
      {isCompany ? (
        <CompanyProfileDisplay profile={companyData} isOwnProfile={true} />
      ) : (
        <TalentProfileView profile={talentData} tracks={tracks} />
      )}
    </div>
  );
}
