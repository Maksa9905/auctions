import { describe, expect, it } from 'vitest';

import { routes } from './routes';

describe('routes', () => {
  it('возвращает путь списка аукционов', () => {
    expect(routes.auctions).toBe('/auctions');
  });

  it('собирает путь детальной страницы аукциона', () => {
    expect(routes.auctionById('42')).toBe('/auctions/42');
  });

  it('собирает путь страницы ставок', () => {
    expect(routes.auctionBets('42')).toBe('/auctions/42/bets');
  });
});
