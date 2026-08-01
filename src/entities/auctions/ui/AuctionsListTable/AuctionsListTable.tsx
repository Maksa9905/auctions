import { useCallback, useMemo } from 'react';

import { getLoadedStandardPages, useListAuctionsInfinite } from '@/shared/api';

import { useGetAuctionMappers } from '../../lib/mappers';
import AuctionsList from '../AuctionsList';
import { AuctionsListEmpty, AuctionsListError, AuctionsListSkeleton } from '../AuctionsListStates';
import AuctionsTable from '../AuctionsTable';

import { type AuctionsListTableProps, EAuctionsListTableViewType } from './interface';

export default function AuctionsListTable({
  viewType,
  params,
  page,
  onPageChange,
  onClickItem,
  onHoverItem,
}: AuctionsListTableProps) {
  const { data, hasNextPage, isFetchingNextPage, isPending, isError, refetch } =
    useListAuctionsInfinite(params, page);
  const { mapAuctionItem } = useGetAuctionMappers();

  const tableData = useMemo(
    () => data?.pages.flatMap((pageData) => pageData.data?.map(mapAuctionItem) ?? []) ?? [],
    [data?.pages, mapAuctionItem],
  );

  const loadedStandardPages = getLoadedStandardPages(data?.pages);

  const handleLoadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    if (page <= loadedStandardPages) {
      onPageChange(page + 1);
    }
  }, [hasNextPage, isFetchingNextPage, loadedStandardPages, onPageChange, page]);

  if (isPending) {
    return <AuctionsListSkeleton viewType={viewType} />;
  }

  if (isError && tableData.length === 0) {
    return <AuctionsListError onRetry={() => void refetch()} />;
  }

  if (tableData.length === 0) {
    return <AuctionsListEmpty />;
  }

  if (viewType === EAuctionsListTableViewType.LIST) {
    return (
      <AuctionsList
        data={tableData}
        hasMore={Boolean(hasNextPage)}
        isLoadingMore={isFetchingNextPage}
        onLoadMore={handleLoadMore}
        onClickItem={onClickItem}
        onHoverItem={onHoverItem}
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
        onClickItem={onClickItem}
        onHoverItem={onHoverItem}
      />
    );
  }
}
