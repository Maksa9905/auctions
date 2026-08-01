import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { type Resolver, useForm } from 'react-hook-form';

import { usePlayAuctionBetSchema } from '../model/schema';
import type { PlaceAuctionBetConstraints, PlaceAuctionBetFormValues } from '../model/types';

export function usePlaceAuctionBetForm(constraints: PlaceAuctionBetConstraints = {}) {
  const { step, current, available } = constraints;

  const schema = usePlayAuctionBetSchema(constraints);

  const defaultPrice = useMemo(() => {
    if (available !== null) {
      return String(available);
    }

    if (current != null && step != null) {
      return String(current - step);
    }

    return '';
  }, [available, current, step]);

  const form = useForm<PlaceAuctionBetFormValues>({
    resolver: zodResolver(schema) as Resolver<PlaceAuctionBetFormValues>,
    defaultValues: { price: defaultPrice },
    mode: 'onSubmit',
  });

  useEffect(
    function initializeBetFormEffect() {
      form.reset({ price: defaultPrice });
    },
    [defaultPrice, form],
  );

  return form;
}
