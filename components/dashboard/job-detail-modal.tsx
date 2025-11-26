'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X, Heart } from 'lucide-react';

// This Job type now includes a dedicated 'skills' array
interface Job {
  id: string;
  companyLogo: string;
  jobTitle: string;
  companyName: string;
  isVerified: boolean;
  salary: string;
  tags: string[]; // e.g., ['Remote', 'Full time']
  skills: string[]; // e.g., ['Figma', 'Adobe XD']
  postedDate: string;
  description: string;
}

interface JobDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

const JobDetailModal = ({ isOpen, onClose, job }: JobDetailModalProps) => {
  if (!job) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] p-8">
        <DialogHeader className="flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-4">
            <Image
              src={job.companyLogo}
              alt={job.companyName}
              width={56}
              height={56}
              className="rounded-lg"
            />
            <div>
              <DialogTitle className="text-xl font-bold">
                {job.jobTitle}
              </DialogTitle>
              <p className="text-md text-gray-600 flex items-center">
                {job.companyName}
                {job.isVerified && (
                  <span className="ml-1 text-primary-blue">&#10003;</span>
                )}
              </p>
            </div>
          </div>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          <p className="text-sm text-gray-800">{job.description}</p>

          {/* Skills Section - Now uses job.skills */}
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white border border-gray-300 rounded-md text-xs text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Metadata Line - Now correctly formatted */}
          <div className="text-sm text-gray-500">
            Posted: {job.postedDate} &mdash; {job.tags.join(' — ')}
          </div>

          <p className="text-xl font-bold text-gray-900">
            {job.salary} per Month
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full mt-8">
            <Button className="w-full" size="lg">
              Start Application
            </Button>
            <Button className="w-full" variant="outline" size="lg">
              <Heart className="mr-2 h-4 w-4" /> Save job
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
