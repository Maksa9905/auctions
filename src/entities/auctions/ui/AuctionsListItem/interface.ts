import type { AuctionsListItem } from '../../model/types';

export interface AuctionsListItemProps {
  item: AuctionsListItem;
  onClick?: (id: string) => void;
  onHover?: (id: string) => void;
}
