'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import DateRangeSelector from '../common/DateRangeSelector'
import type { TripDates } from './types'

export function StepDates({
  onNext,
  onBack,
  title = 'Quando você pretende viajar?',
  description = 'Selecione uma janela de datas. Dentro desse período, vamos montar a melhor opção para você.',
}: {
  onNext: (dates: TripDates) => void
  onBack?: () => void
  title?: string
  description?: string
}) {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [startDate, endDate] = dateRange
  const [maxDays, setMaxDays] = useState<number>(12)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (startDate && endDate) {
      const safeMax = Math.max(1, Math.floor(maxDays || 1))
      onNext({
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
        month: null,
        maxDays: safeMax,
      })
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-4">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <DateRangeSelector
          startDate={startDate}
          endDate={endDate}
          onDateRangeChange={(update) => setDateRange(update)}
          minDate={new Date()}
        />

        <div className="pt-2 space-y-1">
          <label className="text-sm font-medium text-gray-700">Quantos dias deve durar a sua viagem?</label>
          <input
            type="number"
            min={1}
            value={maxDays}
            onChange={(e) => setMaxDays(Math.max(1, Number(e.target.value || 1)))}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-600 focus:border-accent-600"
          />
        </div>

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
            disabled={!startDate || !endDate}
            className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
      </form>
    </div>
  )
}

