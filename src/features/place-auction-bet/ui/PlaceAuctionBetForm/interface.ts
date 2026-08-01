import type { PlaceAuctionBetConstraints } from '../../model/types';

export interface PlaceAuctionBetFormProps {
  auctionUuid: string;
  canSetBet: boolean;
  constraints?: PlaceAuctionBetConstraints;
}
