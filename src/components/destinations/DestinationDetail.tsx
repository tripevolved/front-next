import { PublicDestination } from '@/core/types/destination'
import { DestinationHero } from './DestinationHero'
import { DestinationTips } from './DestinationTips'
import { DestinationFeatures } from './DestinationFeatures'
import { DestinationVideos } from './DestinationVideos'
import { DestinationExpert } from './DestinationExpert'
import { DestinationCTA } from '@/components/DestinationCTA'

interface DestinationDetailProps {
  destination: PublicDestination
}

export function DestinationDetail({ destination }: DestinationDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with main photo */}
      <DestinationHero destination={destination} />

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="w-full md:w-4/5 mx-auto">
          {/* Tips Section */}
          <DestinationTips destination={destination} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Left column - Main content */}
            <div className="md:col-span-2">
              {/* Features */}
              <DestinationFeatures destination={destination} />

              {/* Videos */}
              <DestinationVideos destination={destination} />
            </div>

            {/* Right column - Sidebar */}
            <div>
              {/* Expert recommendation */}
              <DestinationExpert destination={destination} />

              {/* CTA */}
              <DestinationCTA 
                destinationTitle={destination.title} 
                destinationUniqueName={destination.uniqueName} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 