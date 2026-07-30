import type { AuctionsListItem } from '../../model/types';

export interface AuctionsTableProps {
  data: AuctionsListItem[];
}

export interface AuctionsTableRowProps {
  item: AuctionsListItem;
  index: number;
}
