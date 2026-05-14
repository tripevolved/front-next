'use client'

import DateRangePicker from '@/components/DateRangePicker'

interface DateRangeSelectorProps {
  startDate: Date | null
  endDate: Date | null
  onDateRangeChange: (update: [Date | null, Date | null]) => void
  /** When true (default), dates before today are disabled. Set false to allow past dates (e.g. editing an existing trip). */
  restrictToFuture?: boolean
  /** Explicit minimum selectable date; ignored when `restrictToFuture` is false. */
  minDate?: Date
  className?: string
}

export default function DateRangeSelector({ 
  startDate, 
  endDate, 
  onDateRangeChange, 
  restrictToFuture = true,
  minDate,
  className = '' 
}: DateRangeSelectorProps) {
  const effectiveMinDate = restrictToFuture ? (minDate ?? new Date()) : undefined
  return (
    <div className={className}>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onChange={onDateRangeChange}
        minDate={effectiveMinDate}
      />
    </div>
  )
} 