import AuctionsListItem from '../AuctionsListItem';

import type { AuctionsListRowProps } from './interface';

export default function AuctionsListRow({
  items,
  columns,
  onClickItem,
  onHoverItem,
}: AuctionsListRowProps) {
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {items.map((item) => (
        <AuctionsListItem
          onHover={onHoverItem}
          onClick={onClickItem}
          key={item.cargoNumber}
          item={item}
        />
      ))}
    </div>
  );
}
