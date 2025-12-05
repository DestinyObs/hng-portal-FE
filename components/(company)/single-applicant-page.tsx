'use client';

import {
  change_applicant_status,
  view_applicant_details,
} from '@/api/actions/view-applicants';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import Loading from '@/app/loading';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  company_id: string;
  job_id: string;
  applicant_id: string;
};

const SingleApplicantView = ({ company_id, job_id, applicant_id }: Props) => {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['single_applicant_view'],
    queryFn: async () =>
      await view_applicant_details(company_id, job_id, applicant_id),
  });

  const { mutate: shortListCandidate, isPending: addingToShortlist } =
    useMutation({
      mutationKey: ['change_applicant_status'],
      mutationFn: change_applicant_status,
      onSuccess: (data) => {
        if (data.success) {
          toast.success(
            'This application has been added to your candidate list',
          );
        }
      },
      onError: () => {
        toast.error('Failed to add applicant to list, please try again');
      },
    });
  const { mutate: rejectCandidate, isPending: rejectingCandidate } =
    useMutation({
      mutationKey: ['change_applicant_status'],
      mutationFn: change_applicant_status,
      onSuccess: (data) => {
        if (data.success) {
          toast.success('This application has been rejected');
        }
      },
      onError: () => {
        toast.error('An error occured, please try again');
      },
    });

  const add_to_candidate_list = () => {
    shortListCandidate({
      company_id,
      job_id,
      applicant_id,
      status: 'shortlisted',
    });
  };

  const reject_application = () => {
    rejectCandidate({ company_id, job_id, applicant_id, status: 'rejected' });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div
        className="flex items-center gap-2 cursor-pointer px-4 md:px-18 xl:px-44"
        onClick={() => router.back()}
      >
        <aside className="border border-black/50 shadow-md rounded-md size-5 flex items-center justify-center">
          <ChevronLeft size={14} />
        </aside>
        <p className="text-sm font-medium">Back</p>
      </div>
      <div className="w-full flex flex-col gap-9 p-4 px-4 md:px-18 xl:px-44 md:p-8 lg:flex-row">
        <div className="w-full max-w-4xl mx-auto">
          {/* Banner */}
          <div className="relative h-44 w-full rounded-t-xl bg-primary-300">
            <div className="absolute -bottom-10 left-6 h-32 w-32 rounded-full shadow-md overflow-hidden">
              <Image
                src={data?.data.user.photo_url || ''}
                alt="Applicant Image"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Main Card */}
          <Card className="rounded-t-none">
            <CardContent className="p-6 pt-8">
              {/* HEADER */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
                <div>
                  <h2 className="text-2xl font-semibold text-black">
                    {`${data?.data.user.firstname} ${data?.data.user.othername || ''} ${data?.data.user.lastname}`}
                  </h2>
                  <p className="text-base text-black">{data?.data.job.title}</p>

                  <div className="flex flex-col gap-1 mt-1">
                    <p className="text-sm text-gray-600">
                      {data?.data.user.address_id}
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="text-sm text-gray-700 text-right">
                  <p className="font-semibold text-black">Attachments</p>
                  <p className="font-medium">
                    Resume:{' '}
                    <a
                      href={`https://${data?.data.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-300 hover:underline"
                    >
                      Link
                    </a>
                  </p>
                  {data?.data.portfolio_link && (
                    <p>
                      Portfolio Link:{' '}
                      <a
                        href={`https://${data?.data.portfolio_link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-300 hover:underline"
                      >
                        Link
                      </a>
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-semibold text-black mb-4">
                  Job Description
                </h3>
                <p className="text-base text-black/70 whitespace-pre-line">
                  {data?.data.job.description}
                </p>
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-semibold text-black mb-4">
                  Acceptance Criteria
                </h3>
                <p className="text-base text-black/70 whitespace-pre-line">
                  {data?.data.job.acceptance_criteria}
                </p>
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-semibold text-black mb-4">
                  Applicant Cover Letter
                </h3>
                <p className="text-base text-black/70 whitespace-pre-line">
                  {data?.data.cover_letter}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="rounded-lg shadow bg-white w-full p-4 h-fit flex flex-col gap-3.5 lg:w-96">
          <Button
            size={'sm'}
            disabled={addingToShortlist}
            onClick={add_to_candidate_list}
          >
            {addingToShortlist ? 'Adding...' : 'Add to Candidate List'}
          </Button>
          <Button
            variant={'destructiveOutline'}
            disabled={rejectingCandidate}
            onClick={reject_application}
          >
            {rejectingCandidate ? 'Rejecting...' : 'Reject'}
          </Button>
        </div>
      </div>
    </>
  );
};
export default SingleApplicantView;
