import { Skeleton } from '@/shared/ui/skeleton';

import { EAuctionsListTableViewType } from '../AuctionsListTable/interface';

type AuctionsListSkeletonProps = {
  viewType: EAuctionsListTableViewType;
};

function ListSkeletonCard() {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-background px-3.5 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-5 w-20 rounded-md" />
        <Skeleton className="h-5 w-24 rounded-md" />
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] gap-2">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-3 w-14" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
        <Skeleton className="mt-5 size-4" />
        <div className="flex flex-col items-end gap-1.5">
          <Skeleton className="h-3 w-14" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <ListSkeletonCard key={index} />
      ))}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="max-h-[min(70vh,720px)] overflow-hidden rounded-lg border border-border bg-background">
      <div className="sticky top-0 z-[2] flex gap-3 border-b border-border bg-muted px-3 py-3">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-4 w-24" />
        ))}
      </div>
      <div className="flex flex-col">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 border-b border-border px-3 py-3.5 last:border-b-0"
          >
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="hidden h-4 w-40 sm:block" />
            <Skeleton className="ml-auto h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AuctionsListSkeleton({ viewType }: AuctionsListSkeletonProps) {
  if (viewType === EAuctionsListTableViewType.LIST) {
    return <ListSkeleton />;
  }

  return <TableSkeleton />;
}
