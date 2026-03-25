'use client'

import { useAppStore } from '@/core/store'
import { TravelDesignerWhatsAppCard } from '@/components/app/TravelDesignerWhatsAppCard'
import { SubscriptionTravelersPromptCard } from '@/components/app/SubscriptionTravelersPromptCard'
import { CreateTripCard } from '@/components/app/CreateTripCard'
import { CirculoEvolvedCall } from '@/components/app/CirculoEvolvedCall'
import { TripTimeline } from '@/components/trips/TripTimeline'

export default function PainelPage() {
  const travelerState = useAppStore((state) => state.travelerState)
  const subscription = travelerState?.subscription
  const subscriptionActive = subscription?.status === 'Active'
  const showTravelersSetup =
    subscription != null && subscription.hasTravelers === false

  return (
    <div className="max-w-4xl mx-auto my-4">
      {subscriptionActive ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <TravelDesignerWhatsAppCard />
          {showTravelersSetup ? <SubscriptionTravelersPromptCard /> : null}
          <CreateTripCard />
        </div>
      ) : (
        <CirculoEvolvedCall />
      )}
      <TripTimeline />
    </div>
  )
}

