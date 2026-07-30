import { Table } from '@radix-ui/themes';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import type { AuctionsTableRowProps } from './interface';

import styles from './AuctionsTable.module.css';

const AuctionsTableRow = forwardRef<HTMLTableRowElement, AuctionsTableRowProps>(
  function AuctionsTableRow({ item, index }, ref) {
    const { t } = useTranslation('translation');

    return (
      <Table.Row ref={ref} className={styles.AuctionsTableRow} data-index={index}>
        <Table.RowHeaderCell className={styles.WhiteSpaceNoWrap}>
          {item.cargoNumber}
        </Table.RowHeaderCell>
        <Table.Cell className={styles.WhiteSpaceNoWrap}>{item.auctionType}</Table.Cell>
        <Table.Cell className={styles.WhiteSpaceNoWrap}>{item.auctionStatus}</Table.Cell>
        <Table.Cell className={styles.WhiteSpaceNoWrap}>{item.tradingStatus}</Table.Cell>
        <Table.Cell width="350px">{`${item.route.load.city} · ${item.route.load.address}`}</Table.Cell>
        <Table.Cell width="350px">
          {`${item.route.unload.city} · ${item.route.unload.address}`}
        </Table.Cell>
        <Table.Cell className={styles.WhiteSpaceNoWrap}>{item.route.load.date}</Table.Cell>
        <Table.Cell className={styles.WhiteSpaceNoWrap}>{item.route.unload.date}</Table.Cell>
        <Table.Cell>{item.cargo.name}</Table.Cell>
        <Table.Cell className={styles.WhiteSpaceNoWrap}>{item.cargo.weight}</Table.Cell>
        <Table.Cell className={styles.WhiteSpaceNoWrap}>{item.cargo.volume}</Table.Cell>
        <Table.Cell className={styles.WhiteSpaceNoWrap}>{item.cargo.bodyType}</Table.Cell>
        <Table.Cell className={styles.WhiteSpaceNoWrap}>{item.price.currentPrice}</Table.Cell>
        <Table.Cell className={styles.WhiteSpaceNoWrap}>{item.price.pricePerKm}</Table.Cell>
        <Table.Cell className={styles.WhiteSpaceNoWrap}>
          {item.bettedByMe ? t('yes') : t('no')}
        </Table.Cell>
      </Table.Row>
    );
  },
);

export default AuctionsTableRow;
