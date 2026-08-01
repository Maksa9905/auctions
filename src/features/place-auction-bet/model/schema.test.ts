import { describe, expect, it } from 'vitest';

import { createMockT } from '@/test/i18n';

import { createPlaceAuctionBetSchema } from './schema';

const t = createMockT();

describe('createPlaceAuctionBetSchema', () => {
  it('отклоняет пустую цену', () => {
    const schema = createPlaceAuctionBetSchema(t);
    const result = schema.safeParse({ price: '' });
    expect(result.success).toBe(false);
  });

  it('отклоняет нечисловую цену', () => {
    const schema = createPlaceAuctionBetSchema(t);
    const result = schema.safeParse({ price: 'abc' });
    expect(result.success).toBe(false);
  });

  it('отклоняет цену <= 0', () => {
    const schema = createPlaceAuctionBetSchema(t);
    expect(schema.safeParse({ price: '0' }).success).toBe(false);
    expect(schema.safeParse({ price: '-10' }).success).toBe(false);
  });

  it('проверяет min / max из DTO', () => {
    const schema = createPlaceAuctionBetSchema(t, { min: 50_000, max: 100_000 });
    expect(schema.safeParse({ price: '49999' }).success).toBe(false);
    expect(schema.safeParse({ price: '100001' }).success).toBe(false);
    expect(schema.safeParse({ price: '75000' }).success).toBe(true);
  });

  it('проверяет step относительно current', () => {
    const schema = createPlaceAuctionBetSchema(t, { current: 120_000, step: 1000 });
    expect(schema.safeParse({ price: '119500' }).success).toBe(false);
    expect(schema.safeParse({ price: '119000' }).success).toBe(true);
  });

  it('пропускает валидную цену', () => {
    const schema = createPlaceAuctionBetSchema(t, {
      min: 50_000,
      max: 200_000,
      current: 120_000,
      step: 1000,
    });
    expect(schema.safeParse({ price: ' 119000 ' }).success).toBe(true);
  });
});
