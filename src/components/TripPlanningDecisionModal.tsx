'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { DestinationsApiService } from '@/clients/destinations'
import { DestinationHero } from './destinations/DestinationHero'
import { DestinationFeatures } from './destinations/DestinationFeatures'
import { PublicDestination } from '@/core/types/destination'
import { WhatsAppDirectButton } from './WhatsAppDirectButton'
import { LocalStorageService } from '@/clients/local'

interface TripPlanningDecisionModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDestination: string | null
  onContactExpert: () => void
}

export default function TripPlanningDecisionModal({
  isOpen,
  onClose,
  selectedDestination,
  onContactExpert
}: TripPlanningDecisionModalProps) {
  const [destination, setDestination] = useState<PublicDestination | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const hasTraveler = LocalStorageService.hasTraveler()
  
  useEffect(() => {
    async function fetchDestination() {
      if (!selectedDestination) {
        setIsLoading(false)
        return
      }
      
      setIsLoading(true)
      try {
        const data = await DestinationsApiService.getDestinationByUniqueName(selectedDestination)
        setDestination(data)
      } catch (error) {
        console.error('Failed to fetch destination:', error)
        setDestination(null)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchDestination()
  }, [selectedDestination])
  
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col">
        <div className="flex justify-between items-center p-6">
          <h2 className="text-xl font-baloo font-bold text-secondary-900">
            Sua viagem para {destination?.title}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : destination ? (
            <div className="mb-6">
              {/* Hero section */}
              <DestinationHero destination={destination} />
              
              {/* Features section */}
              <div className="p-6">
                <DestinationFeatures destination={destination} />
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mb-4">
                <Image 
                  src="/assets/states/empty-state.svg" 
                  alt="Estado vazio" 
                  width={200} 
                  height={200}
                  className="mx-auto"
                />
              </div>
              <p className="text-gray-500 mb-4">
                Não conseguimos pegar as informações do seu destino, mas você ainda pode planejar sua viagem
              </p>
            </div>
          )}
        </div>
        
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 z-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative group flex-1">
              <button 
                className="w-full bg-primary-600 text-white py-3 rounded-full font-medium opacity-70 cursor-not-allowed flex items-center justify-center border border-primary-700 shadow-sm"
                disabled
              >
                <span>Planejar minha viagem</span>
                <span className="ml-2 bg-accent-500 text-white text-xs px-2 py-0.5 rounded">Em breve</span>
              </button>
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 text-xs px-4 py-3 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-80 text-center border border-gray-200">
                Em breve você poderá planejar sua viagem completa através da nossa plataforma, contando com a curadoria de nossos especialistas
              </div>
            </div>
            
            {hasTraveler ? (
              <div className="flex-1">
                <WhatsAppDirectButton
                  message={`Olá! Gostaria de falar sobre o destino ${destination?.title || 'selecionado'}.`}
                  variant="secondary"
                  className="w-full"
                >
                  Falar com especialista
                </WhatsAppDirectButton>
              </div>
            ) : (
              <div className="flex-1">
                <button
                  onClick={() => {
                    onClose();
                    onContactExpert();
                  }}
                  className="w-full bg-white text-primary-600 border border-primary-600 py-3 rounded-full font-medium hover:bg-primary-50 transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Falar com especialista
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 