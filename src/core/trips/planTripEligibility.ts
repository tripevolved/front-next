import type { Subscription } from '@/core/types/travelerState'

export const FREE_TIER_MAX_TRIPS = 1

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
  return `Você já usou sua viagem gratuita. Assine o Círculo Evolved para ter acesso à nossa curadoria completa e valores 10 a 30% menores que as grandes plataformas.`
}
