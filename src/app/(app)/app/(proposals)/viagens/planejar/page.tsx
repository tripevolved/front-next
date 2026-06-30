'use client'

import { TripPlanningQuizFlow } from '@/components/trip-planning-quiz'
import { PlanTripPageGuard } from '@/components/app/PlanTripPageGuard'

export default function PlanejarPage() {
  return (
    <PlanTripPageGuard>
      <TripPlanningQuizFlow />
    </PlanTripPageGuard>
  )
}
