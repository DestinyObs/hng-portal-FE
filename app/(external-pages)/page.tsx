'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AccordionUI } from '@/components/shared/accordion';

export default function Page() {
  const router = useRouter();

  // useEffect(() => {
  //   router.push('/waitlist');
  // }, [router]);

  return (
    <div className='p-6'>
      <AccordionUI content={[
        {
          title: 'what do you want for christmas',
          content: "i want benz"
        }
      ]} />
    </div>
  );
}
