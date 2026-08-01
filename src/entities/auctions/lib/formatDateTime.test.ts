import { describe, expect, it } from 'vitest';

import { formatDateTime } from './formatDateTime';

describe('formatDateTime', () => {
  it('форматирует ISO дату', () => {
    expect(formatDateTime('2026-07-15T10:30:00.000Z')).toMatch(/\d{2}\.\d{2}\.2026 \d{2}:\d{2}/);
  });

  it('возвращает null для пустого значения', () => {
    expect(formatDateTime(null)).toBeNull();
    expect(formatDateTime(undefined)).toBeNull();
  });
});
