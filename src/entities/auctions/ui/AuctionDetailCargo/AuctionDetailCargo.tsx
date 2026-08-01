import { useTranslation } from 'react-i18next';

import { formatPrice } from '../../lib/formatPrice';
import AuctionDetailField from '../AuctionDetailField';
import AuctionDetailSection from '../AuctionDetailSection';

import type { AuctionDetailCargoProps } from './interface';

export default function AuctionDetailCargo({ cargo, hideCargoPrice }: AuctionDetailCargoProps) {
  const { t } = useTranslation('auctions');

  return (
    <AuctionDetailSection title={t('detail.cargo.title')}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <AuctionDetailField label={t('detail.cargo.bodyType')} value={cargo.body_type} />
        <AuctionDetailField
          label={t('detail.cargo.truckCount')}
          value={cargo.truck_count != null ? String(cargo.truck_count) : null}
        />
        <AuctionDetailField
          label={t('detail.cargo.distance')}
          value={cargo.distance != null ? String(cargo.distance) : null}
        />
        {!hideCargoPrice && (
          <AuctionDetailField
            label={t('detail.cargo.price')}
            value={cargo.price ? formatPrice(Number(cargo.price)) : null}
          />
        )}
      </div>
    </AuctionDetailSection>
  );
}
