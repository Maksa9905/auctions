import { useTranslation } from 'react-i18next';

import { formatPrice } from '../../lib/formatPrice';
import AuctionDetailField from '../AuctionDetailField';
import AuctionDetailSection from '../AuctionDetailSection';

import type { AuctionDetailTradingPanelProps } from './interface';

export default function AuctionDetailTradingPanel({
  trading,
  betForm,
}: AuctionDetailTradingPanelProps) {
  const { t } = useTranslation(['auctions', 'translation']);
  const price = trading.price;

  const yourStatus = trading.status_mobile
    ? t(`auctions:tradingStatus.${trading.status_mobile}`)
    : t('translation:notSpecified');

  return (
    <AuctionDetailSection title={t('auctions:detail.tradingPanel.title')}>
      <div className="grid grid-cols-2 gap-3">
        <AuctionDetailField
          label={t('auctions:detail.tradingPanel.current')}
          value={formatPrice(price?.current)}
        />
        <AuctionDetailField
          label={t('auctions:detail.tradingPanel.available')}
          value={formatPrice(price?.available)}
        />
        <AuctionDetailField
          label={t('auctions:detail.tradingPanel.min')}
          value={formatPrice(price?.min)}
        />
        <AuctionDetailField
          label={t('auctions:detail.tradingPanel.max')}
          value={formatPrice(price?.max)}
        />
        <AuctionDetailField
          label={t('auctions:detail.tradingPanel.step')}
          value={formatPrice(price?.step)}
        />
        <AuctionDetailField
          label={t('auctions:detail.tradingPanel.pricePerKm')}
          value={formatPrice(price?.price_per_km)}
        />
      </div>

      <div className="mt-4 rounded-md bg-muted/50 px-3 py-2.5">
        <div className="text-[0.6875rem] font-medium tracking-wide text-muted-foreground uppercase">
          {t('auctions:detail.tradingPanel.yourStatus')}
        </div>
        <div className="mt-0.5 text-sm font-medium">{yourStatus}</div>
        {trading.your?.bet ? (
          <div className="mt-1 text-xs text-muted-foreground">
            {t('auctions:detail.tradingPanel.yourLastBet')}
            {': '}
            <span className="font-medium text-foreground tabular-nums">
              {formatPrice(trading.your.last_bet_with_vat)}
            </span>
          </div>
        ) : (
          <div className="mt-1 text-xs text-muted-foreground">
            {t('auctions:detail.tradingPanel.noYourBet')}
          </div>
        )}
      </div>

      {betForm}
    </AuctionDetailSection>
  );
}
