import dayjs from 'dayjs';
import { describe, expect, it } from 'vitest';

import { createMockT } from '@/test/i18n';

import { auctionsFiltersDefaultValues } from './defaultValues';
import { createAuctionsFiltersSchema } from './schema';

const t = createMockT();

describe('createAuctionsFiltersSchema', () => {
  it('принимает defaults', () => {
    const schema = createAuctionsFiltersSchema(t);
    expect(schema.safeParse(auctionsFiltersDefaultValues).success).toBe(true);
  });

  it('отклоняет невалидную цену', () => {
    const schema = createAuctionsFiltersSchema(t);
    expect(
      schema.safeParse({ ...auctionsFiltersDefaultValues, priceFrom: 'abc' }).success,
    ).toBe(false);
    expect(
      schema.safeParse({ ...auctionsFiltersDefaultValues, priceFrom: '-1' }).success,
    ).toBe(false);
  });

  it('принимает валидную цену', () => {
    const schema = createAuctionsFiltersSchema(t);
    expect(
      schema.safeParse({ ...auctionsFiltersDefaultValues, priceFrom: '1000' }).success,
    ).toBe(true);
  });

  it('проверяет date range', () => {
    const schema = createAuctionsFiltersSchema(t);
    const result = schema.safeParse({
      ...auctionsFiltersDefaultValues,
      loadDateFrom: dayjs('2026-07-20'),
      loadDateTo: dayjs('2026-07-10'),
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path.includes('loadDateTo'))).toBe(true);
    }
  });

  it('проверяет price range', () => {
    const schema = createAuctionsFiltersSchema(t);
    const result = schema.safeParse({
      ...auctionsFiltersDefaultValues,
      priceFrom: '2000',
      priceTo: '1000',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path.includes('priceTo'))).toBe(true);
    }
  });
});
