import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { auctionsDb, getAuctionsStoreState, MOCK_AUCTION_UUIDS } from '@/shared/api';
import { renderWithProviders } from '@/test/render';

import AuctionDetailBets from './AuctionDetailBets';

describe('AuctionDetailBets', () => {
  beforeEach(() => {
    auctionsDb.reset();
  });

  it('показывает hidden state при hideBetsHistory', async () => {
    await renderWithProviders(
      <AuctionDetailBets auctionUuid={MOCK_AUCTION_UUIDS.moscowSpb} hideBetsHistory />,
    );

    expect(screen.getByText('История ставок скрыта организатором')).toBeInTheDocument();
  });

  it('показывает empty state без ставок', async () => {
    await renderWithProviders(<AuctionDetailBets auctionUuid={MOCK_AUCTION_UUIDS.moscowSpb} />);

    await waitFor(() => {
      expect(screen.getByText('Ставок пока нет')).toBeInTheDocument();
    });
  });

  it('переключает VAT и ставит отменённые ставки вниз', async () => {
    const user = userEvent.setup();
    auctionsDb.setBet(MOCK_AUCTION_UUIDS.moscowSpb, { price: 119_000 });

    const auction = getAuctionsStoreState().auctions.find(
      (item) => item.uuid === MOCK_AUCTION_UUIDS.moscowSpb,
    );
    auction?.bets.push({
      id: 9999,
      created_at: new Date().toISOString(),
      auction_id: 101,
      organization_id: 300,
      organization_name: 'ООО Отменённый',
      price_with_vat: 118_000,
      price_no_vat: 98_333,
      is_rejected: true,
      cancel_reason: 'Отклонено',
      place: null,
      is_win: false,
    });

    await renderWithProviders(
      <AuctionDetailBets auctionUuid={MOCK_AUCTION_UUIDS.moscowSpb} currentOrganizationId={201} />,
    );

    await waitFor(() => {
      expect(screen.getByText('ООО Перевозчик')).toBeInTheDocument();
    });

    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('ООО Перевозчик');
    expect(items[1]).toHaveTextContent('ООО Отменённый');
    expect(items[1]).toHaveTextContent('Отменена');

    expect(items[0]).toHaveTextContent('119');
    await user.click(screen.getByRole('button', { name: 'Без НДС' }));
    expect(items[0]).toHaveTextContent(/99\s?167|99167/);
  });
});
