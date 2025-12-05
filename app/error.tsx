'use client'; // Error components must be Client Components.

import { useEffect } from 'react';
import { toast } from 'sonner';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to a logging service in a real app.
    // console.error(error);

    // Show a toast notification with the error message and a "Try again" action.
    toast.error(error.message || 'Something went wrong.', {
      action: {
        label: 'Try again',
        onClick: () => reset(),
      },
    });
  }, [error, reset]);

  // This component renders nothing, so the user stays on the current page.
  // The toast provides the feedback.
  return null;
}
