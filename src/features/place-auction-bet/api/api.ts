import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { getAuctionQueryKey } from '@/entities/auctions';
import { setBet, type SetBetRequest } from '@/shared/api';

import { getApiErrorMessage, isValidationApiError } from '../lib/getApiErrorMessage';

export function usePlaceAuctionBetMutation(auctionUuid: string) {
  const queryClient = useQueryClient();
  const { t } = useTranslation('auctions');

  return useMutation({
    mutationFn: (body: SetBetRequest) => setBet(auctionUuid, body),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: getAuctionQueryKey(auctionUuid) }),
        queryClient.invalidateQueries({
          queryKey: ['GET', `/auctions/${auctionUuid}/bets`],
        }),
        queryClient.invalidateQueries({ queryKey: ['POST', '/auctions/list'] }),
      ]);

      toast.success(t('placeBet.toasts.success'));
    },
    onError: (error) => {
      if (isValidationApiError(error)) {
        toast.error(t('placeBet.toasts.validationError'), {
          description: getApiErrorMessage(error, t('placeBet.toasts.error')),
        });
        return;
      }

      toast.error(t('placeBet.toasts.error'), {
        description: getApiErrorMessage(error, t('placeBet.toasts.error')),
      });
    },
  });
}
