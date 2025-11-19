'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AccordionUI } from '@/components/shared/accordion';
import { BreadcrumbUI } from '@/components/shared/breadcrumb';
import { Button } from '@/components/ui/button';

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

      <BreadcrumbUI items={[{link: '/dfb', name: 'Home'}, {link: '/sdfg', name: 'Home'},{link: '/', name: 'Breadcrumb'},]} />

      <Button variant={'outline'}>button</Button>
    </div>
  );
}
