'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import ContactExpertModal from '@/components/ContactExpertModal'
import { WhatsAppDirectButton } from '@/components/WhatsAppDirectButton'
import { LocalStorageService } from '@/clients/local'
import TripPlanningDecisionModal from '@/components/TripPlanningDecisionModal'
import { TripsApiService } from '@/clients/trips'
import { TripProposal, TripMatchedDestination } from '@/core/types/trip'
import TripDiscoveryWizard from '@/components/TripDiscoveryWizard'

// Profile mapping for feature icons
const profileIcons: Record<string, string> = {
  'relax': '🌴',
  'alternativo': '🎨',
  'aventureiro': '🏃',
  'gastronomico': '🍽️',
  'garantido': '✅',
  'intelectual': '📚'
};

// Destination card component
const DestinationCard = ({ destination, onWantToGo, isLarge = false }: { 
  destination: TripMatchedDestination, 
  onWantToGo: (id: string) => void,
  isLarge?: boolean
}) => {
  // Get match level based on the match score
  const getMatchLevel = () => {
    if (destination.matchScore >= 90) return 'muito-alto';
    if (destination.matchScore >= 85) return 'alto';
    return 'bom';
  };
  
  const matchLevel = getMatchLevel();
  
  // Get match text and icon based on level
  const getMatchInfo = () => {
    switch(matchLevel) {
      case 'muito-alto':
        return {
          text: 'Match muito alto',
          icon: '🎯',
          color: 'bg-secondary-600'
        };
      case 'alto':
        return {
          text: 'Match alto',
          icon: '🎯',
          color: 'bg-secondary-500'
        };
      case 'bom':
        return {
          text: 'Match bom',
          icon: '🎯',
          color: 'bg-secondary-400'
        };
      default:
        return {
          text: 'Match',
          icon: '🎯',
          color: 'bg-gray-400'
        };
    }
  };
  
  const matchInfo = getMatchInfo();
  const imageUrl = destination.images[0]?.sources?.[0]?.url || '/assets/blank-image.png';
  
  // Get icon for a feature based on profile mapping
  const getFeatureIcon = (feature: string): string => {
    // Convert feature to lowercase for case-insensitive matching
    const lowerFeature = feature.toLowerCase();
    
    // Check if the feature matches any profile key
    for (const [profile, icon] of Object.entries(profileIcons)) {
      if (lowerFeature.includes(profile)) {
        return icon;
      }
    }
    
    // Default icon if no match found
    return '✨';
  };
  
  return (
    <div 
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 ${
        isLarge ? 'w-full md:w-3/5 mx-auto' : 'w-[70%] md:w-full flex-shrink-0'
      } cursor-pointer`}
      onClick={() => onWantToGo(destination.destinationId)}
    >
      <div className={`relative ${isLarge ? 'h-[500px]' : 'h-[300px]'}`}>
        <Image
          src={imageUrl}
          alt={destination.name}
          fill
          className="object-cover"
        />
        
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {/* Top section with match indicator and feature labels */}
        <div className="absolute top-4 left-4 right-4 flex flex-col md:flex-row md:items-start gap-3">
          {/* Match indicator */}
          <div className={`${matchInfo.color} text-white px-3 py-1.5 rounded-full text-sm font-bold flex items-center self-start shadow-lg z-10 border border-white/20`}>
            <span className="mr-1.5 text-base">{matchInfo.icon}</span>
            {matchInfo.text}
          </div>
          
          {/* Feature labels - horizontal */}
          <div className="flex flex-wrap gap-2 mt-1 md:mt-0">
            {/* Additional features if available */}
            {destination.features?.map((feature, index) => (
              <div 
                key={index} 
                className="bg-accent-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center"
              >
                <span className="mr-1">{getFeatureIcon(feature)}</span>
                {feature}
              </div>
            ))}
          </div>
        </div>
        
        {/* Title and description at bottom */}
        <div className="absolute bottom-16 left-4 right-4 text-white">
          <h2 className="text-xl font-baloo font-bold mb-1">
            {destination.name}
          </h2>
          <p className="text-white/90 text-sm line-clamp-2">
            {destination.description || 'Destino personalizado para você.'}
          </p>
        </div>
        
        {/* Price at bottom right */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-md">
            <div className="text-accent-600 font-bold text-sm">
              A partir de R$ {destination.price.toLocaleString('pt-BR')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TripResultsPage() {
  const router = useRouter()
  const params = useParams()
  const tripId = params?.tripId as string
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isWantToGoModalOpen, setIsWantToGoModalOpen] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const hasTraveler = LocalStorageService.hasTraveler()
  const [tripProposal, setTripProposal] = useState<TripProposal | null>(null)

  useEffect(() => {
    const fetchTripProposal = async () => {
      if (!tripId) {
        setIsLoading(false)
        setError(true)
        return
      }
      
      try {
        const proposal = await TripsApiService.getTripMatches(tripId)
        
        if (proposal && proposal.mainChoice) {
          setTripProposal(proposal)
        } else {
          setError(true)
        }
      } catch (error) {
        console.error('Failed to fetch trip proposal:', error)
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchTripProposal()
  }, [tripId])

  const handleContactExpert = () => {
    if (!hasTraveler) {
      setIsContactModalOpen(true)
    }
  }

  const handleWantToGo = (destinationId: string) => {
    // Find the destination by ID from the trip proposal
    let destination: TripMatchedDestination | undefined;
    
    if (tripProposal) {
      if (tripProposal.mainChoice.destinationId === destinationId) {
        destination = tripProposal.mainChoice;
      } else if (tripProposal.otherChoices) {
        destination = tripProposal.otherChoices.find(d => d.destinationId === destinationId);
      }
    }
    
    // Use the uniqueName if available, otherwise generate a fallback
    setSelectedDestination(destination?.uniqueName || `destination-${destinationId}`);
    setIsWantToGoModalOpen(true);
  }

  // If there's an error or the trip doesn't exist, redirect to the resultados page
  if (error && !isLoading) {
    router.push('/resultados?message=Infelizmente%2C%20n%C3%A3o%20encontramos%20sua%20viagem%2C%20mas%20voc%C3%AA%20pode%20descobrir%20seu%20destino%20ideal.')
    return null
  }

  const message = "Olá! Gostaria de falar sobre os resultados da minha pesquisa de destinos."

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-baloo font-bold text-secondary-900">
            Sua viagem ideal é para...
          </h1>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : tripProposal ? (
          <>
            {/* Main destination section */}
            {tripProposal.mainChoice && (
              <div className="mb-12">
                <DestinationCard 
                  destination={tripProposal.mainChoice} 
                  isLarge={true}
                  onWantToGo={handleWantToGo}
                />
              </div>
            )}

            {/* Other destinations */}
            {tripProposal.otherChoices && tripProposal.otherChoices.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-baloo font-bold text-secondary-900 mb-6 text-center">
                  Outras opções que você pode gostar
                </h2>
                
                {/* Mobile: Horizontal scrollable container */}
                <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
                  <div className="flex space-x-4 pr-4">
                    {tripProposal.otherChoices.map((destination) => (
                      <DestinationCard 
                        key={destination.destinationId} 
                        destination={destination} 
                        onWantToGo={handleWantToGo}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Desktop: Two-column grid with 80% width container */}
                <div className="hidden md:block w-4/5 mx-auto">
                  <div className="grid grid-cols-2 gap-8">
                    {tripProposal.otherChoices.map((destination) => (
                      <DestinationCard 
                        key={destination.destinationId} 
                        destination={destination} 
                        onWantToGo={handleWantToGo}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : null}
        
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Não encontrou o destino ideal? Nossos especialistas podem ajudar a encontrar a viagem perfeita para você.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {hasTraveler ? (
              <WhatsAppDirectButton
                message={message}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Falar com especialista
              </WhatsAppDirectButton>
            ) : (
              <button
                onClick={handleContactExpert}
                className="bg-secondary-600 text-white px-8 py-3 rounded-full font-medium hover:bg-secondary-700 transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Falar com especialista
              </button>
            )}
            <Link
              href="/destinos"
              className="bg-white text-secondary-600 border border-secondary-600 px-8 py-3 rounded-full font-medium hover:bg-secondary-50 transition-colors"
            >
              Explorar destinos
            </Link>
          </div>
        </div>
      </div>
      
      {/* Contact Expert Modal */}
      <ContactExpertModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)}
      />
      
      {/* Trip Planning Decision Modal */}
      <TripPlanningDecisionModal
        isOpen={isWantToGoModalOpen}
        onClose={() => setIsWantToGoModalOpen(false)}
        selectedDestination={selectedDestination}
        onContactExpert={handleContactExpert}
      />
    </div>
  )
} 