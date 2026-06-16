'use client'

import { useEffect, useState } from 'react'
import { RoundAdjust } from '@/components/trip-planning/RoundAdjust'
import { QuizQuestionShell } from '../QuizQuestionShell'
import { isCountersAnswer } from '../answers'
import type { CountersQuestion, QuizQuestionRendererProps } from '../types'

type Props = QuizQuestionRendererProps & { question: CountersQuestion }

export function CountersQuestionComponent({
  question,
  value,
  onChange,
  onNext,
  onBack,
  canGoBack,
  canGoNext,
}: Props) {
  const initial: Record<string, number> = {}
  for (const item of question.items) {
    initial[item.key] =
      isCountersAnswer(value) && value.values[item.key] != null
        ? value.values[item.key]
        : item.min
  }
  const [counts, setCounts] = useState(initial)

  useEffect(() => {
    onChange({ values: initial })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- seed parent answer once on mount
  }, [])

  const handleChange = (key: string, next: number) => {
    const updated = { ...counts, [key]: next }
    setCounts(updated)
    onChange({ values: updated })
  }

  return (
    <QuizQuestionShell
      description={question.description}
      canGoBack={canGoBack}
      onBack={onBack}
      onNext={onNext}
      nextDisabled={!canGoNext}
    >
      <div className="space-y-4">
        {question.items.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3"
          >
            <span className="text-sm font-medium text-gray-800">{item.label}</span>
            <RoundAdjust
              value={counts[item.key]}
              min={item.min}
              max={item.max}
              onChange={(next) => handleChange(item.key, next)}
            />
          </div>
        ))}
      </div>
    </QuizQuestionShell>
  )
}
