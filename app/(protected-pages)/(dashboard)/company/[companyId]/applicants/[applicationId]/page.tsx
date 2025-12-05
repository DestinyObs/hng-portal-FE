'use client';

import { Loader2, ArrowLeft } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getApplicantDetails } from '@/app/api/actions/view-applicant-details';
import ApplicationStatusButtons from '@/components/shared/application-status-buttons';
import Link from 'next/link';

type ApplicantData = {
  application?: unknown;
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
          setApp(
            (response.data as { application?: ApplicantData }).application ||
              (response.data as ApplicantData),
          );
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
      <div className="w-full min-h-screen py-4">
        <div className="bg-white p-6 rounded-2xl">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary-300" />
            <span className="ml-3 text-tertiary-500 text-lg">
              Loading applicant...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="w-full min-h-screen py-4">
        <div className="bg-white p-6 rounded-2xl text-center text-tertiary-500">
          Applicant not found.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-4 space-y-6">
      {/* Back Link */}
      <Link
        href="/company/applicants"
        className="flex items-center text-primary-600 hover:underline gap-2 px-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Applicants
      </Link>

      {/* Applicant Detail Card */}
      <div className="bg-white p-6 rounded-2xl border border-tertiary-100 shadow-sm space-y-4 mx-4 md:mx-0">
        <h2 className="text-xl font-semibold text-black">
          {app.user?.firstname} {app.user?.lastname}
        </h2>

        <p className="text-tertiary-500">
          <span className="font-medium text-gray-700">Email: </span>
          {app.user?.email}
        </p>

        <p className="text-tertiary-500">
          <span className="font-medium text-gray-700">Job Applied For: </span>
          {app.job?.title}
        </p>

        <p className="text-tertiary-500">
          <span className="font-medium text-gray-700">Status: </span>
          {app.status}
        </p>

        <p className="text-tertiary-500">
          <span className="font-medium text-gray-700">Applied On: </span>
          {app.date_added}
        </p>

        {app.resume_url && (
          <a
            href={app.resume_url}
            target="_blank"
            rel="noreferrer"
            className="text-primary-600 hover:underline"
          >
            View Resume
          </a>
        )}

        {app.cover_letter && (
          <div className="mt-4 p-4 bg-tertiary-50 rounded-lg">
            <h3 className="font-medium mb-2">Cover Letter</h3>
            <p className="text-tertiary-500">{app.cover_letter}</p>
          </div>
        )}
      </div>

      {/* Action Buttons Outside the Card */}
      <div className="flex gap-3 flex-wrap mx-4 md:mx-0">
        <ApplicationStatusButtons
          applicationId={applicationId}
          companyId={companyId}
          jobId={searchParams.get('jobId') ?? ''}
          currentStatus={app.status}
          onStatusUpdate={(newStatus) =>
            setApp((prev) => (prev ? { ...prev, status: newStatus } : prev))
          }
        />
      </div>
    </div>
  );
}
