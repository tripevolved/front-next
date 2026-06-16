'use client'

import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/core/store'
import { QuizFlow } from '@/components/quiz'
import type { QuizAnswers } from '@/components/quiz'
import { buildTripPlanningQuizConfig, createTripFromQuizAnswers } from './questions'

export function TripPlanningQuizFlow() {
  const router = useRouter()
  const travelerId = useAppStore((state) => state.travelerState?.id ?? '')

  const handleCreateTrip = useCallback(
    async (answers: QuizAnswers) => {
      const id = await createTripFromQuizAnswers(answers, travelerId)
      router.push(`/app/viagens/${id}`)
    },
    [travelerId, router],
  )

  const config = useMemo(
    () =>
      buildTripPlanningQuizConfig({
        travelerId,
        onCreateTrip: handleCreateTrip,
      }),
    [travelerId, handleCreateTrip],
  )

  return <QuizFlow config={config} />
}
