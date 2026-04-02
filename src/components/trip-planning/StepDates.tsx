'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import MonthSelector from '../common/MonthSelector'
import DateRangeSelector from '../common/DateRangeSelector'
import type { TripDates } from './types'

export function StepDates({
  onNext,
  onBack,
  hideMonthSelection = false,
  title = 'Vamos descobrir sua viagem?',
  description = 'Selecione as datas da sua viagem para encontrarmos os melhores destinos para você.',
}: {
  onNext: (dates: TripDates) => void
  onBack?: () => void
  hideMonthSelection?: boolean
  title?: string
  description?: string
}) {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [startDate, endDate] = dateRange
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [selectionMode, setSelectionMode] = useState<'month' | 'range'>(hideMonthSelection ? 'range' : 'month')
  const effectiveSelectionMode: 'month' | 'range' = hideMonthSelection ? 'range' : selectionMode

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (effectiveSelectionMode === 'month' && selectedMonth) {
      onNext({
        startDate: null,
        endDate: null,
        month: parseInt(selectedMonth),
      })
    } else if (effectiveSelectionMode === 'range' && startDate && endDate) {
      onNext({
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
        month: null,
      })
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-4">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!hideMonthSelection && (
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-lg border border-gray-300 p-1 bg-gray-50">
              <button
                type="button"
                onClick={() => setSelectionMode('month')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectionMode === 'month' ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Selecionar Mês
              </button>
              <button
                type="button"
                onClick={() => setSelectionMode('range')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectionMode === 'range' ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Selecionar Datas
              </button>
            </div>
          </div>
        )}

        {effectiveSelectionMode === 'month' && (
          <MonthSelector selectedMonth={selectedMonth} onMonthSelect={setSelectedMonth} className="mb-4" />
        )}

        {effectiveSelectionMode === 'range' && (
          <DateRangeSelector
            startDate={startDate}
            endDate={endDate}
            onDateRangeChange={(update) => setDateRange(update)}
            minDate={new Date()}
          />
        )}

        <div className="flex justify-between pt-4">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50"
            >
              Voltar
            </button>
          )}
          <button
            type="submit"
            disabled={
              (effectiveSelectionMode === 'month' && !selectedMonth) ||
              (effectiveSelectionMode === 'range' && (!startDate || !endDate))
            }
            className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
      </form>
    </div>
  )
}

