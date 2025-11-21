import React from 'react';

import { Upload } from 'lucide-react';
interface FormLogoProps {
  logoPreview: string | null;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function FormLogo({
  logoPreview,
  handleLogoUpload,
}: FormLogoProps) {
  return (
    <div className="flex flex-col items-center ">
      <div className="relative mb-4">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {logoPreview ? (
            <img
              src={logoPreview}
              alt="Company logo"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full " />
          )}
        </div>
      </div>

      <label htmlFor="logo-upload" className="cursor-pointer">
        <div className="">
          <Upload className="" />
          <span className="">Upload Logo</span>
        </div>
        <input
          id="logo-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleLogoUpload}
        />
      </label>
    </div>
  );
}
