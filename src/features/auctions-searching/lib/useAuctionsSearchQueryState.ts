import {
  type inferParserType,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs';

import { EAuctionsListTableViewType } from '@/entities/auctions';
import { AuctionStatus, AuctionType, TradingStatus } from '@/shared/api';
import { parseAsDayjs } from '@/shared/lib';

export const auctionsFiltersQueryParsers = {
  cargoNum: parseAsString.withDefault(''),
  auctionStatuses: parseAsStringEnum<AuctionStatus>(Object.values(AuctionStatus)),
  tradingStatuses: parseAsStringEnum<TradingStatus>(Object.values(TradingStatus)),
  auctionType: parseAsStringEnum<AuctionType>(Object.values(AuctionType)),
  loadCity: parseAsString,
  unloadCity: parseAsString,
  loadDateFrom: parseAsDayjs,
  loadDateTo: parseAsDayjs,
  isAvailable: parseAsBoolean.withDefault(false),
  isBigger: parseAsBoolean.withDefault(false),
  priceFrom: parseAsString.withDefault(''),
  priceTo: parseAsString.withDefault(''),
};

export const auctionsSearchQueryParsers = {
  viewType: parseAsStringEnum<EAuctionsListTableViewType>(
    Object.values(EAuctionsListTableViewType),
  ).withDefault(EAuctionsListTableViewType.LIST),
  page: parseAsInteger.withDefault(1),
  ...auctionsFiltersQueryParsers,
};

export type AuctionsSearchQuery = inferParserType<typeof auctionsSearchQueryParsers>;
export type AuctionsFiltersQuery = inferParserType<typeof auctionsFiltersQueryParsers>;

export function useAuctionsSearchQueryState() {
  return useQueryStates(auctionsSearchQueryParsers);
}
