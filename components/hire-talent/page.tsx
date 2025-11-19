'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';


export default function HireTalentPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F8FA] text-center px-6">
      <h1 className="text-4xl font-bold mb-4">Hire Talent</h1>
      <p className="text-lg text-gray-600 mb-6">
        This feature is coming soon. Stay tuned for updates!
      </p>
      <Button onClick={() => router.push('/landing-page')}>Back to Home</Button>
    </div>
  );
}
