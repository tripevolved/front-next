'use client'

import { useState } from 'react'
import { QuizQuestionShell } from '../QuizQuestionShell'
import { isTextAnswer } from '../answers'
import type { QuizQuestionRendererProps, TextQuestion } from '../types'

type Props = QuizQuestionRendererProps & { question: TextQuestion }

export function TextQuestionComponent({
  question,
  value,
  onChange,
  onNext,
  onBack,
  canGoBack,
  canGoNext,
  isSubmitting = false,
}: Props) {
  const isTextarea = question.type === 'textarea'
  const initial = isTextAnswer(value) ? value.value : ''
  const [text, setText] = useState(initial)

  const handleChange = (next: string) => {
    setText(next)
    onChange({ value: next })
  }

  return (
    <QuizQuestionShell
      description={question.description}
      canGoBack={canGoBack}
      onBack={onBack}
      onNext={onNext}
      nextDisabled={!canGoNext}
      isSubmitting={isSubmitting}
      nextLabel={isSubmitting ? 'Processando...' : 'Próximo'}
    >
      {isTextarea ? (
        <>
          <textarea
            value={text}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={question.placeholder}
            rows={question.rows ?? 7}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent-600 focus:border-accent-600 text-gray-900"
          />
          <p className="text-xs text-gray-500">{text.trim().length} caracteres</p>
        </>
      ) : (
        <input
          type="text"
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={question.placeholder}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-600 focus:border-accent-600"
        />
      )}
    </QuizQuestionShell>
  )
}
