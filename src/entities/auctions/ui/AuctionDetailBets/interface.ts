import type { BetItem } from '@/shared/api';

export interface AuctionDetailBetsProps {
  auctionUuid: string;
  hideBetsHistory?: boolean;
  hidePlaces?: boolean;
  currentOrganizationId?: number | null;
}

export interface AuctionDetailBetRowProps {
  bet: BetItem;
  withVat: boolean;
  hidePlaces?: boolean;
  isMine: boolean;
  winnerLabel: string;
  cancelledLabel: string;
  placeLabel: string;
}
