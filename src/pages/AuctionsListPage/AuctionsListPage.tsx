import { Heading, Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';

import { AuctionsListTable, EAuctionsListTableViewType } from '@/entities/auctions';

export default function AuctionsListPage() {
  const { t } = useTranslation('auctions');

  return (
    <>
      <Heading as="h1" size="8">
        {t('auctionsList')}
      </Heading>
      <AuctionsListTable viewType={EAuctionsListTableViewType.TABLE} />
    </>
  );
}
