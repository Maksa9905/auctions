import dayjs, { type Dayjs } from 'dayjs';
import { z } from 'zod';

export const DATE_FORMAT = 'DD.MM.YYYY';

export function isValidDayjs(value: unknown): value is Dayjs {
  return dayjs.isDayjs(value) && value.isValid();
}

export const zodDate = (message: string) =>
  z.custom<Dayjs | null>((value) => value == null || isValidDayjs(value), { message });
