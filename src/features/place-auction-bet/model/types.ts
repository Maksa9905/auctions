import type { AuctionShowTradingPrice } from '@/shared/api';

export type PlaceAuctionBetFormValues = {
  price: string;
};

export type PlaceAuctionBetConstraints = Pick<
  AuctionShowTradingPrice,
  'min' | 'max' | 'step' | 'current' | 'available'
>;
