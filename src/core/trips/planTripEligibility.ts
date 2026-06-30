import type { Subscription } from '@/core/types/travelerState'

export const FREE_TIER_MAX_TRIPS = 3

export function isCirculoEvolvedMember(subscription: Subscription | null | undefined): boolean {
  return subscription?.status === 'Active'
}

export function canPlanNewTrip(params: {
  isCirculoEvolvedMember: boolean
  tripCount: number
}): boolean {
  if (params.isCirculoEvolvedMember) return true
  return params.tripCount < FREE_TIER_MAX_TRIPS
}

export function getPlanTripBlockedMessage(): string {
  return `Você atingiu o limite de ${FREE_TIER_MAX_TRIPS} viagens. Assine o Círculo Evolved para planejar mais.`
}
