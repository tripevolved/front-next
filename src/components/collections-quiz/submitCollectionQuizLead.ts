import { LeadsApiService } from '@/clients/leads'
import type { QuizAnswers } from '@/components/quiz'
import { buildQuizLeadMetadata } from './questions'
import type { CollectionSlug } from './types'

type SubmitParams = {
  email: string
  name?: string
  phone?: string
  answers: QuizAnswers
  winningSlug: CollectionSlug
}

export async function submitCollectionQuizLead({
  email,
  name = '',
  phone = '',
  answers,
  winningSlug,
}: SubmitParams) {
  return LeadsApiService.createLead({
    name,
    email,
    phone,
    metadata: buildQuizLeadMetadata(answers, winningSlug),
  })
}
