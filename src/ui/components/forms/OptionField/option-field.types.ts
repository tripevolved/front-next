import { ComponentHTMLProps } from "@/core/types";
import type { TextProps } from "@/ui";

export interface OptionFieldProps extends ComponentHTMLProps {
  value: string;
  checked?: boolean;
  label?: TextProps | string;
  multiselect?: boolean;
  onCheck?: (value: string) => void;
  disabled?: boolean;
  id?: string;
  name?: string;
};
