import type { ApiError } from '@/shared/api';

type ValidationErrorBody = {
  detail?: string;
  title?: string;
  errors?: Array<{ field?: string; message?: string }>;
};

export function getApiErrorMessage(error: unknown, fallback: string) {
  const apiError = error as ApiError | undefined;
  const info = apiError?.info as ValidationErrorBody | undefined;

  if (info?.detail) {
    return info.detail;
  }

  const firstFieldError = info?.errors?.find((item) => item.message)?.message;
  if (firstFieldError) {
    return firstFieldError;
  }

  if (info?.title) {
    return info.title;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

export function isValidationApiError(error: unknown) {
  return (error as ApiError | undefined)?.status === 422;
}
