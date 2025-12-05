'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Country, State } from 'country-state-city';
import { UserProfileData } from '@/types/profile';

interface TalentProfileViewProps {
  profile: UserProfileData | null | undefined;
  tracks?: { id: string; name: string }[] | undefined;
}

export function TalentProfileView({ profile, tracks }: TalentProfileViewProps) {
  const countryName =
    (profile?.bio?.country &&
      Country.getCountryByCode(profile.bio.country)?.name) ||
    '';
  const stateName =
    (profile?.bio?.state &&
      profile?.bio?.country &&
      State.getStateByCodeAndCountry(profile.bio.state, profile.bio.country)
        ?.name) ||
    '';
  const trackName =
    tracks?.find((track) => track.id === profile?.bio?.track_id)?.name || '';
  return (
    <div className="w-full max-w-4xl mx-auto px-1 py-1 md:px-4 md:py-4">
      {/* Banner */}
      <div className="relative h-32 sm:h-40 md:h-48 w-full max-w-[804px] rounded-t-xl bg-primary-300">
        <div className="absolute -bottom-10 sm:-bottom-12 left-4 sm:left-6 h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
          <Image
            src={
              profile?.bio?.user?.photo_url ||
              profile?.photo_url ||
              '/images/portraitPlaceholder.png'
            }
            alt="Profile"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>

      {/* Main Card */}
      <Card className="max-w-[804px] rounded-t-none">
        <CardHeader className="p-2 md:p-4 pb-0 flex justify-end items-start">
          <Link href="/settings/profile" className="inline-block">
            <Button
              variant="outline"
              size="sm"
              className="h-6 gap-1 text-xs text-[#344054] border-[#D0D5DD] font-semibold hover:bg-gray-50 rounded"
            >
              <Image
                src="/assets/dashboard/icons/edit.png"
                alt="Edit"
                width={14}
                height={14}
              />
              Edit Profile
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="p-2 md:p-6 pt-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6 md:mb-10">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-black">
                {profile?.bio?.user?.firstname} {profile?.bio?.user?.lastname}
              </h2>
              <p className="text-sm md:text-base text-black">{trackName}</p>
              <p className="text-sm text-gray-600">
                {[stateName, countryName].filter(Boolean).join(', ')}
              </p>

              <p className="text-sm text-gray-700">
                <span className="font-semibold">Work Experience: </span>
                {profile?.bio?.experience
                  ? `${profile?.bio?.experience}`
                  : ' Years of experience: - '}
              </p>

              {/* <div className="flex items-center gap-2 mt-2">
                <span
                  className={`h-3 w-3 rounded-full ${
                    profile?.bio?.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
                <span className="text-sm text-gray-600 capitalize">
                  {profile?.bio?.status === 'active' ? 'Open to Work' : 'Not Looking'}
                </span>
              </div> */}
            </div>

            <div className="text-sm text-gray-700 text-left md:text-right">
              <p>
                Resume:{' '}
                <Link
                  href="/settings/portfolio"
                  className="text-primary-300 hover:underline"
                >
                  Link
                </Link>
              </p>
              {/* <p>
                Resume:{' '}
                <a
                  href={profile?.bio?.project_file_url || '#'}
                  download
                  className="text-primary-300 hover:underline"
                >
                  Link
                </a>
              </p> */}
            </div>
          </div>

          {/* BIO */}
          <div className="mb-6 md:mb-10">
            <h3 className="text-lg md:text-2xl font-semibold text-black mb-3 md:mb-4">
              Bio
            </h3>
            <p className="text-sm md:text-base text-black whitespace-pre-line">
              {profile?.bio?.bio ?? 'No bio added yet.'}
            </p>
          </div>

          {/* EXPERIENCE */}
          <div className="mb-6 md:mb-10">
            <h3 className="text-lg md:text-2xl font-semibold text-black mb-4 md:mb-6">
              Experience
            </h3>

            {!profile?.experiences || profile.experiences.length === 0 ? (
              <p className="text-gray-500 text-sm">No experience added yet.</p>
            ) : (
              <div className="space-y-4">
                {profile.experiences.map((job) => {
                  const parseDate = (dateStr: string) => {
                    if (dateStr.includes('/')) {
                      const [year, month, day] = dateStr.split('/');
                      return new Date(
                        parseInt(year),
                        parseInt(month) - 1,
                        parseInt(day),
                      );
                    }
                    return new Date(dateStr);
                  };

                  const startDate = job.start_date
                    ? parseDate(job.start_date).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })
                    : '';
                  const endDate = job.end_date
                    ? parseDate(job.end_date).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })
                    : null;
                  const dateRange = job.is_current
                    ? `${startDate} – Present`
                    : endDate
                      ? `${startDate} – ${endDate}`
                      : startDate;

                  return (
                    <div
                      key={job.id}
                      className="pb-2 border-b border-gray-200 last:border-b-0 last:pb-0"
                    >
                      <p className="text-sm text-gray-500 mb-1">{dateRange}</p>
                      <p className="text-base font-semibold text-black">
                        {job.job_title}
                      </p>
                      <p className="text-sm text-black">{job.company_name}</p>

                      {job.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {job.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* SKILLS */}
          <div>
            <h3 className="text-lg md:text-2xl font-semibold text-black mb-3 md:mb-4">
              Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {!profile?.skills || profile.skills.length === 0 ? (
                <p className="text-gray-500 text-sm">No skills added yet.</p>
              ) : (
                profile.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1 bg-white border border-[#EAF0ED] text-sm text-black rounded-2xl"
                  >
                    {skill.name}
                  </span>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
