'use client';

import { useState } from 'react';
import { applyForJob } from '@/api/actions/applications';

export default function JobApplicationForm({ jobId }: { jobId: string }) {
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resume) {
      alert('Please select a resume file');
      return;
    }

    setIsSubmitting(true);

    try {
      await applyForJob({
        cover_letter: coverLetter,
        resume: resume,
        job_id: jobId,
      });

      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="coverLetter">Cover Letter</label>
        <textarea
          id="coverLetter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="resume">Resume (PDF)</label>
        <input
          id="resume"
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files?.[0] || null)}
          required
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
}
