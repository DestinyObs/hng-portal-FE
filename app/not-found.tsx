"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#00AEFF] mb-4">404</h1>
          <div className="flex justify-center mb-6">
            <Search className="h-16 w-16 text-[#00AEFF]/30" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-3 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#00AEFF]">
            Page Not Found
          </h2>
          <p className="text-base text-[#00AEFF]/70">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>

        {/* Go Back Button */}
        <Button
          variant="outline"
          size="lg"
          className="min-w-[200px] border-[#00AEFF] text-[#00AEFF] hover:bg-[#00AEFF] hover:text-white"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    </div>
  );
}
