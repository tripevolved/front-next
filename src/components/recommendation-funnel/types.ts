import type { PreRecommendationResponse } from '@/core/types/travelIntent'
import type { DestinationProposalResponse } from '@/core/types/recommendations'
import type { QuizAnswers } from '@/components/quiz'

export type RecommendationFunnelCopy = {
  intentPreviewSubtitle: string
  destinationProposalEyebrow: string
  destinationProposalTitle: string
  destinationProposalHeroImage?: string
  destinationProposalHeroAlt?: string
}

export type BuildTripRequestParams = {
  travelerId: string
  quizAnswers: QuizAnswers
  supplementalAnswers?: QuizAnswers
  travelIntent: PreRecommendationResponse['travelIntent']
  destinationProposal: DestinationProposalResponse
  selectedDestinationUniqueName: string
}

export type FunnelLeadContext = {
  source: string
  [key: string]: string | undefined
}
