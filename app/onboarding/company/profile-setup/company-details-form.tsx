'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  CompanyDetailsSchema,
  companyDetailsSchema,
} from '../../components/shared/schema';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

export default function CompanyDetailsForm() {
  const form = useForm<CompanyDetailsSchema>({
    resolver: zodResolver(companyDetailsSchema),
    mode: "onChange",
    defaultValues: {
      industry: '',
      size: '',
      website: '',
      city: '',
      country: '',
    },
  });
const {isValid} = form.formState;
  function onSubmit(values: CompanyDetailsSchema) {
    console.log(values);
    // onNext(); // move to next onboarding step
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex flex-col gap-2"
      >
        {/* Industry */}
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full py-5">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="default" disabled>
                    Select Industry
                  </SelectItem>
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
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company Size */}
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Company Size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full py-5">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-full" position="popper">
                  <SelectItem value="default" disabled>
                    Company Size
                  </SelectItem>
                  <SelectItem value="1-10">1-10</SelectItem>
                  <SelectItem value="11-20">11-20</SelectItem>
                  <SelectItem value="21-49">21-49</SelectItem>
                  <SelectItem value="50-100">50-100</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>{' '}
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Website URL */}
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://"
                  {...field}
                  variant={'outline'}
                  className="h-10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City + Country Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* City */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} className="h-10" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Country" {...field} className="h-10" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Continue Button */}
        <Button
          type="submit"
          className={`w-full ${isValid ? 'bg-primary-300' : 'bg-[#7ED3FF]'}  text-white`}
        >
          Continue
        </Button>

        {/* Complete Later */}
        <p className={`text-center text-blue-500 text-sm cursor-pointer`}>
          Complete Later
        </p>
      </form>
    </Form>
  );
}
