import type { EAuctionsListTableViewType } from '@/entities/auctions';

export interface AuctionsViewToggleButtonProps {
  view: EAuctionsListTableViewType;
  onChange: (view: EAuctionsListTableViewType) => void;
}
