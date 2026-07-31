import { useTranslation } from 'react-i18next';

import type { AuctionsListItemProps } from './interface';

import styles from './AuctionsListItem.module.css';

export default function AuctionsListItem({ item }: AuctionsListItemProps) {
  const { t } = useTranslation(['auctions', 'translation']);

  return (
    <article className={styles.Root}>
      <header className={styles.Header}>
        <div className={styles.CargoNumber}>{item.cargoNumber}</div>
        <div className={styles.Meta}>
          <span>{item.auctionType}</span>
          <span>{item.auctionStatus}</span>
          <span>{item.tradingStatus}</span>
        </div>
      </header>

      <div className={styles.Route}>
        <div className={styles.Field}>
          <span className={styles.Label}>{t('auctions:auctionsTable.load')}</span>
          <span className={styles.Value}>
            {`${item.route.load.city} · ${item.route.load.address}`}
          </span>
          <span className={styles.Value}>{item.route.load.date}</span>
        </div>
        <div className={styles.Field}>
          <span className={styles.Label}>{t('auctions:auctionsTable.unload')}</span>
          <span className={styles.Value}>
            {`${item.route.unload.city} · ${item.route.unload.address}`}
          </span>
          <span className={styles.Value}>{item.route.unload.date}</span>
        </div>
      </div>

      <div className={styles.Grid}>
        <div className={styles.Field}>
          <span className={styles.Label}>{t('auctions:auctionsTable.cargo.title')}</span>
          <span className={styles.Value}>{item.cargo.name}</span>
        </div>
        <div className={styles.Field}>
          <span className={styles.Label}>{t('auctions:auctionsTable.cargo.weight')}</span>
          <span className={styles.Value}>{item.cargo.weight}</span>
        </div>
        <div className={styles.Field}>
          <span className={styles.Label}>{t('auctions:auctionsTable.cargo.volume')}</span>
          <span className={styles.Value}>{item.cargo.volume}</span>
        </div>
        <div className={styles.Field}>
          <span className={styles.Label}>{t('auctions:auctionsTable.cargo.bodyType')}</span>
          <span className={styles.Value}>{item.cargo.bodyType}</span>
        </div>
      </div>

      <footer className={styles.Footer}>
        <div className={styles.Field}>
          <span className={styles.Label}>{t('auctions:auctionsTable.currentPrice')}</span>
          <span className={styles.Price}>{item.price.currentPrice}</span>
        </div>
        <div className={styles.Field}>
          <span className={styles.Label}>{t('auctions:auctionsTable.pricePerKm')}</span>
          <span className={styles.Value}>{item.price.pricePerKm}</span>
        </div>
        <div className={styles.Field}>
          <span className={styles.Label}>{t('auctions:auctionsTable.bet')}</span>
          <span className={styles.Value}>
            {item.bettedByMe ? t('translation:yes') : t('translation:no')}
          </span>
        </div>
      </footer>
    </article>
  );
}
