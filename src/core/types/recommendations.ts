import type { TravelIntent } from './travelIntent'
import type { TripImage } from './trip'

export interface DestinationProposalAlignedItem {
  key: string
  label: string
}

export interface DestinationProposalChoice {
  destinationName: string
  destinationUniqueName: string
  destinationId?: string
  matchScore: number
  alignmentLabel: string
  coverImageUrl?: string
  whyRecommended: string
  alignedWithIntent: DestinationProposalAlignedItem[]
  tradeoffs: string[]
  bestFor: string[]
}

export interface DestinationProposalResponse {
  mainChoice?: DestinationProposalChoice | null
  otherChoices?: DestinationProposalChoice[] | null
}

export interface PostDestinationRecommendationInput {
  travelIntent: TravelIntent
  quizAnswers: Record<string, unknown>
  optionalFreeText?: string
  region?: string
}

export interface AccommodationProposalRecommendation {
  whyRecommended?: string
  bestForThisTrip?: string[]
  tradeoffs?: string[]
  fitScore?: number
  viabilityScore?: number
  recommendationScore?: number
}

export interface AccommodationProposalAvailabilitySummary {
  lowestTotalPrice?: number
  currency?: string
  mealPlan?: string
}

export type TripAccommodationProposalRole = 'primary' | 'alternative' | 'fallback'

export interface TripAccommodationProposalView {
  id: number
  role: TripAccommodationProposalRole
  matchScore: number
  accommodationId: string
  name: string
  uniqueName: string
  coverImageUrl?: string
  hasAvailability: boolean
  availabilitySummary?: AccommodationProposalAvailabilitySummary | null
  recommendation: AccommodationProposalRecommendation
}

export interface TripAccommodationProposalsResponse {
  proposals: TripAccommodationProposalView[]
}

export interface RecommendedDestinationCardData {
  destinationId: string
  name: string
  uniqueName: string
  matchScore: number
  images: TripImage[]
  whyRecommended?: string
  alignmentLabel?: string
  alignedWithIntent?: DestinationProposalAlignedItem[]
  tradeoffs?: string[]
  bestFor?: string[]
}
