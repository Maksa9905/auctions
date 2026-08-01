import { http, HttpResponse } from 'msw';
import { afterEach, describe, expect, it } from 'vitest';

import { server } from './msw/server';
import { apiFetch } from './http';

describe('apiFetch', () => {
  afterEach(() => {
    server.resetHandlers();
  });

  it('кидает ApiError при неуспешном ответе', async () => {
    server.use(
      http.post('*/api/v1/auctions/list', () =>
        HttpResponse.json({ message: 'fail' }, { status: 401, statusText: 'Unauthorized' }),
      ),
    );

    await expect(apiFetch('/auctions/list', { method: 'POST', body: '{}' })).rejects.toMatchObject({
      status: 401,
      info: { message: 'fail' },
    });
  });

  it('возвращает JSON при успешном ответе', async () => {
    const response = await apiFetch<{ meta?: { total?: number } }>('/auctions/list', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    expect(response.meta?.total).toBe(100);
  });
});
