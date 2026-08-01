import { describe, expect, it } from 'vitest';

import type { AuctionListResponseBase } from './generated/model';
import {
  getLoadedStandardPages,
  getNextPageParam,
  LIST_AUCTIONS_PER_PAGE,
} from './useListAuctionsInfinite';

function page(dataLength: number, total: number): AuctionListResponseBase {
  return {
    data: Array.from({ length: dataLength }, (_, index) => ({
      main: { order_uid: `id-${index}` },
    })),
    meta: { total },
  };
}

describe('getLoadedStandardPages', () => {
  it('считает стандартные страницы по загруженным items', () => {
    expect(getLoadedStandardPages(undefined)).toBe(0);
    expect(getLoadedStandardPages([page(10, 100)])).toBe(1);
    expect(getLoadedStandardPages([page(20, 100)])).toBe(2);
    expect(getLoadedStandardPages([page(15, 100)])).toBe(2);
  });
});

describe('getNextPageParam', () => {
  it('возвращает undefined когда всё загружено', () => {
    const pages = [page(10, 10)];
    expect(getNextPageParam(pages[0]!, pages)).toBeUndefined();
  });

  it('возвращает следующий page/perPage', () => {
    const pages = [page(10, 25)];
    expect(getNextPageParam(pages[0]!, pages)).toEqual({
      page: 2,
      perPage: LIST_AUCTIONS_PER_PAGE,
    });
  });

  it('учитывает initial oversized первую страницу', () => {
    const pages = [page(20, 35)];
    expect(getNextPageParam(pages[0]!, pages)).toEqual({
      page: 3,
      perPage: LIST_AUCTIONS_PER_PAGE,
    });
  });
});
