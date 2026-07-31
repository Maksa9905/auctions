import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  AuctionListItemTradingStatus,
  AuctionListItemTradingStatusMobile,
  AuctionType,
} from '@/shared/api';

import { ECity } from './types';

export function useAuctionOptions() {
  const { t } = useTranslation('auctions');

  const auctionStatusOptions = useMemo(
    () =>
      Object.values(AuctionListItemTradingStatus)
        .filter((value) => value !== AuctionListItemTradingStatus.Unknown)
        .map((value) => ({
          value,
          label: t(`auctionStatus.${value}`),
        })),
    [t],
  );

  const tradingStatusOptions = useMemo(
    () =>
      Object.values(AuctionListItemTradingStatusMobile)
        .filter((value) => value !== AuctionListItemTradingStatusMobile.Unknown)
        .map((value) => ({
          value,
          label: t(`tradingStatus.${value}`),
        })),
    [t],
  );

  const auctionTypeOptions = useMemo(
    () =>
      Object.values(AuctionType)
        .filter((value) => value !== AuctionType.Unknown)
        .map((value) => ({
          value,
          label: t(`auctionType.${value}`),
        })),
    [t],
  );

  const citiesOptions = useMemo(
    () =>
      Object.values(ECity).map((value) => ({
        value,
        label: value,
      })),
    [],
  );

  return { auctionStatusOptions, tradingStatusOptions, auctionTypeOptions, citiesOptions };
}
