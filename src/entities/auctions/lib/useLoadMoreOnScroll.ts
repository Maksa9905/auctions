import { useEffect } from 'react';

const DEFAULT_THRESHOLD = 5;

type UseLoadMoreOnScrollParams = {
  lastVisibleIndex: number | undefined;
  itemsCount: number;
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore?: () => void;
  threshold?: number;
};

export function useLoadMoreOnScroll({
  lastVisibleIndex,
  itemsCount,
  hasMore,
  isLoadingMore,
  onLoadMore,
  threshold = DEFAULT_THRESHOLD,
}: UseLoadMoreOnScrollParams) {
  useEffect(
    function loadMoreOnScrollEffect() {
      if (
        !onLoadMore ||
        !hasMore ||
        isLoadingMore ||
        itemsCount === 0 ||
        lastVisibleIndex == null
      ) {
        return;
      }

      if (lastVisibleIndex >= itemsCount - threshold) {
        onLoadMore();
      }
    },
    [hasMore, isLoadingMore, itemsCount, lastVisibleIndex, onLoadMore, threshold],
  );
}
