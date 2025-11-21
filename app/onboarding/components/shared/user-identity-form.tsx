'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { UserIdentitySchema, userIdentitySchema } from './schema';
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
import { File, Upload } from 'lucide-react';

export default function UserIdentityForm() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const form = useForm<UserIdentitySchema>({
    resolver: zodResolver(userIdentitySchema),
    mode: 'onChange',
    defaultValues: {
      companyName: '',
      description: '',
    },
  });
  const {isValid} = form.formState;
  console.log(isValid)
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

  const onSubmit = (data: UserIdentitySchema) => {
    console.log('Form submitted:', data);
    // Handle form submission
  };

  const handleCompleteLater = () => {
    console.log('Complete later clicked');
    // Handle skip action
  };

  return (
    <div>
      <div className="text-center">
        <div className="flex justify-center items-center mb-4">
          <div className="border border-primary-300 w-32 h-32 rounded-full overflow-hidden flex justify-center items-center">
            {logoPreview ? (
              <img src={logoPreview} alt="Company logo" />
            ) : (
              <div className="text-sm text-black/40">No image yet</div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="logo-upload"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 font-medium"
          >
            <File className="w-4 h-4" />
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-sm">
                  Company Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="HNG Portal"
                    {...field}
                    className="h-10 mb-2"
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
                    className="resize-none h-[130px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4 my-10">
            <Button
              type="submit"
              className={`${isValid ? 'bg-primary-300' : 'bg-[#7ED3FF]'} h-12`}
            >
              Continue
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={handleCompleteLater}
              className="text-primary-300"
            >
              Complete Later
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
