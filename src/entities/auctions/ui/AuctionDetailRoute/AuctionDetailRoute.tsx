import { useTranslation } from 'react-i18next';

import { OperationType } from '@/shared/api';

import { formatDateTime } from '../../lib/formatDateTime';
import AuctionDetailSection from '../AuctionDetailSection';

import type { AuctionDetailRouteProps } from './interface';

export default function AuctionDetailRoute({
  routePoints,
  hideAddresses,
}: AuctionDetailRouteProps) {
  const { t } = useTranslation(['auctions', 'translation']);

  const opLabel = (op?: string) => {
    if (op === OperationType.Loading) return t('auctions:detail.route.loading');
    if (op === OperationType.Unloading) return t('auctions:detail.route.unloading');
    return t('auctions:detail.route.point');
  };

  if (routePoints.length === 0)
    return (
      <AuctionDetailSection title={t('auctions:detail.route.title')}>
        <p className="text-sm text-muted-foreground">{t('translation:notSpecified')}</p>
      </AuctionDetailSection>
    );

  return (
    <AuctionDetailSection title={t('auctions:detail.route.title')}>
      <ol className="flex flex-col gap-0">
        {routePoints.map((point, index) => (
          <li key={`${point.row_num}-${index}`} className="relative flex gap-3 pb-4 last:pb-0">
            <div className="flex flex-col items-center">
              <span className="mt-1 size-2.5 shrink-0 rounded-full bg-primary" />
              {index < routePoints.length - 1 && (
                <span className="mt-1 w-px flex-1 bg-border relative top-2" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {opLabel(point.op_type)}
                </span>
                <span className="text-sm font-medium">
                  {point.location?.city_name || t('translation:notSpecified')}
                </span>
              </div>
              {!hideAddresses && point.location?.loading_address && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {point.location.loading_address}
                </p>
              )}
              <p className="mt-0.5 text-xs tabular-nums text-foreground/70">
                {formatDateTime(point.start_date) || t('translation:notSpecified')}
                {point.end_date && point.end_date !== point.start_date
                  ? ` — ${formatDateTime(point.end_date)}`
                  : ''}
              </p>
              {!hideAddresses && point.contact?.name && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {point.contact.name}
                  {point.contact.phone ? (
                    <>
                      {' · '}
                      {point.contact.phone}
                    </>
                  ) : null}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </AuctionDetailSection>
  );
}
