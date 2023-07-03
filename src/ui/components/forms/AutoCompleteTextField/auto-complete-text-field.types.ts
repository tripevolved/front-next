import { TextFieldProps } from "mars-ds";
type OnSet = (value: string) => void;

export type HintData = {
  internalValue: string;
  shownValue: string;
};
type GetData = (value: string) => Promise<HintData[]>;

export interface AutoCompleteTextFieldProps extends TextFieldProps {
  getData: GetData;
  disabled?: boolean;
  onSet?: OnSet;
}
