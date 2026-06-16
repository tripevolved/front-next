'use client'

import { useEffect, useState } from 'react'
import { QuizQuestionShell } from '../QuizQuestionShell'
import { isRangeAnswer, isRangeWithOptionsAnswer } from '../answers'
import type { QuizQuestionRendererProps, RangeQuestion, RangeWithOptionsQuestion } from '../types'

type Props = QuizQuestionRendererProps & {
  question: RangeQuestion | RangeWithOptionsQuestion
}

function formatDefault(value: number, max: number) {
  if (value >= max) return `${max}+`
  return String(value)
}

export function RangeQuestionComponent({
  question,
  value,
  onChange,
  onNext,
  onBack,
  canGoBack,
}: Props) {
  const step = question.step ?? 1
  const formatValue = question.formatValue ?? ((v: number) => formatDefault(v, question.max))

  const initialValue = isRangeWithOptionsAnswer(value)
    ? value.value
    : isRangeAnswer(value)
      ? value.value
      : Math.round((question.min + question.max) / 2)

  const [rangeValue, setRangeValue] = useState(initialValue)

  const rangeOptions = question.type === 'range-with-options' ? question.rangeOptions : []
  const initialOptions: Record<string, boolean> = {}
  for (const opt of rangeOptions) {
    initialOptions[opt.key] =
      isRangeWithOptionsAnswer(value) && value.options[opt.key] != null
        ? value.options[opt.key]
        : (opt.defaultValue ?? false)
  }
  const [options, setOptions] = useState<Record<string, boolean>>(initialOptions)

  useEffect(() => {
    if (question.type === 'range-with-options') {
      onChange({ value: rangeValue, options: initialOptions })
    } else {
      onChange({ value: rangeValue })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- seed parent answer once on mount
  }, [])

  const syncChange = (nextValue: number, nextOptions?: Record<string, boolean>) => {
    if (question.type === 'range-with-options') {
      onChange({ value: nextValue, options: nextOptions ?? options })
    } else {
      onChange({ value: nextValue })
    }
  }

  const handleRangeChange = (next: number) => {
    setRangeValue(next)
    syncChange(next)
  }

  const handleOptionToggle = (key: string, checked: boolean) => {
    const next = { ...options, [key]: checked }
    setOptions(next)
    syncChange(rangeValue, next)
  }

  return (
    <QuizQuestionShell
      description={question.description}
      canGoBack={canGoBack}
      onBack={onBack}
      onNext={onNext}
    >
      <div className="space-y-4">
        {rangeOptions.map((opt) => (
          <label
            key={opt.key}
            className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
          >
            <input
              type="checkbox"
              checked={options[opt.key] ?? false}
              onChange={(e) => handleOptionToggle(opt.key, e.target.checked)}
            />
            {opt.label}
          </label>
        ))}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{question.valueLabel ?? 'Valor'}</span>
            <span className="font-semibold text-secondary-900">{formatValue(rangeValue)}</span>
          </div>
          <input
            type="range"
            min={question.min}
            max={question.max}
            step={step}
            value={Math.min(rangeValue, question.max)}
            onChange={(e) => handleRangeChange(Number(e.target.value))}
            className="w-full accent-primary-600"
          />
        </div>
      </div>
    </QuizQuestionShell>
  )
}
