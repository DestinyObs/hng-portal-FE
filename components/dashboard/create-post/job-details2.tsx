'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft } from 'lucide-react';
import Input from '@/components/ui/input';
import { CANDIDATE_LOCATIONS, HNG_TRACKS, JOB_TYPES } from '@/types/create-new-job';
import { JobDetailsStep2FormData, jobDetailsStep2Schema } from '@/schemas/create-post.schema';



interface JobDetailsStep2Props {
  initialData: Partial<JobDetailsStep2FormData>;
  onUpdate: (data: Partial<JobDetailsStep2FormData>) => void;
  onPrev: () => void;
}

export default function JobDetailsStep2({ initialData, onUpdate, onPrev }: JobDetailsStep2Props) {
  const { control, handleSubmit, formState: { errors } } = useForm<JobDetailsStep2FormData>({
    resolver: zodResolver(jobDetailsStep2Schema),
    defaultValues: {
      hngTrack: initialData.hngTrack || '',
      jobType: initialData.jobType || '',
      candidateLocation: initialData.candidateLocation || '',
      state: initialData.state || '',
      country: initialData.country || '',
      jobPrice: initialData.jobPrice || '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: JobDetailsStep2FormData) => {
    onUpdate(data);
  };

  return (
    <div className="space-y-6">
      <Card className="border">
        <div className="p-6 border-b">
          <h2 className="text-2xl text-tertiary-500 font-semibold">
            Create a New Job Post
          </h2>
          <p className="text-tertiary-200 mt-1 text-sm">
            Connect with verified HNG talents across design, developments, and
            more.
          </p>
        </div>

        <CardHeader>
          <CardTitle>Step 2 - Job Details</CardTitle>
          <CardDescription>
            Share an opportunity with the HNG community or the world.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* HNG Track Select */}
          <div className="space-y-3">
            <label className="text-sm font-semibold">Select Track</label>
            <Controller
              name="hngTrack"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full border-input bg-white">
                    <SelectValue placeholder="Select HNG Track" />
                  </SelectTrigger>
                  <SelectContent>
                    {HNG_TRACKS.map((track) => (
                      <SelectItem key={track} value={track}>
                        {track}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.hngTrack && (
              <p className="text-xs text-red-500">{errors.hngTrack.message}</p>
            )}
          </div>

          {/* Job Type Select */}
          <div className="space-y-3">
            <label className="text-sm font-semibold">Select Employment Type</label>
            <Controller
              name="jobType"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full border-input bg-white">
                    <SelectValue placeholder="Select the job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.jobType && (
              <p className="text-xs text-red-500">{errors.jobType.message}</p>
            )}
          </div>

          {/* Candidate Location Select */}
          <div className="space-y-3">
            <label className="text-sm font-semibold">Select Word Mode</label>
            <Controller
              name="candidateLocation"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full border-input bg-white">
                    <SelectValue placeholder="Where is the candidate location?..." />
                  </SelectTrigger>
                  <SelectContent>
                    {CANDIDATE_LOCATIONS.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <p className="text-xs text-muted-foreground">
              Work from home or coming to the office or both
            </p>
            {errors.candidateLocation && (
              <p className="text-xs text-red-500">{errors.candidateLocation.message}</p>
            )}
          </div>

          {/* Job Location */}
          <div className="space-y-3">
            <label className="text-sm font-semibold">Job Location</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="State"
                    {...field}
                  />
                )}
              />
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="Country"
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          {/* Job Price */}
          <div className="space-y-3">
            <label className="text-sm font-semibold">Job Price</label>
            <Controller
              name="jobPrice"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="How much are you willing to pay?....."
                  {...field}
                />
              )}
            />
            {errors.jobPrice && (
              <p className="text-xs text-red-500">{errors.jobPrice.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Button 
          variant="outline" 
          onClick={onPrev}
          className="border-[#E7E7E7] text-[#344054] flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </Button>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            onClick={handleSubmit(onSubmit)}
            className="bg-[#00AEFF] hover:bg-[#0088cc] text-white"
          >
            Save Edit
          </Button>
        </div>
      </div>
    </div>
  );
}