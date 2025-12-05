import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type ApplicantData = {
  user: {
    photo_url?: string | null;
    firstname: string;
    othername?: string | null;
    lastname: string;
    email: string;
    phone?: string | null;
    address_id?: string | null;
  };
  job: {
    title: string;
  };
  resume?: string | null;
  portfolio_link?: string | null;
};

type Props = {
  applicant: ApplicantData;
  onBack: () => void;
};

const ApplicantHeader = ({ applicant, onBack }: Props) => {
  return (
    <>
      {/* Back Button */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <div className="border border-gray-300 rounded-md p-1">
              <ChevronLeft size={16} />
            </div>
            <span className="text-sm font-medium">Back to Applicants</span>
          </button>
        </div>
      </div>

      {/* Applicant Info Card */}
      <Card className="border border-gray-200 overflow-hidden">
        {/* Banner */}
        <div className="relative h-32 bg-linear-to-r from-primary-300 to-primary-400">
          <div className="absolute -bottom-12 left-6">
            <div className="h-24 w-24 rounded-full border-4 bg-white overflow-hidden shadow-lg">
              {applicant.user.photo_url ? (
                <Image
                  src={applicant.user.photo_url}
                  alt="Applicant"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-2xl font-bold">
                  {applicant.user.firstname?.[0]}
                  {applicant.user.lastname?.[0]}
                </div>
              )}
            </div>
          </div>
        </div>

        <CardContent className="pt-16 px-6 pb-6 wrap-break-word">
          <h1 className="text-3xl font-bold mb-1 wrap-break-word">
            {`${applicant.user.firstname} ${applicant.user.othername ?? ''} ${applicant.user.lastname}`.trim()}
          </h1>

          <p className="text-xl text-gray-700 mb-2 wrap-break-word">
            {applicant.job.title}
          </p>

          {applicant.user.address_id && (
            <p className="text-sm text-gray-500 wrap-break-word">
              {applicant.user.address_id}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-t border-gray-200">
            <Info label="Email" value={applicant.user.email} />
            {applicant.user.phone && (
              <Info label="Phone" value={applicant.user.phone} />
            )}
          </div>

          <Attachments
            resume={applicant.resume ?? undefined}
            portfolio={applicant.portfolio_link ?? undefined}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default ApplicantHeader;

/* UTIL COMPONENTS */

const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-gray-500 uppercase mb-1 wrap-break-word">
      {label}
    </p>
    <p className="text-sm text-gray-900 wrap-break-word">{value}</p>
  </div>
);

const Attachments = ({
  resume,
  portfolio,
}: {
  resume?: string;
  portfolio?: string;
}) => {
  if (!resume && !portfolio) return null;

  const formatLink = (url: string) =>
    url.startsWith('http') ? url : `https://${url}`;

  return (
    <div className="py-4 border-t border-gray-200">
      <p className="text-xs text-gray-500 uppercase mb-3">Attachments</p>

      <div className="flex flex-wrap gap-3 wrap-break-word">
        {resume && (
          <a
            href={formatLink(resume)}
            target="_blank"
            className="inline-flex px-4 py-2 text-sm font-medium text-primary-300 bg-primary-50 rounded-lg hover:bg-primary-100 wrap-break-word"
          >
            Document
          </a>
        )}

        {portfolio && (
          <a
            href={formatLink(portfolio)}
            target="_blank"
            className="inline-flex px-4 py-2 text-sm font-medium text-primary-300 bg-primary-50 rounded-lg hover:bg-primary-100 wrap-break-word"
          >
            Portfolio
          </a>
        )}
      </div>
    </div>
  );
};
