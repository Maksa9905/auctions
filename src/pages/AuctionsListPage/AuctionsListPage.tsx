import { useNavigate } from '@tanstack/react-router';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  AuctionsListTable,
  EAuctionsListTableViewType,
  useLazyGetAuctionsQuery,
} from '@/entities/auctions';
import {
  AuctionsFilters,
  auctionsFiltersDefaultValues,
  type AuctionsFiltersFormValues,
  AuctionsViewToggleButton,
  mapFiltersToParams,
  useAuctionsSearchQueryState,
} from '@/features/auctions-searching';
import { useMediaQuery } from '@/shared/lib/useMediaQuery';
import { routes } from '@/shared/routes';

export default function AuctionsListPage() {
  const { t } = useTranslation('auctions');
  const [query, setQuery] = useAuctionsSearchQueryState();

  const prefetchAuction = useLazyGetAuctionsQuery();

  const navigate = useNavigate();

  const { viewType, page, ...filters } = query;

  const auctionsParams = useMemo(() => mapFiltersToParams(filters), [filters]);

  const isMobile = useMediaQuery('(max-width: 480px)');

  const handleResetFilters = useCallback(() => {
    setQuery({ ...auctionsFiltersDefaultValues, page: 1 });
  }, [setQuery]);

  const handleSubmitFilters = useCallback(
    (values: AuctionsFiltersFormValues) => {
      setQuery({ ...values, page: 1 });
    },
    [setQuery],
  );

  const handleChangePage = useCallback(
    (nextPage: number) => {
      setQuery({ page: nextPage });
    },
    [setQuery],
  );

  const handleSelectAuction = useCallback(
    (id: string) => {
      navigate({
        to: routes.auctionById,
        params: { id },
      });
    },
    [navigate],
  );

  const handlePreloadAuction = useCallback(
    async (id: string) => {
      await prefetchAuction(id);
    },
    [prefetchAuction],
  );

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-wrap items-center justify-between gap-3 max-[420px]:flex-col max-[420px]:flex-nowrap max-[420px]:gap-1 max-[420px]:items-start">
        <h1 className="text-3xl font-semibold tracking-tight">{t('auctionsList')}</h1>
        <div className="flex gap-2">
          <AuctionsFilters
            values={filters}
            onSubmit={handleSubmitFilters}
            onReset={handleResetFilters}
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
        params={auctionsParams}
        page={page}
        onPageChange={handleChangePage}
        onClickItem={handleSelectAuction}
        onHoverItem={handlePreloadAuction}
      />
    </div>
  );
}
