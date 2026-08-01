import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query';

import { getAuction } from '@shared/api';

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

export function useLazyGetAuctionsQuery() {
  const queryClient = useQueryClient();

  return (id: string) => {
    queryClient.prefetchQuery(getAuctionQueryOptions(id));
  };
}
