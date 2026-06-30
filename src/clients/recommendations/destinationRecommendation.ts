import { ApiRequest } from '@/services/api/request'
import type { DestinationProposalResponse, PostDestinationRecommendationInput } from '@/core/types/recommendations'

export async function postDestinationRecommendation(
  input: PostDestinationRecommendationInput,
): Promise<DestinationProposalResponse> {
  return ApiRequest.post<DestinationProposalResponse>('recommendations/destinations', input)
}
