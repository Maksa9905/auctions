import dayjs from 'dayjs';
import { describe, expect, it } from 'vitest';

import { AuctionStatus, AuctionType, TradingStatus } from '@/shared/api';

import { mapFiltersToParams } from './mapFiltersToParams';

const emptyFilters = {
  cargoNum: '',
  auctionStatuses: null as AuctionStatus | null,
  tradingStatuses: null as TradingStatus | null,
  auctionType: null as AuctionType | null,
  loadCity: null as string | null,
  unloadCity: null as string | null,
  loadDateFrom: null as dayjs.Dayjs | null,
  loadDateTo: null as dayjs.Dayjs | null,
  isAvailable: false,
  isBigger: false,
  priceFrom: '',
  priceTo: '',
};

describe('mapFiltersToParams', () => {
  it('маппит статусы в коды через AUCTION_STATUS_CODES', () => {
    const params = mapFiltersToParams({
      ...emptyFilters,
      auctionStatuses: AuctionStatus.Auction,
    });

    expect(params.statuses).toEqual([2]);
  });

  it('маппит даты в start/end of day', () => {
    const from = dayjs('2026-07-15');
    const to = dayjs('2026-07-20');

    const params = mapFiltersToParams({
      ...emptyFilters,
      loadDateFrom: from,
      loadDateTo: to,
    });

    expect(params.load_date_from).toBe(from.startOf('day').toISOString());
    expect(params.load_date_to).toBe(to.endOf('day').toISOString());
  });

  it('тримит строки и не отправляет пустые / null значения', () => {
    const params = mapFiltersToParams({
      ...emptyFilters,
      cargoNum: '  A-1001  ',
      loadCity: '  ',
      unloadCity: null,
      priceFrom: '',
      priceTo: '90000',
    });

    expect(params.cargo_num).toBe('A-1001');
    expect(params.load_city).toBeUndefined();
    expect(params.unload_city).toBeUndefined();
    expect(params.current_price_from).toBeUndefined();
    expect(params.current_price_to).toBe(90_000);
    expect(params.is_available).toBeUndefined();
    expect(params.statuses).toBeUndefined();
    expect(params.status).toBeUndefined();
  });

  it('игнорирует Unknown auction type', () => {
    const params = mapFiltersToParams({
      ...emptyFilters,
      auctionType: AuctionType.Unknown,
    });

    expect(params.auc_type).toBeUndefined();
  });

  it('передаёт trading status и auction type', () => {
    const params = mapFiltersToParams({
      ...emptyFilters,
      tradingStatuses: TradingStatus.Leading,
      auctionType: AuctionType.Down,
      isAvailable: true,
    });

    expect(params.status).toEqual([TradingStatus.Leading]);
    expect(params.auc_type).toEqual([AuctionType.Down]);
    expect(params.is_available).toBe(true);
  });
});
