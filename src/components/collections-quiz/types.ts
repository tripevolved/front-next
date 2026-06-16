import type { SelectOption } from '@/components/quiz'

export const COLLECTION_SLUGS = [
  'para-aproveitar-a-dois',
  'para-brindar-a-jornada',
  'para-respirar-novos-ares',
  'para-desacelerar-a-dois',
  'para-viver-a-historia',
  'para-redescobrir-um-pedaco-do-brasil',
] as const

export type CollectionSlug = (typeof COLLECTION_SLUGS)[number]

export const QUESTION_IDS = ['q1_today', 'q2_vision', 'q3_pain', 'q4_value'] as const

export type CollectionQuestionId = (typeof QUESTION_IDS)[number]

export type ScoredOption = {
  id: string
  label: string
  description?: string
  icon?: string
  scores: Partial<Record<CollectionSlug, number>>
}

export type ScoredQuestion = {
  id: CollectionQuestionId
  stepLabel: string
  title: string
  description?: string
  columns?: 1 | 2 | 3 | 4
  options: ScoredOption[]
}

export function toSelectOptions(options: ScoredOption[]): SelectOption[] {
  return options.map(({ id, label, description, icon }) => ({
    id,
    label,
    description,
    icon,
  }))
}
