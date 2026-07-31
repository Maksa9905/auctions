import { Controller, type FieldPath, type FieldValues } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import type { FormTextFieldProps } from './interface';

export default function FormTextField<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, label, input }: FormTextFieldProps<TFieldValues, TFieldName>) {
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
            onChange={field.onChange}
          />
          {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
        </Field>
      )}
    />
  );
}
