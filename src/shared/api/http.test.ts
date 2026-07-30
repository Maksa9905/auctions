import { afterEach, describe, expect, it, vi } from 'vitest';

import { apiFetch } from './http';

describe('apiFetch', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('кидает ApiError при неуспешном ответе', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: 'fail' }), {
          status: 401,
          statusText: 'Unauthorized',
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );

    await expect(apiFetch('/auctions/list')).rejects.toMatchObject({
      status: 401,
      info: { message: 'fail' },
    });
  });

  it('возвращает JSON при успешном ответе', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ data: [] }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );

    await expect(apiFetch<{ data: unknown[] }>('/auctions/list')).resolves.toEqual({ data: [] });
  });
});
