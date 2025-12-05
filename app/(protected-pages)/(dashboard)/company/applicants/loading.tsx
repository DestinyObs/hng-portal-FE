import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="w-full min-h-screen py-4">
      <div className="bg-white p-6 rounded-2xl">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary-300" />
          <span className="ml-3 text-tertiary-500 text-lg">
            Loading applicants...
          </span>
        </div>
      </div>
    </div>
  );
}