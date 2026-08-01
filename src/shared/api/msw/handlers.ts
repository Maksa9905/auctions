import { http, HttpResponse } from 'msw';

import type { AuctionListRequest } from '../generated/model/auctionListRequest';
import type { SetBetRequest } from '../generated/model/setBetRequest';

import { auctionsDb } from './db';
import { applyMswLatency, maybeMswError } from './latency';

const api = (path: string) => `*/api/v1${path}`;

async function withMswEffects<T extends Response>(handler: () => T | Promise<T>) {
  await applyMswLatency();
  const error = maybeMswError();
  if (error) {
    return error;
  }

  return handler();
}

export const auctionsHandlers = [
  http.post(api('/auctions/list'), async ({ request }) =>
    withMswEffects(async () => {
      const body = (await request.json().catch(() => ({}))) as AuctionListRequest;
      return HttpResponse.json(auctionsDb.listAuctions(body));
    }),
  ),

  http.get(api('/auctions/:auctionUuid'), ({ params }) =>
    withMswEffects(() => {
      const auctionUuid = String(params.auctionUuid);
      const auction = auctionsDb.getAuction(auctionUuid);

      if (!auction) {
        return HttpResponse.json(
          {
            type: 'https://httpstatuses.com/404',
            title: 'Not Found',
            status: 404,
            detail: `Auction ${auctionUuid} not found`,
          },
          { status: 404 },
        );
      }

      return HttpResponse.json(auction);
    }),
  ),

  http.get(api('/auctions/:auctionUuid/bets'), ({ params, request }) =>
    withMswEffects(() => {
      const auctionUuid = String(params.auctionUuid);
      const url = new URL(request.url);
      const all = url.searchParams.get('all') === 'true';
      const bets = auctionsDb.listBets(auctionUuid, all);

      if (!bets) {
        return HttpResponse.json(
          {
            type: 'https://httpstatuses.com/404',
            title: 'Not Found',
            status: 404,
            detail: `Auction ${auctionUuid} not found`,
          },
          { status: 404 },
        );
      }

      return HttpResponse.json(bets);
    }),
  ),

  http.post(api('/auctions/:auctionUuid/bets'), async ({ params, request }) =>
    withMswEffects(async () => {
      const auctionUuid = String(params.auctionUuid);
      const body = (await request.json()) as SetBetRequest;
      const result = auctionsDb.setBet(auctionUuid, body);

      if (!result.ok) {
        return HttpResponse.json(result.body as Record<string, unknown>, { status: result.status });
      }

      return new HttpResponse(null, { status: 200 });
    }),
  ),
];
