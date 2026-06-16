'use client'

import { useEffect, useState } from 'react'
import { RoundAdjust } from '@/components/trip-planning/RoundAdjust'
import { QuizQuestionShell } from '../QuizQuestionShell'
import { isCounterAnswer } from '../answers'
import type { CounterQuestion, QuizQuestionRendererProps } from '../types'

type Props = QuizQuestionRendererProps & { question: CounterQuestion }

export function CounterQuestionComponent({
  question,
  value,
  onChange,
  onNext,
  onBack,
  canGoBack,
  canGoNext,
}: Props) {
  const initial = isCounterAnswer(value) ? value.value : question.min
  const [count, setCount] = useState(initial)

  useEffect(() => {
    onChange({ value: initial })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- seed parent answer once on mount
  }, [])

  const handleChange = (next: number) => {
    setCount(next)
    onChange({ value: next })
  }

  return (
    <QuizQuestionShell
      description={question.description}
      canGoBack={canGoBack}
      onBack={onBack}
      onNext={onNext}
      nextDisabled={!canGoNext}
    >
      <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
        <span className="text-sm font-medium text-gray-800">
          {question.fieldLabel ?? 'Quantidade'}
        </span>
        <RoundAdjust value={count} min={question.min} max={question.max} onChange={handleChange} />
      </div>
    </QuizQuestionShell>
  )
}
