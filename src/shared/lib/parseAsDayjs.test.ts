import dayjs from 'dayjs';
import { describe, expect, it } from 'vitest';

import { parseAsDayjs } from './parseAsDayjs';

describe('parseAsDayjs', () => {
  it('парсит DD.MM.YYYY', () => {
    const parsed = parseAsDayjs.parse('15.07.2026');
    expect(parsed?.isValid()).toBe(true);
    expect(parsed?.format('YYYY-MM-DD')).toBe('2026-07-15');
  });

  it('возвращает null для невалидной строки', () => {
    expect(parseAsDayjs.parse('2026-07-15')).toBeNull();
    expect(parseAsDayjs.parse('invalid')).toBeNull();
  });

  it('сериализует и сравнивает по дню', () => {
    const value = dayjs('2026-07-15');
    expect(parseAsDayjs.serialize(value)).toBe('15.07.2026');
    expect(parseAsDayjs.eq(value, dayjs('2026-07-15T23:00:00'))).toBe(true);
  });
});
