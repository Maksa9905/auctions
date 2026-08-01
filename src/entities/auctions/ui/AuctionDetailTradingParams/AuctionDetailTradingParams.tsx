import { useTranslation } from 'react-i18next';

import { formatDateTime } from '../../lib/formatDateTime';
import AuctionDetailField from '../AuctionDetailField';
import AuctionDetailSection from '../AuctionDetailSection';

import type { AuctionDetailTradingParamsProps } from './interface';

export default function AuctionDetailTradingParams({ trading }: AuctionDetailTradingParamsProps) {
  const { t } = useTranslation(['auctions', 'translation']);

  return (
    <AuctionDetailSection title={t('auctions:detail.tradingParams.title')}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <AuctionDetailField
          label={t('auctions:detail.tradingParams.start')}
          value={formatDateTime(trading.start_time)}
        />
        <AuctionDetailField
          label={t('auctions:detail.tradingParams.stop')}
          value={formatDateTime(trading.stop_time)}
        />
        <AuctionDetailField
          label={t('auctions:detail.tradingParams.prolong')}
          value={
            trading.settings?.prolong_after_bet != null
              ? String(trading.settings.prolong_after_bet)
              : null
          }
        />
        <AuctionDetailField
          label={t('auctions:detail.tradingParams.canSetBet')}
          value={trading.can_set_bet ? t('translation:yes') : t('translation:no')}
        />
      </div>
    </AuctionDetailSection>
  );
}
