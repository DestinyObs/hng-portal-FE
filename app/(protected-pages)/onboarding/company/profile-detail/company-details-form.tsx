'use client';
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
import { saveCompanyOnboarding } from '@/api/actions/onboarding';
import { toast } from 'sonner';
import CountryStateSelect from '@/components/shared/ui/country-state-select';

export default function CompanyDetailsForm() {
  const [openDialog, setOpenDialog] = useState(false);
  const [showIndustryOther, setShowIndustryOther] = useState(false);
  const [showSizeOther, setShowSizeOther] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CompanyDetailsSchema>({
    resolver: zodResolver(companyDetailsSchema),
    mode: 'onSubmit', // only validate on submit
    reValidateMode: 'onChange', // Re-validate on change after first submit
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
      } else {
        // Check for validation errors in different possible locations
        const errors =
          result.details?.errors ||
          (result as unknown as { errors?: Record<string, string[]> }).errors;

        if (errors) {
          // Show field-specific validation errors
          Object.entries(errors).forEach(([field, messages]) => {
            const errorMessage = Array.isArray(messages)
              ? messages.join(', ')
              : String(messages);

            toast.error(`${field}`, {
              description: errorMessage,
            });
          });
        } else {
          // Show general error message
          const errorMessage =
            result.message ||
            result.error ||
            'Please check your information and try again.';
          toast.error('Failed to save company details', {
            description: errorMessage,
          });
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Please check your connection and try again.';
      toast.error('An unexpected error occurred', {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
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
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Creative-Design">
                    Creative Design
                  </SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Hr-Talent">
                    HR & Talent Management
                  </SelectItem>
                  <SelectItem value="Real-Estate">Real Estate</SelectItem>
                  <SelectItem value="Logistics">
                    Logistics & Transportation
                  </SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
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
        <div className="grid grid-cols-2 gap-4 mt-2">
          <CountryStateSelect
            control={form.control}
            countryName="country"
            stateName="state"
          />
        </div>
        <div className="flex flex-col gap-4 mt-10 w-full md:w-[80%] mx-auto">
          {/* Continue Button */}
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="bg-primary-300 disabled:bg-[#7ED3FF] h-12 transition-all duration-300 ease-in disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Continue'}
          </Button>
        </div>
      </form>
      <ConfirmationModal
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </Form>
  );
}
