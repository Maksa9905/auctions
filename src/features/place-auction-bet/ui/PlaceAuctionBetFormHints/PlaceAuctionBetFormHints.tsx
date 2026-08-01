import { useAuctionBetFormHints } from '../../lib/useAuctionBetFormHints';

import type { PlaceAuctionBetFormHintsProps } from './interface';

export default function PlaceAuctionBetFormHints({ constraints }: PlaceAuctionBetFormHintsProps) {
  const hints = useAuctionBetFormHints(constraints);

  if (hints.length < 0) return null;
  return (
    <ul className="flex flex-col gap-0.5 text-xs text-muted-foreground">
      {hints.map((hint) => (
        <li key={hint}>{hint}</li>
      ))}
    </ul>
  );
}
