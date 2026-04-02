import { differenceInDays } from 'date-fns'
import { type CreateTripRequest, TravelerType } from '@/core/types/trip'
import type { FamilyRoom, FamilyTravellers, TripDates, TripGoals, TripProfile, TripType } from './types'
import type { TripBudgetPayload } from './StepBudget'

function toApiDates(d: TripDates): CreateTripRequest['dates'] {
  const start = d.startDate ? new Date(d.startDate) : null
  const end = d.endDate ? new Date(d.endDate) : null

  const isMonthMode = d.month != null
  const anyMonthFlexibility = isMonthMode

  const days =
    start && end && !isNaN(start.getTime()) && !isNaN(end.getTime()) ? Math.max(1, differenceInDays(end, start) + 1) : 1

  return {
    startDate: d.startDate ?? null,
    endDate: d.endDate ?? null,
    month: d.month ?? null,
    anyMonthFlexibility,
    minDays: days,
    maxDays: days,
  }
}

export function buildCreateTripRequest({
  travelerId,
  tripDates,
  tripGoals,
  tripProfile,
  tripType,
  tripBudget,
  tripDescription,
  familyTravellers,
  familyRooms,
}: {
  travelerId: string
  tripDates: TripDates | null
  tripGoals: TripGoals | null
  tripProfile: TripProfile | null
  tripType: TripType | null
  tripBudget: TripBudgetPayload | null
  tripDescription: string
  familyTravellers: FamilyTravellers | null
  familyRooms: FamilyRoom[] | null
}): CreateTripRequest {
  const type = tripType?.type ?? TravelerType.INDIVIDUAL
  const isFamilyTrip = type === TravelerType.FAMILY

  return {
    travelerId,
    goals: tripGoals?.goals ?? [],
    tripDetails: {
      travelerProfile: tripProfile?.profile ?? '',
      tripDescription: tripDescription.trim() ? tripDescription.trim() : undefined,
    },
    budget: {
      maxBudget: tripBudget?.maxBudget ?? 25000,
      isFlexible: tripBudget?.isFlexible ?? true,
    },
    dates: toApiDates(tripDates ?? { startDate: null, endDate: null, month: null }),
    travelers: isFamilyTrip && familyTravellers
      ? {
          type: type ?? TravelerType.FAMILY,
          adults: familyTravellers.adults,
          children: familyTravellers.children,
          childrenAges: familyTravellers.childrenAges,
          rooms: (familyRooms ?? []).map((r) => ({
            ...r,
            type: type ?? TravelerType.FAMILY,
          })),
        }
      : {
          type,
        },
    shouldRecommendDestinations: false,
    mode: 'PROPOSAL',
  }
}

