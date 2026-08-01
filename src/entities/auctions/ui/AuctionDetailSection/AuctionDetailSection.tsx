import type { AuctionDetailSectionProps } from './interface';

export default function AuctionDetailSection({
  title,
  children,
  action,
}: AuctionDetailSectionProps) {
  return (
    <section className="rounded-lg border border-border bg-background px-4 py-3.5 sm:px-5 sm:py-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
