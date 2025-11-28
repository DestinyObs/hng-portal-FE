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
import { ChevronLeft, OctagonAlert } from 'lucide-react';
import {
  JobDetailsStep2FormData,
  jobDetailsStep2Schema,
  JobPostPayload,
} from '@/validations/create-post.schema';
import {
  useCountries,
  useJobTypes,
  useStates,
  useTracks,
  useWorkModes,
} from '@/hooks/lookups';
import { draftPost } from '@/api/actions/create-post';
import { toast } from 'sonner';
import Loading from '@/app/loading';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { usePostStore } from '@/store/create-post';
import { useState } from 'react';
import { useEditPost } from '@/hooks/posts';
import { Modal } from '@/components/dashboard/modal';

interface JobDetailsStep2Props {
  initialData: Partial<JobPostPayload>;
  onUpdate: (data: Partial<JobDetailsStep2FormData>) => void;
  onPrev: () => void;
  id?: string;
}

export default function JobDetailsStep2({
  initialData,
  onUpdate,
  onPrev,
  id,
}: JobDetailsStep2Props) {
  const router = useRouter();
  const [isDrafting, setIsDrafting] = useState(false);
  const { data: tracks, isLoading: tracksLoading } = useTracks();
  const { data: workModes, isLoading: workModesLoading } = useWorkModes();
  const { data: countries, isLoading: countriesLoading } = useCountries();
  const { data: states, isLoading: statesLoading } = useStates();
  const { data: JOBTYPES, isLoading: jobTypesLoading } = useJobTypes();
  const { user } = useAuthStore();
  const { setNewPost } = usePostStore();
  const { editpost } = useEditPost(id!);
  const [showEditModal, setShowEditModal] = useState(false);
  const [payload, setPayload] = useState<JobPostPayload | null>(null);

  // console.log(initialData);

  const isLoading =
    tracksLoading ||
    workModesLoading ||
    countriesLoading ||
    statesLoading ||
    jobTypesLoading;

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<JobDetailsStep2FormData>({
    resolver: zodResolver(jobDetailsStep2Schema),
    defaultValues: {
      track_id: initialData.track_id || '',
      job_type_id: initialData.job_type_id || '',
      state_id: initialData.state_id || '',
      country_id: initialData.country_id || '',
      work_mode_id: initialData.work_mode_id,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: JobDetailsStep2FormData) => {
    onUpdate(data);
    const formData = {
      company_id: user?.company?.id || '',
      title: initialData.title || ' ',
      description: initialData.description || ' ',
      acceptance_criteria: initialData.acceptance_criteria || ' ',
      state_id: data.state_id || ' ',
      country_id: data.country_id || ' ',
      price: initialData.price || ' ',
      track_id: data.track_id || ' ',
      category_id: initialData.category_id || ' ',
      job_type_id: data.job_type_id || ' ',
      job_level_id: initialData.job_level_id ?? '',
      work_mode_id: data.work_mode_id || ' ',
      skills: (initialData.skills as string[]) || [],
    };
    // console.log(formData);

    if (id) {
      // console.log(formData)

      setPayload(formData);

      setShowEditModal(true);
    } else {
      setNewPost(formData);
      router.push('/company/job/preview');
    }
  };

  const handleSaveDraft = async () => {
    setIsDrafting(true);
    const data = getValues();
    const formData = {
      company_id: user?.company?.id || '',
      title: initialData.title || ' ',
      description: initialData.description || ' ',
      acceptance_criteria: initialData.acceptance_criteria || ' ',
      state_id: data.state_id || ' ',
      country_id: data.country_id || ' ',
      price: initialData.price || ' ',
      track_id: data.track_id || ' ',
      category_id: initialData.category_id || ' ',
      job_level_id: initialData.job_level_id ?? '',
      job_type_id: data.job_type_id || ' ',
      work_mode_id: data.work_mode_id || ' ',
      skills: (initialData.skills as string[]) || [],
    };

    try {
      const response = await draftPost(formData);
      // console.log(response);

      if (response && !response?.success) {
        toast.error(response.message);
        return;
      }

      toast.success('Your job has been saved to draft successfully');
      reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsDrafting(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="border border-black-50 shadow-none">
        <div className="p-6 border-b border-black-50">
          <h2 className="text-2xl text-tertiary-500 font-semibold">
            {id ? 'Edit a job post' : 'Create a New Job Post'}
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
              name="track_id"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full border-input bg-white">
                    <SelectValue placeholder="Select HNG Track" />
                  </SelectTrigger>
                  <SelectContent>
                    {tracks &&
                      tracks.map((track: { id: string; name: string }) => (
                        <SelectItem key={track.id} value={track.id}>
                          {track.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.track_id && (
              <p className="text-xs text-red-500">{errors.track_id.message}</p>
            )}
          </div>

          {/* Job Type Select */}
          <div className="space-y-3">
            <label className="text-sm font-semibold">
              Select Employment Type
            </label>
            <Controller
              name="job_type_id"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full border-input bg-white">
                    <SelectValue placeholder="Select the job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {JOBTYPES &&
                      JOBTYPES.map((type: { id: string; name: string }) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.job_type_id && (
              <p className="text-xs text-red-500">
                {errors.job_type_id.message}
              </p>
            )}
          </div>

          {/* Candidate Location Select - lookup not available for this */}
          <div className="space-y-3">
            <label className="text-sm font-semibold">Select Work Mode</label>
            <Controller
              name="work_mode_id"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full border-input bg-white">
                    <SelectValue placeholder="Where is the candidate location?..." />
                  </SelectTrigger>
                  <SelectContent>
                    {workModes &&
                      workModes.map(
                        (location: { id: string; name: string }) => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.name}
                          </SelectItem>
                        ),
                      )}
                  </SelectContent>
                </Select>
              )}
            />
            <p className="text-xs text-muted-foreground">
              Work from home or coming to the office or both
            </p>
            {errors.work_mode_id && (
              <p className="text-xs text-red-500">
                {errors.work_mode_id.message}
              </p>
            )}
          </div>

          {/* Job Location */}
          <div className="space-y-3">
            <label className="text-sm font-semibold">Job Location</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="state_id"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full border-input bg-white">
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent>
                      {states &&
                        states.map((location: { id: string; name: string }) => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <Controller
                name="country_id"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full border-input bg-white">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries &&
                        countries.map(
                          (location: { id: string; name: string }) => (
                            <SelectItem key={location.id} value={location.id}>
                              {location.name}
                            </SelectItem>
                          ),
                        )}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex justify-between">
          <div className="">
            <Button
              variant="outline"
              onClick={onPrev}
              disabled={isDrafting || isSubmitting}
              className="border-[#E7E7E7] text-[#344054] flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </Button>
          </div>
          <div className="">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isDrafting || isSubmitting}
              className="text-tertiary-500 font-semibold border-0 md:hidden inline-flex"
            >
              {isDrafting ? 'Saving as Draft' : ' Save As Draft'}
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isDrafting || isSubmitting}
              className="text-tertiary-500 font-semibold border-0 hidden md:inline-flex"
            >
              {isDrafting ? 'Saving as Draft' : ' Save As Draft'}
            </Button>
          </div>

          <div className="">
            <Button
              disabled={isSubmitting}
              className="bg-[#00AEFF] hover:bg-[#0088cc] capitalize text-white"
            >
              {isSubmitting ? 'loading' : id ? 'edit post' : 'finish'}
            </Button>
          </div>
        </div>
      </div>
      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Do you want to save the edited post?"
        message="This job description will be updated."
        icon={<OctagonAlert size={48} />}
        primaryButton={{
          label: 'Save Edit',
          onClick: () => {
            if (payload) {
              editpost(payload);
            }
            setShowEditModal(false);
          },
        }}
        secondaryButton={{
          label: 'Cancel',
          onClick: () => setShowEditModal(false),
        }}
      />
    </form>
  );
}
