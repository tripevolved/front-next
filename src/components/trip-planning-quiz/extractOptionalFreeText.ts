import type { QuizAnswers } from '@/components/quiz'
import { isTextAnswer } from '@/components/quiz/answers'
import { TRIP_PLANNING_QUESTION_IDS } from './types'

export function extractPlanejarOptionalFreeText(answers: QuizAnswers): string | undefined {
  const raw = answers[TRIP_PLANNING_QUESTION_IDS.description]
  if (isTextAnswer(raw) && raw.value.trim()) {
    return raw.value.trim()
  }
  return undefined
}
