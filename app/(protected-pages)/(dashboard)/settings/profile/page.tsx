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

import { useAuthStore } from '@/store/auth';
import { useTracks } from '@/hooks/lookups';
import { useGetUserProfile, useUpdateUserProfile } from '@/hooks/profile';
// import {useUpdateCompanyProfile } from '@/hooks/profile';
import { UserProfileData } from '@/types/profile';

const talentDefaultData = {
  track_id: '',
  experience: '',
  country: '',
  state: '',
  availability: '',
  jobTypes: [],
};

const companyDefaultData = {
  industry: '',
  tagline: '',
  bio: '',
  value_proposition: '',
  why_work_here: '',
  company_size: '',
};

const sharedSchema = {
  photo_url: z.union([z.string(), z.instanceof(File), z.null()]).optional(),
};

const talentSchema = z.object({
  ...sharedSchema,
  role: z.literal('talent'),
  track_id: z.string().min(1, 'Professional title is required'),
  bio: z.string().min(1, 'Short bio is required'),
  experience: z.string().min(1, 'Experience is required'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required '),
  availability: z.string().min(1, 'Select'),
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
  company_size: z.string().min(1, 'Company size is required'),
});

const formSchema = z.discriminatedUnion('role', [talentSchema, companySchema]);
type FormValues = z.infer<typeof formSchema>;

export default function ProfilePage() {
  const { data: profile, isLoading } = useGetUserProfile<UserProfileData>();
  const { user } = useAuthStore();
  const { updateProfile, isPending } = useUpdateUserProfile();
  // const { updateCompanyProfile, isPending: isCompanyPending } = useUpdateCompanyProfile();
  const isCompanyPending = false;
  const { data: tracks, isLoading: tracksLoading } = useTracks();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const isCompany = profile?.current_role === 'employer';

  console.log('This', profile);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: profile?.current_role || 'talent',
      photo_url: profile?.photo_url || user?.photo_url || '',
      ...(isCompany ? companyDefaultData : talentDefaultData),
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        role: profile?.current_role,
        photo_url:
          profile.photo_url ||
          profile.bio?.user?.photo_url ||
          user?.photo_url ||
          '',
        // Talent Data
        track_id: profile.bio?.track_id || '',
        experience: profile.bio?.experience || '',
        country: profile.bio?.country || '',
        state: profile.bio?.state || '',
        availability: profile.bio?.status || '',
        jobTypes: profile.bio?.job_type_preference
          ? profile.bio.job_type_preference.split(',')
          : [],
        // Company Data
        industry: '',
        tagline: '',
        bio: '',
        value_proposition: '',
        why_work_here: '',
        company_size: '',
      });
    }
  }, [profile, profile?.current_role, form, user]);

  const onSubmit = (values: FormValues) => {
    console.log('This is me ', profile);
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key !== 'photo_url' && value) {
        if (Array.isArray(value)) {
          formData.append(key, value.join(','));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    if (imageFile) {
      formData.append('profile_image', imageFile);
    }

    if (isCompany) {
      console.log('Form Data:', formData);
      // updateCompanyProfile(formData);
    } else {
      console.log('Form Data:', formData);
      updateProfile(formData);
    }
  };

  const selectedCountry = form.watch('country');
  const handleCancel = () => {
    form.reset();
  };

  if (tracksLoading || isLoading) return <Loading />;

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
                        className="rounded-full object-cover border border-gray-200"
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
                          <img
                            src="/assets/dashboard-settings/icons/upload.png"
                            alt="Upload"
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
                          Industry <span className="text-[#FF3B30]">*</span>
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
                          About Company{' '}
                          <span className="text-[#FF3B30]">*</span>
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
                          Value Proposition{' '}
                          <span className="text-[#FF3B30]">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Description of value proposition"
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
                    name="why_work_here"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-[#1A1A1A]">
                          Why talents should work with us{' '}
                          <span className="text-[#FF3B30]">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Description of what makes your company attractive"
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
                    name="company_size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-[#1A1A1A]">
                          Company size <span className="text-[#FF3B30]">*</span>
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
                          Professional Title{' '}
                          <span className="text-[#FF3B30]">*</span>
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
                          Short Bio <span className="text-[#FF3B30]">*</span>
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
                          Experience <span className="text-[#FF3B30]">*</span>
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
                      <label className="text-sm text-[#1A1A1A]">
                        Country <span className="text-[#FF3B30]">*</span>
                      </label>
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
                      <label className="text-sm text-[#1A1A1A]">
                        State <span className="text-[#FF3B30]">*</span>
                      </label>
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

                  <div className="flex flex-col md:flex-row gap-6 w-full pt-2">
                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem className="flex-1 space-y-4">
                          <FormLabel className="text-sm text-[#1A1A1A]">
                            Availability Status{' '}
                            <span className="text-[#FF3B30]">*</span>
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
                            Job Type Preference{' '}
                            <span className="text-[#FF3B30]">*</span>
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
