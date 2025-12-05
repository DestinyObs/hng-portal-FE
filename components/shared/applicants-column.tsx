import { DataStatus } from '@/components/shared/ui/table-status';
import { ColumnDef } from '@tanstack/react-table';
import { DM_Sans } from 'next/font/google';
import Link from 'next/link';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export type Applicant = {
  job_id: any;
  job: any;
  id: string;
  name: string;
  email: string;
  applied_role?: string;
  status:
    | 'Hired'
    | 'Interview'
    | 'In Review'
    | 'Shortlisted'
    | 'Rejected'
    | string;
  applied_date: string;
};

export const createColumns = (companyId: string): ColumnDef<Applicant>[] => [
  // Applicant Name
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

  // Email
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

  // Job Applied
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

  // Job Status
  {
    accessorKey: 'status',
    header: 'Job Status',
    cell: ({ row }) => {
      return <DataStatus status={row.getValue('status')} />;
    },
  },

  // Applied Date
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

  // Actions (View Details)
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const applicant = row.original;
      const jobId = applicant.job?.id || applicant.job_id;

      return (
        <Link
          href={`/company/${companyId}/applicants/${applicant.id}?jobId=${jobId}`}
          className="text-primary-600 hover:underline text-sm font-medium"
        >
          View Details
        </Link>
      );
    },
  },
];