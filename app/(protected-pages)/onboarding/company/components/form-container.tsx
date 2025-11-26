import React from 'react';
import { DM_Sans } from 'next/font/google';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
interface FormContainerProps {
  formHeader: string;
  formSubtitle: string;
  children: React.ReactNode;
}
export default function FormContainer({
  formHeader,
  formSubtitle,
  children,
}: FormContainerProps) {
  return (
    <Card
      variant={'flat'}
      className="bg-transparent w-full max-w-[424px] mx-auto gap-10 p-0 font-dm_sans mt-10 min-h-[1024px]:mt-0"
    >
      <CardHeader className="text-center px-0 gap-3">
        <CardTitle>
          <h2 className="text-[32px] md:text-[40px] font-ag">{formHeader}</h2>
        </CardTitle>
        <CardDescription className="text-[#60646E] text-base md:text-lg font-medium font-dm_sans">
          {formSubtitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">{children}</CardContent>
    </Card>
  );
}
