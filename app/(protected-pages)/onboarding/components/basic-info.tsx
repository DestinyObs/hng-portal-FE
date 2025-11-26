'use client';
/* eslint-disable @next/next/no-img-element */

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/input';
import { useTalentOnboardTab } from '@/store/onboarding';
import UserProfileIcon from '@/public/assets/auth/icons/user-profile';
import DocumentUploadIcon from '@/public/assets/auth/icons/document-upload';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { talent_onboarding_api } from '@/api/actions/talent-onboarding';
import { toast } from 'sonner';
import { useSkipToDashboard } from '@/hooks/use-skip-to-dashboard';

// Zod validation schema
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const basicInfoSchema = z.object({
  profileImage: z
    .custom<FileList>()
    .optional()
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return files[0].size <= MAX_FILE_SIZE;
    }, 'Image size must be less than 5MB')
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return ACCEPTED_IMAGE_TYPES.includes(files[0].type);
    }, 'Only .jpg, .jpeg, .png, and .webp images are accepted'),
  role: z.string().min(1, 'Role is required'),
  bio: z.string().min(1, 'Short bio is required').max(500),
});

type BasicInfoFormData = z.infer<typeof basicInfoSchema>;

export default function BasicInformation() {
  const { skipToDashboard } = useSkipToDashboard();
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profileError, setProfileError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useRouter();

  const setTabs = useTalentOnboardTab((state) => state?.setTabs);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      role: '',
      bio: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => talent_onboarding_api(data),
    onSuccess: () => {
      toast.success('Basic information saved');
      setTabs('track');
      navigate.push('/onboarding/talent?page=track');
    },
    onError: (err) => {
      console.error('Error onboarding:', err);
      toast.error(err.message);
    },
  });

  const onSubmit = (data: BasicInfoFormData) => {
    if (!selectedFile) {
      setProfileError('No profile image selected');
      return;
    }

    const formData = new FormData();
    formData.append('current_role', data.role);
    formData.append('bio', data.bio);
    formData.append('profile_image', selectedFile);

    mutate(formData);
  };

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) {
      setSelectedFile(null);
      setProfilePreview(null);
      setProfileError('No profile image selected');
      return;
    }

    const file = files[0];

    // validate size
    if (file.size > MAX_FILE_SIZE) {
      setProfileError('Image size must be less than 5MB');
      setSelectedFile(null);
      setProfilePreview(null);
      return;
    }

    // validate type
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setProfileError('Only .jpg, .jpeg, .png, and .webp images are accepted');
      setSelectedFile(null);
      setProfilePreview(null);
      return;
    }

    // valid file
    setSelectedFile(file);
    setProfileError(''); // clear live error

    const reader = new FileReader();
    reader.onloadend = () => setProfilePreview(reader.result as string);
    reader.readAsDataURL(file);

    setValue('profileImage', files);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleContinue = handleSubmit(onSubmit);

  return (
    <div className="w-full max-w-xl mx-auto py-24 bg-white rounded-lg md:w-[90%] lg:w-1/3">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 lg:text-4xl text-center">
          Basic Information
        </h1>
        <p className="text-gray-100 md:text-lg text-center font-dm_sans">
          Tell Us About Yourself
        </p>
      </div>

      <div className="space-y-6 mt-15">
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center">
          <div
            onClick={handleImageClick}
            className="relative w-36 h-36 rounded-full overflow-hidden cursor-pointer hover:border-primary-blue transition-colors"
          >
            {profilePreview ? (
              <img
                src={profilePreview}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">
                  <UserProfileIcon className="size-12" />
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleImageClick}
            className="mt-3 inline-flex items-center gap-1 px-3 py-2 text-[#181818] rounded-md border border-[#E8E8E8] text-sm cursor-pointer"
          >
            <DocumentUploadIcon className="size-4 mr-1" />
            Upload Image
          </button>

          <input
            ref={fileInputRef}
            type="file"
            onChange={(e) => handleFileChange(e.target.files)}
            className="hidden"
            accept=".jpg,.jpeg,.png,.webp"
          />

          {profileError && (
            <p className="text-red-500 text-xs mt-2">{profileError}</p>
          )}
        </div>

        {/* Role Field */}
        <div>
          <Label
            htmlFor="role"
            className="text-base font-normal text-[#181818]"
          >
            Role
          </Label>
          <Input
            id="role"
            {...register('role')}
            placeholder="Product Designer"
            className="mt-1 text-base"
          />
          {errors.role && (
            <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Bio Field */}
        <div>
          <Label htmlFor="bio" className="text-base font-normal text-[#181818]">
            Short Bio
          </Label>
          <Textarea
            id="bio"
            {...register('bio')}
            placeholder="eg. I like designing concepts"
            rows={12}
            className="mt-1 min-h-32"
          />
          {errors.bio && (
            <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <Button
          variant="default"
          onClick={handleContinue}
          size="sm"
          disabled={isPending}
          className="w-full md:w-88"
        >
          {isPending ? 'Saving...' : 'Continue'}
        </Button>

        <Button
          variant={'link'}
          onClick={() => skipToDashboard('/talent/dashboard')}
          className="mt-5 text-primary-blue font-medium text-lg hover:text-primary-blue/60 transition-colors"
        >
          Complete Later
        </Button>
      </div>
    </div>
  );
}
