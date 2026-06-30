'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { QuizAnswerValue, QuizAnswers, QuizConfig, QuizQuestion } from './types'
import { isQuestionValid, validateQuestion } from './validation'

function filterActiveQuestions(questions: QuizQuestion[], answers: QuizAnswers): QuizQuestion[] {
  return questions.filter((q) => q.visibleWhen?.(answers) ?? true)
}

function getHiddenQuestionIds(questions: QuizQuestion[], answers: QuizAnswers): Set<string> {
  const hidden = new Set<string>()
  for (const q of questions) {
    if (q.visibleWhen && !q.visibleWhen(answers)) {
      hidden.add(q.id)
    }
  }
  return hidden
}

export function useQuizFlow(config: QuizConfig) {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>(() => {
    const initial = config.initialAnswers ?? {}
    return { ...initial } as QuizAnswers
  })
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const completeStartedRef = useRef(false)

  const activeQuestions = useMemo(
    () => filterActiveQuestions(config.questions, answers),
    [config.questions, answers],
  )

  const clampedStepIndex = Math.min(stepIndex, Math.max(0, activeQuestions.length - 1))

  useEffect(() => {
    completeStartedRef.current = false
  }, [config.id, clampedStepIndex])
  const currentQuestion = activeQuestions[clampedStepIndex]
  const currentValue = currentQuestion ? answers[currentQuestion.id] ?? null : null

  useEffect(() => {
    if (stepIndex !== clampedStepIndex) {
      setStepIndex(clampedStepIndex)
    }
  }, [stepIndex, clampedStepIndex])

  useEffect(() => {
    const hiddenIds = getHiddenQuestionIds(config.questions, answers)
    if (hiddenIds.size === 0) return

    setAnswers((prev) => {
      let changed = false
      const next = { ...prev }
      for (const id of Array.from(hiddenIds)) {
        if (id in next) {
          delete next[id]
          changed = true
        }
      }
      return changed ? next : prev
    })
  }, [config.questions, answers])

  const setAnswer = useCallback((questionId: string, value: QuizAnswerValue) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
    setError(null)
  }, [])

  const canGoBack = clampedStepIndex > 0 && currentQuestion?.type !== 'action'

  const canGoNext = useMemo(() => {
    if (!currentQuestion) return false
    if (currentQuestion.type === 'intro') return true
    if (currentQuestion.type === 'action') return false
    return isQuestionValid(currentQuestion, currentValue, answers)
  }, [currentQuestion, currentValue, answers])

  const progressPercent =
    activeQuestions.length > 1 ? (clampedStepIndex / (activeQuestions.length - 1)) * 100 : 0

  const goBack = useCallback(() => {
    setError(null)
    setStepIndex((i) => Math.max(0, i - 1))
  }, [])

  const goNext = useCallback(async () => {
    if (!currentQuestion) return

    if (currentQuestion.type === 'intro') {
      setError(null)
      setStepIndex((i) => Math.min(i + 1, activeQuestions.length - 1))
      return
    }

    if (currentQuestion.type === 'action') return

    const validationError = validateQuestion(currentQuestion, currentValue, answers)

    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)

    const isLastStep = clampedStepIndex >= activeQuestions.length - 1
    const nextQuestion = activeQuestions[clampedStepIndex + 1]

    if (isLastStep) {
      if (completeStartedRef.current) return
      completeStartedRef.current = true
      setIsSubmitting(true)
      try {
        await config.onComplete(answers)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocorreu um erro. Tente novamente.')
      } finally {
        setIsSubmitting(false)
      }
      return
    }

    if (nextQuestion?.type === 'action') {
      setStepIndex((i) => i + 1)
      return
    }

    setStepIndex((i) => Math.min(i + 1, activeQuestions.length - 1))
  }, [currentQuestion, currentValue, answers, clampedStepIndex, activeQuestions, config])

  const submitAnswer = useCallback(
    (value: QuizAnswerValue) => {
      if (!currentQuestion) return
      setAnswer(currentQuestion.id, value)
    },
    [currentQuestion, setAnswer],
  )

  return {
    stepIndex: clampedStepIndex,
    currentQuestion,
    activeQuestions,
    answers,
    currentValue,
    setAnswer: submitAnswer,
    goNext,
    goBack,
    canGoNext,
    canGoBack,
    error,
    setError,
    isSubmitting,
    progressPercent,
  }
}
