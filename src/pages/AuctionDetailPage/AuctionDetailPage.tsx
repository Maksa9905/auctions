import { useParams } from '@tanstack/react-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { AuctionDetail, useAuctionQuery } from '@/entities/auctions';
import { PlaceAuctionBetForm } from '@/features/place-auction-bet';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';

export default function AuctionDetailPage() {
  const { t } = useTranslation('auctions');
  const { id } = useParams({ from: '/auctions/$id' });
  const auctionQuery = useAuctionQuery(id);

  const handleAuctionRefetch = useCallback(() => {
    void auctionQuery.refetch();
  }, [auctionQuery]);

  if (auctionQuery.isPending) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-72" />
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (auctionQuery.isError || !auctionQuery.data) {
    return (
      <div
        role="alert"
        className="flex min-h-56 flex-col items-center justify-center gap-4 rounded-lg border border-border px-6 py-10 text-center"
      >
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium">{t('detail.states.errorTitle')}</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            {t('detail.states.errorDescription')}
          </p>
        </div>
        <Button type="button" variant="outline" onClick={handleAuctionRefetch}>
          {t('states.retry')}
        </Button>
      </div>
    );
  }

  const { trading } = auctionQuery.data;

  return (
    <AuctionDetail
      auction={auctionQuery.data}
      auctionUuid={id}
      betForm={
        <PlaceAuctionBetForm
          auctionUuid={id}
          canSetBet={Boolean(trading.can_set_bet)}
          constraints={{
            min: trading.price?.min,
            max: trading.price?.max,
            step: trading.price?.step,
            current: trading.price?.current,
            available: trading.price?.available,
          }}
        />
      }
    />
  );
}
