import type { AuctionsListItem } from '../../model/types';

export interface AuctionsListProps {
  data: AuctionsListItem[];
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
}
