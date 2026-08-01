import { useTranslation } from 'react-i18next';

export default function AuctionsListEmpty() {
  const { t } = useTranslation('auctions');

  return (
    <div
      role="status"
      className="flex min-h-56 flex-col items-center justify-center gap-2 rounded-lg border border-border px-6 py-10 text-center"
    >
      <p className="text-base font-medium">{t('states.emptyTitle')}</p>
      <p className="max-w-sm text-sm text-muted-foreground">{t('states.emptyDescription')}</p>
    </div>
  );
}
