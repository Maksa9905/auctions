import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { TableBody, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

import { useLoadMoreOnScroll } from '../../lib/useLoadMoreOnScroll';

import AuctionsTableRow from './AuctionsTableRow';
import type { AuctionsTableProps } from './interface';

import styles from './AuctionsTable.module.css';

const COLUMN_COUNT = 15;
const ROW_ESTIMATE_SIZE = 52;
const ROW_OVERSCAN = 8;

export default function AuctionsTable({
  data,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
}: AuctionsTableProps) {
  const { t } = useTranslation('auctions');
  const scrollRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_ESTIMATE_SIZE,
    overscan: ROW_OVERSCAN,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? rowVirtualizer.getTotalSize() - virtualRows[virtualRows.length - 1].end
      : 0;

  useLoadMoreOnScroll({
    lastVisibleIndex: virtualRows.at(-1)?.index,
    itemsCount: data.length,
    hasMore,
    isLoadingMore,
    onLoadMore,
  });

  return (
    <div ref={scrollRef} className={styles.Root}>
      <table className={styles.Table}>
        <TableHeader className={styles.Header}>
          <TableRow>
            <TableHead rowSpan={2}>{t('auctionsTable.cargoNum')}</TableHead>
            <TableHead rowSpan={2}>{t('auctionsTable.auctionType')}</TableHead>
            <TableHead rowSpan={2}>{t('auctionsTable.auctionStatus')}</TableHead>
            <TableHead rowSpan={2}>{t('auctionsTable.tradingStatus')}</TableHead>
            <TableHead className="text-center" colSpan={2}>
              {t('auctionsTable.route')}
            </TableHead>
            <TableHead className="text-center" colSpan={2}>
              {t('auctionsTable.routeDates')}
            </TableHead>
            <TableHead className="text-center" colSpan={4}>
              {t('auctionsTable.cargo.title')}
            </TableHead>
            <TableHead rowSpan={2}>{t('auctionsTable.currentPrice')}</TableHead>
            <TableHead rowSpan={2}>{t('auctionsTable.pricePerKm')}</TableHead>
            <TableHead rowSpan={2}>{t('auctionsTable.bet')}</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="min-w-50">{t('auctionsTable.load')}</TableHead>
            <TableHead className="min-w-50">{t('auctionsTable.unload')}</TableHead>
            <TableHead>{t('auctionsTable.load')}</TableHead>
            <TableHead>{t('auctionsTable.unload')}</TableHead>
            <TableHead>{t('auctionsTable.cargo.title')}</TableHead>
            <TableHead>{t('auctionsTable.cargo.weight')}</TableHead>
            <TableHead>{t('auctionsTable.cargo.volume')}</TableHead>
            <TableHead>{t('auctionsTable.cargo.bodyType')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paddingTop > 0 && (
            <tr aria-hidden>
              <td
                className={styles.SpacerCell}
                colSpan={COLUMN_COUNT}
                style={{ height: paddingTop }}
              />
            </tr>
          )}
          {virtualRows.map((virtualRow) => {
            const item = data[virtualRow.index];

            return (
              <AuctionsTableRow
                key={item.cargoNumber}
                ref={rowVirtualizer.measureElement}
                item={item}
                index={virtualRow.index}
              />
            );
          })}
          {paddingBottom > 0 && (
            <tr aria-hidden>
              <td
                className={styles.SpacerCell}
                colSpan={COLUMN_COUNT}
                style={{ height: paddingBottom }}
              />
            </tr>
          )}
          {isLoadingMore && (
            <tr>
              <td className="px-3 py-2 text-sm text-muted-foreground" colSpan={COLUMN_COUNT}>
                {t('auctionsTable.loadingMore')}
              </td>
            </tr>
          )}
        </TableBody>
      </table>
    </div>
  );
}
