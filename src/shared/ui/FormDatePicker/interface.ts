import type { FieldPath, FieldValues } from 'react-hook-form';

import type { FormDefaultElement } from '@/shared/types';

export interface FormDatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends FormDefaultElement<TFieldValues, TFieldName> {
  placeholder?: string;
}
