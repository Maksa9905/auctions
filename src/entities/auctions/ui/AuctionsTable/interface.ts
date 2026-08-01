import type { AuctionsListItem } from '../../model/types';

export interface AuctionsTableProps {
  data: AuctionsListItem[];
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
  onClickItem?: (id: string) => void;
  onHoverItem?: (id: string) => void;
}

export interface AuctionsTableRowProps {
  item: AuctionsListItem;
  index: number;
  onClick?: (id: string) => void;
  onHover?: (id: string) => void;
}
