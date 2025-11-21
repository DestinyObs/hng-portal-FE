import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CompanyDetailsForm from './company-details-form';

export default function FormContainer() {
  return (
    <Card
      variant={'flat'}
      className="bg-transparent w-full max-w-[424px] mx-auto"
    >
      <CardHeader className="text-center px-0">
        <CardTitle>
          <h2 className="text-[32px] md:text-[40px]">Company Details</h2>
        </CardTitle>
        <CardDescription className="text-[#60646E]">
          Add Company Detail
        </CardDescription>
      </CardHeader>
      <CardContent className='px-0'>
        <CompanyDetailsForm/>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
