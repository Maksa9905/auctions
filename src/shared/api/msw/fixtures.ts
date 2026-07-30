import type { AuctionListItem } from '../generated/model/auctionListItem';
import { AuctionListItemMainAucType } from '../generated/model/auctionListItemMainAucType';
import { AuctionListItemTradingBidMeasurementType } from '../generated/model/auctionListItemTradingBidMeasurementType';
import { AuctionListItemTradingStatus } from '../generated/model/auctionListItemTradingStatus';
import { AuctionListItemTradingStatusMobile } from '../generated/model/auctionListItemTradingStatusMobile';
import type { AuctionShowResponse } from '../generated/model/auctionShowResponse';
import { AuctionStatus } from '../generated/model/auctionStatus';
import { AuctionType } from '../generated/model/auctionType';
import type { BetItem } from '../generated/model/betItem';
import { BidMeasurementType } from '../generated/model/bidMeasurementType';
import { OperationType } from '../generated/model/operationType';
import { PaymentDelayType } from '../generated/model/paymentDelayType';
import { TradingStatus } from '../generated/model/tradingStatus';

import initialAuctions from './initial-auctions.json';

export const MOCK_AUCTION_UUIDS = {
  moscowSpb: '550e8400-e29b-41d4-a716-446655440001',
  kazanSamara: '550e8400-e29b-41d4-a716-446655440002',
  finished: '550e8400-e29b-41d4-a716-446655440003',
} as const;

export type MockAuctionRecord = {
  uuid: string;
  listItem: AuctionListItem;
  details: AuctionShowResponse;
  bets: BetItem[];
};

type AuctionSeed = {
  id: number;
  uuid: string;
  cargoNum: string;
  loadCity: string;
  unloadCity: string;
  currentPrice: number;
  status: keyof typeof AuctionStatus;
  canSetBet: boolean;
  aucType?: keyof typeof AuctionType;
  cargoName?: string;
  weight?: number;
  volume?: number;
  bodyType?: string;
};

const nowIso = () => new Date().toISOString();

function createAuction({
  id,
  uuid,
  cargoNum,
  loadCity,
  unloadCity,
  currentPrice,
  status,
  canSetBet,
  aucType = 'Down',
  cargoName = 'Паллеты',
  weight = 18,
  volume = 60,
  bodyType = 'тент',
}: AuctionSeed): MockAuctionRecord {
  const createdAt = nowIso();
  const startTime = createdAt;
  const stopTime = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
  const startPrice = currentPrice + 50_000;
  const currentNoVat = Math.round(currentPrice / 1.2);
  const listStatus =
    AuctionListItemTradingStatus[status as keyof typeof AuctionListItemTradingStatus] ??
    AuctionListItemTradingStatus.Unknown;
  const listAucType =
    AuctionListItemMainAucType[aucType as keyof typeof AuctionListItemMainAucType] ??
    AuctionListItemMainAucType.Down;
  const detailAucType = AuctionType[aucType] ?? AuctionType.Down;
  const detailStatus = AuctionStatus[status] ?? AuctionStatus.Unknown;

  return {
    uuid,
    listItem: {
      main: {
        id,
        cargo_num: cargoNum,
        cargo_date: createdAt,
        auc_type: listAucType,
        order_uid: uuid,
        created_at: createdAt,
        priority_sort: id,
        is_assembly: false,
        price_per_km: Math.round((currentPrice / 700) * 100) / 100,
      },
      organizer: {
        subscriber_id: 100,
        organization_id: 14,
        organization_name: 'ООО Логистика+',
        organization_inn: '7701234567',
        organization_kpp: '770101001',
        is_hide_organization: false,
      },
      route: {
        load: {
          city: loadCity,
          address: `${loadCity}, склад 1`,
          date: createdAt,
          city_gc_id: 1,
          points_count: 1,
        },
        unload: {
          city: unloadCity,
          address: `${unloadCity}, склад 2`,
          date: stopTime,
          city_gc_id: 2,
          points_count: 1,
        },
      },
      cargo: {
        name: cargoName,
        weight,
        volume,
        body_type: bodyType,
        truck_count: 1,
        is_cargo: true,
        is_international: false,
        containered: false,
      },
      trading: {
        status: listStatus,
        status_mobile: AuctionListItemTradingStatusMobile.NotParticipating,
        start_time: startTime,
        stop_time: stopTime,
        bid_measurement_type: AuctionListItemTradingBidMeasurementType.PerRoute,
        can_set_bet: canSetBet,
        allow_counter_bets: false,
        hide_points_address_and_contacts: false,
        direction: `${loadCity} → ${unloadCity}`,
        comment: '',
        is_bidder: false,
        is_available: canSetBet,
        is_accredited: true,
        is_favorite: false,
        price: {
          start: startPrice,
          current: currentPrice,
          current_no_vat: currentNoVat,
        },
        your: {
          bet: false,
          last_bet: null,
        },
        red_bet_with_vat: false,
        red_bet_no_vat: false,
        is_last_bet_with_vat: true,
      },
      payment: {
        form: 'безнал',
        currency_code: '643',
        consignor: 'ООО Логистика+',
        consignee: 'ООО Получатель',
      },
    },
    details: {
      main: {
        id,
        cargo_num: cargoNum,
        cargo_date: createdAt,
        order_uid: uuid,
        auc_type: detailAucType,
        created_at: createdAt,
      },
      organizer: {
        subscriber_id: 100,
        subscriber_code: 'ORG-100',
        infobase_code: 'IB-1',
        organization_name: 'ООО Логистика+',
        organization_inn: '7701234567',
        organization_kpp: '770101001',
        organization_id: 14,
      },
      contacts: [
        {
          name: 'Иван Петров',
          phone: '+79001234567',
          email: 'ivan@example.com',
        },
      ],
      cargo: {
        price: String(currentPrice),
        currency: 643,
        is_international: false,
        distance: 700,
        truck_count: 1,
        body_type: bodyType,
        containered: false,
      },
      trading: {
        status: detailStatus,
        status_mobile: TradingStatus.NotParticipating,
        start_time: startTime,
        stop_time: stopTime,
        bid_measurement_type: BidMeasurementType.PerRoute,
        can_set_bet: canSetBet,
        allow_counter_bets: false,
        hide_bets_history: false,
        hide_places: false,
        no_view_cargo_price: false,
        hide_points_address_and_contacts: false,
        is_bidder: false,
        is_favorite: false,
        is_last_bet_with_vat: true,
        red_bet_with_vat: false,
        red_bet_no_vat: false,
        send_deal_before_load: false,
        chat_id: null,
        price: {
          start: startPrice,
          start_no_vat: Math.round(startPrice / 1.2),
          current: currentPrice,
          current_no_vat: currentNoVat,
          available: currentPrice - 1000,
          available_no_vat: Math.round((currentPrice - 1000) / 1.2),
          min: 50_000,
          min_no_vat: Math.round(50_000 / 1.2),
          max: startPrice,
          max_no_vat: Math.round(startPrice / 1.2),
          step: 1000,
          step_no_vat: Math.round(1000 / 1.2),
          price_per_km: Math.round((currentPrice / 700) * 100) / 100,
        },
        your: {
          bet: false,
          last_bet: null,
          last_bet_with_vat: null,
          win: false,
        },
        settings: {
          prolong_after_bet: 5,
          winner_confirm: 30,
          winner_counter_mode: 0,
          transmission_time_in: 24,
          coefficient: 1,
        },
      },
      payment: {
        condition: 'по факту',
        condition_predefined: null,
        form: 'безнал',
        delay: 14,
        delay_type: PaymentDelayType.CalendarDays,
        currency_code: '643',
        prepay: null,
      },
      assembly: {
        num: null,
        date: null,
      },
      routes: [
        {
          row_num: 1,
          op_type: OperationType.Loading,
          start_date: createdAt,
          end_date: stopTime,
          comment: null,
          contractor: 'ООО Логистика+',
          contractor_inn: '7701234567',
          location: {
            city_name: loadCity,
            city_full_name: loadCity,
            city_gc_id: 1,
            loading_address: `${loadCity}, склад 1`,
          },
        },
        {
          row_num: 2,
          op_type: OperationType.Unloading,
          start_date: stopTime,
          end_date: stopTime,
          comment: null,
          contractor: 'ООО Получатель',
          contractor_inn: '7809876543',
          location: {
            city_name: unloadCity,
            city_full_name: unloadCity,
            city_gc_id: 2,
            loading_address: `${unloadCity}, склад 2`,
          },
        },
      ],
      admitted_organizations: [
        {
          id: 201,
          inn: '5001112233',
          is_main: true,
          name: 'ООО Перевозчик',
        },
      ],
      hide_bets_history: false,
    },
    bets: [],
  };
}

export function createInitialAuctions(): MockAuctionRecord[] {
  return (initialAuctions as AuctionSeed[]).map(createAuction);
}
