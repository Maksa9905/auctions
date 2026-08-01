import { AUCTION_STATUS_CODES } from '@/entities/auctions';
import type {
  AuctionListRequest,
  AuctionListRequestAucTypeItem,
  AuctionListRequestStatusItem,
} from '@/shared/api';
import { AuctionType } from '@/shared/api';

import type { AuctionsFiltersQuery } from './useAuctionsSearchQueryState';

export function mapFiltersToParams(
  filters: AuctionsFiltersQuery,
): Omit<AuctionListRequest, 'page' | 'per_page'> {
  const statusCode = filters.auctionStatuses
    ? AUCTION_STATUS_CODES[filters.auctionStatuses as keyof typeof AUCTION_STATUS_CODES]
    : undefined;

  return {
    cargo_num: filters.cargoNum.trim() || undefined,
    statuses: statusCode ? [statusCode] : undefined,
    status: filters.tradingStatuses
      ? [filters.tradingStatuses as AuctionListRequestStatusItem]
      : undefined,
    auc_type:
      filters.auctionType && filters.auctionType !== AuctionType.Unknown
        ? [filters.auctionType as AuctionListRequestAucTypeItem]
        : undefined,
    load_city: filters.loadCity?.trim(),
    unload_city: filters.unloadCity?.trim(),
    load_date_from: filters.loadDateFrom?.startOf('day').toISOString(),
    load_date_to: filters.loadDateTo?.endOf('day').toISOString(),
    is_available: filters.isAvailable || undefined,
    current_price_from: filters.priceFrom ? Number(filters.priceFrom) : undefined,
    current_price_to: filters.priceTo ? Number(filters.priceTo) : undefined,
  };
}
