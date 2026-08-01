import type { AuctionsListItem } from '../../model/types';

export interface AuctionsListRowProps {
  items: AuctionsListItem[];
  columns: number;
  onClickItem?: (id: string) => void;
  onHoverItem?: (id: string) => void;
}
