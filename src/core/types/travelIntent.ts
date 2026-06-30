export type TravelIntentMotivation =
  | 'reconnection'
  | 'rest'
  | 'celebration'
  | 'discovery'
  | 'adventure'
  | 'escape_routine'
  | 'quality_time'
  | 'mixed'

export type TravelIntentEnergyProfile = 'very_slow' | 'slow' | 'balanced' | 'active' | 'very_active'
export type TravelIntentHotelImportance = 'functional' | 'important' | 'experience_defining'
export type TravelIntentInterestVector =
  | 'nature'
  | 'beaches'
  | 'gastronomy'
  | 'culture'
  | 'history'
  | 'cities'
  | 'wellness'
  | 'wildlife'
  | 'landscapes'
  | 'luxury'
  | 'design'
  | 'local_life'

export interface TravelIntent {
  primary_motivation: TravelIntentMotivation
  secondary_motivation: TravelIntentMotivation
  energy_profile: TravelIntentEnergyProfile
  hotel_importance: TravelIntentHotelImportance
  interest_vectors: TravelIntentInterestVector[]
  complexity_tolerance: string
  special_context: string
  budget_reference: string
  trip_duration: number | null
  travel_party: string
  free_text_notes: string
  intent_summary: string
  confidence_score: number
  missing_information: string[]
  contradictions: string[]
  next_best_question: string
}

export interface IntentPreviewView {
  intentSummary: string
  lodgingStyleLabel: string
  paceLabel: string
  confidenceScore: number
  missingInformation: string[]
  nextBestQuestion: string
}

export interface PreRecommendationResponse {
  travelIntent: TravelIntent
  preview: IntentPreviewView
}
