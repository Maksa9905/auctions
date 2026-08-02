import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query';

import { getAuction, listBets } from '@shared/api';

export function getAuctionQueryKey(auctionUuid: string) {
  return ['GET', `/auctions/${auctionUuid}`] as const;
}

export function getAuctionQueryOptions(auctionUuid: string) {
  return queryOptions({
    queryKey: getAuctionQueryKey(auctionUuid),
    queryFn: ({ signal }) => getAuction(auctionUuid, { signal }),
    enabled: Boolean(auctionUuid),
  });
}

export function useAuctionQuery(auctionUuid: string) {
  return useQuery(getAuctionQueryOptions(auctionUuid));
}

export function getAuctionBetsQueryKey(auctionUuid: string, all = false) {
  return ['GET', `/auctions/${auctionUuid}/bets`, { all }] as const;
}

export function getAuctionBetsQueryOptions(auctionUuid: string, all = false, enabled = true) {
  return queryOptions({
    queryKey: getAuctionBetsQueryKey(auctionUuid, all),
    queryFn: ({ signal }) => listBets(auctionUuid, { all }, { signal }),
    enabled: Boolean(auctionUuid) && enabled,
  });
}

export function useAuctionBetsQuery(auctionUuid: string, all = false, enabled = true) {
  return useQuery(getAuctionBetsQueryOptions(auctionUuid, all, enabled));
}

export function useLazyGetAuctionsQuery() {
  const queryClient = useQueryClient();

  return (id: string) => {
    queryClient.prefetchQuery(getAuctionQueryOptions(id));
  };
}

export function useLazyGetAuctionsBetQuery() {
  const queryClient = useQueryClient();

  return (id: string) => {
    queryClient.prefetchQuery(getAuctionBetsQueryOptions(id, true));
  };
}
