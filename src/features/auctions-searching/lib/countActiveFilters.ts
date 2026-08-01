import dayjs from 'dayjs';

import { auctionsFiltersDefaultValues } from '../model/defaultValues';
import type { AuctionsFiltersFormValues } from '../model/types';

function isFilterActive(
  key: keyof AuctionsFiltersFormValues,
  value: AuctionsFiltersFormValues[keyof AuctionsFiltersFormValues],
) {
  const defaultValue = auctionsFiltersDefaultValues[key];

  if (dayjs.isDayjs(value)) {
    return value.isValid();
  }

  if (typeof value === 'string') {
    return value.trim() !== '';
  }

  if (typeof value === 'boolean') {
    return value !== defaultValue;
  }

  return value != null;
}

export function countActiveFilters(values: AuctionsFiltersFormValues) {
  return (Object.keys(auctionsFiltersDefaultValues) as (keyof AuctionsFiltersFormValues)[]).filter(
    (key) => isFilterActive(key, values[key]),
  ).length;
}
