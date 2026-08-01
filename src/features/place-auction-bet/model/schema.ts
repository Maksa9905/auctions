import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import type { PlaceAuctionBetConstraints } from './types';

function parsePrice(value: string) {
  return Number(value.trim());
}

export function createPlaceAuctionBetSchema(
  t: TFunction<'auctions'>,
  constraints: PlaceAuctionBetConstraints = {},
) {
  const { min, max, step, current } = constraints;

  return z.object({
    price: z
      .string()
      .trim()
      .min(1, t('placeBet.errors.required'))
      .refine((value) => {
        const price = parsePrice(value);
        return Number.isFinite(price) && price > 0;
      }, t('placeBet.errors.gtZero'))
      .refine(
        (value) => {
          if (min == null) return true;
          return parsePrice(value) >= min;
        },
        t('placeBet.errors.min', { min }),
      )
      .refine(
        (value) => {
          if (max == null) return true;
          return parsePrice(value) <= max;
        },
        t('placeBet.errors.max', { max }),
      )
      .refine(
        (value) => {
          if (step == null || step <= 0 || current == null) return true;
          const price = parsePrice(value);
          return Math.abs((current - price) % step) < 1e-9;
        },
        t('placeBet.errors.step', { step }),
      ),
  });
}

export function usePlayAuctionBetSchema(constraints: PlaceAuctionBetConstraints) {
  const { t } = useTranslation('auctions');

  return createPlaceAuctionBetSchema(t, constraints);
}
