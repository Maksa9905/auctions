import { AuctionListItemTradingStatus } from '../../src/shared/api/generated/model/auctionListItemTradingStatus';
import { AuctionListItemTradingStatusMobile } from '../../src/shared/api/generated/model/auctionListItemTradingStatusMobile';
import { AuctionStatus } from '../../src/shared/api/generated/model/auctionStatus';
import { TradingStatus } from '../../src/shared/api/generated/model/tradingStatus';

import { createInitialAuctions } from './fixtures';
import type {
  AuctionListRequest,
  AuctionListResponseBase,
  AuctionShowResponse,
  AuctionsStoreState,
  BetItem,
  BetListResponse,
  MockAuctionRecord,
  SetBetRequest,
} from './types';

const CURRENT_USER = {
  subscriberId: 201,
  organizationId: 201,
  organizationInn: '5001112233',
  organizationName: 'ООО Перевозчик',
  contactName: 'Алексей Моков',
  contactPhone: '+79007654321',
} as const;

type PersistFn = () => void;

function createDefaultState(): AuctionsStoreState {
  return {
    auctions: createInitialAuctions(),
    nextBetId: 1000,
  };
}

let state: AuctionsStoreState = createDefaultState();
let onPersist: PersistFn | undefined;

export function initAuctionsStore(nextState: AuctionsStoreState, persist?: PersistFn) {
  state = nextState;
  onPersist = persist;
}

export function getAuctionsStoreState(): AuctionsStoreState {
  return state;
}

function persist() {
  onPersist?.();
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

function findAuction(uuid: string): MockAuctionRecord | undefined {
  return state.auctions.find((auction) => auction.uuid === uuid);
}

function recalculatePlaces(bets: BetItem[]): void {
  const active = bets
    .filter((bet) => !bet.is_rejected && !bet.cancel_reason)
    .sort(
      (a, b) =>
        (a.price_with_vat ?? Number.POSITIVE_INFINITY) -
        (b.price_with_vat ?? Number.POSITIVE_INFINITY),
    );

  for (const bet of bets) {
    bet.place = null;
    bet.is_win = false;
  }

  active.forEach((bet, index) => {
    bet.place = index + 1;
    bet.is_win = index === 0;
  });
}

function syncAuctionPrices(auction: MockAuctionRecord): void {
  const leading = [...auction.bets]
    .filter((bet) => !bet.is_rejected && !bet.cancel_reason)
    .sort(
      (a, b) =>
        (a.price_with_vat ?? Number.POSITIVE_INFINITY) -
        (b.price_with_vat ?? Number.POSITIVE_INFINITY),
    )[0];

  const current = leading?.price_with_vat;
  const currentNoVat = leading?.price_no_vat;

  if (current != null && auction.listItem.trading?.price) {
    auction.listItem.trading.price.current = current;
    auction.listItem.trading.price.current_no_vat = currentNoVat ?? Math.round(current / 1.2);
  }

  if (current != null && auction.details.trading.price) {
    const step = auction.details.trading.price.step ?? 1000;
    auction.details.trading.price.current = current;
    auction.details.trading.price.current_no_vat = currentNoVat ?? Math.round(current / 1.2);
    auction.details.trading.price.available = current - step;
    auction.details.trading.price.available_no_vat = Math.round((current - step) / 1.2);
    auction.details.trading.price.price_per_km =
      Math.round((current / (auction.details.cargo.distance || 700)) * 100) / 100;
  }

  const userBets = auction.bets.filter(
    (bet) =>
      bet.organization_id === CURRENT_USER.organizationId && !bet.is_rejected && !bet.cancel_reason,
  );
  const lastUserBet = [...userBets].sort(
    (a, b) => new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime(),
  )[0];

  const isLeading = leading?.organization_id === CURRENT_USER.organizationId;
  const hasBet = userBets.length > 0;

  if (auction.listItem.trading) {
    auction.listItem.trading.is_bidder = hasBet;
    auction.listItem.trading.status_mobile = hasBet
      ? isLeading
        ? AuctionListItemTradingStatusMobile.Leading
        : AuctionListItemTradingStatusMobile.Losing
      : AuctionListItemTradingStatusMobile.NotParticipating;
    auction.listItem.trading.your = {
      bet: hasBet,
      last_bet: lastUserBet?.price_with_vat ?? null,
    };
  }

  auction.details.trading.is_bidder = hasBet;
  auction.details.trading.status_mobile = hasBet
    ? isLeading
      ? TradingStatus.Leading
      : TradingStatus.Losing
    : TradingStatus.NotParticipating;
  auction.details.trading.your = {
    bet: hasBet,
    last_bet: lastUserBet?.price_no_vat ?? null,
    last_bet_with_vat: lastUserBet?.price_with_vat ?? null,
    win: Boolean(lastUserBet?.is_win),
  };
}

export const auctionsDb = {
  reset() {
    state = createDefaultState();
    persist();
  },

  listAuctions(request: AuctionListRequest = {}): AuctionListResponseBase {
    const page = Math.max(1, request.page ?? 1);
    const perPage = Math.max(1, request.per_page ?? 10);

    let items = state.auctions.map((auction) => clone(auction.listItem));

    if (request.cargo_num) {
      const query = request.cargo_num.toLowerCase();
      items = items.filter((item) => item.main?.cargo_num?.toLowerCase().includes(query));
    }

    if (request.auction_ids?.length) {
      const ids = new Set(request.auction_ids);
      items = items.filter((item) => item.main?.id != null && ids.has(item.main.id));
    }

    if (request.statuses?.length) {
      const statusByCode: Record<number, string> = {
        1: AuctionListItemTradingStatus.Planning,
        2: AuctionListItemTradingStatus.Auction,
        3: AuctionListItemTradingStatus.DeterminateWinner,
        4: AuctionListItemTradingStatus.WaitDeal,
        5: AuctionListItemTradingStatus.InProgress,
        6: AuctionListItemTradingStatus.Finished,
        7: AuctionListItemTradingStatus.Stopped,
      };
      const allowed = new Set(request.statuses.map((code) => statusByCode[code]).filter(Boolean));
      items = items.filter(
        (item) => item.trading?.status != null && allowed.has(item.trading.status),
      );
    }

    if (request.is_available != null) {
      items = items.filter((item) => Boolean(item.trading?.is_available) === request.is_available);
    }

    if (request.is_bidder != null) {
      items = items.filter((item) => Boolean(item.trading?.is_bidder) === request.is_bidder);
    }

    if (request.customer) {
      const query = request.customer.toLowerCase();
      items = items.filter(
        (item) =>
          item.organizer?.organization_name?.toLowerCase().includes(query) ||
          item.organizer?.organization_inn?.includes(query),
      );
    }

    const total = items.length;
    const start = (page - 1) * perPage;
    const pageItems = items.slice(start, start + perPage);
    const lastPage = Math.max(1, Math.ceil(total / perPage));

    return {
      data: pageItems,
      meta: {
        current_page: page,
        from: total === 0 ? 0 : start + 1,
        last_page: lastPage,
        per_page: perPage,
        to: total === 0 ? 0 : start + pageItems.length,
        total,
      },
    };
  },

  getAuction(uuid: string): AuctionShowResponse | null {
    const auction = findAuction(uuid);
    return auction ? clone(auction.details) : null;
  },

  listBets(uuid: string, all = false): BetListResponse | null {
    const auction = findAuction(uuid);
    if (!auction) return null;

    const bets = all
      ? auction.bets
      : auction.bets.filter((bet) => !bet.is_rejected && !bet.cancel_reason);

    return { bets: clone(bets) };
  },

  setBet(
    uuid: string,
    request: SetBetRequest,
  ): { ok: true } | { ok: false; status: 404 | 422; body: unknown } {
    const auction = findAuction(uuid);

    if (!auction) {
      return {
        ok: false,
        status: 404,
        body: {
          type: 'https://httpstatuses.com/404',
          title: 'Not Found',
          status: 404,
          detail: `Auction ${uuid} not found`,
        },
      };
    }

    if (
      !auction.details.trading.can_set_bet ||
      auction.details.trading.status !== AuctionStatus.Auction
    ) {
      return {
        ok: false,
        status: 422,
        body: {
          type: 'https://httpstatuses.com/422',
          title: 'Validation Failed',
          status: 422,
          detail: 'Ставки на этот аукцион закрыты',
          errors: [{ field: 'auctionUuid', message: 'Bidding is not available' }],
        },
      };
    }

    if (!(request.price > 0)) {
      return {
        ok: false,
        status: 422,
        body: {
          type: 'https://httpstatuses.com/422',
          title: 'Validation Failed',
          status: 422,
          detail: 'Цена ставки должна быть больше 0',
          errors: [{ field: 'price', message: 'Must be greater than 0' }],
        },
      };
    }

    const step = auction.details.trading.price?.step ?? 1000;
    const current = auction.details.trading.price?.current ?? Number.POSITIVE_INFINITY;
    const min = auction.details.trading.price?.min ?? 0;

    if (request.price >= current) {
      return {
        ok: false,
        status: 422,
        body: {
          type: 'https://httpstatuses.com/422',
          title: 'Validation Failed',
          status: 422,
          detail: `Ставка должна быть ниже текущей цены (${current})`,
          errors: [{ field: 'price', message: 'Must be lower than current price' }],
        },
      };
    }

    if (request.price < min) {
      return {
        ok: false,
        status: 422,
        body: {
          type: 'https://httpstatuses.com/422',
          title: 'Validation Failed',
          status: 422,
          detail: `Ставка не может быть ниже минимума (${min})`,
          errors: [{ field: 'price', message: 'Below minimum' }],
        },
      };
    }

    if ((current - request.price) % step !== 0) {
      return {
        ok: false,
        status: 422,
        body: {
          type: 'https://httpstatuses.com/422',
          title: 'Validation Failed',
          status: 422,
          detail: `Шаг ставки должен быть кратен ${step}`,
          errors: [{ field: 'price', message: `Step is ${step}` }],
        },
      };
    }

    const bet: BetItem = {
      id: state.nextBetId++,
      created_at: new Date().toISOString(),
      auction_id: auction.details.main.id,
      subscriber_id: CURRENT_USER.subscriberId,
      contact_name: CURRENT_USER.contactName,
      contact_phone: CURRENT_USER.contactPhone,
      price_with_vat: request.price,
      price_no_vat: Math.round(request.price / 1.2),
      organization_id: CURRENT_USER.organizationId,
      organization_inn: CURRENT_USER.organizationInn,
      organization_name: CURRENT_USER.organizationName,
      transporter_comment: null,
      is_rejected: false,
      is_counter: false,
      place: null,
      is_win: false,
      run_number: 0,
      cancel_reason: '',
      price_info: {
        price_with_vat: request.price,
        price_no_vat: Math.round(request.price / 1.2),
        payment_type: 'with_vat',
        vat_rate: '20',
      },
    };

    auction.bets.push(bet);
    recalculatePlaces(auction.bets);
    syncAuctionPrices(auction);
    persist();

    return { ok: true };
  },
};
