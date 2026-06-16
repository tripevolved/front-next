import { isSingleSelectAnswer } from '@/components/quiz/answers'
import type { QuizAnswers } from '@/components/quiz'
import { getAnswerWeights } from './questions'
import { COLLECTION_SLUGS, type CollectionSlug } from './types'

const Q4_ID = 'q4_value'

function initScores(): Record<CollectionSlug, number> {
  return COLLECTION_SLUGS.reduce(
    (acc, slug) => {
      acc[slug] = 0
      return acc
    },
    {} as Record<CollectionSlug, number>,
  )
}

function getSelectedAnswerId(answers: QuizAnswers, questionId: string): string | null {
  const value = answers[questionId]
  if (!isSingleSelectAnswer(value)) return null
  return value.value
}

function scoreForAnswer(answerId: string, totals: Record<CollectionSlug, number>) {
  const weights = getAnswerWeights(answerId)
  for (const slug of COLLECTION_SLUGS) {
    const points = weights[slug]
    if (points) totals[slug] += points
  }
}

function q4Contribution(answerId: string): Record<CollectionSlug, number> {
  const weights = getAnswerWeights(answerId)
  return COLLECTION_SLUGS.reduce(
    (acc, slug) => {
      acc[slug] = weights[slug] ?? 0
      return acc
    },
    {} as Record<CollectionSlug, number>,
  )
}

export function computeWinningCollection(answers: QuizAnswers): CollectionSlug {
  const totals = initScores()

  for (const question of ['q1_today', 'q2_vision', 'q3_pain', 'q4_value'] as const) {
    const answerId = getSelectedAnswerId(answers, question)
    if (answerId) scoreForAnswer(answerId, totals)
  }

  const maxScore = Math.max(...COLLECTION_SLUGS.map((slug) => totals[slug]))
  const leaders = COLLECTION_SLUGS.filter((slug) => totals[slug] === maxScore)

  if (leaders.length === 1) return leaders[0]

  const q4AnswerId = getSelectedAnswerId(answers, Q4_ID)
  if (q4AnswerId) {
    const q4Scores = q4Contribution(q4AnswerId)
    let bestSlug = leaders[0]
    let bestQ4 = q4Scores[bestSlug]
    for (const slug of leaders.slice(1)) {
      if (q4Scores[slug] > bestQ4) {
        bestSlug = slug
        bestQ4 = q4Scores[slug]
      }
    }
    const q4Leaders = leaders.filter((slug) => q4Scores[slug] === bestQ4)
    if (q4Leaders.length === 1) return q4Leaders[0]
  }

  return leaders[0]
}
