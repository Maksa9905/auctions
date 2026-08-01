import type { AuctionListItem } from '../../src/shared/api/generated/model/auctionListItem';
import type { AuctionListRequest } from '../../src/shared/api/generated/model/auctionListRequest';
import type { AuctionListResponseBase } from '../../src/shared/api/generated/model/auctionListResponseBase';
import type { AuctionShowResponse } from '../../src/shared/api/generated/model/auctionShowResponse';
import type { BetItem } from '../../src/shared/api/generated/model/betItem';
import type { BetListResponse } from '../../src/shared/api/generated/model/betListResponse';
import type { SetBetRequest } from '../../src/shared/api/generated/model/setBetRequest';

export type {
  AuctionListItem,
  AuctionListRequest,
  AuctionListResponseBase,
  AuctionShowResponse,
  BetItem,
  BetListResponse,
  SetBetRequest,
};

export type MockAuctionRecord = {
  uuid: string;
  listItem: AuctionListItem;
  details: AuctionShowResponse;
  bets: BetItem[];
};

export type AuctionsStoreState = {
  auctions: MockAuctionRecord[];
  nextBetId: number;
};
