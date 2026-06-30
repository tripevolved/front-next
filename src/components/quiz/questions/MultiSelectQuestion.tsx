'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { QuizQuestionShell } from '../QuizQuestionShell'
import { isMultiSelectAnswer } from '../answers'
import type { MultiSelectQuestion, QuizQuestionRendererProps, QuizAnswers, SelectOption } from '../types'

type Props = QuizQuestionRendererProps & { question: MultiSelectQuestion }

const COLUMN_CLASSES: Record<1 | 2 | 3 | 4, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
}

/** Serialize answers excluding this question so selection changes do not re-fetch options. */
function loaderDepsKey(questionId: string, answers: QuizAnswers): string {
  const { [questionId]: _ignored, ...upstreamAnswers } = answers
  return JSON.stringify(upstreamAnswers)
}

function DestinationPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-secondary-200 text-secondary-400">
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  )
}

export function MultiSelectQuestion({
  question,
  value,
  answers,
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
  const layout = question.layout ?? 'chips'
  const columns = question.columns ?? (layout === 'image-cards' ? 3 : 4)
  const gridClass = COLUMN_CLASSES[columns]

  const optionsLoaderKey = useMemo(() => {
    if (!question.optionsLoader) return null
    if (question.optionsLoaderDeps) {
      return JSON.stringify(question.optionsLoaderDeps(answers))
    }
    return loaderDepsKey(question.id, answers)
  }, [question, answers])

  useEffect(() => {
    if (!question.optionsLoader || optionsLoaderKey == null) return

    let cancelled = false
    const load = async () => {
      setLoading(true)
      try {
        const loaded = await question.optionsLoader!(answers)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reload when upstream answers change, not current selections
  }, [question.optionsLoader, optionsLoaderKey])

  const handleToggle = (id: string) => {
    const exclusiveId = question.exclusiveOptionId

    if (exclusiveId && id === exclusiveId) {
      if (selected.includes(id)) {
        onChange({ values: selected.filter((item) => item !== id) })
      } else {
        onChange({ values: [id] })
      }
      return
    }

    const base = exclusiveId ? selected.filter((item) => item !== exclusiveId) : selected

    if (base.includes(id)) {
      onChange({ values: base.filter((item) => item !== id) })
    } else if (base.length < maxSelections) {
      onChange({ values: [...base, id] })
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
      ) : layout === 'image-cards' ? (
        <div className={`grid gap-3 pb-2 ${gridClass}`}>
          {options.map((opt) => {
            const isSelected = selected.includes(opt.id)
            const isDisabled = !isSelected && selected.length >= maxSelections

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => !opt.disabled && !isDisabled && handleToggle(opt.id)}
                disabled={opt.disabled || isDisabled}
                className={`text-left rounded-xl border-2 overflow-hidden transition-all ${
                  isSelected
                    ? 'border-accent-500 shadow-md ring-1 ring-accent-500/30'
                    : 'border-secondary-200 hover:border-accent-300'
                } ${opt.disabled || isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="relative aspect-[4/3] w-full bg-secondary-100">
                  {opt.imageSrc ? (
                    <Image
                      src={opt.imageSrc}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, 33vw"
                    />
                  ) : (
                    <DestinationPlaceholder />
                  )}
                  {isSelected && (
                    <span className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent-500 text-white text-xs font-bold">
                      ✓
                    </span>
                  )}
                </div>
                <p className="px-3 py-2.5 font-comfortaa text-sm font-medium text-secondary-900 leading-snug">
                  {opt.label}
                </p>
              </button>
            )
          })}
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
