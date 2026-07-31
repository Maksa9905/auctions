import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { AuctionsListTable, EAuctionsListTableViewType } from '@/entities/auctions';
import {
  AuctionsFilters,
  AuctionsViewToggleButton,
  mapFiltersToListRequest,
  useAuctionsSearchQueryState,
} from '@/features/auctions-searching';
import { useMediaQuery } from '@/shared/lib/useMediaQuery';

export default function AuctionsListPage() {
  const { t } = useTranslation('auctions');
  const [query, setQuery] = useAuctionsSearchQueryState();
  const { viewType, page, ...filters } = query;

  const listRequest = useMemo(() => mapFiltersToListRequest(filters), [filters]);

  const isMobile = useMediaQuery('(max-width: 480px)');

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-wrap items-center justify-between gap-3 max-[420px]:flex-col max-[420px]:flex-nowrap max-[420px]:gap-1 max-[420px]:items-start">
        <h1 className="text-3xl font-semibold tracking-tight">{t('auctionsList')}</h1>
        <div className="flex gap-2">
          <AuctionsFilters
            values={filters}
            onSubmit={(values) => void setQuery({ ...values, page: 1 })}
          />
          {!isMobile && (
            <AuctionsViewToggleButton
              onChange={(nextViewType) => void setQuery({ viewType: nextViewType })}
              view={viewType}
            />
          )}
        </div>
      </header>
      <AuctionsListTable
        viewType={isMobile ? EAuctionsListTableViewType.LIST : viewType}
        request={listRequest}
        page={page}
        onPageChange={(nextPage) => void setQuery({ page: nextPage })}
      />
    </div>
  );
}
