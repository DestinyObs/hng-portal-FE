'use client';

export default function CreateNewJob() {
  return (
    <div className="space-y-8">
      {/* Intro Section */}
      <div className="bg-[#F1F5F9] rounded-lg p-4 border">
        <h1 className="text-xl md:text-2xl font-bold mb-4 text-tertiary-500">
          Post Your Job on HNG
        </h1>
        <div className="space-y-1 text-tertiary-500 text-sm md:text-lg ">
          <p>Reach skilled professionals ready to deliver quality work fast.</p>
          <p>
            Get access to vetted candidates across all HNG tracks from design to
            engineering.
          </p>
          <p>
            Your job post connects you with verified talent trained to meet
            deadlines and deliver results.
          </p>
        </div>
      </div>
    </div>
  );
}
