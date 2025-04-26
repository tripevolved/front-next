import { PublicDestination, TravelType } from '@/core/types/destination'
import { PhotoCarousel } from '@/components/PhotoCarousel'

interface DestinationHeroProps {
  destination: PublicDestination
}

// Helper function to get icon and Portuguese name based on travel type
function getTravelTypeDetails(type: TravelType) {
  const travelTypes = {
    COUPLES: { icon: '💑', name: 'Recomendado para casais' },
    FAMILIES: { icon: '👨‍👩‍👧‍👦', name: 'Recomendado para famílias' },
    INDIVIDUALS: { icon: '👤', name: 'Recomendado para viajantes solo' },
    PAIRS: { icon: '👥', name: 'Recomendado para duplas' },
  };

  return travelTypes[type] || { icon: '✈️', name: 'Outro' };
}

export function DestinationHero({ destination }: DestinationHeroProps) {
  const { icon, name } = getTravelTypeDetails(destination.travelType)

  return (
    <div className="relative h-[50vh] md:h-[70vh]">
      {destination.photos && destination.photos.length > 0 && (
        <PhotoCarousel photos={destination.photos} title={destination.title} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-5xl font-baloo font-bold text-white mb-2">
            {destination.title}
          </h1>
          
          {/* Destination type with icon */}
          {destination.travelType && (
            <div className="flex items-center mb-4">
              <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-lg font-medium flex items-center">
                <span className="text-2xl mr-2">{icon}</span>
                {name}
              </span>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2">
            {destination.travelerProfiles.map((profile, index) => (
              <span 
                key={index}
                className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                {profile}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 