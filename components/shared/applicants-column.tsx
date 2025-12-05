import { DataStatus } from '@/components/shared/ui/table-status';
import type { ColumnDef } from '@tanstack/react-table';
import { DM_Sans } from 'next/font/google';
import ApplicantActions from './applicant-actions';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export type Applicant = {
  job_id: string | number | null;
  job: { id?: string | number } | null;
  id: string;
  name: string;
  email: string;
  applied_role?: string;
  user_id?: string;
  status:
    | 'Hired'
    | 'Interview'
    | 'In Review'
    | 'Shortlisted'
    | 'Rejected'
    | 'Applied'
    | string;
  applied_date: string;
};

export const createColumns = (companyId: string): ColumnDef<Applicant>[] => [
  {
    accessorKey: 'name',
    header: 'Applicant Name',
    cell: ({ row }) => {
      const name = row.getValue('name') as string;

      return (
        <span
          className={`${dmSans.className} flex items-center gap-1 text-tertiary-500 text-base font-normal`}
        >
          <span>{name}</span>
        </span>
      );
    },
  },

  {
    accessorKey: 'email',
    header: 'Email *',
    cell: ({ row }) => {
      const email = row.getValue('email') as string;

      return (
        <span
          className={`${dmSans.className} text-[#121212] text-base font-normal`}
        >
          {email}
        </span>
      );
    },
  },

  {
    accessorKey: 'applied_role',
    header: 'Job Applied',
    cell: ({ row }) => {
      const role = row.getValue('applied_role') as string;

      return (
        <span
          className={`${dmSans.className} text-black text-base font-normal`}
        >
          {role}
        </span>
      );
    },
  },

  {
    accessorKey: 'status',
    header: 'Job Status',
    cell: ({ row }) => <DataStatus status={row.getValue('status')} />,
  },

  {
    accessorKey: 'applied_date',
    header: 'Date Applied',
    cell: ({ row }) => {
      const date = row.getValue('applied_date') as string;

      return (
        <span
          className={`${dmSans.className} text-tertiary-75 text-base font-normal`}
        >
          {date}
        </span>
      );
    },
  },

  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => {
      const job_id = row.original.job_id as string;
      const applicant_id = row.original.id as string;

      return (
        <ApplicantActions
          company_id={companyId}
          job_id={job_id}
          applicant_id={applicant_id}
        />
      );
    },
  },
];
