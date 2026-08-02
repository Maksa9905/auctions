import dayjs from 'dayjs';
import { describe, expect, it } from 'vitest';

import { AuctionStatus } from '@/shared/api';

import { auctionsFiltersDefaultValues } from '../model/defaultValues';

import { countActiveFilters } from './countActiveFilters';

describe('countActiveFilters', () => {
  it('возвращает 0 для defaults', () => {
    expect(countActiveFilters(auctionsFiltersDefaultValues)).toBe(0);
  });

  it('считает заполненные строки, даты и флаги', () => {
    expect(
      countActiveFilters({
        ...auctionsFiltersDefaultValues,
        cargoNum: 'A-1',
        auctionStatuses: AuctionStatus.Auction,
        loadDateFrom: dayjs('2026-07-01'),
        isAvailable: true,
        priceFrom: '1000',
      }),
    ).toBe(5);
  });

  it('не считает пробельные строки и невалидные даты', () => {
    expect(
      countActiveFilters({
        ...auctionsFiltersDefaultValues,
        cargoNum: '   ',
        loadCity: '  ',
        loadDateFrom: dayjs('invalid'),
      }),
    ).toBe(0);
  });
});
