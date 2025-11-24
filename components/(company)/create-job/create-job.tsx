'use client';

import { Dot } from 'lucide-react';

export default function CreateNewJob() {
  return (
    <div className="space-y-8">
      {/* Intro Section */}
      <div className="bg-primary-50 rounded-lg p-4">
        <h1 className="text-base md:text-lg font-bold mb-4 text-tertiary-500">
          Post Your Job on HNG
        </h1>
        <div className="space-y-1 text-tertiary-500 text-sm ">
          <div className="flex">
            <Dot size={25} color="#00AEFF" />
            <p>
              Reach skilled professionals ready to deliver quality work fast.
            </p>
          </div>

          <div className="flex">
            <Dot size={25} color="#00AEFF" />
            <p>
              Get access to vetted candidates across all HNG tracks from design
              to engineering.
            </p>
          </div>

          <div className="flex">
            <Dot size={25} color="#00AEFF" />
            <p>
              Your job post connects you with verified talent trained to meet
              deadlines and deliver results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
