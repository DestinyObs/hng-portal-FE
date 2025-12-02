'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useGetUserProfile } from '@/hooks/profile';
import { useSkills, useTracks } from '@/hooks/lookups';
import { Country, State } from 'country-state-city';
import Loading from '@/app/loading';
import { UserProfileData } from '@/types/profile';
import { useAuthStore } from '@/store/auth';

const MOCK_PROFILE = {
  name: '',
  role: 'UI / UX Designer',
  location: 'Lagos, Nigeria',
  avatar: '/assets/dashboard-settings/images/avatar.png',
  bio: `Hi, I'm Okorie Esther, a Product Designer who loves turning complex ideas into simple, meaningful experiences.
For me, design isn’t just about how something looks, it’s about how it works, feels, and fits into people's lives.`,
  attachments: {
    portfolio: 'https://mysite.com',
    resume: 'https://resume.com',
  },
  experience: [
    {
      id: 1,
      role: 'UI / UX Designer',
      company: 'Netflix Inc',
      date: 'Jul 2023 – Present',
      bullets: [
        'Leading development of scalable web applications using React and Node.js.',
      ],
    },
    {
      id: 2,
      role: 'UI Designer',
      company: 'Atlassian',
      date: 'Aug 2022 – Aug 2023',
      bullets: [
        'Designed effective user interfaces to strengthen brand identity.',
      ],
    },
  ],
  skills: ['Figma', 'React', 'TypeScript', 'Next.js'],
};

export default function ProfilePage() {
  const { data: profile, isLoading } = useGetUserProfile<UserProfileData>();
  const { data: tracks, isLoading: tracksLoading } = useTracks();
  // const { data: skills } = useSkills();
  const { user } = useAuthStore();
  const isCompany = user?.current_role === 'employer';

  const trackName =
    tracks?.find((track) => track.id === profile?.bio?.track_id?.toString())
      ?.name ?? MOCK_PROFILE.name;

  const countryName =
    Country.getCountryByCode(profile?.bio?.country ?? '')?.name ?? 'Nigeria';

  const stateName =
    State.getStateByCodeAndCountry(
      profile?.bio?.state ?? '',
      profile?.bio?.country ?? '',
    )?.name || 'Lagos';

  if (isLoading || tracksLoading) return <Loading />;

  console.log('Profile:', profile);
  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      {/* Back */}
      <div className="flex px-6 justify-start">
        <Link
          href={isCompany ? '/company/dashboard' : '/talent/dashboard'}
          className="text-sm text-gray-500 hover:underline py-4"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Banner */}
      <div className="relative h-48 w-full max-w-[804px] rounded-t-xl bg-primary-300">
        <div className="absolute -bottom-12 left-6 h-40 w-40 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
          <Image
            src={profile?.bio?.user?.photo_url || MOCK_PROFILE?.avatar}
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Main Card */}
      <Card className="max-w-[804px] rounded-t-none">
        <CardHeader className="p-10 pb-0 flex justify-between items-start">
          <div></div>
          <Link href="/settings/profile" className="inline-block">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 text-xs text-[#344054] border-[#D0D5DD] font-semibold hover:bg-gray-50 rounded"
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

        <CardContent className="p-6 pt-0">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
            <div>
              <h2 className="text-2xl font-semibold text-black">
                {profile?.bio?.user?.firstname} {profile?.bio?.user?.lastname}
              </h2>
              <p className="text-base text-black">{trackName}</p>
              <p className="text-sm text-gray-600">
                {stateName}, {countryName}{' '}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <span className="font-semibold">Work Experience: </span>

                {/* {profile?.work_experience || "N/A"} */}
              </p>
              <p className="text-sm text-gray-700">
                {/* {profile?.cv_id || "N/A"} */}
                <span
                  className="h-3 w-3 rounded-full"
                  // {`${profile?.availability === "available" ? "bg-green-500" : "bg-amber-500"}`}
                ></span>
              </p>
            </div>

            <div className="text-sm text-gray-700 text-right">
              <p className="font-semibold text-black">Attachments</p>

              <p>
                Portfolio:{' '}
                <a
                  href={profile?.bio?.project_url || ' '}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-300 hover:underline"
                >
                  Link
                </a>
              </p>

              <p>
                Resume:{' '}
                <a
                  href={profile?.bio?.project_file_url || ' '}
                  download
                  className="text-primary-300 hover:underline"
                >
                  Link
                </a>
              </p>
            </div>
          </div>

          {/* BIO */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-black mb-4">Bio</h3>
            <p className="text-base text-black whitespace-pre-line">
              {profile?.bio?.bio ?? MOCK_PROFILE.bio}
            </p>
          </div>

          {/* EXPERIENCE */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-black mb-6">
              Experience
            </h3>

            {MOCK_PROFILE.experience.length === 0 ? (
              <p className="text-gray-500 text-sm">No experience added yet.</p>
            ) : (
              <div className="space-y-6">
                {MOCK_PROFILE.experience.map((job) => (
                  <div key={job.id}>
                    <p className="text-sm text-gray-500 mb-1">{job.date}</p>
                    <p className="text-base font-semibold text-black">
                      {job.role}
                    </p>
                    <p className="text-sm text-black">{job.company}</p>

                    {job.bullets?.length > 0 && (
                      <ul className="list-disc ml-5 text-gray-600 mt-2 space-y-1">
                        {job.bullets.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SKILLS */}
          <div>
            <h3 className="text-2xl font-semibold text-black mb-4">Skills</h3>

            <div className="flex flex-wrap gap-2">
              {MOCK_PROFILE.skills.length === 0 ? (
                <p className="text-gray-500 text-sm">No skills added yet.</p>
              ) : (
                MOCK_PROFILE.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white border border-[#EAF0ED] text-sm text-black rounded-2xl"
                  >
                    {skill}
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
