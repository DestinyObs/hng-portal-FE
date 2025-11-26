'use client';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CompanyDetailsSchema, companyDetailsSchema } from '../schema';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import ConfirmationModal from '../components/confimation-modal';
import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { countries, cities as states } from '@/constants/dashboard';
import { saveCompanyOnboarding } from '@/api/actions/onboarding';
import { toast } from 'sonner';

export default function CompanyDetailsForm() {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [showIndustryOther, setShowIndustryOther] = useState(false);
  const [showSizeOther, setShowSizeOther] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CompanyDetailsSchema>({
    resolver: zodResolver(companyDetailsSchema),
    mode: 'onChange',
    defaultValues: {
      industry: '',
      industryOther: '',
      size: '',
      sizeOther: '',
      website: '',
      state: '',
      country: '',
    },
  });

  const { isValid } = form.formState;

  const onSubmit = async (data: CompanyDetailsSchema) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });

      const result = await saveCompanyOnboarding(formData);

      if (result.success) {
        setOpenDialog(true);
        toast.success('Company details saved successfully!', {
          description: 'Your company profile is now complete.',
        });
      } else {
        if (result.details?.errors) {
          // Show field-specific validation errors
          Object.entries(result.details.errors).forEach(([field, messages]) => {
            const errorMessage = Array.isArray(messages)
              ? messages.join(', ')
              : messages;

            toast.error(`${field}`, {
              description: errorMessage,
            });
          });
        } else {
          // Show general error message
          toast.error('Failed to save company details', {
            description:
              result.error || 'Please check your information and try again.',
          });
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred', {
        description: 'Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoToDashboard = () => {
    router.push('/onboarding/company?page=profile-detail');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex flex-col gap-2 p-0"
      >
        {/* Industry */}
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Industry</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setShowIndustryOther(value === 'other');
                  if (value !== 'other') {
                    form.setValue('industryOther', '');
                  }
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full h-10 rounded-lg">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="creative-design">
                    Creative Design
                  </SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="hr-talent">
                    HR & Talent Management
                  </SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                  <SelectItem value="logistics">
                    Logistics & Transportation
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="animate-in slide-in-from-top-1 duration-200" />
            </FormItem>
          )}
        />

        {/* Industry Other Input */}
        {showIndustryOther && (
          <FormField
            control={form.control}
            name="industryOther"
            render={({ field }) => (
              <FormItem className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                <FormLabel>Please specify</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your industry"
                    {...field}
                    className="h-10 rounded-lg"
                  />
                </FormControl>
                <FormMessage className="animate-in slide-in-from-top-1 duration-200" />
              </FormItem>
            )}
          />
        )}

        {/* Company Size */}
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem className="w-full space-y-2">
              <FormLabel>Company Size</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setShowSizeOther(value === 'other');
                  if (value !== 'other') {
                    form.setValue('sizeOther', '');
                  }
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full h-10 rounded-lg">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-full" position="popper">
                  <SelectItem value="1-10">1-10</SelectItem>
                  <SelectItem value="11-20">11-20</SelectItem>
                  <SelectItem value="21-49">21-49</SelectItem>
                  <SelectItem value="50-100">50-100</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="animate-in slide-in-from-top-1 duration-200" />
            </FormItem>
          )}
        />

        {/* Company Size Other Input */}
        {showSizeOther && (
          <FormField
            control={form.control}
            name="sizeOther"
            render={({ field }) => (
              <FormItem className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                <FormLabel>Please specify</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter company size"
                    {...field}
                    className="h-10 rounded-lg"
                  />
                </FormControl>
                <FormMessage className="animate-in slide-in-from-top-1 duration-200" />
              </FormItem>
            )}
          />
        )}

        {/* Website URL */}
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://"
                  {...field}
                  className="h-10 rounded-lg"
                />
              </FormControl>
              <FormMessage className="animate-in slide-in-from-top-1 duration-200" />
            </FormItem>
          )}
        />

        {/* State + Country Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full h-10 rounded-lg">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[200px]">
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="animate-in slide-in-from-top-1 duration-200" />
              </FormItem>
            )}
          />

          {/*   State */}
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>State</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full h-10 rounded-lg">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[200px]">
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="animate-in slide-in-from-top-1 duration-200" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-4 mt-10 w-full md:w-[80%] mx-auto">
          {/* Continue Button */}
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`${isValid ? 'bg-primary-300' : 'bg-[#7ED3FF]'} h-12 transition-all duration-300 ease-in`}
          >
            {isSubmitting ? 'Saving...' : 'Continue'}
          </Button>
        </div>
      </form>
      <ConfirmationModal
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        onGoToDashboard={handleGoToDashboard}
      />
    </Form>
  );
}
