'use client';

import {
  Loader2,
  ArrowLeft,
  Mail,
  Calendar,
  Briefcase,
} from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getApplicantDetails } from '@/app/api/actions/view-applicant-details';
import { ApplicationStatusButtons } from '@/components/shared/application-status-buttons';
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
            ((response.data as { application?: ApplicantData }).application) ||
              (response.data as ApplicantData)
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
}
