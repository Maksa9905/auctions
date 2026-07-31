import type { AuctionsListItem } from '../../model/types';

export interface AuctionsTableProps {
  data: AuctionsListItem[];
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
}

export interface AuctionsTableRowProps {
  item: AuctionsListItem;
  index: number;
}
