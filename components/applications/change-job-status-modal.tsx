import { useForm } from 'react-hook-form';
import { Dialog, DialogContent } from '../ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import {
  changeApplicantStatusSchema,
  ChangeApplicantStatusSchema,
} from '@/validations/job-applicants';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { change_applicant_status } from '@/api/actions/view-applicants';
import { toast } from 'sonner';
import { APIResponse } from '@/types/api-response';
import { Applicant } from '@/types/view-job-applicants';
import { Button } from '../ui/button';

const ChangeJobStatusModal = ({
  openDialog,
  setOpenDialog,
  company_id,
  job_id,
  applicant_id,
}: {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  company_id: string;
  job_id: string;
  applicant_id: string;
}) => {
  const queryClient = useQueryClient();

  const form = useForm<ChangeApplicantStatusSchema>({
    resolver: zodResolver(changeApplicantStatusSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      status: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['change_applicant_status'],
    mutationFn: change_applicant_status,
    onSuccess: (response: APIResponse<Applicant | null>) => {
      if (response.success && response.data?.user) {
        toast.success(response.message);
        setOpenDialog(false);

        queryClient.invalidateQueries({
          queryKey: ['applicants_per_job'],
        });
      } else {
        const errorMessage = response.message || 'An unknown error occurred.';
        if (response.errors) {
          const errorString = Object.values(response.errors).flat().join(' ');
          toast.error(errorString);
        } else {
          toast.error(errorMessage);
        }
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'A network or unexpected error occurred.');
    },
  });

  const onSubmit = (values: ChangeApplicantStatusSchema) => {
    mutate({ company_id, job_id, applicant_id, status: values.status });
  };

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="rounded-xl w-full border-none">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full mx-auto flex flex-col gap-2 p-0 lg:w-96"
            >
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="shortlisted">Shortlist</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="hired">Hire</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="rejected">Reject</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage className="animate-in slide-in-from-top-1 duration-200" />
                  </FormItem>
                )}
              />

              <Button size={'sm'} disabled={isPending}>
                {isPending ? 'Processing...' : 'Confirm'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ChangeJobStatusModal;
