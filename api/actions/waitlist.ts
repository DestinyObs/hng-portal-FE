'use server';

import { APIResponse, makePublicRequest } from '../config';

type CreateWaitList = {
  full_name: string;
  email: string;
  role: string;
};

export const waitlist = async (formData: CreateWaitList) => {
  const res = await makePublicRequest<APIResponse<unknown>, CreateWaitList>(
    '/waitlist',
    {
      method: 'POST',
      body: formData,
    },
  );

  return res;
};
