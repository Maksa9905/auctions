import type { ComponentProps } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';

import type { FormDefaultElement } from '@/shared/types';

export interface FormTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends FormDefaultElement<TFieldValues, TFieldName> {
  input?: Omit<ComponentProps<'input'>, 'value' | 'defaultValue' | 'onChange' | 'name'>;
}
