import { APIResponse, makePublicRequest } from '../config.server';

interface LookupItem {
  id: string;
  name: string;
}

export const getCountries = async (): Promise<APIResponse<LookupItem[]>> => {
  return makePublicRequest<LookupItem[]>('/lookups/countries', {
    method: 'GET',
  });
};

export const getCategories = async (): Promise<APIResponse<LookupItem[]>> => {
  return makePublicRequest<LookupItem[]>('/lookups/categories', {
    method: 'GET',
  });
};

export const getJobLevels = async (): Promise<APIResponse<LookupItem[]>> => {
  return makePublicRequest<LookupItem[]>('/lookups/job-levels', {
    method: 'GET',
  });
};

export const getJobTypes = async (): Promise<APIResponse<LookupItem[]>> => {
  return makePublicRequest<LookupItem[]>('/lookups/job-types', {
    method: 'GET',
  });
};

export const getSkills = async (): Promise<APIResponse<LookupItem[]>> => {
  return makePublicRequest<LookupItem[]>('/lookups/skills', { method: 'GET' });
};

export const getStates = async (): Promise<APIResponse<LookupItem[]>> => {
  return makePublicRequest<LookupItem[]>('/lookups/states', { method: 'GET' });
};

export const getTracks = async (): Promise<APIResponse<LookupItem[]>> => {
  return makePublicRequest<LookupItem[]>('/lookups/tracks', { method: 'GET' });
};

export const getWorkModes = async (): Promise<APIResponse<LookupItem[]>> => {
  return makePublicRequest<LookupItem[]>('/lookups/work-modes', {
    method: 'GET',
  });
};
