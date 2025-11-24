'use client';

import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function ProfilePage() {
  const [, setAvatar] = useState<string>('/images/user-profile.png');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="w-full pt-8 lg:pt-30 justify-center pb-10 px-4 lg:px-0">
      <div className="w-full mb-6 space-y-1 text-center md:text-left">
        <h3 className="text-2xl font-bold text-[#232323]">
          Profile Information
        </h3>
        <p className="font-normal text-base text-[#969696]">
          Tell employers about yourself
        </p>
      </div>

      <Card className="flex-1 w-full bg-white border-[#E8E8E8] shadow-sm">
        <CardContent className="p-6 max-w-[1056px]">
          <form className="flex gap-8 flex-col w-full">
            <div className="flex flex-col items-center md:flex-row md:items-center gap-4 md:gap-6 mb-2">
              <div className="relative w-24 h-24 shrink-0">
                <Image
                  src="/assets/dashboard-settings/images/avatar.png"
                  alt="Profile"
                  width={96}
                  height={96}
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
              <Button
                type="button"
                variant="outline"
                onClick={handleUploadClick}
                className="flex items-center gap-2 text-black border-[#E7E8E9] rounded-lg hover:bg-gray-50"
              >
                <Image
                  src="/assets/dashboard-settings/icons/upload.png"
                  alt="Upload"
                  width={16}
                  height={16}
                />
                Upload New Photo
              </Button>
            </div>

            <div className="space-y-2 w-full">
              <label className="text-sm text-[#1A1A1A]">
                Professional Title <span className="text-[#FF3B30]">*</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-[#969696]"
              />
            </div>

            <div className="space-y-2 w-full">
              <label className="text-sm text-[#1A1A1A]">
                Short Bio <span className="text-[#FF3B30]">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Brief description..."
                className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-[#969696]"
              />
              <p className="text-xs font-normal text-[#969696]">
                Brief description for your profile
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 w-full">
              <div className="space-y-2 flex-1">
                <label className="text-sm text-[#1A1A1A]">
                  Experience <span className="text-[#FF3B30]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="0-1 year"
                  className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-[#969696]"
                />
              </div>
              <div className="space-y-2 flex-1">
                <label className="text-sm text-[#1A1A1A]">
                  Country <span className="text-[#FF3B30]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="What is the job title?"
                  className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-[#969696]"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 w-full pt-2">
              <div className="space-y-4 flex-1">
                <label className="text-sm text-[#1A1A1A]">
                  Availability Status <span className="text-[#FF3B30]">*</span>
                </label>
                <div className="space-y-3 mt-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="availability"
                      className="w-4 h-4 accent-[#00AEFF]"
                    />
                    <span className="text-black text-sm font-medium">
                      Available for work
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="availability"
                      className="w-4 h-4 accent-[#00AEFF]"
                    />
                    <span className="text-black text-sm font-medium">
                      Open to offers
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="availability"
                      className="w-4 h-4 accent-[#00AEFF]"
                    />
                    <span className="text-black text-sm font-medium">
                      Not looking
                    </span>
                  </label>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                <label className="text-sm text-[#1A1A1A]">
                  Job Type Preference <span className="text-[#FF3B30]">*</span>
                </label>
                <div className="space-y-3 mt-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded accent-[#00AEFF]"
                    />
                    <span className="text-black font-medium">Remote</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded accent-[#00AEFF]"
                    />
                    <span className="text-black">Hybrid</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded accent-[#00AEFF]"
                    />
                    <span className="text-black">Onsite</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-end gap-4 pt-6 w-full mt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 sm:flex-none px-6 py-6 max-w-20 text-sm text-[#181818] border-[#E8E8E8] hover:bg-gray-50 rounded-2xl"
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="flex-1 sm:flex-none px-6 py-6 max-w-30 text-base font-medium text-[#00AEFF] bg-white hover:bg-blue-100 rounded-2xl"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
