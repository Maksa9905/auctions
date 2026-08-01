import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/button';
import FormNumberField from '@/shared/ui/FormNumberField';

import { usePlaceAuctionBetMutation } from '../../api/api';
import { usePlaceAuctionBetForm } from '../../lib/usePlaceAuctionBetForm';
import PlaceAuctionBetFormHints from '../PlaceAuctionBetFormHints';

import type { PlaceAuctionBetFormProps } from './interface';

export default function PlaceAuctionBetForm({
  auctionUuid,
  canSetBet,
  constraints = {},
}: PlaceAuctionBetFormProps) {
  const { t } = useTranslation('auctions');
  const form = usePlaceAuctionBetForm(constraints);
  const mutation = usePlaceAuctionBetMutation(auctionUuid);

  if (!canSetBet) {
    return (
      <form className="mt-4 flex flex-col gap-2">
        <p className="text-xs text-muted-foreground">{t('placeBet.bettingClosed')}</p>
      </form>
    );
  }

  return (
    <form
      className="mt-4 flex flex-col gap-2"
      onSubmit={form.handleSubmit((values) => {
        mutation.mutate({ price: Number(values.price) });
      })}
    >
      <FormNumberField
        control={form.control}
        name="price"
        label={t('placeBet.label')}
        input={{
          disabled: mutation.isPending,
          placeholder: constraints.available != null ? String(constraints.available) : undefined,
        }}
      />

      <PlaceAuctionBetFormHints constraints={constraints} />

      <Button type="submit" disabled={mutation.isPending}>
        {t('placeBet.submit')}
      </Button>
    </form>
  );
}
