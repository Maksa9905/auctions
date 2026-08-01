import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';

import { useAuctionBetsQuery } from '../../api/api';
import { formatPrice } from '../../lib/formatPrice';
import AuctionDetailSection from '../AuctionDetailSection';

import type { AuctionDetailBetRowProps, AuctionDetailBetsProps } from './interface';

export default function AuctionDetailBets({
  auctionUuid,
  hideBetsHistory,
  hidePlaces,
  currentOrganizationId,
}: AuctionDetailBetsProps) {
  const { t } = useTranslation(['auctions', 'translation']);
  const [withVat, setWithVat] = useState(true);
  const betsQuery = useAuctionBetsQuery(auctionUuid, true, !hideBetsHistory);

  const bets = useMemo(() => betsQuery.data?.bets ?? [], [betsQuery.data?.bets]);

  const participantsCount = useMemo(() => {
    const ids = new Set(
      bets
        .filter((bet) => !bet.is_rejected && !bet.cancel_reason)
        .map((bet) => bet.organization_id)
        .filter((id): id is number => id != null),
    );
    return ids.size;
  }, [bets]);

  const sortedBets = useMemo(() => {
    return [...bets].sort((a, b) => {
      const aCancelled = Boolean(a.is_rejected || a.cancel_reason);
      const bCancelled = Boolean(b.is_rejected || b.cancel_reason);
      if (aCancelled !== bCancelled) return aCancelled ? 1 : -1;

      const aPlace = a.place ?? Number.POSITIVE_INFINITY;
      const bPlace = b.place ?? Number.POSITIVE_INFINITY;
      if (aPlace !== bPlace) return aPlace - bPlace;

      return (a.price_with_vat ?? 0) - (b.price_with_vat ?? 0);
    });
  }, [bets]);

  if (hideBetsHistory) {
    return (
      <AuctionDetailSection title={t('auctions:detail.bets.title')}>
        <p className="text-sm text-muted-foreground">{t('auctions:detail.bets.hidden')}</p>
      </AuctionDetailSection>
    );
  }

  return (
    <AuctionDetailSection
      title={t('auctions:detail.bets.title')}
      action={
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border border-border p-0.5">
            <Button
              type="button"
              size="xs"
              variant={withVat ? 'secondary' : 'ghost'}
              onClick={() => setWithVat(true)}
            >
              {t('auctions:detail.bets.withVat')}
            </Button>
            <Button
              type="button"
              size="xs"
              variant={!withVat ? 'secondary' : 'ghost'}
              onClick={() => setWithVat(false)}
            >
              {t('auctions:detail.bets.withoutVat')}
            </Button>
          </div>
        </div>
      }
    >
      {betsQuery.isPending ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
        </div>
      ) : betsQuery.isError ? (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">{t('auctions:detail.bets.error')}</p>
          <Button type="button" size="sm" variant="outline" onClick={() => void betsQuery.refetch()}>
            {t('auctions:states.retry')}
          </Button>
        </div>
      ) : sortedBets.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t('auctions:detail.bets.empty')}</p>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-muted-foreground">
            {t('auctions:detail.bets.participants', { count: participantsCount })}
          </p>
          <ul className="flex flex-col gap-2">
            {sortedBets.map((bet) => (
              <BetRow
                key={bet.id ?? `${bet.organization_id}-${bet.created_at}`}
                bet={bet}
                withVat={withVat}
                hidePlaces={hidePlaces}
                isMine={
                  currentOrganizationId != null && bet.organization_id === currentOrganizationId
                }
                winnerLabel={t('auctions:detail.bets.winner')}
                cancelledLabel={t('auctions:detail.bets.cancelled')}
                placeLabel={t('auctions:detail.bets.place')}
              />
            ))}
          </ul>
        </div>
      )}
    </AuctionDetailSection>
  );
}

function BetRow({
  bet,
  withVat,
  hidePlaces,
  isMine,
  winnerLabel,
  cancelledLabel,
  placeLabel,
}: AuctionDetailBetRowProps) {
  const cancelled = Boolean(bet.is_rejected || bet.cancel_reason);
  const price = withVat ? bet.price_with_vat : bet.price_no_vat;

  return (
    <li
      className={[
        'rounded-md border px-3 py-2.5',
        cancelled
          ? 'border-border/70 bg-muted/40 opacity-80'
          : isMine
            ? 'border-primary/40 bg-primary/5'
            : 'border-border bg-background',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            {!hidePlaces && bet.place != null && !cancelled && (
              <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-semibold tabular-nums">
                {placeLabel} {bet.place}
              </span>
            )}
            {bet.is_win && !cancelled && (
              <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                {winnerLabel}
              </span>
            )}
            {cancelled && (
              <span className="rounded-md bg-destructive/10 px-1.5 py-0.5 text-xs font-medium text-destructive">
                {cancelledLabel}
              </span>
            )}
          </div>
          <div className="mt-1 truncate text-sm font-medium">{bet.organization_name || '—'}</div>
        </div>
        <div
          className={[
            'shrink-0 text-right text-sm font-semibold tabular-nums',
            cancelled ? 'line-through text-muted-foreground' : '',
          ].join(' ')}
        >
          {formatPrice(price)}
        </div>
      </div>
      {cancelled && bet.cancel_reason ? (
        <p className="mt-1.5 text-xs text-muted-foreground">{bet.cancel_reason}</p>
      ) : null}
    </li>
  );
}
