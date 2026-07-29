import { Heading, Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';

export default function AuctionsListPage() {
  const { t } = useTranslation('auctions');

  return (
    <>
      <Heading as="h1" size="8">
        {t('auction')}
      </Heading>
      <Text as="p" color="gray" mt="2">
        {t('auction')}
      </Text>
    </>
  );
}
