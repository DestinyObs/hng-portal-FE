import { DataTable } from '@/components/shared/ui/data-table';
import { Applicant } from '@/components/shared/applicants-column';
import { ColumnDef } from '@tanstack/react-table';

interface Props {
  data: Applicant[];
  columns: ColumnDef<Applicant>[];
}

export default function ApplicantsTable({ data, columns }: Props) {
  if (data.length === 0) {
    return (
      <div className="text-center py-16 text-tertiary-500 text-lg">
        No applicants found
      </div>
    );
  }

  return (
    <section className="w-full overflow-x-auto">
      <DataTable columns={columns} data={data} />
    </section>
  );
}