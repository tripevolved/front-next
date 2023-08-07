export interface DatePickerProps {
  onSelect?: (range: { startDate: Date; endDate: Date; daysAmount: number }) => void;
  maxDays?: number;
}
