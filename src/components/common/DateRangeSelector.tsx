'use client'

import DateRangePicker from '@/components/DateRangePicker'

interface DateRangeSelectorProps {
  startDate: Date | null
  endDate: Date | null
  onDateRangeChange: (update: [Date | null, Date | null]) => void
  minDate?: Date
  className?: string
}

export default function DateRangeSelector({ 
  startDate, 
  endDate, 
  onDateRangeChange, 
  minDate = new Date(),
  className = '' 
}: DateRangeSelectorProps) {
  return (
    <div className={className}>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onChange={onDateRangeChange}
        minDate={minDate}
      />
    </div>
  )
} 