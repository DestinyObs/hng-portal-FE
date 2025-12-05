import SingleApplicantView from '@/components/(company)/single-applicant-page';

interface ApplicantPage {
  params: {
    companyId: string;
    applicantId: string;
    jobId: string;
  };
}

export default async function ApplicantPage({ params }: ApplicantPage) {
  const { applicantId, companyId, jobId } = await params;

  return (
    <div className="w-full min-h-screen py-4">
      <SingleApplicantView
        company_id={companyId}
        job_id={jobId}
        applicant_id={applicantId}
      />
    </div>
  );
}
