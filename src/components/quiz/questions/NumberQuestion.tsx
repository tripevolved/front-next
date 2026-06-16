'use client'

import { useState } from 'react'
import { QuizQuestionShell } from '../QuizQuestionShell'
import { isNumberAnswer } from '../answers'
import type { NumberQuestion, QuizQuestionRendererProps } from '../types'

type Props = QuizQuestionRendererProps & { question: NumberQuestion }

export function NumberQuestionComponent({
  question,
  value,
  onChange,
  onNext,
  onBack,
  canGoBack,
  canGoNext,
}: Props) {
  const initial = isNumberAnswer(value) ? value.value : (question.min ?? 0)
  const [num, setNum] = useState(initial)

  const handleChange = (next: number) => {
    setNum(next)
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
      {question.label && (
        <label className="text-sm font-medium text-gray-700">{question.label}</label>
      )}
      <input
        type="number"
        min={question.min}
        max={question.max}
        value={num}
        placeholder={question.placeholder}
        onChange={(e) => handleChange(Number(e.target.value))}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-600 focus:border-accent-600"
      />
    </QuizQuestionShell>
  )
}
