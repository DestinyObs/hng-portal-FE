import React from 'react';
import FormHeader from './form-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import UserIdentityForm from './user-identity-form';

export default function FormContainer() {
  return (
    <Card
      variant={'flat'}
      className="bg-transparent w-full max-w-[424px] mx-auto"
    >
      <CardHeader className="text-center px-0">
        <CardTitle>
          <h2 className="text-[32px] md:text-[40px]">Company Identity</h2>
        </CardTitle>
        <CardDescription className="text-[#60646E]">
          Set Up Your Company Identity
        </CardDescription>
      </CardHeader>
      <CardContent className='px-0'>
        <UserIdentityForm />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
