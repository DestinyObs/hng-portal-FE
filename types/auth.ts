import {
  CompanySignUpFormValues,
  TalentSignUpFormValues,
} from '@/validations/sign-up';
import { UseFormReturn } from 'react-hook-form';

export type EmailCheckStepCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
};

export interface CompanySignUpFormStepTwoProps {
  form: UseFormReturn<CompanySignUpFormValues>;
}

export interface CompanySignUpFormStepOneProps {
  form: UseFormReturn<CompanySignUpFormValues>;
}

export interface TalentSignUpFormStepOneProps {
  form: UseFormReturn<TalentSignUpFormValues>;
}

export interface TalentSignUpFormStepTwoProps {
  form: UseFormReturn<TalentSignUpFormValues>;
}

export interface AuthResponseError {
  message: string;
  status: number;
  success: boolean;
}

export interface GoogleAuthRequest {
  google_token: string;
  role?: string;
  company_name?: string;
}

export type Role = 'talent' | 'company';
