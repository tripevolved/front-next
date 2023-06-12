type OnSet = (value: [Date, Date]) => void;

export interface DatePickerProps {
  dates: [Date, Date] | null;
  disabled?: boolean;
  onSet?: OnSet;
}
