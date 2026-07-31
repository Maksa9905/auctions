import { useTranslation } from 'react-i18next';

export default function AuctionDetailPage() {
  const { t } = useTranslation('auctions');

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-semibold tracking-tight">{t('auction')}</h1>
      <p className="text-muted-foreground">{t('auction')}</p>
    </div>
  );
}
