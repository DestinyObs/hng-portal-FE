import { Checkbox } from '@/components/shared/ui/checkbox';
import Dropdown from '@/components/shared/ui/dropdown';
import { DataStatus } from '@/components/shared/ui/table-status';
import { ColumnDef } from '@tanstack/react-table';
import { EllipsisVertical, Verified } from 'lucide-react';

export type Applicant = {
  id: string;
  name: string;
  verified: boolean;
  phone: string;
  applied_role: string;
  status: 'Hired' | 'Interview' | 'In Review' | 'Shortlisted' | string;
  applied_date: string;
};

export const columns: ColumnDef<Applicant>[] = [
  // checkbox
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // candidates
  {
    accessorKey: 'name',
    header: 'Candidates',
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      const verified = row.getValue('verified') as boolean;

      return (
        <span className="flex items-center gap-1">
          <span>{name}</span>{' '}
          {verified && <Verified fill="#00AEFF" color="white" size={15} />}
        </span>
      );
    },
  },

  // HNG Status
  {
    accessorKey: 'verified',
    header: 'HNG Status',
    cell: ({ row }) => {
      return (
        <DataStatus
          status={row.getValue('verified') ? 'verified' : 'unverified'}
        />
      );
    },
  },

  // phone no
  {
    accessorKey: 'phone',
    header: 'Phone No',
  },

  // Job Applied
  {
    accessorKey: 'applied_role',
    header: 'Job Applied',
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
    // cell: ({row})=> {
    //    return <ProductStatus status={row.getValue('label_status')} />
    // }
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
          values={[{ name: 'action' }, { name: 'delete' }, { name: 'view' }]}
        />
      );
    },
  },
];
