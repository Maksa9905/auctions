import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { beforeAll, describe, expect, it } from 'vitest';

import { ensureTestI18n } from '@/test/i18n';

import { useAuctionBetFormHints } from './useAuctionBetFormHints';

describe('useAuctionBetFormHints', () => {
  let wrapper: ({ children }: { children: ReactNode }) => ReactNode;

  beforeAll(async () => {
    const i18n = await ensureTestI18n();
    wrapper = ({ children }) => <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
  });

  it('собирает подсказки по constraints', () => {
    const { result } = renderHook(
      () =>
        useAuctionBetFormHints({
          available: 119_000,
          min: 50_000,
          max: 200_000,
          step: 1000,
        }),
      { wrapper },
    );

    expect(result.current).toHaveLength(3);
    expect(result.current[0]).toContain('Доступно');
    expect(result.current[1]).toContain('Диапазон');
    expect(result.current[2]).toContain('Шаг');
  });

  it('возвращает пустой массив без constraints', () => {
    const { result } = renderHook(() => useAuctionBetFormHints({}), { wrapper });
    expect(result.current).toEqual([]);
  });
});
