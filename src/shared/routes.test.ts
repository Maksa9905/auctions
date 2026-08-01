import { describe, expect, it } from 'vitest';

import { routes } from './routes';

describe('routes', () => {
  it('возвращает путь списка аукционов', () => {
    expect(routes.auctions).toBe('/auctions');
  });
});
