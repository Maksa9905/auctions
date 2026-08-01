import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/test/render';

import AuctionDetailCargo from './AuctionDetailCargo';

const cargo = {
  body_type: 'тент',
  truck_count: 2,
  distance: 700,
  price: '120000',
};

describe('AuctionDetailCargo', () => {
  it('скрывает цену груза при hideCargoPrice', async () => {
    await renderWithProviders(<AuctionDetailCargo cargo={cargo} hideCargoPrice />);

    expect(screen.getByText('тент')).toBeInTheDocument();
    expect(screen.queryByText('Цена груза')).not.toBeInTheDocument();
  });

  it('показывает цену без hideCargoPrice', async () => {
    await renderWithProviders(<AuctionDetailCargo cargo={cargo} />);

    expect(screen.getByText('Цена груза')).toBeInTheDocument();
    expect(screen.getByText(/120/)).toBeInTheDocument();
  });
});
