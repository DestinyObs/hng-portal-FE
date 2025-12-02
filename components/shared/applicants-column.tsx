import Dropdown from '@/components/shared/ui/dropdown';
import { DataStatus } from '@/components/shared/ui/table-status';
import { ColumnDef } from '@tanstack/react-table';
import { EllipsisVertical } from 'lucide-react';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export type Applicant = {
  id: string;
  name: string;
  email: string;
  applied_role: string;
  status:
    | 'Hired'
    | 'Interview'
    | 'In Review'
    | 'Shortlisted'
    | 'Rejected'
    | string;
  applied_date: string;
};

export const columns: ColumnDef<Applicant>[] = [
  // checkbox
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={(value: boolean) =>
  //         table.toggleAllPageRowsSelected(!!value)
  //       }
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  // candidates
  {
    accessorKey: 'name',
    header: 'Applicant Name',
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      // const verified = row.getValue('verified') as boolean;

      return (
        <span
          className={`${dmSans.className} flex items-center gap-1 text-tertiary-500 text-base font-normal`}
        >
          <span>{name}</span>{' '}
          {/* {verified && <Verified fill="#00AEFF" color="white" size={15} />} */}
        </span>
      );
    },
  },

  // email
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

  // Job status
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

  {
    accessorKey: 'action_buttons',
    header: '',
    cell: () => {
      return (
        <Dropdown
          dropdownMenuContent={'end'}
          triggerVariant="data-menu"
          title={<EllipsisVertical size={15} />}
          values={[{ name: 'View' }, { name: 'Edit Status' }]}
        />
      );
    },
  },
];
