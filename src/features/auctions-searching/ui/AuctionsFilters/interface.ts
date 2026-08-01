import type { AuctionsFiltersFormValues } from '../../model/types';

export interface AuctionsFiltersProps {
  values: AuctionsFiltersFormValues;
  onSubmit: (values: AuctionsFiltersFormValues) => void;
  onReset: () => void;
}
