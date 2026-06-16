'use client'

import { useEffect, useState } from 'react'
import { QuizQuestionShell } from '../QuizQuestionShell'
import { isSingleSelectAnswer } from '../answers'
import type { QuizQuestionRendererProps, SelectOption, SingleSelectQuestion } from '../types'

type Props = QuizQuestionRendererProps & { question: SingleSelectQuestion }

const COLUMN_CLASSES: Record<1 | 2 | 3 | 4, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
}

export function SingleSelectQuestion({
  question,
  value,
  onChange,
  onNext,
  onBack,
  canGoBack,
  canGoNext,
}: Props) {
  const [options, setOptions] = useState<SelectOption[]>([])
  const [loading, setLoading] = useState(typeof question.options === 'function')

  const selected = isSingleSelectAnswer(value) ? value.value : ''

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      if (typeof question.options === 'function') {
        setLoading(true)
        try {
          const loaded = await question.options()
          if (!cancelled) setOptions(loaded)
        } catch {
          if (!cancelled) setOptions([])
        } finally {
          if (!cancelled) setLoading(false)
        }
      } else {
        setOptions(question.options)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [question.options])

  const columns = question.columns ?? 2
  const gridClass = COLUMN_CLASSES[columns]

  const handleSelect = (id: string) => {
    onChange({ value: id })
  }

  const handleNext = () => {
    if (selected) onNext()
  }

  return (
    <QuizQuestionShell
      description={question.description}
      canGoBack={canGoBack}
      onBack={onBack}
      onNext={handleNext}
      nextDisabled={!canGoNext}
    >
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600" />
        </div>
      ) : (
        <div className={`grid gap-4 ${gridClass}`}>
          {options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => !opt.disabled && handleSelect(opt.id)}
              disabled={opt.disabled}
              className={`p-4 border rounded-lg text-center flex flex-col items-center gap-2 relative ${
                selected === opt.id
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-300 hover:border-primary-300'
              } ${opt.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {opt.icon && (
                <span className="text-2xl">{typeof opt.icon === 'string' ? opt.icon : opt.icon}</span>
              )}
              <span>{opt.label}</span>
              {opt.description && <span className="text-xs text-gray-500">{opt.description}</span>}
              {opt.badge && (
                <span className="absolute top-2 right-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {opt.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </QuizQuestionShell>
  )
}
