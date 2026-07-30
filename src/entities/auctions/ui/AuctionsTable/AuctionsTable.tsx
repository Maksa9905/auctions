import { Table } from '@radix-ui/themes';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import AuctionsTableRow from './AuctionsTableRow';
import type { AuctionsTableProps } from './interface';

import styles from './AuctionsTable.module.css';

const COLUMN_COUNT = 15;
const ROW_ESTIMATE_SIZE = 52;
const ROW_OVERSCAN = 8;

export default function AuctionsTable({ data }: AuctionsTableProps) {
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

  return (
    <div ref={scrollRef} className={styles.Root}>
      <table className={`rt-TableRootTable ${styles.Table}`}>
        <Table.Header className={`${styles.AuctionsTableRow} ${styles.Header}`}>
          <Table.Row align="center">
            <Table.ColumnHeaderCell rowSpan={2}>
              {t('auctionsTable.cargoNum')}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell rowSpan={2}>
              {t('auctionsTable.auctionType')}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell rowSpan={2}>
              {t('auctionsTable.auctionStatus')}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell rowSpan={2}>
              {t('auctionsTable.tradingStatus')}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell align="center" colSpan={2}>
              {t('auctionsTable.route')}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell align="center" colSpan={2}>
              {t('auctionsTable.routeDates')}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell align="center" colSpan={4}>
              {t('auctionsTable.cargo.title')}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell rowSpan={2}>
              {t('auctionsTable.currentPrice')}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell rowSpan={2}>
              {t('auctionsTable.pricePerKm')}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell rowSpan={2}>{t('auctionsTable.bet')}</Table.ColumnHeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.ColumnHeaderCell minWidth="200px">
              {t('auctionsTable.load')}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell minWidth="200px">
              {t('auctionsTable.unload')}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{t('auctionsTable.load')}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{t('auctionsTable.unload')}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{t('auctionsTable.cargo.title')}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{t('auctionsTable.cargo.weight')}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{t('auctionsTable.cargo.volume')}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{t('auctionsTable.cargo.bodyType')}</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
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
        </Table.Body>
      </table>
    </div>
  );
}
