"use client";

import React from 'react';
import Link from 'next/link';
import Loading from "@/app/loading";
import { useGetUserProfile } from "@/hooks/profile";
import { useTracks } from "@/hooks/lookups";
import { UserProfileData } from "@/types/profile";
import { TalentProfileView } from "@/components/dashboard/talent-profile-view";
import { CompanyProfileDisplay } from '@/components/dashboard/company-profile-view';

export default function ProfilePage() {
  const { data, isLoading } = useGetUserProfile<any>();
  const { data: tracks, isLoading: tracksLoading } = useTracks();
  if (isLoading || tracksLoading) return <Loading />;
  if (!data) return <div>No profile found</div>;

  const userRole = data?.current_role || '';
  const isCompany = userRole === 'employer';

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="flex px-1 justify-start mb-6">
        <Link
          href="/talent/dashboard"
          className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-2"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Conditional Rendering */}
      {isCompany ? (
        <CompanyProfileDisplay
            profile={data}
            isOwnProfile={true}
        />
      ) : (
        <TalentProfileView
            profile={data}
            tracks={tracks}
        />
      )}
    </div>
  );
}
