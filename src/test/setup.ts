import '@testing-library/jest-dom/vitest';

import { afterAll, afterEach, beforeAll } from 'vitest';

import { auctionsDb } from '@shared/api/msw';
import { server } from '@shared/api/msw/server';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
  auctionsDb.reset();
});

afterAll(() => {
  server.close();
});
