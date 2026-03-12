'use client'

import { useAppStore } from '@/core/store'
import { TravelDesignerWhatsAppCard } from '@/components/app/TravelDesignerWhatsAppCard'
import { CreateTripCard } from '@/components/app/CreateTripCard'
import { CirculoEvolvedCall } from '@/components/app/CirculoEvolvedCall'
import { AppTripsCards } from '@/components/trips/AppTripsCards'

export default function PainelPage() {
  const travelerState = useAppStore((state) => state.travelerState)
  const subscriptionActive = travelerState?.subscription?.status === 'Active'

  return (
    <div className="max-w-4xl mx-auto my-4">
      {subscriptionActive ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <TravelDesignerWhatsAppCard />
          <CreateTripCard />
        </div>
      ) : (
        <CirculoEvolvedCall />
      )}
      <AppTripsCards />
    </div>
  )
}

