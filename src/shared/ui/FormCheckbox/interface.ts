import type { ComponentProps } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';

import type { FormDefaultElement } from '@/shared/types';
import { Checkbox } from '@/shared/ui/checkbox';

export interface FormCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends FormDefaultElement<TFieldValues, TFieldName> {
  checkbox?: Omit<
    ComponentProps<typeof Checkbox>,
    'checked' | 'defaultChecked' | 'onCheckedChange' | 'name'
  >;
}
