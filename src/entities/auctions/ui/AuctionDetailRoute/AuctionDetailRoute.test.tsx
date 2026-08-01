import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { OperationType } from '@/shared/api';
import { renderWithProviders } from '@/test/render';

import AuctionDetailRoute from './AuctionDetailRoute';

const routePoints = [
  {
    row_num: 1,
    op_type: OperationType.Loading,
    start_date: '2026-07-15T10:00:00.000Z',
    end_date: '2026-07-15T10:00:00.000Z',
    location: {
      city_name: 'Москва',
      loading_address: 'Москва, склад 1',
    },
    contact: {
      name: 'Иван',
      phone: '+7900',
    },
  },
];

describe('AuctionDetailRoute', () => {
  it('скрывает адрес и контакты при hideAddresses', async () => {
    await renderWithProviders(
      <AuctionDetailRoute routePoints={routePoints} hideAddresses />,
    );

    expect(screen.getByText('Москва')).toBeInTheDocument();
    expect(screen.queryByText('Москва, склад 1')).not.toBeInTheDocument();
    expect(screen.queryByText(/Иван/)).not.toBeInTheDocument();
  });

  it('показывает адрес без hideAddresses', async () => {
    await renderWithProviders(<AuctionDetailRoute routePoints={routePoints} />);

    expect(screen.getByText('Москва, склад 1')).toBeInTheDocument();
    expect(screen.getByText(/Иван/)).toBeInTheDocument();
  });
});
