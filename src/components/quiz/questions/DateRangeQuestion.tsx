'use client'

import { useState } from 'react'
import { differenceInCalendarDays, format } from 'date-fns'
import DateRangeSelector from '@/components/common/DateRangeSelector'
import { QuizQuestionShell } from '../QuizQuestionShell'
import { isDateRangeAnswer } from '../answers'
import type { DateRangeQuestion, QuizQuestionRendererProps } from '../types'

type Props = QuizQuestionRendererProps & { question: DateRangeQuestion }

function inclusiveDays(start: Date, end: Date): number {
  return Math.max(1, differenceInCalendarDays(end, start) + 1)
}

function parseIso(iso: string | null): Date | null {
  if (!iso?.trim()) return null
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (m) {
    const local = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
    return Number.isNaN(local.getTime()) ? null : local
  }
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? null : d
}

export function DateRangeQuestionComponent({
  question,
  value,
  onChange,
  onNext,
  onBack,
  canGoBack,
  canGoNext,
}: Props) {
  const existing = isDateRangeAnswer(value) ? value : null

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(() => [
    parseIso(existing?.startDate ?? null),
    parseIso(existing?.endDate ?? null),
  ])
  const [startDate, endDate] = dateRange

  const numberField = question.fields?.find((f) => f.kind === 'number')
  const [extraNumber, setExtraNumber] = useState<number>(() => {
    const fromAnswer = numberField && existing?.extras?.[numberField.key]
    if (typeof fromAnswer === 'number') return fromAnswer
    if (startDate && endDate && numberField?.defaultFromRange) {
      return inclusiveDays(startDate, endDate)
    }
    return numberField?.min ?? 1
  })

  const syncAnswer = (
    range: [Date | null, Date | null],
    extras?: Record<string, unknown>,
  ) => {
    const [start, end] = range
    if (start && end) {
      onChange({
        startDate: format(start, 'yyyy-MM-dd'),
        endDate: format(end, 'yyyy-MM-dd'),
        extras,
      })
    }
  }

  const handleDateRangeChange = (update: [Date | null, Date | null]) => {
    setDateRange(update)
    const [nextStart, nextEnd] = update
    const extras: Record<string, unknown> = existing?.extras ? { ...existing.extras } : {}
    if (numberField) {
      if (nextStart && nextEnd && numberField.defaultFromRange) {
        const days = inclusiveDays(nextStart, nextEnd)
        setExtraNumber(days)
        extras[numberField.key] = days
      } else if (numberField.key in extras === false) {
        extras[numberField.key] = extraNumber
      }
    }
    syncAnswer(update, Object.keys(extras).length ? extras : undefined)
  }

  const handleExtraChange = (next: number) => {
    setExtraNumber(next)
    if (startDate && endDate) {
      const extras = { ...(existing?.extras ?? {}), [numberField!.key]: next }
      syncAnswer(dateRange, extras)
    }
  }

  return (
    <QuizQuestionShell
      description={question.description}
      canGoBack={canGoBack}
      onBack={onBack}
      onNext={onNext}
      nextDisabled={!canGoNext}
    >
      <DateRangeSelector
        startDate={startDate}
        endDate={endDate}
        onDateRangeChange={handleDateRangeChange}
        restrictToFuture={question.restrictToFuture ?? true}
      />

      {numberField && (
        <div className="pt-2 space-y-1">
          <label className="text-sm font-medium text-gray-700">{numberField.label}</label>
          <input
            type="number"
            min={numberField.min ?? 1}
            value={extraNumber}
            onChange={(e) => handleExtraChange(Math.max(numberField.min ?? 1, Number(e.target.value || 1)))}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-600 focus:border-accent-600"
          />
        </div>
      )}
    </QuizQuestionShell>
  )
}
