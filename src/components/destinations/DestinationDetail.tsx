import type { TravelerType } from '@/clients/collections'
import CollectionAccommodationsSection from '@/components/accommodation/CollectionAccommodationsSection'
import { PublicDestination, TravelType } from '@/core/types/destination'
import { DestinationHero } from './DestinationHero'
import { DestinationFeatures } from './DestinationFeatures'
import { DestinationVideos } from './DestinationVideos'
import { DestinationExpert } from './DestinationExpert'
import { DestinationCTA } from './DestinationCTA'
import { DestinationSidebarPracticalInfo } from './DestinationSidebarPracticalInfo'
import { DestinationStorySection } from './DestinationStorySection'
import { DestinationCirculoEvolvedFooter } from './DestinationCirculoEvolvedFooter'

function destinationTravelTypeToTravelerType(travelType: TravelType): TravelerType {
  if (travelType === 'FAMILIES') return 'FAMILY'
  return 'COUPLE'
}

interface DestinationDetailProps {
  destination: PublicDestination
}

export function DestinationDetail({ destination }: DestinationDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DestinationHero destination={destination} />

      <div className="container mx-auto px-4 py-12">
        <div className="w-full md:w-4/5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <DestinationFeatures destination={destination} />
              <DestinationVideos destination={destination} />
            </div>

            <div>
              <DestinationExpert destination={destination} />
              <DestinationCTA destinationTitle={destination.title} />
              <DestinationSidebarPracticalInfo destination={destination} />
            </div>
          </div>
        </div>
      </div>

      <DestinationStorySection destination={destination} />

      <CollectionAccommodationsSection
        destinationUniqueName={destination.uniqueName}
        travelerType={destinationTravelTypeToTravelerType(destination.travelType)}
      />

      <DestinationCirculoEvolvedFooter />
    </div>
  )
}
