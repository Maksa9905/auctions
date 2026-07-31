import { Controller, type FieldPath, type FieldValues } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

import type { FormSelectProps } from './interface';

export default function FormSelect<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  select,
  trigger,
  content,
  placeholder,
  options,
}: FormSelectProps<TFieldValues, TFieldName>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid || undefined}>
          <FieldLabel>{label}</FieldLabel>
          <Select {...select} value={field.value || undefined} onValueChange={field.onChange}>
            <SelectTrigger
              className="w-full"
              aria-invalid={fieldState.invalid}
              {...trigger}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent position="popper" {...content}>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
        </Field>
      )}
    />
  );
}
