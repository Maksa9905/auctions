import dayjs from 'dayjs';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import type {
  AuctionListItem as ApiAuctionListItem,
  AuctionListItemRoutePoint as ApiAuctionListItemRoutePoint,
} from '@/shared/api';

import type { AuctionsListItem, RouteItem } from '../model/types';

export function useGetAuctionMappers() {
  const { t } = useTranslation(['auctions', 'translation']);

  const mapAuctionItemRouteItem = useCallback(
    (api?: ApiAuctionListItemRoutePoint): RouteItem => {
      return {
        city: api?.city || t('translation:notSpecified'),
        address: api?.address || t('translation:notSpecified'),
        date: api?.date ? dayjs(api.date).format('DD.MM.YYYY') : t('translation:notSpecified'),
      };
    },
    [t],
  );

  const mapAuctionItem = useCallback(
    (api: ApiAuctionListItem): AuctionsListItem => {
      return {
        cargoNumber: api.main?.cargo_num || t('translation:notSpecified'),
        auctionType: api.main?.auc_type
          ? t(`auctions:auctionType.${api.main.auc_type}`)
          : t('translation:notSpecified'),
        auctionStatus: api.trading?.status
          ? t(`auctions:auctionStatus.${api.trading.status}`)
          : t('translation:notSpecified'),
        tradingStatus: api.trading?.status_mobile
          ? t(`auctions:tradingStatus.${api.trading.status_mobile}`)
          : t('translation:notSpecified'),
        route: {
          load: mapAuctionItemRouteItem(api.route?.load),
          unload: mapAuctionItemRouteItem(api.route?.unload),
        },
        cargo: {
          name: api.cargo?.name || t('translation:notSpecified'),
          weight:
            api.cargo?.weight !== undefined
              ? String(api.cargo?.weight)
              : t('translation:notSpecified'),
          volume:
            api.cargo?.volume !== undefined
              ? String(api.cargo?.volume)
              : t('translation:notSpecified'),
          bodyType: api.cargo?.body_type || t('translation:notSpecified'),
        },
        price: {
          pricePerKm:
            api.main?.price_per_km !== undefined
              ? String(api.main.price_per_km)
              : t('translation:notSpecified'),
          currentPrice:
            api.trading?.price?.current !== undefined
              ? String(api.trading.price.current)
              : t('translation:notSpecified'),
        },
        bettedByMe: Boolean(api.trading?.your?.bet),
      };
    },
    [mapAuctionItemRouteItem, t],
  );

  return {
    mapAuctionItem,
    mapAuctionItemRouteItem,
  };
}
