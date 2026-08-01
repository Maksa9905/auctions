import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useLoadMoreOnScroll } from './useLoadMoreOnScroll';

describe('useLoadMoreOnScroll', () => {
  it('вызывает onLoadMore у порога', () => {
    const onLoadMore = vi.fn();

    renderHook(() =>
      useLoadMoreOnScroll({
        lastVisibleIndex: 16,
        itemsCount: 20,
        hasMore: true,
        isLoadingMore: false,
        onLoadMore,
        threshold: 5,
      }),
    );

    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('не вызывает onLoadMore далеко от конца', () => {
    const onLoadMore = vi.fn();

    renderHook(() =>
      useLoadMoreOnScroll({
        lastVisibleIndex: 5,
        itemsCount: 20,
        hasMore: true,
        isLoadingMore: false,
        onLoadMore,
        threshold: 5,
      }),
    );

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('не вызывает при hasMore=false / isLoadingMore / без callback', () => {
    const onLoadMore = vi.fn();

    renderHook(() =>
      useLoadMoreOnScroll({
        lastVisibleIndex: 19,
        itemsCount: 20,
        hasMore: false,
        isLoadingMore: false,
        onLoadMore,
      }),
    );
    expect(onLoadMore).not.toHaveBeenCalled();

    renderHook(() =>
      useLoadMoreOnScroll({
        lastVisibleIndex: 19,
        itemsCount: 20,
        hasMore: true,
        isLoadingMore: true,
        onLoadMore,
      }),
    );
    expect(onLoadMore).not.toHaveBeenCalled();

    renderHook(() =>
      useLoadMoreOnScroll({
        lastVisibleIndex: 19,
        itemsCount: 20,
        hasMore: true,
        isLoadingMore: false,
      }),
    );
  });
});
