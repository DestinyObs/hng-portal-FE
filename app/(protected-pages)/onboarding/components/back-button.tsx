'use client';

import { MoveLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  return (
    <div
      className="h-fit w-fit absolute left-0 top-8 cursor-pointer flex items-center gap-2 lg:fixed lg:left-32 lg:top-32"
      onClick={() => router.back()}
    >
      <MoveLeft color="#00aeff" />
      <p className="text-primary-blue text-lg">Back</p>
    </div>
  );
};
export default BackButton;
