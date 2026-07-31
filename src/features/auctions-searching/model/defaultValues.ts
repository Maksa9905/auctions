import type { AuctionsFiltersFormValues } from './types';

export const auctionsFiltersDefaultValues: AuctionsFiltersFormValues = {
  cargoNum: '',
  auctionStatuses: null,
  tradingStatuses: null,
  auctionType: null,
  loadCity: null,
  unloadCity: null,
  loadDateFrom: null,
  loadDateTo: null,
  isAvailable: false,
  isBigger: false,
  priceFrom: '',
  priceTo: '',
};
