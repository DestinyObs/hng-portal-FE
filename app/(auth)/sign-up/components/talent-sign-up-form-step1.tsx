import React from 'react';
import Link from 'next/link';
import { UseFormReturn } from 'react-hook-form';
import { type TalentSignUpFormValues } from '../schema';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import Input from '@/components/ui/input';

interface TalentSignUpFormStep1Props {
  form: UseFormReturn<TalentSignUpFormValues>;
}

export function TalentSignUpFormStep1({ form }: TalentSignUpFormStep1Props) {
  return (
    <>
      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field, fieldState }) => (
            <FormItem className="flex-1">
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your first name"
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
          name="last_name"
          render={({ field, fieldState }) => (
            <FormItem className="flex-1">
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your last name"
                  aria-invalid={!!fieldState.error}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Email Address</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your email address"
                type="email"
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
        name="password"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter password"
                inputType="password"
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
        name="password_confirmation"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input
                placeholder="Confirm password"
                inputType="password"
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
        name="acceptTerms"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Accept Terms and{' '}
                <Link
                  href="/terms"
                  className="text-primary-blue cursor-pointer hover:underline"
                >
                  Conditions
                </Link>
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </>
  );
}
