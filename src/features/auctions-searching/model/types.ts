import type { Dayjs } from 'dayjs';

import type { AuctionStatus, AuctionType, TradingStatus } from '@/shared/api';

export interface AuctionsFiltersFormValues {
  cargoNum: string;
  auctionStatuses: AuctionStatus | null;
  tradingStatuses: TradingStatus | null;
  auctionType: AuctionType | null;
  loadCity: string | null;
  unloadCity: string | null;
  loadDateFrom: Dayjs | null;
  loadDateTo: Dayjs | null;
  isAvailable: boolean;
  isBigger: boolean;
  priceFrom: string;
  priceTo: string;
}
