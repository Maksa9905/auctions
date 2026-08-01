import AuctionDetailBets from '../AuctionDetailBets';
import AuctionDetailCargo from '../AuctionDetailCargo';
import AuctionDetailHeader from '../AuctionDetailHeader';
import AuctionDetailOrganizer from '../AuctionDetailOrganizer';
import AuctionDetailPayment from '../AuctionDetailPayment';
import AuctionDetailRoute from '../AuctionDetailRoute';
import AuctionDetailTradingPanel from '../AuctionDetailTradingPanel';
import AuctionDetailTradingParams from '../AuctionDetailTradingParams';

import type { AuctionDetailProps } from './interface';

export default function AuctionDetail({ auction, auctionUuid, betForm }: AuctionDetailProps) {
  const { main, organizer, contacts, cargo, trading, payment, routes: routePoints = [] } = auction;

  const hideAddresses = Boolean(trading.hide_points_address_and_contacts);
  const hideCargoPrice = Boolean(trading.no_view_cargo_price);
  const hideBetsHistory = Boolean(auction.hide_bets_history ?? trading.hide_bets_history);

  return (
    <div className="flex flex-col gap-4">
      <AuctionDetailHeader main={main} trading={trading} routePoints={routePoints} />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
        <div className="flex flex-col gap-4 order-2 lg:order-1">
          <AuctionDetailRoute routePoints={routePoints} hideAddresses={hideAddresses} />
          <AuctionDetailCargo cargo={cargo} hideCargoPrice={hideCargoPrice} />
          <AuctionDetailPayment payment={payment} />
          <AuctionDetailTradingParams trading={trading} />
          <AuctionDetailOrganizer
            organizer={organizer}
            contacts={contacts}
            hideContacts={hideAddresses}
          />
        </div>

        <aside className="flex flex-col gap-4 order-1 lg:order-2 lg:sticky lg:top-6">
          <AuctionDetailTradingPanel trading={trading} betForm={betForm} />
          <AuctionDetailBets
            auctionUuid={auctionUuid}
            hideBetsHistory={hideBetsHistory}
            hidePlaces={trading.hide_places}
            currentOrganizationId={201}
          />
        </aside>
      </div>
    </div>
  );
}
