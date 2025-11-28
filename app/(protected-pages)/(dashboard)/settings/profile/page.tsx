'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTracks } from '@/hooks/lookups';
import { UserProfileData } from '@/lib/types';
import { Country, State } from 'country-state-city';
import Loading from '@/app/loading';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
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

const AvailabilityEnum = z.enum(['available', 'open']);

const formSchema = z.object({
  photo_url: z.string(),
  professionalTitle: z.string().min(1, 'Professional title is required'),
  bio: z.string().min(1, 'Short bio is required'),
  experience: z.string().min(1, 'Experience is required'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required '),
  availability: AvailabilityEnum,
  jobTypes: z.array(z.string()).min(1, 'Select at least one job type'),
  track_id: z.string().min(1, 'Track is required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProfilePage() {
  const [avatar, setAvatar] = useState(
    '/assets/dashboard-settings/images/avatar.png',
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      professionalTitle: '',
      bio: '',
      experience: '',
      country: '',
      state: '',
      availability: 'available',
      jobTypes: [],
      track_id: '',
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (values: FormValues) => {
    // console.log('Form submitted:', values);
    // Handle form submission
  };

  const { data: tracks, isLoading: tracksLoading } = useTracks();
  const selectedCountry = form.watch('country');

  const handleCancel = () => {
    form.reset();
  };

  const jobTypeOptions = [
    { id: 'remote', label: 'Remote' },
    { id: 'hybrid', label: 'Hybrid' },
    { id: 'onsite', label: 'Onsite' },
  ];
  // const Bio = bio || "N/A";

  console.log('Tracks loading:', tracksLoading, 'Tracks:', tracks);
  if (tracksLoading) return <Loading />;
  return (
    <div className="w-full py-6 justify-center px-4 lg:px-0">
      <div className="w-full mb-4 space-y-1 text-center md:text-left">
        <h3 className="text-2xl font-bold text-[#232323]">
          Profile Information
        </h3>
        <p className="font-normal text-base text-black-200">
          Tell employers about yourself
        </p>
      </div>

      <Card className="flex-1 w-full bg-white border-[#E8E8E8] shadow-sm">
        <CardContent className="p-6 max-w-[1056px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-8 flex-col w-full"
            >
              {/* Profile Photo Upload */}
              <div className="flex flex-col items-center md:flex-row md:items-center gap-4 md:gap-6 mb-2">
                <div className="relative w-24 h-24 shrink-0">
                  <img
                    src={avatar}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border border-gray-200"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleUploadClick}
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
              </div>

              {/* Professional Title */}
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
                        defaultValue={field.value?.toString()}
                      >
                        <SelectTrigger className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-black-200">
                          <SelectValue
                            placeholder={
                              tracksLoading ? 'Loading...' : 'Choose a track'
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {tracks?.map((track) => (
                            <SelectItem
                              key={track.id}
                              value={track.id.toString()}
                            >
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

              {/* Short Bio */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm text-[#1A1A1A]">
                      Short Bio <span className="text-[#FF3B30]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={6}
                        placeholder="Tell us about yourself"
                        className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-black-200 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs font-normal text-black-200">
                      Brief description for your profile
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col md:flex-row gap-6 w-full">
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm text-[#1A1A1A]">
                        Experience <span className="text-[#FF3B30]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0-1 year"
                          className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-black-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-6 w-full">
                {/* Country */}
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
                                <SelectItem key={c.isoCode} value={c.isoCode}>
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

                {/* State */}
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
                                <SelectItem key={s.isoCode} value={s.isoCode}>
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

              {/* Availability Status and Job Type Preference */}
              <div className="flex flex-col md:flex-row gap-6 w-full pt-2">
                {/* Availability Status */}
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
                              <RadioGroupItem value="available" />
                            </FormControl>
                            <FormLabel className="text-black text-sm font-medium cursor-pointer">
                              Available for work
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center gap-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="open" />
                            </FormControl>
                            <FormLabel className="text-black text-sm font-medium cursor-pointer">
                              Open to offers
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Job Type Preference */}
                <FormField
                  control={form.control}
                  name="jobTypes"
                  render={() => (
                    <FormItem className="flex-1 space-y-4">
                      <FormLabel className="text-sm text-[#1A1A1A]">
                        Job Type Preference{' '}
                        <span className="text-[#FF3B30]">*</span>
                      </FormLabel>
                      <div className="space-y-3 mt-4">
                        {jobTypeOptions.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="jobTypes"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex items-center gap-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id,
                                              ),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-black font-medium cursor-pointer">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row justify-end gap-4 pt-6 w-full mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 sm:flex-none px-6 py-6 max-w-20 text-sm text-[#181818] border-[#E8E8E8] hover:bg-gray-50 rounded-2xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 sm:flex-none px-6 py-6 max-w-30 text-base font-medium text-[#00AEFF] bg-white hover:bg-blue-100 rounded-2xl"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
