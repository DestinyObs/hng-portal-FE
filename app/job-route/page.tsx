'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Copy,
  Bookmark,
  BookmarkPlus,
  ExternalLink,
  CalendarClock,
} from 'lucide-react';
import { Job } from '@/types/job-card';
import { PreviewJob } from '@/components/(company)/preview';

const JobCard: React.FC<Job> = ({
  title,
  company,
  companyLogo = '/images/company-profile.png',
  salary,
  location = 'Lagos, Nigeria',
  workType = 'Full Time',
  level = 'Entry Level',
  onsiteOrRemote = 'On site',
  posted = 'Yesterday',
  description,
  skills = [],
  applyLink = '#',
}) => {
  return (
    <div className=" flex gap-5">
      <PreviewJob />

      <div className="card-2 ">
        <div className="w-full sm:w-[260px] rounded-2xl border border-gray-200 bg-white shadow-sm p-5 space-y-6">
          {/* Salary */}
          <div>
            <p className="text-2xl font-bold text-gray-800">₦125,000</p>
            <p className="text-sm text-gray-500 mt-1">Salary</p>
          </div>

          {/* Apply Button */}
          <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2.5 rounded-xl text-sm font-medium transition">
            Apply Now
          </button>

          {/* Save Job */}
          <button className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
            Save job
          </button>

          {/* Share */}
          <button className="w-full flex items-center justify-center gap-2 text-primary-500 text-sm font-medium hover:underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 12v7a1 1 0 001 1h3m10-8l-4-4m0 0l-4 4m4-4v12" />
            </svg>
            Share This Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
