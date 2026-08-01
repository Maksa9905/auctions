import type { TFunction } from 'i18next';
import { z } from 'zod';

import { AuctionStatus, AuctionType, TradingStatus } from '@/shared/api';
import { zodDate } from '@/shared/lib';

const auctionStatusValues = Object.values(AuctionStatus) as [
  AuctionStatus,
  ...AuctionStatus[],
];
const tradingStatusValues = Object.values(TradingStatus) as [
  TradingStatus,
  ...TradingStatus[],
];
const auctionTypeValues = Object.values(AuctionType) as [AuctionType, ...AuctionType[]];

function isEmptyPrice(value: string): boolean {
  return value.trim() === '';
}

function isValidOptionalPrice(value: string): boolean {
  if (isEmptyPrice(value)) return true;
  const price = Number(value);
  return Number.isFinite(price) && price > 0;
}

export function createAuctionsFiltersSchema(t: TFunction<'auctions'>) {
  const optionalPrice = z.string().refine(isValidOptionalPrice, {
    message: t('filters.errors.invalidPrice'),
  });

  return z
    .object({
      cargoNum: z.string(),
      auctionStatuses: z.enum(auctionStatusValues).nullable(),
      tradingStatuses: z.enum(tradingStatusValues).nullable(),
      auctionType: z.enum(auctionTypeValues).nullable(),
      loadCity: z.string().nullable(),
      unloadCity: z.string().nullable(),
      loadDateFrom: zodDate(t('filters.errors.invalidDate')),
      loadDateTo: zodDate(t('filters.errors.invalidDate')),
      isAvailable: z.boolean(),
      isBigger: z.boolean(),
      priceFrom: optionalPrice,
      priceTo: optionalPrice,
    })
    .superRefine((values, ctx) => {
      if (
        values.loadDateFrom &&
        values.loadDateTo &&
        values.loadDateTo.isBefore(values.loadDateFrom, 'day')
      ) {
        ctx.addIssue({
          code: 'custom',
          path: ['loadDateTo'],
          message: t('filters.errors.dateRange'),
        });
      }

      if (
        !isEmptyPrice(values.priceFrom) &&
        !isEmptyPrice(values.priceTo) &&
        Number(values.priceTo) < Number(values.priceFrom)
      ) {
        ctx.addIssue({
          code: 'custom',
          path: ['priceTo'],
          message: t('filters.errors.priceRange'),
        });
      }
    });
}

export type AuctionsFiltersSchema = ReturnType<typeof createAuctionsFiltersSchema>;
