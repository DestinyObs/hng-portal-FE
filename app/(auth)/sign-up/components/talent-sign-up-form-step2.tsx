import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { type TalentSignUpFormValues } from '../schema';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Input from '@/components/ui/input';

interface TalentSignUpFormStep2Props {
  form: UseFormReturn<TalentSignUpFormValues>;
}

export function TalentSignUpFormStep2({ form }: TalentSignUpFormStep2Props) {
  return (
    <>
      <FormField
        control={form.control}
        name="phone_number"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your phone number"
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
        name="country"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Country</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your country"
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
