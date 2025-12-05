'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Country, State } from 'country-state-city';
import { CompanyProfileData } from '@/types/profile';
import ReactMarkdown from 'react-markdown';

interface CompanyProfileViewProps {
  profile: CompanyProfileData | null | undefined;
  isOwnProfile?: boolean;
}

export function CompanyProfileDisplay({
  profile,
}: CompanyProfileViewProps) {
  if (!profile) return null;

  const countryName =
    (profile?.country && Country.getCountryByCode(profile.country)?.name) || '';
  const stateName =
    (profile?.state && profile?.country && State.getStateByCodeAndCountry(
      profile.state,
      profile.country,
    )?.name) || '';

  const cleanList = (text: string | null | undefined) => {
    if (!text) return null;
    return text
      .split('\n')
      .filter((line) => line.replace(/-/g, '').trim().length > 0)
      .join('\n');
  };

  const valueProp = cleanList(profile.value_proposition)
  const whyWorkHere = cleanList(profile.why_talents_should_work_with_us)
  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      {/* Banner */}
      <div className="relative h-48 w-full max-w-[804px] rounded-t-xl bg-primary-300">
        <div className="absolute -bottom-12 left-6 h-40 w-40 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
          <Image
            src={profile.logo_url || '/images/portraitPlaceholder.png'}
            alt="Company Logo"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>

      {/* Main Card */}
      <Card className="max-w-[804px] rounded-t-none">
        <CardHeader className="p-10 pb-0 flex justify-between items-start">
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
            <div>
              <h2 className="text-2xl font-semibold text-black">
                {profile.name}
              </h2>
              <p className="text-base text-black">{profile.tagline || 'No tagline provided'}</p>
              <p>
                Website:{' '}
                <a
                  href={profile.website_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-300 hover:underline"
                >
                  {profile.website_url ? 'Website Link' : 'N/A'}
                </a>
              </p>
              <p className="text-sm text-gray-700">
                {profile.company_size ? `${profile.company_size} Employees` : 'Number of Employees - '}
              </p>
              <p className="text-sm text-gray-600">
                {[stateName, countryName].filter(Boolean).join(', ') || 'Location: - '}
              </p>
            </div>
          </div>

          {/* ABOUT */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-black mb-4">
              About Company
            </h3>
            <p className="text-base text-black whitespace-pre-line">
              {profile.description || 'No company description added yet.'}
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-black mb-4">
              Value Proposition
            </h3>
            <div className="text-base text-black">
               {valueProp ? (
                  <ReactMarkdown 
                    components={{
                      ul: ({ ...props}) => <ul className="list-disc pl-5 space-y-1" {...props} />,
                      li: ({ ...props}) => <li className="pl-1" {...props} />,
                    }}
                  >
                    {valueProp}
                  </ReactMarkdown>
               ) : 'No information added yet'}
            </div>
          </div>

          {/* WHY TALENTS SHOULD WORK WITH US */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-black mb-4">
              Why Talents Should Work With Us
            </h3>
            <div className="text-base text-black">
              {whyWorkHere ? (
                <ReactMarkdown
                  components={{
                    ul: ({ ...props }) => <ul className="list-disc pl-5 space-y-1" {...props} />,
                    li: ({ ...props }) => <li className="pl-1" {...props} />,
                  }}
                >
                  {whyWorkHere}
                </ReactMarkdown>
              ) : (
                'No information added yet.'
              )}
            </div>
          </div>

          {/* INDUSTRY */}
          <div>
            <h3 className="text-2xl font-semibold text-black mb-4">Industry</h3>
            <div className="flex flex-wrap gap-2">
              {profile.industry ? (
                <span className="px-3 py-1 bg-white border border-[#EAF0ED] text-sm text-black rounded-2xl">
                  {profile.industry}
                </span>
              ) : (
                <p className="text-gray-500 text-sm">No industry specified.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
