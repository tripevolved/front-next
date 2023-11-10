export interface DatePickerProps {
  defaultDates?: (Date | undefined)[];
  onSelect?: (range: { startDate: Date; endDate: Date; daysAmount: number }) => void;
  maxDays?: number;
}
