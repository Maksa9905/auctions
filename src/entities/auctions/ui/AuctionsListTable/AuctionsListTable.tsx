import { useMemo } from 'react';

import { useListAuctions } from '@/shared/api';

import { useGetAuctionMappers } from '../../lib/mappers';
import AuctionsList from '../AuctionsList';
import AuctionsTable from '../AuctionsTable';

import { type AuctionsListTableProps, EAuctionsListTableViewType } from './interface';

export default function AuctionsListTable({ viewType }: AuctionsListTableProps) {
  const { data } = useListAuctions({ page: 1, per_page: 100 });
  const { mapAuctionItem } = useGetAuctionMappers();

  const tableData = useMemo(
    () => data?.data?.map(mapAuctionItem) || [],
    [data?.data, mapAuctionItem],
  );

  if (viewType === EAuctionsListTableViewType.LIST) return <AuctionsList />;
  if (viewType === EAuctionsListTableViewType.TABLE) return <AuctionsTable data={tableData} />;
}
