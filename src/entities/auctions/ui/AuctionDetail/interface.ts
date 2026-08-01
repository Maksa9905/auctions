import type { ReactNode } from 'react';

import type { AuctionShowResponse } from '@/shared/api';

export interface AuctionDetailProps {
  auction: AuctionShowResponse;
  auctionUuid: string;
  betForm?: ReactNode;
}
