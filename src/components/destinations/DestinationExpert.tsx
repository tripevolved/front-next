import Image from 'next/image'
import { PublicDestination } from '@/core/types/destination'

interface DestinationExpertProps {
  destination: PublicDestination
}

export function DestinationExpert({ destination }: DestinationExpertProps) {
  if (!destination.recommendedBy) {
    return null
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
      <h2 className="text-xl font-baloo font-bold text-secondary-900 mb-4">Recomendado por</h2>
      <div className="flex items-center mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
          <Image
            src={destination.recommendedBy.photo}
            alt={destination.recommendedBy.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-baloo font-bold text-lg text-secondary-900">{destination.recommendedBy.name}</h3>
          <div className="flex space-x-2 mt-1">
            {destination.recommendedBy.socialMediaInformation.map((social, index) => (
              <a 
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary-600"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 italic">"{destination.recommendedBy.recommendationText}"</p>
    </div>
  )
} 