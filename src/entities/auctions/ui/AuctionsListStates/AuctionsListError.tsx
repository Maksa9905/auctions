import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/button';

type AuctionsListErrorProps = {
  onRetry: () => void;
};

export default function AuctionsListError({ onRetry }: AuctionsListErrorProps) {
  const { t } = useTranslation('auctions');

  return (
    <div
      role="alert"
      className="flex min-h-56 flex-col items-center justify-center gap-4 rounded-lg border border-border px-6 py-10 text-center"
    >
      <div className="flex flex-col gap-2">
        <p className="text-base font-medium">{t('states.errorTitle')}</p>
        <p className="max-w-sm text-sm text-muted-foreground">{t('states.errorDescription')}</p>
      </div>
      <Button type="button" variant="outline" onClick={onRetry}>
        {t('states.retry')}
      </Button>
    </div>
  );
}
