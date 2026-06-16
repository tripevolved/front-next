'use client'

import { useEffect, useRef } from 'react'
import { QuizQuestionShell } from '../QuizQuestionShell'
import type { ActionQuestion, QuizQuestionRendererProps } from '../types'

type Props = QuizQuestionRendererProps & { question: ActionQuestion; setError?: (error: string | null) => void }

export function ActionQuestion({
  question,
  answers,
  setError,
}: Props) {
  const hasCalledRef = useRef(false)

  useEffect(() => {
    if (hasCalledRef.current) return
    hasCalledRef.current = true

    question.onAction(answers).catch((err) => {
      setError?.(err instanceof Error ? err.message : 'Ocorreu um erro. Tente novamente.')
    })
  }, [question, answers, setError])

  return (
    <QuizQuestionShell showFooter={false} description={question.description}>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4" />
        <p className="text-primary-600 font-medium text-center">
          {question.loadingText ?? 'Processando...'}
        </p>
      </div>
    </QuizQuestionShell>
  )
}
