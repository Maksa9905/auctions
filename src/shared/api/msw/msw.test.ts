import { describe, expect, it } from 'vitest';

import { apiFetch } from '@shared/api/http';
import { MOCK_AUCTION_UUIDS } from '@shared/api/msw';

describe('MSW auctions API', () => {
  it('возвращает список аукционов', async () => {
    const response = await apiFetch<{
      data?: { main?: { order_uid?: string } }[];
      meta?: { total?: number };
    }>('/auctions/list', {
      method: 'POST',
      body: JSON.stringify({ page: 1, per_page: 10 }),
    });

    expect(response.meta?.total).toBe(3);
    expect(response.data?.map((item) => item.main?.order_uid)).toEqual(
      expect.arrayContaining([
        MOCK_AUCTION_UUIDS.moscowSpb,
        MOCK_AUCTION_UUIDS.kazanSamara,
        MOCK_AUCTION_UUIDS.finished,
      ]),
    );
  });

  it('после setBet меняет список ставок и текущую цену аукциона', async () => {
    const uuid = MOCK_AUCTION_UUIDS.moscowSpb;

    const before = await apiFetch<{
      trading: {
        price?: { current?: number | null };
        your?: { bet?: boolean; last_bet_with_vat?: number | null };
      };
    }>(`/auctions/${uuid}`);

    expect(before.trading.your?.bet).toBe(false);
    expect(before.trading.price?.current).toBe(120_000);

    const emptyBets = await apiFetch<{ bets: unknown[] }>(`/auctions/${uuid}/bets`);
    expect(emptyBets.bets).toHaveLength(0);

    await apiFetch(`/auctions/${uuid}/bets`, {
      method: 'POST',
      body: JSON.stringify({ price: 119_000 }),
    });

    const bets = await apiFetch<{
      bets: Array<{ price_with_vat?: number; place?: number | null; is_win?: boolean }>;
    }>(`/auctions/${uuid}/bets`);

    expect(bets.bets).toHaveLength(1);
    expect(bets.bets[0]).toMatchObject({
      price_with_vat: 119_000,
      place: 1,
      is_win: true,
    });

    const after = await apiFetch<{
      trading: {
        price?: { current?: number | null };
        your?: { bet?: boolean; last_bet_with_vat?: number | null };
        status_mobile?: string;
      };
    }>(`/auctions/${uuid}`);

    expect(after.trading.price?.current).toBe(119_000);
    expect(after.trading.your).toMatchObject({
      bet: true,
      last_bet_with_vat: 119_000,
    });
    expect(after.trading.status_mobile).toBe('Leading');
  });

  it('отклоняет ставку выше или равную текущей цене', async () => {
    await expect(
      apiFetch(`/auctions/${MOCK_AUCTION_UUIDS.moscowSpb}/bets`, {
        method: 'POST',
        body: JSON.stringify({ price: 120_000 }),
      }),
    ).rejects.toMatchObject({ status: 422 });
  });
});
