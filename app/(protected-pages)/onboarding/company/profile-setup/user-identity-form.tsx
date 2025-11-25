'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { UserIdentitySchema, userIdentitySchema } from '../schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Input from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DocumentUploadIcon from '@/public/assets/auth/icons/document-upload';

export default function UserIdentityForm() {
  const route = useRouter();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const form = useForm<UserIdentitySchema>({
    resolver: zodResolver(userIdentitySchema),
    mode: 'onChange',
    defaultValues: {
      companyName: '',
      description: '',
    },
  });
  const { isValid } = form.formState;
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('logo', file);
    }
  };
  const handleCompleteLater = () => {
    console.log('Complete later clicked');
    // Handle skip action
  };
  const onSubmit = (data: UserIdentitySchema) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    route.push('/onboarding/company?page=company-detail');
  };
  return (
    <div>
      <div className="text-center">
        <div className="flex justify-center items-center mb-4">
          <div className="w-32 h-32 rounded-full overflow-hidden flex justify-center items-center">
            {logoPreview ? (
              <Image
                src={logoPreview}
                alt="company logo"
                width={100}
                height={100}
              />
            ) : (
              <div>
                <Image
                  src={'/assets/images/company-onboarding/user-avatar.png'}
                  alt="user avatar"
                  width={128}
                  height={128}
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="logo-upload"
            className="inline-flex items-center gap-1 pl-3 pr-4 py-2 border border-tertiary-50 rounded-lg cursor-pointer hover:bg-gray-50 font-medium text-xs transition-all duration-300 ease-in"
          >
            <DocumentUploadIcon className="w-3 h-3" />
            <span>Upload Logo</span>
          </label>
          <input
            id="logo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoUpload}
          />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel className="font-medium text-sm">
                  Company Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="HNG Connect"
                    {...field}
                    className="h-10 border-tertiary-50 rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-sm">
                  Short Company Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Main House, Beach Condo"
                    className="resize-none h-[130px] border-tertiary-50 rounded-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4 mt-10 md:w-[80%] mx-auto">
            <Button
              type="submit"
              className={`${isValid ? 'bg-primary-300' : 'bg-[#7ED3FF]'} h-12 transition-all duration-300 ease-in`}
            >
              Continue
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={handleCompleteLater}
              className="text-primary-300 transition-all duration-300 ease-in"
            >
              Complete Later
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
