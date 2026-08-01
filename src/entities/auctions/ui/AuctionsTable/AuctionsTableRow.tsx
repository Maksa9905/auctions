import { forwardRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/button';
import { TableCell, TableRow } from '@/shared/ui/table';

import type { AuctionsTableRowProps } from './interface';

const AuctionsTableRow = forwardRef<HTMLTableRowElement, AuctionsTableRowProps>(
  function AuctionsTableRow({ item, index, onClick, onHover }, ref) {
    const { t } = useTranslation('translation');

    const handleClickItem = useCallback(() => {
      if (item.id && onClick) onClick(item.id);
    }, [item.id, onClick]);

    const handleHover = useCallback(() => {
      if (item.id && onHover) onHover(item.id);
    }, [item.id, onHover]);

    return (
      <TableRow ref={ref} data-index={index}>
        <TableCell className="whitespace-nowrap">
          {
            <Button
              className="cursor-pointer"
              variant="link"
              onClick={handleClickItem}
              onMouseEnter={handleHover}
            >
              {item.cargoNumber}
            </Button>
          }
        </TableCell>
        <TableCell className="whitespace-nowrap">{item.auctionType}</TableCell>
        <TableCell className="whitespace-nowrap">{item.auctionStatus}</TableCell>
        <TableCell className="whitespace-nowrap">{item.tradingStatus}</TableCell>
        <TableCell className="max-w-87.5 whitespace-normal">
          {`${item.route.load.city} · ${item.route.load.address}`}
        </TableCell>
        <TableCell className="max-w-87.5 whitespace-normal">
          {`${item.route.unload.city} · ${item.route.unload.address}`}
        </TableCell>
        <TableCell className="whitespace-nowrap">{item.route.load.date}</TableCell>
        <TableCell className="whitespace-nowrap">{item.route.unload.date}</TableCell>
        <TableCell className="whitespace-normal">{item.cargo.name}</TableCell>
        <TableCell className="whitespace-nowrap">{item.cargo.weight}</TableCell>
        <TableCell className="whitespace-nowrap">{item.cargo.volume}</TableCell>
        <TableCell className="whitespace-nowrap">{item.cargo.bodyType}</TableCell>
        <TableCell className="whitespace-nowrap">{item.price.currentPrice}</TableCell>
        <TableCell className="whitespace-nowrap">{item.price.pricePerKm}</TableCell>
        <TableCell className="whitespace-nowrap">{item.bettedByMe ? t('yes') : t('no')}</TableCell>
      </TableRow>
    );
  },
);

export default AuctionsTableRow;
