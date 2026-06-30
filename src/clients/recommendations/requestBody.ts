import type { PostDestinationRecommendationInput } from '@/core/types/recommendations'
import type { PostPreRecommendationInput } from './preRecommendation'

/** Omit region when unset so ASP.NET model binding does not reject null for optional scope. */
export function recommendationRequestBody<T extends { region?: string | null }>(
  input: T,
): Omit<T, 'region'> | T {
  if (input.region == null) {
    const { region: _region, ...rest } = input
    return rest
  }
  return input
}

export function toDestinationRecommendationBody(input: PostDestinationRecommendationInput) {
  return recommendationRequestBody(input)
}

export function toPreRecommendationBody(input: PostPreRecommendationInput) {
  return recommendationRequestBody(input)
}
