import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { formatPrice } from '@/entities/auctions';

import type { PlaceAuctionBetConstraints } from '../model/types';

export function useAuctionBetFormHints(constraints: PlaceAuctionBetConstraints) {
  const { t } = useTranslation('auctions');

  const hintParts = useMemo(
    () =>
      [
        constraints.available != null
          ? t('placeBet.hints.available', { value: formatPrice(constraints.available) })
          : null,
        constraints.min != null || constraints.max != null
          ? t('placeBet.hints.range', {
              min: formatPrice(constraints.min),
              max: formatPrice(constraints.max),
            })
          : null,
        constraints.step != null
          ? t('placeBet.hints.step', { value: formatPrice(constraints.step) })
          : null,
      ].filter(Boolean),
    [constraints.available, constraints.max, constraints.min, constraints.step, t],
  );

  return hintParts;
}
