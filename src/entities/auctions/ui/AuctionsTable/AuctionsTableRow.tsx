import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import { TableCell, TableRow } from '@/shared/ui/table';

import type { AuctionsTableRowProps } from './interface';

import styles from './AuctionsTable.module.css';

const AuctionsTableRow = forwardRef<HTMLTableRowElement, AuctionsTableRowProps>(
  function AuctionsTableRow({ item, index }, ref) {
    const { t } = useTranslation('translation');

    return (
      <TableRow ref={ref} data-index={index}>
        <TableCell className={styles.WhiteSpaceNoWrap}>{item.cargoNumber}</TableCell>
        <TableCell className={styles.WhiteSpaceNoWrap}>{item.auctionType}</TableCell>
        <TableCell className={styles.WhiteSpaceNoWrap}>{item.auctionStatus}</TableCell>
        <TableCell className={styles.WhiteSpaceNoWrap}>{item.tradingStatus}</TableCell>
        <TableCell className="max-w-[350px] whitespace-normal">
          {`${item.route.load.city} · ${item.route.load.address}`}
        </TableCell>
        <TableCell className="max-w-[350px] whitespace-normal">
          {`${item.route.unload.city} · ${item.route.unload.address}`}
        </TableCell>
        <TableCell className={styles.WhiteSpaceNoWrap}>{item.route.load.date}</TableCell>
        <TableCell className={styles.WhiteSpaceNoWrap}>{item.route.unload.date}</TableCell>
        <TableCell className="whitespace-normal">{item.cargo.name}</TableCell>
        <TableCell className={styles.WhiteSpaceNoWrap}>{item.cargo.weight}</TableCell>
        <TableCell className={styles.WhiteSpaceNoWrap}>{item.cargo.volume}</TableCell>
        <TableCell className={styles.WhiteSpaceNoWrap}>{item.cargo.bodyType}</TableCell>
        <TableCell className={styles.WhiteSpaceNoWrap}>{item.price.currentPrice}</TableCell>
        <TableCell className={styles.WhiteSpaceNoWrap}>{item.price.pricePerKm}</TableCell>
        <TableCell className={styles.WhiteSpaceNoWrap}>
          {item.bettedByMe ? t('yes') : t('no')}
        </TableCell>
      </TableRow>
    );
  },
);

export default AuctionsTableRow;
