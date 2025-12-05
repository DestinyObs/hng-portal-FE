'use client';

import { useEffect, useState, useRef } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
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

const talentDefaultData = {
  track_id: '',
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
  track_id: z.string().optional(),
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
  industry: z.string().min(1, 'Industry is required'),
  tagline: z.string().optional(),
  bio: z.string().min(1, 'Company description is required'),
  value_proposition: z.string().min(1, 'Value proposition is required'),
  why_work_here: z.string().min(1, 'This section is required'),
  company_size: z
    .string()
    .min(1, 'Company size is required')
    .regex(
      /^\d+(-\d+)?$/,
      'Must be a number (e.g., 50) or a range (e.g., 100-500)',
    ),
  country: z.string().optional(),
  state: z.string().optional(),
});

const formSchema = z.discriminatedUnion('role', [talentSchema, companySchema]);
type FormValues = z.infer<typeof formSchema>;

export default function ProfilePage() {
  const { user } = useAuthStore();
  const isCompany = user?.current_role === 'employer';
  const { data: talentProfile, isLoading: talentLoading } =
    useGetUserProfile<UserProfileData>(!isCompany);
  const { data: companyProfile, isLoading: companyLoading } =
    useGetCompanyProfile<CompanyProfileData>(isCompany);
  const { updateProfile, isPending } = useUpdateUserProfile();
  const { updateCompanyProfile, isPending: isCompanyPending } =
    useUpdateCompanyProfile();
  const { data: tracks, isLoading: tracksLoading } = useTracks(!isCompany);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const isLoading =
    (isCompany ? companyLoading : talentLoading) ||
    (!isCompany && tracksLoading);
  // const profile = isCompany ? companyProfile : talentProfile;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: (user?.current_role as 'talent' | 'employer') || 'talent',
      photo_url: '',
      ...(isCompany ? companyDefaultData : talentDefaultData),
    },
  });

  useEffect(() => {
    if (isCompany && companyProfile) {
      form.reset({
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
      });
    } else if (!isCompany && talentProfile) {
      form.reset({
        role: 'talent' as const,
        photo_url:
          talentProfile.photo_url ||
          talentProfile.bio?.user?.photo_url ||
          user?.photo_url ||
          '',
        // Talent Data
        track_id: talentProfile.bio?.track_id || '',
        bio: talentProfile.bio?.bio || '',
        experience: talentProfile.bio?.experience || '',
        country: talentProfile.bio?.country || '',
        state: talentProfile.bio?.state || '',
        availability: talentProfile.bio?.status || '',
        jobTypes: talentProfile.bio?.job_type_preference
          ? talentProfile.bio.job_type_preference.split(',')
          : [],
      });
    }
  }, [talentProfile, companyProfile, isCompany, form, user]);

  const onSubmit = (values: FormValues) => {
    try {
      const formData = new FormData();

      const fieldMapping: Record<string, string> = isCompany
        ? {
            bio: 'description',
            why_work_here: 'why_talents_should_work_with_us',
          }
        : {};

      Object.entries(values).forEach(([key, value]) => {
        if (key !== 'photo_url' && key !== 'role' && value) {
          const fieldName = fieldMapping[key] || key;

          if (Array.isArray(value)) {
            formData.append(fieldName, value.join(','));
          } else {
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
    } catch (error) {
      toast.error('Failed to submit form. Please try again.');
    }
  };

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
    value: string;
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
                          <Input
                            placeholder="e.g. Fintech, Healthcare"
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
                            value={field.value}
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
                            value={field.value}
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
                          <Input
                            placeholder="11-50"
                            {...field}
                            className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-6 w-full">
                    <div className="flex-1 space-y-2">
                      <label className="text-sm text-[#1A1A1A]">Country</label>
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="w-full h-10 rounded-lg border border-[#E7E8E9]">
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                  {Country.getAllCountries().map((c) => (
                                    <SelectItem
                                      key={c.isoCode}
                                      value={c.isoCode}
                                    >
                                      {c.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <label className="text-sm text-[#1A1A1A]">State</label>
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                                disabled={!selectedCountry}
                              >
                                <SelectTrigger className="w-full h-10 rounded-lg border border-[#E7E8E9]">
                                  <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                  {State.getStatesOfCountry(
                                    form.getValues('country') || '',
                                  ).map((s) => (
                                    <SelectItem
                                      key={s.isoCode}
                                      value={s.isoCode}
                                    >
                                      {s.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* TALENT FIELDS */}
              {!isCompany && (
                <>
                  <FormField
                    control={form.control}
                    name="track_id"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-sm text-[#1A1A1A]">
                          Professional Title
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9]">
                              <SelectValue placeholder="Choose a track" />
                            </SelectTrigger>
                            <SelectContent>
                              {tracks?.map((track) => (
                                <SelectItem key={track.id} value={track.id}>
                                  {track.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                    <div className="flex-1 space-y-2">
                      <label className="text-sm text-[#1A1A1A]">Country</label>
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="w-full h-10 rounded-lg border border-[#E7E8E9]">
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                  {Country.getAllCountries().map((c) => (
                                    <SelectItem
                                      key={c.isoCode}
                                      value={c.isoCode}
                                    >
                                      {c.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <label className="text-sm text-[#1A1A1A]">State</label>
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                                disabled={!selectedCountry}
                              >
                                <SelectTrigger className="w-full h-10 rounded-lg border border-[#E7E8E9]">
                                  <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                  {State.getStatesOfCountry(
                                    form.watch('country') || '',
                                  ).map((s) => (
                                    <SelectItem
                                      key={s.isoCode}
                                      value={s.isoCode}
                                    >
                                      {s.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
                              onValueChange={field.onChange}
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
                            <div className="space-y-3 mt-4">
                              {['remote', 'hybrid', 'onsite'].map((item) => (
                                <FormItem
                                  key={item}
                                  className="flex items-center gap-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...(field.value || []),
                                              item,
                                            ])
                                          : field.onChange(
                                              (field.value || []).filter(
                                                (value) => value !== item,
                                              ),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-black text-sm font-medium cursor-pointer capitalize">
                                    {item}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </div>
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
                  className="flex-1 sm:flex-none px-6 py-6 max-w-20 text-sm text-[#181818] border-[#E8E8E8] hover:bg-gray-50 rounded-2xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending || isCompanyPending}
                  className="flex-1 sm:flex-none px-6 py-6 max-w-30 text-base font-medium text-[#00AEFF] bg-white hover:bg-blue-100 rounded-2xl"
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
