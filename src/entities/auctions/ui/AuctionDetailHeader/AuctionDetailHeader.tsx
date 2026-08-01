import { Link } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { routes } from '@/shared/routes';
import { Button } from '@/shared/ui/button';

import type { AuctionDetailHeaderProps } from './interface';

export default function AuctionDetailHeader({
  main,
  trading,
  routePoints,
}: AuctionDetailHeaderProps) {
  const { t } = useTranslation(['auctions', 'translation']);

  const cities = routePoints.map((point) => point.location?.city_name).filter(Boolean);
  const routeSummary =
    cities.length === 0
      ? null
      : cities.length === 1
        ? cities[0]
        : `${cities[0]} → ${cities[cities.length - 1]}`;

  return (
    <div>
      <Button asChild variant="ghost" size="sm" className="-ml-2 mb-2 text-muted-foreground">
        <Link to={routes.auctions}>
          <ArrowLeftIcon data-icon="inline-start" />
          {t('auctions:detail.backToList')}
        </Link>
      </Button>

      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight">
            {main.cargo_num || t('translation:notSpecified')}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {main.auc_type
              ? t(`auctions:auctionType.${main.auc_type}`)
              : t('translation:notSpecified')}
            {routeSummary ? ` · ${routeSummary}` : null}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {trading.status && (
            <span className="rounded-md bg-muted px-2 py-1 text-xs text-foreground/80">
              {t(`auctions:auctionStatus.${trading.status}`)}
            </span>
          )}
          {trading.status_mobile && (
            <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              {t(`auctions:tradingStatus.${trading.status_mobile}`)}
            </span>
          )}
          {trading.your?.bet && (
            <span className="rounded-md bg-muted px-2 py-1 text-xs">
              {t('auctions:auctionsTable.bet')}
              {': '}
              {t('translation:yes')}
            </span>
          )}
        </div>
      </header>
    </div>
  );
}
