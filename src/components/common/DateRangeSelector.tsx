'use client'

import DateRangePicker, { MAX_TRIP_DATE_RANGE_DAYS } from '@/components/DateRangePicker'

interface DateRangeSelectorProps {
  startDate: Date | null
  endDate: Date | null
  onDateRangeChange: (update: [Date | null, Date | null]) => void
  /** When true (default), dates before today are disabled. Set false to allow past dates (e.g. editing an existing trip). */
  restrictToFuture?: boolean
  /** Explicit minimum selectable date; ignored when `restrictToFuture` is false. */
  minDate?: Date
  /** Inclusive max trip length in days. Defaults to {@link MAX_TRIP_DATE_RANGE_DAYS}. */
  maxRangeDays?: number
  className?: string
}

export default function DateRangeSelector({ 
  startDate, 
  endDate, 
  onDateRangeChange, 
  restrictToFuture = true,
  minDate,
  maxRangeDays = MAX_TRIP_DATE_RANGE_DAYS,
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
        maxRangeDays={maxRangeDays}
      />
    </div>
  )
} 