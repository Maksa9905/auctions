import { Controller, type FieldPath, type FieldValues } from 'react-hook-form';

import { Checkbox } from '@/shared/ui/checkbox';
import { Field, FieldContent, FieldError, FieldLabel } from '@/shared/ui/field';

import type { FormCheckboxProps } from './interface';

export default function FormCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, label, checkbox }: FormCheckboxProps<TFieldValues, TFieldName>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          orientation="horizontal"
          data-invalid={fieldState.invalid || undefined}
        >
          <Checkbox
            {...checkbox}
            id={field.name}
            name={field.name}
            ref={field.ref}
            checked={Boolean(field.value)}
            aria-invalid={fieldState.invalid}
            onBlur={field.onBlur}
            onCheckedChange={(checked) => field.onChange(checked === true)}
          />
          <FieldContent>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </FieldContent>
        </Field>
      )}
    />
  );
}
