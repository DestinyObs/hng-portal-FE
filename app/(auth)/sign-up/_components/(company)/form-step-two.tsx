import { CompanySignUpFormStepTwoProps } from '@/types/auth';

import Input from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export function CompanySignUpFormStepTwo({
  form,
}: CompanySignUpFormStepTwoProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="company_website"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Company Website</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your company's website"
                aria-invalid={!!fieldState.error}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="industry"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Industry</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your company's industry"
                aria-invalid={!!fieldState.error}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
