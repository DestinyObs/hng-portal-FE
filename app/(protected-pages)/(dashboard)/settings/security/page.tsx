'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Input from '@/components/ui/input';
import { changePassword } from '@/api/actions/auth';
import {
  changePasswordSchema,
  ChangePasswordFormValues,
} from '@/validations/change-password';

export default function SecurityPage() {
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: '',
      password: '',
      password_confirmation: '',
    },
  });

  const { mutate: a_changePassword, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message || 'Password changed successfully');
        form.reset();
      } else {
        if (response.errors) {
          Object.entries(response.errors).forEach(([key, messages]) => {
            if (
              key === 'current_password' ||
              key === 'password' ||
              key === 'password_confirmation'
            ) {
              form.setError(key, { message: messages[0] });
            } else {
              toast.error(messages[0]);
            }
          });
        } else {
          toast.error(response.message || 'Failed to change password');
        }
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'An error occurred');
    },
  });

  const onSubmit = (data: ChangePasswordFormValues) => {
    a_changePassword(data);
  };

  return (
    <div className="w-full py-6 justify-center px-4 lg:px-0">
      <div className="w-full mb-4 space-y-1 text-center md:text-left">
        <h3 className="text-2xl font-bold text-[#232323]">Security</h3>
        <p className="font-normal text-base text-black-200">
          Manage your account security
        </p>
      </div>

      <Card className="flex-1 w-full bg-white border-[#E8E8E8] shadow-sm">
        <CardContent className="p-6 max-w-[1056px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-8 flex-col w-full"
            >
              <FormField
                control={form.control}
                name="current_password"
                render={({ field }) => (
                  <FormItem className="space-y-2 w-full">
                    <FormLabel className="text-sm text-[#1A1A1A]">
                      Current Password <span className="text-[#FF3B30]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        inputType="password"
                        placeholder="Enter current password"
                        className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2 w-full">
                    <FormLabel className="text-sm text-[#1A1A1A]">
                      New Password <span className="text-[#FF3B30]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        inputType="password"
                        placeholder="Enter new password"
                        className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem className="space-y-2 w-full">
                    <FormLabel className="text-sm text-[#1A1A1A]">
                      Confirm New Password{' '}
                      <span className="text-[#FF3B30]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        inputType="password"
                        placeholder="Confirm new password"
                        className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-row justify-end gap-4 pt-6 w-full mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  className="flex-1 sm:flex-none px-6 py-6 max-w-20 text-sm text-[#181818] border-[#E8E8E8] hover:bg-gray-50 rounded-2xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 sm:flex-none px-6 py-6 max-w-30 text-base font-medium text-white bg-primary-blue hover:bg-blue-600 rounded-2xl"
                >
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
