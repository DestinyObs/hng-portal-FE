'use client';

import { useRouter } from 'next/navigation';
import Dropdown from './ui/dropdown';
import { EllipsisVertical } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { useState } from 'react';
import ChangeJobStatusModal from '../applications/change-job-status-modal';

export default function ApplicantActions({
  job_id,
  applicant_id,
}: {
  job_id: string;
  applicant_id: string;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useAuthStore();
  const router = useRouter();

  return (
    <>
      <ChangeJobStatusModal
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        applicant_id={applicant_id}
        company_id={user?.company?.id as string}
        job_id={job_id}
      />
      <Dropdown
        dropdownMenuContent="end"
        triggerVariant="data-menu"
        title={<EllipsisVertical size={15} />}
        values={[
          {
            name: 'View',
            action: () =>
              router.push(
                `/company/${user?.company?.id}/job/${job_id}/applicant/${applicant_id}`,
              ),
          },
          {
            name: 'Edit Status',
            action() {
              setOpenDialog(true);
            },
            //   action: () =>
            //     router.push(`/dashboard/applicants/${job_id}/edit`),
          },
        ]}
      />
    </>
  );
}
