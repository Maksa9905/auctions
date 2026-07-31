import { useCallback, useMemo } from 'react';

import { useListAuctionsInfinite } from '@/shared/api';

import { useGetAuctionMappers } from '../../lib/mappers';
import AuctionsList from '../AuctionsList';
import AuctionsTable from '../AuctionsTable';

import { type AuctionsListTableProps, EAuctionsListTableViewType } from './interface';

export default function AuctionsListTable({
  viewType,
  request,
  page,
  onPageChange,
}: AuctionsListTableProps) {
  const { data, hasNextPage, isFetchingNextPage } = useListAuctionsInfinite(request, page);
  const { mapAuctionItem } = useGetAuctionMappers();

  const tableData = useMemo(
    () => data?.pages.flatMap((pageData) => pageData.data?.map(mapAuctionItem) ?? []) ?? [],
    [data?.pages, mapAuctionItem],
  );

  const handleLoadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    const loadedPages = data?.pages.length ?? 0;
    if (page <= loadedPages) {
      onPageChange(page + 1);
    }
  }, [data?.pages.length, hasNextPage, isFetchingNextPage, onPageChange, page]);

  if (viewType === EAuctionsListTableViewType.LIST) {
    return (
      <AuctionsList
        data={tableData}
        hasMore={Boolean(hasNextPage)}
        isLoadingMore={isFetchingNextPage}
        onLoadMore={handleLoadMore}
      />
    );
  }

  if (viewType === EAuctionsListTableViewType.TABLE) {
    return (
      <AuctionsTable
        data={tableData}
        hasMore={Boolean(hasNextPage)}
        isLoadingMore={isFetchingNextPage}
        onLoadMore={handleLoadMore}
      />
    );
  }
}
