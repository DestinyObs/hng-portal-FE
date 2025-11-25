'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AccountPage() {
  return (
    <div className="w-full pt-8 lg:pt-30 justify-center pb-10 px-4 lg:px-0">
      <div className="w-full mb-6 space-y-1 text-center md:text-left">
        <h3 className="text-2xl font-bold text-[#232323]">
          Account Information
        </h3>
        <p className="font-normal text-base text-black-200">
          Manage your personal account details
        </p>
      </div>

      <Card className="flex-1 w-full bg-white border-[#E8E8E8] shadow-sm">
        <CardContent className="p-6 max-w-[1056px]">
          <form className="flex gap-8 flex-col w-full">
            <div className="space-y-2 w-full">
              <label className="text-sm text-[#1A1A1A]">
                Full Name <span className="text-[#FF3B30]">*</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-black-200"
              />
            </div>

            <div className="space-y-2 w-full">
              <label className="text-sm text-[#1A1A1A]">
                Email Address <span className="text-[#FF3B30]">*</span>
              </label>
              <input
                type="email"
                placeholder="Job.doe@example.com"
                className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-black-200"
              />
              <p className="text-xs font-normal text-black-200">
                We&apos;ll send verification emails to this address
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 w-full">
              <div className="space-y-2 flex-1">
                <label className="text-sm text-[#1A1A1A]">
                  City <span className="text-[#FF3B30]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="City"
                  className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-black-200"
                />
              </div>
              <div className="space-y-2 flex-1">
                <label className="text-sm text-[#1A1A1A]">
                  Country <span className="text-[#FF3B30]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Country"
                  className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-black-200"
                />
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
