import type { ComponentProps, ReactNode } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';

import type { FormDefaultElement } from '@/shared/types';
import { Select, SelectContent, SelectTrigger } from '@/shared/ui/select';

export type FormSelectOption = {
  value: string;
  label: ReactNode;
};

export interface FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends FormDefaultElement<TFieldValues, TFieldName> {
  select?: Omit<
    ComponentProps<typeof Select>,
    'value' | 'defaultValue' | 'onValueChange' | 'open' | 'onOpenChange'
  >;
  trigger?: Omit<ComponentProps<typeof SelectTrigger>, 'children'>;
  content?: ComponentProps<typeof SelectContent>;
  placeholder?: string;
  options: FormSelectOption[];
}
