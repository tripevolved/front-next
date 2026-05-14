'use client'

import { useState } from 'react'
import { differenceInCalendarDays, format } from 'date-fns'
import DateRangeSelector from '../common/DateRangeSelector'
import type { TripDates } from './types'

function inclusiveTripDays(start: Date, end: Date): number {
  const span = differenceInCalendarDays(end, start) + 1
  return Math.max(1, span)
}

export function StepDates({
  onNext,
  onBack,
  title = 'Quando você pretende viajar?',
  description = 'Selecione uma janela de datas. Dentro desse período, vamos montar a melhor opção para você.',
  initial,
  allowPastDates = false,
}: {
  onNext: (dates: TripDates) => void
  onBack?: () => void
  title?: string
  description?: string
  /** Prefill range (yyyy-MM-dd) and optional max days — e.g. when editing an existing trip. */
  initial?: { startDate: string | null; endDate: string | null; maxDays?: number | null }
  /** When true, past dates can be selected (e.g. trip configuration edit). */
  allowPastDates?: boolean
}) {
  const parseInitial = (iso: string | null): Date | null => {
    if (!iso?.trim()) return null
    const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (m) {
      const y = Number(m[1])
      const mo = Number(m[2])
      const d = Number(m[3])
      const local = new Date(y, mo - 1, d)
      return Number.isNaN(local.getTime()) ? null : local
    }
    const d = new Date(iso)
    return Number.isNaN(d.getTime()) ? null : d
  }

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(() => {
    if (initial?.startDate && initial?.endDate) {
      return [parseInitial(initial.startDate), parseInitial(initial.endDate)]
    }
    return [null, null]
  })
  const [startDate, endDate] = dateRange
  const [maxDays, setMaxDays] = useState<number>(() => {
    if (initial?.maxDays != null && initial.maxDays > 0) return Math.floor(initial.maxDays)
    if (initial?.startDate && initial?.endDate) {
      const a = parseInitial(initial.startDate)
      const b = parseInitial(initial.endDate)
      if (a && b && b.getTime() >= a.getTime()) {
        return inclusiveTripDays(a, b)
      }
    }
    return 12
  })

  const handleDateRangeChange = (update: [Date | null, Date | null]) => {
    setDateRange(update)
    const [nextStart, nextEnd] = update
    if (nextStart && nextEnd && nextEnd.getTime() >= nextStart.getTime()) {
      setMaxDays(inclusiveTripDays(nextStart, nextEnd))
    }
  }

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
          onDateRangeChange={handleDateRangeChange}
          restrictToFuture={!allowPastDates}
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

