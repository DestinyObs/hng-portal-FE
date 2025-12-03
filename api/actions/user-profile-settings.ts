'use server';
import { makeAuthenticatedRequest } from '../config.server';
import {
  Skill,
  UpdateProfileRequest,
  UpdateProfileResponse,
  AddWorkExperienceRequest,
  AddWorkExperienceResponse,
  AddPortfolioRequest,
  AddPortfolioResponse,
  UpdatePortfolioRequest,
  UpdatePortfolioResponse,
} from '@/types/profile-settings';

interface UpdateSkillsRequest {
  skill_ids: string[];
}

interface UpdateSkillsResponse {
  success: boolean;
  message?: string;
  skills?: Skill[];
}

export const updateUserSkills = async (skills: Skill[]) => {
  try {
    const response = await makeAuthenticatedRequest<
      UpdateSkillsResponse,
      UpdateSkillsRequest
    >('/talent/settings/skills', {
      method: 'POST',
      body: {
        skill_ids: skills.map((s) => s.id),
      },
    });

    if (!response.success) {
      return {
        success: false,
        error: response.errors || 'Failed to update skills',
      };
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error updating skills:', error);
    return {
      success: false,
      error: error,
    };
  }
};

export const updateUserProfile = async (data: UpdateProfileRequest) => {
  try {
    const response = await makeAuthenticatedRequest<
      UpdateProfileResponse,
      UpdateProfileRequest
    >('/talent/settings/profile', {
      method: 'PUT',
      body: data,
    });
    if (!response.success) {
      return {
        success: false,
        error: response.errors || 'Failed to update profile',
      };
    }
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const addWorkExperience = async (data: AddWorkExperienceRequest) => {
  try {
    const response = await makeAuthenticatedRequest<
      AddWorkExperienceResponse,
      AddWorkExperienceRequest
    >('/talent/settings/work-experiences', {
      method: 'POST',
      body: data,
    });

    if (!response.success) {
      return {
        success: false,
        error: response.errors || 'Failed to add work experience',
      };
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error adding work experience:', error);
    return {
      success: false,
      error: error,
    };
  }
};

export const addPortfolio = async (data: FormData) => {
  try {
    const response = await makeAuthenticatedRequest<AddPortfolioResponse>(
      '/talent/settings/portfolios',
      {
        method: 'POST',
        body: data,
      },
    );

    if (!response.success) {
      return {
        success: false,
        error: response.errors || 'Failed to add portfolio',
      };
    }

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error adding portfolio:', error);
    return { success: false, error };
  }
};

export const updatePortfolio = async (id: string, data: FormData) => {
  try {
    const response = await makeAuthenticatedRequest<UpdatePortfolioResponse>(
      `/talent/settings/portfolios/${id}/update`,
      {
        method: 'POST',
        body: data,
      },
    );

    if (!response.success) {
      return {
        success: false,
        error: response.errors || 'Failed to update portfolio',
      };
    }

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error updating portfolio:', error);
    return { success: false, error };
  }
};
