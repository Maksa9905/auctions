import { AuctionStatus } from '@/shared/api';

export const AUCTION_STATUS_CODES = {
  [AuctionStatus.Planning]: 1,
  [AuctionStatus.Auction]: 2,
  [AuctionStatus.DeterminateWinner]: 3,
  [AuctionStatus.WaitDeal]: 4,
  [AuctionStatus.InProgress]: 5,
  [AuctionStatus.Finished]: 6,
  [AuctionStatus.Stopped]: 7,
  [AuctionStatus.Canceled]: 8,
} as const satisfies Partial<Record<AuctionStatus, number>>;
