'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AccordionUI } from '@/components/shared/accordion';
import Dropdown from '@/components/shared/dropdown';

export default function Page() {
  const router = useRouter();
  
  // useEffect(() => {
  //   router.push('/waitlist');
  // }, [router]);

  // return null;
  return (
    <div>
      <AccordionUI content={[{title: 'sdfgf', content: 'wdfghgfdsf'}]} />
      <Dropdown title={'sdfgfd'} triggerClassName='w-full' values={[
        {name: 'dfvgtvfrdcsf'},
        {name: 'dfvgtvfrdcsf'},
        {name: 'dfvgtvfrdcsf'},
        {name: 'dfvgtvfrdcsf'},
        {name: 'dfvgtvfrdcsf'},
        {name: 'dfvgtvfrdcsf'},
        {name: 'dfvgtvfrdcsf'},
        {name: 'dfvgtvfrdcsf'},
        {name: 'dfvgtvfrdcsf'},
        {name: 'dfvgtvfrdcsf'}]} />
    </div>
  )
}