import type { AuctionListRequest } from '@/shared/api';

export enum EAuctionsListTableViewType {
  TABLE = 'TABLE',
  LIST = 'LIST',
}

export interface AuctionsListTableProps {
  viewType: EAuctionsListTableViewType;
  params: Omit<AuctionListRequest, 'page' | 'per_page'>;
  page: number;
  onPageChange: (page: number) => void;
  onClickItem?: (id: string) => void;
  onHoverItem?: (id: string) => void;
}
