import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { type CompanySignUpFormValues } from '../schema';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Input from '@/components/ui/input';

interface CompanySignUpFormStep2Props {
  form: UseFormReturn<CompanySignUpFormValues>;
}

export function CompanySignUpFormStep2({ form }: CompanySignUpFormStep2Props) {
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
