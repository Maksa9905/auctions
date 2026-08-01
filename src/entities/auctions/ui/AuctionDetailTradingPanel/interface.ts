import type { ReactNode } from 'react';

import type { AuctionShowTrading } from '@/shared/api';

export interface AuctionDetailTradingPanelProps {
  trading: AuctionShowTrading;
  betForm?: ReactNode;
}
