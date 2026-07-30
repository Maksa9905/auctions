const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api/v1';

export type ApiError = Error & {
  status: number;
  info?: unknown;
};

function resolveUrl(url: string): string {
  if (/^https?:\/\//.test(url)) {
    return url;
  }

  const base = API_BASE_URL.replace(/\/$/, '');
  const path = url.replace(/^\//, '');

  return `${base}/${path}`;
}

export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(resolveUrl(url), {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = new Error(response.statusText || 'Request failed') as ApiError;
    error.status = response.status;

    try {
      error.info = await response.json();
    } catch {
      // тело ошибки может быть пустым
    }

    throw error;
  }

  if ([204, 205, 304].includes(response.status)) {
    return undefined as T;
  }

  const contentType = response.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    return (await response.json()) as T;
  }

  return undefined as T;
}
