import { ArrowRightIcon } from 'lucide-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import type { AuctionsListItemProps } from './interface';

export default function AuctionsListItem({ item, onClick, onHover }: AuctionsListItemProps) {
  const { t } = useTranslation(['auctions', 'translation']);

  const handleClick = useCallback(() => {
    if (item.id && onClick) onClick(item.id);
  }, [item.id, onClick]);

  const handleHover = useCallback(() => {
    if (item.id && onHover) onHover(item.id);
  }, [item.id, onHover]);

  return (
    <article
      onClick={handleClick}
      onMouseMove={handleHover}
      className="rounded-lg border border-border bg-background px-3.5 py-3 transition-colors hover:border-primary/50 sm:px-4 sm:py-3.5 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-base font-semibold tracking-tight">{item.cargoNumber}</div>
          <div className="mt-0.5 truncate text-xs text-muted-foreground">{item.auctionType}</div>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-base font-semibold tracking-tight tabular-nums">
            {item.price.currentPrice}
          </div>
          <div className="mt-0.5 text-[0.6875rem] text-muted-foreground">
            {t('auctions:auctionsTable.pricePerKm')}
          </div>
          <div className="text-xs tabular-nums text-foreground/80">{item.price.pricePerKm}</div>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs">
        <span className="rounded-md bg-muted px-1.5 py-0.5 text-foreground/80">
          {item.auctionStatus}
        </span>
        <span className="rounded-md bg-muted px-1.5 py-0.5 text-foreground/80">
          {item.tradingStatus}
        </span>
        {item.bettedByMe && (
          <span className="rounded-md bg-primary/10 px-1.5 py-0.5 font-medium text-primary">
            {t('auctions:auctionsTable.bet')}
            {':'} {t('translation:yes')}
          </span>
        )}
      </div>

      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-start gap-2 sm:gap-3">
        <div className="min-w-0">
          <div className="text-[0.6875rem] font-medium tracking-wide text-muted-foreground uppercase">
            {t('auctions:auctionsTable.load')}
          </div>
          <div className="mt-0.5 truncate text-sm font-medium">{item.route.load.city}</div>
          <div className="truncate text-xs text-muted-foreground">{item.route.load.address}</div>
          <div className="mt-0.5 text-xs tabular-nums text-foreground/70">
            {item.route.load.date}
          </div>
        </div>

        <ArrowRightIcon aria-hidden className="mt-5 size-4 shrink-0 text-muted-foreground/70" />

        <div className="min-w-0 text-right">
          <div className="text-[0.6875rem] font-medium tracking-wide text-muted-foreground uppercase">
            {t('auctions:auctionsTable.unload')}
          </div>
          <div className="mt-0.5 truncate text-sm font-medium">{item.route.unload.city}</div>
          <div className="truncate text-xs text-muted-foreground">{item.route.unload.address}</div>
          <div className="mt-0.5 text-xs tabular-nums text-foreground/70">
            {item.route.unload.date}
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 border-t border-border/80 pt-2.5 text-xs leading-snug">
        <span className="min-w-0 font-medium [overflow-wrap:anywhere]">{item.cargo.name}</span>
        <span className="text-muted-foreground/50" aria-hidden>
          {'·'}
        </span>
        <span className="text-muted-foreground tabular-nums">{item.cargo.weight}</span>
        <span className="text-muted-foreground/50" aria-hidden>
          {'·'}
        </span>
        <span className="text-muted-foreground tabular-nums">{item.cargo.volume}</span>
        <span className="text-muted-foreground/50" aria-hidden>
          {'·'}
        </span>
        <span className="text-muted-foreground">{item.cargo.bodyType}</span>
      </div>
    </article>
  );
}
