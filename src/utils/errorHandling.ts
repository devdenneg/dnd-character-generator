// Error handling utilities

/**
 * API error structure
 */
interface ApiErrorResponse {
  response?: {
    data?: {
      error?: string;
      message?: string;
    };
    status?: number;
  };
  message?: string;
}

/**
 * Extract error message from API error
 */
export function getErrorMessage(error: unknown, defaultMessage = "Произошла ошибка"): string {
  if (!error) return defaultMessage;

  const apiError = error as ApiErrorResponse;

  // Try to get error from response.data.error
  if (apiError.response?.data?.error) {
    return apiError.response.data.error;
  }

  // Try to get error from response.data.message
  if (apiError.response?.data?.message) {
    return apiError.response.data.message;
  }

  // Try to get error from error.message
  if (apiError.message) {
    return apiError.message;
  }

  return defaultMessage;
}

/**
 * Check if error is authentication error (401)
 */
export function isAuthError(error: unknown): boolean {
  const apiError = error as ApiErrorResponse;
  return apiError.response?.status === 401;
}

/**
 * Check if error is not found error (404)
 */
export function isNotFoundError(error: unknown): boolean {
  const apiError = error as ApiErrorResponse;
  return apiError.response?.status === 404;
}

/**
 * Check if error is validation error (400)
 */
export function isValidationError(error: unknown): boolean {
  const apiError = error as ApiErrorResponse;
  return apiError.response?.status === 400;
}
