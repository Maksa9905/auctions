import { useMediaQuery } from '@/shared/lib/useMediaQuery';

export function useAuctionsListColumnCount() {
  const isXl = useMediaQuery('(min-width: 1280px)');
  const isSm = useMediaQuery('(min-width: 640px)');

  if (isXl) return 3;
  if (isSm) return 2;
  return 1;
}
