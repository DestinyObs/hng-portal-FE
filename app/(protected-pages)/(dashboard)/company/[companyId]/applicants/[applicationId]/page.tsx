'use client';

import {
  Loader2,
  ArrowLeft,
  Mail,
  Calendar,
  Briefcase,
  MapPin,
} from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getApplicantDetails } from '@/app/api/actions/view-applicant-details';
import { ApplicationStatusButtons } from '@/components/shared/application-status-buttons';
import Link from 'next/link';

type ApplicantData = {
  application?: any;
  user?: {
    firstname: string;
    lastname: string;
    email: string;
  };
  job?: {
    title: string;
  };
  status: string;
  date_added: string;
  resume_url?: string;
  cover_letter?: string;
};

export default function ApplicantDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const applicationId = params.applicationId as string;
  const companyId = params.companyId as string;

  const [app, setApp] = useState<ApplicantData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!companyId || companyId === 'undefined') {
        setLoading(false);
        return;
      }

      let jobId = searchParams.get('jobId');
      if (!jobId || jobId === 'undefined') {
        const path = window.location.pathname;
        const parts = path.split('/');
        const jobsIndex = parts.findIndex((p) => p === 'jobs');
        jobId = jobsIndex !== -1 ? parts[jobsIndex + 1] : null;
      }

      if (!jobId || jobId === 'undefined') {
        setLoading(false);
        return;
      }

      try {
        const response = await getApplicantDetails(
          companyId,
          jobId,
          applicationId,
        );
        if (response.success && response.data) {
          setApp((response.data as any).application || response.data);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [applicationId, companyId, searchParams]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="w-10 h-10 animate-spin text-[#3730A3]" />
      </div>
    );
  }

  if (!app) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Applicant not found
      </div>
    );
  }

  const fullName =
    `${app.user?.firstname || ''} ${app.user?.lastname || ''}`.trim();
  const appliedDate = new Date(app.date_added).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const statusConfig = {
    pending: {
      text: 'text-[#3730A3]',
      bg: 'bg-[#EEF2FF]',
      dot: 'bg-[#3730A3]',
      label: 'Applied',
    },
    approved: {
      text: 'text-[#3730A3]',
      bg: 'bg-[#E0E7FF]',
      dot: 'bg-[#3730A3]',
      label: 'Shortlisted',
    },
    rejected: {
      text: 'text-[#EF4444]',
      bg: 'bg-[#FEF2F2]',
      dot: 'bg-[#EF4444]',
      label: 'Rejected',
    },
  };

  const statusKey = app.status.toLowerCase();
  const status =
    statusConfig[statusKey as keyof typeof statusConfig] ||
    statusConfig.pending;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <Link
          href="/company/applicants"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 text-sm font-medium transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to applicants
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-8 py-10 bg-linear-to-r from-[#3730A3]/5 to-transparent">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-[#3730A3]/10 rounded-full flex items-center justify-center text-3xl font-bold text-[#3730A3] shrink-0">
                  {fullName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {fullName}
                  </h1>
                  <p className="text-xl text-gray-600 mt-1">
                    {app.job?.title || 'N/A'}
                  </p>
                  <div className="mt-4">
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${status.text} ${status.bg}`}
                    >
                      <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                      {status.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-10">
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">
                      {app.user?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Applied on</p>
                    <p className="font-medium text-gray-900">{appliedDate}</p>
                  </div>
                </div>

                {app.resume_url && (
                  <a
                    href={app.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#3730A3] text-white rounded-lg font-medium hover:bg-[#2D2787] transition"
                  >
                    <Briefcase className="w-5 h-5" />
                    Download Resume
                  </a>
                )}
              </div>
            </div>

            {app.cover_letter && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Cover Letter
                </h3>
                <div className="p-6 bg-gray-50 rounded-xl text-gray-700 leading-relaxed whitespace-pre-wrap border border-gray-200">
                  {app.cover_letter}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons — Outside the card, centered, pill style */}
        <div className="mt-12 flex justify-center">
          <ApplicationStatusButtons
            applicationId={applicationId}
            companyId={companyId}
            jobId={searchParams.get('jobId') || ''}
            currentStatus={app.status}
            onStatusUpdate={(newStatus) =>
              setApp((prev) => (prev ? { ...prev, status: newStatus } : null))
            }
          />
        </div>
      </div>
    </div>
  );
}
