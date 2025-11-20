import React from 'react';
import CompanyDetailsForm from './company-details-form';

export default function FormContainer() {
  return (
    <div className='border w-[90%] mx-auto max-w-[424px]'>
      <div className='text-center'>
        <h2 className="text-[32px] md:text-[40px] leading-tight mb-1">Company Details</h2>
        <p className='text-[16px] md:text-[18px]'>Add Company Detail</p>
      </div>
      <CompanyDetailsForm/>
    </div>
  );
}
