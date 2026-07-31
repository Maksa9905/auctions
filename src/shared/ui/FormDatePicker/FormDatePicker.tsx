import dayjs, { type Dayjs } from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, type FieldPath, type FieldValues } from 'react-hook-form';

import { DATE_FORMAT, isValidDayjs } from '@/shared/lib';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

import type { FormDatePickerProps } from './interface';

function toDate(value: unknown): Date | undefined {
  if (!isValidDayjs(value)) {
    return undefined;
  }

  return value.toDate();
}

function toFormValue(date: Date | undefined): Dayjs | null {
  if (!date) {
    return null;
  }

  return dayjs(date);
}

export default function FormDatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, label, placeholder }: FormDatePickerProps<TFieldValues, TFieldName>) {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selected = toDate(field.value);

        return (
          <Field data-invalid={fieldState.invalid || undefined}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  id={field.name}
                  ref={field.ref}
                  type="button"
                  variant="outline"
                  aria-invalid={fieldState.invalid}
                  data-empty={!selected}
                  className="w-full justify-start font-normal data-[empty=true]:text-muted-foreground"
                  onBlur={field.onBlur}
                >
                  <CalendarIcon />
                  {isValidDayjs(field.value)
                    ? field.value.format(DATE_FORMAT)
                    : (placeholder ?? label)}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selected}
                  onSelect={(date) => {
                    field.onChange(toFormValue(date));
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        );
      }}
    />
  );
}
