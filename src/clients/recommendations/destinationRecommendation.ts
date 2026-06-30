import { ApiRequest } from '@/services/api/request'
import type { DestinationProposalResponse, PostDestinationRecommendationInput } from '@/core/types/recommendations'
import { toDestinationRecommendationBody } from './requestBody'

export async function postDestinationRecommendation(
  input: PostDestinationRecommendationInput,
): Promise<DestinationProposalResponse> {
  return ApiRequest.post<DestinationProposalResponse>(
    'recommendations/destinations',
    toDestinationRecommendationBody(input),
  )
}
