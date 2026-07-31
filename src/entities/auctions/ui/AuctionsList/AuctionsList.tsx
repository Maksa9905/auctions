import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useLoadMoreOnScroll } from '../../lib/useLoadMoreOnScroll';
import AuctionsListItem from '../AuctionsListItem';

import type { AuctionsListProps } from './interface';

import styles from './AuctionsList.module.css';

const ITEM_ESTIMATE_SIZE = 220;
const ITEM_OVERSCAN = 4;

export default function AuctionsList({
  data,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
}: AuctionsListProps) {
  const { t } = useTranslation('auctions');
  const scrollRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ITEM_ESTIMATE_SIZE,
    overscan: ITEM_OVERSCAN,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useLoadMoreOnScroll({
    lastVisibleIndex: virtualItems.at(-1)?.index,
    itemsCount: data.length,
    hasMore,
    isLoadingMore,
    onLoadMore,
  });

  return (
    <div ref={scrollRef} className={styles.Root}>
      <div className={styles.Viewport} style={{ height: rowVirtualizer.getTotalSize() }}>
        {virtualItems.map((virtualItem) => {
          const item = data[virtualItem.index];

          return (
            <div
              key={item.cargoNumber}
              ref={rowVirtualizer.measureElement}
              data-index={virtualItem.index}
              className={styles.Item}
              style={{ transform: `translateY(${virtualItem.start}px)` }}
            >
              <AuctionsListItem item={item} />
            </div>
          );
        })}
      </div>
      {isLoadingMore && <div className={styles.LoadingMore}>{t('auctionsTable.loadingMore')}</div>}
    </div>
  );
}
