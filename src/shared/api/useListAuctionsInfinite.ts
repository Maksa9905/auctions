import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { listAuctions } from './generated/auctions/auctions';
import type { AuctionListRequest, AuctionListResponseBase } from './generated/model';

export const LIST_AUCTIONS_PER_PAGE = 10;

type ListPageParam = {
  page: number;
  perPage: number;
};

export function getListAuctionsInfiniteQueryKey(
  request: Omit<AuctionListRequest, 'page' | 'per_page'>,
) {
  return ['POST', '/auctions/list', 'infinite', request, LIST_AUCTIONS_PER_PAGE] as const;
}

function getLoadedItemsCount(pages: AuctionListResponseBase[] | undefined) {
  return pages?.reduce((sum, page) => sum + (page.data?.length ?? 0), 0) ?? 0;
}

export function getLoadedStandardPages(pages: AuctionListResponseBase[] | undefined) {
  const loadedItems = getLoadedItemsCount(pages);
  return Math.ceil(loadedItems / LIST_AUCTIONS_PER_PAGE);
}

export function useListAuctionsInfinite(
  request: Omit<AuctionListRequest, 'page' | 'per_page'>,
  page: number,
) {
  const initialPerPage = Math.max(1, page) * LIST_AUCTIONS_PER_PAGE;

  const query = useInfiniteQuery({
    queryKey: getListAuctionsInfiniteQueryKey(request),
    initialPageParam: {
      page: 1,
      perPage: initialPerPage,
    } satisfies ListPageParam,
    queryFn: ({ pageParam, signal }) =>
      listAuctions(
        {
          ...request,
          page: pageParam.page,
          per_page: pageParam.perPage,
        },
        { signal },
      ),
    getNextPageParam: (lastPage, allPages): ListPageParam | undefined => {
      const total = lastPage.meta?.total ?? 0;
      const loadedItems = getLoadedItemsCount(allPages);

      if (loadedItems >= total) {
        return undefined;
      }

      return {
        page: Math.floor(loadedItems / LIST_AUCTIONS_PER_PAGE) + 1,
        perPage: LIST_AUCTIONS_PER_PAGE,
      };
    },
  });

  const loadedStandardPages = getLoadedStandardPages(query.data?.pages);

  useEffect(
    function syncLoadedPagesWithQueryPageEffect() {
      if (
        page > loadedStandardPages &&
        query.hasNextPage &&
        !query.isFetchingNextPage &&
        !query.isLoading
      ) {
        void query.fetchNextPage();
      }
    },
    [
      loadedStandardPages,
      page,
      query,
      query.fetchNextPage,
      query.hasNextPage,
      query.isFetchingNextPage,
      query.isLoading,
    ],
  );

  return query;
}
