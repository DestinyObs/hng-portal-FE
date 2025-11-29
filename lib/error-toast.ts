import { toast } from 'sonner';
import { APIError } from '@/types/api-response';

export const handleErrorByStatus = (error: APIError) => {
  const { status, message, errors } = error;

  switch (status) {
    case 401:
      toast.error('You are not authorized. Please login.');
      break;
    case 403:
      toast.error('Access denied.');
      break;
    case 404:
      toast.error('Resource not found.');
      break;
    case 422:
      const validationMessages = errors
        ? Object.values(errors).flat().join(', ')
        : message;
      toast.error(`Validation failed: ${validationMessages}`);
      break;
    case 500:
      toast.error('Server error. Please try again later.');
      break;
    default:
      toast.error(message || 'An error occurred.');
      break;
  }
};
