import { describe, expect, it } from 'vitest';

import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
  it('форматирует число по ru-RU', () => {
    expect(formatPrice(120_000)).toMatch(/120/);
  });

  it('возвращает fallback для null / NaN', () => {
    expect(formatPrice(null)).toBe('—');
    expect(formatPrice(undefined)).toBe('—');
    expect(formatPrice(Number.NaN)).toBe('—');
    expect(formatPrice(null, 'n/a')).toBe('n/a');
  });
});
