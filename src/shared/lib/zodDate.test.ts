import dayjs from 'dayjs';
import { describe, expect, it } from 'vitest';

import { isValidDayjs, zodDate } from './zodDate';

describe('zodDate', () => {
  it('принимает null и валидный dayjs', () => {
    const schema = zodDate('bad date');
    expect(schema.safeParse(null).success).toBe(true);
    expect(schema.safeParse(dayjs('2026-07-15')).success).toBe(true);
  });

  it('отклоняет невалидный dayjs', () => {
    const schema = zodDate('bad date');
    expect(schema.safeParse(dayjs('invalid')).success).toBe(false);
  });
});

describe('isValidDayjs', () => {
  it('проверяет dayjs instance', () => {
    expect(isValidDayjs(dayjs('2026-07-15'))).toBe(true);
    expect(isValidDayjs(dayjs('invalid'))).toBe(false);
    expect(isValidDayjs('2026-07-15')).toBe(false);
  });
});
