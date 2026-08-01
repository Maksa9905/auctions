import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { chunkByColumns } from '../../lib/chunkByColumns';
import { useAuctionsListColumnCount } from '../../lib/useAuctionsListColumnCount';
import { useLoadMoreOnScroll } from '../../lib/useLoadMoreOnScroll';
import AuctionsListRow from '../AuctionsListRow';

import type { AuctionsListProps } from './interface';

const ROW_ESTIMATE_SIZE = 188;
const ROW_OVERSCAN = 3;

export default function AuctionsList({
  data,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
  onClickItem,
  onHoverItem,
}: AuctionsListProps) {
  const { t } = useTranslation('auctions');
  const scrollRef = useRef<HTMLDivElement>(null);
  const columns = useAuctionsListColumnCount();
  const rows = useMemo(() => chunkByColumns(data, columns), [columns, data]);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_ESTIMATE_SIZE,
    overscan: ROW_OVERSCAN,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  useLoadMoreOnScroll({
    lastVisibleIndex: virtualRows.at(-1)?.index,
    itemsCount: rows.length,
    hasMore,
    isLoadingMore,
    onLoadMore,
  });

  return (
    <div
      ref={scrollRef}
      className="box-border h-[calc(100dvh-100px)] overflow-auto max-[420px]:h-[calc(100dvh-136px)]"
    >
      <div
        key={columns}
        className="relative w-full"
        style={{ height: rowVirtualizer.getTotalSize() }}
      >
        {virtualRows.map((virtualRow) => {
          const rowItems = rows[virtualRow.index];

          return (
            <div
              key={rowItems.map((item) => item.cargoNumber).join('-')}
              ref={rowVirtualizer.measureElement}
              data-index={virtualRow.index}
              className="absolute top-0 left-0 box-border w-full pb-3"
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            >
              <AuctionsListRow
                onHoverItem={onHoverItem}
                onClickItem={onClickItem}
                items={rowItems}
                columns={columns}
              />
            </div>
          );
        })}
      </div>
      {isLoadingMore && (
        <div className="px-1 py-3 text-sm text-muted-foreground">
          {t('auctionsTable.loadingMore')}
        </div>
      )}
    </div>
  );
}
