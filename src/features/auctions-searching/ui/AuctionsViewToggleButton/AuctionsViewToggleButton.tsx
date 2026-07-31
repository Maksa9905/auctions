import { ListIcon, TableIcon } from 'lucide-react';
import { useCallback } from 'react';

import { EAuctionsListTableViewType } from '@/entities/auctions';
import { Button } from '@/shared/ui/button';

import type { AuctionsViewToggleButtonProps } from './interface';

const IconsMap = {
  [EAuctionsListTableViewType.LIST]: <ListIcon />,
  [EAuctionsListTableViewType.TABLE]: <TableIcon />,
};

export default function AuctionsViewToggleButton({
  view,
  onChange,
}: AuctionsViewToggleButtonProps) {
  const handleChangeView = useCallback(() => {
    if (view === EAuctionsListTableViewType.LIST) onChange(EAuctionsListTableViewType.TABLE);
    else onChange(EAuctionsListTableViewType.LIST);
  }, [onChange, view]);

  return (
    <Button type="button" variant="outline" size="icon" onClick={handleChangeView}>
      {IconsMap[view]}
    </Button>
  );
}
