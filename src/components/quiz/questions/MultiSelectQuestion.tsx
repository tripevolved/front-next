'use client'

import { useEffect, useState } from 'react'
import { QuizQuestionShell } from '../QuizQuestionShell'
import { isMultiSelectAnswer } from '../answers'
import type { MultiSelectQuestion, QuizQuestionRendererProps, SelectOption } from '../types'

type Props = QuizQuestionRendererProps & { question: MultiSelectQuestion }

export function MultiSelectQuestion({
  question,
  value,
  onChange,
  onNext,
  onBack,
  canGoBack,
  canGoNext,
}: Props) {
  const [options, setOptions] = useState<SelectOption[]>(question.options ?? [])
  const [loading, setLoading] = useState(Boolean(question.optionsLoader))

  const selected = isMultiSelectAnswer(value) ? value.values : []
  const maxSelections = question.maxSelections ?? 5

  useEffect(() => {
    if (!question.optionsLoader) return

    let cancelled = false
    const load = async () => {
      setLoading(true)
      try {
        const loaded = await question.optionsLoader!()
        if (!cancelled) setOptions(loaded)
      } catch {
        if (!cancelled) setOptions([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [question.optionsLoader])

  const handleToggle = (id: string) => {
    if (selected.includes(id)) {
      onChange({ values: selected.filter((g) => g !== id) })
    } else if (selected.length < maxSelections) {
      onChange({ values: [...selected, id] })
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
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[50vh] overflow-y-auto bg-gray-100 sm:bg-white p-2 sm:p-0 rounded-lg">
          {options.map((opt) => {
            const isSelected = selected.includes(opt.id)
            const isDisabled = !isSelected && selected.length >= maxSelections

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => !opt.disabled && !isDisabled && handleToggle(opt.id)}
                disabled={opt.disabled || isDisabled}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-primary-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-primary-300'
                } ${opt.disabled || isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      )}
    </QuizQuestionShell>
  )
}
