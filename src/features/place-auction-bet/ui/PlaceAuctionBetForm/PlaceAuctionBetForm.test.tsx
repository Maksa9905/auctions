import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/render';

import PlaceAuctionBetForm from './PlaceAuctionBetForm';

const mutate = vi.fn();

vi.mock('../../api/api', () => ({
  usePlaceAuctionBetMutation: () => ({
    mutate,
    isPending: false,
  }),
}));

describe('PlaceAuctionBetForm', () => {
  beforeEach(() => {
    mutate.mockReset();
  });

  it('при canSetBet=false не показывает submit', async () => {
    await renderWithProviders(
      <PlaceAuctionBetForm auctionUuid="uuid-1" canSetBet={false} />,
    );

    expect(screen.getByText('Ставки на этот аукцион закрыты')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Поставить' })).not.toBeInTheDocument();
  });

  it('валидная отправка вызывает mutation', async () => {
    const user = userEvent.setup();

    await renderWithProviders(
      <PlaceAuctionBetForm
        auctionUuid="uuid-1"
        canSetBet
        constraints={{ available: 119_000, min: 50_000, max: 200_000, current: 120_000, step: 1000 }}
      />,
    );

    const submit = screen.getByRole('button', { name: 'Поставить' });
    await user.click(submit);

    await waitFor(() => {
      expect(mutate).toHaveBeenCalledWith({ price: 119_000 });
    });
  });
});
