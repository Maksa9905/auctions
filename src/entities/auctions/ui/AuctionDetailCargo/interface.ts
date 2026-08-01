import type { AuctionShowCargo } from '@/shared/api';

export interface AuctionDetailCargoProps {
  cargo: AuctionShowCargo;
  hideCargoPrice?: boolean;
}
