export interface DatePickerProps {
  onSelect?: (range: { startDate?: Date; endDate?: Date }) => void;
  maxDays?: number;
}
