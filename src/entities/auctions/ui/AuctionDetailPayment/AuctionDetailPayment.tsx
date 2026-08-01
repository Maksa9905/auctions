import { useTranslation } from 'react-i18next';

import AuctionDetailField from '../AuctionDetailField';
import AuctionDetailSection from '../AuctionDetailSection';

import type { AuctionDetailPaymentProps } from './interface';

export default function AuctionDetailPayment({ payment }: AuctionDetailPaymentProps) {
  const { t } = useTranslation('auctions');

  return (
    <AuctionDetailSection title={t('detail.payment.title')}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <AuctionDetailField label={t('detail.payment.condition')} value={payment.condition} />
        <AuctionDetailField label={t('detail.payment.form')} value={payment.form} />
        <AuctionDetailField
          label={t('detail.payment.delay')}
          value={
            payment.delay != null
              ? `${payment.delay}${payment.delay_type ? ` (${payment.delay_type})` : ''}`
              : null
          }
        />
      </div>
    </AuctionDetailSection>
  );
}
