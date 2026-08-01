import type { AuctionShowMain, AuctionShowTrading, RoutePoint } from '@/shared/api';

export interface AuctionDetailHeaderProps {
  main: AuctionShowMain;
  trading: AuctionShowTrading;
  routePoints: RoutePoint[];
}
