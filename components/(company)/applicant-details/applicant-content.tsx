import { Card, CardContent } from '@/components/ui/card';

type ApplicantData = {
  cover_letter?: string | null;
  job: {
    acceptance_criteria?: string | null;
  };
};

type Props = {
  applicant: ApplicantData;
};

const ApplicantContent = ({ applicant }: Props) => {
  return (
    <div className="space-y-6">
      {/* Cover Letter */}
      <Card className="border border-gray-200">
        <CardContent className="p-6 wrap-break-word">
          <SectionTitle>Cover Letter</SectionTitle>
          <p className="text-sm text-gray-700 whitespace-pre-line wrap-break-word">
            {applicant.cover_letter ?? 'No cover letter provided.'}
          </p>
        </CardContent>
      </Card>

      {/* Job Requirements */}
      {applicant.job.acceptance_criteria && (
        <Card className="border border-gray-200">
          <CardContent className="p-6 wrap-break-word">
            <SectionTitle>Job Requirements</SectionTitle>
            <p className="text-sm text-gray-700 whitespace-pre-line wrap-break-word">
              {applicant.job.acceptance_criteria}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApplicantContent;

/* UTIL COMPONENTS */

const SectionTitle = ({ children }: { children: string }) => (
  <h2 className="text-lg font-semibold text-gray-900 mb-4 wrap-break-word">
    {children}
  </h2>
);
