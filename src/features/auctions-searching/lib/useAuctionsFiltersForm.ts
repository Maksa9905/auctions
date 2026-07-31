import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { type Resolver, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { auctionsFiltersDefaultValues } from '../model/defaultValues';
import { createAuctionsFiltersSchema } from '../model/schema';
import type { AuctionsFiltersFormValues } from '../model/types';

export function useAuctionsFiltersForm(
  defaultValues: AuctionsFiltersFormValues = auctionsFiltersDefaultValues,
) {
  const { t } = useTranslation('auctions');
  const schema = useMemo(() => createAuctionsFiltersSchema(t), [t]);

  return useForm<AuctionsFiltersFormValues>({
    resolver: zodResolver(schema) as Resolver<AuctionsFiltersFormValues>,
    defaultValues,
    mode: 'onSubmit',
  });
}
