import { ApiRequest } from '@/services/api/request'
import type { PreRecommendationResponse } from '@/core/types/travelIntent'
import type { QuizAnswers } from '@/components/quiz'

export interface PostPreRecommendationInput {
  quizAnswers: QuizAnswers
  optionalFreeText?: string
  leadContext?: { name?: string; email?: string; source?: string }
  region?: string
}

export async function postPreRecommendation(input: PostPreRecommendationInput): Promise<PreRecommendationResponse> {
  return ApiRequest.post<PreRecommendationResponse>('recommendations/pre', input)
}
