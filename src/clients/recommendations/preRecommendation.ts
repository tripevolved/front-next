import { ApiRequest } from '@/services/api/request'
import type { PreRecommendationResponse } from '@/core/types/travelIntent'
import type { QuizAnswers } from '@/components/quiz'
import { toPreRecommendationBody } from './requestBody'

export interface PostPreRecommendationInput {
  quizAnswers: QuizAnswers
  optionalFreeText?: string
  leadContext?: { name?: string; email?: string; source?: string }
  region?: string | null
}

export async function postPreRecommendation(input: PostPreRecommendationInput): Promise<PreRecommendationResponse> {
  return ApiRequest.post<PreRecommendationResponse>('recommendations/pre', toPreRecommendationBody(input))
}
