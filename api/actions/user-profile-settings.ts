'use server';
import { makeAuthenticatedRequest } from '../config.server';
import {
  Skill,
  UpdateProfileRequest,
  UpdateProfileResponse,
  AddWorkExperienceRequest,
  AddWorkExperienceResponse,
  AddPortfolioResponse,
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
        error: response.message || response.errors || 'Failed to update skills',
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
        error:
          response.message || response.errors || 'Failed to update profile',
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
        error:
          response.message ||
          response.errors ||
          'Failed to add work experience',
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

export const updateWorkExperience = async (
  id: string,
  data: AddWorkExperienceRequest,
) => {
  try {
    const response = await makeAuthenticatedRequest<
      AddWorkExperienceResponse,
      AddWorkExperienceRequest
    >(`/talent/settings/work-experiences/${id}`, {
      method: 'PUT',
      body: data,
    });

    if (!response.success) {
      return {
        success: false,
        error:
          response.message ||
          response.errors ||
          'Failed to update work experience',
      };
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error updating work experience:', error);
    return {
      success: false,
      error: error,
    };
  }
};

export const deleteWorkExperience = async (id: string) => {
  try {
    const response = await makeAuthenticatedRequest<{
      success: boolean;
      message?: string;
    }>(`/talent/settings/work-experiences/${id}`, {
      method: 'DELETE',
    });

    if (!response.success) {
      return {
        success: false,
        error:
          response.message ||
          response.errors ||
          'Failed to delete work experience',
      };
    }

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error deleting work experience:', error);
    return { success: false, error };
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
        error: response.message || response.errors || 'Failed to add portfolio',
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
        error:
          response.message || response.errors || 'Failed to update portfolio',
      };
    }

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error updating portfolio:', error);
    return { success: false, error };
  }
};

export const deletePortfolio = async (id: string) => {
  try {
    const response = await makeAuthenticatedRequest<{
      success: boolean;
      message?: string;
    }>(`/talent/settings/portfolios/${id}`, {
      method: 'DELETE',
    });

    if (!response.success) {
      return {
        success: false,
        error:
          response.message || response.errors || 'Failed to delete portfolio',
      };
    }

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    return { success: false, error };
  }
};
