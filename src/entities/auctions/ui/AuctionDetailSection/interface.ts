import type { ReactNode } from 'react';

export interface AuctionDetailSectionProps {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}
