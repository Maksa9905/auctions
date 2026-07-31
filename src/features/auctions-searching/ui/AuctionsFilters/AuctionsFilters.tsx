import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuctionOptions } from '@/entities/auctions';
import { Button } from '@/shared/ui/button';
import { FieldGroup } from '@/shared/ui/field';
import FormCheckbox from '@/shared/ui/FormCheckbox';
import FormDatePicker from '@/shared/ui/FormDatePicker';
import FormNumberField from '@/shared/ui/FormNumberField';
import FormSelect from '@/shared/ui/FormSelect';
import FormTextField from '@/shared/ui/FormTextField';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';

import { useAuctionsFiltersForm } from '../../lib/useAuctionsFiltersForm';
import type { AuctionsFiltersFormValues } from '../../model/types';

import type { AuctionsFiltersProps } from './interface';

export default function AuctionsFilters({ values, onSubmit }: AuctionsFiltersProps) {
  const { t } = useTranslation('auctions');
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, reset } = useAuctionsFiltersForm(values);

  const { auctionStatusOptions, auctionTypeOptions, tradingStatusOptions, citiesOptions } =
    useAuctionOptions();

  useEffect(
    function initializeFiltersFormEffect() {
      if (open) reset(values);
    },
    [open, reset, values],
  );

  const handleApply = (formValues: AuctionsFiltersFormValues) => {
    onSubmit(formValues);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button type="button" variant="outline">
          {t('filters.open')}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{t('filters.title')}</SheetTitle>
        </SheetHeader>

        <form
          className="flex min-h-0 flex-1 flex-col overflow-hidden"
          onSubmit={handleSubmit(handleApply)}
        >
          <FieldGroup className="min-h-0 flex-1 gap-3 overflow-y-auto px-4">
            <FormTextField
              control={control}
              name="cargoNum"
              label={t('filters.cargoNum')}
              input={{ placeholder: t('filters.cargoNum') }}
            />

            <FormSelect
              control={control}
              name="auctionStatuses"
              label={t('filters.auctionStatuses')}
              placeholder={t('filters.auctionStatuses')}
              options={auctionStatusOptions}
            />

            <FormSelect
              control={control}
              name="tradingStatuses"
              label={t('filters.tradingStatuses')}
              placeholder={t('filters.tradingStatuses')}
              options={tradingStatusOptions}
            />

            <FormSelect
              control={control}
              name="auctionType"
              label={t('filters.auctionType')}
              placeholder={t('filters.auctionType')}
              options={auctionTypeOptions}
            />

            <FormSelect
              control={control}
              name="loadCity"
              label={t('filters.loadCity')}
              options={citiesOptions}
              placeholder={t('filters.loadCity')}
            />

            <FormSelect
              control={control}
              name="unloadCity"
              label={t('filters.unloadCity')}
              options={citiesOptions}
              placeholder={t('filters.unloadCity')}
            />

            <FormDatePicker
              control={control}
              name="loadDateFrom"
              label={t('filters.loadDateFrom')}
              placeholder={t('filters.loadDateFrom')}
            />

            <FormDatePicker
              control={control}
              name="loadDateTo"
              label={t('filters.loadDateTo')}
              placeholder={t('filters.loadDateTo')}
            />

            <FormNumberField
              control={control}
              name="priceFrom"
              label={t('filters.priceFrom')}
              input={{ placeholder: t('filters.priceFrom') }}
            />

            <FormNumberField
              control={control}
              name="priceTo"
              label={t('filters.priceTo')}
              input={{ placeholder: t('filters.priceTo') }}
            />

            <FormCheckbox control={control} name="isAvailable" label={t('filters.isAvailable')} />

            <FormCheckbox control={control} name="isBigger" label={t('filters.isBigger')} />
          </FieldGroup>

          <SheetFooter>
            <Button type="submit">{t('filters.apply')}</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
