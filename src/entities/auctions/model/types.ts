export interface RouteItem {
  city: string;
  address: string;
  date: string;
}

export interface Cargo {
  name: string;
  weight: string;
  volume: string;
  bodyType: string;
}

export interface AuctionsListItem {
  cargoNumber: string;
  auctionType: string;
  auctionStatus: string;
  tradingStatus: string;
  route: {
    load: RouteItem;
    unload: RouteItem;
  };
  cargo: Cargo;
  price: {
    pricePerKm: string;
    currentPrice: string;
  };
  bettedByMe: boolean;
}

export enum ECity {
  MSK = 'Москва',
  EKB = 'Екатеринбург',
  OMSK = 'Омск',
  SPB = 'Санкт-Петербург',
}
