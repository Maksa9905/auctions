import { Controller, type FieldPath, type FieldValues } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import type { FormNumberFieldProps } from './interface';

function sanitizePositiveNumber(value: string): string {
  const cleaned = value.replace(/[^\d.]/g, '');
  const [integerPart = '', ...decimalParts] = cleaned.split('.');

  if (decimalParts.length === 0) {
    return integerPart;
  }

  return `${integerPart}.${decimalParts.join('')}`;
}

export default function FormNumberField<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, label, input }: FormNumberFieldProps<TFieldValues, TFieldName>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid || undefined}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Input
            {...input}
            id={field.name}
            name={field.name}
            ref={field.ref}
            value={field.value ?? ''}
            aria-invalid={fieldState.invalid}
            onBlur={field.onBlur}
            onChange={(event) => field.onChange(sanitizePositiveNumber(event.target.value))}
            inputMode="decimal"
          />
          {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
        </Field>
      )}
    />
  );
}
