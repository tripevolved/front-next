'use client'

import { useMemo, useState } from 'react'
import DatePicker from 'react-datepicker'
import { addDays, differenceInCalendarDays, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

/** Inclusive calendar days (check-in through check-out). */
export const MAX_TRIP_DATE_RANGE_DAYS = 30

export const MAX_TRIP_DATE_RANGE_MESSAGE =
  `O período selecionado não pode ser maior que ${MAX_TRIP_DATE_RANGE_DAYS} dias.`

interface DateRangePickerProps {
  startDate: Date | null
  endDate: Date | null
  onChange: (dates: [Date | null, Date | null]) => void
  minDate?: Date
  /** Inclusive max span in days. Defaults to {@link MAX_TRIP_DATE_RANGE_DAYS}. */
  maxRangeDays?: number
  className?: string
}

function inclusiveDays(start: Date, end: Date): number {
  return Math.max(1, differenceInCalendarDays(end, start) + 1)
}

export default function DateRangePicker({
  startDate,
  endDate,
  onChange,
  minDate,
  maxRangeDays = MAX_TRIP_DATE_RANGE_DAYS,
  className = ''
}: DateRangePickerProps) {
  const [rangeError, setRangeError] = useState<string | null>(null)
  const openToAnchor = startDate ?? endDate ?? minDate ?? new Date()
  const openToDate = new Date(openToAnchor.getFullYear(), openToAnchor.getMonth(), 1)

  const maxSelectableDate = useMemo(() => {
    if (!startDate || endDate) return undefined
    return addDays(startDate, maxRangeDays - 1)
  }, [startDate, endDate, maxRangeDays])

  const formatDate = (date: Date | null) => {
    if (!date) return ''
    return format(date, 'dd/MM/yyyy')
  }

  const handleChange = (update: [Date | null, Date | null]) => {
    const [nextStart, nextEnd] = update

    if (nextStart && nextEnd && nextEnd.getTime() >= nextStart.getTime()) {
      if (inclusiveDays(nextStart, nextEnd) > maxRangeDays) {
        setRangeError(
          maxRangeDays === MAX_TRIP_DATE_RANGE_DAYS
            ? MAX_TRIP_DATE_RANGE_MESSAGE
            : `O período selecionado não pode ser maior que ${maxRangeDays} dias.`
        )
        // Keep start; clear invalid end so the user can pick again within the limit.
        onChange([nextStart, null])
        return
      }
    }

    setRangeError(null)
    onChange(update)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Data de ida
          </label>
          <div className="relative">
            <input
              type="text"
              id="startDate"
              value={formatDate(startDate)}
              readOnly
              placeholder="Selecione a data"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-baloo"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            Data de volta
          </label>
          <div className="relative">
            <input
              type="text"
              id="endDate"
              value={formatDate(endDate)}
              readOnly
              placeholder="Selecione a data"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-baloo"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {rangeError && (
        <p className="text-sm text-red-600 font-medium" role="alert">
          {rangeError}
        </p>
      )}

      <div className="mt-4 flex justify-center">
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => handleChange(update)}
          {...(minDate != null ? { minDate } : {})}
          {...(maxSelectableDate != null ? { maxDate: maxSelectableDate } : {})}
          locale={ptBR}
          dateFormat="dd/MM/yyyy"
          inline
          className="w-full max-w-md"
          calendarClassName="font-baloo rounded-lg shadow-lg border border-gray-200"
          dayClassName={(date) => {
            if (startDate && date.getTime() === startDate.getTime()) {
              return "bg-primary-500 text-white hover:bg-primary-600"
            }
            if (endDate && date.getTime() === endDate.getTime()) {
              return "bg-primary-500 text-white hover:bg-primary-600"
            }
            return ""
          }}
          renderDayContents={(day, date) => {
            const isInRange = startDate && endDate && date > startDate && date < endDate;
            return (
              <span className={`w-full h-full flex items-center justify-center ${
                isInRange ? 'bg-primary-100' : ''
              }`}>
                {day}
              </span>
            );
          }}
          popperClassName="react-datepicker-popper"
          popperPlacement="bottom-start"
          openToDate={openToDate}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled
          }) => (
            <div className="flex items-center justify-between px-2 py-2">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                type="button"
                className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Mês anterior"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <div className="text-lg font-baloo font-bold text-secondary-900">
                {format(date, 'MMMM yyyy', { locale: ptBR })}
              </div>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                type="button"
                className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Próximo mês"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          )}
        />
      </div>
    </div>
  )
}
