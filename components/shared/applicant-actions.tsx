'use client';

import { useRouter } from 'next/navigation';
import Dropdown from './ui/dropdown';
import { EllipsisVertical } from 'lucide-react';
import { useAuthStore } from '@/store/auth';

export default function ApplicantActions({
  job_id,
  applicant_id,
}: {
  job_id: string;
  applicant_id: string;
}) {
  const { user } = useAuthStore();
  const router = useRouter();

  return (
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
          //   action: () =>
          //     router.push(`/dashboard/applicants/${job_id}/edit`),
        },
      ]}
    />
  );
}
