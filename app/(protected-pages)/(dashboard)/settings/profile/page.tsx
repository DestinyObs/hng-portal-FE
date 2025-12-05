'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Country, State } from 'country-state-city';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import TextEditor from '@/components/shared/ui/text-editor';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import Loading from '@/app/loading';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/auth';
import { useTracks } from '@/hooks/lookups';
import {
  useGetUserProfile,
  useUpdateUserProfile,
  useGetCompanyProfile,
  useUpdateCompanyProfile,
} from '@/hooks/profile';
import { UserProfileData, CompanyProfileData } from '@/types/profile';
import CountryStateSelect from '@/components/shared/ui/country-state-select';

const talentDefaultData = {
  current_role: '',
  bio: '',
  experience: '',
  country: '',
  state: '',
  availability: '',
  jobTypes: [],
};

const companyDefaultData = {
  industry: '',
  tagline: '',
  value_proposition: '',
  why_work_here: '',
  company_size: '',
  country: '',
  state: '',
};

const sharedSchema = {
  photo_url: z.union([z.string(), z.instanceof(File), z.null()]).optional(),
};

const talentSchema = z.object({
  ...sharedSchema,
  role: z.literal('talent'),
  current_role: z.string().optional(),
  bio: z.string().optional(),
  experience: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  availability: z.string().optional(),
  jobTypes: z.array(z.string()).optional(),
});

const companySchema = z.object({
  ...sharedSchema,
  role: z.literal('employer'),
  industry: z.string().optional(),
  tagline: z.string().optional(),
  bio: z.string().optional(),
  value_proposition: z.string().optional(),
  why_work_here: z.string().optional(),
  company_size: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === '' || /^\d+(-\d+)?$/.test(val),
      'Must be a number (e.g., 50) or a range (e.g., 100-500)',
    ),
  country: z.string().optional(),
  state: z.string().optional(),
});

const formSchema = z.discriminatedUnion('role', [talentSchema, companySchema]);
type FormValues = z.infer<typeof formSchema>;

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOnboardingFlow = searchParams.get('flow') === 'onboarding';
  const { user } = useAuthStore();
  const isCompany = user?.current_role === 'employer';
  const { data: talentProfile, isLoading: talentLoading } =
    useGetUserProfile<UserProfileData>(!isCompany);
  const { data: companyProfile, isLoading: companyLoading } =
    useGetCompanyProfile<CompanyProfileData>(isCompany);
  const handleRedirectToProfile = () => {
    if (isOnboardingFlow) {
      const hasSkills =
        talentProfile?.skills && talentProfile.skills.length > 0;
      if (!hasSkills) {
        router.push('/settings/skills?flow=onboarding');
      } else {
        const hasPortfolio =
          talentProfile?.portfolios && talentProfile.portfolios.length > 0;
        if (!hasPortfolio) {
          router.push('/settings/portfolio?flow=onboarding');
        } else {
          router.push('/profile-view');
        }
      }
    } else {
      router.push('/profile-view');
    }
  };
  const { updateProfile, isPending } = useUpdateUserProfile(
    handleRedirectToProfile,
  );
  const { updateCompanyProfile, isPending: isCompanyPending } =
    useUpdateCompanyProfile(handleRedirectToProfile);
  const { data: tracks, isLoading: tracksLoading } = useTracks(!isCompany);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const isLoading =
    (isCompany ? companyLoading : talentLoading) ||
    (!isCompany && tracksLoading);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: '',
      company_size: '',
      role: (user?.current_role as 'talent' | 'employer') || 'talent',
      photo_url: '',
      ...(isCompany ? companyDefaultData : talentDefaultData),
    },
  });

  useEffect(() => {
    if (isCompany && companyProfile) {
      const resetData = {
        role: 'employer' as const,
        photo_url: companyProfile.logo_url || user?.photo_url || '',
        industry: companyProfile.industry || '',
        tagline: companyProfile.tagline || '',
        bio: companyProfile.description || '',
        value_proposition: companyProfile.value_proposition || '',
        why_work_here: companyProfile.why_talents_should_work_with_us || '',
        company_size: companyProfile.company_size || '',
        country: companyProfile.country || '',
        state: companyProfile.state || '',
      };
      form.reset(resetData);
    } else if (!isCompany && talentProfile) {
      const resetData = {
        role: 'talent' as const,
        photo_url:
          talentProfile.photo_url ||
          talentProfile.bio?.user?.photo_url ||
          user?.photo_url ||
          '',
        // Talent Data
        current_role: talentProfile.bio?.current_role,
        bio: talentProfile.bio?.bio || '',
        experience: talentProfile.bio?.experience || '',
        country: talentProfile.bio?.country || '',
        state: talentProfile.bio?.state || '',
        availability: talentProfile.bio?.available_status || '',
        jobTypes: talentProfile.bio?.job_type_preference
          ? talentProfile.bio.job_type_preference
              .split(',')
              .map((t) => t.trim())
          : [],
      };
      form.reset(resetData);
    }
  }, [talentProfile, companyProfile, isCompany, form, user, tracks]);
  const onSubmit = (values: FormValues) => {
    try {
      const formData = new FormData();

      const fieldMapping: Record<string, string> = isCompany
        ? {
            bio: 'description',
            why_work_here: 'why_talents_should_work_with_us',
          }
        : {
            availability: 'available_status',
            jobTypes: 'job_type_preference',
          };

      Object.entries(values).forEach(([key, value]) => {
        if (key !== 'photo_url' && key !== 'role') {
          const fieldName = fieldMapping[key] || key;

          if (Array.isArray(value)) {
            if (value.length > 0) {
              formData.append(fieldName, value.join(','));
            }
          } else if (value !== null && value !== undefined && value !== '') {
            formData.append(fieldName, String(value));
          }
        }
      });

      if (imageFile) {
        formData.append(isCompany ? 'logo' : 'profile_image', imageFile);
      }

      if (isCompany) {
        updateCompanyProfile(formData);
      } else {
        updateProfile(formData);
      }
    } catch {
      toast.error('Failed to submit form. Please try again.');
    }
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedCountry = form.watch('country');
  const handleCancel = () => {
    form.reset();
  };

  if (tracksLoading || isLoading) return <Loading />;

  const AutoListEditor = ({
    value,
    onChange,
    placeholder,
  }: {
    value: string | undefined;
    onChange: (val: string) => void;
    placeholder: string;
  }) => {
    return (
      <TextEditor
        value={value || '- '}
        onChange={(val) => {
          const input = val ?? '';
          const prevInput = value ?? '';

          if (!input.trim()) {
            onChange('- ');
            return;
          }

          if (input.length > prevInput.length && input.endsWith('\n')) {
            onChange(input + '- ');
            return;
          }

          if (input.length - prevInput.length > 1) {
            const trimmed = input.trimStart();
            const hasBulletStart = /^[-*+]\s/.test(trimmed);
            if (!hasBulletStart) {
              onChange('- ' + trimmed);
            } else {
              onChange(input);
            }
            return;
          }

          onChange(input);
        }}
        placeholder={placeholder}
        className="min-h-[200px] border border-[#E7E8E9] rounded-lg overflow-hidden"
      />
    );
  };
  return (
    <div className="w-full py-6 justify-center px-4 lg:px-0">
      <div className="w-full mb-4 space-y-1 text-center md:text-left">
        <h3 className="text-2xl font-bold text-[#232323]">
          Profile Information
        </h3>
        <p className="font-normal text-base text-black-200">
          {isCompany
            ? 'Tell talents about your company'
            : 'Tell employers about yourself'}
        </p>
      </div>

      <Card className="flex-1 w-full bg-white border-[#E8E8E8] shadow-sm">
        <CardContent className="p-6 max-w-[1056px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-8 flex-col w-full"
            >
              <input type="hidden" {...form.register('role')} />

              <FormField
                control={form.control}
                name="photo_url"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center md:flex-row md:items-center gap-4 md:gap-6 mb-2">
                    <div className="relative w-24 h-24 shrink-0">
                      <Image
                        src={
                          (field.value as string) ||
                          '/images/portraitPlaceholder.png'
                        }
                        alt="Profile"
                        fill
                        className="rounded-full object-cover shadow-sm"
                        unoptimized
                      />
                    </div>
                    <FormControl>
                      <div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          className="hidden"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (!file) return;
                            setImageFile(file);
                            const url = URL.createObjectURL(file);
                            field.onChange(url);
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-2 text-black border-[#E7E8E9] rounded-lg hover:bg-gray-50 w-auto"
                        >
                          <Image
                            src="/assets/dashboard-settings/icons/upload.png"
                            alt="Upload"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                          />
                          Upload New Photo
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* COMPANY FIELDS */}
              {isCompany && (
                <>
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-[#1A1A1A]">
                          Industry
                        </FormLabel>
                        <FormControl>
                          <Select
                            key={`industry-${field.value}`}
                            value={field.value}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9]">
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[200px]">
                              <SelectItem value="Finance">Finance</SelectItem>
                              <SelectItem value="Creative-Design">
                                Creative Design
                              </SelectItem>
                              <SelectItem value="Education">
                                Education
                              </SelectItem>
                              <SelectItem value="Healthcare">
                                Healthcare
                              </SelectItem>
                              <SelectItem value="Manufacturing">
                                Manufacturing
                              </SelectItem>
                              <SelectItem value="Hr-Talent">
                                HR & Talent Management
                              </SelectItem>
                              <SelectItem value="Real-Estate">
                                Real Estate
                              </SelectItem>
                              <SelectItem value="Logistics">
                                Logistics & Transportation
                              </SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tagline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-[#1A1A1A]">
                          Tagline
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Connecting skills to jobs."
                            {...field}
                            className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-[#1A1A1A]">
                          About Company
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Write a short description of your company"
                            {...field}
                            className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="value_proposition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-[#1A1A1A]">
                          Value Proposition
                        </FormLabel>
                        <FormControl>
                          <AutoListEditor
                            value={field.value ?? undefined}
                            onChange={field.onChange}
                            placeholder="List your value propositions..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="why_work_here"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-[#1A1A1A]">
                          Why talents should work with us
                        </FormLabel>
                        <FormControl>
                          <AutoListEditor
                            value={field.value ?? undefined}
                            onChange={field.onChange}
                            placeholder="List reasons to work here..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company_size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-[#1A1A1A]">
                          Company size
                        </FormLabel>
                        <FormControl>
                          <Select
                            key={`company-size-${field.value}`}
                            value={field.value}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9]">
                              <SelectValue placeholder="Select company size" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[200px]">
                              <SelectItem value="1-10">1-10</SelectItem>
                              <SelectItem value="11-20">11-20</SelectItem>
                              <SelectItem value="21-49">21-49</SelectItem>
                              <SelectItem value="50-100">50-100</SelectItem>
                              <SelectItem value="101-500">101-500</SelectItem>
                              <SelectItem value="501-1000">501-1000</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-6 w-full">
                    <CountryStateSelect
                      control={form.control}
                      countryName="country"
                      stateName="state"
                    />
                  </div>
                </>
              )}

              {/* TALENT FIELDS */}
              {!isCompany && (
                <>
                  <FormField
                    control={form.control}
                    name="current_role"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-sm text-[#1A1A1A]">
                          Professional Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Current Role e.g. Frontend Developer"
                            {...field}
                            className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-[#1A1A1A]">
                          Short Bio
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={6}
                            placeholder="Tell us about yourself"
                            {...field}
                            className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-[#1A1A1A]">
                          Experience
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="0-1 year"
                            {...field}
                            className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-6 w-full">
                    <CountryStateSelect
                      control={form.control}
                      countryName="country"
                      stateName="state"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 w-full pt-2">
                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem className="flex-1 space-y-4">
                          <FormLabel className="text-sm text-[#1A1A1A]">
                            Availability Status
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              key={`availability-${field.value}`}
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                              className="space-y-3 mt-4"
                            >
                              <FormItem className="flex items-center gap-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="active" />
                                </FormControl>
                                <FormLabel className="text-black text-sm font-medium cursor-pointer">
                                  Available for work
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center gap-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="inactive" />
                                </FormControl>
                                <FormLabel className="text-black text-sm font-medium cursor-pointer">
                                  Not Looking
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="jobTypes"
                      render={({ field }) => (
                        <FormItem className="flex-1 space-y-4">
                          <FormLabel className="text-sm text-[#1A1A1A]">
                            Job Type Preference
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              key={`jobtype-${field.value?.[0]}`}
                              onValueChange={(value) => field.onChange([value])}
                              value={field.value?.[0] || ''}
                              defaultValue={field.value?.[0] || ''}
                              className="space-y-3 mt-4"
                            >
                              {['remote', 'hybrid', 'onsite'].map((item) => (
                                <FormItem
                                  key={item}
                                  className="flex items-center gap-3 space-y-0"
                                >
                                  <FormControl>
                                    <RadioGroupItem value={item} />
                                  </FormControl>
                                  <FormLabel className="text-black text-sm font-medium cursor-pointer capitalize">
                                    {item}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}

              <div className="flex flex-row justify-end gap-4 pt-6 w-full mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isPending || isCompanyPending}
                  className="flex-1 sm:flex-none px-4 py-6 max-w-20 text-sm text-[#181818] border-[#E8E8E8] hover:bg-gray-50 rounded-lg transition-all duration-300 ease-in"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending || isCompanyPending}
                  className="flex-1 sm:flex-none px-4 py-6 max-w-30 text-base font-medium text-[#00AEFF] bg-white hover:bg-blue-100 rounded-lg transition-all duration-300 ease-in"
                >
                  {isPending || isCompanyPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
