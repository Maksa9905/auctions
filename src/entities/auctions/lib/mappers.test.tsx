import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { beforeAll, describe, expect, it } from 'vitest';

import { ensureTestI18n } from '@/test/i18n';

import { useGetAuctionMappers } from './mappers';

describe('useGetAuctionMappers', () => {
  let wrapper: ({ children }: { children: ReactNode }) => ReactNode;

  beforeAll(async () => {
    const i18n = await ensureTestI18n();
    wrapper = ({ children }) => <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
  });

  it('подставляет fallbacks и bettedByMe', () => {
    const { result } = renderHook(() => useGetAuctionMappers(), { wrapper });

    const mapped = result.current.mapAuctionItem({
      main: { order_uid: 'uid-1' },
      trading: {
        your: { bet: true },
      },
    });

    expect(mapped.id).toBe('uid-1');
    expect(mapped.cargoNumber).toBe('Не указано');
    expect(mapped.bettedByMe).toBe(true);
    expect(mapped.route.load.city).toBe('Не указано');
  });
});
