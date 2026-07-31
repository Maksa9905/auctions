import type { ReactNode } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

export enum Language {
  ru = 'ru',
  en = 'en',
}

export interface FormDefaultElement<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TFieldName;
  label: ReactNode;
}
