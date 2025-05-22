'use client'

import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import "react-datepicker/dist/react-datepicker.css"

interface DateRangePickerProps {
  startDate: Date | null
  endDate: Date | null
  onChange: (dates: [Date | null, Date | null]) => void
  minDate?: Date
  className?: string
}

export default function DateRangePicker({
  startDate,
  endDate,
  onChange,
  minDate = new Date(),
  className = ''
}: DateRangePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  
  // Format dates for display in text boxes
  const formatDate = (date: Date | null) => {
    if (!date) return ''
    return format(date, 'dd/MM/yyyy')
  }

  // Handle text box changes
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This is just a placeholder - in a real implementation, you'd parse the date
    // and update the calendar accordingly
    console.log('Start date changed:', e.target.value)
  }

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This is just a placeholder - in a real implementation, you'd parse the date
    // and update the calendar accordingly
    console.log('End date changed:', e.target.value)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Date range text boxes */}
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
              onChange={handleStartDateChange}
              onClick={() => setIsCalendarOpen(true)}
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
              onChange={handleEndDateChange}
              onClick={() => setIsCalendarOpen(true)}
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

      {/* Calendar */}
      <div className="mt-4 flex justify-center">
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => onChange(update)}
          minDate={minDate}
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
          openToDate={new Date(minDate.getFullYear(), minDate.getMonth() + 3, 1)}
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