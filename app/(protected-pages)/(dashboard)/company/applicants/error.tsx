'use client';

import { Button } from '@/components/ui/button'; // adjust if you have one, otherwise keep inline

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="w-full min-h-screen py-4">
      <div className="bg-white p-6 rounded-2xl">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-red-500 mb-6 text-lg">
            {error.message || 'Something went wrong while loading applicants'}
          </p>
          <Button
            onClick={() => reset()}
            className="bg-primary-300 hover:bg-primary-400"
          >
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}