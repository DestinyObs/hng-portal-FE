'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function SecurityPage() {
  return (
    <div className="w-full pt-8 lg:pt-30 justify-center pb-10 px-4 lg:px-0">
      <div className="w-full mb-6 space-y-1 text-center md:text-left">
        <h3 className="text-2xl font-bold text-[#232323]">Security</h3>
        <p className="font-normal text-base text-[#969696]">
          Manage your account security
        </p>
      </div>

      <Card className="flex-1 w-full bg-white border-[#E8E8E8] shadow-sm">
        <CardContent className="p-6 max-w-[1056px]">
          <form className="flex gap-8 flex-col w-full">
            <div className="space-y-2 w-full">
              <label className="text-sm text-[#1A1A1A]">
                Current Password <span className="text-[#FF3B30]">*</span>
              </label>
              <input
                type="password"
                placeholder="Enter current password"
                className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-[#969696]"
              />
            </div>

            <div className="space-y-2 w-full">
              <label className="text-sm text-[#1A1A1A]">
                New Password <span className="text-[#FF3B30]">*</span>
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-[#969696]"
              />
            </div>

            <div className="space-y-2 w-full">
              <label className="text-sm text-[#1A1A1A]">
                Confirm New Password <span className="text-[#FF3B30]">*</span>
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-[#969696]"
              />
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
