import {
  Applicant,
  Job,
  ViewJobApplications,
} from '@/types/view-job-applicants';
import { makeAuthenticatedRequest } from '../config.server';

export const view_applicants_per_company = async (company_id: string) => {
  const res = await makeAuthenticatedRequest<ViewJobApplications>(
    `employer/company/${company_id}/applications`,
    {
      method: 'GET',
    },
  );
  return res;
};

export const view_applicants_per_job = async (
  company_id: string,
  job_id: string,
) => {
  const res = await makeAuthenticatedRequest<Job>(
    `employer/company/${company_id}/jobs/${job_id}/applications`,
    {
      method: 'GET',
    },
  );
  return res;
};

export const view_applicant_details = async (
  company_id: string,
  job_id: string,
  applicant_id: string,
) => {
  const res = await makeAuthenticatedRequest<Applicant>(
    `employer/company/${company_id}/jobs/${job_id}/applications/${applicant_id}`,
  );

  return res;
};

export const change_applicant_status = async ({
  company_id,
  applicant_id,
  job_id,
  status,
}: {
  company_id: string;
  job_id: string;
  applicant_id: string;
  status: string;
}) => {
  const res = await makeAuthenticatedRequest<Applicant>(
    `employer/company/${company_id}/jobs/${job_id}/applications/${applicant_id}/status/${status}`,
    { method: 'PUT' },
  );

  return res;
};
