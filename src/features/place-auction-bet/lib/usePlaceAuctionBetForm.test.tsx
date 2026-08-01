import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { beforeAll, describe, expect, it } from 'vitest';

import { ensureTestI18n } from '@/test/i18n';

import { usePlaceAuctionBetForm } from './usePlaceAuctionBetForm';

describe('usePlaceAuctionBetForm', () => {
  let wrapper: ({ children }: { children: ReactNode }) => ReactNode;

  beforeAll(async () => {
    const i18n = await ensureTestI18n();
    wrapper = ({ children }) => <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
  });

  it('ставит default price из available', async () => {
    const { result } = renderHook(
      () => usePlaceAuctionBetForm({ available: 119_000, current: 120_000, step: 1000 }),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.getValues('price')).toBe('119000');
    });
  });

  it('ставит current - step если available нет', async () => {
    const { result } = renderHook(
      () => usePlaceAuctionBetForm({ current: 120_000, step: 1000 }),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.getValues('price')).toBe('119000');
    });
  });
});
