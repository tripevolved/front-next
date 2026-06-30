'use client'

import useSWR from 'swr'
import { useAppStore } from '@/core/store'
import { TripsApiService } from '@/clients/trips'
import {
  canPlanNewTrip,
  FREE_TIER_MAX_TRIPS,
  getPlanTripBlockedMessage,
  isCirculoEvolvedMember,
} from '@/core/trips/planTripEligibility'

export function usePlanTripEligibility() {
  const subscription = useAppStore((state) => state.travelerState?.subscription)
  const circuloEvolvedMember = isCirculoEvolvedMember(subscription)

  const { data, isLoading } = useSWR(
    ['trips', 'plan-eligibility'],
    () => TripsApiService.getTrips(),
    { revalidateOnFocus: true },
  )

  const tripCount = data?.trips?.length ?? 0
  const canPlan = canPlanNewTrip({ isCirculoEvolvedMember: circuloEvolvedMember, tripCount })

  return {
    canPlan,
    isLoading,
    tripCount,
    isCirculoEvolvedMember: circuloEvolvedMember,
    isAtTripLimit: !circuloEvolvedMember && tripCount >= FREE_TIER_MAX_TRIPS,
    blockedMessage: getPlanTripBlockedMessage(),
  }
}
