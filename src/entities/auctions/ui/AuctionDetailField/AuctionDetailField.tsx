import type { AuctionDetailFieldProps } from './interface';

export default function AuctionDetailField({ label, value }: AuctionDetailFieldProps) {
  return (
    <div className="min-w-0">
      <div className="text-[0.6875rem] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </div>
      <div className="mt-0.5 text-sm [overflow-wrap:anywhere]">{value || '—'}</div>
    </div>
  );
}
