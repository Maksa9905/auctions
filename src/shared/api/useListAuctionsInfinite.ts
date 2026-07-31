import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { listAuctions } from './generated/auctions/auctions';
import type { AuctionListRequest } from './generated/model';

export const LIST_AUCTIONS_PER_PAGE = 10;

export function getListAuctionsInfiniteQueryKey(
  request: Omit<AuctionListRequest, 'page' | 'per_page'>,
) {
  return ['POST', '/auctions/list', 'infinite', request, LIST_AUCTIONS_PER_PAGE] as const;
}

export function useListAuctionsInfinite(
  request: Omit<AuctionListRequest, 'page' | 'per_page'>,
  page: number,
) {
  const query = useInfiniteQuery({
    queryKey: getListAuctionsInfiniteQueryKey(request),
    queryFn: ({ pageParam, signal }) =>
      listAuctions(
        {
          ...request,
          page: pageParam,
          per_page: LIST_AUCTIONS_PER_PAGE,
        },
        { signal },
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.meta?.current_page ?? 1;
      const lastPageNumber = lastPage.meta?.last_page ?? 1;

      return currentPage < lastPageNumber ? currentPage + 1 : undefined;
    },
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = query;
  const loadedPages = data?.pages.length ?? 0;

  useEffect(
    function syncLoadedPagesWithQueryPageEffect() {
      if (page > loadedPages && hasNextPage && !isFetchingNextPage && !isLoading) {
        void fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, loadedPages, page],
  );

  return query;
}
