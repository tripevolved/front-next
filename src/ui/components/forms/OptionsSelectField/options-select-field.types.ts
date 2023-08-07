import type { TextFieldProps } from "mars-ds";

export interface SelectFieldProps extends Omit<TextFieldProps, "rightIconButton" | "onSelect"> {
  options: SelectFieldOptions;
  defaultOption?: SelectFieldOption;
  onSelect?: (option: SelectFieldOption) => void;
  enableFilter?: boolean;
}

export type SelectFieldOption = {
  label: string;
  value?: string;
};

export type SelectFieldOptions = SelectFieldOption[];
