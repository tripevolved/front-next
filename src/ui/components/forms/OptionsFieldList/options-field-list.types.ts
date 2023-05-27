import type { ComponentHTMLProps } from "@/core/types";
import type { OptionFieldProps } from "@/ui";

type Value = string | string[];
type OnCheck = (value: Value) => void;

export interface OptionsFieldListProps extends ComponentHTMLProps {
  options?: OptionFieldProps[];
  multiselect?: boolean;
  disabled?: boolean;
  onCheck?: OnCheck;
  defaultValue?: Value;
}
